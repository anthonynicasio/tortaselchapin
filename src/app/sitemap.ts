import type { MetadataRoute } from 'next';
import { locales, pageSlugs } from '@/lib/locale';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tortaselchapin.com';

const staticPages = ['', 'menu', 'locations', 'about', 'contact', 'silver-spring-md', 'hyattsville-md'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const pageKey of Object.keys(pageSlugs[locale]) as (keyof typeof pageSlugs.es)[]) {
      const slug = pageSlugs[locale][pageKey];
      const path = slug ? `/${locale}/${slug}` : `/${locale}`;
      entries.push({
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: pageKey === 'home' ? 'weekly' : 'monthly',
        priority: pageKey === 'home' ? 1 : pageKey === 'menu' ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
