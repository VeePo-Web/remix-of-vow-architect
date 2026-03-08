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
  { id: "events-hero",       label: "Welcome",          isBlackKey: false },
  { id: "events-exhale",     label: "Why Live Piano",   isBlackKey: true  },
  { id: "events-occasions",  label: "Event Types",      isBlackKey: false },
  { id: "events-approach",   label: "How I Work",       isBlackKey: true  },
  { id: "events-threshold",  label: "Your Questions",   isBlackKey: false },
  { id: "events-experience", label: "Past Events",      isBlackKey: true  },
  { id: "events-offering",   label: "Packages",         isBlackKey: false },
  { id: "events-crossing",   label: "Get in Touch",     isBlackKey: false },
];

export default function Events() {
  usePageTheme();
  useEffect(() => {
    document.title = "Private Events — Parker Gawryletz, Pianist";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Live piano for corporate gatherings, galas, and private celebrations. Atmospheric, unobtrusive, and tailored to your evening.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
