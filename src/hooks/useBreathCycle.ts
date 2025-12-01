import { useState, useEffect, useRef, useCallback } from 'react';
import type { LineState } from './usePathMorph';

/**
 * Breath Cycle System — The Living Line
 * 
 * A 4-second breathing cycle that gives the golden thread life.
 * The line inhales (contracts, brightens) and exhales (expands, softens)
 * like a held breath before a vow is spoken.
 * 
 * Mathematical foundation: sine wave interpolation with intensity
 * modulation based on current line state.
 */

export type BreathStage = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

export interface BreathProperties {
  /** Current stroke width multiplier (0.85 - 1.15) */
  strokeWidth: number;
  /** Current opacity multiplier (0.7 - 1.0) */
  opacity: number;
  /** Current glow intensity (0.3 - 1.0) */
  glowIntensity: number;
  /** Current glow blur radius in px */
  glowBlur: number;
  /** Breath phase as 0-1 normalized value */
  phase: number;
  /** Current breath stage name */
  stage: BreathStage;
  /** Is breath currently paused (during strike) */
  isPaused: boolean;
}

interface UseBreathCycleOptions {
  /** Total cycle duration in ms (default: 4000) */
  cycleDuration?: number;
  /** Current line state for intensity modulation */
  lineState: LineState;
  /** Whether animation is active */
  isActive?: boolean;
  /** Pause breath during strike */
  pauseForStrike?: boolean;
}

// Intensity multipliers per line state
// Silent is subtle, keys is pronounced
const STATE_INTENSITY: Record<LineState, number> = {
  silent: 0.3,
  pulse: 0.5,
  wave: 0.7,
  refined: 0.9,
  keys: 1.2,
};

// Breath stage timing (as percentage of cycle)
const STAGE_TIMING = {
  inhale: { start: 0, end: 0.25 },
  'hold-in': { start: 0.25, end: 0.35 },
  exhale: { start: 0.35, end: 0.75 },
  'hold-out': { start: 0.75, end: 1.0 },
};

/**
 * Custom sine-based easing for organic breath feel
 * Uses cubic-bezier approximation of biological breathing
 */
function breathEase(t: number): number {
  // Asymmetric sine wave - inhale is slightly faster than exhale
  return (1 - Math.cos(t * Math.PI)) / 2;
}

/**
 * Get current breath stage from phase
 */
function getBreathStage(phase: number): BreathStage {
  if (phase < STAGE_TIMING['inhale'].end) return 'inhale';
  if (phase < STAGE_TIMING['hold-in'].end) return 'hold-in';
  if (phase < STAGE_TIMING['exhale'].end) return 'exhale';
  return 'hold-out';
}

/**
 * Calculate breath value (0-1) based on phase
 * 0 = fully exhaled, 1 = fully inhaled
 */
function calculateBreathValue(phase: number): number {
  const stage = getBreathStage(phase);
  
  switch (stage) {
    case 'inhale': {
      const stageProgress = phase / STAGE_TIMING['inhale'].end;
      return breathEase(stageProgress);
    }
    case 'hold-in':
      return 1;
    case 'exhale': {
      const stageStart = STAGE_TIMING['exhale'].start;
      const stageDuration = STAGE_TIMING['exhale'].end - stageStart;
      const stageProgress = (phase - stageStart) / stageDuration;
      return 1 - breathEase(stageProgress);
    }
    case 'hold-out':
      return 0;
    default:
      return 0;
  }
}

export function useBreathCycle({
  cycleDuration = 4000,
  lineState,
  isActive = true,
  pauseForStrike = false,
}: UseBreathCycleOptions): BreathProperties {
  const [phase, setPhase] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedPhaseRef = useRef<number>(0);

  // Handle pause state changes
  useEffect(() => {
    if (pauseForStrike) {
      setIsPaused(true);
      pausedPhaseRef.current = phase;
    } else {
      setIsPaused(false);
      startTimeRef.current = null; // Reset to resume from current phase
    }
  }, [pauseForStrike, phase]);

  // Main animation loop
  useEffect(() => {
    if (!isActive || isPaused) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase(0.5); // Rest at middle state
      return;
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        // Resume from paused phase
        startTimeRef.current = timestamp - (pausedPhaseRef.current * cycleDuration);
      }

      const elapsed = timestamp - startTimeRef.current;
      const newPhase = (elapsed % cycleDuration) / cycleDuration;
      
      setPhase(newPhase);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isActive, isPaused, cycleDuration]);

  // Calculate breath properties
  const intensity = STATE_INTENSITY[lineState];
  const breathValue = calculateBreathValue(phase);
  const stage = getBreathStage(phase);

  // Apply intensity modulation to all properties
  const strokeWidthRange = 0.15 * intensity; // 0.85 - 1.15 at full intensity
  const opacityRange = 0.3 * intensity; // 0.7 - 1.0 at full intensity
  const glowRange = 0.7 * intensity; // 0.3 - 1.0 at full intensity
  const blurRange = 4 * intensity; // 4 - 8px at full intensity

  return {
    strokeWidth: 1 - strokeWidthRange / 2 + breathValue * strokeWidthRange,
    opacity: (1 - opacityRange) + breathValue * opacityRange,
    glowIntensity: (1 - glowRange) + breathValue * glowRange,
    glowBlur: 4 + breathValue * blurRange,
    phase,
    stage,
    isPaused,
  };
}

export default useBreathCycle;
