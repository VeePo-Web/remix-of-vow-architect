import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrustStrip } from "@/components/TrustStrip";
import { Check, Star, Play } from "lucide-react";
import heroImage from "@/assets/hero-piano.jpg";

const packages = [
  {
    name: "Ceremony",
    duration: "45 minutes",
    price: "Starting at $650",
    features: [
      "Pre-ceremony music (20 min)",
      "Processional & recessional",
      "Unity ceremony music",
      "Professional sound system",
      "Consultation & song selection",
    ],
  },
  {
    name: "Cocktail Hour",
    duration: "60 minutes",
    price: "Starting at $450",
    features: [
      "Background ambiance",
      "Jazz & contemporary standards",
      "Volume-balanced for conversation",
      "Seamless transitions",
      "Custom requests welcome",
    ],
  },
  {
    name: "Full Experience",
    duration: "3 hours",
    price: "Starting at $1,450",
    features: [
      "Ceremony + Cocktail + Dinner",
      "Continuous music coverage",
      "Custom arrangement (1 song)",
      "Priority booking",
      "Rehearsal attendance",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Parker's playing elevated our ceremony beyond words. Every note was perfect, every transition seamless. Our guests still talk about it.",
    author: "Sarah & Michael",
    venue: "Fairmont Banff Springs",
    rating: 5,
  },
  {
    quote:
      "Professional, prepared, and absolutely stunning. The backup equipment gave us peace of mind, the music gave us chills.",
    author: "Jennifer & David",
    venue: "Lake Louise",
    rating: 5,
  },
  {
    quote:
      "We couldn't have asked for better. Parker understood our vision and brought it to life with such grace and skill.",
    author: "Emily & James",
    venue: "Canmore Opera House",
    rating: 5,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden grain">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--rich-black)) 0%, hsl(var(--deep-graphite)) 100%), url(${heroImage})`,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
          }}
        />
        
        <div className="container mx-auto relative z-10 text-center px-4 pt-20 pb-16">
          <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
            <h1 className="mx-auto">
              <span className="block">'Til' Death;</span>
              <span className="block vow-underline">Unto Life</span>
            </h1>
            
            <p className="lead mx-auto text-muted-foreground">
              Ceremony piano, engineered for vows. Impeccable sound. Immaculate timing.
              A stress-proof audio plan for your most sacred moment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="hover-scale">
                Check Availability
              </Button>
              <Button size="lg" variant="outline" className="hover-scale group">
                <Play size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                Listen
              </Button>
            </div>

            <div className="pt-8">
              <TrustStrip />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="overline mb-2">Investment</div>
            <h2>Packages & Services</h2>
            <div className="chapter-rule mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className="p-6 card-keyline hover-scale transition-all duration-180 bg-card border-border"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                  </div>
                  
                  <div className="chapter-rule" />
                  
                  <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                  
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            No obligation. 2-minute availability check.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="overline mb-2">Testimonials</div>
            <h2>What Couples Say</h2>
            <div className="chapter-rule mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 card-keyline bg-card border-border"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="body-large italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.venue}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2>Ready to Secure Your Date?</h2>
            <p className="lead mx-auto text-muted-foreground">
              Limited availability for 2025 and 2026 wedding seasons.
              Check dates now or reach out with questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="hover-scale">
                Hold Your Date
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                Contact Parker
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
