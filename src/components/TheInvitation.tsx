import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import invitationPortrait from '@/assets/invitation-portrait-ai.jpg';

const credentials = [
  { value: '500+', label: 'Ceremonies' },
  { value: 'SOCAN', label: 'Licensed' },
  { value: '$4M', label: 'Insured' },
];

export function TheInvitation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="the-invitation"
      ref={sectionRef}
      data-theme="life"
      className="relative py-28 md:py-40 overflow-hidden invitation-texture piano-section-target"
      style={{
        background: 'linear-gradient(180deg, hsl(30 8% 12%) 0%, hsl(25 6% 10%) 100%)',
      }}
    >
      {/* === ATMOSPHERIC DEPTH LAYERS === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${invitationPortrait})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03,
          filter: 'saturate(0.5) contrast(1.1) blur(1px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, hsla(40, 50%, 55%, 0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(25 8% 6% / 0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* === CONTENT === */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Label */}
          <p
            className={cn(
              'text-xs uppercase tracking-[0.22em] text-white/40 mb-12',
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            The Invitation
          </p>

          {/* Epigraph */}
          <p
            className={cn(
              'invitation-epigraph max-w-xl mx-auto transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
          >
            "You deserve someone who has stood where you are about to stand — and knows what it takes."
          </p>

          {/* Golden Rule 1 */}
          <span
            className={cn(
              'block w-12 h-px my-12 transition-all duration-700',
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            )}
            style={{
              background: 'hsl(var(--vow-yellow) / 0.25)',
              transitionDelay: isVisible ? '250ms' : '0ms',
            }}
            aria-hidden="true"
          />

          {/* Portrait — wide cinematic crop */}
          <div
            className={cn(
              'w-full transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: isVisible ? '350ms' : '0ms' }}
          >
            <div className="relative">
              <div
                className="absolute -inset-[40px] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, hsla(40, 50%, 50%, 0.035) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <div
                className="invitation-portrait-frame aspect-[3/2] overflow-hidden relative rounded-sm"
                style={{
                  border: '1px solid hsl(var(--vow-yellow) / 0.15)',
                  boxShadow: 'inset 0 0 40px hsl(var(--vow-yellow) / 0.1), 0 40px 100px -20px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={invitationPortrait}
                  alt="Pianist's hands on grand piano keys in warm candlelight"
                  className="w-full h-full object-cover will-change-transform invitation-ken-burns"
                  loading="lazy"
                />
                <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, hsl(240 12% 3% / 0.4) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Caption */}
            <p
              className={cn(
                'text-sm font-display italic text-white/40 mt-5 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              )}
              style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}
            >
              A moment with me — before the moment with you.
            </p>
          </div>

          {/* Golden Rule 2 */}
          <span
            className={cn(
              'block w-12 h-px my-12 transition-all duration-700',
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            )}
            style={{
              background: 'hsl(var(--vow-yellow) / 0.25)',
              transitionDelay: isVisible ? '550ms' : '0ms',
            }}
            aria-hidden="true"
          />

          {/* Headline */}
          <h2
            className={cn(
              'text-[clamp(28px,4.5vw,44px)] font-display font-light leading-tight text-white max-w-2xl mx-auto',
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: isVisible ? '600ms' : '0ms', textWrap: 'balance' as any }}
          >
            I have played at over 500 events — I know what can go{' '}
            <span className="relative inline-block italic">
              wrong
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-[2px] bg-vow-gold origin-left transition-all duration-700',
                  isVisible ? 'scale-x-100' : 'scale-x-0'
                )}
                style={{
                  transitionDelay: isVisible ? '1000ms' : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                  width: '100%',
                  boxShadow: isVisible ? '0 0 8px hsl(45 90% 65% / 0.3)' : 'none',
                }}
              />
            </span>
            .
          </h2>

          {/* Body */}
          <p
            className={cn(
              'text-lg font-sans font-light leading-[1.9] text-white/45 max-w-lg mx-auto mt-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}
          >
            The wind that steals a vow mid-sentence. The hum that bleeds through silence. The back row that leans in — and still cannot hear.
          </p>

          {/* Assurance */}
          <p
            className={cn(
              'invitation-assurance max-w-lg mx-auto mt-8 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: isVisible ? '850ms' : '0ms' }}
          >
            Every part of my process exists so that never happens to you.
          </p>

          {/* CTA */}
          <div
            className={cn(
              'mt-10 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: isVisible ? '950ms' : '0ms' }}
          >
            <Link
              to="/about"
              className={cn('invitation-cta', isVisible && 'is-visible')}
            >
              Meet the witness
              <span className="invitation-cta-rule" aria-hidden="true" />
            </Link>
          </div>

          {/* Golden Rule 3 */}
          <span
            className={cn(
              'block w-12 h-px my-10 transition-all duration-700',
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            )}
            style={{
              background: 'hsl(var(--vow-yellow) / 0.25)',
              transitionDelay: isVisible ? '1000ms' : '0ms',
            }}
            aria-hidden="true"
          />

          {/* Credentials */}
          <div
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: isVisible ? '1100ms' : '0ms' }}
          >
            <div className="flex items-center justify-center gap-0">
              {credentials.map((cred, i) => (
                <Fragment key={cred.value}>
                  <div
                    className={cn(
                      'invitation-credential text-center px-8 py-4 rounded-[2px] transition-all duration-700',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                    style={{
                      transitionDelay: isVisible ? `${1100 + i * 100}ms` : '0ms',
                      background: 'hsl(0 0% 100% / 0.03)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid hsl(var(--vow-yellow) / 0.08)',
                    }}
                  >
                    <span className="block font-display text-2xl text-white/80">
                      {cred.value}
                    </span>
                    <span className="block text-[11px] uppercase tracking-[0.22em] text-white/40 mt-1">
                      {cred.label}
                    </span>
                  </div>
                  {i < credentials.length - 1 && (
                    <span
                      className="block w-px h-8 flex-shrink-0 mx-3"
                      style={{ background: 'hsl(var(--vow-yellow) / 0.3)' }}
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 15% 8%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
