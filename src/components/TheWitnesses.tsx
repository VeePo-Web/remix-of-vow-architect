import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import witnessesVenue from "@/assets/witnesses-venue-ai.jpg";

const testimonials = [
  {
    quote: "The moment the first note played, every worry I had disappeared.",
    names: "A spring bride, Canmore",
    venue: "Outdoor ceremony",
  },
  {
    quote: "Our guests still talk about the music more than anything else.",
    names: "A couple married at sunset",
    venue: "Mountain venue",
  },
  {
    quote: "He played the song from our first date. I did not know I could cry that much and still say I do.",
    names: "A bride who danced in the rain",
    venue: "Lakeside ceremony",
  },
];

export function TheWitnesses() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      data-theme="life"
      className="relative section--surface section-padding-standard overflow-hidden min-h-[400px]"
      style={{
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
      }}
    >
      {/* Background image with Ken Burns — overflow-hidden wrapper */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={witnessesVenue}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
          style={{
            animation: "witnesses-ken-burns 25s ease-in-out infinite alternate",
            filter: 'saturate(0.85) contrast(1.05)',
            willChange: 'transform',
          }}
          loading="lazy"
        />
      </div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(45 20% 93% / 0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Warm atmospheric fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Radial warm glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, hsl(45 30% 90% / 0.5), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Top fade from ThreePaths dark */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
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
            {/* Step 9: Heading with animated "stayed" underline */}
            <h2
              className={cn(
                "font-display font-light leading-tight mb-4 text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                transitionDelay: isVisible ? "200ms" : "0ms",
                textWrap: "balance" as any,
              }}
            >
              The music{" "}
              <span className="relative inline-block">
                stayed
                <span
                  className={cn(
                    "absolute left-0 right-0 -bottom-1 h-[2px] origin-left transition-transform duration-700",
                    isVisible ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--vow-yellow) / 0.15))",
                    boxShadow: isVisible ? "0 0 6px hsl(var(--vow-yellow) / 0.2)" : "none",
                    transitionDelay: isVisible ? "700ms" : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                  }}
                  aria-hidden="true"
                />
              </span>
              {" "}with them
            </h2>
          </div>

          {/* Testimonials Stack */}
          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "witnesses-testimonial-card relative transition-all duration-700 rounded-lg text-center",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  transitionDelay: isVisible ? `${400 + index * 300}ms` : "0ms",
                }}
              >
                {/* Step 8: Decorative quotation mark */}
                <div
                  className="font-display text-6xl leading-none text-foreground/[0.08] select-none pointer-events-none mb-2"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote */}
                <blockquote
                  className="font-display font-light leading-relaxed mb-6 text-foreground/90"
                  style={{
                    fontSize: "clamp(24px, 3vw, 28px)",
                    textWrap: "balance" as any,
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="text-center">
                  <p
                    className="font-display italic text-foreground/70"
                    style={{ fontSize: "14px", letterSpacing: "0.04em" }}
                  >
                    — {testimonial.names}, {testimonial.venue}
                  </p>
                </div>

                {/* Separator (except last) — increased spacing */}
                {index < testimonials.length - 1 && (
                  <div
                    className={cn(
                      "mt-16 h-[1px] w-12 mx-auto transition-all duration-700",
                      isVisible ? "opacity-40 scale-x-100" : "opacity-0 scale-x-0"
                    )}
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
                      transitionDelay: isVisible ? `${600 + index * 300}ms` : "0ms",
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
