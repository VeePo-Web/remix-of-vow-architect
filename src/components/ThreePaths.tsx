import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PathCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isChosen?: boolean;
  ctaText: string;
}

const paths: PathCardProps[] = [
  {
    name: "The Moment",
    price: "$650",
    description: "Ceremony only",
    features: [
      "Officiant/vow microphones",
      "Silent battery power",
      "3 SPL readings logged",
      "Run-of-show cue sheet",
    ],
    ctaText: "Select The Moment",
  },
  {
    name: "The Day",
    price: "$750",
    description: "Prelude + Ceremony + Cocktails",
    features: [
      "Everything in The Moment",
      "Live piano prelude (30 min)",
      "Cocktail hour music",
      "Extended SPL monitoring",
    ],
    isChosen: true,
    ctaText: "Select The Day",
  },
  {
    name: "The Journey",
    price: "$1,200",
    description: "Full wedding day",
    features: [
      "Everything in The Day",
      "Reception DJ & MC",
      "Full-day SPL documentation",
      "Timeline consultation",
    ],
    ctaText: "Select The Journey",
  },
];

export function ThreePaths() {
  return (
    <section className="section--dark py-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
            YOUR PRESENCE
          </p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight text-ink-inverse mb-4">
            What kind of presence?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Choose the level of ceremony audio coverage that matches your day.
          </p>
        </div>

        {/* Three Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {paths.map((path, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-card border rounded-lg p-8 transition-all duration-300",
                path.isChosen 
                  ? "border-primary shadow-[0_8px_32px_rgba(255,224,138,0.15)] md:-translate-y-2" 
                  : "border-border/30 hover:border-border/60"
              )}
            >
              {/* Chosen Badge */}
              {path.isChosen && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                    ★ MOST SELECTED
                  </div>
                </div>
              )}

              {/* Path Name */}
              <h3 className="text-2xl font-display font-light mb-2 text-card-foreground">
                {path.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-5xl font-display font-light text-card-foreground transition-colors duration-300 hover:text-primary">
                  {path.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border/30">
                {path.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-card-foreground/80">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className="w-full" 
                variant={path.isChosen ? "default" : "outline"}
                asChild
              >
                <a href="/contact">{path.ctaText}</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <p className="text-center text-sm text-muted-foreground/70">
          Upgrade anytime. No penalty until 2 weeks prior.
        </p>
      </div>
    </section>
  );
}
