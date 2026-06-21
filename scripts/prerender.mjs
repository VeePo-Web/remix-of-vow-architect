/**
 * Static prerender — snapshots each route's fully-hydrated HTML into
 * dist/<route>/index.html so non-JS crawlers (ChatGPT, Perplexity, social
 * scrapers) and Google see real per-page content + the correct per-route
 * <title>, <meta description>, canonical and og:url instead of the homepage
 * shell. The app re-hydrates client-side as normal (createRoot), so the
 * snapshot is just a faster, crawler-visible first paint.
 *
 * Run AFTER `vite build`:  node scripts/prerender.mjs
 * (Requires a Chromium for Playwright — `npx playwright install chromium`.)
 *
 * Uses the real browser on purpose: this site relies heavily on window /
 * IntersectionObserver / video, so a jsdom/SSR prerender would break.
 */
import { preview } from "vite";
import { chromium } from "@playwright/test";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const PORT = 4180;
const DIST = join(process.cwd(), "dist");

if (!existsSync(join(DIST, "index.html"))) {
  console.error("dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

// Derive routes from the committed sitemap (single source of truth).
const sitemap = readFileSync(join(process.cwd(), "public", "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
  .map((m) => m[1] || "/")
  .map((p) => (p === "" ? "/" : p));

const server = await preview({ preview: { port: PORT, strictPort: true } });
const base = `http://localhost:${PORT}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let ok = 0;
for (const route of routes) {
  try {
    // Not networkidle: the cinematic pages stream video and never go idle.
    await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 });
    // let React mount + the per-page useEffect (title/description) + RouteSeo (canonical/og) run
    await page.waitForFunction(() => document.title && document.title.length > 0, { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1500);
    const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
    const outPath = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    const title = await page.title();
    console.log(`✓ ${route.padEnd(28)} → ${outPath.replace(DIST, "dist")}  [${title.slice(0, 42)}]`);
    ok++;
  } catch (err) {
    console.error(`✗ ${route} — ${err.message}`);
  }
}

await browser.close();
await new Promise((r) => server.httpServer.close(r));
console.log(`\nPrerendered ${ok}/${routes.length} routes.`);
