import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const threePrinciples = [
  { label: "Atmosphere", description: "I shape the feeling of being together." },
  { label: "Adaptability", description: "Your event, your sound." },
  { label: "Presence", description: "Present without performing." },
];

export function EventsAboutSustain() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="events-about-sustain"
      aria-label="Three Principles"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 piano-section-target"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--deep-graphite)) 50%, hsl(var(--background)) 100%)",
      }}
    >
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto text-center">
          {/* Label */}
          <p
            className={cn(
              "text-xs uppercase tracking-[0.3em] ml-[0.15em] mb-4 transition-all duration-700",
              isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            THREE PRINCIPLES
          </p>

          {/* Headline */}
          <h2
            className={cn(
              "font-display text-[clamp(24px,3vw,40px)] font-light text-foreground mb-16 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            What I carry to every gathering.
          </h2>

          {/* Editorial numerals replace SVG */}

          {/* Three columns with gold numerals */}
          <div className="grid md:grid-cols-3 gap-12">
            {threePrinciples.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <span
                  className="block font-display text-[48px] font-light mb-4 leading-none"
                  style={{
                    background: "linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.4))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-foreground mb-3">{item.label}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
