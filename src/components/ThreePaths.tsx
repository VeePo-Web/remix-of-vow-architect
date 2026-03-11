import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import pathsPianoCandle from "@/assets/paths-piano-candle.jpg";

interface KeyTier {
  name: string;
  price: string;
  description: string;
  sentence: string;
  ctaText: string;
  isChosen?: boolean;
}

const tiers: KeyTier[] = [
  {
    name: "The Vow",
    price: "$650",
    description: "The ceremony itself — 30 to 45 minutes of devoted presence at the most sacred hour.",
    sentence: "Your vows, carried by piano. Nothing more, nothing less.",
    ctaText: "Hold my date",
  },
  {
    name: "The Hour",
    price: "$750",
    description: "Extended presence — from guest arrival through the ceremony and into cocktails.",
    sentence: "The room is already sacred before the first word is spoken.",
    ctaText: "Hold my date",
    isChosen: true,
  },
  {
    name: "The Story",
    price: "$1,200",
    description: "Full-day witness — from the first guest arriving to the last note over dinner.",
    sentence: "From the first guest to the last glass raised — I am there.",
    ctaText: "Hold my date",
  },
];

/* Stagger: center first, then left, then right */
const whiteKeyDelays = [530, 450, 610];
const blackKeyDelays = [480, 560];

function GoldenDiamond() {
  return (
    <span
      className="inline-block"
      style={{
        width: 6,
        height: 6,
        transform: "rotate(45deg)",
        background: "hsl(var(--vow-yellow) / 0.55)",
        borderRadius: 1,
      }}
      aria-hidden="true"
    />
  );
}

