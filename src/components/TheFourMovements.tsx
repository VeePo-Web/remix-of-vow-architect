import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Movement {
  numeral: string;
  title: string;
  headline: string;
  body: string;
  assumption: string;
  note: string;
}

const movements: Movement[] = [
  {
    numeral: "I",
    title: "THE LISTENING",
    headline: "It begins with your story.",
    body: "Before I play a single note, we talk. Not about playlists—about the song that was playing when you knew. The tempo that matches your heartbeat. The feeling you want your guests to carry home.",
    assumption: "I don't assume what moves you.",
    note: "You share. I listen.",
  },
  {
    numeral: "II",
    title: "THE CRAFTING",
    headline: "Your walk-down, composed.",
    body: "I disappear into your vision. Note by note, measure by measure, I piece together a custom arrangement for your aisle—not a cover, not a preset. A composition that sounds like your love story.",
    assumption: "I don't assume what it should sound like.",
    note: "I create. You imagine.",
  },
  {
    numeral: "III",
    title: "THE REFINING",
    headline: "A first draft, honest and raw.",
    body: "I send you an unpolished recording. 'Am I heading the right direction?' If something feels off, we course-correct. Your feedback isn't inconvenient—it's essential. We iterate until it sounds exactly right.",
    assumption: "I don't assume I got it right the first time.",
    note: "You guide. I adjust.",
  },
  {
    numeral: "IV",
    title: "THE COMPLETING",
    headline: "Together, we fill the air.",
    body: "Now you brainstorm—prelude, procession, cocktails, dinner. Or if you'd rather, I'll suggest. Either way, we decide together. Communication all the way through, so no one is ever left wondering.",
    assumption: "I don't assume what you want.",
    note: "We complete. Together.",
  },
];

