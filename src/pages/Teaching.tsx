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

export default function Teaching() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />

      <main>
        <TeachingHero />
        <TeachingExhale />
        <TeachingPillars />
        <TeachingMethodology />
        <TeachingThreshold />
        <TeachingStories />
        <TeachingOffering />
        <TeachingCrossing />
      </main>

      <Footer />
    </div>
  );
}
