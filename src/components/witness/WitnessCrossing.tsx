import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * THE CROSSING — Final CTA
 * Deep dark section with warm golden glow CTA
 * "Response within 24 hours. Always."
 */
export function WitnessCrossing() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--rich-black)) 0%, hsl(240 12% 6%) 100%)"
      }}
    >
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, hsl(var(--vow-yellow)) 0%, transparent 60%)"
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            THE CROSSING
          </p>

          {/* Headline */}
          <h2 
            className={cn(
              "font-display text-[clamp(28px,4vw,44px)] font-light text-white leading-tight mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Ready to be witnessed?
          </h2>

          {/* Subtext */}
          <p 
            className={cn(
              "text-lg text-white/60 mb-10 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            Tell me your date, your venue, and the feeling you want to capture.<br />
            I'll show you exactly how I'll carry your vows.
          </p>

          {/* CTA Button */}
          <div 
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "600ms" }}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="px-10 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                style={{
                  boxShadow: "0 0 40px hsl(var(--vow-yellow) / 0.3)"
                }}
              >
                Hold my date
              </Button>
            </Link>
          </div>

          {/* Promise */}
          <p 
            className={cn(
              "text-sm text-white/40 mt-8 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "800ms" }}
          >
            Response within 24 hours. Always.
          </p>

          {/* Tagline */}
          <div 
            className={cn(
              "mt-16 pt-8 border-t border-white/10 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1000ms" }}
          >
            <p className="font-display text-xl text-white/80 italic">
              'Til Death<span className="text-primary">;</span> Unto Life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
