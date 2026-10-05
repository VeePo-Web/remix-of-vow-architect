import archiveFirstPiano from "@/assets/archive-first-piano.jpg";
import flowerArch from "@/assets/flower-arch-portrait.jpg";
import livingRoomLesson from "@/assets/living-room-piano-lesson.jpg";
import mountainVenue from "@/assets/mountain-venue-portrait.jpg";
import stageMotionBlur from "@/assets/stage-motion-blur.jpg";
import stageNordOverhead from "@/assets/stage-nord-keys-overhead.jpg";
import stageRedLight from "@/assets/stage-red-light-back.jpg";
import weddingYamaha from "@/assets/wedding-yamaha-ballroom.jpg";
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
  { src: weddingYamaha, alt: "Parker playing a Yamaha grand piano in a bright wedding ballroom", width: 1284, height: 1589, category: "Weddings" },
  { src: flowerArch, alt: "Parker standing beneath a floral arch at a wedding venue", width: 887, height: 1184, category: "Weddings" },
  { src: livingRoomLesson, alt: "A one-to-one piano lesson in a sunlit living room", width: 887, height: 1184, category: "Teaching" },
  { src: mountainVenue, alt: "Parker at a mountain venue with peaks behind the glass", width: 887, height: 1184, category: "Events" },
  { src: stageMotionBlur, alt: "Long-exposure blur of a live Nord keyboard performance", width: 851, height: 1324, category: "Events" },
  { src: stageNordOverhead, alt: "Overhead view of Parker playing a Nord keyboard on a dark stage", width: 887, height: 1005, category: "Events" },
  { src: stageRedLight, alt: "Parker performing under deep red stage light", width: 887, height: 1332, category: "Events" },
  { src: archiveFirstPiano, alt: "Parker as a young child at his first piano", width: 1170, height: 855, category: "Teaching" },
];
