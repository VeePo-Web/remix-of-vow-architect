import { useEffect, useState } from 'react';

interface VigilPhase {
  isStillness: boolean;
  isKindling: boolean;
  isRevealing: boolean;
  isComplete: boolean;
}

/**
 * Vigil + Held Breath Orchestration Hook
 * Manages the sacred 0–8s arrival sequence:
 * - 0–1500ms: Complete stillness (void + flame breathe)
 * - 1500–3500ms: Kindling (flame expands, reveals image)
 * - 3500–5500ms: Revelation (full image, Ken Burns starts)
 * - 5500ms+: Covenant (UI elements stagger in)
 */
export function useVigilSequence(): VigilPhase {
  const [phase, setPhase] = useState<VigilPhase>({
    isStillness: true,
    isKindling: false,
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
        isKindling: false,
        isRevealing: false,
        isComplete: true,
      });
      return;
    }

    // Act I: Stillness (0–1500ms)
    const stillnessTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: true,
        isRevealing: false,
        isComplete: false,
      });
    }, 1500);

    // Act II: Kindling (1500–3500ms)
    const kindlingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: true,
        isComplete: false,
      });
    }, 3500);

    // Act III: Revelation (3500–5500ms)
    const revealingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: false,
        isComplete: true,
      });
    }, 5500);

    return () => {
      clearTimeout(stillnessTimer);
      clearTimeout(kindlingTimer);
      clearTimeout(revealingTimer);
    };
  }, []);

  return phase;
}
