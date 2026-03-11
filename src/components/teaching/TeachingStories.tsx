import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";
import studentLearningImg from "@/assets/student-learning-moment.jpg";
import teachingStudioImg from "@/assets/teaching-studio-warm.jpg";

const storyImages = [handsKeysImg, studentLearningImg, teachingStudioImg];

const stories = [
  {
    narrative:
      "Margaret started at 52. She had never played before and apologised constantly in the first few weeks. Six months in, she played a piece for her husband on their anniversary. It was not perfect — but it was hers.",
    quote: "The first gift I ever made with my own hands.",
    quoteUnderline: "hands",
  },
  {
    narrative:
      "David quit piano at 14 and did not touch a key for twenty years. When he came back, his hands remembered more than he expected — and the music carried something it never could have at 14.",
    quote: "The sound carried everything I had lived through.",
    quoteUnderline: "everything",
  },
  {
    narrative:
      "Sarah wanted to play one song at her wedding. We spent four months preparing three minutes of music. On the day, her hands shook — but the music held.",
    quote: "My hands shook. But the music did not.",
    quoteUnderline: "music",
  },
];

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
    return () => cancelAnimationFrame(updateProgress);
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
            className="inline-block mr-[0.25em] transition-opacity duration-[60ms]"
            style={{ opacity: wordOpacity }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

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

  const quoteWords = story.quote.split(" ");

  return (
    <div ref={ref} className="mb-[120px] md:mb-[160px] last:mb-0">
      {/* Editorial image — alternating alignment */}
      <div
        className={cn(
          "mb-fitz-7 w-[70%] md:w-[55%]",
          index % 2 === 0 ? "mr-auto" : "ml-auto"
        )}
      >
        <GoldCornerImage
          src={storyImages[index % storyImages.length]}
          alt=""
          aspectRatio="4/3"
          maxHeight="280px"
        />
      </div>

      {/* Narrative — scroll-linked word-by-word */}
      <p
        className="font-sans text-[16px] leading-[1.75] text-muted-foreground text-center mb-fitz-7"
      >
        <ScrollNarrative text={story.narrative} isInView={isVisible} />
      </p>

      {/* Pull quote */}
      <p
        ref={quoteRef}
        className="font-display italic text-[20px] md:text-[24px] tracking-tight text-foreground text-center"
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
              className="inline-block mr-[0.25em] transition-opacity duration-[60ms]"
              style={{ opacity: wordOpacity }}
            >
              {isUnderline ? (
                <span className="relative inline-block">
                  {word}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-primary origin-left transition-transform duration-[450ms]",
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
            </span>
          );
        })}
        "
      </p>

      {/* Simple spacer between stories — no golden dot */}
      {!isLast && (
        <div className="flex justify-center mt-[80px] md:mt-[100px]">
          <div
            className={cn(
              "h-px w-[40px] transition-transform duration-[600ms] origin-center",
              isVisible ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background: "hsl(var(--border))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "400ms",
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

  useEffect(() => {
    if (!headerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.5 }
    );
    obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="teaching-stories"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="Student Stories"
    >
      <div className="relative z-10 max-w-[640px] mx-auto">
        {/* Section header */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground text-center mb-[80px] md:mb-[100px] transition-all duration-[1800ms]",
              headerVisible
                ? "opacity-50 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            }}
          >
            Student stories
          </p>
        </div>

        {/* Story cards */}
        {stories.map((s, i) => (
          <StoryCard
            key={i}
            story={s}
            index={i}
            isLast={i === stories.length - 1}
          />
        ))}
      </div>

      <style>{`
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
