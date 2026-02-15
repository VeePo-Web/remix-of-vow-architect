import { useEffect, useRef, useState } from "react";
import { Mic, Battery, FileText, Shield, Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const declarations = [
  "I arrive an hour early.",
  "I test your officiant's mic.",
  "I co-sign your cue sheet.",
];

const standardKit = [
  { icon: Mic, label: "2 mics" },
  { icon: Battery, label: "Battery" },
  { icon: Activity, label: "SPL meter" },
  { icon: FileText, label: "Cue sheet" },
  { icon: Shield, label: "$4M ins." },
  { icon: Clock, label: "24h plan" },
];

export function TheWitness() {
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
          {/* Content — Full-width centered (no image placeholder) */}
          <div className="max-w-2xl mx-auto text-center md:text-left">
            {/* Label */}
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE WITNESS
            </p>

            {/* Headline */}
            <h2
              className={cn(
                "text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight mb-8 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              Not a musician—<br />
              your ceremony witness.
            </h2>

            {/* Three Declarations */}
            <div className="space-y-4 mb-10">
              {declarations.map((declaration, index) => (
                <p 
                  key={index}
                  className={cn(
                    "text-lg font-display font-light leading-relaxed text-foreground/90 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms" }}
                >
                  {declaration}
                </p>
              ))}
            </div>

            {/* Standard Kit */}
            <div
              className={cn(
                "pt-6 border-t border-border/30 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                Standard Kit
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {standardKit.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 group cursor-default"
                    >
                      <div className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5">
                        <Icon size={14} className="text-muted-foreground transition-colors duration-300 group-hover:text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
