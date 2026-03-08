import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import crossingImg from "@/assets/witness-crossing-ai.jpg";

/**
 * THE CROSSING — Final CTA
 * Deep dark section with atmospheric background, warm golden glow CTA
 */
export function WitnessCrossing() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      id="witness-crossing"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 overflow-hidden piano-section-target"
      style={{
        background: "linear-gradient(180deg, hsl(var(--rich-black)) 0%, hsl(var(--deep-graphite)) 100%)"
      }}
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `url(${crossingImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns 30s ease-in-out infinite alternate",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, hsl(var(--deep-graphite)) 80%)"
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

      {/* Warm fog */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)"
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 transition-all duration-700",
              isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            THE CROSSING
          </p>

          {/* Headline */}
          <h2 
            className={cn(
              "font-display text-[clamp(28px,4vw,44px)] font-light text-foreground leading-tight mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Your ceremony deserves a witness.
          </h2>

          {/* Subtext */}
          <p 
            className={cn(
              "text-lg text-muted-foreground mb-10 transition-all duration-700",
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
              "relative inline-block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "600ms" }}
          >
            {/* Breathing halo behind button */}
            <div 
              className="absolute inset-0 -inset-x-4 -inset-y-3 rounded-lg pointer-events-none motion-reduce:hidden"
              style={{
                background: "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.12) 0%, transparent 70%)",
                animation: "vigil-pulse 4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <Button asChild size="lg" variant="primary-dark" className="relative">
              <Link to="/contact">Hold my date</Link>
            </Button>
          </div>

          {/* Promise */}
          <p 
            className={cn(
              "text-sm text-muted-foreground mt-8 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "800ms" }}
          >
            Response within 24 hours. Always.
          </p>

          {/* Golden gradient thread (replaces hard border) */}
          <div 
            className={cn(
              "mt-16 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1000ms" }}
          >
            <div 
              className="h-[1px] w-full mb-8"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)" }}
            />
            <p className="font-display text-xl text-foreground italic">
              'Til Death<span className="text-primary not-italic">;</span> Unto Life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
