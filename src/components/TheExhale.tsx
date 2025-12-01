import { useEffect, useRef, useState } from 'react';

/**
 * THE EXHALE — The Sacred Declaration
 * 
 * Position: Immediately after hero
 * Purpose: Create emotional recognition, then declare singular purpose
 * Principle: "Make them feel before they think" (Fantasy.co)
 * 
 * Narrative Arc:
 * ACT I — Recognition (their promise)
 * ACT II — The Pivot (golden thread threshold)
 * ACT III — Declaration (my promise to them)
 */
export function TheExhale() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [purposeVisible, setPurposeVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setPurposeVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Delay purpose reveal for dramatic effect
            setTimeout(() => setPurposeVisible(true), 1400);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-40px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
      aria-label="My promise to you"
      role="region"
    >
      {/* Ambient warm glow - intensifies as section reveals */}
      <div 
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-1000
          ${purposeVisible ? 'opacity-100' : 'opacity-60'}
        `}
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 55%, hsl(var(--vow-yellow) / ${purposeVisible ? '0.05' : '0.03'}) 0%, transparent 70%)`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-[680px] mx-auto px-6 text-center">
        
        {/* ═══════════════════════════════════════
            ACT I — THE RECOGNITION
            ═══════════════════════════════════════ */}
        
        {/* Layer 1: Golden Dot Anchor */}
        <div 
          className={`
            exhale-anchor mx-auto mb-10 md:mb-12
            transition-all duration-700
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
          style={{ 
            transitionDelay: isVisible ? '200ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Recognition Statement */}
        <p 
          className={`
            font-serif leading-snug tracking-tight text-foreground/90
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ 
            transitionDelay: isVisible ? '400ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
            fontSize: 'clamp(24px, 4.5vw, 36px)',
            maxWidth: '18ch',
            margin: '0 auto',
          }}
        >
          You're about to make a promise that will echo beyond your lifetime.
        </p>

        {/* Layer 3: Understanding Statement */}
        <p 
          className={`
            font-sans leading-relaxed text-muted-foreground
            mt-6 md:mt-8
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
          `}
          style={{ 
            transitionDelay: isVisible ? '800ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
            fontSize: 'clamp(16px, 2.5vw, 18px)',
          }}
        >
          I understand the weight of that moment.
        </p>

        {/* ═══════════════════════════════════════
            ACT II — THE PIVOT
            ═══════════════════════════════════════ */}
        
        {/* Layer 4: Golden Thread */}
        <div 
          className={`
            exhale-thread mx-auto my-12 md:my-16
            ${purposeVisible ? 'exhale-thread--visible' : ''}
          `}
          style={{
            width: 'clamp(120px, 25vw, 200px)',
          }}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════
            ACT III — THE DECLARATION
            ═══════════════════════════════════════ */}
        
        {/* Layer 5: Goal Declaration */}
        <p 
          className={`
            font-sans uppercase tracking-[0.22em] text-muted-foreground/80
            transition-all duration-700
            ${purposeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
          `}
          style={{ 
            transitionDelay: purposeVisible ? '800ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
            fontSize: 'clamp(11px, 1.5vw, 14px)',
          }}
        >
          And so I have one goal:
        </p>

        {/* Layer 6: Singular Purpose */}
        <p 
          className={`
            font-serif leading-relaxed text-foreground
            mt-6 md:mt-8
            transition-all duration-700
            ${purposeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ 
            transitionDelay: purposeVisible ? '1200ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            lineHeight: 1.6,
            maxWidth: '24ch',
            margin: '0 auto',
            marginTop: 'clamp(24px, 4vw, 32px)',
          }}
        >
          To let my music{' '}
          <span className={`exhale-emphasis ${purposeVisible ? 'exhale-emphasis--visible' : ''}`}>
            sound
          </span>{' '}
          like
          <br />
          what your hearts feel like.
        </p>

        {/* Screen reader context */}
        <span className="sr-only">
          This section acknowledges the sacred significance of your upcoming wedding ceremony
          and declares my singular purpose: to let my music reflect what your hearts feel.
        </span>
      </div>
    </section>
  );
}
