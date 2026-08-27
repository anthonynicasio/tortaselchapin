import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const fileEnvironment = loadEnv(mode, process.cwd(), '');
const site =
  process.env.PUBLIC_SITE_URL?.trim() ||
  fileEnvironment.PUBLIC_SITE_URL?.trim() ||
  'https://PLACEHOLDER-DOMAIN.com';

export default defineConfig({
  site,
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),
  session: false,
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    remotePatterns: [
      // A verified Square item image host is still needed.
    ],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-US',
        },
      },
    }),
  ],
  prefetch: false,
});
