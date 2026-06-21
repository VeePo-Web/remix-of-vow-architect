import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteSchemas } from "@/lib/routeSchema";

const ORIGIN = "https://gawryletzmusic.com";

/**
 * RouteSeo — keeps the canonical URL and og:url/twitter:url in sync with the
 * current route. index.html hardcodes these to the homepage, so without this
 * every sub-route reported its canonical as "/" — telling search engines the
 * pages are duplicates of the homepage. Path-based, no per-page config needed.
 *
 * (Per-page title/description are still set by each page; this only fixes the
 * URL-identity tags that were stuck on the homepage value.)
 */
function upsertMeta(selector: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute("content", value);
}

export function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const url = ORIGIN + path;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    upsertMeta('meta[property="og:url"]', url);
    upsertMeta('meta[name="twitter:url"]', url);

    // Per-route JSON-LD (BreadcrumbList, FAQPage…). Remove the previous route's
    // injected blocks first so they don't accumulate across client navigation.
    document.head
      .querySelectorAll('script[data-route-schema]')
      .forEach((el) => el.remove());
    for (const schema of getRouteSchemas(pathname)) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-route-schema", "");
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
  }, [pathname]);

  return null;
}
