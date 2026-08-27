# Tortas El Chapín

Production Astro 7 site for Tortas El Chapín, deployed on Cloudflare Workers. English routes are unprefixed and Spanish routes use `/es`. Keep online ordering disabled until the live Square catalog has valid variation IDs and positive prices.

## Requirements

- Node.js 22.12 or later
- npm 10 or later
- A Cloudflare account connected to the Git repository
- A Square developer account for catalog and checkout setup

## Local setup

```sh
npm install
cp .env.example .env
npm run dev
```

Set `PUBLIC_ORDERING_ENABLED=false` in `.env` until the Square catalog is ready.

Useful commands:

```sh
npm run check
npm run build
npm run preview
npm run cf-typegen
```

The site is statically generated except for `/api/checkout`, which runs on Cloudflare Workers. Astro generates the sitemap from `PUBLIC_SITE_URL`. `npm run deploy` builds and deploys from an authenticated local Wrangler session.

## Environment variables

Keep the Square access token server-only.

| Variable | Purpose |
| --- | --- |
| `SQUARE_ACCESS_TOKEN` | Square sandbox or production access token. Never prefix this with `PUBLIC_`. |
| `SQUARE_LOCATION_ID` | Square location that fulfills website pickup orders. It must be the Silver Spring location. |
| `SQUARE_ENVIRONMENT` | `sandbox` or `production`. |
| `PUBLIC_ORDERING_ENABLED` | Online ordering is active only when the value is exactly `true`. Keep it `false` until the catalog is ready. |
| `PUBLIC_SITE_URL` | Final public origin used for canonical URLs, social metadata, robots.txt, and the sitemap. |

Use separate sandbox values for local and preview deployments. Use production credentials only for the production Worker. Redeploy after changing any build-time value.

## Cloudflare Workers deployment

This project targets Cloudflare Workers, not Cloudflare Pages, because checkout needs an on-demand server endpoint.

1. Push the repository to GitHub or GitLab with `main` as the production branch.
2. In Cloudflare, open Workers & Pages, create an application, and import the repository.
3. Set the root directory to `/`, the build command to `npm run build`, and the deploy command to `npx wrangler deploy`.
4. In Settings, Builds, add the build variables and secrets. Set `PUBLIC_ORDERING_ENABLED=false` for the first deployment. Add `PUBLIC_SITE_URL`. Add the Square values only when the live catalog is ready.
5. In Settings, Variables & Secrets, add the runtime values used by `/api/checkout`. Store `SQUARE_ACCESS_TOKEN` as a Secret. Add `SQUARE_LOCATION_ID`, `SQUARE_ENVIRONMENT`, and `PUBLIC_ORDERING_ENABLED`.
6. Deploy, attach the custom domain, set `PUBLIC_SITE_URL` to its exact HTTPS origin, and deploy again so canonical URLs and the sitemap use the final domain.

The Square values are needed in both places once ordering is enabled. Build variables load the menu from Square. Runtime variables create the hosted checkout link. Dashboard-managed runtime variables are preserved by `keep_vars` in `wrangler.jsonc`.

## Square sandbox setup

1. Create or select an app in the Square Developer Dashboard.
2. Copy the sandbox access token into `SQUARE_ACCESS_TOKEN`.
3. Copy the sandbox Silver Spring location ID into `SQUARE_LOCATION_ID`.
4. Set `SQUARE_ENVIRONMENT=sandbox`.
5. Keep `PUBLIC_ORDERING_ENABLED=false` while preparing the catalog.
6. In the sandbox catalog, create menu categories named Tortas, Shukos, Tacos, Pollo con Papas, and Bebidas. The loader maps those names to the fixed site sections.
7. Add test items with sellable item variations, fixed USD prices greater than zero, and availability at the selected location.
8. Add Spanish item copy in `src/data/menu.translations.json`, keyed by each Square catalog item ID.
9. Build once and confirm that the menu is loaded from Square.

The catalog loader uses `client.catalog.search`. Checkout uses `client.checkout.paymentLinks.create`.

## End-to-end sandbox checkout test

