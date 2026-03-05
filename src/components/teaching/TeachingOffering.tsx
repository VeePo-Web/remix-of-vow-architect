import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "The Conversation",
    description: "A single session. Sixty minutes of listening.",
    cta: "Discover what the piano holds for you.",
    ctaHref: "/contact",
    antiAnxiety: "No obligation. One conversation.",
    isChosen: false,
  },
  {
    name: "The Practice",
    description:
      "Ongoing mentorship. The patient, steady work of finding your sound.",
    cta: "Find your sound.",
    ctaHref: "/contact",
    antiAnxiety: "Pause or adjust anytime. Your pace is the only timeline.",
    isChosen: true,
  },
  {
    name: "The Devotion",
    description:
      "Intensive mentorship for those with something urgent and beautiful to prepare for.",
    cta: "Tell me what you want to say.",
    ctaHref: "/contact",
    antiAnxiety: "For milestone moments that deserve depth.",
    isChosen: false,
  },
];

export function TeachingOffering() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="teaching-offering"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="The Offering"
    >
      <div className="max-w-[900px] mx-auto">
        {/* Framing question */}
        <h2
          className={cn(
            "font-display text-[24px] md:text-[36px] font-light tracking-tight text-center mb-fitz-9 transition-all duration-[600ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          )}
          style={{
            color: "hsl(30 15% 22%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
          }}
        >
          Where are you in your relationship with the instrument?
        </h2>

        {/* Three tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                "relative p-fitz-6 md:p-fitz-7 rounded-lg transition-all duration-[220ms]",
                "hover:-translate-y-[2px]",
                t.isChosen
                  ? "border border-[hsl(var(--vow-yellow)/0.3)] -translate-y-1 shadow-sm"
                  : "border border-[hsl(30_10%_80%)]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                background: t.isChosen
                  ? "hsl(40 35% 96%)"
                  : "hsl(40 28% 95%)",
                borderLeftColor: t.isChosen
                  ? "hsl(var(--vow-yellow))"
                  : undefined,
                borderLeftWidth: t.isChosen ? "2px" : undefined,
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${i * 200}ms`,
              }}
            >
              {/* Most Chosen pill */}
              {t.isChosen && (
                <div className="flex items-center gap-1.5 mb-fitz-4">
                  <span
                    className="block w-1.5 h-1.5 rounded-full bg-[hsl(var(--vow-yellow))]"
                    aria-hidden="true"
                  />
                  <span
                    className="text-[11px] uppercase tracking-[0.18em] font-sans font-medium"
                    style={{ color: "hsl(var(--vow-yellow))" }}
                  >
                    Most Chosen
                  </span>
                </div>
              )}

              <h3
                className="font-display text-[22px] md:text-[26px] font-light tracking-tight mb-fitz-3"
                style={{ color: "hsl(30 10% 18%)" }}
              >
                {t.name}
              </h3>

              <p
                className="font-sans text-[15px] leading-relaxed mb-fitz-5"
                style={{ color: "hsl(30 10% 40%)" }}
              >
                {t.description}
              </p>

              <Button
                asChild
                variant="ghost"
                className={cn(
                  "font-sans text-[13px] uppercase tracking-[0.14em] px-0 h-auto py-1 mb-fitz-3",
                  t.isChosen
                    ? "text-[hsl(var(--vow-yellow))] hover:text-[hsl(var(--vow-yellow))]"
                    : "text-[hsl(30_10%_35%)] hover:text-[hsl(30_10%_20%)]"
                )}
              >
                <Link to={t.ctaHref}>{t.cta}</Link>
              </Button>

              <p
                className="font-sans text-[12px] leading-relaxed"
                style={{ color: "hsl(30 10% 55%)" }}
              >
                {t.antiAnxiety}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
