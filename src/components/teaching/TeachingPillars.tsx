import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Patient Mentorship",
    description:
      "Your pace is the curriculum. There are no grades, no exams, no timelines imposed on your growth.",
    underlineWord: "pace",
  },
  {
    title: "Emotional Fluency",
    description:
      "The piano is not a skill to acquire. It is a voice to discover. I teach you to speak through the instrument.",
    underlineWord: "voice",
  },
  {
    title: "Piano as Philosophy",
    description:
      "Like chess players see the board as a metaphor for consequence, pianists see the keys as a framework for patience, discipline, and beauty. When you own the technique, you are free to say anything.",
    underlineWord: "free",
  },
  {
    title: "Lifelong Relationship",
    description:
      "There is no graduation. Only growing. The mentorship evolves as you deepen your conversation with the keys.",
    underlineWord: "growing",
  },
];

function highlightWord(text: string, word: string, isVisible: boolean, delayBase: number) {
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
            "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: `${delayBase + 400}ms`,
          }}
          aria-hidden="true"
        />
      </span>
      {after}
    </>
  );
}

export function TeachingPillars() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="teaching-pillars"
      ref={ref}
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(40 30% 95%)" }}
      role="region"
      aria-label="Four Pillars"
    >
      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(40 25% 88% / 0.5) 100%)",
          animation: isVisible
            ? "pillars-vignette-breathe 6s ease-in-out infinite"
            : undefined,
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
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] text-center mb-fitz-5 transition-all duration-[700ms]",
            isVisible
              ? "opacity-45 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(30 10% 45%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "100ms",
          }}
        >
          What I believe
        </p>

        {/* Golden dot — top anchor */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-5 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
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

        {pillars.map((p, i) => (
          <div key={p.title}>
            <div
              className={cn(
                "relative text-center py-fitz-7 transition-all duration-[700ms]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[12px]"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${300 + i * 200}ms`,
              }}
            >
              <h2
                className="font-display text-[28px] md:text-[36px] font-light tracking-tight mb-fitz-3"
                style={{
                  color: "hsl(30 10% 20%)",
                  textShadow: "0 1px 2px hsl(40 20% 80% / 0.25)",
                }}
              >
                {p.title}
              </h2>
              <p
                className="font-sans text-[16px] leading-[1.7] max-w-[480px] mx-auto"
                style={{ color: "hsl(30 10% 40%)" }}
              >
                {highlightWord(p.description, p.underlineWord, isVisible, 300 + i * 200)}
              </p>
            </div>

            {/* Horizontal thread separator between pillars */}
            {i < pillars.length - 1 && (
              <div
                className={cn(
                  "mx-auto h-px max-w-[80px] transition-transform duration-[600ms] origin-center",
                  isVisible ? "scale-x-100" : "scale-x-0"
                )}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)",
                  transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                  transitionDelay: `${500 + i * 200}ms`,
                }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}

        {/* Closing horizontal golden thread */}
        <div
          className={cn(
            "mx-auto h-px max-w-[120px] mt-fitz-8 transition-transform duration-[700ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "1200ms",
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
            transitionDelay: "1400ms",
          }}
          aria-label="Closing annotation"
        >
          — four promises, one bench
        </span>
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
