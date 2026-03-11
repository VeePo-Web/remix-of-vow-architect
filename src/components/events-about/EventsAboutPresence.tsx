import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useState } from "react";

const stats = [
  { value: "500+", label: "Songs" },
  { value: "12", label: "Years" },
  { value: "4", label: "Venue Types" },
];

const witnessedMoments = [
  "The CEO who teared up during the holiday dinner",
  "The cocktail hour where strangers became friends over shared silence",
  "The reception where I played four hours and no one noticed the music — only the feeling",
  "The farewell gathering where one song said what words could not",
];

export function EventsAboutPresence() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="events-about-presence"
      aria-label="The Presence"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 overflow-hidden piano-section-target"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Parallax watermark */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.02]" style={{ color: "hsl(var(--foreground))" }} aria-hidden="true">
        Presence
      </span>

      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)", animation: "witness-vignette-breathe 6s ease-in-out infinite" }} aria-hidden="true" />

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section numeral + label */}
          <div className={cn("mb-4 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            <span className="block font-display text-[40px] font-light leading-none mb-3" style={{ background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>04</span>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>THE PRESENCE</p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          {/* Stats row */}
          <div className={cn("flex flex-wrap justify-center gap-12 md:gap-20 mb-16 transition-all duration-1000", isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm")} style={{ transitionDelay: "200ms" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-display text-[clamp(48px,8vw,80px)] font-light leading-none" style={{ color: "hsl(var(--vow-yellow) / 0.9)" }}>{stat.value}</span>
                <span className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2 block">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Moment cards with gold left-rule + frame index */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {witnessedMoments.map((moment, index) => (
              <div
                key={index}
                className={cn("group relative p-6 rounded-sm text-left transition-all duration-700 cursor-default", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                  borderLeft: "2px solid transparent",
                  borderImage: hoveredIndex === index
                    ? "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.15)) 1"
                    : "linear-gradient(180deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05)) 1",
                  background: hoveredIndex === index ? "hsl(var(--vow-yellow) / 0.04)" : "hsl(var(--card) / 0.5)",
                  boxShadow: hoveredIndex === index ? "0 4px 24px hsl(var(--vow-yellow) / 0.06)" : "none",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="absolute top-2 right-3 text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none select-none motion-reduce:hidden" style={{ color: "hsl(var(--vow-yellow))" }} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-base text-foreground leading-relaxed italic">{moment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} aria-hidden="true" />
    </section>
  );
}
