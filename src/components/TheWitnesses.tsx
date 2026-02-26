import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import witnessesVenue from "@/assets/witnesses-venue-ai.jpg";

const testimonials = [
  {
    quote: "The moment the first note played, every worry I had disappeared.",
    names: "Future couple",
    venue: "Outdoor ceremony",
  },
  {
    quote: "Our guests still talk about the music more than anything else.",
    names: "Future couple",
    venue: "Mountain venue",
  },
  {
    quote: "He played the song from our first date. I did not know I could cry that much and still say I do.",
    names: "Future couple",
    venue: "Lakeside ceremony",
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
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
        style={{ animation: "ken-burns 25s ease-in-out infinite alternate" }}
        loading="lazy"
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
      <div className="section-grain" aria-hidden="true" />
      {/* Top fade from ThreePaths dark */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4">
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
              The music stayed with them
            </h2>
          </div>

          {/* Testimonials Stack */}
          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "relative transition-all duration-700 border-l-2 pl-8",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  transitionDelay: isVisible ? `${400 + index * 300}ms` : "0ms",
                  borderColor: "hsl(var(--vow-yellow) / 0.2)",
                }}
              >
                {/* Quote */}
                <blockquote
                  className="font-display font-light leading-relaxed mb-6 text-foreground/90"
                  style={{
                    fontSize: "clamp(22px, 3vw, 28px)",
                    textWrap: "balance" as any,
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div>
                  <p
                    className="font-display italic text-foreground/70"
                    style={{ fontSize: "14px", letterSpacing: "0.04em" }}
                  >
                    — {testimonial.names}, {testimonial.venue}
                  </p>
                </div>

                {/* Separator (except last) */}
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
