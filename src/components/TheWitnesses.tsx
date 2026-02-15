import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Every guest heard us—even the back row.",
    names: "Sarah & James",
    venue: "Spruce Meadows",
    metric: "62 dBA at aisle mid",
  },
  {
    quote: "We were Banff-legal with zero stress.",
    names: "Emily & David",
    venue: "Cascade Gardens",
    metric: "unamplified; proximity arc applied",
  },
  {
    quote: "The SPL log let us skip our venue's site visit requirement.",
    names: "Rachel & Marcus",
    venue: "Lake House",
    metric: "68 dBA peak ceremony reading",
  },
];

export function TheWitnesses() {
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
    <section ref={sectionRef} className="section--surface section-padding-standard">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              TESTIMONIES
            </p>
            <h2
              className={cn(
                "text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              They heard their vows
            </h2>
          </div>

          {/* Testimonials Stack */}
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "relative transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: isVisible ? `${300 + index * 200}ms` : "0ms" }}
              >
                {/* Decorative Opening Quote */}
                <div 
                  className="absolute -left-8 -top-4 text-7xl font-display text-primary/10 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  "
                </div>

                {/* Quote */}
                <blockquote className="text-2xl font-display font-light leading-relaxed mb-6 text-foreground/90 pl-2">
                  {testimonial.quote}
                </blockquote>

                {/* Attribution */}
                <div className="pl-2">
                  <p className="text-base font-display italic text-foreground mb-1">
                    — {testimonial.names}, {testimonial.venue}
                  </p>
                  <p 
                    className="text-xs text-muted-foreground opacity-60"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    [ {testimonial.metric} ]
                  </p>
                </div>

                {/* Separator (except last) */}
                {index < testimonials.length - 1 && (
                  <div 
                    className="mt-12 h-[1px] w-24 mx-auto opacity-20"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)"
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
