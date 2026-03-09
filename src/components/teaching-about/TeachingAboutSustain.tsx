import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const threeBeliefs = [
  { label: "Patience", description: "The most active form of attention." },
  { label: "Conversation", description: "The first question I ask is never about music." },
  { label: "Expression", description: "The instrument is not something to conquer — it is something to converse with." },
];

export function TeachingAboutSustain() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="teaching-about-sustain"
      aria-label="Three Beliefs"
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
          <p
            className={cn(
              "text-xs uppercase tracking-[0.3em] ml-[0.15em] mb-4 transition-all duration-700",
              isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            THREE BELIEFS
          </p>

          <h2
            className={cn(
              "font-display text-[clamp(24px,3vw,40px)] font-light text-foreground mb-16 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            What I carry to every lesson.
          </h2>

          {/* Vertical stacked beliefs with golden dot separators */}
          <div className="max-w-xl mx-auto space-y-0">
            {threeBeliefs.map((item, index) => (
              <div key={item.label}>
                <div
                  className={cn(
                    "py-10 text-center transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                >
                  <h3 className="font-display text-2xl text-foreground mb-3">{item.label}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < threeBeliefs.length - 1 && (
                  <div
                    className={cn(
                      "flex justify-center transition-all duration-700",
                      isVisible ? "opacity-100" : "opacity-0"
                    )}
                    style={{ transitionDelay: `${500 + index * 200}ms` }}
                    aria-hidden="true"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "hsl(var(--vow-yellow) / 0.6)",
                        boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.3)",
                      }}
                    />
                  </div>
                )}
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
