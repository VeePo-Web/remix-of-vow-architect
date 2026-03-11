import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";

const fears = [
  {
    fear: "What if I start and quit again?",
    resolution:
      "Most of my students tried lessons before and stopped. That is not failure — it usually means the approach was wrong. Here, there is no timeline and no pressure. We go at your pace.",
    underlineWord: "pace",
  },
  {
    fear: "What if I never play anything real?",
    resolution:
      "You will play real music from the start — not just exercises. It might be simple at first, but it will be something you chose and something you enjoy.",
    underlineWord: "chose",
  },
  {
    fear: "What if it feels like lessons?",
    resolution:
      "There is no homework, no grading, no recitals unless you want them. It feels more like a weekly conversation that happens to involve a piano.",
    underlineWord: "conversation",
  },
  {
    fear: "What if I'm too old to start?",
    resolution:
      "Most of my students are adults. I have taught people who started at 30, 50, and 70. The piano does not care when you begin — and neither do I.",
    underlineWord: "begin",
  },
];

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
            className="inline-block mr-[0.25em]"
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
                    "absolute -bottom-0.5 left-0 w-full h-[2px] bg-primary origin-left transition-transform duration-[450ms]",
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
          </span>
        );
      })}
    </span>
  );
}

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
      {/* Fear question */}
      <p
        className={cn(
          "font-display italic text-[22px] md:text-[28px] tracking-tight text-center transition-all duration-[900ms]",
          isVisible
            ? "opacity-70 translate-y-0"
            : "opacity-0 translate-y-[16px]"
        )}
        style={{
          color: "hsl(var(--vow-yellow) / 0.7)",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          textShadow:
            "0 1px 3px hsl(var(--rich-black) / 0.2), 0 3px 12px hsl(var(--rich-black) / 0.08)",
        }}
      >
        "{pair.fear}"
      </p>

      {/* Pause — thin line instead of golden thread */}
      <div className="flex flex-col items-center py-[40px] md:py-[56px]">
        <div
          className={cn(
            "w-px h-[32px] origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background: "hsl(var(--teaching-studio-label) / 0.15)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Resolution — word-by-word scroll reveal */}
      <p
        className="font-sans text-[16px] md:text-[18px] leading-[1.75] text-center max-w-[580px] mx-auto"
        style={{
          color: "hsl(var(--teaching-studio-heading))",
          textShadow: "0 1px 3px hsl(var(--rich-black) / 0.12)",
        }}
      >
        <ScrollResolution
          text={pair.resolution}
          underlineWord={pair.underlineWord}
          isInView={isVisible}
        />
      </p>

      {/* Thin line separator */}
      {!isLast && (
        <div className="flex justify-center mt-[80px] md:mt-[100px]">
          <div
            className={cn(
              "w-8 h-px transition-all duration-[700ms]",
              isVisible ? "opacity-20" : "opacity-0"
            )}
            style={{
              background: "hsl(var(--teaching-studio-label))",
              transitionDelay: "600ms",
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

  return (
    <section
      id="teaching-threshold"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--teaching-studio-bg))" }}
      data-theme="death"
      role="region"
      aria-label="The Threshold"
    >
      {/* Background — ghost presence */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${handsKeysImg})`,
          opacity: 0.05,
          animation: "threshold-ken-burns 30s linear infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Grain */}
      <div
        className="absolute inset-0 grain opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      {/* Single fog layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 80%, hsl(var(--teaching-studio-fog) / 0.35), transparent 55%), radial-gradient(ellipse at 75% 20%, hsl(var(--teaching-studio-fog-alt) / 0.3), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[640px] mx-auto">
        {/* Section header */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-center mb-fitz-9 transition-all duration-[1800ms]",
              headerVisible
                ? "opacity-40 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              color: "hsl(var(--teaching-studio-label))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            }}
          >
            Common concerns
          </p>
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
      </div>

      <style>{`
        @keyframes threshold-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.04) translate(-0.3%, 0.2%); }
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
