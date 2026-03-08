import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import benchImg from "@/assets/teaching-bench.jpg";

const fears = [
  {
    fear: "What if I start and quit again?",
    resolution:
      "You did not quit. You were taught by someone who measured your progress by their timeline instead of yours. The guilt you carry about stopping was never yours — it belongs to the method that mistook speed for progress. There is no timeline here. There is only your pace, your sound, and my patience.",
    underlineWord: "pace",
  },
  {
    fear: "What if I can never play anything real?",
    resolution:
      'The first real thing you play will not be a concerto. It will be a chord that makes you stop and think — "that is exactly what I meant." That single honest chord is the beginning of everything.',
    underlineWord: "beginning",
  },
  {
    fear: "What if it feels like lessons?",
    resolution:
      "There is no curriculum. No homework. No grades. There is a bench, an instrument, and a question: what do you want to say? That is as far from lessons as silence is from sound.",
    underlineWord: "question",
  },
  {
    fear: "What if I'm too old to start?",
    resolution:
      "There is no age at which the piano stops being willing to listen. I have sat beside people who touched the keys for the first time at 50, at 60, at 70. The instrument does not care when you arrive. Neither do I. You are not too late. You are here.",
    underlineWord: "no",
  },
];

/**
 * Word-by-word scroll-linked reveal with Y-drift and ease-in-out progress.
 */
