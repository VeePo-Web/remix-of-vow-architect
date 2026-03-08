import { createContext, useContext, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export type TransitionPhase = 'idle' | 'exiting' | 'entering';

interface PageTransitionContextValue {
  phase: TransitionPhase;
  navigateWithTransition: (path: string) => void;
}

export const PageTransitionContext = createContext<PageTransitionContextValue>({
  phase: 'idle',
  navigateWithTransition: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/**
 * Route-specific transition timing — emotional temperature.
 * Sacred pages get cathedral gravity; utility pages respect the user's time.
 */
export const ROUTE_TIMING: Record<string, { exit: number; enter: number }> = {
  '/weddings':    { exit: 400, enter: 500 },
  '/':            { exit: 350, enter: 450 },
  '/events':      { exit: 350, enter: 450 },
  '/teaching':    { exit: 350, enter: 450 },
  '/about':       { exit: 350, enter: 450 },
  '/gallery':     { exit: 350, enter: 450 },
  '/listen':      { exit: 350, enter: 450 },
  '/services':    { exit: 300, enter: 400 },
  '/contact':     { exit: 300, enter: 400 },
  '/faq':         { exit: 300, enter: 400 },
};

const LEGAL_TIMING = { exit: 250, enter: 300 };
const DEFAULT_TIMING = { exit: 350, enter: 450 };

export function getRouteTiming(path: string) {
  if (['/privacy-policy', '/terms', '/cookie-policy', '/accessibility', '/legal'].includes(path)) {
    return LEGAL_TIMING;
  }
  return ROUTE_TIMING[path] ?? DEFAULT_TIMING;
}
