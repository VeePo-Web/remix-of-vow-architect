import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Church, Wine, Heart } from "lucide-react";

const occasions = [
  {
    icon: UtensilsCrossed,
    title: "Private Dinners",
    description:
      "In-home catered evenings, intimate dinner parties, anniversary meals — where the music becomes part of the atmosphere, never the centre of attention.",
  },
  {
    icon: Church,
    title: "Church Services",
    description:
      "Sunday worship, special liturgies, memorial services — reverent piano that supports the congregation without overwhelming the space.",
  },
  {
    icon: Wine,
    title: "Cocktail Receptions",
    description:
      "Corporate mixers, gallery openings, fundraising galas — elegant background that sets the tone while guests connect.",
  },
  {
    icon: Heart,
    title: "Intimate Celebrations",
    description:
      "Milestone birthdays, engagement parties, holiday gatherings — live piano that elevates the moment and makes it memorable.",
  },
];

export function EventsOccasions() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="events-occasions"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(var(--deep-graphite))" }}
      role="region"
      aria-label="What I Play For"
    >
      {/* Grain */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-fitz-8 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
        >
          What I play for
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {occasions.map((o, i) => {
            const Icon = o.icon;
            return (
              <div
                key={o.title}
                className={cn(
                  "group rounded-2xl border border-[hsl(var(--vow-yellow)/0.06)] p-8 transition-all duration-[500ms]",
                  "hover:border-[hsl(var(--vow-yellow)/0.15)] hover:-translate-y-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{
                  background: "hsl(20 6% 13%)",
                  transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                  transitionDelay: `${300 + i * 150}ms`,
                }}
              >
                <Icon
                  size={24}
                  strokeWidth={1.2}
                  className="text-[hsl(var(--vow-yellow))] mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
                <h3 className="font-display text-[22px] font-medium text-foreground mb-2">
                  {o.title}
                </h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                  {o.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
