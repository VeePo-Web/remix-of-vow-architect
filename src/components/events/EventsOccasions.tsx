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
      className="font-display text-[13px] font-light tracking-[0.2em] uppercase mb-3 block"
      style={{
        color: "hsl(var(--vow-yellow) / 0.5)",
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
      className="relative py-[120px] md:py-[160px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="What I Play For"
    >
      <div className="relative z-10 max-w-[640px] mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-[80px] md:mb-[100px] transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
        >
          What I play for
        </h2>

        {/* Clean typographic blocks — no card chrome */}
        {occasions.slice(0, 2).map((o, i) => (
          <div
            key={o.title}
            className={cn(
              "text-center mb-[64px] md:mb-[80px] transition-all duration-[600ms]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: `${300 + i * 150}ms`,
            }}
          >
            <GoldNumeral n={i + 1} />
            <h3 className="font-display text-[22px] md:text-[26px] font-light text-foreground mb-3">
              {o.title}
            </h3>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed max-w-[480px] mx-auto">
              {o.description}
            </p>
          </div>
        ))}

        {/* Editorial image interstitial */}
        <div
          className={cn(
            "w-[calc(100%+4rem)] md:w-[calc(100%+8rem)] -mx-8 md:-mx-16 my-[60px] md:my-[80px] transition-all duration-[900ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "600ms",
          }}
        >
          <GoldCornerImage
            src={gallerySetupImg}
            alt="Piano setup for a private gathering"
            aspectRatio="16/9"
            maxHeight="380px"
          />
        </div>

        {/* Last two occasions */}
        {occasions.slice(2).map((o, i) => (
          <div
            key={o.title}
            className={cn(
              "text-center mb-[64px] md:mb-[80px] last:mb-0 transition-all duration-[600ms]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: `${800 + i * 150}ms`,
            }}
          >
            <GoldNumeral n={i + 3} />
            <h3 className="font-display text-[22px] md:text-[26px] font-light text-foreground mb-3">
              {o.title}
            </h3>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed max-w-[480px] mx-auto">
              {o.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
