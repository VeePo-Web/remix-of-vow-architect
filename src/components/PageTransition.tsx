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
 * ║  THE THRESHOLD CROSSING v2                                  ║
 * ║  "Every page change is a door opening in a wedding venue"   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Two-phase transition with atmospheric depth:
 *   EXIT  — content blurs + fades, vignette darkens, golden line expands
 *           with sacred semicolon at center
 *   ENTER — new page fades in from blur, vignette lifts, line contracts
 *
 * The old page stays rendered (via displayLocation) until exit completes.
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
      if (path === location.pathname) return;
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      pendingPathRef.current = path;

      const timing = getRouteTiming(path);
      const exitDuration = prefersReducedMotion.current ? 150 : timing.exit;

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
      // We triggered this — swap content now (old page exit is complete)
      setDisplayLocation(location);
      setPhase('entering');

      setTimeout(() => {
        setPhase('idle');
        isTransitioningRef.current = false;
      }, enterDuration);
    } else {
      // External navigation (browser back/forward, direct Link click)
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
    () => ({ phase, navigateWithTransition, displayLocation }),
    [phase, navigateWithTransition, displayLocation]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {/* The Veil — golden threshold line with sacred semicolon */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-[60] pointer-events-none flex items-center justify-center',
          'transition-opacity',
          phase === 'idle' ? 'opacity-0' : 'opacity-100'
        )}
        style={{ transitionDuration: '120ms' }}
      >
        {/* Vignette overlay — room dimming */}
        <div
          className={cn(
            'absolute inset-0 transition-opacity',
            phase === 'exiting' ? 'threshold-vignette--in' : '',
            phase === 'entering' ? 'threshold-vignette--out' : '',
            phase === 'idle' ? 'opacity-0' : ''
          )}
        />

        {/* Golden line + semicolon */}
        <div className="relative w-full flex items-center justify-center">
          <div
            className={cn(
              'threshold-line',
              phase === 'exiting' && 'threshold-line--expand',
              phase === 'entering' && 'threshold-line--contract'
            )}
          />
          <span
            className={cn(
              'threshold-semicolon',
              phase === 'exiting' && 'threshold-semicolon--in',
              phase === 'entering' && 'threshold-semicolon--out'
            )}
          >
            ;
          </span>
        </div>
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
