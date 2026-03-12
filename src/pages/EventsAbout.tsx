import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { usePageTheme } from "@/hooks/usePageTheme";
import {
  EventsAboutHero,
  EventsAboutOrigin,
  EventsAboutSustain,
  EventsAboutPresence,
  EventsAboutCovenant,
  EventsAboutCrossing,
} from "@/components/events-about";

const sections = [
  { id: "events-about-hero",     label: "Welcome",        isBlackKey: false },
  { id: "events-about-origin",   label: "The Room",       isBlackKey: true  },
  { id: "events-about-sustain",  label: "Principles",     isBlackKey: false },
  { id: "events-about-presence", label: "Experience",     isBlackKey: true  },
  { id: "events-about-covenant", label: "My Promise",     isBlackKey: false },
  { id: "events-about-crossing", label: "Get in Touch",   isBlackKey: false },
];

export default function EventsAbout() {
  usePageTheme();
  useEffect(() => {
    document.title = "About — Parker Gawryletz, Private Event Pianist";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "The philosophy, experience, and promise behind every note I play at your gathering."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={sections} />

      <main>
        <EventsAboutHero />
        <EventsAboutOrigin />
        <EventsAboutSustain />
        <EventsAboutPresence />
        <EventsAboutCovenant />
        <EventsAboutCrossing />
      </main>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @keyframes witness-vignette-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.65; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="witness-vignette-breathe"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
