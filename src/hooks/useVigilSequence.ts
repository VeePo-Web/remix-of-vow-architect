import { useEffect, useState } from 'react';

interface VigilPhase {
  isStillness: boolean;
  isKindling: boolean;
  isRevealing: boolean;
  isComplete: boolean;
}

/**
 * Vigil + Held Breath Orchestration Hook (Fantasy.co Refined)
 * Extended timing for deeper anticipation:
 * - 0–2000ms: Complete stillness (void + flame breathe)
 * - 2000–4000ms: Kindling (flame expands, reveals image)
 * - 4000–6000ms: Revelation (full image, Ken Burns starts)
 * - 6000ms+: Covenant (UI elements stagger in)
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

    // Act I: Stillness (0–2000ms) — Extended for deeper anticipation
    const stillnessTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: true,
        isRevealing: false,
        isComplete: false,
      });
    }, 2000);

    // Act II: Kindling (2000–4000ms)
    const kindlingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: true,
        isComplete: false,
      });
    }, 4000);

    // Act III: Revelation (4000–6000ms)
    const revealingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: false,
        isComplete: true,
      });
    }, 6000);

    return () => {
      clearTimeout(stillnessTimer);
      clearTimeout(kindlingTimer);
      clearTimeout(revealingTimer);
    };
  }, []);

  return phase;
}
