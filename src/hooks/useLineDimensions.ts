import { useState, useEffect, useCallback } from 'react';

interface LineDimensions {
  width: number;
  height: number;
  containerWidth: number;
  offsetLeft: number;
  isMobile: boolean;
  isTablet: boolean;
}

interface UseLineDimensionsOptions {
  containerRef?: React.RefObject<HTMLElement>;
  padding?: number;
}

/**
 * Breakpoint thresholds
 */
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
} as const;

/**
 * useLineDimensions — Responsive line sizing hook
 * 
 * Calculates optimal line dimensions based on container and viewport.
 * Handles responsive breakpoints for mobile/tablet/desktop layouts.
 */
export function useLineDimensions(options: UseLineDimensionsOptions = {}): LineDimensions {
  const { containerRef, padding = 40 } = options;

  const [dimensions, setDimensions] = useState<LineDimensions>({
    width: 800,
    height: 60,
    containerWidth: 1000,
    offsetLeft: 0,
    isMobile: false,
    isTablet: false,
  });

  const calculateDimensions = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < BREAKPOINTS.mobile;
    const isTablet = viewportWidth >= BREAKPOINTS.mobile && viewportWidth < BREAKPOINTS.tablet;

    let containerWidth: number;
    let offsetLeft = 0;

    if (containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerWidth = rect.width;
      offsetLeft = rect.left;
    } else {
      containerWidth = Math.min(viewportWidth - padding * 2, 1000);
    }

    // Calculate line dimensions based on breakpoint
    let width: number;
    let height: number;

    if (isMobile) {
      // Mobile: Vertical line (rotated 90deg in CSS)
      width = 200;
      height = 60;
    } else if (isTablet) {
      // Tablet: Centered, narrower
      width = Math.min(containerWidth - padding, 600);
      height = 60;
    } else {
      // Desktop: Full width with padding
      width = Math.min(containerWidth - padding, 900);
      height = 60;
    }

    setDimensions({
      width,
      height,
      containerWidth,
      offsetLeft,
      isMobile,
      isTablet,
    });
  }, [containerRef, padding]);

  useEffect(() => {
    calculateDimensions();

    const handleResize = () => {
      requestAnimationFrame(calculateDimensions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDimensions]);

  return dimensions;
}

export default useLineDimensions;
