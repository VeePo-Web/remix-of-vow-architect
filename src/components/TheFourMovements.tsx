import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Movement {
  numeral: string;
  question: string;
  promise: string;
}

const movements: Movement[] = [
  {
    numeral: "I",
    question: "What song was playing when you knew?",
    promise: "I don't assume what moves you. I ask.",
  },
  {
    numeral: "II",
    question: "Your aisle music—composed. Not selected.",
    promise: "I don't assume what it should sound like. I create.",
  },
  {
    numeral: "III",
    question: "A first draft. Is this the direction?",
    promise: "I don't assume I got it right. I refine.",
  },
  {
    numeral: "IV",
    question: "You curate. Or I suggest. Either way—together.",
    promise: "I don't assume what you want. I collaborate.",
  },
];

export function TheFourMovements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setActiveIndex(3);
      setProgress(1);
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Check if section is in view
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const inView = sectionTop < viewportHeight * 0.8 && sectionBottom > 0;
      setIsVisible(inView);

      // Calculate progress through the section (0 to 1)
      const scrollStart = viewportHeight * 0.3;
      const scrollEnd = sectionHeight - viewportHeight * 0.5;
      const scrolled = -rect.top + scrollStart;
      const normalizedProgress = Math.max(0, Math.min(1, scrolled / scrollEnd));
      setProgress(normalizedProgress);

      // Determine active movement (0-3)
      const movementIndex = Math.floor(normalizedProgress * 4);
      setActiveIndex(Math.min(movementIndex, 3));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="score-section relative bg-background"
      aria-label="How your ceremony music is created"
    >
      {/* Opening */}
      <div className="score-opening min-h-[50vh] flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
          The Process
        </p>
        <h2 className="font-display text-[clamp(28px,5vw,48px)] font-light leading-[1.15] max-w-[16ch] mb-8">
          There are no second chances for a first{" "}
          <span className="text-primary">moment.</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          So I don't assume. I ask.
        </p>
      </div>

      {/* Movement Cards - Stacked vertically */}
      <div className="score-cards relative">
        {movements.map((movement, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div
              key={index}
              className={cn(
                "score-card min-h-[80vh] md:min-h-[70vh] flex items-center justify-center px-6 py-16 md:py-24 transition-opacity duration-700",
                isActive ? "opacity-100" : "opacity-30"
              )}
            >
              <div className="score-card-inner relative w-full max-w-2xl mx-auto text-center">
                {/* Large Roman Numeral Background */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center pointer-events-none select-none transition-all duration-700"
                  )}
                  aria-hidden="true"
                >
                  <span
                    className="font-display text-[140px] md:text-[220px] lg:text-[280px] font-light leading-none transition-opacity duration-500"
                    style={{
                      opacity: isCurrent ? 0.05 : 0.02,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {movement.numeral}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "relative z-10 transition-all duration-500",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  {/* Question */}
                  <h3 className="font-display text-[clamp(22px,4vw,38px)] font-light leading-[1.2] mb-8 md:mb-10 max-w-[18ch] mx-auto">
                    {movement.question}
                  </h3>

                  {/* Golden Promise */}
                  <div className="score-promise inline-flex items-center gap-3">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full bg-primary flex-shrink-0 transition-all duration-500",
                        isCurrent ? "scale-125" : "scale-100"
                      )}
                      style={{
                        boxShadow: isCurrent
                          ? "0 0 16px hsl(var(--vow-yellow) / 0.6)"
                          : "0 0 8px hsl(var(--vow-yellow) / 0.3)",
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-primary font-medium text-base md:text-lg">
                      {movement.promise}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator - Fixed at bottom */}
      <div
        className={cn(
          "score-progress fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center gap-3 md:gap-4 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-background/90 backdrop-blur-md border border-border/30 shadow-lg">
          {movements.map((movement, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-4">
              {/* Node */}
              <div
                className={cn(
                  "relative flex items-center justify-center w-6 h-6 transition-all duration-300"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-display transition-colors duration-300",
                    activeIndex >= index
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  )}
                >
                  {movement.numeral}
                </span>
                {activeIndex === index && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "hsl(var(--vow-yellow) / 0.2)",
                      animation: "score-pulse 2s ease-in-out infinite",
                    }}
                  />
                )}
              </div>

              {/* Connector Line */}
              {index < movements.length - 1 && (
                <div className="w-6 md:w-8 h-px relative overflow-hidden">
                  <div className="absolute inset-0 bg-muted-foreground/20" />
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
                    style={{
                      width: activeIndex > index ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div className="score-closing min-h-[40vh] flex flex-col items-center justify-center text-center px-6 py-20 md:py-28 relative">
        {/* Connecting thread from last card */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 md:h-20"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.4), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Terminal dot */}
        <div
          className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary/70 mb-8 md:mb-10"
          style={{
            boxShadow: "0 0 20px hsl(var(--vow-yellow) / 0.5)",
          }}
          aria-hidden="true"
        />

        <p className="font-display text-[clamp(22px,4vw,38px)] font-light leading-[1.2] max-w-[20ch]">
          Because there's one chance to get this right.
        </p>
        <p className="font-display text-[clamp(22px,4vw,38px)] font-light leading-[1.2] text-primary mt-2">
          And it will be right.
        </p>
      </div>
    </section>
  );
}
