import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import aboutPresenceImg from "@/assets/about-presence.jpg";

/**
 * THE PRESENCE — 500+ Events Performed
 * Large proclamation number with atmospheric background and floating witness moments
 */

const witnessedMoments = [
  "The bride who forgot her vows and winged it beautifully",
  "The groom who cried before he could say 'I do'",
  "The ring bearer who dropped the rings—twice",
  "The officiant who lost their place and laughed",
  "The wind that tried to steal every word",
  "The sunset that made everyone cry",
];

export function WitnessPresence() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      id="witness-presence"
      ref={ref as React.RefObject<HTMLElement>}
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
            willChange: "transform",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" style={{ willChange: "opacity" }} aria-hidden="true" />

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
              "text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            THE PRESENCE
          </p>

          {/* Golden rule separator */}
          <div className="w-12 h-px mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)" }} />

          {/* The Big Number */}
          <div className="relative">
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-1000",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              <div 
                className="w-96 h-96 rounded-full"
                style={{ 
                  background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.05) 0%, transparent 70%)" 
                }}
              />
            </div>

            <div 
              className={cn(
                "relative text-center transition-all duration-1000",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <span 
                className="font-display text-[clamp(100px,20vw,200px)] font-light text-foreground leading-none"
                style={{ 
                  textShadow: "0 0 80px hsl(var(--vow-yellow) / 0.2)"
                }}
              >
                500
              </span>
              <span className="font-display text-[clamp(40px,8vw,80px)] font-light text-primary align-top">+</span>
            </div>

            <p 
              className={cn(
                "font-display text-[clamp(20px,3vw,32px)] font-light text-center text-muted-foreground mt-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "500ms" }}
            >
              events performed
            </p>
          </div>

          {/* Floating Witness Moments — elevated frosted glass cards */}
          <div 
            className={cn(
              "mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "700ms" }}
          >
            {witnessedMoments.map((moment, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-lg border border-primary/[0.08] backdrop-blur-[12px] transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_24px_rgba(255,224,138,0.06)]",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  transitionDelay: `${900 + index * 100}ms`,
                  background: "hsl(var(--card) / 0.3)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.15)",
                }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {moment}
                </p>
              </div>
            ))}
          </div>

          {/* Closing statement */}
          <p 
            className={cn(
              "text-center text-muted-foreground mt-12 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1500ms" }}
          >
            Every one of them heard clearly.
          </p>
        </div>
      </div>

      {/* Section fade bottom → Covenant */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--surface)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
