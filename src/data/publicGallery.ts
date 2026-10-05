import eventsNord from "@/assets/events-nord-overhead.webp";
import eventsPerformer from "@/assets/events-performer-bw.webp";
import eventsMotion from "@/assets/events-stage-motion.webp";
import eventsPurple from "@/assets/events-stage-purple.webp";
import eventsWarmlight from "@/assets/events-stage-warmlight.webp";
import martinCouple from "@/assets/martin-anita-couple.webp";
import martinGroup from "@/assets/martin-anita-group.webp";
import martinPerformance from "@/assets/martin-anita-performance.webp";
import martinRoom from "@/assets/martin-anita-room.webp";
import teachingEnsemble from "@/assets/teaching-jerome-ensemble.png";
import weddingCeremony from "@/assets/wedding-brendan-ceremony.png";

export type GalleryCategory = "Weddings" | "Events" | "Teaching";

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
  { src: weddingCeremony, alt: "Piano performance during an outdoor wedding ceremony", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 671, objectPosition: "center 50%" },
  { src: martinPerformance, alt: "Live piano performance during Martin and Anita's celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsWarmlight, alt: "Live performance beneath warm stage light", width: 1170, height: 2532, category: "Events", displayAspect: 1170 / 1755, objectPosition: "center 50%" },
  { src: teachingEnsemble, alt: "A piano ensemble session in progress", width: 1170, height: 2532, category: "Teaching", displayAspect: 1170 / 819, objectPosition: "center 51%" },
  { src: martinCouple, alt: "Newly married couple during their celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsNord, alt: "Overhead view of a Nord keyboard performance", width: 1170, height: 2532, category: "Events", displayAspect: 1170 / 1755, objectPosition: "center 50%" },
  { src: martinRoom, alt: "Reception room prepared for a wedding celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsPerformer, alt: "Black and white portrait of a live performance", width: 1170, height: 2532, category: "Events", displayAspect: 1166 / 1746, objectPosition: "center 50%" },
  { src: martinGroup, alt: "Wedding party gathered during Martin and Anita's celebration", width: 1170, height: 2532, category: "Weddings", displayAspect: 1170 / 878, objectPosition: "center 50%" },
  { src: eventsMotion, alt: "A live performance captured in motion", width: 1170, height: 2532, category: "Events", displayAspect: 1170 / 1701, objectPosition: "center 49%" },
  { src: eventsPurple, alt: "Live performance on a purple-lit stage", width: 1920, height: 2880, category: "Events" },
];
