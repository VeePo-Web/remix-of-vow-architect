import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import {
  EventsHero,
  EventsExhale,
  EventsOccasions,
  EventsApproach,
  EventsThreshold,
  EventsExperience,
  EventsOffering,
  EventsCrossing,
} from "@/components/events";
import { usePageTheme } from "@/hooks/usePageTheme";

const eventsSections = [
  { id: "events-hero",       label: "The Opening",    isBlackKey: false },
  { id: "events-exhale",     label: "The Exhale",     isBlackKey: true  },
  { id: "events-occasions",  label: "Occasions",      isBlackKey: false },
  { id: "events-approach",   label: "The Approach",   isBlackKey: true  },
  { id: "events-threshold",  label: "The Threshold",  isBlackKey: false },
  { id: "events-experience", label: "The Experience", isBlackKey: true  },
  { id: "events-offering",   label: "The Offering",   isBlackKey: false },
  { id: "events-crossing",   label: "The Crossing",   isBlackKey: false },
];

export default function Events() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />
      <PianoKeyNav sections={eventsSections} />

      <main>
        <EventsHero />
        <EventsExhale />
        <EventsOccasions />
        <EventsApproach />
        <EventsThreshold />
        <EventsExperience />
        <EventsOffering />
        <EventsCrossing />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
