import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const vignettes = [
  {
    type: "Private Dinner",
    narrative:
      "An in-home anniversary dinner for forty guests. The hosts wanted Debussy during cocktails and Sinatra-era jazz through the main course. By dessert, two guests were slow-dancing in the kitchen.",
    quote: "The music made the evening feel like a film.",
    attribution: "— Anniversary dinner host, Calgary",
  },
  {
    type: "Church Service",
    narrative:
      "A Christmas Eve service in a small chapel with no sound system. Acoustic piano carried hymns and contemporary worship through a ninety-minute service. The congregation sang louder than they had in years.",
    quote: "He read the room better than anyone we have had.",
    attribution: "— Worship leader, Alberta",
  },
  {
    type: "Cocktail Reception",
    narrative:
      "A corporate gala for a hundred and twenty. Classical first hour, transitioning to pop and film scores as the energy shifted. Not a single request — the curation matched every phase perfectly.",
    quote: "We forgot there was a pianist. That is the highest compliment.",
    attribution: "— Event coordinator",
  },
];

export function EventsExperience() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="events-experience"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="Past Events"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-fitz-8 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          Moments I have been part of
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vignettes.map((v, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl p-8 transition-all duration-[500ms] hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                background: "hsl(var(--events-warm-card))",
                border: "1px solid hsl(var(--events-warm-border))",
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${300 + i * 180}ms`,
              }}
            >
              <span
                className="font-sans text-[11px] uppercase tracking-[0.22em] mb-4 block"
                style={{ color: "hsl(var(--events-warm-label))" }}
              >
                {v.type}
              </span>
              <p
                className="font-sans text-[14px] leading-relaxed mb-6"
                style={{ color: "hsl(var(--events-warm-text-soft))" }}
              >
                {v.narrative}
              </p>
              <blockquote className="border-l-2 border-primary pl-4">
                <p
                  className="font-display italic text-[16px]"
                  style={{ color: "hsl(var(--events-warm-text-deep))" }}
                >
                  "{v.quote}"
                </p>
                <cite
                  className="font-sans text-[12px] not-italic mt-2 block"
                  style={{ color: "hsl(var(--events-warm-cite))" }}
                >
                  {v.attribution}
                </cite>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
