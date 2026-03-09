import { useEffect, useRef } from 'react';

interface UseScrollParallaxOptions {
  intensity?: number;
  enableFogFade?: boolean;
  fogIntensity?: number;
}

/**
 * Scroll-linked parallax hook for background images and atmospheric fog
 * Returns a ref to attach to the section element
 * 
 * @param intensity - Parallax translation intensity (default: 60px)
 * @param enableFogFade - Whether to fade fog based on scroll
 * @param fogIntensity - Starting fog opacity (default: 0.4)
 */
export function useScrollParallax({
  intensity = 60,
  enableFogFade = false,
  fogIntensity = 0.4,
}: UseScrollParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!ref.current || prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
      
      // Set parallax CSS variable
      ref.current.style.setProperty('--parallax-y', `${scrollProgress * intensity}px`);
      
      // Set fog opacity if enabled
      if (enableFogFade) {
        ref.current.style.setProperty('--fog-opacity', `${fogIntensity * (1 - scrollProgress)}`);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll(); // Initial calculation
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intensity, enableFogFade, fogIntensity]);

  return ref;
}
