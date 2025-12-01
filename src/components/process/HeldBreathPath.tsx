import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { LineState } from '@/hooks/usePathMorph';

interface HeldBreathPathProps {
  path: string;
  lineState: LineState;
  lineStateProgress: number;
  width: number;
  height: number;
  className?: string;
}

/**
 * HeldBreathPath — The transforming SVG line
 * 
 * Renders the golden line that morphs through 5 states.
 * Includes glow filter and state-specific styling.
 */
export const HeldBreathPath = memo(function HeldBreathPath({
  path,
  lineState,
  lineStateProgress,
  width,
  height,
  className,
}: HeldBreathPathProps) {
  // Calculate glow intensity based on state
  const glowIntensity = lineState === 'silent' ? 0.2 :
                        lineState === 'pulse' ? 0.4 + lineStateProgress * 0.2 :
                        lineState === 'wave' ? 0.6 :
                        lineState === 'refined' ? 0.7 :
                        0.9;

  const strokeWidth = lineState === 'keys' ? 2.5 : 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('held-breath-path', `held-breath-path--${lineState}`, className)}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        {/* Glow filter for the golden line */}
        <filter id="held-breath-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.1
                    0.9 0 0 0 0.05
                    0 0 0 0 0
                    0 0 0 0.6 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shimmer gradient for keys state */}
        <linearGradient id="held-breath-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(45 80% 65%)" stopOpacity="1" />
          <stop offset="30%" stopColor="hsl(45 90% 75%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(45 100% 85%)" stopOpacity="1" />
          <stop offset="70%" stopColor="hsl(45 90% 75%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(45 80% 65%)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Background glow layer */}
      <path
        d={path}
        fill="none"
        stroke="hsl(45 80% 65%)"
        strokeWidth={strokeWidth + 6}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#held-breath-glow)"
        className="held-breath-path__glow"
        style={{
          opacity: glowIntensity * 0.5,
          transition: 'opacity 400ms ease-out, d 300ms ease-out',
        }}
      />

      {/* Main line */}
      <path
        d={path}
        fill="none"
        stroke={lineState === 'keys' ? 'url(#held-breath-shimmer)' : 'hsl(45 80% 65%)'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="held-breath-path__main"
        style={{
          transition: 'd 300ms cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      />

      {/* Subtle inner highlight */}
      <path
        d={path}
        fill="none"
        stroke="hsl(45 100% 85%)"
        strokeWidth={strokeWidth * 0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="held-breath-path__highlight"
        style={{
          opacity: lineState === 'keys' ? 0.8 : 0.4,
          transition: 'opacity 400ms ease-out, d 300ms ease-out',
        }}
      />
    </svg>
  );
});

export default HeldBreathPath;
