import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useLocation } from 'react-router-dom';

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SACRED SCROLL WEIGHT SYSTEM                                ║
 * ║  "The scroll should feel like walking down a wedding aisle" ║
 * ╚══════════════════════════════════════════════════════════════╝
 * 
 * Lower lerp = heavier momentum, longer sustain after input stops.
 * Think of lerp as the "damper pedal" — lower values hold the note longer.
 * 
 * 0.03–0.04  → Cathedral gravity (hero vigils, altar moments)
 * 0.05–0.06  → Reverent narrative (emotional storytelling)
 * 0.065–0.07 → Breathing room (interactive sections, grids)
 * 0.08–0.09  → Utility comfort (FAQ, legal, forms)
 */

// ── Page-level base weights (fallback when no section ID matches) ──
const PAGE_WEIGHTS: Record<string, number> = {
  '/':            0.05,   // Gateway — cinematic first impression
  '/weddings':    0.055,  // Wedding homepage — sacred narrative
  '/events':      0.06,   // Events — warm but weighted
  '/teaching':    0.06,   // Teaching — contemplative
  '/services':    0.07,   // Pricing — needs scannability
  '/about':       0.055,  // About — personal, intimate
  '/gallery':     0.065,  // Proof — gallery browsing needs flow
  '/listen':      0.06,   // Listen — immersive audio
  '/faq':         0.08,   // FAQ — utility, scan-friendly
  '/contact':     0.07,   // Contact — form usability matters
};

// ── Section-specific weights (override page-level) ──
const SCROLL_WEIGHTS: Record<string, number> = {
  // ── Weddings page — the full Death→Life arc ──
  'vigil':              0.035,  // Hero — cathedral gravity, the held breath
  'the-exhale':         0.05,   // Sacred pause — heavy recognition moment
  'process':            0.06,   // Composer's journal — moderate for card interaction
  'vow-moment':         0.035,  // Altar interstitial — maximum gravity (matches hero)
  'the-invitation':     0.055,  // Meet the owner — intimate narrative weight
  'the-sound':          0.065,  // Listening room — lighter for genre browsing
  'the-transformation': 0.05,   // Fears → promise — emotional gravity
  'the-witness':        0.055,  // Preparation & kit — steady, reverent
  'three-paths':        0.06,   // Pricing keys — moderate for comparison
  'the-witnesses':      0.055,  // Testimonials — let stories land
  'the-crossing':       0.045,  // Final CTA — heavy for commitment weight

  // ── Gateway ──
  'gateway':            0.04,   // First-ever impression — maximum cinema

  // ── Events page ──
  'events-hero':        0.04,   // Hero — cinematic entrance
  'events-exhale':      0.055,  // Recognition — weighted pause
  'events-occasions':   0.065,  // Grid — browsable
  'events-approach':    0.055,  // Narrative — reverent
  'events-threshold':   0.05,   // Fears — emotional gravity
  'events-experience':  0.06,   // Features — moderate
  'events-offering':    0.065,  // Packages — scannable
  'events-crossing':    0.045,  // CTA — commitment weight

  // ── Teaching page ──
  'teaching-hero':      0.04,   // Hero — cinematic entrance
  'teaching-exhale':    0.055,  // Recognition — weighted pause
  'teaching-pillars':   0.06,   // Philosophy cards — moderate
  'teaching-methodology': 0.055, // Deep narrative — reverent
  'teaching-threshold': 0.05,   // Fears — emotional gravity
  'teaching-stories':   0.055,  // Witness stories — let them land
  'teaching-offering':  0.065,  // Pricing — scannable
  'teaching-crossing':  0.045,  // CTA — commitment weight

  // ── About page ──
  'witness-hero':       0.04,   // About hero — cinematic
};

const DEFAULT_LERP = 0.06;

// Lerp transition uses its own interpolation factor.
// Lower = slower, more luxurious weight transitions between sections.
// 0.015 creates ~1.5s of gradual weight shift — like a hall reverb tail.
const LERP_INTERPOLATION = 0.015;

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
  const pageLerpRef = useRef(DEFAULT_LERP);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lerpRafRef = useRef<number | null>(null);

  // Smoothly interpolate lerp toward target — the transition itself feels luxurious
  const animateLerp = useCallback(() => {
    if (!lenisRef.current) return;

    const current = currentLerpRef.current;
    const target = targetLerpRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.0005) {
      // Slow, reverent interpolation — weight changes feel like tidal shifts
      currentLerpRef.current = current + diff * LERP_INTERPOLATION;
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
      wheelMultiplier: 0.7,    // Dampened — each scroll tick is deliberate
      touchMultiplier: 0.9,    // Slightly dampened touch for weight on mobile
      autoRaf: true,
      anchors: {
        offset: -80,
      },
      prevent: (node: HTMLElement) => {
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

    observerRef.current = new IntersectionObserver(
      (entries) => {
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
          // Section exists but no custom weight — fall back to page weight
          targetLerpRef.current = pageLerpRef.current;
        }
      },
      {
        threshold: [0.05, 0.15, 0.3, 0.5],
        rootMargin: '-5% 0px -15% 0px',
      }
    );

    // Delay to let DOM render
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

  // Set page-level base weight on route change
  useEffect(() => {
    const pageWeight = PAGE_WEIGHTS[location.pathname] ?? DEFAULT_LERP;
    pageLerpRef.current = pageWeight;
    targetLerpRef.current = pageWeight;
    currentLerpRef.current = pageWeight;
    
    if (lenisRef.current) {
      (lenisRef.current as any).options.lerp = pageWeight;
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
