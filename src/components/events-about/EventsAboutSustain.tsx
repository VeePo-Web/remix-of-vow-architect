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
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)",
      }}
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
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>THREE PRINCIPLES</p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          <h2 className={cn("font-display text-[clamp(24px,3vw,40px)] font-light text-foreground mb-16 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: "200ms" }}>
            What I carry to every gathering.
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {threePrinciples.map((item, index) => (
              <div
                key={item.label}
                className={cn("text-center transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}
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

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} aria-hidden="true" />
    </section>
  );
}
