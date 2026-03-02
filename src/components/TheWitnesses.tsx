import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import witnessesVenue from "@/assets/witnesses-venue-ai.jpg";

const testimonials = [
  {
    quote: "The moment the first note played, every worry I had disappeared.",
    names: "A spring bride",
    venue: "Canmore, outdoor ceremony",
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

/* Alternating card rotations for hand-placed feel */
const cardRotations = [-0.3, 0, 0.3];
const cardStaggerDelays = [400, 650, 900];

/** SVG open-quote motif in vow-yellow */
function QuoteMotif() {
  return (
    <svg
      className="absolute -top-5 left-1/2 -translate-x-1/2 pointer-events-none select-none"
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 16.8C0 10.2 4.2 4.2 12 0l1.8 3C8.4 6 6 9.6 6 13.2c0 .6.2 1 .6 1.2 1.8-.6 3-.6 3.6-.6 3.6 0 5.8 2.4 5.8 5.4 0 3-2.4 5.4-5.8 5.4C5.4 24.6 0 21.6 0 16.8Zm18 0C18 10.2 22.2 4.2 30 0l1.8 3C26.4 6 24 9.6 24 13.2c0 .6.2 1 .6 1.2 1.8-.6 3-.6 3.6-.6 3.6 0 5.8 2.4 5.8 5.4 0 3-2.4 5.4-5.8 5.4 -4.8 0-10.2-3-10.2-7.8Z"
        fill="hsl(45 80% 72%)"
        fillOpacity="0.05"
      />
    </svg>
  );
}

export function TheWitnesses() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="the-witnesses"
      ref={sectionRef}
      data-theme="life"
      className="relative section--surface section-padding-standard piano-section-target overflow-hidden min-h-[400px]"
      style={{
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
      }}
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={witnessesVenue}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
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

      {/* Secondary warm pool at base (Step 10) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 60%, hsl(45 35% 88% / 0.4), transparent)',
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
            {/* Heading with animated "stayed" underline (Step 7: 3px, 8px glow) */}
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
                    "absolute left-0 right-0 -bottom-1 h-[3px] origin-left transition-transform duration-700",
                    isVisible ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--vow-yellow) / 0.15))",
                    boxShadow: isVisible ? "0 0 8px hsl(var(--vow-yellow) / 0.2)" : "none",
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
                  transitionDelay: isVisible ? `${cardStaggerDelays[index]}ms` : "0ms",
                  transform: isVisible ? `rotate(${cardRotations[index]}deg)` : undefined,
                }}
              >
                {/* SVG Quote Motif (Step 2) */}
                <QuoteMotif />

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

                {/* Attribution (Step 6: hierarchy) */}
                <div className="text-center">
                  <p
                    className="font-display font-medium italic text-foreground/75"
                    style={{ fontSize: "14px", letterSpacing: "0.04em" }}
                  >
                    — {testimonial.names}
                  </p>
                  <p
                    className="font-display text-foreground/50 mt-1"
                    style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    {testimonial.venue}
                  </p>
                </div>

                {/* Breathing separator (except last) — Step 3 */}
                {index < testimonials.length - 1 && (
                  <div
                    className={cn(
                      "mt-16 h-[1px] w-20 mx-auto witnesses-thread-breathing transition-all duration-700",
                      isVisible ? "scale-x-100" : "opacity-0 scale-x-0"
                    )}
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
                      transitionDelay: isVisible ? `${600 + index * 250}ms` : "0ms",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Closing semicolon sacred object (Step 4) */}
          <div
            className={cn(
              "text-center mt-16 transition-all duration-700",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
            style={{ transitionDelay: isVisible ? "1100ms" : "0ms" }}
          >
            <span
              className="witnesses-semicolon font-display inline-block select-none"
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

      {/* Bottom fade into CrossOver dark */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 2%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
