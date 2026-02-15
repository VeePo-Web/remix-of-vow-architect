import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Link } from "react-router-dom";
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
    <section ref={sectionRef} className="section--dark py-24 px-4" style={{ minHeight: '400px' }}>
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
                  "border border-border/40 rounded-lg p-6 transition-all duration-700 hover:border-border/60 hover:-translate-y-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  background: "hsl(var(--ebon-charcoal) / 0.8)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  transitionDelay: isVisible ? `${300 + index * 150}ms` : "0ms",
                }}
              >
                <p 
                  className="text-xs mb-3 opacity-50 font-mono"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {reading.timestamp}
                </p>
                <div 
                  className="text-5xl font-display font-light mb-3 text-card-foreground"
                  style={{ fontVariantNumeric: "tabular-nums" }}
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

            <Button variant="ghost-dark" className="gap-2" asChild>
              <Link to="/resources">
                <FileDown size={18} />
                Download sample report
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
