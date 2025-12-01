import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { HeroTrustBadges } from "@/components/HeroTrustBadges";
import { ThreeVows } from "@/components/ThreeVows";
import { TheTransformation } from "@/components/TheTransformation";
import { TheWitness } from "@/components/TheWitness";
import { ThreePaths } from "@/components/ThreePaths";
import { TheSacredGround } from "@/components/TheSacredGround";
import { TheRecord } from "@/components/TheRecord";
import { TheWitnesses } from "@/components/TheWitnesses";
import { CrossOver } from "@/components/CrossOver";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useVigilSequence } from "@/hooks/useVigilSequence";
import { useHeroReveal } from "@/hooks/useHeroReveal";
import { TaglineCovenant } from "@/components/TaglineCovenant";
import { ChapterRule } from "@/components/ChapterRule";
import { ScrollCue } from "@/components/ScrollCue";
import { VigilGlow } from "@/components/VigilGlow";
import heroImage from "@/assets/hero-piano.jpg";
import { cn } from "@/lib/utils";

export default function Index() {
  usePageTheme();
  
  // Vigil + Held Breath Orchestration
  const { isRevealing, isComplete } = useVigilSequence();
  const contentVisible = isRevealing || isComplete;
  
  // Cascading reveal timing (after 800ms stillness)
  const line1Visible = useHeroReveal({ delay: 1600 });
  const line2Visible = useHeroReveal({ delay: 1800 });
  const leadVisible = useHeroReveal({ delay: 2000 });
  const ctaVisible = useHeroReveal({ delay: 2200 });
  const trustVisible = useHeroReveal({ delay: 2500 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* SECTION 1 — Hero: Vigil + Held Breath */}
      <section className="vigil-hero relative min-h-[95vh] flex items-center justify-center px-4 py-32">
        {/* Layer 1: Vigil Void (Cold Blue-Black) */}
        <div
          className="absolute inset-0 bg-[hsl(var(--vigil-void))]"
          aria-hidden="true"
        />

        {/* Layer 2: Hero Image with Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.72), rgba(10, 10, 12, 0.88)), url(${heroImage})`,
          }}
          aria-hidden="true"
        />

        {/* Layer 3: Vigil Glow (Radial Vow-Yellow) */}
        <VigilGlow isGlowing={contentVisible} isPulsing={isComplete} />

        {/* Layer 4: Film Grain (2% opacity) */}
        <div className="absolute inset-0 grain opacity-20" aria-hidden="true" />

        {/* Layer 5: Content */}
        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <div className="space-y-8">
            {/* Sacred Tagline */}
            <TaglineCovenant isVisible={contentVisible} />

            {/* Chapter Rule Divider */}
            <ChapterRule isVisible={contentVisible} />

            {/* Headline - Two Lines with Sacred Period */}
            <h1 className="vigil-headline">
              <span 
                className={cn(
                  "block reveal reveal--blur reveal--slow",
                  line1Visible && "is-visible"
                )}
                style={{ "--animation-delay": "1600ms" } as React.CSSProperties}
              >
                Every vow heard
                <span className="vigil-period">.</span>
              </span>
              <span 
                className={cn(
                  "block reveal reveal--blur reveal--slow",
                  line2Visible && "is-visible"
                )}
                style={{ "--animation-delay": "1800ms" } as React.CSSProperties}
              >
                Beautifully
                <span className="vigil-period">.</span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p 
              className={cn(
                "p-lead max-w-4xl mx-auto text-muted-foreground reveal reveal--up",
                leadVisible && "is-visible"
              )}
              style={{ "--animation-delay": "2000ms" } as React.CSSProperties}
            >
              I'm your ceremony sound director—with live piano: officiant/vow mic, quiet battery power (no generator), and SPL-aware mixing tuned for Calgary, Cochrane, Canmore, and Banff.
            </p>

            {/* Primary CTA with Commitment Pulse */}
            <div 
              className={cn(
                "flex flex-col items-center gap-3 pt-8 reveal reveal--scale",
                ctaVisible && "is-visible"
              )}
              style={{ "--animation-delay": "2200ms" } as React.CSSProperties}
            >
              <Button 
                size="lg" 
                className={cn(isComplete && "cta-commitment")} 
                asChild
              >
                <a href="/contact">Hold my date & get my ceremony-audio plan</a>
              </Button>
              <p className="text-sm text-muted-foreground max-w-md">
                Delivered in 24 hours with venue-specific mic, power, and SPL notes.
              </p>
            </div>

            {/* Micro-assurance */}
            <p 
              className={cn(
                "text-sm text-muted-foreground max-w-2xl mx-auto pt-4 opacity-0 transition-opacity duration-500",
                isComplete && "opacity-100"
              )}
              style={{ transitionDelay: "2400ms" }}
            >
              Measured, guaranteed, and documented—so you never wonder if guests can hear your vows.
            </p>
          </div>

          {/* Trust Badges */}
          <div 
            className={cn(
              "mt-16 reveal reveal--up",
              trustVisible && "is-visible"
            )}
            style={{ "--animation-delay": "2500ms" } as React.CSSProperties}
          >
            <HeroTrustBadges />
          </div>

          {/* Scroll Cue */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <ScrollCue isVisible={isComplete} />
          </div>
        </div>
      </section>

      {/* SECTION 2 — The Three Vows (Exhale - Surface) */}
      <ThreeVows />

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
