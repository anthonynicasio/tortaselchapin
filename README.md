# Tortas El Chapín

Production website for **Tortas El Chapín** — Guatemalan street food in Silver Spring and Hyattsville, Maryland.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/es/` by default.

## URL structure

| Spanish | English |
|---------|---------|
| `/es/` | `/en/` |
| `/es/menu` | `/en/menu` |
| `/es/ubicaciones` | `/en/locations` |
| `/es/nosotros` | `/en/about` |
| `/es/contacto` | `/en/contact` |
| `/es/silver-spring-md` | `/en/silver-spring-md` |
| `/es/hyattsville-md` | `/en/hyattsville-md` |

## Content management

All editable content lives outside UI components:

```
content/
  shared/          # Business NAP, locations, menu, social, videos
  es/index.ts      # All Spanish UI copy, SEO, a11y labels
  en/index.ts      # All English UI copy, SEO, a11y labels
```

### Updating frequently changed data

| What | File |
|------|------|
| Phone, business name | `content/shared/business.ts` |
| Addresses, hours, maps | `content/shared/locations.ts` |
| Menu items & prices | `content/shared/menu.ts` |
| TikTok follower count | `content/shared/social.ts` |
| Social video thumbnails | `content/shared/videos.ts` |
| Spanish copy | `content/es/index.ts` |
| English copy | `content/en/index.ts` |

**Important:** Set `price: null` on menu items until prices are confirmed. The UI shows "Consultar precio" / "Ask for price" instead of inventing prices.

Replace placeholder hours in `content/shared/locations.ts` with verified hours.

Replace placeholder images in `public/images/` with official food photography.

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://tortaselchapin.com
```

## Build

```bash
npm run build
npm start
```

## Language rules

Spanish and English are **completely separate** experiences. No bilingual pages. The only mixed-language element is the ES | EN selector.
