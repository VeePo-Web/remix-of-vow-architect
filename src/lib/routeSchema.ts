import { topTenFAQs } from "@/components/FAQTopTen";
import { getServiceArea } from "@/config/serviceAreas";

// ---------------------------------------------------------------------------
// FAQ data for sub-routes — kept here to avoid importing React page components
// ---------------------------------------------------------------------------

const eventsFaqs = [
  { q: "What kind of events do you play?",     a: "Corporate galas, charity fundraisers, private dinner parties, cocktail receptions, holiday events, product launches, and any gathering that benefits from live piano. If it involves people and a moment, I can elevate it." },
  { q: "Can you play specific songs or genres?", a: "Yes. I work from a repertoire spanning classical, jazz standards, contemporary pop, film scores, and holiday music. You can request specific songs or describe the atmosphere you want and I will build a curated setlist." },
  { q: "How much space do you need?",           a: "Approximately 6 feet by 4 feet for the instrument and bench. I can work with tight spaces — corners, stages, alcoves. During the planning call, we confirm placement based on your floor plan." },
  { q: "Do you bring your own instrument?",     a: "Yes. I arrive with a professional digital piano, weighted keys, and a dedicated sound system calibrated to your venue's acoustics. If your venue has a grand piano in good condition, I am happy to use it instead." },
  { q: "How far in advance should I book?",     a: "For peak season events (November through January, June through August), I recommend booking at least six weeks ahead. For other dates, two to three weeks is usually sufficient. Check my availability anytime — I respond within 24 hours." },
  { q: "Can you adjust volume for speeches?",   a: "Absolutely. I coordinate with your MC or event manager in advance. Volume adjustments happen in real time — fade down for speeches, fade up for ambience. It is seamless." },
  { q: "What happens if there is a power outage?", a: "I carry backup power and redundant audio systems. In my entire career, no event has lost music due to a technical failure. I plan for the worst so you never have to think about it." },
  { q: "Do you play during the entire event?",  a: "I offer packages from one hour to full-day coverage. Most events book two to four hours with breaks built in. We agree on the schedule in advance so there are no gaps in your experience." },
];

const teachingFaqs = [
  { q: "What age do you start teaching?",         a: "I accept students from age six and up. For younger children, I focus on ear training, rhythm games, and keyboard exploration before introducing notation. Adults are always welcome — it is never too late to start." },
  { q: "Do I need a piano at home?",              a: "Yes. Consistent practice requires daily access to a keyboard. A weighted 88-key digital piano is sufficient for anyone starting out. I can recommend specific models during our first conversation." },
  { q: "How long are the sessions?",              a: "Sessions are 60 minutes. The full hour is yours — there is no rushing through material to hit a milestone. We decide together what to focus on, and we follow it." },
  { q: "Do you teach music theory?",              a: "Theory is woven into every session — not as a separate subject, but as context for what you are playing. You will understand why the music works, not just how to play the notes." },
  { q: "Can I learn a specific song I love?",     a: "That is exactly where I start. Tell me the song, and I will build a path to it — breaking it into pieces that are achievable at your current level, then reassembling it so it sounds like you intended it all along." },
  { q: "What if my child wants to quit?",         a: "I have a candid conversation with both the student and the parent. Often the issue is not the instrument — it is the repertoire or the pace. A small adjustment can reignite the spark. If it is truly time to stop, I respect that decision." },
  { q: "Do you teach online?",                    a: "Yes. Online sessions are available via Zoom with the same structure and attention as in-person. Many students prefer the convenience, and the quality is excellent with a proper camera angle on the keys." },
  { q: "How often should my child practice?",     a: "Daily practice is ideal — even 15 minutes is valuable when you are starting out. Quality matters more than quantity. I provide specific, actionable practice instructions after every session so the student knows exactly what to work on." },
];

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
  "/teaching/faq": "Lesson FAQ",
  "/events": "Private Events",
  "/events/about": "About",
  "/events/pricing": "Pricing",
  "/events/contact": "Contact",
  "/events/faq": "Event FAQ",
  "/pricing": "Pricing",
  "/proof": "Proof",
  "/about": "About",
  "/service-areas": "Service Areas",
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
    const fallback = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ name: LABELS[acc] ?? fallback, path: acc });
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
  // Wedding FAQ lives on /faq
  if (clean === "/faq") out.push(faqPage());

  // Events FAQ sub-route
  if (clean === "/events/faq") {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: eventsFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  // Teaching/lesson FAQ sub-route
  if (clean === "/teaching/faq") {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: teachingFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  // Service-area city pages: localized Service + FAQPage.
  const areaMatch = clean.match(/^\/service-areas\/([^/]+)$/);
  if (areaMatch) {
    const area = getServiceArea(areaMatch[1]);
    if (area) {
      out.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Wedding Ceremony Pianist in ${area.city}`,
        serviceType: "Wedding ceremony piano + vow/officiant microphones + SPL-aware mixing",
        areaServed: { "@type": "City", name: `${area.city}, ${area.region}` },
        provider: {
          "@type": "LocalBusiness",
          name: "Parker Gawryletz — Sound Director",
          telephone: "+1-403-830-8930",
          url: ORIGIN + "/",
        },
        url: `${ORIGIN}/service-areas/${area.slug}`,
      });
      out.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: area.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }
  }
  return out;
}
