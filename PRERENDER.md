# Static Prerender — per-route SEO HTML

This site is a client-rendered SPA. Without prerendering, every route is served
the **homepage** `index.html`, so non-JS crawlers (ChatGPT, Perplexity,
Claude, and social/OG scrapers) and even Google's first pass see the wrong
`<title>`, the homepage's `og:`/canonical tags, and an empty body for
`/pricing`, `/weddings`, etc.

`scripts/prerender.mjs` fixes this: after `vite build`, it loads every route
from `sitemap.xml` in a real headless browser and writes the fully-hydrated
HTML to `dist/<route>/index.html`. The page still re-hydrates client-side
(React `createRoot`), so the snapshot is just a faster, crawler-visible first
paint with the correct per-route `<title>`, `<meta description>`, canonical and
`og:url` baked in.

A real browser is used on purpose — the cinematic pages depend on
`window` / `IntersectionObserver` / `<video>`, so a jsdom/SSR prerender would break.

## Run it

```bash
npm run build:seo      # = vite build && node scripts/prerender.mjs
# or, after a normal build:
npm run prerender
```

Output: `dist/index.html`, `dist/pricing/index.html`, `dist/weddings/index.html`, … (25 routes).

The browser is provided by Playwright (already a dependency). In a fresh / CI
environment install it first:

```bash
npx playwright install --with-deps chromium
```

## Activate on deploy

Switch the deploy **build command** from `npm run build` to `npm run build:seo`,
and make sure the build environment installs Chromium first. The normal
`npm run build` is left untouched, so nothing changes until you opt in.

**Vercel** — Build Command: `npx playwright install chromium && npm run build:seo`.
Vercel checks the filesystem before applying SPA rewrites, so the prerendered
`dist/<route>/index.html` files are served automatically; keep the SPA fallback
rewrite for unknown paths.

**Netlify** — Build Command: `npx playwright install --with-deps chromium && npm run build:seo`.
Keep the SPA redirect **unforced** (`/* /index.html 200` with `force = false`,
the default) so existing prerendered files win.

**Cloudflare Pages** — Build Command: `npx playwright install chromium && npm run build:seo`.
Static files are served before the SPA fallback by default.

**No Chromium in the build env?** Run the prerender in a GitHub Action (which
has Playwright), then deploy the produced `dist/`. Ask and this can be wired up.

## Maintenance

- Re-runs automatically every build via `build:seo` — no manual step.
- New routes: add them to `public/sitemap.xml` (the prerender reads it as the
  source of truth) and they'll be snapshotted on the next build.

## Next increment

Per-route titles/descriptions/canonical/og are baked in. Sub-pages still inherit
the homepage's JSON-LD; injecting per-page schema (Service / FAQPage /
BreadcrumbList) via the `RouteSeo` component before the snapshot is the next
step to make each page's structured data crawler-visible too.
