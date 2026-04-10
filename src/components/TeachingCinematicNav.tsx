import { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullScreenMenu } from './FullScreenMenu';
import { TEACHING_NAV_SECTIONS } from '@/config/teachingVideoActsConfig';

/**
 * TeachingCinematicNav — Same architecture as CinematicNav (weddings)
 * but targets #teaching-cinema and uses teaching section config.
 */

const SECTION_BOUNDS = [
  { id: 'teach-welcome',   start: 0.000, end: 0.125 },
  { id: 'teach-exhale',    start: 0.125, end: 0.250 },
  { id: 'teach-pillars',   start: 0.250, end: 0.375 },
  { id: 'teach-method',    start: 0.375, end: 0.500 },
  { id: 'teach-threshold', start: 0.500, end: 0.625 },
  { id: 'teach-stories',   start: 0.625, end: 0.750 },
  { id: 'teach-offering',  start: 0.750, end: 0.875 },
  { id: 'teach-crossing',  start: 0.875, end: 1.000 },
];

export function TeachingCinematicNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef(-1);

  const onScroll = useCallback(() => {
    const container = document.getElementById('teaching-cinema');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = rect.height - vh;
    if (scrollable <= 0) return;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    // Progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.height = `${progress * 100}%`;
    }

    // Persistent CTA — show after hero (progress > 0.12)
    if (ctaRef.current) {
      const showCta = progress > 0.12 && progress < 0.95;
      ctaRef.current.style.opacity = showCta ? '1' : '0';
      ctaRef.current.style.transform = showCta ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(12px)';
      ctaRef.current.style.pointerEvents = showCta ? 'auto' : 'none';
    }

    // Active section
    let activeIdx = 0;
    for (let i = 0; i < SECTION_BOUNDS.length; i++) {
      if (progress >= SECTION_BOUNDS[i].start) activeIdx = i;
    }

    if (activeIdx !== lastActiveRef.current) {
      for (let i = 0; i < SECTION_BOUNDS.length; i++) {
        const dot = dotRefs.current[i];
        const label = labelRefs.current[i];
        if (!dot || !label) continue;

        if (i === activeIdx) {
          dot.style.width = '10px';
          dot.style.height = '10px';
          dot.style.background = 'hsl(36 50% 88%)';
          dot.style.boxShadow = '0 0 12px rgba(212,175,55,0.35), 0 0 4px rgba(255,255,255,0.5)';
          label.style.opacity = '1';
          label.style.transform = 'translateX(0)';
          label.style.color = 'hsl(36 30% 85%)';
        } else {
          dot.style.width = '6px';
          dot.style.height = '6px';
          dot.style.background = 'rgba(255,255,255,0.25)';
          dot.style.boxShadow = 'none';
          label.style.opacity = '0';
          label.style.transform = 'translateX(8px)';
          label.style.color = '';
        }
      }
      lastActiveRef.current = activeIdx;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollToSection = useCallback((idx: number) => {
    const container = document.getElementById('teaching-cinema');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = rect.height - vh;
    const target = window.scrollY + rect.top + scrollable * SECTION_BOUNDS[idx].start;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* ═══ TOP BAR ═══ */}
      <header className="cn-header">
        <Link to="/" className="cn-logo"><img src="/logos/nav-white.png" alt="Parker Gawryletz" /></Link>
        <button onClick={() => setIsMenuOpen(true)} className="cn-menu-btn" aria-label="Open menu">
          <span className="cn-menu-text">Menu</span>
          <div className="cn-hamburger" aria-hidden="true">
            <span /><span /><span />
          </div>
        </button>
      </header>

      {/* ═══ RIGHT DOTS NAV ═══ */}
      <nav className="cn-dots" aria-label="Section navigation">
        {/* Progress track */}
        <div className="cn-track">
          <div ref={progressBarRef} className="cn-track-fill" />
        </div>

        {TEACHING_NAV_SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            className="cn-dot-row"
            aria-label={section.label}
          >
            {/* Label — to the left of dot */}
            <span
              ref={(el) => { labelRefs.current[i] = el; }}
              className="cn-dot-label"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {section.label}
            </span>
            {/* Dot */}
            <div
              ref={(el) => { dotRefs.current[i] = el; }}
              className="cn-dot"
              style={{
                width: i === 0 ? '10px' : '6px',
                height: i === 0 ? '10px' : '6px',
                background: i === 0 ? 'hsl(36 50% 88%)' : 'rgba(255,255,255,0.25)',
                boxShadow: i === 0 ? '0 0 12px rgba(212,175,55,0.35), 0 0 4px rgba(255,255,255,0.5)' : 'none',
              }}
            />
          </button>
        ))}
      </nav>

      {/* ═══ PERSISTENT CTA — bottom center ═══ */}
      <div ref={ctaRef} className="cn-cta-bar" style={{ opacity: 0, pointerEvents: 'none' }}>
        <Link to="/teaching/contact" className="cn-cta-btn">
          Begin the Conversation
        </Link>
      </div>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
