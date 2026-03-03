import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import crossoverDance from "@/assets/crossover-dance-ai.jpg";

export function CrossOver() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      id="the-crossing"
      ref={sectionRef}
      role="region"
      aria-label="Final call to action"
      className="section--dark section-grain piano-section-target py-[80px] md:py-[120px] px-4 md:px-6 lg:px-8 relative overflow-hidden min-h-[50vh] md:min-h-[60vh]"
      style={{
        background: "radial-gradient(ellipse at center, hsl(240 12% 5%) 0%, hsl(240 9% 2%) 100%)",
      }}
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={crossoverDance}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.10] pointer-events-none"
          style={{
            animation: 'crossover-ken-burns 30s ease-in-out infinite alternate',
            filter: 'brightness(0.75) contrast(1.08) saturate(0.9)',
            willChange: 'transform',
          }}
          loading="lazy"
        />
      </div>

      {/* Floating particle dust */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle 400px at 35% 35%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 100%)",
          animation: "crossover-dust 20s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />
      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 2% / 0.75) 100%)"
        }}
        aria-hidden="true"
      />
      {/* Warm fog layer */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      {/* Film grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none z-[1]" aria-hidden="true" />

      {/* Top fade from TheWitnesses warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent 0%, hsl(240 9% 3% / 0.5) 40%, hsl(240 9% 2%) 100%)', height: '160px' }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        {/* Tagline with semicolon heartbeat */}
        <div
          className={cn(
            "mb-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
        >
          <p 
            className="text-xl md:text-2xl uppercase tracking-[0.18em] font-display font-light text-foreground/70"
            style={{ textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)' }}
          >
            {"\u2018"}TIL DEATH{" "}
            <span
              className="text-primary inline-block text-2xl md:text-3xl"
              style={{
                animation: isVisible ? "semicolon-heartbeat 2s ease-in-out infinite" : undefined,
              }}
            >
              ;
            </span>
            {" "}UNTO LIFE
          </p>
        </div>

        {/* Sacred Quote */}
        <h2
          className={cn(
            "text-[clamp(32px,5vw,48px)] font-display font-normal leading-[1.15] mb-14 text-foreground max-w-2xl mx-auto tracking-[0.02em] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any, textShadow: '0 2px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2)' }}
        >
          <span className="font-light text-foreground/80">{"\u201C"}</span>Your vows deserve to be heard.<span className="font-light text-foreground/80">{"\u201D"}</span>
        </h2>

        {/* CTA Stack */}
        <div
          className={cn(
            "flex flex-col items-center mb-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
        >
          <div className="relative">
            {/* Ambient radial glow behind CTA */}
            <div
              className="absolute inset-0 -inset-x-10 -inset-y-5 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.10) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <Button 
              size="lg" 
              className="relative text-base px-10 py-5 h-auto cta-commitment cta-breathe-glow"
              asChild
            >
              <Link to="/contact" className="font-sans tracking-[0.02em]">Hold my date.</Link>
            </Button>
          </div>
        </div>

        {/* Trust Anchor */}
        <p
          className={cn(
            "text-sm font-sans text-foreground/50 leading-relaxed max-w-md mx-auto mb-10 tracking-[0.01em] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "420ms" : "0ms" }}
        >
          Includes sound documentation, microphone setup, and your ceremony run-of-show.
        </p>

        {/* Golden thread above commitment */}
        <div 
          className={cn(
            "h-[1px] w-12 mx-auto mb-8 transition-all duration-700",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.15)',
            transitionDelay: isVisible ? "560ms" : "0ms",
          }}
          aria-hidden="true"
        />

        {/* Commitment Statement */}
        <p
          className={cn(
            "text-lg font-display font-light text-foreground/70 italic tracking-[0.02em] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "700ms" : "0ms", textShadow: '0 1px 16px rgba(0, 0, 0, 0.35)' }}
        >
          Response within 24 hours.{" "}<span className="text-primary font-normal not-italic tracking-[0.04em]">Always.</span>
        </p>
      </div>

      {/* Bottom fade into Footer dark */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 2%))', height: '80px' }}
        aria-hidden="true"
      />
    </section>
  );
}
