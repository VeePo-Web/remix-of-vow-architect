import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef } from 'react';
import invitationPortrait from '@/assets/invitation-portrait-ai.jpg';

const credentials = [
  { value: '500+', label: 'Ceremonies' },
  { value: 'SOCAN', label: 'Licensed' },
  { value: '$4M', label: 'Insured' },
];

export function TheInvitation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const portraitRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax on portrait
  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = portrait.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * 0.03;
        portrait.style.transform = `perspective(800px) rotateY(-1.5deg) translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="the-invitation"
      ref={sectionRef}
      data-theme="life"
      className="relative py-24 md:py-32 overflow-hidden invitation-texture piano-section-target min-h-[400px]"
      style={{
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
      }}
    >
      {/* === ATMOSPHERIC DEPTH LAYERS === */}

      {/* Top fade from VowMoment dark — 120px luxurious emergence */}
      <div
        className="absolute top-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />

      {/* Layer 3: Warm elliptical fog behind portrait */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 30% 50%, hsla(38, 60%, 60%, 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Cold-to-warm sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, hsl(220 15% 92% / 0.3) 0%, hsl(42 30% 93% / 0.5) 50%, hsl(45 25% 96% / 0.2) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Candlelight pooling at bottom-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 85%, hsla(40, 50%, 55%, 0.035) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 7: Vignette — subtle edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(45 15% 88% / 0.5) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <p
            className={cn(
              'text-xs uppercase tracking-[0.22em] text-rich-black/50 mb-8 text-center',
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            The Invitation
          </p>

          {/* Main Grid */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Portrait Column */}
            <div
              ref={portraitRef}
              className={cn(
                'md:col-span-2 will-change-transform',
                'transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
            >
              {/* Cinematic portrait frame — sharp corners, editorial */}
              <div
                className="invitation-portrait-frame aspect-[4/5] overflow-hidden relative"
                style={{
                  border: '1px solid hsl(var(--vow-yellow) / 0.12)',
                  boxShadow: 'inset 0 0 40px hsl(var(--vow-yellow) / 0.08), 0 32px 80px -16px rgba(0,0,0,0.25)',
                }}
              >
                <img
                  src={invitationPortrait}
                  alt="Pianist's hands on grand piano keys in warm candlelight"
                  className="w-full h-full object-cover will-change-transform invitation-ken-burns"
                  loading="lazy"
                />
                {/* Film grain at 4% */}
                <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
                {/* Cinematic vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, hsl(240 12% 3% / 0.4) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Caption with golden rule */}
              <div
                className={cn(
                  'flex flex-col items-center mt-5 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                )}
                style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
              >
                <span
                  className="block w-10 h-px mb-3"
                  style={{ background: 'hsl(var(--vow-yellow) / 0.3)' }}
                  aria-hidden="true"
                />
                <p className="text-sm font-display italic text-rich-black/45 text-center">
                  A moment with me — before the moment with you.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-3 space-y-7">
              {/* Epigraph — whispered serif intro */}
              <p
                className={cn(
                  'invitation-epigraph transition-all duration-700',
                  isVisible ? 'opacity-[0.55] translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
              >
                "You deserve someone who has stood where you are about to stand — and knows what it takes."
              </p>

              {/* Headline */}
              <h2
                className={cn(
                  'text-[clamp(32px,5vw,48px)] font-display font-light leading-tight text-rich-black',
                  'transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '300ms' : '0ms', textWrap: 'balance' as any }}
              >
                I have played at over 500 events —
                <br />
                I know what can go{' '}
                <span className="relative inline-block italic">
                  wrong
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[2px] bg-vow-gold origin-left transition-all duration-700',
                      isVisible ? 'scale-x-100' : 'scale-x-0'
                    )}
                    style={{
                      transitionDelay: isVisible ? '800ms' : '0ms',
                      transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                      width: '100%',
                      boxShadow: isVisible ? '0 0 8px hsl(45 90% 65% / 0.3)' : 'none',
                    }}
                  />
                </span>
                .
              </h2>

              {/* Body — pull-quote style with left border */}
              <div
                className={cn(
                  'pl-5 border-l-2 space-y-4 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{
                  borderColor: 'hsl(var(--vow-yellow) / 0.15)',
                  transitionDelay: isVisible ? '450ms' : '0ms',
                }}
              >
                <p className="text-lg font-display font-light leading-[1.85] text-rich-black/70">
                  The wind that steals a vow mid-sentence. The hum that bleeds through silence. The back row that leans in — and still cannot hear.
                </p>
              </div>

              {/* Assurance — standalone serif statement */}
              <p
                className={cn(
                  'invitation-assurance transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '550ms' : '0ms' }}
              >
                Every part of my process exists so that never happens to you.
              </p>

              {/* CTA — "Meet the witness" */}
              <div
                className={cn(
                  'pt-1 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '650ms' : '0ms' }}
              >
                <Link
                  to="/about"
                  className={cn('invitation-cta', isVisible && 'is-visible')}
                >
                  Meet the witness
                  <span className="invitation-cta-rule" aria-hidden="true" />
                </Link>
              </div>

              {/* Credential Strip */}
              <div
                className={cn(
                  'pt-6 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}
              >
                <div className="flex items-center gap-0">
                  {credentials.map((cred, i) => (
                    <div key={cred.value} className="flex items-center">
                      <div
                        className={cn(
                          'invitation-credential text-center px-5 py-3 transition-all duration-700',
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        )}
                        style={{
                          transitionDelay: isVisible ? `${850 + i * 100}ms` : '0ms',
                        }}
                      >
                        <span className="block font-display text-xl text-rich-black/80">
                          {cred.value}
                        </span>
                        <span className="block text-[10px] uppercase tracking-[0.22em] text-rich-black/45 mt-1">
                          {cred.label}
                        </span>
                      </div>
                      {i < credentials.length - 1 && (
                        <span
                          className="block w-px h-5 flex-shrink-0"
                          style={{ background: 'hsl(var(--vow-yellow) / 0.2)' }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into TheSound dark — 120px */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 15% 8%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
