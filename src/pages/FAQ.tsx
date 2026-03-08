import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Button } from "@/components/ui/button";
import { FAQChips } from "@/components/FAQChips";
import { FAQTopTen } from "@/components/FAQTopTen";
import { FAQPolicyDownload } from "@/components/FAQPolicyDownload";
import { FAQTrustStack } from "@/components/FAQTrustStack";
import faqHeroImg from "@/assets/faq-hero.jpg";

export default function FAQ() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />
      
      {/* Section 1 — Hero with atmospheric gradient */}
      <section className="relative section-padding bg-background overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url(${faqHeroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
              animation: "ken-burns 25s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
        </div>
        {/* Warm fog */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)" }} aria-hidden="true" />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" style={{ willChange: "opacity" }} aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Breadcrumbs items={[
              { label: "Home", path: "/" },
              { label: "Questions" }
            ]} />

            <div className="text-center mb-16">
              <div className="overline mb-2">The Threshold</div>
              <h1 className="mx-auto">Every question deserves a clear answer.</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                I understand the weight of the decisions you are making.
                Here is everything I would want to know if I were in your place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Micro Q&A Chips */}
      <FAQChips />

      {/* Section 3 — Top 10 Ceremony Fears */}
      <FAQTopTen />

      {/* Section 4 — Policy Download */}
      <FAQPolicyDownload />

      {/* Section 5 — Psychological Trust Stack */}
      <FAQTrustStack />

      {/* Section 6 — Final CTA */}
      <section className="section--dark section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-ink-inverse">Every arrangement begins with a conversation.</h2>
            <p className="lead text-ink-inverse/70 mb-8">
              Tell me about your day, and I will send you a personalized plan within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="primary-dark" asChild>
                <DirectionalLink to="/contact">
                  Hold my date & get my ceremony-audio plan
                </DirectionalLink>
              </Button>
              <Button variant="ghost-dark" size="lg" asChild>
                <DirectionalLink to="/proof">
                  Download a sample plan (SPL + cue sheet)
                </DirectionalLink>
              </Button>
            </div>
            <p className="text-xs text-ink-inverse/70 max-w-2xl mx-auto">
              Response within 24 hours. Your clarity starts before the ceremony does.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
