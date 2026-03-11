import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { AboutScrollProgress } from "@/components/AboutScrollProgress";
import { VerticalRhythmDots } from "@/components/VerticalRhythmDots";
import { usePageTheme } from "@/hooks/usePageTheme";
import {
  TeachingAboutHero,
  TeachingAboutOrigin,
  TeachingAboutSustain,
  TeachingAboutPresence,
  TeachingAboutCovenant,
  TeachingAboutCrossing,
} from "@/components/teaching-about";

const sections = [
  { id: "teaching-about-hero",     label: "Welcome",      isBlackKey: false },
  { id: "teaching-about-origin",   label: "How It Started", isBlackKey: true  },
  { id: "teaching-about-sustain",  label: "What Guides Me", isBlackKey: false },
  { id: "teaching-about-presence", label: "Experience",    isBlackKey: true  },
  { id: "teaching-about-covenant", label: "My Promise",    isBlackKey: false },
  { id: "teaching-about-crossing", label: "Get in Touch",  isBlackKey: false },
];

export default function TeachingAbout() {
  usePageTheme();
  useEffect(() => {
    document.title = "About — Parker Gawryletz, Piano Mentor";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "How I teach, what guides me, and what I promise every student. Piano mentorship by Parker Gawryletz."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={sections} />
      <AboutScrollProgress />
      <VerticalRhythmDots sections={sections} />

      <main>
        <TeachingAboutHero />
        <TeachingAboutOrigin />
        <TeachingAboutSustain />
        <TeachingAboutPresence />
        <TeachingAboutCovenant />
        <TeachingAboutCrossing />
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
