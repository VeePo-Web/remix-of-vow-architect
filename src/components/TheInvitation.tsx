import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import invitationPortrait from '@/assets/invitation-landscape-ai.jpg';

export function TheInvitation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const imageColRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealDone, setRevealDone] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isVisible && !revealDone) {
      const timer = setTimeout(() => setRevealDone(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, revealDone]);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrolled = vh - rect.top;
        const total = rect.height + vh;
        const progress = Math.max(0, Math.min(1, scrolled / total));

        if (imageColRef.current) {
          const offset = (progress - 0.5) * 24;
          imageColRef.current.style.transform = `translateY(${offset}px)`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <section
      id="the-invitation"
      ref={sectionRef as React.RefObject<HTMLElement>}
      role="region"
      aria-labelledby="invitation-heading"
      className="relative py-28 md:py-40 overflow-hidden invitation-texture piano-section-target"
      style={{
        background: 'transparent',
      }}
    >
      {/* Frame sequence overlay */}
      <div className="frame-overlay--light" style={{ '--frame-overlay-opacity': '0.88' } as React.CSSProperties} aria-hidden="true" />

      <span className="sr-only">Parker's personal invitation — he plays only five weddings a year and devotes months of preparation to each one.</span>

      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Left Column: Portrait Image */}
          <div
            ref={imageColRef}
            className={cn(
              !revealDone && 'transition-all duration-[900ms]',
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: !revealDone && isVisible ? '300ms' : '0ms' }}
          >
            <div className="relative">
              <div
                className="aspect-[3/2] md:aspect-[3/4] overflow-hidden relative rounded-sm"
                style={{
                  border: '1px solid hsl(var(--vow-yellow) / 0.12)',
                  boxShadow: '0 20px 60px -12px hsl(30 10% 10% / 0.08), 0 8px 24px -8px hsl(30 10% 10% / 0.06)',
                }}
              >
                <img
                  src={invitationPortrait}
                  alt="Grand piano keys stretching into soft bokeh with a single candle flame reflected in polished black lacquer"
                  className="w-full h-full object-cover invitation-ken-burns"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="text-center md:text-left">

            <p
              className={cn(
                'text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8',
                'transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              The Invitation
            </p>

            <p
              className={cn(
                'invitation-epigraph max-w-xl transition-[opacity,transform,filter] duration-[700ms]',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: isVisible ? '120ms' : '0ms',
                filter: isVisible ? 'blur(0px)' : 'blur(4px)',
              }}
            >
              "You deserve someone who has stood where you are about to stand — and knows what it takes."
            </p>

            <span
              className={cn(
                'block w-12 h-px my-10 transition-all duration-500 mx-auto md:mx-0',
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              )}
              style={{
                background: 'hsl(var(--vow-yellow) / 0.35)',
                transitionDelay: isVisible ? '200ms' : '0ms',
                transformOrigin: 'left',
                animation: isVisible ? 'invitation-rule-breathe 4s ease-in-out infinite' : 'none',
              }}
              aria-hidden="true"
            />

            <h2
              id="invitation-heading"
              className={cn(
                'text-[clamp(26px,4vw,40px)] font-display font-light leading-tight text-foreground max-w-lg text-pretty',
                'transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
            >
              I play five weddings a year.{' '}
              <span className="relative inline-block italic">
                Yours
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-[2px] bg-vow-yellow origin-left transition-all duration-700',
                    isVisible ? 'scale-x-100' : 'scale-x-0'
                  )}
                  style={{
                    transitionDelay: isVisible ? '1000ms' : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                    width: '100%',
                    boxShadow: isVisible ? '0 0 8px hsl(var(--vow-yellow) / 0.3)' : 'none',
                    animation: isVisible ? 'invitation-yours-glow 800ms cubic-bezier(0.22, 0.61, 0.36, 1) 1700ms both' : 'none',
                  }}
                />
              </span>{' '}
              could be one of them.
            </h2>

            <p
              className={cn(
                'text-lg font-sans font-light leading-[1.8] text-muted-foreground max-w-lg mt-8 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}
            >
              Each ceremony I take on begins months before the day itself — with a conversation about the song that was playing when you knew, the silence you want to protect, and the words you need every guest to hear.
            </p>

            <p
              className={cn(
                'text-lg font-sans font-light leading-[1.8] text-muted-foreground max-w-lg mt-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
            >
              I limit my calendar so that every couple receives the preparation their ceremony deserves — not a template, but a score written for the two of you alone.
            </p>

            <p
              className={cn(
                'invitation-assurance max-w-lg mt-8 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}
            >
              Every arrangement I write begins with a single question{' '}
              <span className="text-primary opacity-60">— what was playing when you knew.</span>
            </p>

            <div
              className={cn(
                'mt-10 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
            >
              <Link
                to="/about"
                className={cn(
                  'invitation-cta invitation-cta--pill',
                  isVisible && 'is-visible invitation-cta-breathe'
                )}
              >
                Hear my story
                <span className="invitation-cta-rule" aria-hidden="true" />
              </Link>
            </div>

            <p
              className={cn(
                'text-xs uppercase tracking-[0.22em] text-muted-foreground mt-10 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}
            >
              500+ events <span className="text-primary opacity-30">·</span> SOCAN licensed <span className="text-primary opacity-30">·</span> $4M insured
            </p>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }}
        aria-hidden="true"
      />
    </section>
  );
}