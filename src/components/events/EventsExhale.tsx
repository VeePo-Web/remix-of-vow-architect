import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const lines = [
  "You are planning something that matters.",
  "A dinner where conversation deepens. A gathering where presence is felt.",
  "A moment that asks for more than a playlist.",
  "I understand what live music does to a room.",
];

export function EventsExhale() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      id="events-exhale"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(var(--rich-black))" }}
      data-theme="death"
      role="region"
      aria-label="Recognition"
    >
      <div className="max-w-[680px] mx-auto text-center">
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "font-display italic text-[20px] md:text-[28px] leading-[1.5] tracking-tight text-foreground transition-all duration-[600ms]",
              i < lines.length - 1 ? "mb-fitz-5" : "mb-0",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{
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
