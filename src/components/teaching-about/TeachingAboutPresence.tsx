import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useState } from "react";

const witnessedMoments = [
  "An adult student who started at 48 and played at her own wedding a year later",
  "A teenager who learned one piece to play for his grandmother in hospice",
  "A returning student who quit at 12 and came back at 35 — and found it easier the second time",
];

export function TeachingAboutPresence() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="teaching-about-presence"
      aria-label="Years at the Keys"
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
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>THE YEARS</p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          <div className={cn("mb-4 transition-all duration-1000", isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm")} style={{ transitionDelay: "200ms" }}>
            <span className="font-display text-[clamp(72px,12vw,140px)] font-light leading-none" style={{ color: "hsl(var(--vow-yellow) / 0.9)" }}>17</span>
          </div>

          <p className={cn("font-display text-xl text-muted-foreground mb-16 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{ transitionDelay: "400ms" }}>
            years at the keys.
          </p>

          {/* Moment cards with gold left-rule + frame index */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
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
