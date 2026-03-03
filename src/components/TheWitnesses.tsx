import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  { quote: "Placeholder", names: "Placeholder", venue: "Placeholder" },
  { quote: "Placeholder", names: "Placeholder", venue: "Placeholder" },
  { quote: "Placeholder", names: "Placeholder", venue: "Placeholder" },
];

export function TheWitnesses() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="the-witnesses"
      ref={sectionRef}
      data-theme="life"
      className="relative py-[120px] piano-section-target overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
      }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(45 20% 93% / 0.8) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Top fade */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE COVENANT KEPT
            </p>
            <div
              className={cn(
                "h-[2px] w-8 mx-auto mb-6 rounded-full transition-all duration-700",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{
                background: "hsl(var(--vow-yellow))",
                transitionDelay: isVisible ? "100ms" : "0ms",
              }}
              aria-hidden="true"
            />
            <h2
              className={cn(
                "font-display font-light leading-tight mb-4 text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                letterSpacing: "0.01em",
                transitionDelay: isVisible ? "200ms" : "0ms",
                textWrap: "balance" as any,
              }}
            >
              The music{" "}
              <span className="relative inline-block">
                stayed
                <span
                  className={cn(
                    "absolute left-0 right-0 -bottom-1 h-[3px] origin-left transition-transform duration-700",
                    isVisible ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.65), hsl(var(--vow-yellow) / 0.2))",
                    boxShadow: isVisible ? "0 0 10px hsl(var(--vow-yellow) / 0.3)" : "none",
                    transitionDelay: isVisible ? "700ms" : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                  }}
                  aria-hidden="true"
                />
              </span>
              {" "}with them
            </h2>
          </div>

          {/* Testimonials */}
          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "relative text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  transitionDelay: isVisible ? `${400 + index * 250}ms` : "0ms",
                }}
              >
                <blockquote
                  className="font-display font-light italic leading-relaxed mb-6 text-foreground/90 text-2xl"
                  style={{ textWrap: "balance" as any }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="text-center">
                  <p
                    className="font-display font-medium italic text-foreground/75"
                    style={{ fontSize: "15px", letterSpacing: "0.04em" }}
                  >
                    {testimonial.names}
                  </p>
                  <p
                    className="font-display text-foreground/50 mt-1"
                    style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    {testimonial.venue}
                  </p>
                </div>

                {/* Static golden separator */}
                {index < testimonials.length - 1 && (
                  <div
                    className={cn(
                      "mt-16 h-px w-8 mx-auto transition-all duration-700",
                      isVisible ? "opacity-30 scale-x-100" : "opacity-0 scale-x-0"
                    )}
                    style={{
                      background: "hsl(var(--vow-yellow))",
                      transitionDelay: isVisible ? `${600 + index * 250}ms` : "0ms",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Semicolon */}
          <div
            className={cn(
              "text-center mt-16 transition-all duration-700",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
            style={{ transitionDelay: isVisible ? "1100ms" : "0ms" }}
          >
            <span
              className="font-display inline-block select-none"
              style={{
                fontSize: "28px",
                color: "hsl(var(--vow-yellow) / 0.25)",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              ;
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 2%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
