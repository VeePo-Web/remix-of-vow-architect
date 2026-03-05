import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const lines = [
  "You have a song inside you that you have never been able to play.",
  "You have heard it in the car, in the quiet, in the space between what you feel and what you can say.",
  "I understand.",
  "The piano has been waiting.",
];

export function TeachingExhale() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      id="teaching-exhale"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(40 30% 95%)" }}
      role="region"
      aria-label="Recognition"
    >
      <div className="max-w-[680px] mx-auto text-center">
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "font-display italic text-[20px] md:text-[28px] leading-[1.5] tracking-tight transition-all duration-[600ms]",
              i < 2 ? "mb-fitz-5" : i === 2 ? "mb-fitz-3" : "mb-0",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
            style={{
              color: "hsl(30 10% 25%)",
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${200 + i * 400}ms`,
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
