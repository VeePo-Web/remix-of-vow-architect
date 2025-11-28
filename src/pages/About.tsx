import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AboutOriginStory } from "@/components/AboutOriginStory";
import { AboutEvolutionTimeline } from "@/components/AboutEvolutionTimeline";
import { AboutCredentials } from "@/components/AboutCredentials";
import { AboutEthos } from "@/components/AboutEthos";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Our planner said Parker was the only vendor who emailed her an SPL log and timeline. That said everything.",
    author: "Nadia",
    venue: "Canmore",
    initials: "N",
  },
  {
    quote: "We never worried once. The mics, the music, the mix—it was surgical.",
    author: "Jonas & Tara",
    venue: "Banff",
    initials: "JT",
  },
  {
    quote: "He made our officiant feel like a rockstar and sent a cue sheet she still uses.",
    author: "Maya",
    venue: "Calgary",
    initials: "M",
  },
];

export default function About() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Section 1: Hero - Identity Anchor */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Breadcrumbs items={[
              { label: "Home", path: "/" },
              { label: "About Parker" }
            ]} />
            
            <div className="text-center space-y-4">
              <div className="overline">Ceremony Sound Director</div>
              <h1>Meet Parker — Your Ceremony Sound Director</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead max-w-3xl mx-auto">
                I design ceremony audio like a mission-critical system: written plan, 
                measured clarity, triple backups, calm delivery.
              </p>
              <p className="caption text-muted-foreground">
                Because your vows deserve more than background music.
              </p>
            </div>

            <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground italic">
                Hero image: Me at the piano with the cue sheet open and a subtle SPL graph overlay. 
                Guests are arranged in a proximity arc; the setup fades into the scene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Origin Story */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              The vows that sparked the system
            </h2>
            <AboutOriginStory />
          </div>
        </div>
      </section>

      {/* Section 3: Evolution Timeline */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              A 7-Year evolution in ceremony audio
            </h2>
            <AboutEvolutionTimeline />
          </div>
        </div>
      </section>

      {/* Section 4: Credentials & Approvals */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Venue-approved. Legally covered. Technically certified.
            </h2>
            <AboutCredentials />
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">
                What Couples Actually Say
              </h2>
              <p className="text-xl text-muted-foreground italic">
                What stood out wasn't the music—it was the precision.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 bg-card border border-border">
                  <div className="flex flex-col gap-4">
                    <TestimonialAvatar
                      alt={testimonial.author}
                      fallback={testimonial.initials}
                    />
                    <p className="text-sm italic text-foreground leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.author} • {testimonial.venue}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Ethos Values */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              What I stand for
            </h2>
            <AboutEthos />
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Want to see what my ceremony plan looks like?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="gap-2">
                <FileDown size={18} />
                Download a real SPL log + cue-sheet plan
              </Button>
              <Button size="lg">
                Hold my date & receive my custom plan in 24h
              </Button>
            </div>
            <p className="caption text-muted-foreground">
              No pitches. Just clarity, professionalism, and relief.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
