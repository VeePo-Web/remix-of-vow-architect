import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  PageTransitionContext,
  TransitionPhase,
  getRouteTiming,
} from '@/hooks/usePageTransition';

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  THE THRESHOLD CROSSING                                     ║
 * ║  "Every page change is a door opening in a wedding venue"   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Two-phase transition:
 *   EXIT  — current page fades + shifts up, golden line expands
 *   ENTER — new page fades in + shifts up from below, line contracts
 *
 * The golden line is the semicolon made physical — the sacred pause
 * between Death and Life, between one page and the next.
 */

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [displayLocation, setDisplayLocation] = useState(location);
  const pendingPathRef = useRef<string | null>(null);
  const isTransitioningRef = useRef(false);
  const prefersReducedMotion = useRef(false);

  // Check reduced motion preference once
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  // Programmatic navigation with transition
  const navigateWithTransition = useCallback(
    (path: string) => {
      // Same page — no transition
      if (path === location.pathname) return;
      // Already transitioning — skip
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      pendingPathRef.current = path;

      const timing = getRouteTiming(path);
      const exitDuration = prefersReducedMotion.current ? 150 : timing.exit;

      // Phase 1: Exit
      setPhase('exiting');

      setTimeout(() => {
        navigate(path);
        pendingPathRef.current = null;
      }, exitDuration);
    },
    [location.pathname, navigate]
  );

  // When location changes (from any source), handle enter phase
  useEffect(() => {
    if (location.pathname === displayLocation.pathname && location.key === displayLocation.key) return;

    const wasExiting = phase === 'exiting';
    const timing = getRouteTiming(location.pathname);
    const enterDuration = prefersReducedMotion.current ? 150 : timing.enter;

    if (wasExiting) {
      // We triggered this — swap content immediately
      setDisplayLocation(location);
      setPhase('entering');

      setTimeout(() => {
        setPhase('idle');
        isTransitioningRef.current = false;
      }, enterDuration);
    } else {
      // External navigation (browser back/forward, direct Link click)
      // Run a quick exit → enter
      const exitDuration = prefersReducedMotion.current ? 100 : 250;
      isTransitioningRef.current = true;
      setPhase('exiting');

      setTimeout(() => {
        setDisplayLocation(location);
        setPhase('entering');

        setTimeout(() => {
          setPhase('idle');
          isTransitioningRef.current = false;
        }, enterDuration);
      }, exitDuration);
    }
  }, [location]);

  const contextValue = useMemo(
    () => ({ phase, navigateWithTransition }),
    [phase, navigateWithTransition]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {/* The Veil — golden threshold line */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-[60] pointer-events-none flex items-center justify-center',
          'transition-opacity',
          phase === 'idle' ? 'opacity-0' : 'opacity-100'
        )}
        style={{ transitionDuration: '120ms' }}
      >
        <div
          className={cn(
            'threshold-line',
            phase === 'exiting' && 'threshold-line--expand',
            phase === 'entering' && 'threshold-line--contract'
          )}
        />
      </div>

      {/* Page content wrapper */}
      <div
        className={cn(
          'page-transition-content',
          phase === 'exiting' && 'page-transition-content--exit',
          phase === 'entering' && 'page-transition-content--enter',
          phase === 'idle' && 'page-transition-content--idle'
        )}
        style={{
          '--exit-duration': `${getRouteTiming(location.pathname).exit}ms`,
          '--enter-duration': `${getRouteTiming(location.pathname).enter}ms`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}
