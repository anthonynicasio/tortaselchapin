import type { APIRoute } from 'astro';

import { getSiteOrigin } from '../i18n/utils';

export const prerender = true;

export const GET: APIRoute = () => {
  const sitemapUrl = new URL('/sitemap-index.xml', getSiteOrigin());
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
