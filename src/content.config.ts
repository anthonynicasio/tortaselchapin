import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';

import fallbackMenu from './data/menu.fallback.json';
import { loadCatalogMenu } from './lib/catalog';

const localizedTextSchema = z
  .object({
    en: z.string(),
    es: z.string(),
  })
  .strict();

export const menuItemSchema = z
  .object({
    id: z.string().min(1),
    catalogObjectId: z.string(),
    variationId: z.string(),
    category: z.string().min(1),
    name: localizedTextSchema,
    description: localizedTextSchema,
    priceCents: z.number().int().nonnegative(),
    currency: z.literal('USD'),
    imageUrl: z.url().optional(),
    popular: z.boolean().optional(),
    available: z.boolean(),
  })
  .strict();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const squareMenuLoader: Loader = {
  name: 'square-menu-loader',
  async load({ store, parseData, logger }) {
    const writeEntries = async (entries: readonly unknown[]) => {
      for (const entry of entries) {
        if (!isRecord(entry) || typeof entry.id !== 'string' || !entry.id) {
          throw new Error('A menu entry is missing a valid id.');
        }

        const data = await parseData({
          id: entry.id,
          data: entry,
        });

        store.set({
          id: entry.id,
          data,
        });
      }
    };

    store.clear();

    try {
      const catalogMenu = await loadCatalogMenu();
      await writeEntries(catalogMenu);
    } catch {
      logger.warn(
        'Square catalog data is unavailable. Using the committed fallback menu.',
      );
      store.clear();
      await writeEntries(fallbackMenu);
    }
  },
};

const menu = defineCollection({
  loader: squareMenuLoader,
  schema: menuItemSchema,
});

export const collections = { menu };
