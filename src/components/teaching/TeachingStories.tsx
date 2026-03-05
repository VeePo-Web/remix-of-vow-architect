import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const stories = [
  {
    narrative:
      "She came to the bench at 52, apologizing before she even sat down. 'I should have started decades ago,' she said. Six months later, she played a piece for her husband on their anniversary — not perfectly, but honestly. She called it the first gift she ever made with her own hands.",
    quote: '"The first gift I ever made with my own hands."',
  },
  {
    narrative:
      "He had taken lessons as a child and quit at 14. Twenty years of silence. When he sat down again, his hands remembered more than he expected — and less than he hoped. But the sound was different now. It carried something it didn't carry at 14: the weight of everything he'd lived since.",
    quote: '"The sound carried everything I had lived since."',
  },
  {
    narrative:
      "She wanted to play one song at her own wedding. Not a performance — a conversation with the person she was about to marry. We spent four months on three minutes of music. On the day, her hands shook. But the music didn't.",
    quote: '"My hands shook. But the music didn\'t."',
  },
];

export function TeachingStories() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="teaching-stories"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="Student Stories"
    >
      <div className="max-w-[640px] mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[36px] font-light tracking-tight text-center mb-fitz-10 transition-all duration-[600ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          )}
          style={{
            color: "hsl(30 15% 22%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
          }}
        >
          Those who sat down
        </h2>

        {stories.map((s, i) => (
          <div key={i} className="mb-fitz-10 last:mb-0">
            {/* Narrative */}
            <p
              className={cn(
                "font-sans text-[16px] leading-[1.7] text-center mb-fitz-5 transition-all duration-[600ms]",
                isVisible
                  ? "opacity-90 translate-y-0"
                  : "opacity-0 translate-y-3"
              )}
              style={{
                color: "hsl(30 12% 30%)",
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${i * 200 + 200}ms`,
              }}
            >
              {s.narrative}
            </p>

            {/* Pull quote */}
            <p
              className={cn(
                "font-display italic text-[20px] md:text-[24px] tracking-tight text-center transition-all duration-[600ms]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              )}
              style={{
                color: "hsl(30 20% 18%)",
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${i * 200 + 400}ms`,
              }}
            >
              {s.quote}
            </p>

            {/* Golden thread separator */}
            {i < stories.length - 1 && (
              <div className="flex justify-center my-fitz-9">
                <span
                  className="block w-1.5 h-1.5 rounded-full bg-[hsl(var(--vow-yellow))]"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        ))}

        {/* Golden thread */}
        <div
          className={cn(
            "mx-auto h-px max-w-[200px] mt-fitz-9 transition-transform duration-[450ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background: "hsl(var(--vow-yellow) / 0.2)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "800ms",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
