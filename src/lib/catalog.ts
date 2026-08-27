import type { CatalogObject } from 'square';

import fallbackMenu from '../data/menu.fallback.json';
import translationsJson from '../data/menu.translations.json';
import { createSquareClient, getSquareConfig } from './square';

export type SiteMenuSection =
  | 'tortas'
  | 'shukos'
  | 'tacos'
  | 'pollo-con-papas'
  | 'bebidas';

export type LocalizedMenuText = {
  en: string;
  es: string;
};

export type MenuItem = {
  id: string;
  catalogObjectId: string;
  variationId: string;
  category: SiteMenuSection;
  name: LocalizedMenuText;
  description: LocalizedMenuText;
  priceCents: number;
  currency: 'USD';
  imageUrl?: string;
  popular?: boolean;
  available: boolean;
};

type MenuTranslation = {
  name?: string;
  description?: string;
};

type ItemObject = Extract<CatalogObject, { type: 'ITEM' }>;
type CategoryObject = Extract<CatalogObject, { type: 'CATEGORY' }>;
type ImageObject = Extract<CatalogObject, { type: 'IMAGE' }>;
type VariationObject = Extract<CatalogObject, { type: 'ITEM_VARIATION' }>;
type ModifierListObject = Extract<CatalogObject, { type: 'MODIFIER_LIST' }>;
type ModifierObject = Extract<CatalogObject, { type: 'MODIFIER' }>;

type CatalogResources = {
  items: ItemObject[];
  categories: Map<string, CategoryObject>;
  images: Map<string, ImageObject>;
  variations: Map<string, VariationObject>;
  modifierLists: Map<string, ModifierListObject>;
  modifiers: Map<string, ModifierObject>;
};

const translations = translationsJson as Record<string, MenuTranslation>;
const fallbackByEnglishName = new Map(
  (fallbackMenu as MenuItem[]).map((item) => [normalizeName(item.name.en), item]),
);
const objectTypes: CatalogObject['type'][] = [
  'ITEM',
  'CATEGORY',
  'IMAGE',
  'ITEM_VARIATION',
  'MODIFIER_LIST',
  'MODIFIER',
];

function normalizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function sectionFromCategoryName(name: string): SiteMenuSection | null {
  const normalized = normalizeName(name);

  if (normalized.includes('torta')) {
    return 'tortas';
  }

  if (normalized.includes('shuko')) {
    return 'shukos';
  }

  if (normalized.includes('taco')) {
    return 'tacos';
  }

  if (
    (normalized.includes('pollo') && normalized.includes('papa')) ||
    (normalized.includes('chicken') && normalized.includes('fries'))
  ) {
    return 'pollo-con-papas';
  }

  if (
    normalized.includes('bebida') ||
    normalized.includes('drink') ||
    normalized.includes('refresco')
  ) {
    return 'bebidas';
  }

  return null;
}

function isPresentAtLocation(object: CatalogObject, locationId: string): boolean {
  if (object.absentAtLocationIds?.includes(locationId)) {
    return false;
  }

  if (object.presentAtAllLocations === false) {
    return object.presentAtLocationIds?.includes(locationId) === true;
  }

  return true;
}

