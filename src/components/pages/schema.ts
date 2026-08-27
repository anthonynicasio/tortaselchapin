import {
  business,
  getLocation,
  getNap,
  type Day,
  type LocationId,
} from '../../data/business';
import {
  localizedUrl,
  siteUrl,
  t,
  type Locale,
} from '../../i18n/utils';
import type { MenuItem, SiteMenuSection } from '../../lib/catalog';

export type JsonLdNode = Record<string, unknown>;

const schemaDay: Record<Day, string> = {
  monday: 'https://schema.org/Monday',
  tuesday: 'https://schema.org/Tuesday',
  wednesday: 'https://schema.org/Wednesday',
  thursday: 'https://schema.org/Thursday',
  friday: 'https://schema.org/Friday',
  saturday: 'https://schema.org/Saturday',
  sunday: 'https://schema.org/Sunday',
};

const openingHoursSpecification = business.hours.map((group) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: group.days.map((day) => schemaDay[day]),
  opens: group.opens,
  closes: group.closes,
}));

export function restaurantSchema(
  locale: Locale,
  locationId: LocationId,
): JsonLdNode {
  const location = getLocation(locationId);
  const url = localizedUrl(locale, `/locations/${locationId}`);

  return {
    '@type': 'Restaurant',
    '@id': `${url}#restaurant`,
    name: business.name,
    url,
    description: getNap(locationId),
    telephone: business.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: 'US',
    },
    openingHoursSpecification,
    servesCuisine:
      locale === 'es'
        ? ['Guatemalteca', 'Mexicana', 'Latinoamericana']
        : ['Guatemalan', 'Mexican', 'Latin American'],
    priceRange: '$',
    hasMenu: localizedUrl(locale, '/menu'),
    sameAs: [business.social.tiktok.url],
  };
}

export function websiteSchema(locale: Locale): JsonLdNode {
  const url = localizedUrl(locale, '/');

  return {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: business.name,
    inLanguage: locale,
  };
}

export function organizationSchema(locale: Locale): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl('/')}#organization`,
    name: business.name,
    url: localizedUrl(locale, '/'),
    telephone: business.phoneE164,
    sameAs: [business.social.tiktok.url],
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  const allItems = [
    { name: t(locale, 'breadcrumbs.home'), path: '/' },
    ...items,
  ];

  return {
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}

export function faqSchema(
  questions: Array<{ question: string; answer: string }>,
): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function menuSchema(
  locale: Locale,
  sections: Array<{
    id: SiteMenuSection;
    items: MenuItem[];
  }>,
): JsonLdNode {
  const url = localizedUrl(locale, '/menu');

  return {
    '@type': 'Menu',
    '@id': `${url}#menu`,
    name: t(locale, 'menu.heading'),
    url,
    inLanguage: locale,
    hasMenuSection: sections.map((section) => ({
      '@type': 'MenuSection',
      name: t(locale, `menu.categories.${section.id}`),
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name[locale],
        description: item.description[locale],
        ...(item.priceCents > 0
          ? {
              offers: {
                '@type': 'Offer',
                price: (item.priceCents / 100).toFixed(2),
                priceCurrency: item.currency,
                availability: item.available
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
              },
            }
          : {}),
      })),
    })),
  };
}

export function webPageSchema(
  locale: Locale,
  path: string,
  name: string,
  description: string,
): JsonLdNode {
  const url = localizedUrl(locale, path);

  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
  };
}
