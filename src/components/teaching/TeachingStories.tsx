import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const stories = [
  {
    narrative:
      "Margaret came to the bench at 52, apologising before her hands even touched the keys. 'I should have started decades ago,' she said. Six months later, she played a piece for her husband on their anniversary — not perfectly, but honestly. She called it something I have never forgotten.",
    quote: "The first gift I ever made with my own hands.",
    quoteUnderline: "hands",
  },
  {
    narrative:
      "David had taken lessons as a child and quit at 14. Twenty years of silence. When he returned to the bench, his hands remembered more than he expected — and less than he hoped. But the sound was different now. It bore something it could not have borne at 14: the weight of everything he had lived through.",
    quote: "The sound carried everything I had lived through.",
    quoteUnderline: "everything",
  },
  {
    narrative:
      "Sarah wanted to play one song at her own wedding. Not a performance — a promise to the person she was about to marry. We spent four months on three minutes of music. On the day, her hands shook. But the music did not.",
    quote: "My hands shook. But the music did not.",
    quoteUnderline: "music",
  },
];

/**
 * Scroll-linked word-by-word reveal for story narrative text.
 */
function ScrollNarrative({
  text,
  isInView,
}: {
  text: string;
  isInView: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - (rect.top - vh * 0.28) / (vh * 0.42);
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
        const threshold = i / words.length;
        const wordOpacity = isInView
          ? Math.max(0.08, Math.min(1, (progress - threshold * 0.7) / 0.3))
          : 0.08;

        return (
          <span
            key={i}
            className="inline-block transition-opacity duration-[60ms]"
            style={{ opacity: wordOpacity }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Each story card has its own IntersectionObserver.
 * The narrative uses scroll-linked word reveals.
 * The pull quote fades in after narrative reaches ~70% progress,
 * with an underline on the key word.
 */
function StoryCard({
  story,
  index,
  isLast,
}: {
  story: (typeof stories)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [quoteProgress, setQuoteProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Scroll-linked progress for the pull quote
  const updateQuoteProgress = useCallback(() => {
    if (!quoteRef.current) return;
    const rect = quoteRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - (rect.top - vh * 0.35) / (vh * 0.3);
    setQuoteProgress(Math.max(0, Math.min(1, raw)));
    rafRef.current = requestAnimationFrame(updateQuoteProgress);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setQuoteProgress(1);
      return;
    }
    rafRef.current = requestAnimationFrame(updateQuoteProgress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, updateQuoteProgress]);

  // Split quote into words for individual reveal
  const quoteWords = story.quote.split(" ");

  return (
    <div ref={ref} className="mb-[120px] md:mb-[160px] last:mb-0">
      {/* Narrative — scroll-linked word-by-word */}
      <p
        className="font-sans text-[16px] leading-[1.75] text-center mb-fitz-7"
        style={{ color: "hsl(var(--teaching-text-narrative))" }}
      >
        <ScrollNarrative text={story.narrative} isInView={isVisible} />
      </p>

      {/* Sacred pause — thin golden thread between narrative and quote */}
      <div className="flex flex-col items-center py-[24px] md:py-[32px]">
        <div
          className={cn(
            "w-px h-[20px] origin-top transition-transform duration-[600ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.04), hsl(var(--vow-yellow) / 0.15), hsl(var(--vow-yellow) / 0.04))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Pull quote — scroll-linked word-by-word with underline on key word */}
      <p
        ref={quoteRef}
        className="font-display italic text-[20px] md:text-[24px] tracking-tight text-center"
        style={{
          color: "hsl(var(--teaching-text-quote))",
          textShadow: "0 1px 2px hsl(var(--teaching-vignette) / 0.3)",
        }}
      >
        "
        {quoteWords.map((word, i) => {
          const threshold = i / quoteWords.length;
          const wordOpacity = isVisible
            ? Math.max(
                0.06,
                Math.min(1, (quoteProgress - threshold * 0.6) / 0.3)
              )
            : 0.06;

          const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
          const isUnderline =
            cleanWord === story.quoteUnderline.toLowerCase();

          return (
            <span
              key={i}
              className="inline-block transition-opacity duration-[60ms]"
              style={{ opacity: wordOpacity }}
            >
              {isUnderline ? (
                <span className="relative inline-block">
                  {word}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                      quoteProgress > 0.88 ? "scale-x-100" : "scale-x-0"
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
              {i < quoteWords.length - 1 ? " " : ""}
            </span>
          );
        })}
        "
      </p>

      {/* Golden dot separator between stories */}
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
              transitionDelay: "600ms",
              animation: isVisible
                ? "stories-dot-breathe 4s ease-in-out infinite"
                : undefined,
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export function TeachingStories() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const closingRef = useRef<HTMLDivElement>(null);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (headerRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
        { threshold: 0.5 }
      );
      obs.observe(headerRef.current);
      observers.push(obs);
    }
    if (closingRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setClosingVisible(true); },
        { threshold: 0.5 }
      );
      obs.observe(closingRef.current);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="teaching-stories"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--teaching-bg-alt))" }}
      role="region"
      aria-label="Those Who Sat Down"
    >
      {/* Warm atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, hsl(var(--vow-yellow) / 0.03), transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(var(--teaching-vignette-alt) / 0.5) 100%)",
          animation: "stories-vignette 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[640px] mx-auto">
        {/* Section header — independently observed */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-center mb-fitz-5 transition-all duration-[1800ms]",
              headerVisible
                ? "opacity-50 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              color: "hsl(var(--teaching-text-label))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            }}
          >
            Those who sat down
          </p>

          {/* Vertical golden thread — label to content */}
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

        {/* Story cards — each independently triggered */}
        {stories.map((s, i) => (
          <StoryCard
            key={i}
            story={s}
            index={i}
            isLast={i === stories.length - 1}
          />
        ))}

        {/* Closing — independently observed */}
        <div ref={closingRef}>
          <div
            className={cn(
              "mx-auto h-px max-w-[200px] mt-[80px] transition-transform duration-[700ms] origin-center",
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
            — every voice began at the bench
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes stories-vignette {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.65; }
        }
        @keyframes stories-dot-breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-stories * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
