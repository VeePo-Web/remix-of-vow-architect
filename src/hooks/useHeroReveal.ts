import { useEffect, useState } from 'react';

interface UseHeroRevealOptions {
  delay?: number;
}

/**
 * Instant animation hook for above-fold hero content.
 * Triggers immediately on mount (no Intersection Observer).
 * Used for hero sections that should animate on page load.
 */
export function useHeroReveal({ delay = 0 }: UseHeroRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Trigger animation after specified delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
}
