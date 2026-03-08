import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const stories = [
  {
    narrative:
      "She came to the bench at 52, apologizing before she even sat down. 'I should have started decades ago,' she said. Six months later, she played a piece for her husband on their anniversary — not perfectly, but honestly. She called it the first gift she ever made with her own hands.",
    quote: "The first gift I ever made with my own hands.",
  },
  {
    narrative:
      "He had taken lessons as a child and quit at 14. Twenty years of silence. When he sat down again, his hands remembered more than he expected — and less than he hoped. But the sound was different now. It carried something it didn't carry at 14: the weight of everything he'd lived since.",
    quote: "The sound carried everything I had lived since.",
  },
  {
    narrative:
      "She wanted to play one song at her own wedding. Not a performance — a conversation with the person she was about to marry. We spent four months on three minutes of music. On the day, her hands shook. But the music didn't.",
    quote: "My hands shook. But the music didn't.",
  },
];

/** Individual story card with its own scroll trigger */
function StoryCard({
  story,
  index,
}: {
  story: (typeof stories)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 }) as { ref: React.RefObject<HTMLDivElement>; isVisible: boolean };

  return (
    <div ref={ref} className="mb-[100px] last:mb-0">
      {/* Narrative — roman, measured */}
      <p
        className={cn(
          "font-sans text-[16px] leading-[1.75] text-center mb-fitz-7 transition-all duration-[900ms]",
          isVisible
            ? "opacity-90 translate-y-0"
            : "opacity-0 translate-y-[16px]"
        )}
        style={{
          color: "hsl(30 12% 30%)",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          transitionDelay: "100ms",
        }}
      >
        {story.narrative}
      </p>

      {/* Pull quote — italic, display weight */}
      <p
        className={cn(
          "font-display italic text-[20px] md:text-[24px] tracking-tight text-center transition-all duration-[900ms]",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[10px]"
        )}
        style={{
          color: "hsl(30 20% 18%)",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          transitionDelay: "350ms",
          textShadow: "0 1px 2px hsl(40 20% 80% / 0.3)",
        }}
      >
        "{story.quote}"
      </p>

      {/* Golden dot separator between stories */}
      {index < stories.length - 1 && (
        <div className="flex justify-center my-[80px]">
          <span
            className={cn(
              "block w-1.5 h-1.5 rounded-full transition-all duration-[900ms]",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
            style={{
              background: "hsl(var(--vow-yellow))",
              boxShadow: "0 0 6px 2px hsl(var(--vow-yellow) / 0.12)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "550ms",
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export function TeachingStories() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      id="teaching-stories"
      ref={ref}
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="Student Stories"
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
            "radial-gradient(ellipse at center, transparent 50%, hsl(38 25% 85% / 0.5) 100%)",
          animation: isVisible
            ? "stories-vignette 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[640px] mx-auto">
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] text-center mb-fitz-5 transition-all duration-[1800ms]",
            isVisible
              ? "opacity-50 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(30 10% 45%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          Those who sat down
        </p>

        {/* Vertical golden thread — label to content */}
        <div
          className={cn(
            "w-px h-[48px] mx-auto mb-fitz-9 origin-top transition-transform duration-[700ms]",
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

        {/* Each story has its own scroll trigger */}
        {stories.map((s, i) => (
          <StoryCard key={i} story={s} index={i} />
        ))}

        {/* Closing golden thread */}
        <div
          className={cn(
            "mx-auto h-px max-w-[200px] mt-[80px] transition-transform duration-[700ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
          aria-hidden="true"
        />

        {/* Pencil annotation */}
        <span
          className={cn(
            "block font-display italic text-[13px] text-center mt-fitz-5 transition-all duration-[700ms]",
            isVisible ? "opacity-30" : "opacity-0"
          )}
          style={{
            color: "hsl(30 12% 50%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "600ms",
          }}
          aria-label="Closing annotation"
        >
          — every story begins at the bench
        </span>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes stories-vignette {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.65; }
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
