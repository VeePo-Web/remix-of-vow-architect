import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import soundKeys from "@/assets/sound-keys.jpg";

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
      "Live piano for your ceremony",
      "Processional and recessional pieces",
      "Custom arrangement consultation",
      "Run-of-show cue sheet",
    ],
    ctaText: "Hold my date",
  },
  {
    name: "The Hour",
    price: "$750",
    description: "Prelude + Ceremony",
    features: [
      "Everything in The Vow",
      "30-minute piano prelude as guests arrive",
      "Backup piano and speakers included",
      "Rain cover for outdoor ceremonies",
    ],
    isChosen: true,
    ctaText: "Hold my date",
  },
  {
    name: "The Story",
    price: "$1,200",
    description: "Prelude + Ceremony + Reception",
    features: [
      "Everything in The Hour",
      "Live piano through dinner and reception",
      "Full-day timeline consultation",
      "Insurance and all equipment included",
    ],
    ctaText: "Hold my date",
  },
];

export function ThreePaths() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="section--dark section-grain relative py-24 px-4 overflow-hidden min-h-[500px]">
      {/* Top fade from TheWitness warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
        aria-hidden="true"
      />

      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={soundKeys}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
          style={{
            animation: 'paths-ken-burns 30s ease-in-out infinite alternate',
            filter: 'saturate(0.5) contrast(1.1)',
            willChange: 'transform',
          }}
          loading="lazy"
        />
      </div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 4%) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Warm fog layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
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
              "text-[clamp(28px,4vw,40px)] font-display font-light leading-tight text-foreground mb-4 text-center transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any }}
          >
            Choose the moment that matters most.
          </h2>
          <p
            className={cn(
              "text-base text-muted-foreground max-w-2xl mx-auto text-center transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            Three ways I can shape the music of your day.
          </p>

          {/* Golden thread separator */}
          <div
            className={cn(
              "h-[1px] w-12 mx-auto mt-8 transition-all duration-700",
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            )}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
              transitionDelay: isVisible ? "400ms" : "0ms",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Three Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 items-stretch">
          {paths.map((path, index) => (
            <div
              key={index}
              className={cn(
                "three-paths-card relative rounded-lg p-10 md:p-12 group flex flex-col",
                path.isChosen && "three-paths-card--chosen md:-translate-y-2",
                !path.isChosen && "hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ 
                transitionDelay: isVisible ? `${450 + index * 150}ms` : "0ms",
              }}
            >
              {/* Chosen Badge */}
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
              <p className="text-[13px] font-display font-light italic text-muted-foreground mb-6 pb-6 border-b border-border/20">
                {path.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-card-foreground/80">
                    <Check size={16} className="text-primary/70 shrink-0 mt-0.5" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className={cn(
                  "w-full mt-auto",
                  path.isChosen && "cta-breathe-glow",
                  !path.isChosen && "text-foreground/80 border-foreground/20 hover:bg-foreground/10 hover:text-foreground hover:border-foreground/30"
                )} 
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
            "text-center text-sm text-muted-foreground/70 max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
        >
          You can move between these at any time—no penalty until two weeks before your day.
        </p>
      </div>

      {/* Bottom fade into TheWitnesses warm */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 20% 93%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