function isValidImageUrl(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function indexCatalogObjects(objects: CatalogObject[]): CatalogResources {
  const resources: CatalogResources = {
    items: [],
    categories: new Map(),
    images: new Map(),
    variations: new Map(),
    modifierLists: new Map(),
    modifiers: new Map(),
  };

  for (const object of objects) {
    if (object.isDeleted || !object.id) {
      continue;
    }

    switch (object.type) {
      case 'ITEM':
        resources.items.push(object);
        break;
      case 'CATEGORY':
        resources.categories.set(object.id, object);
        break;
      case 'IMAGE':
        resources.images.set(object.id, object);
        break;
      case 'ITEM_VARIATION':
        resources.variations.set(object.id, object);
        break;
      case 'MODIFIER_LIST': {
        resources.modifierLists.set(object.id, object);

        for (const modifier of object.modifierListData?.modifiers ?? []) {
          if (modifier.type === 'MODIFIER' && !modifier.isDeleted) {
            resources.modifiers.set(modifier.id, modifier);
          }
        }

        break;
      }
      case 'MODIFIER':
        resources.modifiers.set(object.id, object);
        break;
    }
  }

  return resources;
}

function findSection(
  item: ItemObject,
  resources: CatalogResources,
  locationId: string,
): SiteMenuSection | null {
  const categoryIds =
    item.itemData?.categories
      ?.map((category) => category.id)
      .filter((id): id is string => typeof id === 'string' && id.length > 0) ?? [];

  for (const categoryId of categoryIds) {
    const category = resources.categories.get(categoryId);

    if (
      !category ||
      category.categoryData?.categoryType !== 'MENU_CATEGORY' ||
      !isPresentAtLocation(category, locationId)
    ) {
      continue;
    }

    const section = sectionFromCategoryName(category.categoryData.name ?? '');

    if (section) {
      return section;
    }
  }

  return null;
}

function variationsForItem(
  item: ItemObject,
  resources: CatalogResources,
): VariationObject[] {
  const byId = new Map<string, VariationObject>();

  for (const object of item.itemData?.variations ?? []) {
    if (object.type === 'ITEM_VARIATION' && !object.isDeleted) {
      byId.set(object.id, object);
    }
  }

  for (const variation of resources.variations.values()) {
    if (variation.itemVariationData?.itemId === item.id) {
      byId.set(variation.id, variation);
    }
  }

  return [...byId.values()];
}

function priceForVariation(
  variation: VariationObject,
  locationId: string,
): number | null {
  const data = variation.itemVariationData;

  if (!data) {
    return null;
  }

  const override = data.locationOverrides?.find(
    (entry) => entry.locationId === locationId,
  );
  const pricingType = override?.pricingType ?? data.pricingType;
  const priceMoney = override?.priceMoney ?? data.priceMoney;

  if (
    pricingType !== 'FIXED_PRICING' ||
    priceMoney?.currency !== 'USD' ||
    priceMoney.amount === null ||
    priceMoney.amount === undefined
  ) {
    return null;
  }

  const cents = Number(priceMoney.amount);
  return Number.isSafeInteger(cents) && cents >= 0 ? cents : null;
}

function isSoldOutAtLocation(
  variation: VariationObject,
  locationId: string,
): boolean {
  const override = variation.itemVariationData?.locationOverrides?.find(
    (entry) => entry.locationId === locationId,
  );

  if (override?.soldOut !== true) {
    return false;
  }

  if (!override.soldOutValidUntil) {
    return true;
  }

  const availableAt = Date.parse(override.soldOutValidUntil);
  return Number.isNaN(availableAt) || Date.now() < availableAt;
}

function selectVariation(
  item: ItemObject,
  resources: CatalogResources,
  locationId: string,
): { variation: VariationObject; priceCents: number } | null {
  for (const variation of variationsForItem(item, resources)) {
    if (
      variation.itemVariationData?.sellable === false ||
      !isPresentAtLocation(variation, locationId)
    ) {
      continue;
    }

    const priceCents = priceForVariation(variation, locationId);

    if (priceCents !== null) {
      return { variation, priceCents };
    }
  }

  return null;
}

function imageForItem(
  item: ItemObject,
  variation: VariationObject,
  resources: CatalogResources,
): string | undefined {
  const imageIds = [
    variation.imageId,
    variation.itemVariationData?.imageIds?.[0],
    item.imageId,
    item.itemData?.imageIds?.[0],
  ];

  for (const imageId of imageIds) {
    if (!imageId) {
      continue;
    }

    const url = resources.images.get(imageId)?.imageData?.url;

    if (isValidImageUrl(url)) {
      return url;
    }
  }

  return undefined;
}

function normalizeCatalog(
  objects: CatalogObject[],
  locationId: string,
): MenuItem[] {
  const resources = indexCatalogObjects(objects);
  const normalized: MenuItem[] = [];

  for (const item of resources.items) {
    if (!item.itemData || !isPresentAtLocation(item, locationId)) {
      continue;
    }

    const category = findSection(item, resources, locationId);
    const selected = selectVariation(item, resources, locationId);
    const englishName = item.itemData.name?.trim() ?? '';

    if (!category || !selected || !englishName) {
      continue;
    }

    const englishDescription =
      item.itemData.descriptionPlaintext?.trim() ??
      item.itemData.description?.trim() ??
      '';
    const translation = translations[item.id];
    const fallbackMatch = fallbackByEnglishName.get(normalizeName(englishName));
    const spanishName =
      translation?.name?.trim() ||
      fallbackMatch?.name.es ||
      englishName;
    const spanishDescription =
      translation?.description?.trim() ||
      fallbackMatch?.description.es ||
      englishDescription;
    const imageUrl = imageForItem(item, selected.variation, resources);
    const popular = normalizeName(englishName) === 'torta mixta';

    normalized.push({
      id: item.id,
      catalogObjectId: item.id,
      variationId: selected.variation.id,
      category,
      name: {
        en: englishName,
        es: spanishName,
      },
      description: {
        en: englishDescription,
        es: spanishDescription,
      },
      priceCents: selected.priceCents,
      currency: 'USD',
      ...(imageUrl ? { imageUrl } : {}),
      ...(popular ? { popular: true } : {}),
      available:
        item.itemData.isArchived !== true &&
        !isSoldOutAtLocation(selected.variation, locationId),
    });
  }

  return normalized;
}

async function fetchCatalogObjects(): Promise<{
  objects: CatalogObject[];
  locationId: string;
}> {
  const client = createSquareClient();
  const config = getSquareConfig();

  if (!client || !config) {
    throw new Error('Square catalog credentials are not configured.');
  }

  const uniqueObjects = new Map<string, CatalogObject>();
  const seenCursors = new Set<string>();
  let cursor: string | undefined;

  do {
    const response = await client.catalog.search({
      objectTypes,
      includeDeletedObjects: false,
      includeRelatedObjects: true,
      cursor,
      limit: 1000,
    });

    for (const object of [
      ...(response.objects ?? []),
      ...(response.relatedObjects ?? []),
    ]) {
      uniqueObjects.set(`${object.type}:${object.id}`, object);
    }

    cursor = response.cursor || undefined;

    if (cursor) {
      if (seenCursors.has(cursor)) {
        throw new Error('Square catalog pagination returned a repeated cursor.');
      }

      seenCursors.add(cursor);
    }
  } while (cursor);

  return {
    objects: [...uniqueObjects.values()],
    locationId: config.locationId,
  };
}

export async function loadCatalogMenu(): Promise<MenuItem[]> {
  const { objects, locationId } = await fetchCatalogObjects();
  return normalizeCatalog(objects, locationId);
}
