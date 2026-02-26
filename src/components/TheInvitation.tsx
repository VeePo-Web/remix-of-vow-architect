import { DirectionalLink } from './DirectionalLink';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import invitationPortrait from '@/assets/invitation-portrait-ai.jpg';

const credentials = ['500+ Events', 'SOCAN Licensed', '$4M Insured'];

export function TheInvitation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      data-theme="life"
      className="relative py-24 md:py-32 overflow-hidden invitation-texture min-h-[400px]"
      style={{
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
      }}
    >
      {/* Top fade from VowMoment dark */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />

      {/* Atmospheric radial glow behind portrait */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, hsla(38, 60%, 60%, 0.02) 0%, transparent 60%)',
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
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Portrait Column */}
            <div
              className={cn(
                'md:col-span-2',
                'transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
            >
              <div className="invitation-portrait-frame aspect-[3/4] rounded-lg shadow-xl overflow-hidden relative">
                <img
                  src={invitationPortrait}
                  alt="Pianist's hands on grand piano keys in warm candlelight"
                  className="w-full h-full object-cover will-change-transform invitation-ken-burns"
                  loading="lazy"
                />
                {/* Film grain overlay */}
                <div
                  className="absolute inset-0 grain opacity-[0.06] pointer-events-none"
                  aria-hidden="true"
                />
                {/* Cinematic vignette overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, hsl(240 12% 3% / 0.4) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-rich-black/50 italic mt-4 text-center">
                A moment with me — before the moment with you.
              </p>
            </div>

            {/* Content Column */}
            <div className="md:col-span-3 space-y-8">
              {/* Headline */}
              <h2
                className={cn(
                  'text-[clamp(28px,4vw,40px)] font-display font-light leading-tight text-rich-black mb-2',
                  'transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '300ms' : '0ms', textWrap: "balance" as any, marginInline: 0 }}
              >
                I have played at over 500 events.
                <br />
                I know what can go{' '}
                <span className="invitation-emphasis relative inline-block">
                  wrong
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[2px] bg-vow-gold origin-left transition-transform duration-700',
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

              {/* Body */}
              <div
                className={cn(
                  'space-y-4 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '450ms' : '0ms' }}
              >
                <p className="text-lg font-display font-light leading-relaxed text-rich-black/80">
                  The wind that steals a vow mid-sentence. The hum that bleeds through silence. The back row that leans in — and still cannot hear.
                </p>
                <p className="text-lg font-display font-light leading-relaxed text-rich-black/80">
                  Every part of my process exists so that never happens to you.
                </p>
              </div>

              {/* Link to About */}
              <div
                className={cn(
                  'pt-2 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
              >
                <DirectionalLink to="/about">
                  Read my story
                </DirectionalLink>
              </div>

              {/* Sacred Credentials */}
              <div
                className={cn(
                  'pt-4 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-rich-black/45 flex items-center flex-wrap justify-start gap-x-3 gap-y-1">
                  {credentials.map((cred, i) => (
                    <span key={cred} className="flex items-center gap-x-3">
                      {cred}
                      {i < credentials.length - 1 && (
                        <span
                          className="witness-kit-diamond inline-block w-[4px] h-[4px] rotate-45"
                          style={{
                            background: 'hsl(var(--vow-yellow) / 0.5)',
                            boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.2)',
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
