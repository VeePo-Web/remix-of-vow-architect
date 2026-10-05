import aboutHero from "@/assets/about-hero.jpg";
import aboutOrigin from "@/assets/about-origin.jpg";
import contactHero from "@/assets/contact-hero.jpg";
import eventsBallroom from "@/assets/events-ballroom-grand.jpg";
import eventsHero from "@/assets/events-hero.jpg";
import eventsNord from "@/assets/events-nord-overhead.webp";
import eventsPerformer from "@/assets/events-performer-bw.webp";
import eventsMotion from "@/assets/events-stage-motion.webp";
import eventsPurple from "@/assets/events-stage-purple.webp";
import eventsWarmlight from "@/assets/events-stage-warmlight.webp";
import faqHero from "@/assets/faq-hero.jpg";
import galleryHero from "@/assets/gallery-hero.jpg";
import gallerySetup from "@/assets/gallery-setup.jpg";
import handsKeys from "@/assets/hands-keys-closeup.jpg";
import heroPiano from "@/assets/hero-piano.jpg";
import invitationPortrait from "@/assets/invitation-portrait.jpg";
import listenHero from "@/assets/listen-hero.jpg";
import martinCouple from "@/assets/martin-anita-couple.webp";
import martinGroup from "@/assets/martin-anita-group.webp";
import martinPerformance from "@/assets/martin-anita-performance.webp";
import martinRoom from "@/assets/martin-anita-room.webp";
import pianoCandle from "@/assets/paths-piano-candle.jpg";
import pianoHammers from "@/assets/piano-macro-hammers.jpg";
import ceremony from "@/assets/process/ceremony.jpg";
import processCompleting from "@/assets/process/completing.jpg";
import processCrafting from "@/assets/process/crafting.jpg";
import processListening from "@/assets/process/listening.jpg";
import processRefining from "@/assets/process/refining.jpg";
import servicesHero from "@/assets/services-hero.jpg";
import teachingBench from "@/assets/teaching-bench.jpg";
import teachingEnsemble from "@/assets/teaching-jerome-ensemble.png";
import teachingKeys from "@/assets/teaching-keys.jpg";
import teachingStudio from "@/assets/teaching-studio-warm.jpg";
import venueGolden from "@/assets/venue-empty-golden.jpg";
import vowAltar from "@/assets/vow-moment-altar.jpg";
import weddingCeremony from "@/assets/wedding-brendan-ceremony.png";
import witnessCeremony from "@/assets/witness-ceremony.jpg";
import witnessesVenue from "@/assets/witnesses-venue.jpg";

export type GalleryCategory = "Weddings" | "Events" | "Teaching" | "Details";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
  displayAspect?: number;
  objectPosition?: string;
}

export const publicGallery: GalleryImage[] = [
  { src: weddingCeremony, alt: "Parker playing piano during an outdoor wedding ceremony", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 671, objectPosition: "center 50%" },
  { src: eventsBallroom, alt: "Grand piano prepared in an elegant ballroom", width: 1920, height: 1080, category: "Events" },
  { src: martinPerformance, alt: "Live piano performance during Martin and Anita's celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: teachingStudio, alt: "Warm piano studio prepared for a lesson", width: 1920, height: 1080, category: "Teaching" },
  { src: martinCouple, alt: "Newly married couple during their celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsWarmlight, alt: "Parker performing beneath warm stage light", width: 1170, height: 2532, category: "Events", displayAspect: 1170 / 1755, objectPosition: "center 50%" },
  { src: gallerySetup, alt: "Piano and sound system arranged before guests arrive", width: 1920, height: 1088, category: "Details" },
  { src: teachingEnsemble, alt: "Parker leading a piano ensemble session", width: 1170, height: 2532, category: "Teaching", displayAspect: 1170 / 819, objectPosition: "center 51%" },
  { src: martinRoom, alt: "Reception room prepared for a wedding celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsNord, alt: "Overhead view of a Nord keyboard performance", width: 1170, height: 2532, category: "Events", displayAspect: 1170 / 1755, objectPosition: "center 50%" },
  { src: vowAltar, alt: "Wedding ceremony altar and piano setting", width: 1920, height: 1080, category: "Weddings" },
  { src: eventsPerformer, alt: "Black and white portrait of Parker performing", width: 1170, height: 2532, category: "Events", displayAspect: 1166 / 1746, objectPosition: "center 50%" },
  { src: teachingBench, alt: "Piano bench in a quiet teaching space", width: 1920, height: 1080, category: "Teaching" },
  { src: martinGroup, alt: "Wedding party gathered during Martin and Anita's celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsMotion, alt: "Parker captured in motion during a live performance", width: 1170, height: 2532, category: "Events", displayAspect: 1170 / 1701, objectPosition: "center 49%" },
  { src: handsKeys, alt: "Pianist's hands playing the keys in close detail", width: 1920, height: 1080, category: "Details" },
  { src: witnessCeremony, alt: "Guests witnessing an outdoor wedding ceremony", width: 1920, height: 1088, category: "Weddings" },
  { src: eventsPurple, alt: "Parker performing on a purple-lit stage", width: 1920, height: 2880, category: "Events" },
  { src: teachingKeys, alt: "Piano keys in a teaching studio", width: 1920, height: 1080, category: "Teaching" },
  { src: venueGolden, alt: "Empty wedding venue glowing in evening light", width: 1920, height: 1080, category: "Weddings" },
  { src: invitationPortrait, alt: "Portrait of Parker beside the piano", width: 1920, height: 1088, category: "Details" },
  { src: processListening, alt: "Parker listening closely during the music planning process", width: 1280, height: 864, category: "Details" },
  { src: ceremony, alt: "Piano music accompanying a wedding ceremony", width: 1920, height: 1080, category: "Weddings" },
  { src: eventsHero, alt: "Piano performance prepared for a private event", width: 1920, height: 1080, category: "Events" },
  { src: processCrafting, alt: "Parker crafting an arrangement at the piano", width: 1280, height: 864, category: "Details" },
  { src: aboutOrigin, alt: "Parker at the piano in an intimate portrait", width: 1024, height: 1024, category: "Details" },
  { src: witnessesVenue, alt: "Wedding venue ready to receive guests", width: 1920, height: 1088, category: "Weddings" },
  { src: heroPiano, alt: "Grand piano in soft natural light", width: 1920, height: 1080, category: "Details" },
  { src: processRefining, alt: "An arrangement being refined at the keyboard", width: 1280, height: 864, category: "Details" },
  { src: aboutHero, alt: "Pianist with Gawryletz Music Services seated at the piano", width: 1920, height: 1080, category: "Details" },
  { src: listenHero, alt: "Piano performance in a darkened room", width: 1920, height: 1080, category: "Events" },
  { src: processCompleting, alt: "Finishing details of a musical arrangement", width: 1280, height: 864, category: "Details" },
  { src: faqHero, alt: "Piano ready for an upcoming performance", width: 1920, height: 1080, category: "Details" },
  { src: servicesHero, alt: "Performance piano in a refined interior", width: 1920, height: 1080, category: "Events" },
  { src: contactHero, alt: "Piano at an intimate ceremony setup", width: 1920, height: 1088, category: "Weddings" },
  { src: pianoCandle, alt: "Piano beside warm candlelight", width: 1920, height: 1080, category: "Details" },
  { src: pianoHammers, alt: "Close detail of piano hammers and mechanics", width: 1920, height: 1080, category: "Details" },
  { src: galleryHero, alt: "Parker performing live at the piano", width: 1920, height: 1080, category: "Events" },
];