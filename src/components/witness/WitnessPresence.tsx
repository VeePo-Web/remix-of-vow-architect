import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";
import aboutPresenceImg from "@/assets/about-presence.jpg";

const witnessedMoments = [
  "The bride who forgot her vows—and spoke from the heart instead",
  "The groom who cried before he could say 'I do'",
  "The grandmother who heard every word from the last row",
  "The silence after the first kiss that no one wanted to break",
];

export function WitnessPresence() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const parallaxRef = useScrollParallax({ intensity: 60, enableFogFade: true, fogIntensity: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="witness-presence"
      aria-label="The Presence"
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="relative py-[120px] px-4 bg-background overflow-hidden piano-section-target"
    >
      {/* Parallax watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.02]"
        style={{ color: "hsl(var(--foreground))" }}
        aria-hidden="true"
      >
        Presence
      </span>

      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `url(${aboutPresenceImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns 30s ease-in-out infinite alternate",
            transform: 'translateY(var(--parallax-y, 0))',
            transition: 'transform 0.1s linear',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 80%)",
          opacity: 'var(--fog-opacity, 0.1)'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section numeral + label */}
          <div className={cn(
            "text-center mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span
              className="block font-display text-[40px] font-light leading-none mb-3"
              style={{
                background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              04
            </span>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                THE PRESENCE
              </p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          <div className="w-12 h-px mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)" }} />

          {/* The Big Number */}
          <div className="relative">
            <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-1000", isVisible ? "opacity-100" : "opacity-0")} style={{ animation: 'witness-vignette-breathe 6s ease-in-out infinite' }}>
              <span className="font-display text-[clamp(100px,20vw,200px)] font-light leading-none" style={{ color: 'hsl(var(--vow-yellow) / 0.1)', textShadow: '0 0 80px hsl(var(--vow-yellow) / 0.15)' }}>
                500<span className="text-[clamp(40px,8vw,80px)] align-top">+</span>
              </span>
            </div>
            <div className={cn("relative text-center transition-all duration-1000", isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95")} style={{ transitionDelay: "400ms" }}>
              <span className="font-display text-[clamp(100px,20vw,200px)] font-light text-foreground leading-none">500</span>
              <span className="font-display text-[clamp(40px,8vw,80px)] font-light text-primary align-top">+</span>
            </div>
            <p className={cn("font-display text-[clamp(20px,3vw,32px)] font-light text-center text-muted-foreground mt-4 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{ transitionDelay: "600ms" }}>
              ceremonies witnessed
            </p>
          </div>

          {/* Witness Moment Cards — gold left-rule + corner brackets on hover */}
          <div className={cn("mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700", isVisible ? "opacity-100" : "opacity-0")} style={{ transitionDelay: "800ms" }}>
            {witnessedMoments.map((moment, index) => (
              <div 
                key={index}
                className={cn(
                  "group relative p-6 transition-all duration-[400ms]",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  transitionDelay: `${1000 + index * 100}ms`,
                  borderLeft: "2px solid transparent",
                  borderImage: hoveredIndex === index
                    ? "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.15)) 1"
                    : "linear-gradient(180deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05)) 1",
                  background: hoveredIndex === index 
                    ? 'linear-gradient(135deg, hsl(var(--rich-black)) 0%, hsl(var(--ebon-charcoal) / 0.4) 100%)'
                    : 'transparent',
                  boxShadow: hoveredIndex === index
                    ? '0 0 24px hsl(var(--vow-yellow) / 0.08), inset 0 1px 0 hsl(var(--vow-yellow) / 0.05)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  e.currentTarget.style.transition = 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  setHoveredIndex(null);
                  e.currentTarget.style.transition = 'transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Frame index */}
                <span
                  className="absolute top-2 right-3 text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none select-none motion-reduce:hidden"
                  style={{ color: "hsl(var(--vow-yellow))" }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div 
                  className="w-1.5 h-1.5 rounded-full mb-3"
                  style={{
                    background: 'hsl(var(--vow-yellow))',
                    boxShadow: '0 0 12px hsl(var(--vow-yellow) / 0.4)',
                    animation: 'vigil-pulse 4s ease-in-out infinite',
                    animationDelay: `${index * 0.3}s`
                  }}
                />
                <p className="text-sm text-muted-foreground leading-relaxed">{moment}</p>
              </div>
            ))}
          </div>

          <div className={cn("text-center mt-16 transition-all duration-700", isVisible ? "opacity-100" : "opacity-0")} style={{ transitionDelay: "1700ms" }}>
            <div className="h-px w-24 mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
            <p className="font-display text-xl text-center text-foreground italic">Every one of them heard clearly.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} aria-hidden="true" />
    </section>
  );
}
