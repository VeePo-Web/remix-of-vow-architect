/**
 * Local SEO service-area data. Each city carries genuinely specific content
 * (real venues, local ceremony conditions, local FAQ) so the geo pages read as
 * useful local resources rather than thin "city name swapped" duplicates —
 * the difference between ranking and being filtered.
 */
export interface ServiceArea {
  slug: string;
  city: string;
  region: string; // for headings/schema
  /** 150–160 char meta description */
  metaDescription: string;
  /** 1–2 sentence intro under the H1 */
  lede: string;
  /** Unique local context paragraph(s) */
  context: string[];
  /** Named local venues Parker has worked / serves */
  venues: string[];
  /** One local condition note specific to this geography */
  localNote: string;
  faqs: Array<{ q: string; a: string }>;
  /** Adjacent area slugs for internal linking */
  nearby: string[];
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "cochrane",
    city: "Cochrane",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist in Cochrane, AB. Live piano with officiant & vow mics, silent battery power, and a written audio plan in 24 hours. Cochrane is home.",
    lede: "Cochrane is home. I live and rehearse here — so a Cochrane ceremony gets the deepest familiarity with the venues, the Bow River wind, and the afternoon light.",
    context: [
      "Because I'm based in Cochrane, your ceremony means no travel fatigue and a setup I've walked many times before. I arrive a full hour before your first guest, sound-check every cue in the actual room, and coordinate the cue sheet with your planner and officiant in advance.",
      "Cochrane's river-valley sites carry sound differently than an indoor hall — open air and afternoon wind off the Bow can swallow unaided vows. Every booking includes a dedicated wireless system, balanced in real time so every word reaches the back row.",
    ],
    venues: ["Cochrane RancheHouse", "Cochrane Country Club", "Bow RiversEdge Golf Course"],
    localNote:
      "Cochrane's afternoon chinook wind is the single biggest threat to outdoor vow clarity — which is exactly what the wireless vow-mic system and SPL-aware mixing are built to solve.",
    faqs: [
      {
        q: "Do you know Cochrane wedding venues?",
        a: "Yes — Cochrane is my home base. I've performed at and prepared for the RancheHouse, Cochrane Country Club, and Bow RiversEdge, and I walk every new venue in advance.",
      },
      {
        q: "Is there a travel fee within Cochrane?",
        a: "No. Cochrane ceremonies carry no travel surcharge — it's where I live and rehearse.",
      },
    ],
    nearby: ["calgary", "canmore"],
  },
  {
    slug: "calgary",
    city: "Calgary",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist serving Calgary, AB. Live piano, vow & officiant microphones, silent battery power, triple-backup gear. Free written ceremony plan in 24 hrs.",
    lede: "Calgary estates and golf clubs mean wide lawns and bigger guest counts — and the real challenge of carrying intimate vows across open space.",
    context: [
      "Calgary's signature ceremony sites are sprawling: estate gardens, clubhouse terraces, and fairway backdrops where guests can sit thirty rows deep. A grand piano alone won't carry a whispered vow to the last table — so every Calgary booking pairs live piano with a balanced vow-and-officiant audio system, verified at multiple distances during setup.",
      "I arrive before your vendors, sound-check in the room, and rehearse your cue sheet until the processional, the pause, and the recessional feel like instinct. Triple redundancy — backup instrument, backup power, backup audio — means nothing is left to chance on a large open site.",
    ],
    venues: ["The Lake House", "Sirocco Golf Club", "Springbank Links", "Spruce Meadows", "Azuridge Estate Hotel (Priddis)"],
    localNote:
      "On Calgary's large open-lawn venues, volume that's perfect in the front row can vanish by the back — which is why I measure SPL at multiple distances rather than guessing.",
    faqs: [
      {
        q: "Do you serve venues across the whole Calgary area?",
        a: "Yes — from estate venues like Azuridge and The Lake House to golf-club ceremonies at Sirocco, Springbank Links, and Spruce Meadows, plus Priddis and Springbank.",
      },
      {
        q: "Can the music and vows be heard by a large guest count?",
        a: "Yes. I balance a dedicated wireless system in real time and verify clarity at several distances, so even a thirty-row outdoor ceremony hears every word.",
      },
    ],
    nearby: ["cochrane", "canmore"],
  },
  {
    slug: "canmore",
    city: "Canmore",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist in Canmore, AB. Live mountain-venue piano with vow mics, silent battery power, and SPL-aware mixing. Written ceremony plan within 24 hours.",
    lede: "Canmore's mountain venues trade an indoor ceiling for the Three Sisters and the wind that comes with them.",
    context: [
      "Ceremonies under the Bow Valley peaks are breathtaking and acoustically unforgiving — elevation, open exposure, and gusts off the valley pull sound apart. I plan for it: silent battery power (no generator hum against the quiet), weather-protected gear, and a balanced vow system tuned to the site so the mountains frame the moment instead of stealing it.",
      "I arrive early, walk the site, and agree a Plan B location with you in advance — mountain weather turns quickly, and I can relocate within minutes without losing the cue sheet we built together.",
    ],
    venues: ["Cornerstone Theatre", "Silvertip Resort", "Stewart Creek Golf Club"],
    localNote:
      "Canmore's valley wind and elevation make unaided outdoor vows nearly impossible to hear — the silent battery rig and wireless vow mics are built for exactly these mountain sites.",
    faqs: [
      {
        q: "Do you cover Canmore and Bow Valley mountain venues?",
        a: "Yes — including Silvertip, Stewart Creek, and the Cornerstone Theatre, plus open-air sites throughout the Bow Valley.",
      },
      {
        q: "What happens if mountain weather changes during the ceremony?",
        a: "All gear is weather-protected, we agree a Plan B location in advance, and I can relocate within minutes while keeping your timed cue sheet intact.",
      },
    ],
    nearby: ["banff", "cochrane"],
  },
  {
    slug: "banff",
    city: "Banff",
    region: "Alberta",
    metaDescription:
      "Banff National Park wedding pianist — acoustic-only, Parks Canada-compliant ceremony piano with silent power and balanced, permit-aware vow audio. Plan in 24 hrs.",
    lede: "Banff National Park ceremonies have a rule most vendors aren't built for: acoustic-only, no amplification — which is precisely my specialty.",
    context: [
      "Parks Canada sites like Cascade Gardens, Tunnel Mountain, Two Jack Lake, and Lake Minnewanka restrict amplified sound. Many couples assume that means no clear vows — it doesn't. I work within the acoustic-only requirement using silent battery power, careful instrument placement, and SPL-aware technique that respects the permit while still letting your guests and your vows be heard in the open air.",
      "I handle the documentation venues and parks coordinators ask for — insurance, equipment, and a written plan — so the ceremony stays effortless and compliant. I arrive early, scout the natural acoustics of the exact spot, and adapt to it on the day.",
    ],
    venues: ["Cascade Gardens", "Tunnel Mountain Reservoir", "Two Jack Lake", "Lake Minnewanka"],
    localNote:
      "Banff National Park's acoustic-only / no-amplification rules are a dealbreaker for most sound setups — working cleanly within them is exactly what Assured Ceremony Audio was built to do.",
    faqs: [
      {
        q: "Can you perform at acoustic-only Banff National Park venues?",
        a: "Yes — acoustic-only Parks Canada ceremonies are a specialty. I use silent battery power and SPL-aware placement that respects the no-amplification rules while keeping vows clear.",
      },
      {
        q: "Do you handle Parks Canada permits and venue documentation?",
        a: "I provide the insurance and equipment documentation venues and park coordinators request, and plan the ceremony to stay within site requirements.",
      },
    ],
    nearby: ["canmore", "cochrane"],
  },
];

export const getServiceArea = (slug?: string) =>
  SERVICE_AREAS.find((a) => a.slug === slug);
