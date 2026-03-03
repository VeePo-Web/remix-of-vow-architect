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
      className="section--dark section-grain piano-section-target relative overflow-hidden min-h-[50vh] md:min-h-[60vh] py-[80px] md:py-[120px] px-4 md:px-6 lg:px-8"
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
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(circle 400px at 35% 35%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 100%)",
          animation: "crossover-dust 20s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Vignette Effect (static base) */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 2% / 0.75) 100%)"
        }}
        aria-hidden="true"
      />

      {/* 10b: Breathing vignette overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none crossover-vignette-breathe"
        style={{
          background: "radial-gradient(ellipse at center, transparent 25%, hsl(240 9% 2% / 0.85) 100%)",
          animation: "crossover-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* 10a: Dual-origin warm fog — primary (lower-center) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 70%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 100%)",
          animation: "crossover-dust 20s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />
      {/* 10a: Dual-origin warm fog — secondary (upper-left) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 40% at 30% 25%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 100%)",
          animation: "crossover-dust 28s ease-in-out infinite alternate-reverse",
        }}
        aria-hidden="true"
      />

      {/* 10d: Ambient particle mote A */}
      <div
        className="absolute z-[1] pointer-events-none crossover-mote"
        style={{
          width: '200px',
          height: '200px',
          top: '30%',
          left: '20%',
          background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.02) 0%, transparent 70%)",
          animation: "crossover-mote-a 14s ease-in-out infinite",
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      {/* 10d: Ambient particle mote B */}
      <div
        className="absolute z-[1] pointer-events-none crossover-mote"
        style={{
          width: '200px',
          height: '200px',
          bottom: '25%',
          right: '15%',
          background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.02) 0%, transparent 70%)",
          animation: "crossover-mote-b 22s ease-in-out infinite",
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 z-[1] grain opacity-[0.08] pointer-events-none" aria-hidden="true" />

      {/* Top fade from TheWitnesses warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent 0%, hsl(240 9% 3% / 0.5) 40%, hsl(240 9% 2%) 100%)', height: '160px' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Screen reader narrative */}
        <span className="sr-only">This is the final invitation to hold your wedding date. Parker responds within 24 hours.</span>

        {/* 10c: Vertical golden thread above tagline */}
        <div
          className={cn(
            "mx-auto mb-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ width: '1px', height: '40px' }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
              animation: "crossover-dust 4s ease-in-out infinite alternate",
              opacity: 0.25,
            }}
          />
        </div>

        {/* Tagline with semicolon heartbeat */}
        <div
          className={cn(
            "mb-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
        >
          <p 
            className="font-display font-light text-xl md:text-2xl uppercase tracking-[0.18em] text-foreground/70"
            style={{ textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)' }}
          >
            {"\u2018"}TIL DEATH{" "}
            <span
              className="inline-block text-2xl md:text-3xl text-primary"
              style={{
                animation: isVisible ? "semicolon-heartbeat 2s ease-in-out infinite" : undefined,
              }}
            >
              ;
            </span>
            {" "}UNTO LIFE
          </p>
        </div>

        {/* Sacred Quote — 10f: triple text shadow */}
        <h2
          className={cn(
            "max-w-2xl mx-auto mb-14 font-display font-normal text-[clamp(32px,5vw,48px)] leading-[1.15] tracking-[0.02em] text-foreground transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any, textShadow: '0 1px 3px rgba(0, 0, 0, 0.6), 0 2px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2)' }}
        >
          <span className="font-light text-foreground/80">{"\u201C"}</span>Let your ceremony sound like what your hearts feel like.<span className="font-light text-foreground/80">{"\u201D"}</span>
        </h2>

        {/* CTA Stack — 10e: dual-layer glow pool */}
        <div
          className={cn(
            "flex flex-col items-center mb-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
        >
          <div className="relative">
            {/* 10e: Outer halo glow */}
            <div
              className="absolute -inset-x-16 -inset-y-8 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.05) 0%, transparent 80%)',
              }}
              aria-hidden="true"
            />
            {/* 10e: Inner core glow */}
            <div
              className="absolute -inset-x-10 -inset-y-5 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.12) 0%, transparent 40%)',
              }}
              aria-hidden="true"
            />
            <Button 
              size="lg" 
              className="relative h-auto px-10 py-5 text-base cta-commitment cta-breathe-glow"
              asChild
            >
              <Link to="/contact" className="font-sans tracking-[0.02em]">Hold my date.</Link>
            </Button>
          </div>
        </div>

        {/* Trust Anchor */}
        <p
          className={cn(
            "max-w-md mx-auto mb-10 font-sans text-sm leading-relaxed tracking-[0.01em] text-foreground/50 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "420ms" : "0ms" }}
        >
          Includes your bespoke ceremony arrangement, a collaborative run-of-show, and months of devoted preparation.
        </p>

        {/* 10g: Golden thread with enhanced glow bloom */}
        <div 
          className={cn(
            "h-[1px] w-12 mx-auto mb-8 transition-all duration-700",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.2), 0 0 20px hsl(var(--vow-yellow) / 0.08)',
            transitionDelay: isVisible ? "560ms" : "0ms",
          }}
          aria-hidden="true"
        />

        {/* Commitment Statement — 10f: triple text shadow */}
        <p
          className={cn(
            "font-display font-light text-lg italic tracking-[0.02em] text-foreground/70 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "700ms" : "0ms", textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 1px 16px rgba(0, 0, 0, 0.35)' }}
        >
          Response within 24 hours.{" "}<span className="font-normal not-italic tracking-[0.04em] text-primary">Always.</span>
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
