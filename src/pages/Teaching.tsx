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
        <TeachingExhale />
        <TeachingPillars />
        <TeachingMethodology />
        <TeachingThreshold />
        <TeachingStories />
        <TeachingOffering />
        <TeachingCrossing />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
