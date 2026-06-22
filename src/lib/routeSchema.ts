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

// ---------------------------------------------------------------------------
// Wedding service page schema
// ---------------------------------------------------------------------------

function weddingsService() {
  const areas = [
    "Cochrane", "Calgary", "Canmore", "Banff", "Airdrie",
    "Okotoks", "Bragg Creek", "Priddis", "Lake Louise", "Kananaskis",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wedding Ceremony Piano — Parker Gawryletz",
    serviceType: "Wedding ceremony piano performance and vow clarity audio",
    description:
      "Live piano for wedding ceremonies across Southern Alberta. Includes the Assured Ceremony Audio™ system — vow and officiant microphones, SPL-aware mixing, silent battery power, and triple redundancy.",
    url: `${ORIGIN}/weddings`,
    areaServed: areas.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" } })),
    provider: {
      "@type": "LocalBusiness",
      name: "Parker Gawryletz — Sound Director",
      telephone: "+1-403-830-8930",
      url: `${ORIGIN}/`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "The Vow",
        description: "Ceremony only — 30–45 minutes of devoted presence.",
        price: "650",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/pricing`,
      },
      {
        "@type": "Offer",
        name: "The Hour",
        description: "Prelude through cocktail hour — guest arrival, ceremony, and cocktails. The most chosen package.",
        price: "750",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/pricing`,
      },
      {
        "@type": "Offer",
        name: "The Story",
        description: "Full-day musical presence — from first guest to last glass raised.",
        price: "1200",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/pricing`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Pricing page schema — packages as ItemList of Offers
// ---------------------------------------------------------------------------

function pricingPackages() {
  const commonIncludes =
    "Full 88-key piano, Vow clarity system, triple redundancy, 60-minute early arrival, $4M liability insurance, and a collaborative cue sheet co-authored with your planner and officiant.";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wedding Ceremony Piano Packages",
    description: "Three wedding ceremony piano packages serving Southern Alberta and the Bow Valley.",
    url: `${ORIGIN}/pricing`,
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Offer",
          name: "The Vow",
          description: `Ceremony only — 30–45 minutes of devoted presence. ${commonIncludes}`,
          price: "650",
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "LocalBusiness", name: "Parker Gawryletz — Sound Director", url: `${ORIGIN}/` },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Offer",
          name: "The Hour",
          description: `Prelude + ceremony + cocktails. ${commonIncludes} Most commonly chosen package.`,
          price: "750",
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "LocalBusiness", name: "Parker Gawryletz — Sound Director", url: `${ORIGIN}/` },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Offer",
          name: "The Story",
          description: `Full-day musical witness — first guest to last glass raised. ${commonIncludes}`,
          price: "1200",
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "LocalBusiness", name: "Parker Gawryletz — Sound Director", url: `${ORIGIN}/` },
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Proof page schema — AggregateRating + individual Reviews
// ---------------------------------------------------------------------------

function proofReviews() {
  const reviews = [
    {
      author: "Elise",
      location: "Canmore",
      body: "We included the volume documentation in our permit application — approved instantly.",
    },
    {
      author: "Miguel",
      location: "Deane House, Calgary",
      body: "Our planner called Parker the most prepared musician she has ever worked with.",
    },
    {
      author: "Jasmine & Colin",
      location: "Calgary",
      body: "The venue waived their deposit — the policy covered everything.",
    },
  ];
  const itemReviewed = {
    "@type": "LocalBusiness",
    name: "Parker Gawryletz — Sound Director",
    url: `${ORIGIN}/`,
  };
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Parker Gawryletz — Sound Director",
    url: `${ORIGIN}/`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(reviews.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", "name": r.author },
      locationCreated: r.location,
      reviewBody: r.body,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      itemReviewed,
    })),
  };
}

// ---------------------------------------------------------------------------
// About page schema — Person for Parker Gawryletz
// ---------------------------------------------------------------------------

function parkerPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Parker Gawryletz",
    jobTitle: "Ceremony Pianist & Sound Director",
    description:
      "Southern Alberta wedding ceremony pianist with 500+ events witnessed. Creator of the Assured Ceremony Audio™ system for SPL-compliant outdoor and Parks Canada acoustic-only ceremonies. Based in Cochrane, Alberta.",
    url: `${ORIGIN}/about`,
    telephone: "+1-403-830-8930",
    email: "parker@parkergawryletz.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cochrane",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    sameAs: ["https://www.instagram.com/gawryletzmusic"],
    knowsAbout: [
      "Wedding ceremony piano performance",
      "Vow clarity audio systems",
      "SPL-compliant outdoor ceremony sound",
      "Banff National Park acoustic-only ceremonies",
      "Piano mentorship and one-to-one teaching",
    ],
    worksFor: {
      "@type": "LocalBusiness",
      name: "Gawryletz Music",
      url: `${ORIGIN}/`,
    },
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

  // Weddings page — Service with all areas + Offer for each package
  if (clean === "/weddings") out.push(weddingsService());

  // Pricing page — ItemList of Offers for the three packages
  if (clean === "/pricing") out.push(pricingPackages());

  // Proof page — AggregateRating + individual Review objects
  if (clean === "/proof") out.push(proofReviews());

  // About page — Person schema for Parker Gawryletz
  if (clean === "/about") out.push(parkerPerson());

  return out;
}
