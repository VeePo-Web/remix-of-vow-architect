import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InclusionBlock } from "@/components/InclusionBlock";
import { ComparisonTable } from "@/components/ComparisonTable";
import { BanffModeBadge } from "@/components/BanffModeBadge";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { MostSelectedPill } from "@/components/MostSelectedPill";
import { StarBar } from "@/components/StarBar";
import { MicroTestimonial } from "@/components/MicroTestimonial";
import { ValuePromiseBadge } from "@/components/ValuePromiseBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Check } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function Pricing() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Pricing & Packages" }
          ]} />

          <div className="text-center mb-12 animate-fade-in">
            <div className="overline mb-2">Assured Ceremony Audio™</div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="mx-auto">Packages</h1>
              <BanffModeBadge />
            </div>
            <div className="chapter-rule mx-auto" />
            <p className="lead mx-auto text-muted-foreground mt-6">
              Transparent pricing for ceremony perfection. No hidden fees. No surprises.
            </p>
            <div className="mt-4">
              <ValuePromiseBadge />
            </div>
          </div>

          <div className="mt-6 mb-4">
            <InclusionBlock />
          </div>

          <div className="max-w-6xl mx-auto mb-24">
            {/* 3-Tier Pricing Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Ceremony Package */}
              <Card className="relative p-6 card-keyline bg-card border-border card-lift">
                <AvailabilityBadge status="available" />
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Ceremony</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$650</div>
                  <p className="text-sm text-muted-foreground">
                    Essential ceremony coverage with professional sound.
                  </p>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {[
                    "45 minutes of performance",
                    "Pre-ceremony music (20 min)",
                    "Processional & recessional",
                    "Professional PA system",
                    "Consultation & song selection",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-3">
                  <StarBar rating={5} />
                </div>

                <Button className="w-full hover-scale">Book Now</Button>

                <div className="mt-6">
                  <MicroTestimonial
                    quote="Parker made our ceremony perfect—no stress, just music."
                    author="Emma & James"
                    venue="Fairmont Banff Springs"
                  />
                </div>
              </Card>

              {/* Ceremony + Cocktails Package */}
              <Card className="relative p-6 card-keyline bg-card border-border card-lift">
                <MostSelectedPill />
                <AvailabilityBadge status="available" />
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Ceremony + Cocktails</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$1,100</div>
                  <p className="text-sm text-muted-foreground">
                    Complete coverage with elegant cocktail hour music.
                  </p>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {[
                    "Everything in Ceremony",
                    "60 min cocktail hour",
                    "Seamless transitions",
                    "Extended sound coverage",
                    "Dual setup coordination",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-3">
                  <StarBar rating={5} />
                </div>

                <Button className="w-full hover-scale">Book Now</Button>

                <p className="text-xs italic text-muted-foreground mt-3">
                  Upgradeable to Full Day until 2 weeks prior—no penalty.
                </p>

                <div className="mt-6">
                  <MicroTestimonial
                    quote="The cocktail hour flowed beautifully—guests loved it."
                    author="Sarah & Michael"
                    venue="Lake Louise"
                  />
                </div>
              </Card>

              {/* Full Experience Package */}
              <Card className="relative p-6 card-keyline bg-card border-border card-lift">
                <AvailabilityBadge status="hold" />
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Full Experience</h3>
                  <div className="text-4xl font-bold text-primary mb-2">$1,450</div>
                  <p className="text-sm text-muted-foreground">
                    Complete day coverage from ceremony through dinner.
                  </p>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {[
                    "Everything in Ceremony + Cocktails",
                    "Dinner background music",
                    "Special moments soundtrack",
                    "Full-day coordination",
                    "Priority booking status",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-3">
                  <StarBar rating={5} />
                </div>

                <Button className="w-full hover-scale">Book Now</Button>

                <div className="mt-6">
                  <MicroTestimonial
                    quote="Worth every penny—seamless from start to finish."
                    author="Rachel & David"
                    venue="Canmore"
                  />
                </div>
              </Card>
            </div>

            {/* Add-ons */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Enhance Your Experience</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="p-6 bg-card border-border">
                  <h4 className="font-bold mb-2">Custom Arrangement</h4>
                  <div className="text-2xl font-bold text-primary mb-3">+$200</div>
                  <p className="text-sm text-muted-foreground">
                    Professional arrangement of your special song, delivered 2 weeks before event.
                  </p>
                </Card>
                <Card className="p-6 bg-card border-border">
                  <h4 className="font-bold mb-2">Additional Hour</h4>
                  <div className="text-2xl font-bold text-primary mb-3">+$300</div>
                  <p className="text-sm text-muted-foreground">
                    Extend coverage for dinner or special moments beyond standard packages.
                  </p>
                </Card>
              </div>
              <div className="text-center text-xs text-muted-foreground mt-6">
                You'll never see a surprise fee. Ever.
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="max-w-4xl mx-auto mt-8 space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Why Choose a Ceremony Specialist?</h3>
              <p className="text-muted-foreground">
                Compare the risks and see why couples trust Parker for their vows.
              </p>
            </div>
            
            <Card className="p-6 bg-card border-border">
              <ComparisonTable />
            </Card>
          </div>

          {/* Final CTA */}
          <div className="max-w-2xl mx-auto text-center mt-16 space-y-6">
            <h3 className="text-2xl font-bold">Ready to Secure Your Date?</h3>
            <p className="text-muted-foreground">
              Limited availability for 2025 and 2026 wedding seasons.
            </p>
            <Button size="lg" className="hover-scale">
              Check Availability
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
