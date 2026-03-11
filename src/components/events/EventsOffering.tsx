import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MostSelectedPill } from "@/components/MostSelectedPill";

const tiers = [
  {
    name: "The Moment",
    duration: "1 hour",
    description:
      "A ceremony, a cocktail hour, or a dinner course. Focused, intentional piano for the part of your event that matters most.",
    cta: "Discuss your event",
    ctaHref: "/contact",
    isSelected: false,
  },
  {
    name: "The Evening",
    duration: "2–3 hours",
    description:
      "Full coverage from arrival through dinner. Repertoire shifts with the energy of the room — from ambient to engaging and back again.",
    cta: "Discuss your event",
    ctaHref: "/contact",
    isSelected: true,
  },
  {
    name: "The Full Occasion",
    duration: "4+ hours",
    description:
      "Complete musical direction for extended events. Multiple phases, curated transitions, and the flexibility to read the room all night.",
    cta: "Discuss your event",
    ctaHref: "/contact",
    isSelected: false,
  },
];

export function EventsOffering() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="events-offering"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="The Offering"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-3 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
        >
          How long do you need me there?
        </h2>

        <p
          className={cn(
            "font-sans text-[15px] text-muted-foreground text-center mb-fitz-8 transition-all duration-[700ms]",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          Three presences — choose the one that fits your evening.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                "relative rounded-2xl p-8 transition-all duration-[500ms] flex flex-col backdrop-blur-[6px]",
                t.isSelected
                  ? "border-2 border-primary/30 hover:border-primary/50 shadow-lg"
                  : "border border-border hover:border-primary/15 shadow-sm",
                "hover:-translate-y-1 hover:shadow-md",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                background: t.isSelected ? "hsl(var(--card))" : "hsl(var(--card))",
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${300 + i * 200}ms`,
              }}
            >
              {t.isSelected && <MostSelectedPill />}

              <h3 className="font-display text-[22px] font-medium text-foreground mb-1">
                {t.name}
              </h3>
              <span className="font-sans text-[13px] text-primary tracking-[0.1em] mb-4 opacity-70">
                {t.duration}
              </span>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8 flex-1">
                {t.description}
              </p>
              <Button
                asChild
                variant={t.isSelected ? "primary-dark" : "ghost-dark"}
                className="w-full"
              >
                <Link to={t.ctaHref}>{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
