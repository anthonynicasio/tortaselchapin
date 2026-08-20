import type { Locale } from '@/lib/locale';
import { business } from '@content/shared/business';
import { social } from '@content/shared/social';
import type { Location } from '@content/shared/locations';
import { getContent } from '@/lib/content';
import { getUsedCategories, menuItems } from '@content/shared/menu';
import { siteUrl } from '@/lib/seo';

function formatOpeningHours(location: Location) {
  return location.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day.charAt(0).toUpperCase() + h.day.slice(1),
    opens: h.open,
    closes: h.close,
  }));
}

export function buildLocalBusinessSchema(location: Location, locale: Locale) {
  const content = getContent(locale);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodEstablishment', 'Restaurant'],
    '@id': `${siteUrl}/${locale}/${location.slug}#business`,
    name: business.name,
    description: content.meta.defaultDescription,
    url: `${siteUrl}/${locale}/${location.slug}`,
    telephone: business.phone,
    image: `${siteUrl}/images/hero-torta.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: formatOpeningHours(location),
    servesCuisine: ['Guatemalan', 'Latin American', 'Street Food'],
    priceRange: '$$',
    sameAs: [social.tiktok.url, social.facebook.url, social.instagram.url],
    hasMap: location.mapsUrl,
  };
}

export function buildOrganizationSchema(locale: Locale) {
  const content = getContent(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: business.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: content.meta.defaultDescription,
    telephone: business.phone,
    sameAs: [social.tiktok.url, social.facebook.url, social.instagram.url],
  };
}

export function buildMenuSchema(locale: Locale) {
  const content = getContent(locale);
  const categories = getUsedCategories();

  const sections = categories.map((category) => ({
    '@type': 'MenuSection',
    name: content.menuCategories[category],
    hasMenuItem: menuItems
      .filter((item) => item.category === category && item.available)
      .map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description[locale],
        ...(item.price !== null && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
          },
        }),
      })),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: content.menuPage.heading,
    description: content.menuPage.subheading,
    hasMenuSection: sections,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
