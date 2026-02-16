import { useEffect, useRef, useState } from "react";
import { Mic, Battery, FileText, Shield, Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import witnessCeremony from "@/assets/witness-ceremony.jpg";

const declarations = [
  "I arrive before anyone else.",
  "I test every microphone myself.",
  "I walk your cue sheet until it is second nature.",
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
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-theme="life"
      className="relative section--surface section-padding-standard overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)",
        minHeight: '400px',
      }}
    >
      {/* Background image layer */}
      <img
        src={witnessCeremony}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
        loading="lazy"
        aria-hidden="true"
      />
      {/* Top fade from TheTransformation dark */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 12% 3%))' }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            {/* Label */}
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE WITNESS
            </p>

            {/* Headline with golden vow underline on "witness" */}
            <h2
              className={cn(
                "text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight mb-10 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              Not a musician—<br />
              your ceremony{" "}
              <span className="relative inline-block">
                witness
                <span
                  className="absolute left-0 right-0 -bottom-1 h-[2px]"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.2))",
                  }}
                  aria-hidden="true"
                />
              </span>
              .
            </h2>

            {/* Three Declarations — generous spacing */}
            <div className="space-y-6 mb-12">
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

            {/* Golden thread separator */}
            <div 
              className={cn(
                "h-[1px] w-16 mx-auto mb-10 transition-all duration-700",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                transitionDelay: isVisible ? "550ms" : "0ms",
              }}
              aria-hidden="true"
            />

            {/* Standard Kit */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5">
                What I bring
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {standardKit.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 group cursor-default px-3 py-2 rounded-full border border-border/20 hover:border-primary/30 transition-all duration-[180ms]"
                      style={{ transitionTimingFunction: 'var(--easing-std)' }}
                    >
                      <Icon size={14} className="text-muted-foreground transition-all duration-[180ms] group-hover:text-primary group-hover:scale-105" strokeWidth={1.5} />
                      <span className="text-sm text-foreground/70 transition-colors duration-[180ms] group-hover:text-foreground">
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
