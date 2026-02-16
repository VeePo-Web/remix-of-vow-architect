import { useEffect, useRef, useState } from 'react';
import { Music, Shield, Award } from 'lucide-react';
import { DirectionalLink } from './DirectionalLink';
import { cn } from '@/lib/utils';
import invitationPortrait from '@/assets/invitation-portrait.jpg';

const trustBadges = [
  { icon: Music, label: '200+ Ceremonies' },
  { icon: Award, label: 'SOCAN Licensed' },
  { icon: Shield, label: '$4M Insured' },
];

export function TheInvitation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

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
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="life"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)',
        minHeight: '400px',
      }}
    >
      {/* Top fade from VowMoment dark */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <p
            className={cn(
              'text-xs uppercase tracking-[0.22em] text-rich-black/50 mb-12 text-center',
              'transition-all duration-700',
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            )}
          >
            The Invitation
          </p>

          {/* Main Grid */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Video Column */}
            <div
              className={cn(
                'md:col-span-2',
                'transition-all duration-700',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
            >
              <div
                className="invitation-video-container aspect-video rounded-lg shadow-xl overflow-hidden relative"
              >
                <img
                  src={invitationPortrait}
                  alt="Pianist's hands on grand piano keys in warm candlelight"
                  className="w-full h-full object-cover"
                  loading="lazy"
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
                60 seconds on what I do—and why.
              </p>
            </div>

            {/* Content Column */}
            <div className="md:col-span-3 space-y-6">
              {/* Headline */}
              <h2
                className={cn(
                  'text-[clamp(28px,4vw,42px)] font-display font-light leading-tight text-rich-black',
                  'transition-all duration-700',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
              >
               I have been at 200 ceremonies.
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
                      width: '100%',
                    }}
                  />
                </span>
                .
              </h2>

              {/* Body */}
              <div
                className={cn(
                  'space-y-4 transition-all duration-700',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '450ms' : '0ms' }}
              >
                <p className="text-lg font-display font-light leading-relaxed text-rich-black/80">
                  The wind that carries vows away. The generator that hums through 
                  the 'I do.' The back row that strains and gives up.
                </p>
                <p className="text-lg font-display font-light leading-relaxed text-rich-black/80">
                  I designed every part of my process so that never happens to you.
                </p>
              </div>

              {/* Link to About */}
              <div
                className={cn(
                  'pt-2 transition-all duration-700',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
              >
                <DirectionalLink to="/about">
                  Read my full story
                </DirectionalLink>
              </div>

              {/* Trust Badges */}
              <div
                className={cn(
                  'flex flex-wrap gap-4 pt-4 transition-all duration-700',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}
                role="list"
              >
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    role="listitem"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-rich-black/8 bg-white hover:border-rich-black/15 transition-colors duration-200"
                  >
                    <badge.icon className="w-4 h-4 text-rich-black/50" />
                    <span className="text-sm text-rich-black/70 font-medium">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