1. Confirm that menu items have nonempty Square variation IDs and positive prices.
2. Set `PUBLIC_ORDERING_ENABLED=true`.
3. Start the site or deploy a preview.
4. Add items from the menu and open the Order page.
5. Change quantities, remove an item, and confirm the displayed subtotal.
6. Enter a pickup name and submit the form.
7. Complete payment with a payment method documented for the Square sandbox.
8. Confirm that Square redirects to the localized Thanks page and that the local cart is cleared.
9. Confirm that the paid pickup order appears in the Square sandbox Order Manager. Validate the POS workflow against the sandbox tools available to the account.
10. Test invalid cart payloads and verify that the API rejects them.

Client prices are display-only. The checkout form sends only the variation ID and quantity. The server creates a Square order from catalog IDs, so Square remains the source of truth for price. Do not move the token into client code or accept client-provided totals.

## Production switch

1. Verify the production Silver Spring location ID.
2. Verify every production catalog item, variation ID, fixed price, category, and availability.
3. Add production item IDs to `src/data/menu.translations.json` where Spanish copy is needed.
4. Set the Cloudflare production build and runtime values for `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, and `SQUARE_ENVIRONMENT=production`.
5. Set the final `PUBLIC_SITE_URL`.
6. Deploy with `PUBLIC_ORDERING_ENABLED=false` and inspect the public menu.
7. Run a controlled production checkout test.
8. Set `PUBLIC_ORDERING_ENABLED=true` only after the catalog IDs, prices, pickup location, and payment flow are ready.

Paid pickup orders created by the payment link appear in Square POS and Order Manager for the configured location.

## Menu data

`src/data/menu.fallback.json` keeps the site buildable when Square is unavailable. Its blank catalog IDs and zero prices intentionally do not support checkout. Checkout becomes available only when live Square data supplies valid variation IDs and positive prices.

`src/data/menu.translations.json` maps a Square catalog item ID to Spanish `name` and `description` values. English text comes from Square. If a translation is missing, the loader uses the English text.

To add a menu item:

1. Add the item and a fixed-price variation in Square.
2. Assign it to one of the supported menu categories.
3. Make it present and available at the configured location.
4. Add its Spanish translation by Square item ID.
5. Redeploy so the build fetches the updated catalog.

An optional Square `catalog.version.updated` webhook can trigger an authenticated CI workflow after catalog changes. Validate the Square signature before starting a new Cloudflare build.

## Images

Approved brand and menu photography lives in `src/assets`. Astro generates optimized AVIF and WebP output during the build. `src/components/DishPhoto.astro` maps the four confirmed fallback menu items to their local photos and uses the neutral placeholder only when an item has no approved local or Square image.

Square item image hosts must be verified before adding them to `image.remotePatterns` in `astro.config.mjs`. Do not allow an unverified wildcard host. Until that review is complete, keep local placeholders.

## Open launch markers

Search the repository for `[PLACEHOLDER:` and `[VERIFY:`. Open items are:

- `[PLACEHOLDER: Final public domain.]` Set `PUBLIC_SITE_URL` in Cloudflare build variables.
- `[PLACEHOLDER: Verified menu prices.]` Replace fallback zero prices with positive prices from the live Square catalog.
- `[PLACEHOLDER: Silver Spring coordinates.]` Add verified latitude and longitude to its Restaurant JSON-LD.
- `[PLACEHOLDER: Hyattsville coordinates.]` Add verified latitude and longitude to its Restaurant JSON-LD.
- `[PLACEHOLDER: Silver Spring parking details.]` Confirm current parking information.
- `[PLACEHOLDER: Hyattsville parking details.]` Confirm current parking information.
- `[PLACEHOLDER: Silver Spring nearby landmark.]` Add only after verification.
- `[PLACEHOLDER: Hyattsville nearby landmark.]` Add only after verification.
- `[VERIFY: Hyattsville street number.]` Confirm whether the address is 1410 Merrimac Dr or 1409 Merrimac Dr.
- `[VERIFY: Third-party delivery availability.]` Confirm before adding any delivery claim.
- `[PLACEHOLDER: Facebook URL.]` Add the confirmed business page URL.
- `[PLACEHOLDER: Verified Square image host.]` Review the host before changing Astro remote image rules.

Online ordering is a separate launch gate even though it is not a content marker. Leave it disabled until the live catalog IDs and prices are ready.
