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
// Events primary page schema — Service with 3 tiers (bespoke pricing)
// ---------------------------------------------------------------------------

function eventsService() {
  const areas = [
    "Cochrane", "Calgary", "Canmore", "Banff", "Airdrie",
    "Okotoks", "Bragg Creek", "Priddis", "Lake Louise", "Kananaskis",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private Event Piano — Parker Gawryletz",
    serviceType: "Live piano performance for private events, corporate galas, and social gatherings",
    description:
      "Bespoke live piano for private events across Southern Alberta. Parker arrives with a professional digital piano, weighted keys, and a dedicated sound system calibrated to your venue. Repertoire spans classical, jazz, contemporary, and film scores — curated to the atmosphere of your event.",
    url: `${ORIGIN}/events`,
    areaServed: areas.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" },
    })),
    provider: {
      "@type": "LocalBusiness",
      name: "Parker Gawryletz — Sound Director",
      telephone: "+1-403-830-8930",
      url: `${ORIGIN}/`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "The Moment",
        description: "1 hour — a ceremony, a cocktail hour, or a dinner course. Focused, intentional piano for the part of your event that matters most.",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/events/pricing`,
      },
      {
        "@type": "Offer",
        name: "The Evening",
        description: "2–3 hours — full coverage from arrival through dinner. Repertoire shifts with the energy of the room from ambient to engaging and back again.",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/events/pricing`,
      },
      {
        "@type": "Offer",
        name: "The Full Occasion",
        description: "4+ hours — complete musical direction for extended events. Multiple phases, curated transitions, and the flexibility to read the room all night.",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/events/pricing`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Events pricing sub-route — ItemList of the 3 event tiers
// ---------------------------------------------------------------------------

function eventsPricingTiers() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Private Event Piano Packages",
    description: "Three live piano packages for private events across Southern Alberta. Pricing by quote — contact Parker to discuss your event.",
    url: `${ORIGIN}/events/pricing`,
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Offer",
          name: "The Moment",
          description: "1 hour of live piano. Focused presence for a ceremony, cocktail hour, or dinner course.",
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
          name: "The Evening",
          description: "2–3 hours of live piano. Full event coverage from guest arrival through dinner.",
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
          name: "The Full Occasion",
          description: "4+ hours of complete musical direction. Multiple phases, curated transitions, real-time room reading.",
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "LocalBusiness", name: "Parker Gawryletz — Sound Director", url: `${ORIGIN}/` },
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Teaching primary page schema — Service at $60/hr, in-person + Zoom
// ---------------------------------------------------------------------------

function teachingService() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Piano Mentorship — Parker Gawryletz",
    serviceType: "One-to-one piano lessons and mentorship",
    description:
      "One-to-one piano mentorship at $60 per hour. 60-minute sessions, pay as you go — no packages, no contracts. In-person in Cochrane, Alberta and online via Zoom. Real repertoire from the first week. No grades, no recitals, no deadlines.",
    url: `${ORIGIN}/teaching`,
    areaServed: [
      { "@type": "City", name: "Cochrane", containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" } },
      { "@type": "City", name: "Calgary", containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" } },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: "Parker Gawryletz — Sound Director",
      telephone: "+1-403-830-8930",
      url: `${ORIGIN}/`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Piano Mentorship Sessions",
      itemListElement: [
        {
          "@type": "Offer",
          name: "60-Minute Piano Session",
          description:
            "One hour of focused, one-to-one piano mentorship. No packages or contracts — book as you go. In-person in Cochrane, AB or online via Zoom.",
          price: "60",
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          url: `${ORIGIN}/teaching/pricing`,
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Teaching pricing sub-route — ItemList with $60/hr offer
// ---------------------------------------------------------------------------

function teachingPricingOffer() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Piano Mentorship Pricing",
    description:
      "One-to-one piano mentorship at $60 per hour. 60-minute sessions, pay as you go — no packages, no contracts. In-person in Cochrane, Alberta or online via Zoom.",
    url: `${ORIGIN}/teaching/pricing`,
    numberOfItems: 1,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Offer",
          name: "60-Minute Piano Session",
          description:
            "One hour of one-to-one piano mentorship. Real repertoire from the first week. Your music, your pace — no grades, no recitals.",
          price: "60",
          priceCurrency: "CAD",
          unitCode: "HUR",
          availability: "https://schema.org/InStock",
          seller: { "@type": "LocalBusiness", name: "Parker Gawryletz — Sound Director", url: `${ORIGIN}/` },
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Service areas hub — LocalBusiness with all areaServed
// ---------------------------------------------------------------------------

function serviceAreasHub() {
  const areas = [
    "Cochrane", "Calgary", "Canmore", "Banff", "Airdrie",
    "Okotoks", "Bragg Creek", "Priddis", "Lake Louise", "Kananaskis",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Parker Gawryletz — Ceremony Pianist & Sound Director",
    description:
      "Wedding ceremony pianist and sound director serving Southern Alberta and the Bow Valley. Live piano, Assured Ceremony Audio™ system, and SPL-compliant sound for indoor and outdoor ceremonies including Parks Canada acoustic-only sites at Banff and Lake Louise.",
    url: `${ORIGIN}/`,
    telephone: "+1-403-830-8930",
    email: "parker@parkergawryletz.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cochrane",
      addressRegion: "Alberta",
      addressCountry: "CA",
    },
    areaServed: areas.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" },
    })),
    sameAs: ["https://www.instagram.com/gawryletzmusic"],
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

// ---------------------------------------------------------------------------
// Contact page schema — ContactPage + ContactPoint for wedding inquiries
// ---------------------------------------------------------------------------

function contactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a Conversation — Wedding Piano | Parker Gawryletz",
    description:
      "Tell Parker Gawryletz about your ceremony. He will respond within 24 hours with a complete ceremony audio plan.",
    url: `${ORIGIN}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Parker Gawryletz",
      jobTitle: "Ceremony Pianist & Sound Director",
      telephone: "+1-403-830-8930",
      email: "parker@parkergawryletz.com",
      url: `${ORIGIN}/about`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Booking Inquiry",
        telephone: "+1-403-830-8930",
        email: "parker@parkergawryletz.com",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Southern Alberta, Canada",
        },
        availableLanguage: { "@type": "Language", name: "English" },
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday", "Tuesday", "Wednesday", "Thursday",
              "Friday", "Saturday", "Sunday",
            ],
            description: "Responds within 24 hours",
          },
        ],
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Teaching contact page schema — ContactPage for piano mentorship inquiries
// ---------------------------------------------------------------------------

