import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { HeroTrustBadges } from "@/components/HeroTrustBadges";
import { SoundSystemDiagram } from "@/components/SoundSystemDiagram";
import { PainOutcomeFlip } from "@/components/PainOutcomeFlip";
import { SoundDirectorSection } from "@/components/SoundDirectorSection";
import { PricingPreview } from "@/components/PricingPreview";
import { BanffModeTile } from "@/components/BanffModeTile";
import { ProofBlock } from "@/components/ProofBlock";
import { TestimonialsWithMetrics } from "@/components/TestimonialsWithMetrics";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useHeroReveal } from "@/hooks/useHeroReveal";
import heroImage from "@/assets/hero-piano.jpg";
import { Download } from "lucide-react";
import { RevealOnScroll } from "@/components/animation";
import { cn } from "@/lib/utils";

export default function Index() {
  usePageTheme();
  
  // Instant hero animations on page load
  const overlineVisible = useHeroReveal({ delay: 0 });
  const line1Visible = useHeroReveal({ delay: 150 });
  const line2Visible = useHeroReveal({ delay: 300 });
  const leadVisible = useHeroReveal({ delay: 450 });
  const ctaVisible = useHeroReveal({ delay: 600 });
  const microVisible = useHeroReveal({ delay: 750 });
  const trustVisible = useHeroReveal({ delay: 850 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* SECTION 1 — Hero: The 5-Second Validation */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.7), rgba(10, 10, 12, 0.85)), url(${heroImage})`,
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <div className="space-y-8">
            {/* Overline - Instant animation on load */}
            <p 
              className={cn(
                "overline reveal reveal--blur reveal--slow",
                overlineVisible && "is-visible"
              )}
            >
              Assured Ceremony Audio™
            </p>

            {/* Headline - Cascading blur reveal */}
            <h1 className="h1">
              <span 
                className={cn(
                  "block reveal reveal--blur reveal--slow",
                  line1Visible && "is-visible"
                )}
                style={{ "--animation-delay": "150ms" } as React.CSSProperties}
              >
                Every vow heard.
              </span>
              <span 
                className={cn(
                  "block reveal reveal--blur reveal--slow",
                  line2Visible && "is-visible"
                )}
                style={{ "--animation-delay": "300ms" } as React.CSSProperties}
              >
                Beautifully.
              </span>
            </h1>

            {/* Sub-headline */}
            <p 
              className={cn(
                "p-lead max-w-4xl mx-auto text-muted-foreground reveal reveal--up",
                leadVisible && "is-visible"
              )}
              style={{ "--animation-delay": "450ms" } as React.CSSProperties}
            >
              I'm your ceremony sound director—with live piano: officiant/vow mic, quiet battery power (no generator), and SPL-aware mixing tuned for Calgary, Cochrane, Canmore, and Banff.
            </p>

            {/* Primary CTA */}
            <div 
              className={cn(
                "flex flex-col items-center gap-3 pt-8 reveal reveal--scale",
                ctaVisible && "is-visible"
              )}
              style={{ "--animation-delay": "600ms" } as React.CSSProperties}
            >
              <Button size="lg" asChild>
                <a href="/contact">Hold my date & get my ceremony-audio plan</a>
              </Button>
              <p className="text-sm text-muted-foreground max-w-md">
                Delivered in 24 hours with venue-specific mic, power, and SPL notes.
              </p>
            </div>

            {/* Micro-assurance */}
            <p 
              className={cn(
                "text-sm text-muted-foreground max-w-2xl mx-auto pt-4 reveal reveal--up",
                microVisible && "is-visible"
              )}
              style={{ "--animation-delay": "750ms" } as React.CSSProperties}
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
            style={{ "--animation-delay": "850ms" } as React.CSSProperties}
          >
            <HeroTrustBadges />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Ceremony Sound System Diagram */}
      <SoundSystemDiagram />

      {/* SECTION 3 — Pain Stack & Outcome Flip */}
      <PainOutcomeFlip />

      {/* SECTION 4 — The Sound Director Category */}
      <SoundDirectorSection />

      {/* SECTION 5 — Pricing Preview */}
      <PricingPreview />

      {/* SECTION 6 — Banff Mode™ Highlight Tile */}
      <BanffModeTile />

      {/* SECTION 7 — Proof Block */}
      <ProofBlock />

      {/* SECTION 8 — Testimonials with Metrics */}
      <TestimonialsWithMetrics />

      {/* SECTION 9 — Final Push + Soft Conversion */}
      <section className="section--dark py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="h2 mx-auto mb-8 text-ink-inverse">
            Your vows deserve to be heard—legally and beautifully.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" variant="primary-dark" asChild>
              <a href="/contact">Hold my date & get my ceremony-audio plan</a>
            </Button>
            <Button variant="ghost-dark" size="lg" className="gap-2" asChild>
              <a href="/resources">
                <Download size={20} />
                Download a sample plan
              </a>
            </Button>
          </div>

          <p className="text-sm text-ink-inverse/70">
            Includes SPL log, mic setup, and run-of-show.
          </p>

          <div className="mt-12 pt-8 border-t border-lines">
            <p className="text-sm font-semibold text-ink-inverse">
              Response within <span className="text-primary">24 hours</span>. Always.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
