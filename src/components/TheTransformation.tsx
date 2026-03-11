import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const sectionElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionElRef.current = node;
      if (typeof sectionRef === "function") {
        (sectionRef as (node: HTMLElement | null) => void)(node);
      } else if (sectionRef && typeof sectionRef === "object") {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [sectionRef]
  );

  return (
    <section
      id="the-transformation"
      ref={setRefs}
      className="piano-section-target relative overflow-hidden min-h-[80vh]"
      role="region"
      aria-label="The Transformation — fears honoured, promises made"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 40%, hsl(var(--card)) 60%, hsl(var(--background)) 100%)",
      }}
    >
      <span className="sr-only">
        This section mirrors the fears you may carry about your ceremony music,
        then answers each one with a first-person promise from Parker.
      </span>

      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 65%, hsl(var(--vow-yellow) / 0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 md:px-8 py-32 md:py-40">

        {/* === Fears === */}
        <div className="max-w-[640px] mx-auto mb-16 md:mb-24">
          <p
            className={cn(
              "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)" }}
          >
            The Transformation
          </p>

          <h2
            className={cn(
              "font-display text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8 md:mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isVisible ? "120ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            The questions no one else thinks to ask
          </h2>

          <div className="space-y-8 md:space-y-10">
            {fears.map((fear, i) => (
              <p
                key={i}
                className={cn(
                  "font-display text-lg md:text-xl font-light italic leading-relaxed text-muted-foreground transition-all duration-700",
                  isVisible ? "opacity-[0.7] translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  transitionDelay: isVisible ? `${280 + i * 120}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                {fear}
              </p>
            ))}
          </div>
        </div>

        {/* === GOLDEN THREAD THRESHOLD === */}
        <div className="relative flex flex-col items-center my-12 md:my-16" aria-hidden="true">
          <div
            className={cn(
              "w-[1px] h-[40px] mb-2 transition-all duration-700",
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            )}
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--vow-yellow) / 0.3))",
              transformOrigin: "top",
              animation: !reducedMotion ? "golden-thread-breathe 4s ease-in-out infinite" : "none",
              transitionDelay: isVisible ? "750ms" : "0ms",
            }}
          />

          <div className="flex items-center justify-center w-full">
            <div
              className={cn(
                "h-[1px] flex-1 max-w-[160px] origin-right transition-transform duration-700",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))",
                transitionDelay: isVisible ? "800ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
            />

            <div className="relative mx-4">
              <div
                className="absolute inset-0 -inset-x-8 -inset-y-8"
                style={{
                  background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.08) 0%, transparent 70%)",
                }}
              />
              <div
                className={cn(
                  "w-[7px] h-[7px] rotate-45 transition-all duration-700 relative z-10",
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
            </div>

            <div
              className={cn(
                "h-[1px] flex-1 max-w-[160px] origin-left transition-transform duration-700",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)",
                transitionDelay: isVisible ? "800ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
            />
          </div>

          <div
            className={cn(
              "w-[1px] h-[40px] mt-2 transition-all duration-700",
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            )}
            style={{
              background: "linear-gradient(to top, transparent, hsl(var(--vow-yellow) / 0.3))",
              transformOrigin: "bottom",
              animation: !reducedMotion ? "golden-thread-breathe 4s ease-in-out infinite 2s" : "none",
              transitionDelay: isVisible ? "750ms" : "0ms",
            }}
          />
        </div>

        {/* === Resolutions === */}
        <div className="max-w-[600px] mx-auto mt-16 md:mt-24">
          <h3
            className={cn(
              "font-display text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8 md:mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isVisible ? "1000ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            So here is what I do about it
          </h3>

          <div className="space-y-6 md:space-y-8">
            {resolutions.map((resolution, i) => (
              <div
                key={i}
                className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  borderLeft: "2px solid hsl(var(--vow-yellow) / 0.3)",
                  padding: "0 0 0 24px",
                  transitionDelay: isVisible ? `${1100 + i * 120}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                <p className="font-sans text-base md:text-lg leading-relaxed text-foreground">
                  <span
                    className="inline-block mr-2 font-medium"
                    style={{ color: "hsl(var(--vow-yellow) / 0.7)" }}
                    aria-hidden="true"
                  >
                    —
                  </span>
                  {resolution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="section-fade-bottom"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}