import { useEffect, useState } from 'react';

interface VigilPhase {
  isStillness: boolean;
  isGlowing: boolean;
  isRevealing: boolean;
  isComplete: boolean;
}

/**
 * Vigil + Held Breath Orchestration Hook
 * Manages the sacred 0–2.5s arrival sequence:
 * - 0–800ms: Complete stillness (void)
 * - 800–1400ms: Ambient glow awakening
 * - 1400–2500ms: Content revelation cascade
 * - 2500ms+: Complete
 */
export function useVigilSequence(): VigilPhase {
  const [phase, setPhase] = useState<VigilPhase>({
    isStillness: true,
    isGlowing: false,
    isRevealing: false,
    isComplete: false,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Skip to complete immediately
      setPhase({
        isStillness: false,
        isGlowing: false,
        isRevealing: false,
        isComplete: true,
      });
      return;
    }

    // Phase 1: Stillness (0–800ms)
    const stillnessTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isGlowing: true,
        isRevealing: false,
        isComplete: false,
      });
    }, 800);

    // Phase 2: Glowing (800–1400ms)
    const glowingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isGlowing: true,
        isRevealing: true,
        isComplete: false,
      });
    }, 1400);

    // Phase 3: Complete (2500ms+)
    const completeTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isGlowing: false,
        isRevealing: false,
        isComplete: true,
      });
    }, 2500);

    return () => {
      clearTimeout(stillnessTimer);
      clearTimeout(glowingTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return phase;
}
