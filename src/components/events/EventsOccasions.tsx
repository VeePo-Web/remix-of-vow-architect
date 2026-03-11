import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import gallerySetupImg from "@/assets/gallery-setup.jpg";

const occasions = [
  {
    title: "Private Dinners",
    description:
      "In-home catered evenings, intimate dinner parties, anniversary meals — where the music becomes part of the atmosphere, never the centre of attention.",
  },
  {
    title: "Church Services",
    description:
      "Sunday worship, seasonal liturgies, memorial services — reverent piano that supports the congregation without overwhelming the space.",
  },
  {
    title: "Cocktail Receptions",
    description:
      "Corporate mixers, gallery openings, fundraising galas — elegant background that sets the tone while guests connect.",
  },
  {
    title: "Intimate Celebrations",
    description:
      "Milestone birthdays, engagement parties, holiday gatherings — live piano that elevates the moment and makes it memorable.",
  },
];

function GoldNumeral({ n }: { n: number }) {
  return (
    <span
      className="font-display text-sm font-light tracking-wide mb-4 block"
      style={{
        background: "linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function EventsOccasions() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="events-occasions"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--card))" }}
      role="region"
      aria-label="What I Play For"
    >
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.03), transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

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

        {/* First two occasions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {occasions.slice(0, 2).map((o, i) => (
            <div
              key={o.title}
              className={cn(
                "group rounded-2xl border border-border p-8 transition-all duration-[500ms]",
                "hover:border-primary/15 hover:-translate-y-1 hover:shadow-md",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                background: "hsl(var(--background))",
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              <GoldNumeral n={i + 1} />
              <h3 className="font-display text-[22px] font-medium text-foreground mb-2">
                {o.title}
              </h3>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                {o.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interstitial full-bleed editorial image */}
        <div
          className={cn(
            "w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] -mx-4 md:-mx-8 my-10 transition-all duration-[900ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "800ms",
          }}
        >
          <GoldCornerImage
            src={gallerySetupImg}
            alt="Piano setup for a private gathering"
            aspectRatio="16/9"
            maxHeight="380px"
            frameIndex="EV·02"
          />
        </div>

        {/* Last two occasions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {occasions.slice(2).map((o, i) => (
            <div
              key={o.title}
              className={cn(
                "group rounded-2xl border border-border p-8 transition-all duration-[500ms]",
                "hover:border-primary/15 hover:-translate-y-1 hover:shadow-md",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                background: "hsl(var(--background))",
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${900 + i * 150}ms`,
              }}
            >
              <GoldNumeral n={i + 3} />
              <h3 className="font-display text-[22px] font-medium text-foreground mb-2">
                {o.title}
              </h3>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                {o.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
