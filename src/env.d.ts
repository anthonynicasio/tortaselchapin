/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SQUARE_ACCESS_TOKEN?: string;
  readonly SQUARE_LOCATION_ID?: string;
  readonly SQUARE_ENVIRONMENT?: 'sandbox' | 'production';
  readonly PUBLIC_ORDERING_ENABLED?: 'true' | 'false';
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
