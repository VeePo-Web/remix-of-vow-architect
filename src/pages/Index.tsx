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
import heroImage from "@/assets/hero-piano.jpg";
import { Download } from "lucide-react";

export default function Index() {
  usePageTheme();

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
          <div className="space-y-8 animate-fade-in">
            {/* Overline */}
            <p className="overline">
              Assured Ceremony Audio™
            </p>

            {/* Headline */}
            <h1 className="h1">
              <span className="block">Every vow heard.</span>
              <span className="block">Beautifully.</span>
            </h1>

            {/* Sub-headline */}
            <p className="p-lead max-w-4xl mx-auto text-muted-foreground">
              I'm your ceremony sound director—with live piano: officiant/vow mic, quiet battery power (no generator), and SPL-aware mixing tuned for Calgary, Cochrane, Canmore, and Banff.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col items-center gap-3 pt-8">
              <Button size="lg" asChild>
                <a href="/contact">Hold my date & get my ceremony-audio plan</a>
              </Button>
              <p className="text-sm text-muted-foreground max-w-md">
                Delivered in 24 hours with venue-specific mic, power, and SPL notes.
              </p>
            </div>

            {/* Micro-assurance */}
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto pt-4">
              Measured, guaranteed, and documented—so you never wonder if guests can hear your vows.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-16">
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
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="h2 mx-auto mb-8">
            Your vows deserve to be heard—legally and beautifully.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" asChild>
              <a href="/contact">Hold my date & get my ceremony-audio plan</a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="/resources">
                <Download size={20} />
                Download a sample plan
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Includes SPL log, mic setup, and run-of-show.
          </p>

          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm font-semibold">
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
