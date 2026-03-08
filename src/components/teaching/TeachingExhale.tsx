import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * TeachingExhale — Recognition / Sacred Pause
 *
 * Scroll-linked word-by-word opacity reveals with a non-linear easing curve:
 * words near the center of the block reveal faster than those at the edges,
 * creating a "breathing" rhythm. The underline on "waiting" appears at 90%
 * scroll progress. Enhanced with multi-layer atmospheric depth.
 */

interface LineConfig {
  text: string;
  italic: boolean;
  size: string;
  underlineWord?: string;
  /** Weight of text shadow — heavier for italic emotional lines */
  shadowWeight: "light" | "medium";
}

const lines: LineConfig[] = [
  {
    text: "There is a sound inside you that your hands have not yet found.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    shadowWeight: "medium",
  },
  {
    text: "You hear it in the car. In the quiet of an empty room. In the space between what you feel and what you can say.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    shadowWeight: "medium",
  },
  {
    text: "I hear you.",
    italic: false,
    size: "text-[18px] md:text-[24px]",
    shadowWeight: "light",
  },
  {
    text: "The bench has been waiting.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    underlineWord: "waiting",
    shadowWeight: "medium",
  },
];

/* ── Word map ── */
function buildWordMap(lineConfigs: LineConfig[]) {
  const words: { word: string; lineIdx: number; isUnderline: boolean }[] = [];
  lineConfigs.forEach((line, li) => {
    line.text.split(" ").forEach((w) => {
      const isUnderline =
        !!line.underlineWord &&
        w.toLowerCase().replace(/[^a-z]/g, "") ===
          line.underlineWord.toLowerCase();
      words.push({ word: w, lineIdx: li, isUnderline });
    });
  });
  return words;
}

const allWords = buildWordMap(lines);

/* ── Text shadow presets ── */
const TEXT_SHADOWS: Record<string, string> = {
  light: "0 1px 3px hsl(40 20% 80% / 0.2)",
  medium:
    "0 1px 2px hsl(40 20% 80% / 0.25), 0 4px 16px hsl(40 30% 70% / 0.06)",
};

/* ── Scroll-linked word reveal block ── */
function ScrollRevealBlock({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  const update = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    // Non-linear mapping: accelerate through the middle, ease at edges
    const raw = 1 - (rect.top - vh * 0.25) / (vh * 0.55);
    const clamped = Math.max(0, Math.min(1, raw));
    // Apply an ease-in-out curve to the progress for breathing rhythm
    const eased =
      clamped < 0.5
        ? 2 * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
    setProgress(eased);
    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, update]);

  let globalIdx = 0;

  return (
    <div ref={containerRef}>
      {lines.map((line, li) => {
        const lineWords = allWords.filter((w) => w.lineIdx === li);
        return (
          <p
            key={li}
            className={cn(
              "font-display tracking-tight leading-[1.5]",
              line.size,
              line.italic ? "italic" : "font-medium not-italic",
              li < lines.length - 1 ? "mb-fitz-5" : "mb-0"
            )}
            style={{
              color: line.italic ? "hsl(30 10% 25%)" : "hsl(30 10% 35%)",
              textShadow: TEXT_SHADOWS[line.shadowWeight],
            }}
          >
            {lineWords.map((w, wi) => {
              const wordGlobalIdx = globalIdx++;
              const threshold = wordGlobalIdx / allWords.length;
              const opacity = isInView
                ? Math.max(
                    0.08,
                    Math.min(1, (progress - threshold * 0.75) / 0.25)
                  )
                : 0.08;

              // Subtle Y-drift: words start 3px low and settle to 0
              const yDrift = isInView
                ? Math.max(0, 3 * (1 - (progress - threshold * 0.75) / 0.25))
                : 3;

              if (w.isUnderline) {
                return (
                  <span
                    key={wi}
                    className="inline-block"
                    style={{
                      opacity,
                      transform: `translateY(${yDrift}px)`,
                      transition: "opacity 80ms linear, transform 120ms ease-out",
                      willChange: "opacity, transform",
                    }}
                  >
                    <span className="relative inline-block">
                      {w.word}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 w-full h-[2px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                          progress > 0.9 ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{
                          transitionTimingFunction:
                            "cubic-bezier(.16,1,.3,1)",
                          boxShadow:
                            progress > 0.9
                              ? "0 0 6px 1px hsl(var(--vow-yellow) / 0.2)"
                              : "none",
                        }}
                        aria-hidden="true"
                      />
                    </span>
                    {wi < lineWords.length - 1 ? " " : ""}
                  </span>
                );
              }

              return (
                <span
                  key={wi}
                  className="inline-block"
                  style={{
                    opacity,
                    transform: `translateY(${yDrift}px)`,
                    transition: "opacity 80ms linear, transform 120ms ease-out",
                    willChange: "opacity, transform",
                  }}
                >
                  {w.word}
                  {wi < lineWords.length - 1 ? "\u00A0" : ""}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

/* ── Main section ── */
export function TeachingExhale() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="teaching-exhale"
      ref={ref}
      className="relative py-[120px] md:py-[160px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(40 30% 95%)" }}
      role="region"
      aria-label="Recognition"
    >
      {/* ── Layer 1: Warm ambient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.025), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Secondary depth fog ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, hsl(40 30% 88% / 0.25), transparent 50%), radial-gradient(ellipse at 70% 30%, hsl(40 25% 90% / 0.2), transparent 45%)",
          animation: isVisible
            ? "exhale-fog-drift 18s ease-in-out infinite alternate"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Grain ── */}
      <div
        className="absolute inset-0 grain opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Layer 4: Breathing vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(40 25% 88% / 0.5) 100%)",
          animation: isVisible
            ? "exhale-vignette-breathe 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[1800ms]",
            isVisible
              ? "opacity-45 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(30 10% 45%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          The exhale
        </p>

        {/* Golden dot anchor — heartbeat */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-5 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{
            background: "hsl(var(--vow-yellow))",
            boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
            animation: isVisible
              ? "exhale-dot-pulse 4s ease-in-out infinite"
              : undefined,
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "100ms",
          }}
          aria-hidden="true"
        />

        {/* Vertical golden thread — dot to content */}
        <div
          className={cn(
            "w-px h-[48px] mx-auto mb-fitz-8 origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.04))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
          }}
          aria-hidden="true"
        />

        {/* Scroll-linked word-by-word reveals with Y-drift */}
        <ScrollRevealBlock isInView={isVisible} />

        {/* Closing horizontal golden thread */}
        <div
          className={cn(
            "mx-auto h-px max-w-[120px] mt-fitz-8 transition-transform duration-[700ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "600ms",
          }}
          aria-hidden="true"
        />

        {/* Pencil annotation */}
        <span
          className={cn(
            "block font-display italic text-[13px] mt-fitz-5 transition-all duration-[700ms]",
            isVisible ? "opacity-30" : "opacity-0"
          )}
          style={{
            color: "hsl(30 12% 50%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "800ms",
          }}
          aria-label="Closing annotation"
        >
          — you have always known the sound
        </span>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes exhale-dot-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); box-shadow: 0 0 0 0 hsl(var(--vow-yellow) / 0.3); }
          50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 12px 4px hsl(var(--vow-yellow) / 0.15); }
        }
        @keyframes exhale-vignette-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        @keyframes exhale-fog-drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(1.5%, -0.5%) scale(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-exhale * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
