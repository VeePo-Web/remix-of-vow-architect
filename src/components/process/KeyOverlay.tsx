import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { KeyState } from '@/hooks/useKeyDepression';

interface KeyOverlayProps {
  keyState: KeyState;
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
}

/**
 * KeyOverlay — Individual Piano Key Visual Stack
 * 
 * Renders a single piano key with 5 visual layers:
 * 1. Shadow Base - Dynamic depth shadow
 * 2. Key Body - Main key surface with depression
 * 3. Surface Highlight - Top edge reflection
 * 4. Felt Line - Simulated felt strip at key base
 * 5. Glow Halo - Impact and sustain radiance
 * 
 * Each layer responds to the key's physics state for
 * realistic piano key visualization.
 */
export const KeyOverlay = memo(function KeyOverlay({
  keyState,
  x,
  y,
  width,
  height,
  className,
}: KeyOverlayProps) {
  const {
    displacement,
    phase,
    shadowDepth,
    glowIntensity,
    rotation,
    isBlackKey,
    index,
  } = keyState;

  // Calculate visual transformations
  const keyHeight = isBlackKey ? height * 0.6 : height;
  const depressionOffset = displacement * 12; // Max 12px depression
  const shadowBlur = 4 + shadowDepth * 8;
  const shadowY = 2 + shadowDepth * 6;

  // Unique IDs for filters
  const filterId = useMemo(() => `key-shadow-${index}-${Math.random().toString(36).substr(2, 6)}`, [index]);
  const glowId = useMemo(() => `key-glow-${index}-${Math.random().toString(36).substr(2, 6)}`, [index]);

  // Phase-specific classes
  const phaseClass = phase !== 'rest' ? `key-overlay--${phase}` : '';

  return (
    <g
      className={cn(
        'key-overlay',
        phaseClass,
        isBlackKey && 'key-overlay--black',
        className
      )}
      transform={`translate(${x}, ${y})`}
      style={{
        '--key-displacement': displacement,
        '--key-shadow-depth': shadowDepth,
        '--key-glow': glowIntensity,
        '--key-rotation': `${rotation}deg`,
      } as React.CSSProperties}
    >
      <defs>
        {/* Dynamic shadow filter */}
        <filter id={filterId} x="-50%" y="-20%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={shadowBlur} result="blur" />
          <feOffset in="blur" dx="0" dy={shadowY} result="offsetBlur" />
          <feColorMatrix
            in="offsetBlur"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.4 0"
            result="shadow"
          />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Impact/sustain glow filter */}
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={8 + glowIntensity * 6} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values={`1 0 0 0 0.1
                    0.9 0 0 0 0.05
                    0 0 0 0 0
                    0 0 0 ${glowIntensity * 0.8} 0`}
          />
        </filter>

        {/* Key body gradient */}
        <linearGradient id={`key-body-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isBlackKey ? 'hsl(45 60% 55%)' : 'hsl(45 100% 85%)'} />
          <stop offset="50%" stopColor={isBlackKey ? 'hsl(45 70% 50%)' : 'hsl(45 90% 75%)'} />
          <stop offset="100%" stopColor={isBlackKey ? 'hsl(45 60% 45%)' : 'hsl(45 80% 65%)'} />
        </linearGradient>

        {/* Highlight gradient */}
        <linearGradient id={`key-highlight-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 100% 95%)" stopOpacity="0.9" />
          <stop offset="30%" stopColor="hsl(45 100% 90%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(45 100% 85%)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Layer 1: Shadow Base */}
      <rect
        x={2}
        y={depressionOffset}
        width={width - 4}
        height={keyHeight}
        rx={2}
        fill="hsl(0 0% 0% / 0.3)"
        filter={`url(#${filterId})`}
        className="key-overlay__shadow"
        style={{
          opacity: 0.5 + shadowDepth * 0.5,
          transform: `translateY(${shadowY}px)`,
        }}
      />

      {/* Layer 5: Glow Halo (behind key body) */}
      {glowIntensity > 0.1 && (
        <rect
          x={-4}
          y={depressionOffset - 4}
          width={width + 8}
          height={keyHeight + 8}
          rx={4}
          fill="hsl(45 100% 76%)"
          filter={`url(#${glowId})`}
          className="key-overlay__glow-halo"
          style={{ opacity: glowIntensity }}
        />
      )}

      {/* Layer 2: Key Body */}
      <rect
        x={2}
        y={depressionOffset}
        width={width - 4}
        height={keyHeight}
        rx={2}
        fill={`url(#key-body-${index})`}
        className="key-overlay__body"
        style={{
          transform: `perspective(100px) rotateX(${rotation}deg)`,
          transformOrigin: 'center bottom',
        }}
      />

      {/* Layer 3: Surface Highlight */}
      <rect
        x={3}
        y={depressionOffset + 1}
        width={width - 6}
        height={keyHeight * 0.3}
        rx={1.5}
        fill={`url(#key-highlight-${index})`}
        className="key-overlay__highlight"
        style={{
          opacity: 1 - displacement * 0.5,
        }}
      />

      {/* Layer 4: Felt Line */}
      <rect
        x={2}
        y={depressionOffset + keyHeight - 3}
        width={width - 4}
        height={3}
        fill="hsl(20 30% 25%)"
        className="key-overlay__felt"
        style={{
          opacity: 0.6 + displacement * 0.4,
        }}
      />

      {/* Impact ripple (only during impact phase) */}
      {phase === 'impact' && (
        <circle
          cx={width / 2}
          cy={depressionOffset + keyHeight / 2}
          r={width * 0.8}
          fill="none"
          stroke="hsl(45 100% 85%)"
          strokeWidth={2}
          className="key-overlay__impact-ripple"
          style={{
            opacity: 0,
            animation: 'key-impact-ripple 300ms ease-out forwards',
          }}
        />
      )}

      {/* Sustain shimmer (during sustain phase) */}
      {phase === 'sustain' && (
        <rect
          x={3}
          y={depressionOffset + 2}
          width={width - 6}
          height={keyHeight - 4}
          rx={1}
          fill="none"
          stroke="hsl(45 100% 90%)"
          strokeWidth={1}
          className="key-overlay__sustain-shimmer"
          style={{
            opacity: 0.4,
            animation: 'key-sustain-shimmer 800ms ease-in-out infinite',
          }}
        />
      )}

      {/* Release afterglow (during release phase) */}
      {phase === 'release' && (
        <rect
          x={0}
          y={depressionOffset - 2}
          width={width}
          height={keyHeight + 4}
          rx={3}
          fill="hsl(45 100% 80%)"
          className="key-overlay__afterglow"
          style={{
            opacity: displacement * 0.3,
            filter: 'blur(4px)',
          }}
        />
      )}
    </g>
  );
});

export default KeyOverlay;
