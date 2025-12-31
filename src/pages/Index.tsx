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
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.65), rgba(10, 10, 12, 0.85)), url(${heroImage})`,
              filter: "brightness(0.65) contrast(1.1) saturate(0.85)",
              animation: vigilPhase.isRevealing || vigilPhase.isComplete ? "ken-burns 60s var(--ease-sacred) infinite" : undefined,
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

        {/* Layer 5: Film Grain (Fades in during Revelation) — Reduced */}
        <div 
          className={`absolute inset-0 grain transition-opacity duration-1000 ${
            vigilPhase.isRevealing || vigilPhase.isComplete ? "opacity-[0.15]" : "opacity-0"
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
