import type { Locale } from '@/lib/locale';
import esContent from '@content/es';
import enContent from '@content/en';

export type Content = (typeof esContent | typeof enContent);

const contentMap: Record<Locale, Content> = {
  es: esContent,
  en: enContent,
};

export function getContent(locale: Locale): Content {
  return contentMap[locale];
}

export function formatPrice(price: number | null, locale: Locale): string | null {
  if (price === null) return null;
  return new Intl.NumberFormat(locale === 'es' ? 'es-US' : 'en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
