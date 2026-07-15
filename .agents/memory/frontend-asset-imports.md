---
name: Frontend asset import convention
description: How to reference generated/attached images in react-vite artifact frontend code
---

Images generated via `generateImage` land in the workspace-level `attached_assets/generated_images/` directory, which is aliased in each react-vite artifact's `vite.config.ts` as `@assets`. That alias only works through ES module imports — it is not served as a static URL path.

**Why:** A design subagent build used raw string paths like `"/attached_assets/generated_images/hero.jpg"` as `<img src>` values; these 404'd because that path isn't in the artifact's `public/` dir or otherwise statically served.

**How to apply:** Always reference these images with `import heroImg from "@assets/generated_images/hero.jpg"` and use the imported variable as the `src`/background value — never a raw path string. This matches the documented convention in the react-vite skill's frontend-general-rules reference.

When editing JSX to remove/add a wrapping element (e.g. removing a forced theme-toggle `<div className="dark">` wrapper), double check the closing tag is preserved — removing the opening tag's wrapping semantics without removing/relocating its matching closing tag breaks the whole component tree and shows as a blank white screen with a Babel "missing closing tag" error in the dev server log, not a visible error in the browser.
