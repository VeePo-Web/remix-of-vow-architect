import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Button } from "@/components/ui/button";
import { FAQChips } from "@/components/FAQChips";
import { FAQTopTen } from "@/components/FAQTopTen";
import { FAQPolicyDownload } from "@/components/FAQPolicyDownload";
import { FAQTrustStack } from "@/components/FAQTrustStack";
import faqHeroImg from "@/assets/faq-hero.jpg";

const faqSections = [
  { id: "faq-hero",      label: "The Threshold",  isBlackKey: false },
  { id: "faq-chips",     label: "Quick Answers",  isBlackKey: true  },
  { id: "faq-fears",     label: "Common Fears",   isBlackKey: false },
  { id: "faq-policy",    label: "Policies",        isBlackKey: true  },
  { id: "faq-trust",     label: "Trust",           isBlackKey: false },
  { id: "faq-crossing",  label: "The Crossing",   isBlackKey: false },
];

export default function FAQ() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />
      <PianoKeyNav sections={faqSections} />
      
      {/* Section 1 — Hero with atmospheric gradient */}
      <section id="faq-hero" className="relative section-padding bg-background overflow-hidden piano-section-target">
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
        {/* Breathing vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
            animation: "faq-vignette-breathe 6s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
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

      {/* Golden thread */}
      <div className="relative py-1" aria-hidden="true">
        <div className="h-px max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
      </div>

      {/* Section 2 — Micro Q&A Chips */}
      <div id="faq-chips" className="piano-section-target">
        <FAQChips />
      </div>

      {/* Golden thread */}
      <div className="relative py-6" aria-hidden="true">
        <div className="h-px max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
      </div>

      {/* Section 3 — Top 10 Ceremony Fears */}
      <div id="faq-fears" className="piano-section-target">
        <FAQTopTen />
      </div>

      {/* Golden thread */}
      <div className="relative py-6" aria-hidden="true">
        <div className="h-px max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
      </div>

      {/* Section 4 — Policy Download */}
      <div id="faq-policy" className="piano-section-target">
        <FAQPolicyDownload />
      </div>

      {/* Golden thread */}
      <div className="relative py-6" aria-hidden="true">
        <div className="h-px max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
      </div>

      {/* Section 5 — Psychological Trust Stack */}
      <div id="faq-trust" className="piano-section-target">
        <FAQTrustStack />
      </div>

      {/* Golden thread */}
      <div className="relative py-6" aria-hidden="true">
        <div className="h-px max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
      </div>

      {/* Section 6 — Final CTA */}
      <section id="faq-crossing" className="relative section--dark section-padding overflow-hidden piano-section-target">
        {/* Warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-ink-inverse">Every arrangement begins with a conversation.</h2>
            <p className="lead text-ink-inverse/70 mb-8">
              Tell me about your day, and I will send you a personalized plan within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="primary-dark" asChild>
                <DirectionalLink to="/contact">
                  Hold my date
                </DirectionalLink>
              </Button>
              <Button variant="ghost-dark" size="lg" asChild>
                <DirectionalLink to="/proof">
                  See how I prepare
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

      <style>{`
        @keyframes faq-vignette-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.65; }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain, [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
