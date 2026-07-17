# LWK* (LOWKEY ALWAYS)

A real Indian streetwear brand storefront — white/black/blood-red brand system, INR pricing, General Sans + Inter typography, 12 real products across 3 drops (Drop 001 Lowkey. Always. / Drop 002 Off The Radar / Drop 003 Unseen), categories: T-Shirts / Hoodies / Bottoms / Accessories. Pages: home, shop (filter/search), collections, product detail (variants, cart, wishlist), guest checkout with GST + free-shipping logic, order confirmation, lookbook, about, 404.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/lwk run dev` — run the storefront frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Frontend: React + Vite (artifact `lwk`), shadcn/radix components, framer-motion
- Build: esbuild (CJS bundle)

## Where things live

- API contract: `lib/api-spec/openapi.yaml` (source of truth) → codegen produces `lib/api-zod/src/generated` (Zod schemas) and `lib/api-client-react/src/generated` (React Query hooks)
- DB schema: `lib/db/src/schema/*.ts` (products, collections, reviews, orders, newsletter, contact)
- API routes: `artifacts/api-server/src/routes/*.ts`, one router per domain
- Storefront: `artifacts/lwk/src` — pages under `src/pages`, cart/wishlist context under `src/lib`
- Seed catalog imagery: `artifacts/lwk/public/catalog/{products,collections}`

## Architecture decisions

- Cart and wishlist are client-side only (localStorage), not backed by the API — there was no product-ownership/session concept needed for a guest-checkout MVP.
- Checkout is a placeholder: orders are created for real via the API (persisted, with a real order number you can look up), but no payment processor is wired up yet — deferred per user's choice until real payments are needed.
- Account/login/signup and an admin/CMS panel were deliberately deferred out of this first build — this phase is the customer-facing storefront only.

## Product

- Real brand: LWK* (LOWKEY ALWAYS), est. 2024, India. Blood red #6A1F24 accent, bone off-white, black #111111.
- Currency: INR (₹) — prices stored as plain rupee numbers in the DB. `formatPrice()` helper in `src/lib/format.ts` formats with `₹` and `en-IN` locale grouping.
- Catalog: 3 collections (lowkey-always, off-the-radar, unseen) and 12 products across tees / hoodies / bottoms / accessories.
- Checkout: free shipping when subtotal ≥ ₹1999, else ₹99 flat; 18% GST applied. No real payment processor yet — orders persist for real.
- Typography: General Sans (via Fontshare) for headings, Inter (Google Fonts) for body — free substitutes for the brand spec's Neue Montreal Bold + General Sans + Inter.
- Nav: Home / Shop / Collections / About / Lookbook. Top announcement bar with free-shipping promo. Logo: LWK* (asterisk in accent color).
- Route `/lookbook` maps to the journal component (renamed from `/journal`).
- No account/login/signup and no admin/CMS panel yet — planned follow-up.

## User preferences

- User chose to build the full checkout/order flow now with a placeholder payment step, wiring real payment processing later rather than blocking on it now.

## Gotchas

- OpenAPI `format: email` on string schemas causes Orval to emit `zod.email()`, which doesn't exist on this project's pinned zod version (top-level `z.email()` is zod v4 syntax) — leave email fields as plain `type: string` in the spec to avoid breaking codegen typecheck.
- Images referenced in frontend code must be imported as ES modules via the `@assets/...` alias (e.g. `import x from "@assets/generated_images/x.jpg"`), not referenced as raw `/attached_assets/...` URL strings — the latter renders as a broken image since that path isn't served statically.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
