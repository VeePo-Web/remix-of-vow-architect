import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import witnessesVenue from "@/assets/witnesses-venue-ai.jpg";

const testimonials = [
  {
    quote: "Every guest heard us\u2014even the back row.",
    names: "Sarah & James",
    venue: "Spruce Meadows",
    metric: "62 dBA at aisle mid",
  },
  {
    quote: "We were Banff-legal with zero stress.",
    names: "Emily & David",
    venue: "Cascade Gardens",
    metric: "unamplified; proximity arc applied",
  },
  {
    quote: "The SPL log let us skip our venue\u2019s site visit requirement.",
    names: "Rachel & Marcus",
    venue: "Lake House",
    metric: "68 dBA peak ceremony reading",
  },
];

export function TheWitnesses() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      data-theme="life"
      className="relative section--surface section-padding-standard overflow-hidden"
      style={{
        minHeight: '400px',
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
      }}
    >
      {/* Background image layer */}
      <img
        src={witnessesVenue}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.10] pointer-events-none"
        style={{ animation: "ken-burns 25s ease-in-out infinite alternate" }}
        loading="lazy"
        aria-hidden="true"
      />
      {/* Top fade from TheRecord dark */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE COVENANT KEPT
            </p>
            {/* Golden rule separator */}
            <div
              className={cn(
                "h-[2px] w-12 mx-auto mb-6 rounded-full transition-all duration-700",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
                transitionDelay: isVisible ? "100ms" : "0ms",
              }}
              aria-hidden="true"
            />
            <h2
              className={cn(
                "text-[clamp(28px,4vw,40px)] font-display font-light leading-tight mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "200ms" : "0ms", textWrap: "balance" as any }}
            >
              They heard their vows
            </h2>
          </div>

          {/* Testimonials Stack */}
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "relative transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: isVisible ? `${300 + index * 200}ms` : "0ms" }}
              >
                {/* Decorative Opening Quote — mobile-safe positioning */}
                <div 
                  className="absolute -left-4 md:-left-8 -top-3 text-7xl md:text-8xl font-display text-primary/8 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {"\u201C"}
                </div>

                {/* Quote — curly quotes */}
                <blockquote className="text-2xl font-display font-light leading-relaxed mb-6 text-foreground/90 pl-2">
                  {testimonial.quote}
                </blockquote>

                {/* Attribution */}
                <div className="pl-2">
                  <p className="text-base font-display italic text-foreground mb-1">
                    — {testimonial.names}, {testimonial.venue}
                  </p>
                  <p 
                    className="text-xs text-muted-foreground opacity-60 font-mono"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    [ {testimonial.metric} ]
                  </p>
                </div>

                {/* Separator (except last) */}
                {index < testimonials.length - 1 && (
                  <div 
                    className={cn(
                      "mt-12 h-[1px] w-24 mx-auto transition-all duration-700",
                      isVisible ? "opacity-30 scale-x-100" : "opacity-0 scale-x-0"
                    )}
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
                      transitionDelay: isVisible ? `${500 + index * 200}ms` : "0ms",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom fade into CrossOver dark */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 2%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
