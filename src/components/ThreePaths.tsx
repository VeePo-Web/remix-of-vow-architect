import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
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
    name: "The Vow",
    price: "$650",
    description: "Ceremony only",
    features: [
      "Officiant/vow microphones",
      "Silent battery power",
      "3 SPL readings logged",
      "Run-of-show cue sheet",
    ],
    ctaText: "Choose this presence",
  },
  {
    name: "The Hour",
    price: "$750",
    description: "Prelude + Ceremony + Cocktails",
    features: [
      "Everything in The Vow",
      "Live piano prelude (30 min)",
      "Cocktail hour music",
      "Extended SPL monitoring",
    ],
    isChosen: true,
    ctaText: "Choose this presence",
  },
  {
    name: "The Story",
    price: "$1,200",
    description: "Full wedding day",
    features: [
      "Everything in The Hour",
      "Reception DJ & MC",
      "Full-day SPL documentation",
      "Timeline consultation",
    ],
    ctaText: "Choose this presence",
  },
];

export function ThreePaths() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section--dark section-grain relative py-24 px-4 overflow-hidden" style={{ minHeight: '500px' }}>
      {/* Top fade from TheWitness warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
        aria-hidden="true"
      />
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={cn(
              "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            YOUR PRESENCE
          </p>
          <h2
            className={cn(
              "text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight text-foreground mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            How deeply do you want me there?
          </h2>
          <p
            className={cn(
              "text-base text-muted-foreground max-w-2xl mx-auto transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            Three ways I can be present on your day.
          </p>
        </div>

        {/* Three Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 items-stretch">
          {paths.map((path, index) => (
            <div
              key={index}
              className={cn(
                "relative border rounded-lg p-10 transition-all duration-300 group flex flex-col backdrop-blur-sm",
                path.isChosen 
                  ? "border-primary/40 md:-translate-y-2" 
                  : "border-border/20 hover:border-primary/20 hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ 
                transitionDelay: isVisible ? `${450 + index * 150}ms` : "0ms",
                transitionTimingFunction: "var(--easing-std)",
                background: path.isChosen 
                  ? 'radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow) / 0.06) 0%, hsl(var(--ebon-charcoal) / 0.95) 70%)'
                  : 'hsl(var(--ebon-charcoal) / 0.9)',
                boxShadow: path.isChosen
                  ? '0 8px 40px rgba(255,224,138,0.12), inset 0 1px 0 hsl(var(--vow-yellow) / 0.1)'
                  : '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Chosen Badge — refined diamond */}
              {path.isChosen && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-md tracking-wider">
                    ◆ MOST SELECTED
                  </div>
                </div>
              )}

              {/* Path Name */}
              <h3 className="text-2xl font-display font-light mb-2 text-card-foreground">
                {path.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-[clamp(36px,5vw,48px)] font-display font-light text-card-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {path.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border/20">
                {path.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-card-foreground/80">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className="w-full mt-auto" 
                variant={path.isChosen ? "default" : "outline"}
                asChild
              >
                <Link to="/contact">{path.ctaText}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <p
          className={cn(
            "text-center text-sm text-muted-foreground/70 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
        >
          You can move between these at any time—no penalty until two weeks before your day.
        </p>
      </div>
    </section>
  );
}
