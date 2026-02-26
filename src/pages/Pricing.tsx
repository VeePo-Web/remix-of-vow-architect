import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InclusionBlock } from "@/components/InclusionBlock";
import { ComparisonTable } from "@/components/ComparisonTable";
import { PricingAddOns } from "@/components/PricingAddOns";
import { PricingTestimonials } from "@/components/PricingTestimonials";
import { PricingFAQ } from "@/components/PricingFAQ";
import { PricingSampleDownload } from "@/components/PricingSampleDownload";
import { MostSelectedPill } from "@/components/MostSelectedPill";
import { Check } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";
import servicesHeroImg from "@/assets/services-hero.jpg";

export default function Pricing() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />

      <section className="relative section-padding bg-background">
        {/* Atmospheric background on hero area */}
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
        {/* Film grain */}
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

          {/* Section 2: What Every Package Includes */}
          <InclusionBlock />

          {/* Section 3: Transparent Pricing Tiers */}
          <div id="packages" className="max-w-6xl mx-auto mb-16 scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="h2 mb-3 mx-auto">
                Choose your coverage tier
              </h2>
              <p className="p-body text-muted-foreground">
                Every option includes full audio coverage—only your event length changes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Ceremony Only — $650 */}
              <Card className="relative p-6 card-keyline bg-card border-border card-lift">
                <h3 className="h3 mb-4">Ceremony Only</h3>
                
                <div className="text-4xl font-bold text-primary mb-2 price-numeral font-display">$650</div>
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

                <Button className="w-full hover-scale mb-3">Hold my date</Button>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="font-medium">Booking: 50% deposit; balance due 14 days before the event.</p>
                  <p className="italic">Bonus: Your personalized PDF plan (mic / power / SPL notes) delivered within 24 hours of inquiry.</p>
                </div>
              </Card>

              {/* Ceremony + Prelude/Cocktails — $750 */}
              <Card className="relative p-6 card-keyline bg-card border-primary/20 border-2 card-lift" style={{ boxShadow: "0 0 40px hsl(var(--vow-yellow) / 0.08)" }}>
                <MostSelectedPill />
                
                <h3 className="h3 mb-4">Ceremony + Prelude/Cocktails</h3>
                
                <div className="text-4xl font-bold text-primary mb-2 price-numeral font-display">$750</div>
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

                <Button className="w-full hover-scale mb-3">Hold my date</Button>

                <p className="text-xs text-muted-foreground italic">
                  Guarantee: Upgradeable to Full Day until 2 weeks prior—no penalty.
                </p>
              </Card>

              {/* Full Day — $1,200 */}
              <Card className="relative p-6 card-keyline bg-card border-border card-lift">
                <h3 className="h3 mb-4">Full Day</h3>
                
                <div className="text-4xl font-bold text-primary mb-2 price-numeral font-display">$1,200</div>
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

                <Button className="w-full hover-scale mb-3">Hold my date</Button>

                <p className="text-xs text-muted-foreground italic">
                  Designed for all-in-one venues; includes an extra 1-hour transition buffer for moves.
                </p>
              </Card>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Amounts shown before GST. Written payment acknowledgements within two business days.
            </p>
          </div>

          {/* Section 4: Add-ons */}
          <PricingAddOns />

          {/* Section 5: Compare Vendors */}
          <div id="compare" className="max-w-5xl mx-auto mt-16 mb-16 scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="h2 mb-3 mx-auto">
                Compare me to the alternatives
              </h2>
            </div>
            
            <Card className="p-6 bg-card border-border card-keyline">
              <ComparisonTable />
            </Card>
          </div>

          {/* Section 6: Testimonials */}
          <PricingTestimonials />

          {/* Section 7: FAQs */}
          <PricingFAQ />

          {/* Section 8: Download */}
          <PricingSampleDownload />

          {/* Section 9: Final CTA */}
          <div className="max-w-2xl mx-auto text-center mt-16 mb-8 space-y-6">
            <h2 className="h2 mx-auto">
              Your venue, your date, your plan—confirmed in 24 hours.
            </h2>
            <p className="p-body text-muted-foreground">
              Includes SPL summary, mic/power notes, and upgrade options.
            </p>
            <Button size="lg" className="hover-scale">
              Hold my date & get my ceremony-audio plan
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
