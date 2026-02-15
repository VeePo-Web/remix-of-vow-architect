import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const fears = [
  "Guests in the back can't hear our vows",
  "Generators hum through the ceremony",
  "No SPL proof for permit compliance",
  "DJ arrives with no ceremony mic plan",
];

const resolutions = [
  "Every guest hears—mic coverage documented",
  "Silent battery power; zero ambient noise",
  "3 SPL readings logged with timestamps",
  "Ceremony audio plan delivered in 24 hours",
];

export function TheTransformation() {
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
    <section ref={sectionRef} className="section-grain relative min-h-[500px] overflow-hidden" style={{ minHeight: '500px' }}>
      {/* Section Label — centered above the split */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex justify-center pt-12 md:pt-16 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, hsl(220 15% 8%) 0%, transparent 100%)', paddingBottom: '40px' }}
      >
        <p
          className={cn(
            "text-xs uppercase tracking-[0.22em] text-muted-foreground transition-all duration-700",
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
          style={{
            background: "linear-gradient(135deg, hsl(220 15% 8%) 0%, hsl(240 12% 3%) 100%)",
          }}
        >
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 30% 40%, hsl(220 80% 20% / 0.15) 0%, transparent 60%)"
            }}
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
                <X 
                  size={20} 
                  className="text-error shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" 
                  strokeWidth={2}
                />
                <p className="text-base leading-relaxed text-foreground/80">
                  {fear}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER DIVIDER — breathing glow */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none hidden md:block z-20"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(var(--vow-yellow) / 0.6) 50%, transparent 100%)",
            boxShadow: "0 0 40px 8px hsl(var(--vow-yellow) / 0.2), 0 0 80px 16px hsl(var(--vow-yellow) / 0.1)",
            animation: "divider-breathe 4s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        {/* RIGHT PANEL — LIFE (Resolutions) */}
        <div 
          className="relative px-8 py-16 md:py-24 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(45 30% 95%) 0%, hsl(42 28% 91%) 100%)",
          }}
        >
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 70% 40%, hsl(var(--vow-yellow) / 0.15) 0%, transparent 60%)"
            }}
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
                <Check 
                  size={20} 
                  className="text-success shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" 
                  strokeWidth={2.5}
                />
                <p className="text-base leading-relaxed text-rich-black font-medium">
                  {resolution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
