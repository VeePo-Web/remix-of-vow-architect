import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import crossoverDance from "@/assets/crossover-dance-ai.jpg";

export function CrossOver() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="section--dark section-grain py-24 px-4 relative overflow-hidden min-h-[400px]"
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
            filter: 'saturate(0.5) contrast(1.1)',
            willChange: 'transform',
          }}
          loading="lazy"
        />
      </div>

      {/* Floating particle dust */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 300px at 30% 40%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 100%)",
          animation: "crossover-dust 20s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />
      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 9% 2% / 0.6) 100%)"
        }}
        aria-hidden="true"
      />
      {/* Warm fog layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      {/* Top fade from TheWitnesses warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Step 10: Tagline with semicolon heartbeat */}
        <div
          className={cn(
            "mb-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <p 
            className="text-[clamp(16px,2vw,20px)] uppercase tracking-[0.4em] font-display font-light text-foreground/80"
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 2px rgba(255,224,138,0.15)"
            }}
          >
            {"\u2018"}TIL DEATH{" "}
            <span
              className="text-primary inline-block"
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
            "text-[clamp(32px,5vw,56px)] font-display font-light leading-tight mb-12 text-foreground max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any }}
        >
          {"\u201C"}Your vows deserve<br />to be heard.{"\u201D"}
        </h2>

        {/* CTA Stack */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
        >
          <div className="relative">
            {/* Ambient radial glow behind CTA */}
            <div
              className="absolute inset-0 -inset-x-12 -inset-y-6 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.10) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <Button 
              size="lg" 
              variant="primary-dark" 
              className="relative text-base px-8 py-6 h-auto cta-commitment cta-breathe-glow"
              asChild
            >
              <Link to="/contact">Hold my date →</Link>
            </Button>
          </div>
        </div>

        {/* Trust Anchor */}
        <p
          className={cn(
            "text-sm text-foreground/50 mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
        >
          Includes sound documentation, microphone setup, and your ceremony run-of-show.
        </p>

        {/* Step 11: Golden thread above commitment */}
        <div 
          className={cn(
            "h-[1px] w-8 mx-auto mb-8 transition-all duration-700",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            transitionDelay: isVisible ? "600ms" : "0ms",
          }}
          aria-hidden="true"
        />

        {/* Step 11: Commitment Statement with ceremony */}
        <p
          className={cn(
            "text-lg font-display font-light text-foreground/90 italic transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "750ms" : "0ms", letterSpacing: "0.03em" }}
        >
          Response within <span className="text-primary font-normal not-italic text-xl">24 hours</span>. Always.
        </p>
      </div>

      {/* Bottom fade into Footer dark */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
