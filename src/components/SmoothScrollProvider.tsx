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
 *
 * VELOCITY MODULATION:
 * When the user scrolls fast (skimming), weight lightens slightly
 * to honor their intent. When they slow down (reading), weight
 * deepens — like the room getting quieter as they lean in.
 */

// ── Page-level base weights (fallback when no section ID matches) ──
const PAGE_WEIGHTS: Record<string, number> = {
  '/':            0.05,   // Gateway — cinematic first impression
  '/weddings':    0.055,  // Wedding homepage — sacred narrative
  '/events':      0.06,   // Events — warm but weighted
  '/teaching':    0.06,   // Teaching — contemplative
  '/pricing':    0.07,   // Pricing — needs scannability
  '/about':       0.055,  // About — personal, intimate
  '/proof':       0.065,  // Proof — gallery browsing needs flow
  '/listen':      0.06,   // Listen — immersive audio
  '/faq':         0.08,   // FAQ — utility, scan-friendly
  '/contact':     0.07,   // Contact — form usability matters
  '/privacy-policy': 0.09, // Legal — maximum utility
  '/terms':       0.09,
  '/cookie-policy': 0.09,
  '/accessibility': 0.09,
  '/legal':       0.09,
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

  // ── About (Witness) page ──
  'witness-hero':       0.04,   // The Resonance — cinematic entrance
  'witness-origin':     0.05,   // The Origin — heavy, personal story
  'witness-sustain':    0.055,  // The Sustain — contemplative
  'witness-presence':   0.06,   // The Presence — credential browsing
  'witness-covenant':   0.045,  // The Covenant — sacred weight
  'witness-crossing':   0.045,  // The Crossing — commitment
};

const DEFAULT_LERP = 0.06;

// How fast lerp interpolates between sections.
// 0.012 creates ~2s of gradual weight shift — like a hall reverb tail.
const LERP_INTERPOLATION = 0.012;

// ── Velocity modulation constants ──
// When scrolling fast, lighten weight by up to this factor
const VELOCITY_LIGHTEN_MAX = 0.015;
// Velocity threshold (px/frame) above which lightening kicks in
const VELOCITY_THRESHOLD = 3;
// How fast velocity influence decays back to zero
const VELOCITY_DECAY = 0.92;

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
  const velocityInfluenceRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Smoothly interpolate lerp toward target with velocity modulation
  const animateLerp = useCallback(() => {
    if (!lenisRef.current) return;

    const current = currentLerpRef.current;
    const target = targetLerpRef.current;
    const diff = target - current;

    // Decay velocity influence each frame
    velocityInfluenceRef.current *= VELOCITY_DECAY;
    if (velocityInfluenceRef.current < 0.0001) {
      velocityInfluenceRef.current = 0;
    }

    if (Math.abs(diff) > 0.0005) {
      currentLerpRef.current = current + diff * LERP_INTERPOLATION;
    } else {
      currentLerpRef.current = target;
    }

    // Apply velocity lightening — fast scroll = slightly lighter feel
    const effectiveLerp = currentLerpRef.current + velocityInfluenceRef.current;
    (lenisRef.current as any).options.lerp = Math.min(effectiveLerp, 0.12);

    lerpRafRef.current = requestAnimationFrame(animateLerp);
  }, []);

  // Track scroll velocity for modulation
  const onScroll = useCallback(() => {
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt < 8) return; // Skip sub-frame updates

    const scrollY = window.scrollY;
    const velocity = Math.abs(scrollY - lastScrollYRef.current) / (dt / 16.67);

    lastScrollYRef.current = scrollY;
    lastTimeRef.current = now;

    // When velocity exceeds threshold, lighten the weight
    if (velocity > VELOCITY_THRESHOLD) {
      const intensity = Math.min(
        (velocity - VELOCITY_THRESHOLD) / 20,
        1
      );
      velocityInfluenceRef.current = Math.max(
        velocityInfluenceRef.current,
        intensity * VELOCITY_LIGHTEN_MAX
      );
    }
  }, []);

  // Initialize Lenis
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const instance = new Lenis({
      lerp: DEFAULT_LERP,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 0.9,
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

    // Track velocity via passive scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Visibility API
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
      window.removeEventListener('scroll', onScroll);
      if (lerpRafRef.current) cancelAnimationFrame(lerpRafRef.current);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [animateLerp, onScroll]);

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
  // Scroll reset is now phase-synced via PageTransition
  const hasResetForPathRef = useRef(location.pathname);

  useEffect(() => {
    const pageWeight = PAGE_WEIGHTS[location.pathname] ?? DEFAULT_LERP;
    pageLerpRef.current = pageWeight;
    targetLerpRef.current = pageWeight;
    currentLerpRef.current = pageWeight;
    velocityInfluenceRef.current = 0;

    if (lenisRef.current) {
      (lenisRef.current as any).options.lerp = pageWeight;
    }

    // Only reset scroll when pathname actually changes
    if (hasResetForPathRef.current !== location.pathname) {
      hasResetForPathRef.current = location.pathname;
      // Delay to let PageTransition swap content before scrolling
      const delay = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }, 80);
      return () => clearTimeout(delay);
    }
  }, [location.pathname]);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
