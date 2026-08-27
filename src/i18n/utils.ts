import en from './en.json';
import es from './es.json';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const DEFAULT_SITE_URL = 'https://PLACEHOLDER-DOMAIN.com';

type TranslationDictionary = typeof en;

const dictionaries: Record<Locale, TranslationDictionary> = { en, es };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function lookup(dictionary: unknown, dottedKey: string): unknown {
  return dottedKey.split('.').reduce<unknown>((current, segment) => {
    if (!isRecord(current)) {
      return undefined;
    }

    return current[segment];
  }, dictionary);
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

export function t(locale: Locale, dottedKey: string): string {
  const translated = lookup(dictionaries[locale], dottedKey);

  if (typeof translated === 'string') {
    return translated;
  }

  const english = lookup(dictionaries.en, dottedKey);
  return typeof english === 'string' ? english : dottedKey;
}

function pathnameFrom(input: URL | string): string {
  if (input instanceof URL) {
    return input.pathname;
  }

  try {
    return new URL(input).pathname;
  } catch {
    return input.split(/[?#]/, 1)[0] || '/';
  }
}

export function getLocale(input: URL | string): Locale {
  const firstSegment = pathnameFrom(input).split('/').filter(Boolean)[0];
  return firstSegment === 'es' ? 'es' : defaultLocale;
}

function splitSuffix(path: string): { pathname: string; suffix: string } {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');
  const candidates = [queryIndex, hashIndex].filter((index) => index >= 0);
  const suffixIndex = candidates.length > 0 ? Math.min(...candidates) : -1;

  if (suffixIndex < 0) {
    return { pathname: path, suffix: '' };
  }

  return {
    pathname: path.slice(0, suffixIndex),
    suffix: path.slice(suffixIndex),
  };
}

export function unprefixedPath(path: string): string {
  const { pathname, suffix } = splitSuffix(path);
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  let normalized = withLeadingSlash.replace(/\/{2,}/g, '/');

  if (normalized === '/es' || normalized === '/en') {
    normalized = '/';
  } else if (normalized.startsWith('/es/') || normalized.startsWith('/en/')) {
    normalized = normalized.slice(3);
  }

  return `${normalized || '/'}${suffix}`;
}

export function localizedPath(locale: Locale, unprefixed: string): string {
  const clean = unprefixedPath(unprefixed);
  const { pathname, suffix } = splitSuffix(clean);

  if (locale === 'en') {
    return `${pathname}${suffix}`;
  }

  const localized = pathname === '/' ? '/es' : `/es${pathname}`;
  return `${localized}${suffix}`;
}

export function alternatePath(currentLocale: Locale, currentPath: URL | string): string {
  const targetLocale: Locale = currentLocale === 'en' ? 'es' : 'en';
  return localizedPath(targetLocale, pathnameFrom(currentPath));
}

export function getSiteOrigin(): URL {
  const configured = import.meta.env.PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

  try {
    const url = new URL(configured);
    return new URL(url.origin);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function siteUrl(path = '/'): string {
  return new URL(pathnameFrom(path), getSiteOrigin()).toString();
}

export function localizedUrl(locale: Locale, path = '/'): string {
  return new URL(localizedPath(locale, path), getSiteOrigin()).toString();
}