function teachingContactPage() {
  const areas = [
    { "@type": "City", name: "Cochrane", containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" } },
    { "@type": "City", name: "Calgary",  containedInPlace: { "@type": "AdministrativeArea", name: "Alberta, Canada" } },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a Conversation — Piano Mentorship | Parker Gawryletz",
    description:
      "Enquire about one-to-one piano mentorship with Parker Gawryletz. In-person in Cochrane, AB or online via Zoom. Responds within 24 hours.",
    url: `${ORIGIN}/teaching/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Parker Gawryletz",
      jobTitle: "Piano Mentor",
      telephone: "+1-403-830-8930",
      email: "parker@parkergawryletz.com",
      url: `${ORIGIN}/teaching/about`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Piano Lesson Inquiry",
        telephone: "+1-403-830-8930",
        email: "parker@parkergawryletz.com",
        areaServed: areas,
        availableLanguage: { "@type": "Language", name: "English" },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Events contact page schema — ContactPage for private event bookings
// ---------------------------------------------------------------------------

function eventsContactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a Conversation — Events Piano | Parker Gawryletz",
    description:
      "Enquire about live piano for your private event, corporate gala, or social gathering across Southern Alberta. Parker responds within 24 hours.",
    url: `${ORIGIN}/events/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Parker Gawryletz",
      jobTitle: "Private Event Pianist",
      telephone: "+1-403-830-8930",
      email: "parker@parkergawryletz.com",
      url: `${ORIGIN}/events/about`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Event Booking Inquiry",
        telephone: "+1-403-830-8930",
        email: "parker@parkergawryletz.com",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Southern Alberta, Canada",
        },
        availableLanguage: { "@type": "Language", name: "English" },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Teaching about page schema — Person as piano mentor
// ---------------------------------------------------------------------------

function teachingAboutPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Parker Gawryletz",
    jobTitle: "Piano Mentor",
    description:
      "One-to-one piano mentor in Cochrane, Alberta. 60-minute sessions at $60/hr — real repertoire from the first week, no grades, no recitals, no deadlines. In-person in Cochrane and online via Zoom.",
    url: `${ORIGIN}/teaching/about`,
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
      "Piano performance",
      "Music theory",
      "One-to-one piano teaching",
      "Adult music education",
      "Beginner piano",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Piano Teacher",
      description:
        "One-to-one piano mentorship — $60 per hour, 60-minute sessions, no packages or contracts.",
    },
  };
}

// ---------------------------------------------------------------------------
// Events about page schema — Person as private event pianist
// ---------------------------------------------------------------------------

function eventsAboutPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Parker Gawryletz",
    jobTitle: "Private Event Pianist",
    description:
      "Live piano for private events, corporate galas, charity fundraisers, and dinner parties across Southern Alberta. Parker brings a professional digital piano, weighted keys, and a dedicated sound system calibrated to your venue.",
    url: `${ORIGIN}/events/about`,
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
      "Live piano performance for private events",
      "Corporate event entertainment",
      "Classical piano repertoire",
      "Jazz piano",
      "Contemporary and film score piano",
    ],
    worksFor: {
      "@type": "LocalBusiness",
      name: "Gawryletz Music",
      url: `${ORIGIN}/`,
    },
  };
}

// ---------------------------------------------------------------------------
// Listen page schema — ItemList of MusicRecording (ceremony audio samples)
// ---------------------------------------------------------------------------

function listenPage() {
  const tracks = [
    {
      position: 1,
      name: "Canon in D (reimagined)",
      movement: "Movement I — The Prelude",
      description:
        "Before anyone arrives, the room fills with possibility. A reimagined Canon in D sets the emotional stage for the ceremony to come.",
      src: "/audio/canon-in-d.mp3",
    },
    {
      position: 2,
      name: "A Thousand Years",
      movement: "Movement II — The Processional",
      description:
        "The doors open. Footsteps begin. A Thousand Years on solo piano for the walk down the aisle.",
      src: "/audio/a-thousand-years.mp3",
    },
    {
      position: 3,
      name: "Married Life",
      movement: "Movement III — The Entrance",
      description:
        "Everyone stands. Time stops. Married Life played at the moment the couple sees each other for the first time.",
      src: "/audio/married-life.mp3",
    },
    {
      position: 4,
      name: "At Last",
      movement: "Movement IV — The Vow",
      description:
        "The silence after 'I do.' At Last — the most intimate moment of the ceremony held in solo piano.",
      src: "/audio/at-last.mp3",
    },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Listening Room — Wedding Ceremony Piano Samples",
    description:
      "Four movements of a wedding ceremony performed by Parker Gawryletz. Hear the prelude, processional, entrance, and vow in live solo piano.",
    url: `${ORIGIN}/listen`,
    numberOfItems: tracks.length,
    itemListElement: tracks.map((t) => ({
      "@type": "ListItem",
      position: t.position,
      item: {
        "@type": "MusicRecording",
        name: t.name,
        description: `${t.movement} — ${t.description}`,
        byArtist: {
          "@type": "Person",
          name: "Parker Gawryletz",
          url: `${ORIGIN}/about`,
        },
        url: `${ORIGIN}/listen`,
        audio: {
          "@type": "AudioObject",
          name: t.name,
          description: t.description,
          contentUrl: `${ORIGIN}${t.src}`,
          encodingFormat: "audio/mpeg",
        },
      },
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

  // Weddings page — Service with all areas + Offer for each package
  if (clean === "/weddings") out.push(weddingsService());

  // Pricing page — ItemList of Offers for the three packages
  if (clean === "/pricing") out.push(pricingPackages());

  // Proof page — AggregateRating + individual Review objects
  if (clean === "/proof") out.push(proofReviews());

  // About page — Person schema for Parker Gawryletz
  if (clean === "/about") out.push(parkerPerson());

  // Events primary page — Service with 3 tiers (bespoke pricing)
  if (clean === "/events") out.push(eventsService());

  // Events pricing sub-route — ItemList of the 3 event tiers
  if (clean === "/events/pricing") out.push(eventsPricingTiers());

  // Teaching primary page — Service at $60/hr, in-person + Zoom
  if (clean === "/teaching") out.push(teachingService());

  // Teaching pricing sub-route — ItemList with $60/hr offer
  if (clean === "/teaching/pricing") out.push(teachingPricingOffer());

  // Service areas hub — LocalBusiness with all areaServed
  if (clean === "/service-areas") out.push(serviceAreasHub());

  // Contact page — ContactPage + ContactPoint
  if (clean === "/contact") out.push(contactPage());

  // Listen page — ItemList of MusicRecording (audio samples)
  if (clean === "/listen") out.push(listenPage());

  // Teaching contact sub-route — ContactPage for piano mentorship
  if (clean === "/teaching/contact") out.push(teachingContactPage());

  // Events contact sub-route — ContactPage for private events
  if (clean === "/events/contact") out.push(eventsContactPage());

  // Teaching about sub-route — Person as piano mentor
  if (clean === "/teaching/about") out.push(teachingAboutPerson());

  // Events about sub-route — Person as private event pianist
  if (clean === "/events/about") out.push(eventsAboutPerson());

  // /services and /gallery are canonical aliases for /pricing and /proof
  if (clean === "/services") out.push(pricingPackages());
  if (clean === "/gallery") out.push(proofReviews());

  return out;
}
