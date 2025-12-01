import { useEffect, useRef, useState } from 'react';

/**
 * THE EXHALE — The Sacred Pause
 * 
 * Position: Immediately after hero
 * Purpose: Create emotional recognition before any sales pitch
 * Principle: "Make them feel before they think" (Fantasy.co)
 */
export function TheExhale() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
      className="relative min-h-[50vh] flex items-center justify-center py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
      aria-label="A moment of understanding"
      role="region"
    >
      {/* Ambient warm glow - the first hint of hope */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-[680px] mx-auto px-6 text-center">
        
        {/* Layer 1: Golden Dot Anchor */}
        <div 
          className={`
            exhale-anchor mx-auto mb-10 md:mb-12
            transition-all duration-700
            ${isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-50'
            }
          `}
          style={{ 
            transitionDelay: isVisible ? '200ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Recognition Statement */}
        <p 
          className={`
            font-serif text-2xl md:text-3xl lg:text-4xl 
            leading-snug tracking-tight
            text-foreground/90
            transition-all duration-900
            ${isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{ 
            transitionDelay: isVisible ? '400ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            maxWidth: '18ch',
            margin: '0 auto',
          }}
        >
          You're about to make a promise that will echo beyond your lifetime.
        </p>

        {/* Layer 3: Understanding Statement */}
        <p 
          className={`
            font-sans text-base md:text-lg 
            leading-relaxed
            text-muted-foreground
            mt-6 md:mt-8
            transition-all duration-900
            ${isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-3'
            }
          `}
          style={{ 
            transitionDelay: isVisible ? '800ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
          }}
        >
          I understand the weight of that moment.
        </p>

        {/* Screen reader context */}
        <span className="sr-only">
          This section acknowledges the sacred significance of your upcoming wedding ceremony.
        </span>
      </div>
    </section>
  );
}
