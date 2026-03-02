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

  // Detect reduced motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // After reveal completes, drop transition so parallax applies instantly
  useEffect(() => {
    if (isVisible && !revealDone) {
      const timer = setTimeout(() => setRevealDone(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, revealDone]);

  // Scroll-linked parallax + warmth intensification
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

        // Parallax: image column moves at 0.92x rate (subtle depth)
        if (imageColRef.current) {
          const offset = (progress - 0.5) * 24; // ±12px range
          imageColRef.current.style.transform = `translateY(${offset}px)`;
        }

        // Warmth intensification: CSS variable for glow layers
        section.style.setProperty('--warmth', `${progress}`);
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
      data-theme="life"
      role="region"
      aria-labelledby="invitation-heading"
      className="relative py-28 md:py-40 overflow-hidden invitation-texture piano-section-target"
      style={{
        background: 'linear-gradient(180deg, hsl(28 12% 16%) 0%, hsl(25 8% 8%) 100%)',
        // @ts-ignore CSS custom property
        '--warmth': '0',
      } as React.CSSProperties}
    >
      {/* Screen reader narrative */}
      <span className="sr-only">Parker's personal invitation — he plays only five weddings a year and devotes months of preparation to each one.</span>

      {/* === ATMOSPHERIC DEPTH LAYERS === */}

      {/* Layer 1: Background image texture */}
      <div
        className="absolute inset-0 pointer-events-none invitation-bg-ken-burns"
        style={{
          backgroundImage: `url(${invitationPortrait})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.10,
          filter: 'saturate(0.5) contrast(1.1)',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />

      {/* Layer 2b: Film grain */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none z-[1]" aria-hidden="true" />

      {/* Layer 3: Wide candlelight glow — warmth-linked */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, hsla(40, 50%, 55%, 0.10) 0%, transparent 70%)',
          opacity: 'calc(0.85 + var(--warmth) * 0.15)',
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Warm glow pool behind image column — warmth-linked */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 30% 50%, hsla(38, 60%, 50%, 0.08) 0%, transparent 60%)',
          opacity: 'calc(0.8 + var(--warmth) * 0.2)',
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(25 8% 6% / 0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* === CONTENT — Two-Column Asymmetric === */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* ── Left Column: Portrait Image (parallax-linked) ── */}
          <div
            ref={imageColRef}
            className={cn(
              'will-change-transform',
              !revealDone && 'transition-all duration-[900ms]',
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: !revealDone && isVisible ? '300ms' : '0ms' }}
          >
            <div className="relative">
              {/* Warm light bleed — breathing */}
              <div
                className="absolute -inset-[40px] pointer-events-none invitation-light-bleed"
                style={{
                  background: 'radial-gradient(ellipse at center, hsla(40, 50%, 50%, 0.06) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              {/* Frame */}
              <div
                className="aspect-[3/2] md:aspect-[3/4] overflow-hidden relative rounded-sm invitation-portrait-frame"
                style={{
                  border: '1px solid hsl(var(--vow-yellow) / 0.12)',
                  boxShadow: [
                    'inset 0 0 60px hsl(var(--vow-yellow) / 0.08)',
                    'inset 0 1px 0 hsl(0 0% 100% / 0.06)',
                    '0 0 40px hsl(var(--vow-yellow) / 0.06)',
                    '0 40px 100px -20px rgba(0,0,0,0.5)',
                  ].join(', '),
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
                <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, hsl(240 12% 3% / 0.4) 100%)',
                  }}
                  aria-hidden="true"
                />
                {/* Candlelight shimmer — drifting reflected light */}
                <div className="absolute inset-0 pointer-events-none invitation-candlelight-shimmer" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* ── Right Column: Copy ── */}
          <div className="text-center md:text-left">

            {/* Label */}
            <p
              className={cn(
                'text-xs uppercase tracking-[0.22em] text-[hsl(45_60%_70%_/_0.5)] mb-8',
                'transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              The Invitation
            </p>

            {/* Epigraph — blur-to-sharp reveal */}
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

            {/* Golden Rule */}
            <span
              className={cn(
                'block w-12 h-px my-10 transition-all duration-500 mx-auto md:mx-0',
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              )}
              style={{
                background: 'hsl(var(--vow-yellow) / 0.25)',
                transitionDelay: isVisible ? '200ms' : '0ms',
                willChange: 'transform',
                transformOrigin: 'left',
                animation: isVisible ? 'invitation-rule-breathe 4s ease-in-out infinite' : 'none',
              }}
              aria-hidden="true"
            />

            {/* Heading */}
            <h2
              id="invitation-heading"
              className={cn(
                'text-[clamp(26px,4vw,40px)] font-display font-light leading-tight text-white max-w-lg text-pretty',
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
                    boxShadow: isVisible ? '0 0 8px hsl(45 90% 65% / 0.3)' : 'none',
                    animation: isVisible ? 'invitation-yours-glow 800ms cubic-bezier(0.22, 0.61, 0.36, 1) 1700ms both' : 'none',
                  }}
                />
              </span>{' '}
              could be one of them.
            </h2>

            {/* Body */}
            <p
              className={cn(
                'text-lg font-sans font-light leading-[1.8] text-white/65 max-w-lg mt-8 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}
            >
              Each ceremony I take on begins months before the day itself — with a conversation about the song that was playing when you knew, the silence you want to protect, and the words you need every guest to hear.
            </p>

            <p
              className={cn(
                'text-lg font-sans font-light leading-[1.8] text-white/65 max-w-lg mt-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
            >
              I limit my calendar so that every couple receives the preparation their ceremony deserves — not a template, but a score written for the two of you alone.
            </p>

            {/* Assurance */}
            <p
              className={cn(
                'invitation-assurance max-w-lg mt-8 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}
            >
              Every arrangement I write begins with a single question{' '}
              <span className="text-[hsl(var(--vow-yellow))] opacity-60">— what was playing when you knew.</span>
            </p>

            {/* CTA — breathing glow */}
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
                Meet the witness
                <span className="invitation-cta-rule" aria-hidden="true" />
              </Link>
            </div>

            {/* Inline Credentials */}
            <p
              className={cn(
                'text-xs uppercase tracking-[0.22em] text-white/40 mt-10 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}
            >
              500+ events <span className="text-[hsl(var(--vow-yellow))] opacity-30">·</span> SOCAN licensed <span className="text-[hsl(var(--vow-yellow))] opacity-30">·</span> $4M insured
            </p>

          </div>
        </div>
      </div>

      {/* Golden thread — section threshold */}
      <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 z-20 invitation-golden-thread" aria-hidden="true" />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 15% 8%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
