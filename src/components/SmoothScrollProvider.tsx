import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  // Check reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const instance = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.0,
      autoRaf: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        instance.stop();
      } else {
        instance.start();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
