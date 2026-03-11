import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    numeral: "I",
    title: "Your Pace, Always",
    description:
      "There are no deadlines, no exams, no fixed curriculum. We move at whatever speed feels right for you — whether that is one new piece a month or spending three sessions on a single passage.",
    underlineWord: "pace",
  },
  {
    numeral: "II",
    title: "Expression Over Perfection",
    description:
      "I care more about how the music makes you feel than whether every note is correct. Technique matters, but it serves the music — not the other way around.",
    underlineWord: "feel",
  },
  {
    numeral: "III",
    title: "Real Songs, Not Just Exercises",
    description:
      "You will play music you actually want to play. We work on pieces you choose — hymns, film scores, pop songs, classical — alongside the fundamentals that make them possible.",
    underlineWord: "choose",
  },
  {
    numeral: "IV",
    title: "No End Date",
    description:
      "This is not a 12-week course. Some students have been with me for years. Others come for a season. The mentorship lasts as long as it is useful to you.",
    underlineWord: "useful",
  },
];

/**
 * Scroll-linked word-by-word opacity for pillar descriptions.
 */
function ScrollDescription({
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
    const raw = 1 - (rect.top - vh * 0.3) / (vh * 0.4);
    setProgress(Math.max(0, Math.min(1, raw)));
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
          ? Math.max(0.1, Math.min(1, (progress - wordThreshold * 0.7) / 0.3))
          : 0.1;

        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        const isUnderline = cleanWord === underlineWord.toLowerCase();

        return (
          <span
            key={i}
            className="inline-block mr-[0.25em] transition-opacity duration-[60ms]"
            style={{ opacity: wordOpacity }}
          >
            {isUnderline ? (
              <span className="relative inline-block">
                {word}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                    progress > 0.85 ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
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

/**
 * Each pillar gets its own IntersectionObserver for independent scroll triggering.
 */
function PillarCard({
  pillar,
  index,
  isLast,
}: {
  pillar: (typeof pillars)[0];
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
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="relative text-center py-[48px] md:py-[64px]">
        {/* Roman numeral — whispered above title */}
        <span
          className={cn(
            "block font-display text-[13px] tracking-[0.3em] uppercase mb-fitz-3 transition-all duration-[900ms]",
            isVisible
              ? "opacity-25 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(var(--vow-yellow))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
          aria-hidden="true"
        >
          {pillar.numeral}
        </span>

        {/* Pillar title */}
        <h2
          className={cn(
            "font-display text-[28px] md:text-[36px] font-light tracking-tight mb-fitz-4 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[12px]"
          )}
          style={{
            color: "hsl(var(--teaching-text-heading))",
            textShadow: "0 1px 2px hsl(var(--teaching-vignette) / 0.25)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "120ms",
          }}
        >
          {pillar.title}
        </h2>

        {/* Description — scroll-linked word reveals */}
        <p
          className="font-sans text-[16px] leading-[1.7] max-w-[480px] mx-auto"
          style={{ color: "hsl(var(--teaching-text-body))" }}
        >
          <ScrollDescription
            text={pillar.description}
            underlineWord={pillar.underlineWord}
            isInView={isVisible}
          />
        </p>
      </div>

      {/* Horizontal thread separator — grows from center */}
      {!isLast && (
        <div className="flex items-center justify-center gap-3">
          <div
            className={cn(
              "h-px flex-1 max-w-[40px] origin-right transition-transform duration-[600ms]",
              isVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "500ms",
            }}
            aria-hidden="true"
          />
          <span
            className={cn(
              "block w-[5px] h-[5px] rounded-full transition-all duration-[700ms]",
              isVisible ? "opacity-60 scale-100" : "opacity-0 scale-0"
            )}
            style={{
              background: "hsl(var(--vow-yellow))",
              boxShadow: "0 0 4px 1px hsl(var(--vow-yellow) / 0.1)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "400ms",
            }}
            aria-hidden="true"
          />
          <div
            className={cn(
              "h-px flex-1 max-w-[40px] origin-left transition-transform duration-[600ms]",
              isVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.2), transparent)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "500ms",
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export function TeachingPillars() {
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
      { threshold: 0.5 }
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
      { threshold: 0.5 }
    );
    observer.observe(closingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="teaching-pillars"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--teaching-bg))" }}
      role="region"
      aria-label="How I Teach"
    >
      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(var(--teaching-vignette) / 0.5) 100%)",
          animation: "pillars-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.02), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[600px] mx-auto">
        {/* Section header — independently observed */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-center mb-fitz-5 transition-all duration-[700ms]",
              headerVisible
                ? "opacity-45 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              color: "hsl(var(--teaching-text-label))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "100ms",
            }}
          >
            What I hold to be true
          </p>

          {/* Golden dot — top anchor */}
          <span
            className={cn(
              "block w-2 h-2 rounded-full mx-auto mb-fitz-5 transition-all duration-[900ms]",
              headerVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )}
            style={{
              background: "hsl(var(--vow-yellow))",
              boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "150ms",
            }}
            aria-hidden="true"
          />

          {/* Vertical golden thread — top to first pillar */}
          <div
            className={cn(
              "w-px h-[48px] mx-auto mb-fitz-7 origin-top transition-transform duration-[700ms]",
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

        {/* Pillar cards — each independently triggered */}
        {pillars.map((p, i) => (
          <PillarCard
            key={p.title}
            pillar={p}
            index={i}
            isLast={i === pillars.length - 1}
          />
        ))}

        {/* Closing — independently observed */}
        <div ref={closingRef}>
          <div
            className={cn(
              "mx-auto h-px max-w-[120px] mt-fitz-8 transition-transform duration-[700ms] origin-center",
              closingVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "200ms",
            }}
            aria-hidden="true"
          />

          <span
            className={cn(
              "block font-display italic text-[13px] text-center mt-fitz-5 transition-all duration-[700ms]",
              closingVisible ? "opacity-30" : "opacity-0"
            )}
            style={{
              color: "hsl(var(--teaching-text-cite))",
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: "400ms",
            }}
            aria-label="Closing annotation"
          >
            — four convictions, one bench
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pillars-vignette-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-pillars * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
