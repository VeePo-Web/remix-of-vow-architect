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
import { Check } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";
import servicesHeroImg from "@/assets/services-hero.jpg";

const pricingSections = [
  { id: "pricing-hero",         label: "Overview",       isBlackKey: false },
  { id: "pricing-inclusions",   label: "Inclusions",     isBlackKey: true  },
  { id: "packages",             label: "Packages",       isBlackKey: false },
  { id: "pricing-addons",       label: "Add-ons",        isBlackKey: true  },
  { id: "compare",              label: "Compare",        isBlackKey: false },
  { id: "pricing-testimonials", label: "Testimonials",   isBlackKey: false },
  { id: "pricing-faq",          label: "FAQ",            isBlackKey: true  },
  { id: "pricing-download",     label: "Download",       isBlackKey: false },
  { id: "pricing-cta",          label: "Get Started",    isBlackKey: true  },
];

export default function Pricing() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />
      <PianoKeyNav sections={pricingSections} />

      {/* Hero */}
      <section id="pricing-hero" className="relative section-padding bg-background piano-section-target">
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
              willChange: "transform",
            }}
          />
        </div>
        <div 
          className="absolute inset-0 grain opacity-[0.06] pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
            willChange: "opacity",
          }}
          aria-hidden="true" 
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in pt-24">
            <div className="overline mb-2">Assured Ceremony Audio™</div>
            <h1 className="h1 mx-auto mb-4">Pricing & Packages</h1>
            <div className="chapter-rule mx-auto" />
            <p className="p-lead mx-auto text-muted-foreground mt-6 max-w-3xl">
              I frame cost as clarity insurance—not entertainment—so your decision is fast, confident, and risk-free.
            </p>
          </div>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto mb-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 2: What Every Package Includes */}
          <div id="pricing-inclusions" className="piano-section-target">
          <RevealOnScroll variant="up">
            <InclusionBlock />
          </RevealOnScroll>
          </div>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 3: Transparent Pricing Tiers */}
          <RevealOnScroll variant="up">
            <div id="packages" className="max-w-6xl mx-auto mb-16 scroll-mt-24 piano-section-target">
              <div className="text-center mb-8">
                <h2 className="h2 mb-3 mx-auto">
                  Choose your coverage tier
                </h2>
                <p className="p-body text-muted-foreground">
                  Every option includes full audio coverage—only your event length changes.
                </p>
              </div>

              <StaggerChildren staggerDelay={120} className="grid md:grid-cols-3 gap-6">
                {/* Ceremony Only — $650 */}
                <Card className="relative p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms]">
                  <h3 className="font-display text-[22px] font-medium leading-tight mb-4">Ceremony Only</h3>
                  
                  <div className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">$650</div>
                  <p className="p-body text-muted-foreground mb-6">
                    Best for 30–45 minute ceremonies. Includes everything above.
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "All ceremony-proof clarity features",
                      "Professional sound coverage",
                      "Officiant + vow microphones",
                      "Silent battery power system",
                      "SPL log documentation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary-dark" className="w-full hover-scale mb-3">Hold my date</Button>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="font-medium">Booking: 50% deposit; balance due 14 days before the event.</p>
                    <p className="italic">Bonus: Your personalized PDF plan (mic / power / SPL notes) delivered within 24 hours of inquiry.</p>
                  </div>
                </Card>

                {/* Ceremony + Prelude/Cocktails — $750 */}
                <Card className="relative p-6 bg-card/80 backdrop-blur-[8px] border-primary/15 border-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12),0_0_40px_hsl(var(--vow-yellow)/0.08)] hover:shadow-[0_0_32px_rgba(255,224,138,0.1)] transition-all duration-[180ms]">
                  <MostSelectedPill />
                  
                  <h3 className="font-display text-[22px] font-medium leading-tight mb-4">Ceremony + Prelude/Cocktails</h3>
                  
                  <div className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">$750</div>
                  <p className="p-body text-muted-foreground mb-6">
                    Adds 30–60 minutes of pre-ceremony ambiance or cocktail piano. Great for longer guest mingling or two-location setups.
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "Everything in Ceremony Only",
                      "Pre-ceremony guest arrival music",
                      "Cocktail hour piano (30–60 min)",
                      "Seamless transitions",
                      "Extended sound coverage",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary-dark" className="w-full hover-scale mb-3">Hold my date</Button>

                  <p className="text-xs text-muted-foreground italic">
                    Guarantee: Upgradeable to Full Day until 2 weeks prior—no penalty.
                  </p>
                </Card>

                {/* Full Day — $1,200 */}
                <Card className="relative p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms]">
                  <h3 className="font-display text-[22px] font-medium leading-tight mb-4">Full Day</h3>
                  
                  <div className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">$1,200</div>
                  <p className="p-body text-muted-foreground mb-6">
                    From guest arrival to dinner fade-out at conversational volume.
                  </p>

                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "Everything in Ceremony + Cocktails",
                      "Dinner background music",
                      "Conversational volume mixing",
                      "All-in-one venue optimization",
                      "Extra 1-hour transition buffer for moves",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary-dark" className="w-full hover-scale mb-3">Hold my date</Button>

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

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 4: Add-ons */}
          <div id="pricing-addons" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingAddOns />
          </RevealOnScroll>
          </div>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 5: Compare Vendors */}
          <RevealOnScroll variant="up">
            <div id="compare" className="max-w-5xl mx-auto mb-16 scroll-mt-24 piano-section-target">
              <div className="text-center mb-8">
                <h2 className="h2 mb-3 mx-auto">
                  Compare me to the alternatives
                </h2>
              </div>
              
              <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
                <ComparisonTable />
              </Card>
            </div>
          </RevealOnScroll>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 6: Testimonials */}
          <div id="pricing-testimonials" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingTestimonials />
          </RevealOnScroll>
          </div>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 7: FAQs */}
          <div id="pricing-faq" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingFAQ />
          </RevealOnScroll>
          </div>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 8: Download */}
          <div id="pricing-download" className="piano-section-target">
          <RevealOnScroll variant="up">
            <PricingSampleDownload />
          </RevealOnScroll>
          </div>

          {/* Golden thread */}
          <div className="h-[1px] max-w-xs mx-auto my-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)' }} aria-hidden="true" />

          {/* Section 9: Final CTA */}
          <div id="pricing-cta" className="piano-section-target">
          <RevealOnScroll variant="up">
            <div className="max-w-2xl mx-auto text-center mb-8 space-y-6">
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light mx-auto">
                Your venue, your date, your plan—confirmed in 24 hours.
              </h2>
              <p className="p-body text-muted-foreground">
                Includes SPL summary, mic/power notes, and upgrade options.
              </p>
              <Button size="lg" variant="primary-dark" className="hover-scale">
                Hold my date & get my ceremony-audio plan
              </Button>
            </div>
          </RevealOnScroll>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
