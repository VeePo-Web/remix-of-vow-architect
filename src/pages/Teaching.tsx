import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import {
  TeachingHero,
  TeachingExhale,
  TeachingPillars,
  TeachingMethodology,
  TeachingThreshold,
  TeachingStories,
  TeachingOffering,
  TeachingCrossing,
} from "@/components/teaching";
import { usePageTheme } from "@/hooks/usePageTheme";

const teachingSections = [
  { id: "teaching-hero",        label: "Welcome",           isBlackKey: false },
  { id: "teaching-exhale",      label: "Where We Start",    isBlackKey: true  },
  { id: "teaching-pillars",     label: "How I Teach",       isBlackKey: false },
  { id: "teaching-methodology", label: "First Conversation",isBlackKey: true  },
  { id: "teaching-threshold",   label: "Common Concerns",   isBlackKey: false },
  { id: "teaching-stories",     label: "Student Stories",    isBlackKey: true  },
  { id: "teaching-offering",    label: "Lesson Details",    isBlackKey: false },
  { id: "teaching-crossing",    label: "Get Started",       isBlackKey: false },
];

/**
 * Section transition fade — gradient overlay that bleeds one section
 * into the next, eliminating hard color boundaries.
 */
function SectionFade({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  return (
    <div
      className="relative h-[120px] md:h-[160px] w-full pointer-events-none -mt-[120px] md:-mt-[160px] z-[5]"
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
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
          animation: "teaching-dot-breathe 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export default function Teaching() {
  usePageTheme();
  useEffect(() => {
    document.title = "Piano Mentorship — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Piano mentorship rooted in patience and musicality. From first notes to confident performance — learn at your own pace.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={teachingSections} />

      <main>
        <TeachingHero />

        {/* Hero (warm cream) → Exhale (warm cream) */}
        <TeachingExhale />

        {/* Exhale → Pillars — golden thread between same-tone sections */}
        <GoldenThread />
        <TeachingPillars />

        {/* Pillars (warm cream) → Methodology (dark charcoal) */}
        <SectionFade
          from="hsl(var(--teaching-bg) / 0.15)"
          to="hsl(var(--events-approach-bg))"
        />
        <TeachingMethodology />

        {/* Methodology (dark) → Threshold (dark) — golden thread */}
        <GoldenThread />
        <TeachingThreshold />

        {/* Threshold (dark charcoal) → Stories (warm cream) */}
        <SectionFade
          from="hsl(var(--events-approach-bg) / 0.15)"
          to="hsl(var(--teaching-bg-alt))"
        />
        <TeachingStories />

        {/* Stories → Offering — golden thread */}
        <GoldenThread />
        <TeachingOffering />

        {/* Offering → Crossing */}
        <TeachingCrossing />
      </main>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @keyframes teaching-dot-breathe {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="teaching-dot-breathe"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
