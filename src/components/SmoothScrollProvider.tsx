import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useLocation } from 'react-router-dom';

/**
 * Scroll weight map — section-specific lerp values.
 * Lower = heavier, more reverent momentum.
 * 
 * The vigil/hero and altar moments get the heaviest weight (0.04),
 * creating a "held breath" feeling. Narrative sections breathe at 0.06.
 * Utility sections (FAQ, legal) get lighter weight (0.09) for usability.
 */
const SCROLL_WEIGHTS: Record<string, number> = {
  // ── Weddings page ──
  'vigil':              0.04,   // Hero — the held breath before revelation
  'the-exhale':         0.055,  // Sacred pause — slightly heavier than default
  'process':            0.065,  // Sheet music — moderate, lets cards breathe
  'vow-moment':         0.04,   // Altar interstitial — maximum gravity
  'the-invitation':     0.06,   // Meet the owner — reverent narrative
  'the-sound':          0.07,   // Listening room — slightly lighter for interaction
  'the-transformation': 0.055,  // Fears → promise — weighted for emotional impact
  'the-witness':        0.06,   // Preparation & kit — steady narrative
  'three-paths':        0.065,  // Pricing — moderate for scanning
  'the-witnesses':      0.06,   // Testimonials — reverent
  'the-crossing':       0.055,  // Final CTA — weighted for commitment

  // ── Gateway ──
  'gateway':            0.05,   // First impression — heavy, cinematic

  // ── Events page ──
  'events-hero':        0.045,
  'events-exhale':      0.06,
  'events-occasions':   0.065,
  'events-approach':    0.06,
  'events-threshold':   0.055,
  'events-experience':  0.06,
  'events-offering':    0.065,
  'events-crossing':    0.055,

  // ── Teaching page ──
  'teaching-hero':      0.045,
  'teaching-exhale':    0.06,
  'teaching-pillars':   0.065,
  'teaching-methodology': 0.06,
  'teaching-threshold': 0.055,
  'teaching-stories':   0.06,
  'teaching-offering':  0.065,
  'teaching-crossing':  0.055,
};

const DEFAULT_LERP = 0.06;
const LERP_TRANSITION_SPEED = 0.008; // How fast lerp interpolates between sections

const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const currentLerpRef = useRef(DEFAULT_LERP);
  const targetLerpRef = useRef(DEFAULT_LERP);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lerpRafRef = useRef<number | null>(null);

  // Smoothly interpolate lerp toward target (prevents jarring weight changes)
  const animateLerp = useCallback(() => {
    if (!lenisRef.current) return;

    const current = currentLerpRef.current;
    const target = targetLerpRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.001) {
      currentLerpRef.current = current + diff * LERP_TRANSITION_SPEED * 4;
      // Update Lenis lerp via its options — Lenis reads lerp each frame
      (lenisRef.current as any).options.lerp = currentLerpRef.current;
    } else {
      currentLerpRef.current = target;
      (lenisRef.current as any).options.lerp = target;
    }

    lerpRafRef.current = requestAnimationFrame(animateLerp);
  }, []);

  // Initialize Lenis
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const instance = new Lenis({
      lerp: DEFAULT_LERP,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.0,
      autoRaf: true,
      anchors: {
        offset: -80, // Account for sticky header height
      },
      prevent: (node: HTMLElement) => {
        // Prevent smooth scroll on elements with data-lenis-prevent
        // or inside elements with overflow scroll/auto (modals, dropdowns)
        return (
          node.hasAttribute('data-lenis-prevent') ||
          node.closest('[data-lenis-prevent]') !== null
        );
      },
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Start lerp animation loop
    lerpRafRef.current = requestAnimationFrame(animateLerp);

    // Visibility API — pause when tab hidden
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
      if (lerpRafRef.current) cancelAnimationFrame(lerpRafRef.current);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [animateLerp]);

  // IntersectionObserver for section-aware lerp modulation
  useEffect(() => {
    if (!lenisRef.current) return;

    // Observe all sections with IDs that match our weight map
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxRatio = 0;
        let activeSectionId: string | null = null;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSectionId = entry.target.id;
          }
        }

        if (activeSectionId && activeSectionId in SCROLL_WEIGHTS) {
          targetLerpRef.current = SCROLL_WEIGHTS[activeSectionId];
        } else if (activeSectionId) {
          // Section exists but no custom weight — use default
          targetLerpRef.current = DEFAULT_LERP;
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    // Small delay to let DOM render sections
    const timer = setTimeout(() => {
      const allSections = document.querySelectorAll('section[id], [data-scroll-section]');
      allSections.forEach((el) => {
        observerRef.current?.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [lenis, location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    // Reset lerp to default for new page
    targetLerpRef.current = DEFAULT_LERP;
    currentLerpRef.current = DEFAULT_LERP;
    if (lenisRef.current) {
      (lenisRef.current as any).options.lerp = DEFAULT_LERP;
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
