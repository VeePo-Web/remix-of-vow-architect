import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import teachingKeysImg from "@/assets/teaching-keys.jpg";

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
        {/* Roman numeral */}
        <span
          className={cn(
            "block font-display text-[13px] tracking-[0.3em] uppercase mb-fitz-3 transition-all duration-[900ms]",
            isVisible
              ? "opacity-60 translate-y-0"
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
            "font-display text-[28px] md:text-[36px] font-light tracking-tight text-foreground mb-fitz-4 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[12px]"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "120ms",
          }}
        >
          {pillar.title}
        </h2>

        {/* Description — scroll-linked word reveals */}
        <p
          className="font-sans text-[16px] leading-[1.7] text-muted-foreground max-w-[480px] mx-auto"
        >
          <ScrollDescription
            text={pillar.description}
            underlineWord={pillar.underlineWord}
            isInView={isVisible}
          />
        </p>
      </div>

      {/* Simple thin line separator */}
      {!isLast && (
        <div
          className={cn(
            "h-px max-w-[60px] mx-auto transition-transform duration-[600ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background: "hsl(var(--border))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function TeachingPillars() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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

  return (
    <section
      id="teaching-pillars"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="How I Teach"
    >
      <div className="relative z-10 max-w-[600px] mx-auto">
        {/* Section header */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground text-center mb-[80px] md:mb-[100px] transition-all duration-[700ms]",
              headerVisible
                ? "opacity-45 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "100ms",
            }}
          >
            How I teach
          </p>
        </div>

        {/* Pillar cards */}
        {pillars.map((p, i) => (
          <React.Fragment key={p.title}>
            <PillarCard
              pillar={p}
              index={i}
              isLast={i === pillars.length - 1}
            />
            {/* Editorial interstitial image between pillars II and III */}
            {i === 1 && (
              <div className="my-[60px] md:my-[80px] w-[calc(100%+4rem)] md:w-[calc(100%+12rem)] -ml-8 md:-ml-24">
                <GoldCornerImage
                  src={teachingKeysImg}
                  alt="Piano keys in warm light"
                  aspectRatio="16/9"
                  maxHeight="400px"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <style>{`
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
