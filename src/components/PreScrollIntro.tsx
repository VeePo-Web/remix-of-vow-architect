import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

type Vertical = 'weddings' | 'teaching' | 'events';

interface VerticalCopy {
  eyebrow: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const COPY: Record<Vertical, VerticalCopy> = {
  weddings: {
    eyebrow: 'Southern Alberta · Weddings',
    tagline: 'I carry your vows.',
    cta: 'Reserve My Date',
    ctaHref: '/contact',
    secondaryLabel: 'Listen first',
    secondaryHref: '/listen',
  },
  teaching: {
    eyebrow: 'Piano Mentorship',
    tagline: 'Begin where you are.',
    cta: 'Begin the Conversation',
    ctaHref: '/teaching/contact',
    secondaryLabel: 'See the path',
    secondaryHref: '/teaching/about',
  },
  events: {
    eyebrow: 'Private Events',
    tagline: 'Live piano, where you gather.',
    cta: 'Discuss Your Event',
    ctaHref: '/events/contact',
    secondaryLabel: 'Listen first',
    secondaryHref: '/listen',
  },
};

interface PreScrollIntroProps {
  vertical: Vertical;
}

/**
 * PreScrollIntro — first-frame overlay sitting above the cinematic video.
 * Mobile (≤640px): eyebrow → tagline → CTA → secondary link → scroll cue.
 * Desktop: keeps the original single-pill CTA centered.
 * Parent assigns ref to control fade-on-scroll.
 */
export const PreScrollIntro = forwardRef<HTMLDivElement, PreScrollIntroProps>(
  function PreScrollIntro({ vertical }, ref) {
    const c = COPY[vertical];

    return (
      <div
        ref={ref}
        className="absolute inset-0 z-20 pointer-events-auto"
        style={{ transition: 'opacity 400ms ease' }}
      >
        {/* ── MOBILE LAYOUT (≤640px) ── */}
        <div
          className="md:hidden absolute inset-0 flex flex-col"
          style={{
            paddingTop: 'max(env(safe-area-inset-top), 0px)',
            paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
          }}
        >
          {/* Top spacer */}
          <div className="flex-[0.9]" />

          {/* Hero block — eyebrow + tagline */}
          <div className="px-8 flex flex-col items-center text-center">
            <span
              className="font-sans"
              style={{
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'hsl(0 0% 100% / 0.62)',
                textShadow: '0 1px 8px rgba(0,0,0,0.55)',
              }}
            >
              {c.eyebrow}
            </span>
            <h1
              className="font-display mt-4"
              style={{
                fontSize: 'clamp(26px, 7.6vw, 34px)',
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                textShadow:
                  '0 1px 2px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.55)',
                textWrap: 'balance' as const,
                fontWeight: 400,
              }}
            >
              {c.tagline}
            </h1>
          </div>

          {/* CTA block */}
          <div className="px-8 mt-8 flex flex-col items-center gap-5">
            <Link
              to={c.ctaHref}
              className="pre-scroll-cta"
              style={{
                width: '100%',
                maxWidth: '420px',
                height: '52px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: '#1a1410',
                background: 'hsl(38 35% 96%)',
                borderRadius: '100px',
                textDecoration: 'none',
                boxShadow: '0 0 0 1px hsl(36 60% 60% / 0.45)',
                transition: 'transform 120ms ease, box-shadow 200ms ease',
              }}
            >
              {c.cta}
            </Link>
            <Link
              to={c.secondaryHref}
              className="pre-scroll-secondary"
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: 'hsl(0 0% 100% / 0.72)',
                textDecoration: 'none',
                textShadow: '0 1px 6px rgba(0,0,0,0.55)',
              }}
            >
              {c.secondaryLabel} <span aria-hidden="true">›</span>
            </Link>
          </div>

          {/* Flex spacer pushes scroll cue to the bottom */}
          <div className="flex-1" />

          {/* Scroll cue */}
          <div
            className="pb-6 flex flex-col items-center gap-2"
            style={{ animation: 'pre-scroll-breathe 2.8s ease-in-out infinite' }}
          >
            <span
              className="font-sans"
              style={{
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'hsl(0 0% 100% / 0.5)',
              }}
            >
              Scroll to begin
            </span>
            <svg
              width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"
              style={{ animation: 'pre-scroll-chevron 2.8s ease-in-out infinite', opacity: 0.55 }}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="hsl(0 0% 100% / 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (≥md) — unchanged single-pill CTA ── */}
        <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center">
          <Link to={c.ctaHref} className="cn-cta-btn" style={{ marginTop: '8vh' }}>
            {c.cta}
          </Link>
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ animation: 'pre-scroll-breathe 2.8s ease-in-out infinite' }}
          >
            <span
              className="font-sans text-[11px] uppercase tracking-[0.3em]"
              style={{ color: 'hsl(0 0% 100% / 0.5)' }}
            >
              Scroll
            </span>
            <svg
              width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"
              style={{ animation: 'pre-scroll-chevron 2.8s ease-in-out infinite', opacity: 0.4 }}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="hsl(0 0% 100% / 0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <style>{`
          .pre-scroll-cta:active { transform: scale(0.97); box-shadow: 0 0 0 1px hsl(36 60% 60% / 0.7); }
          .pre-scroll-secondary:active { text-decoration: underline; text-underline-offset: 4px; }
        `}</style>
      </div>
    );
  }
);