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
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';

  const [phase, setPhase] = useState<VigilPhase>({
    isStillness: !hasPlayed,
    isKindling: false,
    isRevealing: false,
    isComplete: hasPlayed,
  });

  useEffect(() => {
    if (hasPlayed) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: false,
        isComplete: true,
      });
      sessionStorage.setItem('vigil-complete', 'true');
      return;
    }

    const stillnessTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: true,
        isRevealing: false,
        isComplete: false,
      });
    }, 2000);

    const kindlingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: true,
        isComplete: false,
      });
    }, 4000);

    const revealingTimer = setTimeout(() => {
      setPhase({
        isStillness: false,
        isKindling: false,
        isRevealing: false,
        isComplete: true,
      });
      sessionStorage.setItem('vigil-complete', 'true');
    }, 6000);

    return () => {
      clearTimeout(stillnessTimer);
      clearTimeout(kindlingTimer);
      clearTimeout(revealingTimer);
    };
  }, [hasPlayed]);

  return phase;
}
