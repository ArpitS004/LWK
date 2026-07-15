# LWK (Lowkey Always)

A dark, minimal luxury streetwear e-commerce storefront — home, shop with filters/search, collections, product detail, cart/wishlist, guest checkout, order confirmation, journal/lookbook, and policy pages.

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

- Customer-facing storefront only: home, shop (filter/search), collection pages, product detail (variants, reviews, related items), cart, guest checkout, order confirmation, wishlist, about, journal, contact, FAQ, shipping/returns, privacy, terms, 404.
- No account/login/signup and no admin/CMS panel yet — planned as a follow-up phase.
- Checkout does not process real payments yet — orders are created and stored for real, but payment collection is a placeholder step pending a future integration decision (e.g. Stripe).

## User preferences

- User chose to build the full checkout/order flow now with a placeholder payment step, wiring real payment processing later rather than blocking on it now.

## Gotchas

- OpenAPI `format: email` on string schemas causes Orval to emit `zod.email()`, which doesn't exist on this project's pinned zod version (top-level `z.email()` is zod v4 syntax) — leave email fields as plain `type: string` in the spec to avoid breaking codegen typecheck.
- Images referenced in frontend code must be imported as ES modules via the `@assets/...` alias (e.g. `import x from "@assets/generated_images/x.jpg"`), not referenced as raw `/attached_assets/...` URL strings — the latter renders as a broken image since that path isn't served statically.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
