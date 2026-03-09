import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";
import aboutPresenceImg from "@/assets/about-presence.jpg";

/**
 * THE PRESENCE — 500+ Events Performed
 * Large proclamation number with atmospheric background and floating witness moments
 */

const witnessedMoments = [
  "The bride who forgot her vows—and spoke from the heart instead",
  "The groom who cried before he could say 'I do'",
  "The father who couldn't finish his toast",
  "The grandmother who heard every word from the last row",
  "The wind that tried to steal every word",
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
      {/* Background image — overflow-hidden wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `url(${aboutPresenceImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns 30s ease-in-out infinite alternate",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 80%)"
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] ml-[0.15em] text-center mb-4 transition-all duration-700",
              isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            THE PRESENCE
          </p>

          {/* Golden rule separator */}
          <div className="w-12 h-px mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)" }} />

          {/* The Big Number */}
          <div className="relative">
            {/* Larger ambient glow */}
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-1000",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              <div 
                className="w-[500px] h-[500px] rounded-full motion-reduce:hidden"
                style={{ 
                  background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.08) 0%, hsl(var(--vow-yellow) / 0.03) 40%, transparent 70%)" 
                }}
              />
            </div>

            <div 
              className={cn(
                "relative text-center transition-all duration-1000",
                isVisible ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-95 blur-sm"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <span 
                className="font-display text-[clamp(100px,20vw,200px)] font-light text-foreground leading-none"
                style={{ 
                  textShadow: "0 2px 4px hsl(var(--rich-black) / 0.3), 0 0 80px hsl(var(--vow-yellow) / 0.15), 0 0 160px hsl(var(--vow-yellow) / 0.08)"
                }}
              >
                500
              </span>
              <span 
                className="font-display text-[clamp(40px,8vw,80px)] font-light text-primary align-top"
                style={{
                  textShadow: "0 0 40px hsl(var(--vow-yellow) / 0.3)"
                }}
              >
                +
              </span>
            </div>

            <p 
              className={cn(
                "font-display text-[clamp(20px,3vw,32px)] font-light text-center text-muted-foreground mt-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "500ms" }}
            >
              ceremonies witnessed
            </p>
          </div>

          {/* Floating Witness Moments — editorial italic text, no heavy card styling */}
          <div 
            className={cn(
              "mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "700ms" }}
          >
            {witnessedMoments.map((moment, index) => (
              <div 
                key={index}
                className={cn(
                  "py-5 px-6 border-l border-primary/15 transition-all duration-[180ms] hover:border-primary/30",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  transitionDelay: `${900 + index * 100}ms`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 24px hsl(var(--vow-yellow) / 0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {moment}
                </p>
              </div>
            ))}
          </div>

          {/* Closing statement — upgraded typography with golden thread */}
          <div 
            className={cn("text-center",
              "mt-16 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1500ms" }}
          >
            <div 
              className="h-px w-24 mx-auto mb-8"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }}
            />
            <p className="font-display text-xl text-center text-foreground italic">
              Every one of them heard clearly.
            </p>
          </div>
        </div>
      </div>

      {/* Section fade bottom → Covenant */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
