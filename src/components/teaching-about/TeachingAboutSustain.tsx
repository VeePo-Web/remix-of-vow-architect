import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const threeBeliefs = [
  { label: "Patience", description: "I will never rush you. We move at your speed, not mine." },
  { label: "Listening", description: "I ask about your goals before I assign a single piece." },
  { label: "Expression", description: "Technique serves the music. The music serves you." },
];

export function TeachingAboutSustain() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="teaching-about-sustain"
      aria-label="Three Beliefs"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 piano-section-target"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)" }}
    >
      {/* Parallax watermark */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.015]" style={{ color: "hsl(var(--foreground))" }} aria-hidden="true">
        Sustain
      </span>

      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 60%)" }} aria-hidden="true" />

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section numeral + label */}
          <div className={cn("mb-4 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            <span className="block font-display text-[40px] font-light leading-none mb-3" style={{ background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>03</span>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>WHAT GUIDES ME</p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          <h2 className={cn("font-display text-[clamp(24px,3vw,40px)] font-light text-foreground mb-16 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: "200ms" }}>
            Three things I bring to every session.
          </h2>

          <div className="max-w-xl mx-auto space-y-0">
            {threeBeliefs.map((item, index) => (
              <div key={item.label}>
                <div className={cn("py-10 text-center transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: `${400 + index * 200}ms` }}>
                  <h3 className="font-display text-2xl text-foreground mb-3">{item.label}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < threeBeliefs.length - 1 && (
                  <div className={cn("flex justify-center transition-all duration-700", isVisible ? "opacity-100" : "opacity-0")} style={{ transitionDelay: `${500 + index * 200}ms` }} aria-hidden="true">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--vow-yellow) / 0.6)", boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.3)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} aria-hidden="true" />
    </section>
  );
}
