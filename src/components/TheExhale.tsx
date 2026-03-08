import { useEffect, useId, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * THE EXHALE — The Sacred Declaration
 * Fantasy.co Quality — All 7 elevation steps applied
 */
export function TheExhale() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.3, rootMargin: '-40px 0px' });
  const [purposeVisible, setPurposeVisible] = useState(false);
  const uid = useId();
  const gradientId = `threadGradient${uid}`;
  const glowId = `threadGlow${uid}`;

  useEffect(() => {
    if (!isVisible) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setPurposeVisible(true); return; }
    const timer = setTimeout(() => setPurposeVisible(true), 1600);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section
      id="the-exhale"
      ref={sectionRef}
      className="exhale-section piano-section-target relative min-h-[70vh] flex items-center justify-center py-24 md:py-32 lg:py-40 overflow-hidden"
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

      {/* Step 1: Film grain overlay — consistent with hero */}
      <div 
        className="absolute inset-0 grain opacity-[0.08] pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Step 1: Subtle warm fog — atmospheric depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 70%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Layer 1: Inner core glow — with Step 5 ambient breathing */}
      <div 
        className={`
          absolute inset-0 pointer-events-none transition-opacity exhale-glow-breathe-layer
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

      {/* Step 3: Top gradient fade — seamless hero transition */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(var(--rich-black)))' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[680px] mx-auto px-6 text-center">
        
        {/* ACT I — Golden Dot Anchor (Step 2: refined) */}
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

        {/* Recognition Statement — Step 4: text-shadow for depth */}
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
            textShadow: '0 2px 24px hsl(var(--rich-black) / 0.4)',
          }}
        >
          You're about to make a promise that will echo beyond your lifetime.
        </p>

        {/* Understanding Statement */}
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

        {/* ACT II — Golden Thread SVG (Step 6: glow filter) */}
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
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
                <stop offset="15%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="1" />
                <stop offset="85%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
              </linearGradient>
              {/* Step 6: Glow filter for thread */}
              <filter id={glowId} x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path 
              d="M 0,3 Q 50,1 100,3 Q 150,5 200,3" 
              fill="none" 
              stroke={`url(#${gradientId})`} 
              strokeWidth="1.8"
              strokeLinecap="round"
              className="exhale-thread-path"
              filter={`url(#${glowId})`}
            />
          </svg>
        </div>

        {/* ACT III — Declaration (Step 4: elevated scale) */}
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

        {/* Singular Purpose — Step 4: increased scale */}
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
            fontSize: 'clamp(20px, 3.8vw, 28px)',
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
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--surface)))' }}
        aria-hidden="true"
      />
    </section>
  );
}
