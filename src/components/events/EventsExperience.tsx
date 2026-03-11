import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import witnessSetupImg from "@/assets/witness-setup-ai.jpg";

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
      className="relative py-[120px] md:py-[160px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="Past Events"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-[80px] md:mb-[100px] transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          Moments I have been part of
        </h2>

        {/* Asymmetric left-bleed editorial image */}
        <div
          className={cn(
            "md:w-[50%] md:mr-auto md:-ml-[4%] mb-[60px] md:mb-[80px] transition-all duration-[900ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
        >
          <GoldCornerImage
            src={witnessSetupImg}
            alt="Piano positioned for a live event"
            aspectRatio="4/3"
            maxHeight="340px"
          />
        </div>

        {/* Clean typographic vignettes — no card chrome */}
        <div className="space-y-[64px] md:space-y-[80px]">
          {vignettes.map((v, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[560px] mx-auto transition-all duration-[600ms]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${600 + i * 180}ms`,
              }}
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 block">
                {v.type}
              </span>
              <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground mb-6">
                {v.narrative}
              </p>
              <blockquote className="border-l-2 border-primary/20 pl-4">
                <p className="font-display italic text-[18px] text-foreground">
                  "{v.quote}"
                </p>
                <cite className="font-sans text-[12px] not-italic text-muted-foreground mt-2 block">
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
