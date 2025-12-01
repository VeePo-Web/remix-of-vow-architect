import { useEffect, useRef, useState, useCallback } from 'react';

interface ProcessScrollState {
  /** Normalized progress 0-1 through entire section */
  progress: number;
  /** Current discrete phase (0-7) for staged transitions */
  phase: number;
  /** Whether section is currently in viewport */
  isActive: boolean;
  /** Glow intensity (bell curve, peaks mid-scroll) */
  glowIntensity: number;
  /** Temperature shift (0 = cold/void, 1 = warm/dawn) */
  temperature: number;
  /** CSS variables object for inline application */
  cssVars: Record<string, string>;
}

interface UseProcessScrollOptions {
  /** Number of discrete phases for staged reveals */
  phases?: number;
  /** Throttle interval in ms (default: 16 for ~60fps) */
  throttleMs?: number;
}

/**
 * useProcessScroll — Master Scroll Orchestrator
 * 
 * Manages scroll-linked state for the Process section's
 * "From Void to Voice" visual transformation.
 * 
 * Features:
 * - RAF-throttled scroll calculations
 * - 8 discrete phases for staged transitions
 * - Bell-curve glow intensity (peaks mid-scroll)
 * - Exponential temperature shift (cold → warm)
 * - CSS variable generation for GPU-accelerated transitions
 * - Reduced motion fallback
 */
export function useProcessScroll(
  sectionRef: React.RefObject<HTMLElement>,
  options: UseProcessScrollOptions = {}
): ProcessScrollState {
  const { phases = 8, throttleMs = 16 } = options;
  
  const [state, setState] = useState<ProcessScrollState>({
    progress: 0,
    phase: 0,
    isActive: false,
    glowIntensity: 0,
    temperature: 0,
    cssVars: generateCSSVars(0, 0, 0),
  });
  
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const isActiveRef = useRef(false);

  // Calculate derived values from progress
  const calculateState = useCallback((progress: number): Omit<ProcessScrollState, 'isActive'> => {
    // Discrete phase (0-7)
    const phase = Math.min(Math.floor(progress * phases), phases - 1);
    
    // Bell curve for glow intensity (peaks at 0.5 progress)
    // Using sine for smooth bell: sin(π * progress) gives 0→1→0
    const glowIntensity = Math.sin(Math.PI * progress);
    
    // Exponential temperature (cold → warm)
    // Slow start, accelerates toward end
    const temperature = Math.pow(progress, 1.5);
    
    return {
      progress,
      phase,
      glowIntensity,
      temperature,
      cssVars: generateCSSVars(progress, glowIntensity, temperature),
    };
  }, [phases]);

  // Main scroll handler
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !isActiveRef.current) return;
    
    const now = performance.now();
    if (now - lastUpdateRef.current < throttleMs) {
      // Schedule next frame if throttled
      rafRef.current = requestAnimationFrame(handleScroll);
      return;
    }
    lastUpdateRef.current = now;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate progress: 0 when section top enters viewport bottom,
    // 1 when section bottom exits viewport top
    const sectionHeight = rect.height;
    const scrolledIntoSection = viewportHeight - rect.top;
    const totalScrollDistance = sectionHeight + viewportHeight;
    
    // Clamp progress to 0-1
    const rawProgress = scrolledIntoSection / totalScrollDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));
    
    const newState = calculateState(progress);
    
    setState(prev => ({
      ...prev,
      ...newState,
      isActive: true,
    }));
  }, [sectionRef, throttleMs, calculateState]);

  // Intersection Observer for activation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Jump to end state for reduced motion
      setState({
        progress: 1,
        phase: 7,
        isActive: true,
        glowIntensity: 0,
        temperature: 1,
        cssVars: generateCSSVars(1, 0, 1),
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          // Start listening to scroll
          handleScroll();
          window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
          // Stop listening when out of view
          window.removeEventListener('scroll', handleScroll);
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        }
        
        setState(prev => ({ ...prev, isActive: entry.isIntersecting }));
      },
      {
        threshold: 0,
        rootMargin: '100px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionRef, handleScroll]);

  return state;
}

/**
 * Generate CSS custom properties for GPU-accelerated transitions
 */
function generateCSSVars(
  progress: number,
  glowIntensity: number,
  temperature: number
): Record<string, string> {
  // Background color interpolation: void-black → dawn-warmth
  // Void: hsl(240, 12%, 3%) — cold blue-black
  // Dawn: hsl(35, 20%, 8%) — warm brown-black
  const bgH = lerp(240, 35, temperature);
  const bgS = lerp(12, 20, temperature);
  const bgL = lerp(3, 8, temperature);
  
  // Glow color remains vow-yellow but intensity varies
  const glowOpacity = glowIntensity * 0.12; // Max 12% opacity
  const bloomOpacity = glowIntensity * 0.06; // Max 6% for outer bloom
  const bloomSize = lerp(30, 50, progress); // Bloom expands with scroll
  
  return {
    '--process-bg-h': `${bgH}`,
    '--process-bg-s': `${bgS}%`,
    '--process-bg-l': `${bgL}%`,
    '--process-glow-opacity': `${glowOpacity}`,
    '--process-bloom-opacity': `${bloomOpacity}`,
    '--process-bloom-size': `${bloomSize}%`,
    '--process-temperature': `${temperature}`,
    '--process-progress': `${progress}`,
    '--process-intensity': `${glowIntensity}`,
  };
}

/**
 * Linear interpolation helper
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export default useProcessScroll;
