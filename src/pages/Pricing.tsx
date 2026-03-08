import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InclusionBlock } from "@/components/InclusionBlock";
import { ComparisonTable } from "@/components/ComparisonTable";
import { PricingAddOns } from "@/components/PricingAddOns";
import { PricingTestimonials } from "@/components/PricingTestimonials";
import { PricingFAQ } from "@/components/PricingFAQ";
import { PricingSampleDownload } from "@/components/PricingSampleDownload";
import { MostSelectedPill } from "@/components/MostSelectedPill";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";
import servicesHeroImg from "@/assets/services-hero.jpg";

const pricingSections = [
  { id: "pricing-hero",         label: "Overview",         isBlackKey: false },
  { id: "pricing-inclusions",   label: "What is Included", isBlackKey: true  },
  { id: "packages",             label: "Packages",         isBlackKey: false },
  { id: "pricing-addons",       label: "Enhancements",     isBlackKey: true  },
  { id: "compare",              label: "Comparison",       isBlackKey: false },
  { id: "pricing-testimonials", label: "Kind Words",       isBlackKey: false },
  { id: "pricing-faq",          label: "Questions",        isBlackKey: true  },
  { id: "pricing-download",     label: "Download",         isBlackKey: false },
  { id: "pricing-cta",          label: "Get in Touch",     isBlackKey: true  },
];

