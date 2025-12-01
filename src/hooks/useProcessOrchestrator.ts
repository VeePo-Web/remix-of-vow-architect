import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Phase boundaries aligned with FlameSystem states
 */
const PHASE_BOUNDARIES = {
  vigil: { start: 0, end: 0.20 },
  awakening: { start: 0.20, end: 0.28 },
  drifting: { start: 0.28, end: 0.75 },
  converging: { start: 0.75, end: 0.88 },
  covenant: { start: 0.88, end: 1.0 },
} as const;

export type FlamePhase = keyof typeof PHASE_BOUNDARIES;

interface OrchestratorState {
  /** Normalized progress 0-1 through entire section */
  progress: number;
  /** Current flame phase name */
  phase: FlamePhase;
  /** Progress within current phase (0-1) */
  phaseProgress: number;
  /** Whether section is currently in viewport */
  isActive: boolean;
  /** Scroll velocity (-1 to 1, negative = scrolling up) */
  velocity: number;
  /** Scroll direction */
  direction: 'up' | 'down' | 'idle';
  /** Currently highlighted movement index (0-3) during drifting */
  highlightedMovement: number;
  /** Glow intensity (bell curve, peaks mid-scroll) */
  glowIntensity: number;
  /** Temperature shift (0 = cold/void, 1 = warm/dawn) */
  temperature: number;
  /** CSS variables object for inline application */
  cssVars: Record<string, string>;
}

interface UseProcessOrchestratorOptions {
  /** Throttle interval in ms (default: 16 for ~60fps) */
  throttleMs?: number;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * useProcessOrchestrator — Unified Timing System
 * 
 * Master orchestrator for all Process section animations.
 * Single RAF loop managing scroll state, phase transitions,
 * and cross-layer synchronization.
 */
export function useProcessOrchestrator(
  sectionRef: React.RefObject<HTMLElement>,
  options: UseProcessOrchestratorOptions = {}
): OrchestratorState {
  const { throttleMs = 16, debug = false } = options;
  
  const [state, setState] = useState<OrchestratorState>({
    progress: 0,
    phase: 'vigil',
    phaseProgress: 0,
    isActive: false,
    velocity: 0,
    direction: 'idle',
    highlightedMovement: -1,
    glowIntensity: 0,
    temperature: 0,
    cssVars: generateCSSVars(0, 'vigil', 0, 0, 0),
  });
  
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const velocityBufferRef = useRef<number[]>([]);

  /**
   * Determine phase from progress
   */
  const getPhase = useCallback((progress: number): FlamePhase => {
    for (const [phase, bounds] of Object.entries(PHASE_BOUNDARIES)) {
      if (progress >= bounds.start && progress < bounds.end) {
        return phase as FlamePhase;
      }
    }
    return 'covenant';
  }, []);

  /**
   * Calculate progress within current phase (0-1)
   */
  const getPhaseProgress = useCallback((progress: number, phase: FlamePhase): number => {
    const bounds = PHASE_BOUNDARIES[phase];
    const range = bounds.end - bounds.start;
    return Math.max(0, Math.min(1, (progress - bounds.start) / range));
  }, []);

  /**
   * Map drifting progress to movement index (0-3)
   */
  const getHighlightedMovement = useCallback((progress: number, phase: FlamePhase): number => {
    if (phase !== 'drifting') return -1;
    
    const driftStart = PHASE_BOUNDARIES.drifting.start;
    const driftEnd = PHASE_BOUNDARIES.drifting.end;
    const driftRange = driftEnd - driftStart;
    const driftProgress = (progress - driftStart) / driftRange;
    
    // Divide into 4 equal segments for 4 movements
    return Math.min(3, Math.floor(driftProgress * 4));
  }, []);

  /**
   * Calculate velocity from progress delta buffer
   */
  const calculateVelocity = useCallback((currentProgress: number): number => {
    const delta = currentProgress - lastProgressRef.current;
    velocityBufferRef.current.push(delta);
    
    // Keep last 5 samples for smoothing
    if (velocityBufferRef.current.length > 5) {
      velocityBufferRef.current.shift();
    }
    
    // Average velocity, clamped to -1...1
    const avgVelocity = velocityBufferRef.current.reduce((a, b) => a + b, 0) / velocityBufferRef.current.length;
    return Math.max(-1, Math.min(1, avgVelocity * 50)); // Scale for sensitivity
  }, []);

  /**
   * Main scroll handler — single RAF loop
   */
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !isActiveRef.current) return;
    
    const now = performance.now();
    if (now - lastUpdateRef.current < throttleMs) {
      rafRef.current = requestAnimationFrame(handleScroll);
      return;
    }
    lastUpdateRef.current = now;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate progress
    const scrolledIntoSection = viewportHeight - rect.top;
    const totalScrollDistance = rect.height + viewportHeight;
    const rawProgress = scrolledIntoSection / totalScrollDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));
    
    // Derived values
    const phase = getPhase(progress);
    const phaseProgress = getPhaseProgress(progress, phase);
    const velocity = calculateVelocity(progress);
    const direction = velocity > 0.01 ? 'down' : velocity < -0.01 ? 'up' : 'idle';
    const highlightedMovement = getHighlightedMovement(progress, phase);
    
    // Bell curve for glow intensity
    const glowIntensity = Math.sin(Math.PI * progress);
    
    // Exponential temperature
    const temperature = Math.pow(progress, 1.5);
    
    lastProgressRef.current = progress;
    
    const newState: OrchestratorState = {
      progress,
      phase,
      phaseProgress,
      isActive: true,
      velocity,
      direction,
      highlightedMovement,
      glowIntensity,
      temperature,
      cssVars: generateCSSVars(progress, phase, phaseProgress, glowIntensity, temperature),
    };
    
    setState(newState);
    
    if (debug) {
      console.log('[Orchestrator]', {
        progress: progress.toFixed(3),
        phase,
        phaseProgress: phaseProgress.toFixed(2),
        highlightedMovement,
        velocity: velocity.toFixed(3),
      });
    }
  }, [sectionRef, throttleMs, getPhase, getPhaseProgress, getHighlightedMovement, calculateVelocity, debug]);

  /**
   * Intersection Observer for activation
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: jump to end state
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setState({
        progress: 1,
        phase: 'covenant',
        phaseProgress: 1,
        isActive: true,
        velocity: 0,
        direction: 'idle',
        highlightedMovement: -1,
        glowIntensity: 0,
        temperature: 1,
        cssVars: generateCSSVars(1, 'covenant', 1, 0, 1),
      });
      return;
    }

    // Visibility API for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else if (isActiveRef.current) {
        handleScroll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          handleScroll();
          window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
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
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
  phase: FlamePhase,
  phaseProgress: number,
  glowIntensity: number,
  temperature: number
): Record<string, string> {
  // Background color interpolation: void-black → dawn-warmth
  const bgH = lerp(240, 35, temperature);
  const bgS = lerp(12, 20, temperature);
  const bgL = lerp(3, 8, temperature);
  
  // Glow modulation
  const glowOpacity = glowIntensity * 0.12;
  const bloomOpacity = glowIntensity * 0.06;
  const bloomSize = lerp(30, 50, progress);
  
  // Phase-specific timing multiplier (faster scroll = snappier)
  const timingMultiplier = phase === 'drifting' ? 0.8 : 
                           phase === 'converging' ? 0.9 : 
                           phase === 'covenant' ? 1.0 : 0.7;
  
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
    '--process-phase-progress': `${phaseProgress}`,
    '--process-timing-multiplier': `${timingMultiplier}`,
  };
}

/**
 * Linear interpolation helper
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export default useProcessOrchestrator;
