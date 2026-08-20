import type { Metadata } from 'next';
import type { Locale } from '@/lib/locale';
import { business } from '@content/shared/business';
import { getContent } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tortaselchapin.com';

type PageMetaOptions = {
  locale: Locale;
  title?: string;
  description?: string;
  path: string;
  alternatePaths: { es: string; en: string };
};

export function buildMetadata({
  locale,
  title,
  description,
  path,
  alternatePaths,
}: PageMetaOptions): Metadata {
  const content = getContent(locale);
  const pageTitle = title
    ? `${title} | ${business.name}`
    : content.meta.defaultTitle;
  const pageDescription = description || content.meta.defaultDescription;
  const canonical = `${siteUrl}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: content.meta.keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: {
        es: `${siteUrl}${alternatePaths.es}`,
        en: `${siteUrl}${alternatePaths.en}`,
        'x-default': `${siteUrl}${alternatePaths.es}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_US'],
      url: canonical,
      siteName: business.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: '/images/hero-torta.jpg',
          width: 1200,
          height: 630,
          alt: business.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ['/images/hero-torta.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { siteUrl };
