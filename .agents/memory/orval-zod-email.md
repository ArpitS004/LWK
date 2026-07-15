---
name: Orval zod email codegen break
description: OpenAPI format:email on a string schema breaks the generated zod client on this project's pinned zod version
---

Setting `format: email` on a `type: string` OpenAPI schema property causes Orval's zod client generator to emit `zod.email()` (a zod v4 top-level function). This project's pinned zod version (catalog: `^3.25.76`) does not expose `z.email()` as a top-level function, so `pnpm -w run typecheck:libs` fails after codegen with "Property 'email' does not exist on type ...".

**Why:** Orval's zod output targets newer zod syntax for email format regardless of the installed zod major version; there's no config flag observed to suppress it.

**How to apply:** When authoring or editing `lib/api-spec/openapi.yaml`, keep email fields as plain `type: string` (skip the `format: email` annotation) unless the installed zod version is confirmed to support top-level `z.email()`. Re-run codegen + `pnpm run typecheck:libs` after any spec change touching string formats.