// Custom SVG note shapes for each movement
const NoteShapes = {
  whole: (
    <ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  half: (
    <>
      <ellipse cx="12" cy="18" rx="7" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="19" y1="18" x2="19" y2="4" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  quarter: (
    <>
      <ellipse cx="12" cy="18" rx="7" ry="5" fill="currentColor" />
      <line x1="19" y1="18" x2="19" y2="4" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  eighth: (
    <>
      <ellipse cx="10" cy="20" rx="6" ry="4" fill="currentColor" />
      <line x1="16" y1="20" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 6 Q 22 8, 20 14" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
};

export function TheFourMovements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMovement, setActiveMovement] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setActiveMovement(3);
      setScrollProgress(1);
      return;
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the section
      const scrolled = -rect.top + viewportHeight * 0.5;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      setScrollProgress(progress);
      
      // Determine active movement based on scroll position
      const movementIndex = Math.floor(progress * 4);
      setActiveMovement(Math.min(movementIndex, 3));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="movements-section relative bg-background overflow-hidden"
      aria-label="How your ceremony music is created"
    >
      {/* Waveform texture background */}
      <div className="movements-waveform" aria-hidden="true" />

      {/* Staff lines (5 lines like sheet music) */}
      <div className="movements-staff" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="movements-staff-line"
            style={{
              top: `${20 + i * 15}%`,
              opacity: scrollProgress > 0.1 ? 0.08 : 0.03,
            }}
          />
        ))}
      </div>

      {/* Opening Anchor */}
      <div className="movements-anchor py-32 md:py-40 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">
          How Your Music Is Made
        </p>
        
        <h2 className="font-display text-[clamp(24px,4vw,42px)] font-light leading-tight max-w-[18ch] mx-auto mb-6 px-4">
          There are no second chances
          <br />
          <span className="relative inline-block">
            for a first
            <span className="movements-underline" />
          </span>{" "}
          <span className="text-primary">moment.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto px-4">
          So I don't assume. I ask.
        </p>
      </div>

      {/* Four Movements */}
      <div className="movements-container max-w-5xl mx-auto px-4 md:px-8">
        {movements.map((movement, index) => {
          const isActive = index <= activeMovement;
          const isCurrent = index === activeMovement;
          const noteType = ["whole", "half", "quarter", "eighth"][index] as keyof typeof NoteShapes;

          return (
            <article
              key={index}
              className={cn(
                "movement-block relative min-h-[70vh] md:min-h-[60vh] flex items-center py-20 md:py-24",
                index % 2 === 0 ? "movement-block--left" : "movement-block--right",
                isActive && "is-active",
                isCurrent && "is-current"
              )}
              aria-label={`Movement ${movement.numeral}: ${movement.title}`}
            >
              {/* Large Roman Numeral Watermark */}
              <div
                className={cn(
                  "movement-numeral absolute text-[120px] md:text-[180px] font-display font-light select-none pointer-events-none transition-opacity duration-700",
                  index % 2 === 0 ? "right-0 md:right-8" : "left-0 md:left-8"
                )}
                style={{ opacity: isActive ? 0.06 : 0.02 }}
                aria-hidden="true"
              >
                {movement.numeral}
              </div>

              {/* Golden Note */}
              <div
                className={cn(
                  "movement-note absolute w-10 h-10 text-primary transition-all duration-500",
                  index % 2 === 0 ? "left-4 md:left-0" : "right-4 md:right-0",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}
                style={{
                  filter: isCurrent ? "drop-shadow(0 0 12px hsl(var(--vow-yellow) / 0.5))" : "none",
                }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  {NoteShapes[noteType]}
                </svg>
              </div>

              {/* Content */}
              <div
                className={cn(
                  "movement-content relative z-10 max-w-lg transition-all duration-700",
                  index % 2 === 0 ? "ml-auto text-right pr-4 md:pr-16" : "mr-auto text-left pl-4 md:pl-16",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                {/* Movement Title */}
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-4">
                  {movement.title}
                </p>

                {/* Headline */}
                <h3 className="font-display text-[clamp(22px,3.5vw,32px)] font-light leading-snug mb-6">
                  {movement.headline}
                </h3>

                {/* Body */}
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  {movement.body}
                </p>

                {/* No Assumptions Statement */}
                <p
                  className={cn(
                    "text-sm font-medium text-primary mb-4 transition-all duration-500 delay-200",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  {movement.assumption}
                </p>

                {/* Collaborative Note */}
                <p
                  className={cn(
                    "text-sm italic text-muted-foreground/70 flex items-center gap-2 transition-all duration-500 delay-300",
                    index % 2 === 0 ? "justify-end" : "justify-start",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    aria-hidden="true"
                  />
                  {movement.note}
                </p>
              </div>

              {/* Connecting Thread to Next Movement */}
              {index < movements.length - 1 && (
                <div
                  className={cn(
                    "movement-thread absolute left-1/2 -translate-x-1/2 bottom-0 w-px transition-all duration-700",
                    isActive ? "h-20 opacity-40" : "h-0 opacity-0"
                  )}
                  style={{
                    background: `linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.4), transparent)`,
                  }}
                  aria-hidden="true"
                />
              )}
            </article>
          );
        })}
      </div>

      {/* Closing Anchor */}
      <div className="movements-closing py-32 md:py-40 text-center relative z-10">
        {/* Terminal Golden Dot */}
        <div
          className="w-3 h-3 rounded-full bg-primary/50 mx-auto mb-12 movements-pulse"
          style={{
            boxShadow: "0 0 20px hsl(var(--vow-yellow) / 0.3)",
          }}
          aria-hidden="true"
        />

        <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-6 px-4">
          Every note intentional. Every decision yours.
        </p>

        <p className="font-display text-[clamp(22px,3.5vw,36px)] font-light leading-tight max-w-[24ch] mx-auto px-4">
          Because there's{" "}
          <span className="relative inline-block">
            one chance
            <span className="movements-underline movements-underline--gold" />
          </span>{" "}
          to get this right.
          <br />
          <span className="text-primary">And it will be right.</span>
        </p>
      </div>
    </section>
  );
}
