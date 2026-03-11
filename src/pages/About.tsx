import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { usePageTheme } from "@/hooks/usePageTheme";
import {
  WitnessHero,
  WitnessOrigin,
  WitnessSustain,
  WitnessPresence,
  WitnessCovenant,
  WitnessCrossing,
} from "@/components/witness";

/**
 * THE WITNESS PAGE (formerly About Parker)
 */
const aboutSections = [
  { id: "witness-hero",     label: "Welcome",        isBlackKey: false },
  { id: "witness-origin",   label: "My Story",       isBlackKey: true  },
  { id: "witness-sustain",  label: "What I Believe", isBlackKey: false },
  { id: "witness-presence", label: "Experience",     isBlackKey: true  },
  { id: "witness-covenant", label: "My Promise",     isBlackKey: false },
  { id: "witness-crossing", label: "Get in Touch",   isBlackKey: false },
];

export default function About() {
  usePageTheme();
  useEffect(() => {
    document.title = "About — Parker Gawryletz, Ceremony Pianist";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "The origin, credentials, and philosophy behind every note. I exist to let my music sound like what your hearts feel like.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={aboutSections} />
      
      <main>
        <WitnessHero />
        <WitnessOrigin />
        <WitnessSustain />
        <WitnessPresence />
        <WitnessCovenant />
        <WitnessCrossing />
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
