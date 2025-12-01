import { MinimalHeader } from "@/components/MinimalHeader";
import { HeroTagline } from "@/components/HeroTagline";
import { MinimalScrollCue } from "@/components/MinimalScrollCue";
import { VigilFlame } from "@/components/VigilFlame";
import { VigilReveal } from "@/components/VigilReveal";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { HeroTrustBadges } from "@/components/HeroTrustBadges";
import { ThreeVows } from "@/components/ThreeVows";
import { VowMoment } from "@/components/VowMoment";
import { TheTransformation } from "@/components/TheTransformation";
import { TheWitness } from "@/components/TheWitness";
import { ThreePaths } from "@/components/ThreePaths";
import { TheSacredGround } from "@/components/TheSacredGround";
import { TheRecord } from "@/components/TheRecord";
import { TheWitnesses } from "@/components/TheWitnesses";
import { CrossOver } from "@/components/CrossOver";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useVigilSequence } from "@/hooks/useVigilSequence";
import heroImage from "@/assets/hero-piano.jpg";

export default function Index() {
  usePageTheme();
  const vigilPhase = useVigilSequence();

  return (
    <div className="min-h-screen flex flex-col">
      <MinimalHeader />
      
      {/* SECTION 1 — Hero: Ultra-Minimal Fantasy.co Style with Vigil Sequence */}
      <section className="vigil-hero relative h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: True Void (Pure Black) */}
        <div
          className="absolute inset-0 bg-black"
          aria-hidden="true"
        />

        {/* Layer 2: Hero Image with Gradient + Ken Burns (Vigil Reveal Wrapper) */}
        <VigilReveal 
          isRevealing={vigilPhase.isKindling} 
          isComplete={vigilPhase.isRevealing || vigilPhase.isComplete}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.72), rgba(10, 10, 12, 0.88)), url(${heroImage})`,
              filter: "brightness(0.65) contrast(1.1) saturate(0.85)",
              animation: vigilPhase.isRevealing || vigilPhase.isComplete ? "ken-burns 40s var(--ease-sacred) infinite" : undefined,
            }}
            aria-hidden="true"
          />
        </VigilReveal>

        {/* Layer 3: Vignette (Fades in during Revelation) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(10, 10, 12, 0.6) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Layer 4: Fog Overlay (Fades in during Revelation) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(255, 224, 138, 0.03) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        {/* Layer 5: Film Grain (Fades in during Revelation) */}
        <div 
          className={`absolute inset-0 grain transition-opacity duration-1000 ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-20" : "opacity-0"
          }`}
          aria-hidden="true" 
        />

        {/* Vigil Flame (Centered, breathes during Stillness, dissolves during Revelation) */}
        <VigilFlame 
          isVisible={vigilPhase.isStillness || vigilPhase.isKindling}
          isDissolving={vigilPhase.isRevealing}
        />

        {/* Only Three Elements: Tagline (bottom-left) + Scroll Cue (bottom-right) */}
        <HeroTagline />
        <MinimalScrollCue />
      </section>

      {/* Trust Badges — Moved to After Hero */}
      <section className="py-16 px-4 bg-surface">
        <HeroTrustBadges />
      </section>

      {/* SECTION 2 — The Three Vows (Exhale - Surface) */}
      <ThreeVows />

      {/* SECTION 2.5 — VOW MOMENT (Altar Interstitial) */}
      <VowMoment />

      {/* SECTION 3 — The Transformation (Full-Width Split) */}
      <TheTransformation />

      {/* SECTION 4 — The Witness (Exhale - Surface) */}
      <TheWitness />

      {/* SECTION 5 — Three Paths (Inhale - Dark) */}
      <ThreePaths />

      {/* SECTION 6 — The Sacred Ground (Exhale - Accent Soft Green) */}
      <TheSacredGround />

      {/* SECTION 7 — The Record (Inhale - Dark) */}
      <TheRecord />

      {/* SECTION 8 — The Witnesses (Exhale - Surface) */}
      <TheWitnesses />

      {/* SECTION 9 — Cross Over (Final CTA) */}
      <CrossOver />

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
