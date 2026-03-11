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

/** Section transition fade — gradient overlay between sections */
function SectionFade({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="relative h-[120px] md:h-[160px] w-full pointer-events-none -mt-[120px] md:-mt-[160px] z-[5]"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
      aria-hidden="true"
    />
  );
}

/** Golden thread separator between same-tone sections */
function GoldenThread() {
  return (
    <div className="relative py-2 my-0" aria-hidden="true">
      <div
        className="h-px max-w-xs mx-auto"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        style={{
          background: "hsl(var(--vow-yellow) / 0.5)",
          boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.25)",
          animation: "events-dot-breathe 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

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

        {/* Hero → Exhale (same bg) */}
        <EventsExhale />

        {/* Exhale → Occasions — golden thread */}
        <GoldenThread />
        <EventsOccasions />

        {/* Occasions (card) → Approach (background) */}
        <SectionFade
          from="hsl(var(--card) / 0.15)"
          to="hsl(var(--background))"
        />
        <EventsApproach />

        {/* Approach → Threshold — golden thread */}
        <GoldenThread />
        <EventsThreshold />

        {/* Threshold (card) → Experience (background) */}
        <SectionFade
          from="hsl(var(--card) / 0.15)"
          to="hsl(var(--background))"
        />
        <EventsExperience />

        {/* Experience → Offering — golden thread */}
        <GoldenThread />
        <EventsOffering />

        <EventsCrossing />
      </main>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @keyframes events-dot-breathe {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="events-dot-breathe"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
