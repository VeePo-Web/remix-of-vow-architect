import { topTenFAQs } from "@/components/FAQTopTen";

/**
 * Per-route JSON-LD. index.html carries the homepage graph (LocalBusiness,
 * Service, venues); this adds crawler-visible structured data to the SUB-routes,
 * which otherwise inherited only the homepage's schema. Injected by RouteSeo and
 * baked into the static prerender.
 */
const ORIGIN = "https://gawryletzmusic.com";

const LABELS: Record<string, string> = {
  "/": "Home",
  "/weddings": "Weddings",
  "/teaching": "Piano Mentorship",
  "/teaching/about": "About",
  "/teaching/pricing": "Pricing",
  "/teaching/contact": "Contact",
  "/teaching/faq": "FAQ",
  "/events": "Private Events",
  "/events/about": "About",
  "/events/pricing": "Pricing",
  "/events/contact": "Contact",
  "/events/faq": "FAQ",
  "/pricing": "Pricing",
  "/proof": "Proof",
  "/about": "About",
  "/listen": "Listen",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/terms": "Terms",
  "/cookie-policy": "Cookie Policy",
  "/accessibility": "Accessibility",
  "/legal": "Legal",
};

function breadcrumb(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return null; // home needs no breadcrumb
  const segments = clean.split("/").filter(Boolean);
  const items = [{ name: "Home", path: "/" }];
  let acc = "";
  for (const seg of segments) {
    acc += "/" + seg;
    items.push({ name: LABELS[acc] ?? seg, path: acc });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: ORIGIN + (it.path === "/" ? "/" : it.path),
    })),
  };
}

function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topTenFAQs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** All route-specific JSON-LD objects for the given path. */
export function getRouteSchemas(pathname: string): object[] {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const out: object[] = [];
  const crumb = breadcrumb(clean);
  if (crumb) out.push(crumb);
  // The wedding FAQ content lives on /faq; reuse it there.
  if (clean === "/faq") out.push(faqPage());
  return out;
}
