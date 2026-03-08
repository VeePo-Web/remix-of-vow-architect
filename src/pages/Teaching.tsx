import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
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
      className="relative h-[80px] md:h-[120px] w-full pointer-events-none -mt-[80px] md:-mt-[120px] z-[5]"
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
      aria-hidden="true"
    />
  );
}

export default function Teaching() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />

      <main>
        <TeachingHero />

        {/* Hero (warm cream) → Exhale (warm cream) — no fade needed, same tone */}
        <TeachingExhale />

        {/* Exhale (cream) → Pillars (cream) — subtle warmth shift */}
        <TeachingPillars />

        {/* Pillars (warm cream) → Methodology (dark charcoal) */}
        <SectionFade
          from="hsl(40 30% 95% / 0)"
          to="hsl(30 8% 14%)"
        />
        <TeachingMethodology />

        {/* Methodology (dark) → Threshold (dark) — same tone */}
        <TeachingThreshold />

        {/* Threshold (dark charcoal) → Stories (warm cream) */}
        <SectionFade
          from="hsl(30 8% 14% / 0)"
          to="hsl(38 35% 93%)"
        />
        <TeachingStories />

        {/* Stories (cream) → Offering (cream) — same tone */}
        <TeachingOffering />

        {/* Offering (cream) → Crossing (cream) — same tone */}
        <TeachingCrossing />
      </main>

      <Footer />
    </div>
  );
}