function BlackKey({ delay, isVisible }: { delay: number; isVisible: boolean }) {
  return (
    <div
      className={cn(
        "piano-black-key hidden md:flex items-start justify-center pt-12 -mx-5 lg:-mx-6 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      aria-hidden="true"
    >
      <GoldenDiamond />
    </div>
  );
}

function MobileGoldenThread() {
  return (
    <div
      className="md:hidden h-[1px] w-12 mx-auto my-4"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
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
      role="region"
      aria-label="Pricing options"
      className="piano-section-target relative py-[80px] md:py-[120px] px-4 min-h-[500px]"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, hsl(var(--vow-yellow) / 0.05) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        {/* Header — centered */}
        <div className="flex flex-col items-center mb-16">
          <p
            className={cn(
              "font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 w-full block text-center transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
            )}
          >
            THREE KEYS
          </p>
          <h2
            className={cn(
              "text-[clamp(30px,4.5vw,40px)] font-display font-light leading-tight tracking-[0.02em] text-foreground text-center transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
            )}
            style={{ transitionDelay: isVisible ? "120ms" : "0ms", maxWidth: "18ch", margin: "0 auto" }}
          >
            Choose the presence that fits your day.
          </h2>

          {/* Golden thread separator */}
          <div
            className={cn(
              "h-[1px] w-16 mx-auto mt-10 transition-all duration-700",
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            )}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
              transitionDelay: isVisible ? "300ms" : "0ms",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ─── Piano Keys Layout (Desktop) ─── */}
        <div className="hidden md:flex items-end max-w-5xl mx-auto mb-12 piano-keys-container overflow-visible">
          {tiers.map((tier, i) => (
            <div key={tier.name} className="contents">
              {/* White Key */}
              <div
                className={cn(
                  "piano-white-key flex-1 flex flex-col transition-all duration-700",
                  tier.isChosen && "piano-white-key--chosen",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: isVisible ? `${whiteKeyDelays[i]}ms` : "0ms", paddingBottom: 40 }}
              >
                {/* MOST CHOSEN badge — inside key padding for visibility */}
                {tier.isChosen && (
                  <div className="relative z-10 flex flex-col items-center -mt-6 mb-2">
                    <div className="paths-chosen-badge">
                      <span
                        className="inline-block"
                        style={{
                          width: 5, height: 5,
                          transform: "rotate(45deg)",
                          background: "hsl(var(--vow-yellow))",
                          borderRadius: 1,
                        }}
                        aria-hidden="true"
                      />
                      <span className="text-[10px] font-medium tracking-[0.18em] text-primary">
                        MOST CHOSEN
                      </span>
                      <span
                        className="inline-block"
                        style={{
                          width: 5, height: 5,
                          transform: "rotate(45deg)",
                          background: "hsl(var(--vow-yellow))",
                          borderRadius: 1,
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Connecting golden thread */}
                    <div
                      className="w-[1px] h-3"
                      style={{ background: "hsl(var(--vow-yellow) / 0.3)" }}
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Top spacer — clean ivory playing surface */}
                <div className="flex-grow min-h-[120px] max-h-[180px]" />

                {/* Name */}
                <h3 className="piano-key__name">{tier.name}</h3>

                {/* Golden underline */}
                <div
                  className="h-[3px] w-12 mt-2 mb-6"
                  style={{ background: `linear-gradient(90deg, hsl(var(--vow-yellow) / ${tier.isChosen ? 0.75 : 0.65}), hsl(var(--vow-yellow) / 0.2), transparent)` }}
                  aria-hidden="true"
                />

                {/* Price */}
                <span className="piano-key__price">{tier.price}</span>

                {/* Description */}
                <p className="piano-key__description" style={{ minHeight: '2.8em' }}>{tier.description}</p>

                {/* Composed sentence */}
                <p className="piano-key__sentence" style={{ minHeight: '3em' }}>{tier.sentence}</p>

                {/* CTA */}
                <Button
                  className={cn(
                    "w-full mt-auto",
                    tier.isChosen
                      ? "piano-key__cta--chosen"
                      : "piano-key__cta--flanking"
                  )}
                  variant={tier.isChosen ? "default" : "outline"}
                  asChild
                >
                  <Link to="/contact">{tier.ctaText}</Link>
                </Button>
              </div>

              {/* Black Key (between white keys, not after last) */}
              {i < tiers.length - 1 && (
                <BlackKey delay={blackKeyDelays[i]} isVisible={isVisible} />
              )}
            </div>
          ))}
        </div>

        {/* ─── Mobile: Stacked white keys with golden thread separators ─── */}
        <div className="md:hidden flex flex-col gap-0 max-w-sm mx-auto mb-12">
          {tiers.map((tier, i) => (
            <div key={tier.name}>
              <div
                className={cn(
                  "piano-white-key piano-white-key--mobile flex flex-col justify-end transition-all duration-700",
                  tier.isChosen && "piano-white-key--chosen",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: isVisible ? `${whiteKeyDelays[i]}ms` : "0ms", paddingBottom: 40 }}
              >
                {tier.isChosen && (
                  <div className="relative z-10 flex flex-col items-center -mt-2 mb-3">
                    <div className="paths-chosen-badge">
                      <span
                        className="inline-block"
                        style={{
                          width: 5, height: 5,
                          transform: "rotate(45deg)",
                          background: "hsl(var(--vow-yellow))",
                          borderRadius: 1,
                        }}
                        aria-hidden="true"
                      />
                      <span className="text-[10px] font-medium tracking-[0.18em] text-primary">
                        MOST CHOSEN
                      </span>
                      <span
                        className="inline-block"
                        style={{
                          width: 5, height: 5,
                          transform: "rotate(45deg)",
                          background: "hsl(var(--vow-yellow))",
                          borderRadius: 1,
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className="w-[1px] h-2"
                      style={{ background: "hsl(var(--vow-yellow) / 0.3)" }}
                      aria-hidden="true"
                    />
                  </div>
                )}

                <h3 className="piano-key__name">{tier.name}</h3>
                <div
                  className="h-[3px] w-12 mt-2 mb-4"
                  style={{ background: `linear-gradient(90deg, hsl(var(--vow-yellow) / ${tier.isChosen ? 0.75 : 0.65}), hsl(var(--vow-yellow) / 0.2), transparent)` }}
                  aria-hidden="true"
                />
                <span className="piano-key__price" style={{ textShadow: '0 1px 2px hsl(var(--rich-black) / 0.06)' }}>{tier.price}</span>
                <p className="piano-key__description">{tier.description}</p>
                <p className="piano-key__sentence">{tier.sentence}</p>
                <Button
                  className={cn(
                    "w-full mt-auto",
                    tier.isChosen ? "piano-key__cta--chosen" : "piano-key__cta--flanking"
                  )}
                  variant={tier.isChosen ? "default" : "outline"}
                  asChild
                >
                  <Link to="/contact">{tier.ctaText}</Link>
                </Button>
              </div>
              {i < tiers.length - 1 && <MobileGoldenThread />}
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div
          className={cn(
            "flex justify-center mb-4 mt-12 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
          aria-hidden="true"
        >
          <GoldenDiamond />
        </div>

        <p
          className={cn(
            "text-center text-sm text-muted-foreground max-w-lg mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{
            transitionDelay: isVisible ? "880ms" : "0ms",
            textShadow: "0 1px 8px hsl(var(--rich-black) / 0.3)",
          }}
        >
          You can move between these at any time — no penalty until two weeks before your ceremony.
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--surface-warm)))' }}
        aria-hidden="true"
      />
    </section>
  );
}
