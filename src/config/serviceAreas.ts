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
    nearby: ["calgary", "canmore", "airdrie", "bragg-creek"],
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
    nearby: ["cochrane", "canmore", "airdrie", "okotoks", "priddis"],
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
  {
    slug: "airdrie",
    city: "Airdrie",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist in Airdrie, AB. Live piano with vow & officiant mics, silent battery power, no travel fee from Cochrane. Written ceremony plan in 24 hrs.",
    lede: "Airdrie's equestrian estates and open prairie venues call for live piano that travels light and still carries every vow to the back row.",
    context: [
      "Twenty minutes from Cochrane, Airdrie sits at the edge of the open prairie — which means beautiful sky and strong northerly winds that can swallow quiet ceremony moments. Every Airdrie booking includes the wireless vow-and-officiant system, balanced in real time so the couple's words carry clearly across an open venue without extra hardware cluttering the setting.",
      "Westbrook Farm and the growing number of rural estate properties along the east side of Rocky View County are a specialty — sites where a generator would disrupt the calm and a power cord has nowhere to run. Silent battery power means the ceremony is self-contained, quiet, and uninterrupted from processional to recessional.",
    ],
    venues: ["Westbrook Farm", "Nose Creek Park outdoor sites", "Kingsview Heritage Park"],
    localNote:
      "Airdrie's prairie exposure and northerly wind pattern make outdoor vow clarity unpredictable without a dedicated wireless system — exactly the scenario the battery rig and SPL-aware mixing solve.",
    faqs: [
      {
        q: "Do you travel to Airdrie for wedding ceremonies?",
        a: "Yes — Airdrie is 20 minutes from my Cochrane home base and carries no travel surcharge. I arrive early, walk the venue, and sound-check all ceremony cues before guests arrive.",
      },
      {
        q: "Can you perform at Westbrook Farm or rural Rocky View County estates?",
        a: "Yes. Silent battery power and a self-contained audio rig mean I perform at sites with limited or no electrical access — no generator required.",
      },
    ],
    nearby: ["cochrane", "calgary"],
  },
  {
    slug: "okotoks",
    city: "Okotoks",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist in Okotoks, AB. Live piano with vow & officiant mics, silent battery power, and SPL-aware mixing for Sheep River valley venues. Plan in 24 hrs.",
    lede: "Okotoks' Sheep River valley and small-town charm produce some of the most intimate ceremonies in southern Alberta — and acoustics that require some thought.",
    context: [
      "The Sheep River setting brings natural beauty and natural exposure — valley terrain that funnels west wind across outdoor sites. I arrive before your vendors, walk the ceremony space, and build the vow-and-officiant balance around the specific position of the sun, the wind direction on the day, and the number of rows your guests will fill.",
      "Okotoks has a tight-knit event community, and I coordinate directly with your planner and the venue coordinator so the cue sheet is in everyone's hands before the ceremony begins. A written plan replaces the guesswork and means every moment — processional, readings, vows, recessional — lands exactly as intended.",
    ],
    venues: ["D'Arcy Ranch Golf Club", "The Old Powerhouse", "Sheep River valley outdoor sites"],
    localNote:
      "Okotoks sits in Foothills County east of the Rockies, where afternoon westerlies can arrive quickly — a weather-protected rig and a pre-agreed Plan B indoor position are standard for any Okotoks outdoor ceremony.",
    faqs: [
      {
        q: "Do you play weddings in Okotoks and the Foothills region?",
        a: "Yes — D'Arcy Ranch Golf Club, The Old Powerhouse, and Sheep River outdoor sites are all within my regular service area, with no travel add-on from Cochrane.",
      },
      {
        q: "Can you handle a ceremony at The Old Powerhouse in Okotoks?",
        a: "Yes — the historic Sheep River building suits the quiet presence of live piano perfectly. I survey the venue in advance and work with your coordinator on the cue sheet.",
      },
    ],
    nearby: ["calgary", "cochrane"],
  },
  {
    slug: "bragg-creek",
    city: "Bragg Creek",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist in Bragg Creek, AB. Silent battery piano and vow mics built for forest clearings, Elbow River sites, and off-grid ceremony venues. Plan in 24 hrs.",
    lede: "Bragg Creek's forest clearings and Elbow River settings are among the most intimate in the foothills — and the off-grid nature of these venues is exactly what silent battery setup was built for.",
    context: [
      "Bragg Creek ceremonies often happen far from a power outlet: a clearing beside the Elbow River, a property tucked in the pines, a meadow where extension cords don't belong. Silent battery piano and a self-contained wireless audio rig mean the ceremony is fully off-grid — no generator, no cables running across the grass, just music and vows in a natural setting.",
      "Bragg Creek is a 30-minute drive from my Cochrane home base, and I plan route and arrival time carefully so setup is complete long before guests arrive. I walk the ceremony site in advance when possible, and every tech element has a printed backup — so a dropped cell signal at the venue is never a problem on the day.",
    ],
    venues: ["Bragg Creek Community Centre", "Elbow River valley clearings", "West Bragg Creek forest properties"],
    localNote:
      "Bragg Creek's heavily treed sites and limited infrastructure make generator-free, cable-free ceremony setup not just preferable but often the only practical option — the battery rig was purpose-built for exactly these off-grid forest venues.",
    faqs: [
      {
        q: "Can you perform at Bragg Creek ceremonies that have no power access?",
        a: "Yes — silent battery power is standard equipment for all my bookings. Off-grid forest and river sites in Bragg Creek are a specialty, with no generator required.",
      },
      {
        q: "Do you travel to Bragg Creek from Cochrane?",
        a: "Yes — Bragg Creek is about 30 minutes from my Cochrane base, with no travel surcharge for this area.",
      },
    ],
    nearby: ["cochrane", "calgary"],
  },
  {
    slug: "priddis",
    city: "Priddis",
    region: "Alberta",
    metaDescription:
      "Wedding ceremony pianist in Priddis, AB. Live piano at Azuridge Estate Hotel and Priddis Greens, silent battery power, vow mics, and a written ceremony plan in 24 hrs.",
    lede: "Priddis is Alberta's most exclusive rural estate territory — Azuridge Estate Hotel and Priddis Greens are venues that call for equally precise, unhurried live music.",
    context: [
      "Azuridge Estate Hotel is one of the most photographed ceremony settings in Alberta, and the precision required to match that setting in music and audio is considerable. I have performed at estate properties throughout the Priddis and Foothills area and know both the acoustic environment and the level of coordination these venues expect: a submitted plan, a pre-ceremony walk, and a cue sheet in the hands of every vendor before the first guest arrives.",
      "Priddis sits about 30 minutes from my Cochrane base and the same from central Calgary. Open estate grounds and rolling foothills terrain are acoustically exposing — the same northerly wind that cools the terrace can swallow unaided vows. The wireless vow system and SPL-tested balance make sure the couple's words reach every guest, no matter how wide the lawn or how unpredictable the afternoon breeze.",
    ],
    venues: ["Azuridge Estate Hotel", "Priddis Greens Golf & Country Club", "Foothills estate properties"],
    localNote:
      "Priddis estate ceremonies sit in open foothills terrain with few natural windbreaks — vow audio that isn't actively managed across a broad outdoor setting routinely disappoints on otherwise flawless days.",
    faqs: [
      {
        q: "Do you perform at Azuridge Estate Hotel in Priddis?",
        a: "Yes — Azuridge and other Priddis estate venues are within my regular service area. I provide the ceremony plan and vendor coordination that venues like Azuridge expect.",
      },
      {
        q: "Is there a travel fee for Priddis ceremonies?",
        a: "No — Priddis is approximately 30 minutes from both Cochrane and Calgary and carries no travel surcharge.",
      },
    ],
    nearby: ["calgary", "cochrane"],
  },
];

export const getServiceArea = (slug?: string) =>
  SERVICE_AREAS.find((a) => a.slug === slug);