function ScrollResolution({
  text,
  underlineWord,
  isInView,
}: {
  text: string;
  underlineWord: string;
  isInView: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - (rect.top - vh * 0.25) / (vh * 0.45);
    const clamped = Math.max(0, Math.min(1, raw));
    // Ease-in-out for breathing rhythm
    const eased =
      clamped < 0.5
        ? 2 * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
    setProgress(eased);
    rafRef.current = requestAnimationFrame(updateProgress);
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
    rafRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, updateProgress]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className="inline">
      {words.map((word, i) => {
        const wordThreshold = i / words.length;
        const wordOpacity = isInView
          ? Math.max(0.08, Math.min(1, (progress - wordThreshold * 0.7) / 0.3))
          : 0.08;
        const yDrift = isInView
          ? Math.max(0, 3 * (1 - (progress - wordThreshold * 0.7) / 0.3))
          : 3;

        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        const isUnderline = cleanWord === underlineWord.toLowerCase();

        return (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: wordOpacity,
              transform: `translateY(${yDrift}px)`,
              transition: "opacity 80ms linear, transform 120ms ease-out",
              willChange: "opacity, transform",
            }}
          >
            {isUnderline ? (
              <span className="relative inline-block">
                {word}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 w-full h-[2px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                    progress > 0.88 ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                    boxShadow:
                      progress > 0.88
                        ? "0 0 8px 2px hsl(var(--vow-yellow) / 0.25)"
                        : "none",
                  }}
                  aria-hidden="true"
                />
              </span>
            ) : (
              word
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Each fear/resolution pair — independently observed.
 */
function FearPair({
  pair,
  index,
  isLast,
}: {
  pair: (typeof fears)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-[160px] md:mb-[200px] last:mb-0">
      {/* Fear question — italic, spectral */}
      <p
        className={cn(
          "font-display italic text-[22px] md:text-[28px] tracking-tight text-center transition-all duration-[900ms]",
          isVisible
            ? "opacity-70 translate-y-0"
            : "opacity-0 translate-y-[16px]"
        )}
        style={{
          color: "hsl(40 20% 70%)",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          textShadow:
            "0 1px 3px hsl(0 0% 0% / 0.2), 0 3px 12px hsl(0 0% 0% / 0.08)",
        }}
      >
        "{pair.fear}"
      </p>

      {/* Sacred pause — golden thread */}
      <div className="flex flex-col items-center py-[40px] md:py-[56px]">
        <div
          className={cn(
            "w-px h-[32px] origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.06), hsl(var(--vow-yellow) / 0.18), hsl(var(--vow-yellow) / 0.06))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Resolution — word-by-word scroll reveal with Y-drift */}
      <p
        className="font-sans text-[16px] md:text-[18px] leading-[1.75] text-center max-w-[580px] mx-auto"
        style={{
          color: "hsl(40 25% 85%)",
          textShadow: "0 1px 3px hsl(0 0% 0% / 0.12)",
        }}
      >
        <ScrollResolution
          text={pair.resolution}
          underlineWord={pair.underlineWord}
          isInView={isVisible}
        />
      </p>

      {/* Golden dot separator */}
      {!isLast && (
        <div className="flex justify-center mt-[80px] md:mt-[100px]">
          <span
            className={cn(
              "block w-1.5 h-1.5 rounded-full transition-all duration-[900ms]",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
            style={{
              background: "hsl(var(--vow-yellow))",
              boxShadow: "0 0 6px 2px hsl(var(--vow-yellow) / 0.12)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "800ms",
              animation: isVisible
                ? "threshold-dot-breathe 4s ease-in-out infinite"
                : undefined,
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export function TeachingThreshold() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const closingRef = useRef<HTMLDivElement>(null);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!closingRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setClosingVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(closingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="teaching-threshold"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(30 8% 14%)" }}
      role="region"
      aria-label="The Threshold"
    >
      {/* ── Layer 1: Background bench — ghost presence ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${benchImg})`,
          opacity: 0.05,
          animation: "threshold-ken-burns 30s linear infinite alternate",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2a: Grain ── */}
      <div
        className="absolute inset-0 grain opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Layer 2b: Dual-origin fog ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 80%, hsl(30 12% 18% / 0.35), transparent 55%), radial-gradient(ellipse at 75% 20%, hsl(30 8% 16% / 0.3), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2c: Secondary depth fog — drifts ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 70%, hsl(30 10% 15% / 0.25), transparent 45%), radial-gradient(ellipse at 40% 25%, hsl(30 8% 17% / 0.2), transparent 40%)",
          animation: "threshold-fog-drift 20s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Warm golden presence — barely perceptible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.012), transparent 40%)",
          animation: "threshold-bloom 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4: Breathing vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, hsl(30 8% 6% / 0.65) 100%)",
          animation: "threshold-vignette 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[640px] mx-auto">
        {/* Section header */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-center mb-fitz-5 transition-all duration-[1800ms]",
              headerVisible
                ? "opacity-40 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              color: "hsl(40 15% 55%)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            }}
          >
            What you carry to the bench
          </p>

          <div
            className={cn(
              "w-px h-[48px] mx-auto mb-fitz-9 origin-top transition-transform duration-[700ms]",
              headerVisible ? "scale-y-100" : "scale-y-0"
            )}
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.04))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "200ms",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Fear/Resolution pairs */}
        {fears.map((pair, i) => (
          <FearPair
            key={i}
            pair={pair}
            index={i}
            isLast={i === fears.length - 1}
          />
        ))}

        {/* Closing */}
        <div ref={closingRef}>
          <div className="flex justify-center mt-[80px]">
            <span
              className={cn(
                "font-display text-[56px] transition-all duration-[900ms]",
                closingVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              )}
              style={{
                color: "hsl(var(--vow-yellow))",
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: "200ms",
                animation: closingVisible
                  ? "semicolon-breathe 3s ease-in-out infinite"
                  : undefined,
                textShadow:
                  "0 0 24px hsl(var(--vow-yellow) / 0.3), 0 0 48px hsl(var(--vow-yellow) / 0.1)",
              }}
              aria-hidden="true"
            >
              ;
            </span>
          </div>

          <span
            className={cn(
              "block font-display italic text-[13px] text-center mt-fitz-5 transition-all duration-[700ms]",
              closingVisible ? "opacity-30" : "opacity-0"
            )}
            style={{
              color: "hsl(40 15% 55%)",
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: "500ms",
            }}
            aria-label="Closing annotation"
          >
            — you arrived exactly now
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes threshold-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.04) translate(-0.3%, 0.2%); }
        }
        @keyframes threshold-vignette {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 0.82; }
        }
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
        }
        @keyframes threshold-dot-breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes threshold-fog-drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-1%, 0.5%) scale(1.02); }
        }
        @keyframes threshold-bloom {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-threshold * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
