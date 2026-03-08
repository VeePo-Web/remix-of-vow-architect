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
 * 
 * A sacred journey through the identity of a ceremony witness.
 * 
 * The Sustain Pedal Metaphor:
 * Like a piano's sustain pedal allows notes to resonate beyond their strike,
 * a witness carries the ceremony beyond its moment—holding words, silence, 
 * and memory long after the last vow is spoken.
 * 
 * Page Structure:
 * 1. THE RESONANCE — Hero with vibrating golden string
 * 2. THE ORIGIN — The single moment that started it all
 * 3. THE SUSTAIN — Piano keyboard with three illuminated keys
 * 4. THE PRESENCE — 500+ events performed
 * 5. THE COVENANT — Personal promise certificate
 * 6. THE CROSSING — Final CTA with warm glow
 */
const aboutSections = [
  { id: "witness-hero",     label: "The Resonance", isBlackKey: false },
  { id: "witness-origin",   label: "The Origin",    isBlackKey: true  },
  { id: "witness-sustain",  label: "The Sustain",   isBlackKey: false },
  { id: "witness-presence", label: "The Presence",  isBlackKey: true  },
  { id: "witness-covenant", label: "The Covenant",  isBlackKey: false },
  { id: "witness-crossing", label: "The Crossing",  isBlackKey: false },
];

export default function About() {
  usePageTheme();

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={aboutSections} />
      
      <main>
        {/* ACT I: THE RESONANCE */}
        <WitnessHero />
        
        {/* ACT II: THE ORIGIN */}
        <WitnessOrigin />
        
        {/* ACT III: THE SUSTAIN */}
        <WitnessSustain />
        
        {/* ACT IV: THE PRESENCE */}
        <WitnessPresence />
        
        {/* ACT V: THE COVENANT */}
        <WitnessCovenant />
        
        {/* ACT VI: THE CROSSING */}
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
