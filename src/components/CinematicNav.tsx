import { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullScreenMenu } from './FullScreenMenu';
import { NAV_SECTIONS } from '@/config/videoActsConfig';

/**
 * CinematicNav — Premium sticky navigation for /weddings.
 *
 * ALWAYS VISIBLE:
 * - Top-left: "Parker Gawryletz" wordmark
 * - Top-right: Hamburger menu
 * - Right-side: Vertical section dots (8 scenes) with labels
 * - Bottom-center: Persistent CTA that appears after hero
 *
 * All updates via direct DOM mutation — zero React re-renders during scroll.
 */

const SECTION_BOUNDS = [
  { id: 'act-vigil',      start: 0.000, end: 0.129 },
  { id: 'act-process',    start: 0.129, end: 0.259 },
  { id: 'act-crafting',   start: 0.259, end: 0.388 },
  { id: 'act-invitation', start: 0.388, end: 0.517 },
  { id: 'act-sound',      start: 0.517, end: 0.647 },
  { id: 'act-witness',    start: 0.647, end: 0.776 },
  { id: 'act-covenant',   start: 0.776, end: 0.905 },
  { id: 'act-crossing',   start: 0.905, end: 1.000 },
];

export function CinematicNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef(-1);

  const onScroll = useCallback(() => {
    const container = document.getElementById('weddings-cinema');
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

    // Persistent CTA — hide when inline CTAs are visible for a clean single-CTA look
    if (ctaRef.current) {
      const inlineCta =
        (progress > 0.49 && progress < 0.52) ||  // ACT IV inline CTA
        (progress > 0.78 && progress < 0.82) ||  // ACT VI inline CTA
        progress > 0.95;                           // ACT VIII final CTA
      const showCta = progress > 0.12 && progress < 0.95 && !inlineCta;
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
      // Update all dots and labels
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
    const container = document.getElementById('weddings-cinema');
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

        {NAV_SECTIONS.map((section, i) => (
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
        <Link to="/contact" className="cn-cta-btn">
          Reserve My Date!
        </Link>
      </div>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
