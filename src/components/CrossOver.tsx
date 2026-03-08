import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import crossoverDance from "@/assets/crossover-dance-ai.jpg";

/* 15-B: Sacred quote words for micro-stagger */
const QUOTE_WORDS = [
  "Let", "your", "ceremony", "sound", "like",
  "what", "your", "hearts", "feel", "like."
];

export function CrossOver() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });
  const warmthRef = useRef<HTMLDivElement>(null);

  /* 15-A: Scroll-linked warmth shift via IntersectionObserver thresholds */
  const sectionElRef = useRef<HTMLElement | null>(null);

  const setCombinedRef = useCallback((node: HTMLElement | null) => {
    sectionElRef.current = node;
    // Forward to useScrollReveal ref
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [sectionRef]);

  useEffect(() => {
    const el = sectionElRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.style.setProperty('--crossing-warmth', '0.04');
      return;
    }

    const thresholds = [0, 0.25, 0.5, 0.75, 1.0];
    const warmthMap: Record<number, string> = {
      0: '0.02', 0.25: '0.03', 0.5: '0.04', 0.75: '0.05', 1.0: '0.06',
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Find the closest threshold
          let closest = 0;
          for (const t of thresholds) {
            if (entry.intersectionRatio >= t) closest = t;
          }
          el.style.setProperty('--crossing-warmth', warmthMap[closest]);
        });
      },
      { threshold: thresholds }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="the-crossing"
      ref={setCombinedRef}
      role="region"
      aria-label="Final call to action"
      className="section--dark section-grain piano-section-target relative overflow-hidden min-h-[50vh] md:min-h-[60vh] py-[80px] md:py-[120px] px-4 md:px-6 lg:px-8"
      style={{
        background: "radial-gradient(ellipse at center, hsl(var(--deep-graphite)) 0%, hsl(var(--rich-black)) 100%)",
        '--crossing-warmth': '0.02',
      } as React.CSSProperties}
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
          }}
          loading="lazy"
          decoding="async"
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
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black) / 0.75) 100%)"
        }}
        aria-hidden="true"
      />

      {/* 10b: Breathing vignette overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none crossover-vignette-breathe"
        style={{
          background: "radial-gradient(ellipse at center, transparent 25%, hsl(var(--rich-black) / 0.85) 100%)",
          animation: "crossover-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* 15-A: Scroll-linked warm fog — opacity driven by --crossing-warmth */}
      <div
        ref={warmthRef}
        className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 60%, hsl(var(--vow-yellow) / var(--crossing-warmth)) 0%, transparent 100%)",
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
          width: '200px', height: '200px', top: '30%', left: '20%',
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
          width: '200px', height: '200px', bottom: '25%', right: '15%',
          background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.02) 0%, transparent 70%)",
          animation: "crossover-mote-b 22s ease-in-out infinite",
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 z-[1] grain opacity-[0.08] pointer-events-none" aria-hidden="true" />

      {/* 13b: Warm-to-cold intermediate layer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 30% at 50% 0%, hsl(35 40% 50% / 0.04) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* 13d: Top-edge vignette darkening */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--rich-black) / 0.4) 0%, transparent 25%)" }}
        aria-hidden="true"
      />

      {/* 13e: Ambient entry glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* 13a: Extended top fade */}
      <div
        className="section-fade-top"
        style={{
          background: 'linear-gradient(to top, transparent 0%, hsl(240 9% 4% / 0.3) 20%, hsl(240 9% 3% / 0.6) 45%, hsl(240 9% 2% / 0.85) 70%, hsl(240 9% 2%) 100%)',
          height: '240px',
        }}
        aria-hidden="true"
      />

      {/* 13c: Threshold golden thread */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-[2] transition-transform duration-700",
          isVisible ? "scale-x-100" : "scale-x-0"
        )}
        style={{
          top: '240px', width: '80px', height: '1px',
          background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
          boxShadow: '0 0 12px hsl(var(--vow-yellow) / 0.1)',
          animation: 'crossover-threshold-breathe 4s ease-in-out infinite',
          transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Screen reader narrative */}
        <span className="sr-only">This is the final invitation to hold your wedding date. Parker responds within 24 hours.</span>

        {/* 10c: Vertical golden thread above tagline */}
        <div
          className={cn(
            "mx-auto mb-fitz-6 transition-all duration-700",
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
            "mb-fitz-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
        >
          <p 
            className="font-display font-light text-[28px] md:text-[34px] uppercase tracking-[0.22em] text-foreground/70"
            role="text"
            style={{ textShadow: '0 1px 12px hsl(var(--rich-black) / 0.3)' }}
          >
            {"\u2018"}TIL DEATH{" "}
            <span
              className="inline-block text-[34px] md:text-[40px] text-primary"
              style={{
                animation: isVisible ? "semicolon-heartbeat 2s ease-in-out infinite" : undefined,
              }}
            >
              ;
            </span>
            {" "}UNTO LIFE
          </p>
        </div>

        {/* 15-B: Sacred Quote — word-level micro-stagger */}
        <h2
          className="max-w-[720px] mx-auto mb-14 font-display font-light text-[clamp(32px,5vw,48px)] leading-[1.2] tracking-[0.02em] text-foreground"
          style={{ textWrap: "balance" as any, textShadow: '0 1px 3px hsl(var(--rich-black) / 0.6), 0 2px 20px hsl(var(--rich-black) / 0.4), 0 0 40px hsl(var(--rich-black) / 0.2)' }}
        >
          {/* Opening curly quote attached to first word */}
          <span
            className={cn(
              "inline transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[6px]"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            <span className="font-light text-foreground/40 text-[0.8em] align-top -mr-[0.05em]">{"\u201C"}</span>
          </span>
          {QUOTE_WORDS.map((word, i) => {
            const isLast = i === QUOTE_WORDS.length - 1;
            const delay = 150 + i * 60; // 150ms base + 60ms per word
            return (
              <span key={i}>
                <span
                  className={cn(
                    "inline-block transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[6px]"
                  )}
                  style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
                >
                  {word}
                  {isLast && <span className="font-light text-foreground/40 text-[0.8em]">{"\u201D"}</span>}
                </span>
                {!isLast && " "}
              </span>
            );
          })}
        </h2>

        {/* CTA Stack — 10e: dual-layer glow pool */}
        <div
          className={cn(
            "flex flex-col items-center mb-fitz-5 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
        >
          <div className="relative">
            {/* 10e: Outer halo glow */}
            <div
              className="absolute -inset-x-16 -inset-y-8 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.05) 0%, transparent 80%)' }}
              aria-hidden="true"
            />
            {/* 10e: Inner core glow */}
            <div
              className="absolute -inset-x-10 -inset-y-5 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.12) 0%, transparent 40%)' }}
              aria-hidden="true"
            />
            <Button 
              size="lg" 
              className="relative h-auto px-10 py-5 text-base rounded-[6px] font-sans font-medium cta-commitment cta-breathe-glow crossing-cta-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(240_9%_2%)]"
              asChild
            >
              <Link to="/contact" aria-describedby="crossing-trust-anchor" className="tracking-[0.02em]">Hold my date.</Link>
            </Button>
          </div>
        </div>

        {/* Trust Anchor */}
        <p
          id="crossing-trust-anchor"
          className={cn(
            "max-w-md mx-auto mb-fitz-6 font-sans text-sm leading-normal text-center text-foreground/50 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "420ms" : "0ms" }}
        >
          Includes your bespoke ceremony arrangement, a collaborative run-of-show, and months of devoted preparation.
        </p>

        {/* 10g: Golden thread with enhanced glow bloom */}
        <div 
          className={cn(
            "h-[1px] w-12 mx-auto mb-fitz-5 transition-all duration-700",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.2), 0 0 20px hsl(var(--vow-yellow) / 0.08)',
            transitionDelay: isVisible ? "560ms" : "0ms",
          }}
          aria-hidden="true"
        />

        {/* 15-D: Commitment Statement with "Always." underline reveal */}
        <p
          className={cn(
            "font-display font-light text-lg italic tracking-[0.02em] text-center text-foreground/70 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
          )}
          style={{ transitionDelay: isVisible ? "700ms" : "0ms", textShadow: '0 1px 2px hsl(var(--rich-black) / 0.5), 0 1px 16px hsl(var(--rich-black) / 0.35)' }}
        >
          Response within 24 hours.{" "}
          <span className="relative inline-block font-normal not-italic tracking-[0.03em] text-primary">
            Always.
            {/* Vow underline — draws left-to-right, 450ms, sacred easing */}
            <span
              className={cn(
                "absolute -bottom-[3px] left-0 w-full h-[1px] origin-left transition-transform duration-[450ms]",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "hsl(var(--vow-yellow) / 0.5)",
                transitionDelay: isVisible ? "1400ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
              aria-hidden="true"
            />
          </span>
        </p>

        {/* 15-E: Closing golden dot — the period at the end of the sacred sentence */}
        <div
          className={cn(
            "mt-fitz-7 flex justify-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[6px]"
          )}
          style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
          aria-hidden="true"
        >
          <div
            className="crossing-golden-dot"
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'hsl(var(--vow-yellow) / 0.3)',
              boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15), 0 0 16px hsl(var(--vow-yellow) / 0.08), 0 0 30px hsl(var(--vow-yellow) / 0.04)',
            }}
          />
        </div>
      </div>

      {/* 14d: Bottom vignette floor */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 85%, hsl(var(--rich-black) / 0.3) 100%)" }}
        aria-hidden="true"
      />

      {/* 14c: Residual warmth bleed */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 30% at 50% 100%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* 14b: Bottom golden thread */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-[2] transition-transform duration-700",
          isVisible ? "scale-x-100" : "scale-x-0"
        )}
        style={{
          bottom: '120px', width: '60px', height: '1px',
          background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
          boxShadow: '0 0 12px hsl(var(--vow-yellow) / 0.1)',
          animation: 'crossover-threshold-breathe 6s ease-in-out infinite',
          transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
        aria-hidden="true"
      />

      {/* 14a: Extended bottom fade */}
      <div
        className="section-fade-bottom"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--rich-black) / 0.4) 30%, hsl(var(--rich-black) / 0.8) 65%, hsl(var(--rich-black)) 100%)',
          height: '120px',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
