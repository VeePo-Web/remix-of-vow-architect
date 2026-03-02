import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import transformationFear from "@/assets/transformation-fear-ai.jpg";
import transformationLife from "@/assets/transformation-life-ai.jpg";

const fears = [
  "What if the music sounds like every other ceremony you've attended",
  "What if the piano becomes background noise — pleasant, but forgettable",
  "What if no one asks which songs carry the weight of your story",
  "What if the musician treats your ceremony as just another booking",
];

const resolutions = [
  "I begin with a conversation — not a playlist. Your story shapes every note",
  "Your walk-down song is composed from scratch — written for the two of you alone",
  "A complete ceremony plan arrives in your inbox before you think to ask for one",
  "I stay until the last guest has left and the final note has settled",
];

export function TheTransformation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <section id="the-transformation" ref={sectionRef} className="section-grain piano-section-target relative min-h-[500px] overflow-hidden">
      {/* Top fade — seamless transition from The Sound's dark exit */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(220 15% 8%))' }}
        aria-hidden="true"
      />

      {/* Floating Section Label — centered on divider */}
      <p
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-6 md:top-10 z-40 text-xs uppercase tracking-[0.22em] text-foreground/50 transition-all duration-700",
          "bg-background/40 backdrop-blur-sm px-5 py-1.5 rounded-full",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        THE TRANSFORMATION
      </p>

      {/* Full-Width Split Screen */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* LEFT PANEL — DEATH (Fears) */}
        <div
          className="relative px-8 py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(220 15% 8%) 0%, hsl(240 12% 3%) 100%)" }}
        >
          {/* Ken Burns background image */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              src={transformationFear}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none will-change-transform"
              style={{
                animation: 'transform-fear-kb 35s ease-in-out infinite alternate',
                filter: 'saturate(0.6) contrast(1.1)',
              }}
              loading="lazy"
              fetchPriority="low"
            />
          </div>

          {/* Film grain */}
          <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none" aria-hidden="true" />

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(240 12% 3%) 100%)" }}
            aria-hidden="true"
          />

          {/* Decorative blue glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle at 30% 40%, hsl(220 80% 20% / 0.15) 0%, transparent 60%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-md mx-auto space-y-6 mt-8">
            {/* Panel heading */}
            <h3
              className={cn(
                "font-display text-xl font-light italic tracking-tight text-foreground/40 mb-8 transition-all duration-[900ms]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "0ms", transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }}
            >
              The quiet worries no one talks about
            </h3>

            {fears.map((fear, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-700 group hover:!opacity-100",
                  isVisible ? "translate-x-0" : "opacity-0 -translate-x-6",
                )}
                style={{
                  opacity: isVisible ? (0.70 - index * 0.05) : undefined,
                  transitionDelay: isVisible ? `${200 + index * 200}ms` : "0ms",
                  transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
                onMouseEnter={canHover ? (e) => e.currentTarget.style.opacity = '1' : undefined}
                onMouseLeave={canHover ? (e) => { if (isVisible) e.currentTarget.style.opacity = String(0.70 - index * 0.05); } : undefined}
              >
                <X size={20} className="text-error shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                <p className="text-base leading-relaxed text-foreground/80">{fear}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile golden thread separator — Death-to-Life threshold */}
        <div
          className="md:hidden flex justify-center my-8"
          aria-hidden="true"
        >
          <div
            className={cn(
              "w-12 h-[1px] origin-center transition-transform duration-700",
              isVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
              transitionDelay: isVisible ? "500ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          />
        </div>

        {/* RIGHT PANEL — LIFE (Resolutions) */}
        <div
          className="relative px-8 py-16 md:py-24 flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(45 30% 95%) 0%, hsl(42 28% 91%) 100%)" }}
        >
          {/* Ken Burns background image */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              src={transformationLife}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none will-change-transform"
              style={{
                animation: 'transform-life-kb 25s ease-in-out infinite alternate',
                filter: 'saturate(0.85) contrast(1.05)',
              }}
              loading="lazy"
              fetchPriority="low"
            />
          </div>

          {/* Film grain */}
          <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(42 28% 91% / 0.6) 100%)" }}
            aria-hidden="true"
          />

          {/* Warm golden glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle at 70% 40%, hsl(var(--vow-yellow) / 0.15) 0%, transparent 60%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-md mx-auto space-y-6">
            {/* Panel heading */}
            <h3
              className={cn(
                "font-display text-xl font-light italic tracking-tight text-rich-black/50 mb-8 transition-all duration-[900ms] relative inline-block",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "0ms", transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }}
            >
              So here is what I do
              {/* Golden vow underline */}
              <span
                className={cn(
                  "absolute left-0 -bottom-1 h-[2px] w-8 origin-left transition-transform duration-700",
                  isVisible ? "scale-x-100" : "scale-x-0"
                )}
                style={{
                  background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.2))",
                  boxShadow: isVisible ? "0 0 8px hsl(var(--vow-yellow) / 0.3)" : "none",
                  transitionDelay: isVisible ? "400ms" : "0ms",
                  transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
                aria-hidden="true"
              />
            </h3>

            {resolutions.map((resolution, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-700 group hover:!opacity-100",
                  isVisible ? "translate-x-0" : "opacity-0 translate-x-6",
                )}
                style={{
                  opacity: isVisible ? (0.80 - index * 0.05) : undefined,
                  transitionDelay: isVisible ? `${200 + index * 200}ms` : "0ms",
                  transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
                onMouseEnter={canHover ? (e) => e.currentTarget.style.opacity = '1' : undefined}
                onMouseLeave={canHover ? (e) => { if (isVisible) e.currentTarget.style.opacity = String(0.80 - index * 0.05); } : undefined}
              >
                <Check size={20} className="text-success shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                <p className="text-base leading-relaxed text-rich-black font-medium">{resolution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER DIVIDER — breathing glow with diamond focal point */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none hidden md:block z-30"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(var(--vow-yellow) / 0.85) 50%, transparent 100%)",
          boxShadow: "0 0 50px 12px hsl(var(--vow-yellow) / 0.25), 0 0 100px 24px hsl(var(--vow-yellow) / 0.12)",
          animation: "divider-breathe 4s ease-in-out infinite",
        }}
        aria-hidden="true"
      >
        {/* Golden diamond focal point — offset timing to avoid double-pulse */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] rotate-45"
          style={{
            background: 'hsl(var(--vow-yellow))',
            boxShadow: '0 0 12px 4px hsl(var(--vow-yellow) / 0.5), 0 0 30px 8px hsl(var(--vow-yellow) / 0.2)',
            animation: 'divider-diamond-breathe 4s ease-in-out 2.5s infinite',
          }}
        />
      </div>

      {/* Bottom fade into TheWitness warm */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 25% 96%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
