import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const fears = [
  {
    fear: "What if I start and quit again?",
    resolution:
      "You didn't quit last time. You had a teacher who measured your progress by their timeline instead of yours. The guilt you carry about stopping is not yours. It belongs to the system that made you feel like stopping was failure. There is no timeline here. There is your pace, your sound, and my patience. The only way to quit is to stop wanting — and you are here because you haven't.",
    underlineWord: "pace",
  },
  {
    fear: "What if I can never play anything real?",
    resolution:
      'The first real thing you play will not be a concerto. It will be a chord that makes you stop and say — "that is exactly what I meant." And that is the beginning.',
    underlineWord: "beginning",
  },
  {
    fear: "What if it feels like school?",
    resolution:
      "There is no curriculum. There is no homework. There are no grades. There is a bench, an instrument, and a question: what do you want to say? That is as far from school as sound is from silence.",
    underlineWord: "question",
  },
  {
    fear: "What if I'm too old to start?",
    resolution:
      "There is no age at which the piano stops being willing to listen. I have sat beside students who touched the keys for the first time at 50, at 60, at 70. The instrument does not care when you arrive. Neither do I. I sit beside adults every week who believed they were too late. They are not too late. They are exactly on time — because they are here now.",
    underlineWord: "no",
  },
];

function highlightWord(text: string, word: string, isVisible: boolean) {
  const idx = text.toLowerCase().indexOf(word.toLowerCase());
  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + word.length);
  const after = text.slice(idx + word.length);

  return (
    <>
      {before}
      <span className="relative inline-block">
        {match}
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 w-full h-[2px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "600ms",
          }}
          aria-hidden="true"
        />
      </span>
      {after}
    </>
  );
}

export function TeachingThreshold() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="teaching-threshold"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(30 8% 14%)" }}
      role="region"
      aria-label="The Threshold"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 grain opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[640px] mx-auto">
        {fears.map((pair, i) => (
          <div key={i} className="mb-fitz-10 last:mb-0">
            {/* Fear */}
            <p
              className={cn(
                "font-display italic text-[22px] md:text-[28px] tracking-tight text-center transition-all duration-[600ms]",
                isVisible
                  ? "opacity-70 translate-y-0"
                  : "opacity-0 translate-y-3"
              )}
              style={{
                color: "hsl(40 20% 70%)",
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${i * 200}ms`,
              }}
            >
              "{pair.fear}"
            </p>

            {/* Sacred pause */}
            <div className="h-fitz-7 md:h-[60px]" aria-hidden="true" />

            {/* Resolution */}
            <p
              className={cn(
                "font-sans text-[16px] md:text-[18px] leading-[1.7] text-center transition-all duration-[600ms]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              )}
              style={{
                color: "hsl(40 25% 85%)",
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${i * 200 + 300}ms`,
              }}
            >
              {highlightWord(pair.resolution, pair.underlineWord, isVisible)}
            </p>
          </div>
        ))}

        {/* Semicolon threshold marker */}
        <div className="flex justify-center mt-fitz-10">
          <span
            className={cn(
              "font-display text-[48px] text-[hsl(var(--vow-yellow))] transition-all duration-[600ms]",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: "1000ms",
              animation: isVisible
                ? "semicolon-breathe 3s ease-in-out infinite"
                : undefined,
            }}
            aria-hidden="true"
          >
            ;
          </span>
        </div>
      </div>
    </section>
  );
}
