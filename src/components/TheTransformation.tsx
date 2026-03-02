import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import transformationImg from "@/assets/transformation-fear-ai.jpg";

const fears = [
  "What if the music sounds like every other ceremony your guests have sat through",
  "What if the back row never hears the song you chose for your walk down",
  "What if no one asks what was playing when you knew",
  "What if the person behind the piano treats your ceremony like another Saturday",
];

const resolutions = [
  "I ask what was playing when you knew — and I build your ceremony from there",
  "Your walk-down arrangement is written note by note — for the two of you, and no one else",
  "A printed ceremony plan lands in your inbox before you think to ask for one",
  "I stay until the last guest has gone and the final note has found its silence",
];

export function TheTransformation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      id="the-transformation"
      ref={sectionRef}
      className="section-grain piano-section-target relative overflow-hidden"
      role="region"
      aria-label="The Transformation — fears honoured, promises made"
      style={{
        background: "linear-gradient(180deg, hsl(220 15% 8%) 0%, hsl(220 15% 8%) 38%, hsl(45 30% 92%) 62%, hsl(45 30% 92%) 100%)",
      }}
    >
      {/* sr-only narrative */}
      <span className="sr-only">
        This section mirrors the fears you may carry about your ceremony music,
        then answers each one with a first-person promise from Parker.
      </span>

      {/* Top fade — seamless from The Sound */}
      <div
        className="section-fade-top"
        style={{ background: "linear-gradient(to top, transparent, hsl(220 15% 8%))" }}
        aria-hidden="true"
      />

      {/* Layer 1: Single Ken Burns background image */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={transformationImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform"
          style={{
            opacity: 0.1,
            filter: "brightness(0.75) contrast(1.08) saturate(0.6)",
            animation: !reducedMotion ? "transform-fear-kb 30s ease-in-out infinite alternate" : "none",
          }}
          loading="lazy"
          fetchPriority="low"
        />
      </div>

      {/* Layer 2: Film grain */}
      <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none" aria-hidden="true" />

      {/* Layer 2b: Warm fog — subtle vow-yellow atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* Layer 3: Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(220 15% 8% / 0.5) 100%)" }}
        aria-hidden="true"
      />

      {/* Content — single column narrative */}
      <div className="relative z-10 max-w-[640px] mx-auto px-6 md:px-8 py-24 md:py-32">

        {/* === DEATH SPACE — Fears === */}
        <div className="mb-16 md:mb-24">
          {/* Overline */}
          <p
            className={cn(
              "text-xs uppercase tracking-[0.22em] text-foreground/50 mb-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)" }}
          >
            The Transformation
          </p>

          {/* Heading */}
          <h2
            className={cn(
              "font-display text-2xl md:text-3xl font-light tracking-tight text-foreground/90 mb-12 md:mb-16 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isVisible ? "120ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            The questions no one else thinks to ask
          </h2>

          {/* Fears — whispered italic Cormorant */}
          <div className="space-y-6 md:space-y-8">
            {fears.map((fear, i) => (
              <p
                key={i}
                className={cn(
                  "font-display text-lg md:text-xl font-light italic leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-[0.55] translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  color: "hsl(var(--foreground))",
                  transitionDelay: isVisible ? `${280 + i * 100}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                {fear}
              </p>
            ))}
          </div>
        </div>

        {/* === GOLDEN THREAD THRESHOLD === */}
        <div className="flex items-center justify-center my-12 md:my-16" aria-hidden="true">
          {/* Left line */}
          <div
            className={cn(
              "h-[1px] flex-1 max-w-[120px] origin-right transition-transform duration-700",
              isVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))",
              transitionDelay: isVisible ? "800ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          />

          {/* Diamond */}
          <div
            className={cn(
              "w-[7px] h-[7px] mx-4 rotate-45 transition-all duration-700",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
            style={{
              background: "hsl(var(--vow-yellow))",
              boxShadow: "0 0 12px 4px hsl(var(--vow-yellow) / 0.4), 0 0 30px 8px hsl(var(--vow-yellow) / 0.15)",
              animation: !reducedMotion ? "divider-diamond-breathe 4s ease-in-out infinite" : "none",
              transitionDelay: isVisible ? "900ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          />

          {/* Right line */}
          <div
            className={cn(
              "h-[1px] flex-1 max-w-[120px] origin-left transition-transform duration-700",
              isVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)",
              transitionDelay: isVisible ? "800ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          />
        </div>

        {/* === LIFE SPACE — Resolutions === */}
        <div className="mt-16 md:mt-24">
          {/* Heading */}
          <h3
            className={cn(
              "font-display text-2xl md:text-3xl font-light tracking-tight mb-12 md:mb-16 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              color: "hsl(var(--rich-black))",
              transitionDelay: isVisible ? "1000ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            So here is what I do about it
          </h3>

          {/* Resolutions — Inter body, vow-yellow en-dash prefix */}
          <div className="space-y-6 md:space-y-8">
            {resolutions.map((resolution, i) => (
              <p
                key={i}
                className={cn(
                  "font-sans text-base md:text-lg leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-[0.85] translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  color: "hsl(var(--rich-black))",
                  transitionDelay: isVisible ? `${1100 + i * 100}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                <span
                  className="inline-block mr-2 font-medium"
                  style={{ color: "hsl(var(--vow-yellow) / 0.7)" }}
                  aria-hidden="true"
                >
                  —
                </span>
                {resolution}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into TheWitness */}
      <div
        className="section-fade-bottom"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(45 25% 96%))" }}
        aria-hidden="true"
      />
    </section>
  );
}
