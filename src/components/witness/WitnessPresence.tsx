import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * THE PRESENCE — 200+ Ceremonies Witnessed
 * Large proclamation number with floating "witness moments"
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
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[120px] px-4 bg-background overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            THE PRESENCE
          </p>

          {/* The Big Number */}
          <div className="relative">
            {/* Background glow */}
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

            {/* Number */}
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
                200
              </span>
              <span className="font-display text-[clamp(40px,8vw,80px)] font-light text-primary align-top">+</span>
            </div>

            {/* Subtitle */}
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

          {/* Floating Witness Moments */}
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
                  "p-6 rounded-lg border border-border/20 bg-card/30 transition-all duration-500 hover:border-primary/30 hover:bg-card/50",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${900 + index * 100}ms` }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{moment}"
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
    </section>
  );
}
