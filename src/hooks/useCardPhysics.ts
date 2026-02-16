import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Card Physics State
 * Manages tilt, light position, shimmer, and bloom animations
 */
export interface CardPhysicsState {
  // Scroll-linked tilt (degrees)
  tiltX: number;
  tiltY: number;
  
  // Light source position for emboss effect (0-1)
  lightX: number;
  lightY: number;
  
  // Shimmer animation state
  shimmerPosition: number;
  shimmerActive: boolean;
  
  // Ink bloom state
  bloomPhase: 'idle' | 'blooming' | 'complete';
  bloomProgress: number;
}

interface UseCardPhysicsOptions {
  scrollVelocity?: number;
  scrollDirection?: 'up' | 'down' | 'idle';
  progress?: number;
  isHighlighted?: boolean;
  isRevealed?: boolean;
  side?: 'left' | 'right';
}

// Spring physics constants
const TILT_CONFIG = {
  maxTilt: 2.5,           // Maximum tilt in degrees
  k: 0.15,                // Spring stiffness
  c: 0.85,                // Damping coefficient
  velocityMultiplier: 3.0, // How much velocity affects tilt
};

// Light tracking constants
const LIGHT_CONFIG = {
  baseX: 0.3,             // Default light X position
  baseY: 0.2,             // Default light Y position
  scrollInfluence: 0.15,  // How much scroll affects light
  highlightX: 0.7,        // Light X when highlighted
  highlightY: 0.15,       // Light Y when highlighted
};

// Shimmer constants
const SHIMMER_CONFIG = {
  duration: 1200,         // Shimmer pass duration (ms)
  repeatDelay: 3000,      // Delay between shimmer passes (ms)
  startDelay: 400,        // Initial delay when highlighted (ms)
};

// Bloom constants
const BLOOM_CONFIG = {
  duration: 600,          // Total bloom duration (ms)
  phases: ['idle', 'blooming', 'complete'] as const,
};

// Fiber parallax constants
const FIBER_CONFIG = {
  // Parallax multipliers (how much each layer moves relative to tilt)
  surfaceMultiplier: 3.0,   // Surface fibers move most
  embeddedMultiplier: 1.5,  // Embedded fibers move moderately
  deepMultiplier: 0.5,      // Deep fibers barely move
  // Maximum offset in pixels
  maxOffset: 6,
};

/**
 * useCardPhysics — Letterpress Material Physics Hook
 * 
 * Manages scroll-linked tilt with spring physics, dynamic light tracking
 * for emboss effects, shimmer animation timing, and ink bloom state.
 */
export function useCardPhysics({
  scrollVelocity = 0,
  scrollDirection = 'idle',
  progress = 0,
  isHighlighted = false,
  isRevealed = false,
  side = 'left',
}: UseCardPhysicsOptions = {}): CardPhysicsState & { cssVars: Record<string, string> } {
  // Tilt state with spring physics
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const tiltVelocityRef = useRef({ x: 0, y: 0 });
  
  // Light position state
  const [lightX, setLightX] = useState(LIGHT_CONFIG.baseX);
  const [lightY, setLightY] = useState(LIGHT_CONFIG.baseY);
  
  // Shimmer state
  const [shimmerPosition, setShimmerPosition] = useState(0);
  const [shimmerActive, setShimmerActive] = useState(false);
  const shimmerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Bloom state
  const [bloomPhase, setBloomPhase] = useState<'idle' | 'blooming' | 'complete'>('idle');
  const [bloomProgress, setBloomProgress] = useState(0);
  
  // RAF reference for physics loop
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  
  // Calculate target tilt based on scroll
  const getTargetTilt = useCallback(() => {
    const directionMultiplier = scrollDirection === 'down' ? 1 : scrollDirection === 'up' ? -1 : 0;
    const sideMultiplier = side === 'left' ? 1 : -1;
    
    // Tilt towards/away based on scroll direction
    const targetX = directionMultiplier * Math.min(Math.abs(scrollVelocity) * TILT_CONFIG.velocityMultiplier, TILT_CONFIG.maxTilt);
    
    // Slight Y tilt based on side
    const targetY = sideMultiplier * 0.5 * Math.min(Math.abs(scrollVelocity), 1);
    
    return { x: targetX, y: targetY };
  }, [scrollVelocity, scrollDirection, side]);
  
  // Tilt physics disabled — was causing mirrored text and RAF loop bugs.
  // Light/shimmer/bloom still active below.
  
  // Light position based on scroll and highlight
  useEffect(() => {
    if (isHighlighted) {
      // Sweep light across when highlighted
      setLightX(LIGHT_CONFIG.highlightX);
      setLightY(LIGHT_CONFIG.highlightY);
    } else {
      // Light follows scroll progress subtly
      const scrollLight = progress * LIGHT_CONFIG.scrollInfluence;
      setLightX(LIGHT_CONFIG.baseX + scrollLight);
      setLightY(LIGHT_CONFIG.baseY + scrollLight * 0.5);
    }
  }, [isHighlighted, progress]);
  
  // Shimmer animation when highlighted
  useEffect(() => {
    if (!isHighlighted) {
      setShimmerActive(false);
      setShimmerPosition(0);
      if (shimmerTimeoutRef.current) clearTimeout(shimmerTimeoutRef.current);
      return;
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Start shimmer after delay
    shimmerTimeoutRef.current = setTimeout(() => {
      setShimmerActive(true);
      
      // Animate shimmer position
      let startTime: number;
      const animateShimmer = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / SHIMMER_CONFIG.duration, 1);
        
        setShimmerPosition(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animateShimmer);
        } else {
          // Schedule repeat
          shimmerTimeoutRef.current = setTimeout(() => {
            setShimmerPosition(0);
            requestAnimationFrame(animateShimmer);
          }, SHIMMER_CONFIG.repeatDelay);
        }
      };
      
      requestAnimationFrame(animateShimmer);
    }, SHIMMER_CONFIG.startDelay);
    
    return () => {
      if (shimmerTimeoutRef.current) clearTimeout(shimmerTimeoutRef.current);
    };
  }, [isHighlighted]);
  
  // Ink bloom animation when revealed
  useEffect(() => {
    if (!isRevealed || bloomPhase !== 'idle') return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setBloomPhase('complete');
      setBloomProgress(1);
      return;
    }
    
    setBloomPhase('blooming');
    
    let startTime: number;
    const animateBloom = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / BLOOM_CONFIG.duration, 1);
      
      setBloomProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animateBloom);
      } else {
        setBloomPhase('complete');
      }
    };
    
    requestAnimationFrame(animateBloom);
  }, [isRevealed, bloomPhase]);
  
  // Generate CSS custom properties
  const cssVars: Record<string, string> = {
    '--card-tilt-x': `${tiltX}deg`,
    '--card-tilt-y': `${tiltY}deg`,
    '--card-light-x': `${lightX * 100}%`,
    '--card-light-y': `${lightY * 100}%`,
    '--card-shimmer-position': `${shimmerPosition * 100}%`,
    '--card-shimmer-active': shimmerActive ? '1' : '0',
    '--card-bloom-progress': `${bloomProgress}`,
  };
  
  return {
    tiltX,
    tiltY,
    lightX,
    lightY,
    shimmerPosition,
    shimmerActive,
    bloomPhase,
    bloomProgress,
    cssVars,
  };
}

export default useCardPhysics;
