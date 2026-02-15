import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mountain, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const protocols = [
  "Proximity seating arc",
  "Natural acoustic projection",
  "Bylaw documentation included",
];

export function TheSacredGround() {
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
    <section 
      ref={sectionRef}
      className="section--surface section-padding-standard"
      style={{
        background: "linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className={cn(
              "relative bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 overflow-hidden border border-border/20 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"
            )}
            style={{
              boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 12px 48px rgba(0,0,0,0.08)"
            }}
          >
            {/* Mountain Watermark */}
            <div 
              className="absolute -right-12 -bottom-12 opacity-[0.04] pointer-events-none select-none"
              aria-hidden="true"
            >
              <Mountain size={280} strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
              >
                <Mountain size={14} className="text-accent" strokeWidth={2} />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  Banff Mode™
                </span>
              </div>

              {/* Quote-Style Headline */}
              <h2
                className={cn(
                  "text-[clamp(24px,3.5vw,40px)] font-[300] font-display italic leading-tight mb-8 text-foreground transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
              >
                "Where the mountains are<br />your amplifier."
              </h2>

              {/* Body */}
              <p
                className={cn(
                  "text-base leading-relaxed text-foreground/80 mb-6 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
              >
                When Parks Canada says no PA, I say: good.
              </p>

              {/* Protocol List */}
              <ul
                className={cn(
                  "space-y-3 mb-8 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
              >
                {protocols.map((protocol, index) => (
                  <li key={index} className="flex items-center gap-3 text-base text-foreground/80">
                    <ArrowRight size={16} className="text-accent shrink-0" strokeWidth={2} />
                    {protocol}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div
                className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "750ms" : "0ms" }}
              >
                <Button variant="outline" className="gap-2 border-accent/30 hover:bg-accent/10 hover:border-accent/50" asChild>
                  <a href="/banff-mode">
                    Understand the protocol
                    <ArrowRight size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
