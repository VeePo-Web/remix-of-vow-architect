import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import crossoverImg from "@/assets/crossover-dance.jpg";

/**
 * THE CROSSING — Final CTA
 * Deep dark section with atmospheric background, warm golden glow CTA
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
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${crossoverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, hsl(240 12% 6%) 80%)"
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, hsl(var(--vow-yellow)) 0%, transparent 60%)"
        }}
        aria-hidden="true"
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

          {/* CTA Button with breathing glow */}
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
                className="px-10 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 cta-breathe"
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
