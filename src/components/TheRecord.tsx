import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ReadingCardProps {
  timestamp: string;
  reading: string;
  moment: string;
}

const readings: ReadingCardProps[] = [
  { timestamp: "14:32", reading: "62 dBA", moment: "Prelude" },
  { timestamp: "14:47", reading: "68 dBA", moment: "Vows" },
  { timestamp: "15:02", reading: "72 dBA", moment: "Recession" },
];

export function TheRecord() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section--dark section-grain relative py-24 px-4 overflow-hidden" style={{ minHeight: '400px' }}>
      {/* Top fade from TheSacredGround warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
        aria-hidden="true"
      />
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE RECORD
            </p>
            <h2
              className={cn(
                "text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight text-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              The evidence of being heard
            </h2>
          </div>

          {/* Three Reading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {readings.map((reading, index) => (
              <div
                key={index}
                className={cn(
                  "relative border border-border/40 rounded-lg p-8 transition-all duration-700 hover:border-border/60 hover:-translate-y-[2px]",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  background: "hsl(var(--ebon-charcoal) / 0.8)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  transitionDelay: isVisible ? `${300 + index * 150}ms` : "0ms",
                  transitionTimingFunction: "var(--easing-std)",
                }}
              >
                {/* Vow-yellow top accent line */}
                <div
                  className={cn(
                    "absolute top-0 left-4 right-4 h-[2px] rounded-full transition-all duration-700",
                    isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  )}
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                    transitionDelay: isVisible ? `${500 + index * 150}ms` : "0ms",
                  }}
                  aria-hidden="true"
                />
                <p 
                  className="text-xs mb-3 opacity-50 font-mono"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {reading.timestamp}
                </p>
                <div 
                  className="font-display font-light mb-3 text-card-foreground"
                  style={{ fontVariantNumeric: "tabular-nums", fontSize: "clamp(40px, 6vw, 64px)" }}
                >
                  {reading.reading}
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {reading.moment}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantee Section */}
          <div
            className={cn(
              "text-center transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "750ms" : "0ms" }}
          >
            <div 
              className="h-[1px] w-32 mx-auto mb-8"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)"
              }}
              aria-hidden="true"
            />

            <p className="text-2xl font-display font-light italic text-foreground/90 mb-2">
              {"\u201C"}If all failsafes fail,
            </p>
            <p className="text-2xl font-display font-light italic text-foreground/90 mb-8">
              your remedy is automatic.{"\u201D"}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
