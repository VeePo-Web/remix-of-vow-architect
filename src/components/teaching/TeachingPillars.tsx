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
    title: "Lifelong Relationship",
    description:
      "There is no graduation. Only growing. The mentorship evolves as you deepen your conversation with the keys.",
  },
];

export function TeachingPillars() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="teaching-pillars"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(40 30% 95%)" }}
      role="region"
      aria-label="Three Pillars"
    >
      <div className="max-w-[600px] mx-auto relative">
        {/* Golden thread vertical */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{
            background: "hsl(var(--vow-yellow))",
            animation: isVisible
              ? "golden-thread-breathe 4s ease-in-out infinite"
              : undefined,
          }}
          aria-hidden="true"
        />

        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={cn(
              "relative text-center py-fitz-9 transition-all duration-[600ms]",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${i * 200}ms`,
            }}
          >
            {/* Golden dot */}
            <span
              className="block w-2.5 h-2.5 rounded-full bg-[hsl(var(--vow-yellow))] mx-auto mb-fitz-5"
              aria-hidden="true"
            />
            <h2
              className="font-display text-[28px] md:text-[36px] font-light tracking-tight mb-fitz-3"
              style={{ color: "hsl(30 10% 20%)" }}
            >
              {p.title}
            </h2>
            <p
              className="font-sans text-[16px] leading-relaxed max-w-[480px] mx-auto"
              style={{ color: "hsl(30 10% 40%)" }}
            >
              {p.description}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes golden-thread-breathe {
          0%, 100% { opacity: 0.10; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-pillars * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
