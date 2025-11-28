import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="overline mb-2">Investment</div>
            <h1 className="mx-auto">Pricing & Packages</h1>
            <div className="chapter-rule mx-auto" />
            <p className="lead mx-auto text-muted-foreground mt-6">
              Transparent pricing for ceremony perfection. No hidden fees. No surprises.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-24">
            {/* Ceremony Package */}
            <Card className="p-8 card-keyline bg-card border-border">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Ceremony Package</h3>
                  <div className="text-4xl font-bold text-primary mb-6">$650</div>
                  <p className="text-muted-foreground mb-6">
                    Complete ceremony coverage with professional sound and personalized music selection.
                  </p>
                  <Button className="hover-scale">Book Now</Button>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Included:</h4>
                  <ul className="space-y-3">
                    {[
                      "45 minutes of performance",
                      "Pre-ceremony music (20 min)",
                      "Processional & recessional",
                      "Unity ceremony music",
                      "Professional PA system",
                      "Consultation & song selection",
                      "Backup equipment on-site",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Add-ons */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Enhance Your Experience</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-card border-border">
                  <h4 className="font-bold mb-2">Cocktail Hour</h4>
                  <div className="text-2xl font-bold text-primary mb-3">+$450</div>
                  <p className="text-sm text-muted-foreground">
                    60 minutes of elegant background music during cocktail reception.
                  </p>
                </Card>
                <Card className="p-6 bg-card border-border">
                  <h4 className="font-bold mb-2">Custom Arrangement</h4>
                  <div className="text-2xl font-bold text-primary mb-3">+$200</div>
                  <p className="text-sm text-muted-foreground">
                    Professional arrangement of your special song, delivered 2 weeks before event.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
