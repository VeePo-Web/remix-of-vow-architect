import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import transformationFear from "@/assets/transformation-fear-ai.jpg";
import transformationLife from "@/assets/transformation-life-ai.jpg";

const fears = [
  "Guests in the back can't hear our vows",
  "Generators hum through the ceremony",
  "No proof the sound reached every seat",
  "The musician arrives with no plan for your ceremony",
];

const resolutions = [
  "Every guest hears every word\u2014documented",
  "Silent power. No generators. No hum.",
  "Three sound readings logged and time-stamped",
  "Your ceremony audio plan\u2014delivered within 24 hours",
];

export function TheTransformation() {
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
    <section ref={sectionRef} className="section-grain relative min-h-[500px] overflow-hidden" style={{ minHeight: '500px' }}>
      {/* Section Label */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex justify-center pt-12 md:pt-16 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, hsl(220 15% 8% / 0.8) 0%, transparent 100%)', paddingBottom: '40px' }}
      >
        <p
          className={cn(
            "text-xs uppercase tracking-[0.22em] text-foreground/50 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          THE TRANSFORMATION
        </p>
      </div>

      {/* Full-Width Split Screen */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* LEFT PANEL — DEATH (Fears) */}
        <div
          className="relative px-8 py-16 md:py-24 flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(220 15% 8%) 0%, hsl(240 12% 3%) 100%)" }}
        >
          <img
            src={transformationFear}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none"
            loading="lazy"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle at 30% 40%, hsl(220 80% 20% / 0.15) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-md mx-auto space-y-6 mt-8">
            {fears.map((fear, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-700 group",
                  isVisible ? "opacity-70 hover:opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: isVisible ? `${150 + index * 150}ms` : "0ms" }}
              >
                <X size={20} className="text-error shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                <p className="text-base leading-relaxed text-foreground/80">{fear}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — LIFE (Resolutions) */}
        <div
          className="relative px-8 py-16 md:py-24 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(45 30% 95%) 0%, hsl(42 28% 91%) 100%)" }}
        >
          <img
            src={transformationLife}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none"
            loading="lazy"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle at 70% 40%, hsl(var(--vow-yellow) / 0.15) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-md mx-auto space-y-6">
            {resolutions.map((resolution, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-700 group",
                  isVisible ? "opacity-80 hover:opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                )}
                style={{ transitionDelay: isVisible ? `${150 + index * 150}ms` : "0ms" }}
              >
                <Check size={20} className="text-success shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                <p className="text-base leading-relaxed text-rich-black font-medium">{resolution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER DIVIDER — breathing glow (outside grid for proper overlay) */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none hidden md:block z-30"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(var(--vow-yellow) / 0.85) 50%, transparent 100%)",
          boxShadow: "0 0 50px 12px hsl(var(--vow-yellow) / 0.25), 0 0 100px 24px hsl(var(--vow-yellow) / 0.12)",
          animation: "divider-breathe 4s ease-in-out infinite",
        }}
      aria-hidden="true"
      />

      {/* Bottom fade into TheWitness warm */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 25% 96%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
