import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import teachingStudioImg from "@/assets/teaching-studio-warm.jpg";

interface LineConfig {
  text: string;
  italic: boolean;
  size: string;
  underlineWord?: string;
  shadowWeight: "light" | "medium";
}

const lines: LineConfig[] = [
  {
    text: "Maybe you played as a child and stopped. Maybe you have never touched a key.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    shadowWeight: "medium",
  },
  {
    text: "Either way, something brought you here — and that is enough to begin.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    shadowWeight: "medium",
  },
  {
    text: "I will meet you where you are.",
    italic: false,
    size: "text-[18px] md:text-[24px]",
    shadowWeight: "light",
  },
  {
    text: "Your first lesson starts with a conversation.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    underlineWord: "conversation",
    shadowWeight: "medium",
  },
];

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

function ScrollRevealBlock({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  const update = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - (rect.top - vh * 0.25) / (vh * 0.55);
    const clamped = Math.max(0, Math.min(1, raw));
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
              color: "hsl(var(--foreground))",
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

              const yDrift = isInView
                ? Math.max(0, 3 * (1 - (progress - threshold * 0.75) / 0.25))
                : 3;

              if (w.isUnderline) {
                return (
                  <span
                    key={wi}
                    className="inline-block mr-[0.25em]"
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
                          "absolute -bottom-0.5 left-0 w-full h-[2px] bg-primary origin-left transition-transform duration-[450ms]",
                          progress > 0.9 ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{
                          transitionTimingFunction:
                            "cubic-bezier(.16,1,.3,1)",
                        }}
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                );
              }

              return (
                <span
                  key={wi}
                  className="inline-block mr-[0.25em]"
                  style={{
                    opacity,
                    transform: `translateY(${yDrift}px)`,
                    transition: "opacity 80ms linear, transform 120ms ease-out",
                    willChange: "opacity, transform",
                  }}
                >
                  {w.word}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export function TeachingExhale() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="teaching-exhale"
      ref={ref}
      className="relative py-[120px] md:py-[160px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="The Exhale"
    >
      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-fitz-7 transition-all duration-[1800ms]",
            isVisible
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          Where we start
        </p>

        {/* Scroll-linked word-by-word reveals */}
        <ScrollRevealBlock isInView={isVisible} />
      </div>

      {/* Editorial image bleed */}
      <div
        className={cn(
          "relative z-10 mt-[80px] md:mt-[120px] w-[calc(100%+2rem)] md:w-[calc(100%+8rem)] -ml-4 md:-ml-16 transition-all duration-[900ms]",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)", transitionDelay: "400ms" }}
      >
        <GoldCornerImage
          src={teachingStudioImg}
          alt="Piano in a warm teaching studio with golden hour light"
          aspectRatio="16/9"
          maxHeight="480px"
        />
      </div>

      <style>{`
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
