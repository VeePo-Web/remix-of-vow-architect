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
 * 
 * Swedish Principles Applied:
 * - Lagom: Every element justified, nothing superfluous
 * - Funktionalism: Animations serve emotional purpose
 * - Light & Shadow: Glow evolution mimics natural dawn
 * - Silence: Generous spacing, whispered transitions
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
            // Sacred pause before declaration — the held breath
            setTimeout(() => setPurposeVisible(true), 1600);
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
      className="exhale-section relative min-h-[70vh] flex items-center justify-center py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ minHeight: '70vh' }}
      aria-label="My promise to you"
      role="region"
    >
      {/* Layer 0: Depth gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            hsl(var(--rich-black)) 0%, 
            hsl(var(--ebon-charcoal)) 50%, 
            hsl(var(--rich-black)) 100%
          )`,
        }}
      />

      {/* Layer 1: Inner core glow — immediate, concentrated */}
      <div 
        className={`
          absolute inset-0 pointer-events-none transition-opacity
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `radial-gradient(ellipse 40% 35% at 50% 55%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)`,
          transitionDuration: '800ms',
          transitionTimingFunction: 'var(--ease-sacred)',
        }}
      />

      {/* Layer 2: Outer bloom glow — delayed, expansive */}
      <div 
        className={`
          absolute inset-0 pointer-events-none transition-opacity
          ${purposeVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 55%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)`,
          transitionDuration: '1400ms',
          transitionDelay: purposeVisible ? '400ms' : '0ms',
          transitionTimingFunction: 'var(--ease-exhale)',
        }}
      />

      {/* Content container with subtle parallax feel */}
      <div className="relative z-10 max-w-[680px] mx-auto px-6 text-center">
        
        {/* ═══════════════════════════════════════
            ACT I — THE RECOGNITION
            ═══════════════════════════════════════ */}
        
        {/* Golden Dot Anchor — heartbeat of the section */}
        <div 
          className={`
            exhale-anchor mx-auto mb-10 md:mb-12
            transition-all
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
          style={{ 
            transitionDuration: '700ms',
            transitionDelay: isVisible ? '200ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
          }}
          aria-hidden="true"
        />

        {/* Recognition Statement — their journey acknowledged */}
        <p 
          className={`
            font-serif text-foreground/90
            transition-all
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ 
            transitionDuration: '800ms',
            transitionDelay: isVisible ? '500ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
            fontSize: 'clamp(24px, 4.5vw, 36px)',
            lineHeight: 1.25,
            maxWidth: '18ch',
            margin: '0 auto',
          }}
        >
          You're about to make a promise that will echo beyond your lifetime.
        </p>

        {/* Understanding Statement — I see you */}
        <p 
          className={`
            font-sans leading-relaxed text-muted-foreground
            mt-6 md:mt-8
            transition-all
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
          `}
          style={{ 
            transitionDuration: '700ms',
            transitionDelay: isVisible ? '1000ms' : '0ms',
            transitionTimingFunction: 'var(--ease-sacred)',
            fontSize: 'clamp(16px, 2.5vw, 18px)',
          }}
        >
          I understand the weight of that moment.
        </p>

        {/* ═══════════════════════════════════════
            ACT II — THE PIVOT
            ═══════════════════════════════════════ */}
        
        {/* Golden Thread — SVG with organic curve */}
        <div 
          className="exhale-thread-container my-12 md:my-16"
          style={{ width: 'clamp(120px, 25vw, 200px)', margin: '48px auto' }}
          aria-hidden="true"
        >
          <svg 
            viewBox="0 0 200 6" 
            className={`exhale-thread-svg ${purposeVisible ? 'exhale-thread-svg--visible' : ''}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
                <stop offset="15%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="1" />
                <stop offset="85%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M 0,3 Q 50,1 100,3 Q 150,5 200,3" 
              fill="none" 
              stroke="url(#threadGradient)" 
              strokeWidth="1.5"
              strokeLinecap="round"
              className="exhale-thread-path"
            />
          </svg>
        </div>

        {/* ═══════════════════════════════════════
            ACT III — THE DECLARATION
            ═══════════════════════════════════════ */}
        
        {/* Goal Declaration — whispered transition */}
        <p 
          className={`
            font-sans uppercase tracking-[0.22em]
            transition-all
            ${purposeVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-3'}
          `}
          style={{ 
            transitionDuration: '700ms',
            transitionDelay: purposeVisible ? '1000ms' : '0ms',
            transitionTimingFunction: 'var(--ease-covenant)',
            fontSize: 'clamp(11px, 1.5vw, 13px)',
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          And so I have one goal:
        </p>

        {/* Singular Purpose — the covenant */}
        <p 
          className={`
            font-serif text-foreground
            mt-6 md:mt-8
            transition-all
            ${purposeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ 
            transitionDuration: '900ms',
            transitionDelay: purposeVisible ? '1400ms' : '0ms',
            transitionTimingFunction: 'var(--ease-covenant)',
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            lineHeight: 1.6,
            wordSpacing: '0.05em',
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

        {/* Screen reader narrative — complete story */}
        <span className="sr-only">
          This section acknowledges the sacred significance of your upcoming wedding ceremony.
          You are about to make a promise that will echo beyond your lifetime, and I understand the weight of that moment.
          My singular purpose is to let my music sound like what your hearts feel like—
          translating the unspeakable into the audible.
        </span>
      </div>

      {/* Bottom fade into ProcessSection */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 30% 92%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