/** Golden thread with breathing center dot */
function GoldenThread() {
  return (
    <div className="relative py-2 my-16" aria-hidden="true">
      <div
        className="h-px max-w-xs mx-auto"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        style={{
          background: "hsl(var(--vow-yellow) / 0.6)",
          boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.3)",
          animation: "pricing-dot-breathe 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export default function Pricing() {
  usePageTheme();
  useEffect(() => {
    document.title = "The Offering — Parker Gawryletz, Ceremony Piano";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Three presences — ceremony, extended, or full-day. Transparent pricing with triple redundancy and Banff Mode included.");
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={pricingSections} />

      <main>
      {/* Hero */}
      <section id="pricing-hero" className="relative section-padding bg-background piano-section-target overflow-hidden" aria-label="Pricing overview">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url(${servicesHeroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
              animation: "ken-burns 25s ease-in-out infinite alternate",
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
            animation: "pricing-vignette-breathe 6s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 grain opacity-[0.06] pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
          }}
          aria-hidden="true" 
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in pt-24">
            <div className="overline mb-2">The Offering</div>
            <h1 className="h1 mx-auto mb-4">Choose the presence that fits your day.</h1>
            <div className="chapter-rule mx-auto" />
            <p className="p-lead mx-auto text-muted-foreground mt-6 max-w-3xl">
              How deeply do you want me there? Every option includes the same devoted preparation — only the hours change.
            </p>
          </div>

          <GoldenThread />

          {/* Section 2: What Every Package Includes */}
          <div id="pricing-inclusions" className="piano-section-target">
          <RevealOnScroll variant="up">
            <InclusionBlock />
          </RevealOnScroll>
          </div>

          <GoldenThread />

          {/* Section 3: Transparent Pricing Tiers */}
          <RevealOnScroll variant="up">
            <div id="packages" className="max-w-6xl mx-auto mb-16 scroll-mt-24 piano-section-target">
              <div className="text-center mb-8">
                <h2 className="h2 mb-3 mx-auto">
                  Three ways to be present.
                </h2>
                <p className="p-body text-muted-foreground">
                  Each begins with the same months of collaborative preparation. The only difference is how long I stay.
                </p>
              </div>

              <StaggerChildren staggerDelay={120} className="grid md:grid-cols-3 gap-6">
                {/* Ceremony Only — $650 */}
                <Card className="relative p-6 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-sacred-hover transition-all duration-[180ms]">
                  <h3 className="font-display text-[22px] font-medium leading-tight mb-4">The Vow</h3>
                  
                  <div className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">$650</div>
                  <p className="p-body text-muted-foreground mb-6">
                    The ceremony itself — 30 to 45 minutes of devoted presence at the most sacred hour of the day.
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "Full ceremony sound — every word heard",
                      "Vow and officiant clarity, naturally balanced",
                      "Silent battery power — no interruptions",
                      "Custom cue sheet for your processional",
                      "Post-ceremony documentation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 rotate-45 mt-1.5 flex-shrink-0" style={{ background: "hsl(var(--vow-yellow) / 0.7)", boxShadow: "0 0 5px hsl(var(--vow-yellow) / 0.2)" }} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary-dark" className="w-full hover-scale mb-3" asChild>
                    <Link to="/contact">Hold my date</Link>
                  </Button>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="font-medium">Booking: 50% deposit; balance due 14 days before the event.</p>
                    <p className="italic">Bonus: Your personalized ceremony plan delivered within 24 hours of inquiry.</p>
                  </div>
                </Card>

                {/* Ceremony + Prelude/Cocktails — $750 */}
                <Card className="relative p-6 bg-card/80 backdrop-blur-[8px] border-primary/15 border-2 card-sacred card-sacred-hover transition-all duration-[180ms]" style={{ boxShadow: 'var(--shadow-sacred-inset), var(--shadow-sacred-elevation), 0 0 40px hsl(var(--vow-yellow) / 0.08)' }}>
                  <MostSelectedPill />
                  
                  <h3 className="font-display text-[22px] font-medium leading-tight mb-4">The Hour</h3>
                  
                  <div className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">$750</div>
                  <p className="p-body text-muted-foreground mb-6">
                    Extended presence — from the quiet anticipation of guest arrival through the ceremony and into the first exhale of cocktails.
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "Everything in The Vow",
                      "Guest arrival ambiance — setting the tone",
                      "Cocktail hour piano — 30 to 60 minutes",
                      "Seamless musical transitions between moments",
                      "Extended presence throughout the afternoon",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 rotate-45 mt-1.5 flex-shrink-0" style={{ background: "hsl(var(--vow-yellow) / 0.7)", boxShadow: "0 0 5px hsl(var(--vow-yellow) / 0.2)" }} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary-dark" className="w-full hover-scale mb-3" asChild>
                    <Link to="/contact">Hold my date</Link>
                  </Button>

                  <p className="text-xs text-muted-foreground italic">
                    Guarantee: Upgradeable to Full Day until 2 weeks prior—no penalty.
                  </p>
                </Card>

                {/* Full Day — $1,200 */}
                <Card className="relative p-6 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-sacred-hover transition-all duration-[180ms]">
                  <h3 className="font-display text-[22px] font-medium leading-tight mb-4">The Story</h3>
                  
                  <div className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">$1,200</div>
                  <p className="p-body text-muted-foreground mb-6">
                    The full-day witness — from the first guest arriving to the last note fading over dinner. I stay as long as the music matters.
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "Everything in The Hour",
                      "Dinner ambiance — music that lets conversation breathe",
                      "Volume shaped to each moment of the day",
                      "Multi-space venue coordination",
                      "One-hour transition buffer between locations",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 rotate-45 mt-1.5 flex-shrink-0" style={{ background: "hsl(var(--vow-yellow) / 0.7)", boxShadow: "0 0 5px hsl(var(--vow-yellow) / 0.2)" }} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary-dark" className="w-full hover-scale mb-3" asChild>
                    <Link to="/contact">Hold my date</Link>
                  </Button>

                  <p className="text-xs text-muted-foreground italic">
                    Designed for all-in-one venues; includes an extra 1-hour transition buffer for moves.
                  </p>
                </Card>
              </StaggerChildren>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Amounts shown before GST. Written payment acknowledgements within two business days.
              </p>
            </div>
          </RevealOnScroll>

          <GoldenThread />

          {/* Section 4: Add-ons */}
          <div id="pricing-addons" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingAddOns />
          </RevealOnScroll>
          </div>

          <GoldenThread />

          {/* Section 5: Compare Vendors */}
          <RevealOnScroll variant="up">
            <div id="compare" className="max-w-5xl mx-auto mb-16 scroll-mt-24 piano-section-target">
              <div className="text-center mb-8">
                <h2 className="h2 mb-3 mx-auto">
                  What sets a Sound Director apart.
                </h2>
              </div>
              
              <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred">
                <ComparisonTable />
              </Card>
            </div>
          </RevealOnScroll>

          <GoldenThread />

          {/* Section 6: Testimonials */}
          <div id="pricing-testimonials" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingTestimonials />
          </RevealOnScroll>
          </div>

          <GoldenThread />

          {/* Section 7: FAQs */}
          <div id="pricing-faq" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingFAQ />
          </RevealOnScroll>
          </div>

          <GoldenThread />

          {/* Section 8: Download */}
          <div id="pricing-download" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingSampleDownload />
          </RevealOnScroll>
          </div>

          <GoldenThread />

          {/* Section 9: Final CTA */}
          <div id="pricing-cta" className="piano-section-target">
          <RevealOnScroll variant="up">
            <div className="relative max-w-2xl mx-auto text-center mb-8 space-y-6">
              {/* Warm glow */}
              <div
                className="absolute inset-0 -inset-x-20 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 60% 70% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light mx-auto relative z-10">
                Every arrangement begins with a conversation.
              </h2>
              <p className="p-body text-muted-foreground relative z-10">
                Tell me about your day. I will respond within 24 hours with a personalized plan.
              </p>
              <Button size="lg" variant="primary-dark" className="hover-scale relative z-10" asChild>
                <Link to="/contact">Hold my date</Link>
              </Button>
            </div>
          </RevealOnScroll>
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @keyframes pricing-vignette-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.65; }
        }
        @keyframes pricing-dot-breathe {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain, [style*="ken-burns"] { animation: none !important; }
          [style*="pricing-vignette-breathe"] { animation: none !important; opacity: 0.7; }
          [style*="pricing-dot-breathe"] { animation: none !important; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
