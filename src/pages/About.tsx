import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function About() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16 animate-fade-in">
            <div className="text-center">
              <div className="overline mb-2">About</div>
              <h1 className="mx-auto">Parker Allard</h1>
              <div className="chapter-rule mx-auto" />
            </div>

            <div className="prose prose-invert mx-auto">
              <p className="lead">
                A high-end, impeccably prepared wedding pianist whose presence lowers client anxiety
                and elevates ceremony emotion.
              </p>

              <Card className="p-8 my-8 bg-card border-border card-keyline">
                <h3 className="text-xl font-bold mb-4">Philosophy</h3>
                <p className="text-muted-foreground">
                  Every ceremony deserves perfection. Through meticulous preparation, redundant systems,
                  and years of experience, I ensure your most sacred moment is preserved in flawless sound.
                  No technical failures. No timing issues. Only the music you've dreamed of.
                </p>
              </Card>

              <h3 className="text-2xl font-bold mt-12 mb-4">Certifications & Credentials</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• SOCAN Licensed Performer</li>
                <li>• Comprehensive Liability Insurance</li>
                <li>• Royal Conservatory of Music - ARCT Diploma</li>
                <li>• 15+ Years Performance Experience</li>
                <li>• 200+ Ceremonies & Events</li>
              </ul>

              <h3 className="text-2xl font-bold mt-12 mb-4">Equipment</h3>
              <p className="text-muted-foreground">
                Primary and backup systems for every performance. Professional-grade instruments
                maintained to studio standards. Redundant audio chains ensure uninterrupted coverage
                regardless of venue conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
