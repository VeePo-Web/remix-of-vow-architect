import { MinimalHeader } from "@/components/MinimalHeader";
import { HeroTagline } from "@/components/HeroTagline";
import { MinimalScrollCue } from "@/components/MinimalScrollCue";
import { VigilFlame } from "@/components/VigilFlame";
import { VigilReveal } from "@/components/VigilReveal";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { TheExhale } from "@/components/TheExhale";
import { ProcessSection } from "@/components/process";
import { VowMoment } from "@/components/VowMoment";
import { TheInvitation } from "@/components/TheInvitation";
import { TheSound } from "@/components/TheSound";
import { TheTransformation } from "@/components/TheTransformation";
import { TheWitness } from "@/components/TheWitness";
import { ThreePaths } from "@/components/ThreePaths";

import { TheWitnesses } from "@/components/TheWitnesses";
import { CrossOver } from "@/components/CrossOver";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useVigilSequence } from "@/hooks/useVigilSequence";
import heroImage from "@/assets/hero-wedding.jpg";

const pianoSections = [
  { id: "the-exhale",         label: "The Exhale",         isBlackKey: false },
  { id: "process",            label: "Our Process",        isBlackKey: true  },
  { id: "vow-moment",         label: "The Vow",            isBlackKey: false },
  { id: "the-invitation",     label: "The Invitation",     isBlackKey: true  },
  { id: "the-sound",          label: "Hear Me Play",       isBlackKey: false },
  { id: "the-transformation", label: "The Transformation", isBlackKey: false },
  { id: "the-witness",        label: "The Witness",        isBlackKey: true  },
  { id: "three-paths",        label: "Three Paths",        isBlackKey: false },
  { id: "the-witnesses",      label: "Testimonials",       isBlackKey: true  },
  { id: "the-crossing",       label: "The Crossing",       isBlackKey: false },
];

export default function Index() {
  usePageTheme();
  const vigilPhase = useVigilSequence();

  return (
    <div className="min-h-screen flex flex-col">
      <MinimalHeader />
      <PianoKeyNav sections={pianoSections} />
      
      <main>
      {/* SECTION 1 — Hero: Ultra-Minimal Fantasy.co Style with Vigil Sequence */}
      <section className="vigil-hero relative h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: True Void (Pure Black) */}
        <div
          className="absolute inset-0 bg-[hsl(var(--rich-black))]"
          aria-hidden="true"
        />

        {/* Hero image preloaded via index.html for LCP */}

        {/* Layer 2: Hero Image with Bottom-Weighted Gradient + Ken Burns */}
        <VigilReveal 
          isRevealing={vigilPhase.isKindling} 
          isComplete={vigilPhase.isRevealing || vigilPhase.isComplete}
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--rich-black) / 0.35) 0%, hsl(var(--rich-black) / 0.75) 100%), url(${heroImage})`,
              filter: "brightness(0.75) contrast(1.08) saturate(0.9)",
              animation: vigilPhase.isRevealing || vigilPhase.isComplete ? "ken-burns 60s var(--ease-sacred) infinite" : undefined,
            }}
            aria-hidden="true"
          />
        </VigilReveal>

        {/* Layer 3: Vignette (Reduced opacity for breathing room) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 will-change-opacity ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at center, transparent 0%, hsl(var(--rich-black) / 0.45) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Layer 4: Fog Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 will-change-opacity ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 30%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        {/* Layer 5: Film Grain — Reduced, GPU-composited */}
        <div 
          className={`absolute inset-0 grain transition-opacity duration-1000 will-change-opacity ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-[0.15]" : "opacity-0"
          }`}
          aria-hidden="true" 
        />

        {/* Vigil Flame */}
        <VigilFlame 
          isVisible={vigilPhase.isStillness || vigilPhase.isKindling}
          isDissolving={vigilPhase.isRevealing}
        />

        {/* Tagline (bottom-left) + Scroll Cue (bottom-center on mobile, bottom-right on desktop) */}
        <HeroTagline />
        <MinimalScrollCue />
      </section>

      {/* THE EXHALE — Sacred Pause (Emotional Recognition) */}
      <TheExhale />

      {/* SECTION 2 — Sheet Music That Writes Itself */}
      <ProcessSection />

      {/* SECTION 2.5 — VOW MOMENT (Altar Interstitial) */}
      <VowMoment />

      {/* SECTION 3 — The Invitation (Meet the Owner) */}
      <TheInvitation />

      {/* SECTION 3.5 — The Sound (Dark Listening Environment) */}
      <TheSound />

      {/* SECTION 4 — The Transformation (Full-Width Split) */}
      <TheTransformation />

      {/* SECTION 4 — The Witness (Exhale - Surface) */}
      <TheWitness />

      {/* SECTION 5 — Three Paths (Inhale - Dark) */}
      <ThreePaths />

      {/* SECTION 8 — The Witnesses (Exhale - Surface) */}
      <TheWitnesses />

      {/* SECTION 9 — Cross Over (Final CTA) */}
      <CrossOver />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
