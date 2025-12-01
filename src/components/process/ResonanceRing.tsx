import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * ResonanceRing — Harmonic Overtones
 * 
 * When the golden thread is struck, it emits resonance rings
 * like ripples on still water, or overtones from a piano string.
 * 
 * Three concentric rings represent the harmonic series:
 * - Fundamental (1x): The primary resonance
 * - 2nd Harmonic (1.5x): First overtone, slightly delayed
 * - 3rd Harmonic (2x): Second overtone, further delayed
 * 
 * Each ring expands with exponential decay easing,
 * fading as it travels outward — sound becoming silence.
 */

interface ResonanceRingProps {
  /** X position (0-1 normalized, will be converted to px) */
  x: number;
  /** Y position in px (typically center of line) */
  y: number;
  /** Container width for position calculation */
  containerWidth: number;
  /** Intensity multiplier (affects size and opacity) */
  intensity?: number;
  /** Callback when all rings have completed */
  onComplete?: () => void;
  /** Unique key for this ring set */
  id: string;
  className?: string;
}

interface RingState {
  scale: number;
  opacity: number;
  isComplete: boolean;
}

// Harmonic ring configurations
const HARMONICS = [
  { 
    name: 'fundamental',
    delay: 0,
    duration: 800,
    maxScale: 1,
    color: 'hsl(45 80% 65%)',
  },
  { 
    name: 'second',
    delay: 80,
    duration: 1000,
    maxScale: 1.5,
    color: 'hsl(45 70% 60%)',
  },
  { 
    name: 'third',
    delay: 160,
    duration: 1200,
    maxScale: 2,
    color: 'hsl(45 60% 55%)',
  },
];

// Base ring size in pixels
const BASE_SIZE = 40;

/**
 * Exponential decay easing
 * Creates organic "ripple" feel
 */
function resonanceEase(t: number): number {
  // cubic-bezier(0.16, 1, 0.3, 1) approximation
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Opacity decay — faster than scale
 */
function opacityDecay(t: number): number {
  return Math.pow(1 - t, 2);
}

export const ResonanceRing = memo(function ResonanceRing({
  x,
  y,
  containerWidth,
  intensity = 1,
  onComplete,
  id,
  className,
}: ResonanceRingProps) {
  const [rings, setRings] = useState<RingState[]>(
    HARMONICS.map(() => ({ scale: 0, opacity: 0.8, isComplete: false }))
  );
  const [isVisible, setIsVisible] = useState(true);

  // Calculate pixel position
  const pixelX = x * containerWidth;
  const size = BASE_SIZE * intensity;

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Simple fade without expansion
      setRings(HARMONICS.map(() => ({ scale: 0.5, opacity: 0.6, isComplete: false })));
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 400);
      return () => clearTimeout(timeout);
    }

    const startTime = performance.now();
    let rafId: number;
    let completedCount = 0;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      let allComplete = true;

      const newRings = HARMONICS.map((harmonic, index) => {
        const adjustedElapsed = elapsed - harmonic.delay;
        
        if (adjustedElapsed < 0) {
          allComplete = false;
          return { scale: 0, opacity: 0.8 * intensity, isComplete: false };
        }

        const progress = Math.min(adjustedElapsed / harmonic.duration, 1);
        const scale = resonanceEase(progress) * harmonic.maxScale;
        const opacity = opacityDecay(progress) * 0.8 * intensity;
        const isComplete = progress >= 1;

        if (!isComplete) allComplete = false;

        return { scale, opacity, isComplete };
      });

      setRings(newRings);

      if (allComplete) {
        setIsVisible(false);
        onComplete?.();
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [intensity, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn('resonance-ring-container', className)}
      style={{
        position: 'absolute',
        left: pixelX,
        top: y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      {HARMONICS.map((harmonic, index) => (
        <div
          key={`${id}-${harmonic.name}`}
          className={cn(
            'resonance-ring',
            `resonance-ring--${harmonic.name}`,
            rings[index].isComplete && 'is-complete'
          )}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            borderRadius: '50%',
            border: `1.5px solid ${harmonic.color}`,
            boxShadow: `0 0 ${8 * intensity}px ${harmonic.color}`,
            transform: `scale(${rings[index].scale})`,
            opacity: rings[index].opacity,
            willChange: 'transform, opacity',
          }}
        />
      ))}
      
      {/* Center glow point */}
      <div
        className="resonance-ring__center"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 8 * intensity,
          height: 8 * intensity,
          marginLeft: -4 * intensity,
          marginTop: -4 * intensity,
          borderRadius: '50%',
          background: 'hsl(45 90% 70%)',
          boxShadow: `0 0 ${12 * intensity}px hsl(45 80% 65%)`,
          opacity: rings[0].opacity,
          willChange: 'opacity',
        }}
      />
    </div>
  );
});

export default ResonanceRing;
