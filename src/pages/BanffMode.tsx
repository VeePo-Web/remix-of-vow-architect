import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BanffModeSystemDiagram } from "@/components/BanffModeSystemDiagram";
import { BanffInclusionsList } from "@/components/BanffInclusionsList";
import { BanffVenueTable } from "@/components/BanffVenueTable";
import { BanffTestimonials } from "@/components/BanffTestimonials";
import { BanffFAQ } from "@/components/BanffFAQ";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

export default function BanffMode() {
  usePageTheme();

  const scrollToVenues = () => {
    const element = document.getElementById('venue-index');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* SECTION 1 — Hero */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="overline">Assured Ceremony Audio™</div>
            <h1 className="h1 mx-auto">Banff Mode™ — Compliant by Design.</h1>
            <div className="chapter-rule mx-auto" />
            <p className="p-lead mx-auto text-muted-foreground">
              For ceremony venues that prohibit amplification, generators, or power access—without sacrificing audibility or elegance.
            </p>
            <Button size="lg" onClick={scrollToVenues} className="mt-6">
              See if my venue requires Banff Mode →
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — The Problem */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="h2 text-center mb-8 mx-auto">
              Why Banff sound rules stop most vendors
            </h2>
            <div className="chapter-rule mx-auto" />
            
            <Card className="p-8 bg-destructive/5 border-destructive/20">
              <p className="p-lead text-foreground mb-4">
                Banff and many Parks Canada sites ban electronic amplification. That means no microphones, no speakers, no generators—and most DJ/band setups simply don't fit. Even when power is technically possible, generator sound and permitting create a second layer of stress that breaks the natural silence.
              </p>
              <p className="p-body text-muted-foreground">
                What couples feel here: anxiety about guests hearing vows, confusion about what's legal, and pressure to compromise on experience. I remove that pressure by designing the ceremony around acoustic clarity from the start.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3 — The Solution */}
      <BanffModeSystemDiagram />

      {/* SECTION 4 — Inclusions */}
      <BanffInclusionsList />

      {/* SECTION 5 — Venue Table */}
      <BanffVenueTable id="venue-index" />

      {/* SECTION 6 — Testimonials */}
      <BanffTestimonials />

      {/* SECTION 7 — FAQ */}
      <BanffFAQ />

      {/* SECTION 8 — Final CTA */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="h2 mx-auto">
              Planning a Banff ceremony?
            </h2>
            <div className="chapter-rule mx-auto" />
            
            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Hold my date & get my Banff Mode plan
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Turnaround: 24 hours with a seating arc sketch and run-of-show.
              </p>
            </div>

            <div className="pt-8 border-t border-border mt-12">
              <Button variant="outline" size="lg" className="gap-2">
                <Download size={16} />
                Banff Venue Sound Compliance Chart
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                A one-page reference with seating tips, cue timing, and weather switch guidance—great to share with your officiant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — Accessibility Footer */}
      <section className="py-8 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground text-center">
              I design within typical Parks Canada and venue guidelines for sound. No PA and no generators means we prioritize proximity seating and acoustic projection. Your plan includes a simple diagram your officiant can follow.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
