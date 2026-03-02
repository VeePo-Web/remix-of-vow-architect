import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import pathsPianoCandle from "@/assets/paths-piano-candle.jpg";

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

/* Step 7: Stagger order — chosen (center) first, then left, then right */
const revealDelays = [550, 450, 650];

function DiamondIcon({ chosen }: { chosen?: boolean }) {
  return (
    <span
      className="inline-block shrink-0 mt-[5px]"
      style={{
        width: 6,
        height: 6,
        transform: "rotate(45deg)",
        background: `hsl(var(--vow-yellow) / ${chosen ? 0.7 : 0.45})`,
        borderRadius: 1,
      }}
      aria-hidden="true"
    />
  );
}

export function ThreePaths() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="three-paths"
      ref={sectionRef}
      className="section--dark section-grain piano-section-target relative py-24 px-4 overflow-hidden min-h-[500px]"
    >
      {/* Top fade */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />

      {/* Step 1: Cinematic background image */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={pathsPianoCandle}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.10] pointer-events-none"
          style={{
            animation: 'paths-ken-burns 30s ease-in-out infinite alternate',
            filter: 'saturate(0.6) sepia(0.1) contrast(1.05)',
            willChange: 'transform',
          }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Step 2: Warm radial spotlight centered on cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, hsl(var(--vow-yellow) / 0.035) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 4%) 100%)',
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

        {/* Step 9: Threshold line before cards */}
        <div
          className={cn(
            "h-[1px] max-w-6xl mx-auto mb-12 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent 5%, hsl(var(--vow-yellow) / 0.06) 30%, hsl(var(--vow-yellow) / 0.06) 70%, transparent 95%)",
            transitionDelay: isVisible ? "420ms" : "0ms",
          }}
          aria-hidden="true"
        />

        {/* Three Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 items-stretch">
          {paths.map((path, index) => (
            <div
              key={index}
              className={cn(
                "three-paths-card relative rounded-lg group flex flex-col",
                path.isChosen
                  ? "three-paths-card--chosen md:-translate-y-3 p-10 md:p-14"
                  : "three-paths-card--flanking hover:-translate-y-1 p-10 md:p-12",
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]"
              )}
              style={{
                transitionDelay: isVisible ? `${revealDelays[index]}ms` : "0ms",
              }}
            >
              {/* Film grain overlay */}
              <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none rounded-lg" aria-hidden="true" />

              {/* Step 5: Elevated "MOST CHOSEN" Badge */}
              {path.isChosen && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="paths-chosen-badge">
                    <span
                      className="inline-block"
                      style={{
                        width: 5,
                        height: 5,
                        transform: "rotate(45deg)",
                        background: "hsl(var(--vow-yellow))",
                        borderRadius: 1,
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-primary">
                      MOST CHOSEN
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        width: 5,
                        height: 5,
                        transform: "rotate(45deg)",
                        background: "hsl(var(--vow-yellow))",
                        borderRadius: 1,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              {/* Step 4a: Name zone with golden underline */}
              <div className="mb-2">
                <h3 className="text-2xl font-display font-light text-card-foreground">
                  {path.name}
                </h3>
                <div
                  className="h-[1px] w-8 mt-2"
                  style={{ background: `linear-gradient(90deg, hsl(var(--vow-yellow) / ${path.isChosen ? 0.5 : 0.2}), transparent)` }}
                  aria-hidden="true"
                />
              </div>

              {/* Step 4b: Price zone with breathing room */}
              <div className="mb-8">
                <span
                  className="text-[clamp(36px,5vw,48px)] font-display font-light text-card-foreground"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {path.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-[13px] font-display font-light italic text-muted-foreground mb-6 pb-6 border-b border-border/20">
                {path.description}
              </p>

              {/* Step 3 & 4c: Features with golden diamonds */}
              <ul className="space-y-3 mb-8 flex-1">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-card-foreground/80">
                    <DiamondIcon chosen={path.isChosen} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Step 4d & 8: CTA commitment zone */}
              <Button
                className={cn(
                  "w-full mt-auto",
                  path.isChosen && "cta-breathe-glow",
                  !path.isChosen && "paths-cta-warm"
                )}
                variant={path.isChosen ? "default" : "outline"}
                asChild
              >
                <Link to="/contact">{path.ctaText}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Step 10: Golden thread separator + diamond + reassurance */}
        <div
          className={cn(
            "h-[1px] w-12 mx-auto mb-6 transition-all duration-700",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            transitionDelay: isVisible ? "850ms" : "0ms",
          }}
          aria-hidden="true"
        />

        {/* Centered diamond above reassurance */}
        <div
          className={cn(
            "flex justify-center mb-4 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
          aria-hidden="true"
        >
          <span
            className="inline-block"
            style={{
              width: 5,
              height: 5,
              transform: "rotate(45deg)",
              background: "hsl(var(--vow-yellow) / 0.4)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Reassurance */}
        <p
          className={cn(
            "text-center text-sm text-muted-foreground/80 max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{
            transitionDelay: isVisible ? "950ms" : "0ms",
            textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          }}
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
