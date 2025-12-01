import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Strike Animation System — The ADSR Envelope
 * 
 * When a movement card connects to the golden thread, the line
 * responds with a musical ADSR envelope:
 * 
 * Attack (80ms)  — Sharp initial displacement
 * Decay (120ms)  — Quick settle to sustain level
 * Sustain (200ms) — Held at connection point
 * Release (400ms) — Graceful return to rest
 * 
 * Total duration: 800ms — the length of a held breath.
 */

export type StrikePhase = 'idle' | 'attack' | 'decay' | 'sustain' | 'release';

export interface StrikeState {
  /** Current ADSR phase */
  phase: StrikePhase;
  /** Displacement value (0-1, peak at 1) */
  displacement: number;
  /** Current strike position (0-1 along line) */
  position: number;
  /** Whether a strike is currently active */
  isActive: boolean;
  /** Wave propagation distance from strike point */
  waveRadius: number;
  /** Wave amplitude at current radius */
  waveAmplitude: number;
}

interface StrikeEvent {
  position: number;
  timestamp: number;
  id: string;
}

interface UseStrikeAnimationOptions {
  /** Position along line (0-1) where strike occurs */
  strikePosition?: number;
  /** Callback when strike completes (for resonance ring spawn) */
  onStrikeComplete?: (position: number) => void;
  /** Callback at peak displacement (for ring spawn) */
  onStrikePeak?: (position: number) => void;
  /** Whether animation system is active */
  isActive?: boolean;
}

// ADSR timing in milliseconds
const ADSR = {
  attack: 80,
  decay: 120,
  sustain: 200,
  release: 400,
  total: 800,
};

// Displacement levels
const LEVELS = {
  peak: 1.0,       // Attack peak
  sustain: 0.4,   // Sustain level
  rest: 0,        // Release end
};

// Wave propagation settings
const WAVE = {
  speed: 0.5,     // Units per 100ms
  maxRadius: 0.3, // Max propagation distance
  dampening: 0.85, // Amplitude decay per unit distance
};

// Strike positions (20%, 40%, 60%, 80% of line)
export const STRIKE_POSITIONS = [0.2, 0.4, 0.6, 0.8];

/**
 * Attack easing — sharp exponential rise
 * Bezier approximation: cubic-bezier(0.34, 1.56, 0.64, 1)
 */
function attackEase(t: number): number {
  // Slight overshoot for "pluck" feel
  const overshoot = 1.1;
  const c1 = 1.70158 * overshoot;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/**
 * Decay easing — quick settle
 * Bezier approximation: cubic-bezier(0.22, 1, 0.36, 1)
 */
function decayEase(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Release easing — graceful exponential decay
 * Bezier approximation: cubic-bezier(0.16, 1, 0.3, 1)
 */
function releaseEase(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Calculate displacement value based on ADSR phase
 */
function calculateDisplacement(
  elapsed: number
): { displacement: number; phase: StrikePhase } {
  if (elapsed < ADSR.attack) {
    // Attack phase
    const t = elapsed / ADSR.attack;
    return {
      displacement: LEVELS.rest + attackEase(t) * (LEVELS.peak - LEVELS.rest),
      phase: 'attack',
    };
  }
  
  if (elapsed < ADSR.attack + ADSR.decay) {
    // Decay phase
    const t = (elapsed - ADSR.attack) / ADSR.decay;
    return {
      displacement: LEVELS.peak - decayEase(t) * (LEVELS.peak - LEVELS.sustain),
      phase: 'decay',
    };
  }
  
  if (elapsed < ADSR.attack + ADSR.decay + ADSR.sustain) {
    // Sustain phase
    return {
      displacement: LEVELS.sustain,
      phase: 'sustain',
    };
  }
  
  if (elapsed < ADSR.total) {
    // Release phase
    const releaseStart = ADSR.attack + ADSR.decay + ADSR.sustain;
    const t = (elapsed - releaseStart) / ADSR.release;
    return {
      displacement: LEVELS.sustain - releaseEase(t) * LEVELS.sustain,
      phase: 'release',
    };
  }
  
  return { displacement: LEVELS.rest, phase: 'idle' };
}

/**
 * Calculate wave propagation from strike point
 */
function calculateWave(
  elapsed: number,
  position: number
): { radius: number; amplitude: number } {
  const radius = Math.min((elapsed / 100) * WAVE.speed, WAVE.maxRadius);
  const amplitude = Math.pow(WAVE.dampening, radius * 10) * (1 - elapsed / ADSR.total);
  
  return { radius, amplitude };
}

export function useStrikeAnimation({
  strikePosition,
  onStrikeComplete,
  onStrikePeak,
  isActive = true,
}: UseStrikeAnimationOptions = {}): [StrikeState, (position: number) => void] {
  const [state, setState] = useState<StrikeState>({
    phase: 'idle',
    displacement: 0,
    position: 0,
    isActive: false,
    waveRadius: 0,
    waveAmplitude: 0,
  });

  const rafRef = useRef<number | null>(null);
  const strikeStartRef = useRef<number | null>(null);
  const currentPositionRef = useRef<number>(0);
  const peakFiredRef = useRef<boolean>(false);
  const lastStrikeTimeRef = useRef<number>(0);

  // Anti-spam: minimum 500ms between strikes
  const MIN_STRIKE_INTERVAL = 500;

  const triggerStrike = useCallback((position: number) => {
    const now = performance.now();
    
    // Anti-spam check
    if (now - lastStrikeTimeRef.current < MIN_STRIKE_INTERVAL) {
      return;
    }
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Fire callbacks immediately without animation
      onStrikePeak?.(position);
      setTimeout(() => onStrikeComplete?.(position), 100);
      return;
    }
    
    lastStrikeTimeRef.current = now;
    strikeStartRef.current = now;
    currentPositionRef.current = position;
    peakFiredRef.current = false;
    
    setState(prev => ({
      ...prev,
      isActive: true,
      position,
      phase: 'attack',
    }));
  }, [onStrikePeak, onStrikeComplete]);

  // Trigger strike when strikePosition changes
  useEffect(() => {
    if (strikePosition !== undefined && strikePosition >= 0 && isActive) {
      triggerStrike(strikePosition);
    }
  }, [strikePosition, isActive, triggerStrike]);

  // Animation loop
  useEffect(() => {
    if (!state.isActive || !isActive) {
      return;
    }

    const animate = (timestamp: number) => {
      if (strikeStartRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - strikeStartRef.current;
      const { displacement, phase } = calculateDisplacement(elapsed);
      const { radius, amplitude } = calculateWave(elapsed, currentPositionRef.current);

      // Fire peak callback at attack peak
      if (!peakFiredRef.current && phase === 'decay') {
        peakFiredRef.current = true;
        onStrikePeak?.(currentPositionRef.current);
      }

      if (phase === 'idle') {
        // Strike complete
        setState(prev => ({
          ...prev,
          phase: 'idle',
          displacement: 0,
          isActive: false,
          waveRadius: 0,
          waveAmplitude: 0,
        }));
        strikeStartRef.current = null;
        onStrikeComplete?.(currentPositionRef.current);
        return;
      }

      setState(prev => ({
        ...prev,
        phase,
        displacement,
        waveRadius: radius,
        waveAmplitude: amplitude,
      }));

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [state.isActive, isActive, onStrikeComplete, onStrikePeak]);

  return [state, triggerStrike];
}

export default useStrikeAnimation;
