export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type PageKey =
  | 'home'
  | 'menu'
  | 'locations'
  | 'about'
  | 'contact'
  | 'silver-spring'
  | 'hyattsville';

export const pageSlugs: Record<Locale, Record<PageKey, string>> = {
  es: {
    home: '',
    menu: 'menu',
    locations: 'ubicaciones',
    about: 'nosotros',
    contact: 'contacto',
    'silver-spring': 'silver-spring-md',
    hyattsville: 'hyattsville-md',
  },
  en: {
    home: '',
    menu: 'menu',
    locations: 'locations',
    about: 'about',
    contact: 'contact',
    'silver-spring': 'silver-spring-md',
    hyattsville: 'hyattsville-md',
  },
};

export function findPageKey(locale: Locale, slug: string): PageKey | undefined {
  const entries = Object.entries(pageSlugs[locale]) as [PageKey, string][];
  const match = entries.find(([, s]) => s === slug);
  return match?.[0];
}

export function getLocalizedPath(
  targetLocale: Locale,
  currentLocale: Locale,
  currentSlug: string
): string {
  const pageKey = findPageKey(currentLocale, currentSlug);
  if (!pageKey) return `/${targetLocale}`;
  const targetSlug = pageSlugs[targetLocale][pageKey];
  return targetSlug ? `/${targetLocale}/${targetSlug}` : `/${targetLocale}`;
}

export const headerNavRoutes: { key: PageKey; labelKey: 'home' | 'menu' | 'locations' }[] = [
  { key: 'home', labelKey: 'home' },
  { key: 'menu', labelKey: 'menu' },
  { key: 'locations', labelKey: 'locations' },
];

export const navRoutes: { key: PageKey; labelKey: 'home' | 'menu' | 'locations' | 'about' | 'contact' }[] = [
  { key: 'home', labelKey: 'home' },
  { key: 'menu', labelKey: 'menu' },
  { key: 'locations', labelKey: 'locations' },
  { key: 'about', labelKey: 'about' },
  { key: 'contact', labelKey: 'contact' },
];

export function getNavHref(locale: Locale, pageKey: PageKey): string {
  const slug = pageSlugs[locale][pageKey];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function isValidSlug(locale: Locale, slug: string): boolean {
  return Object.values(pageSlugs[locale]).includes(slug);
}

export const LOCALE_COOKIE = 'NEXT_LOCALE';
