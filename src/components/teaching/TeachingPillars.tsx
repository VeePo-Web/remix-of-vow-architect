import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Patient Mentorship",
    description:
      "Your pace is the curriculum. There are no grades, no exams, no timelines imposed on your growth.",
  },
  {
    title: "Emotional Fluency",
    description:
      "The piano is not a skill to acquire. It is a voice to discover. I teach you to speak through the instrument.",
  },
  {
    title: "Piano as Philosophy",
    description:
      "Like chess players see the board as a metaphor for consequence, pianists see the keys as a framework for patience, discipline, and beauty. When you own the technique, you are free to say anything.",
  },
  {
    title: "Lifelong Relationship",
    description:
      "There is no graduation. Only growing. The mentorship evolves as you deepen your conversation with the keys.",
  },
];

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
        {/* Golden thread vertical — the spine */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top transition-transform duration-[1200ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.06), hsl(var(--vow-yellow) / 0.20) 20%, hsl(var(--vow-yellow) / 0.20) 80%, hsl(var(--vow-yellow) / 0.06))",
            animation: isVisible
              ? "pillars-thread-breathe 4s ease-in-out infinite"
              : undefined,
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
          aria-hidden="true"
        />

        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={cn(
              "relative text-center py-fitz-9 transition-all duration-[700ms]",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[12px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: `${300 + i * 200}ms`,
            }}
          >
            {/* Golden dot — node on the thread */}
            <span
              className="block w-2.5 h-2.5 rounded-full mx-auto mb-fitz-5"
              style={{
                background: "hsl(var(--vow-yellow))",
                boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
              }}
              aria-hidden="true"
            />
            <h2
              className="font-display text-[28px] md:text-[36px] font-light tracking-tight mb-fitz-3"
              style={{
                color: "hsl(30 10% 20%)",
              }}
            >
              {p.title}
            </h2>
            <p
              className="font-sans text-[16px] leading-[1.7] max-w-[480px] mx-auto"
              style={{ color: "hsl(30 10% 40%)" }}
            >
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pillars-thread-breathe {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.28; }
        }
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
