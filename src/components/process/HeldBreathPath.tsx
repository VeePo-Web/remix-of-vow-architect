import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { LineState } from '@/hooks/usePathMorph';
import type { BreathProperties } from '@/hooks/useBreathCycle';
import type { StrikeState } from '@/hooks/useStrikeAnimation';

interface HeldBreathPathProps {
  path: string;
  lineState: LineState;
  lineStateProgress: number;
  width: number;
  height: number;
  breathProps: BreathProperties;
  strikeState: StrikeState;
  className?: string;
}

/**
 * HeldBreathPath — The Transforming, Breathing SVG Line
 * 
 * Renders the golden line that morphs through 5 states.
 * Now enhanced with:
 * - Breath-responsive stroke width and opacity
 * - Dynamic glow intensity tied to breath cycle
 * - Strike displacement visualization
 * - Wave propagation effects
 */
export const HeldBreathPath = memo(function HeldBreathPath({
  path,
  lineState,
  lineStateProgress,
  width,
  height,
  breathProps,
  strikeState,
  className,
}: HeldBreathPathProps) {
  // Calculate glow intensity based on state AND breath
  const baseGlowIntensity = lineState === 'silent' ? 0.2 :
                            lineState === 'pulse' ? 0.4 + lineStateProgress * 0.2 :
                            lineState === 'wave' ? 0.6 :
                            lineState === 'refined' ? 0.7 :
                            0.9;
  
  // Modulate with breath
  const glowIntensity = baseGlowIntensity * breathProps.glowIntensity;
  
  // Strike adds extra glow during attack/decay
  const strikeGlowBoost = strikeState.isActive ? strikeState.displacement * 0.3 : 0;
  const finalGlowIntensity = Math.min(glowIntensity + strikeGlowBoost, 1);

  // Base stroke width, modulated by breath and state
  const baseStrokeWidth = lineState === 'keys' ? 2.5 : 2;
  const strokeWidth = baseStrokeWidth * breathProps.strokeWidth;
  
  // Strike displacement affects stroke width at strike point
  const strikeStrokeBoost = strikeState.isActive ? strikeState.displacement * 0.5 : 0;

  // Calculate filter blur based on breath
  const glowBlur = 4 + breathProps.glowBlur * 0.5;

  // Unique filter ID for this instance
  const filterId = useMemo(() => `held-breath-glow-${Math.random().toString(36).substr(2, 9)}`, []);
  const shimmerId = useMemo(() => `held-breath-shimmer-${Math.random().toString(36).substr(2, 9)}`, []);
  const strikeGradientId = useMemo(() => `strike-gradient-${Math.random().toString(36).substr(2, 9)}`, []);

  // Calculate strike wave mask position
  const strikeMaskPosition = strikeState.isActive ? strikeState.position * 100 : 50;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn(
        'held-breath-path',
        `held-breath-path--${lineState}`,
        breathProps.stage && `held-breath-path--breath-${breathProps.stage}`,
        strikeState.isActive && `held-breath-path--strike-${strikeState.phase}`,
        className
      )}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{
        '--breath-opacity': breathProps.opacity,
        '--strike-position': `${strikeMaskPosition}%`,
      } as React.CSSProperties}
    >
      <defs>
        {/* Dynamic glow filter - blur responds to breath */}
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values={`1 0 0 0 0.1
                    0.9 0 0 0 0.05
                    0 0 0 0 0
                    0 0 0 ${0.6 * breathProps.glowIntensity} 0`}
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shimmer gradient for keys state */}
        <linearGradient id={shimmerId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(45 80% 65%)" stopOpacity={breathProps.opacity} />
          <stop offset="30%" stopColor="hsl(45 90% 75%)" stopOpacity={breathProps.opacity} />
          <stop offset="50%" stopColor="hsl(45 100% 85%)" stopOpacity={1} />
          <stop offset="70%" stopColor="hsl(45 90% 75%)" stopOpacity={breathProps.opacity} />
          <stop offset="100%" stopColor="hsl(45 80% 65%)" stopOpacity={breathProps.opacity} />
        </linearGradient>

        {/* Strike highlight gradient */}
        <radialGradient 
          id={strikeGradientId}
          cx={`${strikeMaskPosition}%`}
          cy="50%"
          r={`${strikeState.waveRadius * 100 + 10}%`}
        >
          <stop 
            offset="0%" 
            stopColor="hsl(45 100% 85%)" 
            stopOpacity={strikeState.displacement * 0.8} 
          />
          <stop 
            offset="50%" 
            stopColor="hsl(45 90% 70%)" 
            stopOpacity={strikeState.displacement * 0.4} 
          />
          <stop 
            offset="100%" 
            stopColor="hsl(45 80% 65%)" 
            stopOpacity={0} 
          />
        </radialGradient>
      </defs>

      {/* Outer glow layer - breath responsive */}
      <path
        d={path}
        fill="none"
        stroke="hsl(45 80% 65%)"
        strokeWidth={(strokeWidth + 8) * (1 + strikeGlowBoost)}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
        className="held-breath-path__outer-glow"
        style={{
          opacity: finalGlowIntensity * 0.3,
          transition: 'opacity 200ms ease-out',
        }}
      />

      {/* Background glow layer */}
      <path
        d={path}
        fill="none"
        stroke="hsl(45 80% 65%)"
        strokeWidth={(strokeWidth + 6) * (1 + strikeGlowBoost * 0.5)}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
        className="held-breath-path__glow"
        style={{
          opacity: finalGlowIntensity * 0.5,
          transition: 'opacity 200ms ease-out, d 300ms ease-out',
        }}
      />

      {/* Strike highlight layer - only visible during strike */}
      {strikeState.isActive && (
        <path
          d={path}
          fill="none"
          stroke={`url(#${strikeGradientId})`}
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="held-breath-path__strike-highlight"
          style={{
            opacity: strikeState.displacement,
          }}
        />
      )}

      {/* Main line - breath modulates stroke width */}
      <path
        d={path}
        fill="none"
        stroke={lineState === 'keys' ? `url(#${shimmerId})` : 'hsl(45 80% 65%)'}
        strokeWidth={strokeWidth + strikeStrokeBoost}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="held-breath-path__main"
        style={{
          opacity: breathProps.opacity,
          transition: 'd 300ms cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      />

      {/* Subtle inner highlight - breath responsive */}
      <path
        d={path}
        fill="none"
        stroke="hsl(45 100% 85%)"
        strokeWidth={strokeWidth * 0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="held-breath-path__highlight"
        style={{
          opacity: (lineState === 'keys' ? 0.8 : 0.4) * breathProps.opacity,
          transition: 'opacity 200ms ease-out, d 300ms ease-out',
        }}
      />

      {/* Calligraphy-style stroke variation markers (for keys state) */}
      {lineState === 'keys' && (
        <g className="held-breath-path__calligraphy-marks">
          {/* These create subtle "ink pooling" at key positions */}
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
            <circle
              key={i}
              cx={width * pos}
              cy={height / 2}
              r={2 + breathProps.strokeWidth}
              fill="hsl(45 90% 70%)"
              opacity={0.6 * breathProps.opacity}
              className="held-breath-path__ink-pool"
            />
          ))}
        </g>
      )}
    </svg>
  );
});

export default HeldBreathPath;
