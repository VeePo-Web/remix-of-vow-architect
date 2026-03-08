import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Conversation",
    description:
      "I ask about the room, the guest list, the mood you want. Not a questionnaire — a conversation. I listen for what you mean, not just what you say.",
  },
  {
    number: "02",
    title: "Curation",
    description:
      "I build a repertoire tailored to your event — classical, film scores, pop arrangements, hymns, jazz standards — calibrated to the energy of each phase of your evening.",
  },
  {
    number: "03",
    title: "Delivery",
    description:
      "I arrive early, set up quietly, and play at the level your room requires. No announcements, no attention-seeking. The music serves the moment.",
  },
];

export function EventsApproach() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="events-approach"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(var(--events-approach-bg))" }}
      role="region"
      aria-label="How I Work"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-3 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
        >
          What should the room feel like?
        </h2>

        <p
          className={cn(
            "font-sans text-[15px] text-muted-foreground text-center mb-fitz-8 transition-all duration-[700ms]",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          That is the first question I ask — and the answer shapes everything.
        </p>

        <div className="space-y-10">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={cn(
                "flex gap-6 items-start transition-all duration-[600ms]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${400 + i * 200}ms`,
              }}
            >
              <span className="font-sans text-[13px] text-primary tracking-[0.15em] mt-1.5 shrink-0 opacity-60">
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-[22px] font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
