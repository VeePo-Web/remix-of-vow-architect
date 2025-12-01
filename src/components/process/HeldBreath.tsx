import { useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import { usePathMorph, type LineState } from '@/hooks/usePathMorph';
import { useLineDimensions } from '@/hooks/useLineDimensions';
import { HeldBreathPath } from './HeldBreathPath';

interface HeldBreathProps {
  progress: number;
  isActive: boolean;
  className?: string;
}

/**
 * HeldBreath — The Transforming Line
 * 
 * A single horizontal golden line that transforms through 5 states
 * as users scroll through the process section:
 * 
 * 1. Silent — A single held breath, horizontal stillness
 * 2. Pulse — The first heartbeat, subtle center bulge
 * 3. Wave — Sound emerging, sinusoidal wave pattern
 * 4. Refined — Controlled mastery, dampening wave
 * 5. Keys — The instrument materializes, piano key pattern
 * 
 * The breath-to-instrument metaphor: what begins as silence
 * transforms into the very instrument that will carry the vows.
 */
export const HeldBreath = memo(function HeldBreath({
  progress,
  isActive,
  className,
}: HeldBreathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useLineDimensions({ containerRef });
  
  const { interpolatedPath, lineState, lineStateProgress, nextState } = usePathMorph({
    width: dimensions.width,
    height: dimensions.height,
    progress,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        'held-breath',
        `held-breath--${lineState}`,
        isActive && 'is-active',
        dimensions.isMobile && 'held-breath--mobile',
        className
      )}
      style={{
        '--line-width': `${dimensions.width}px`,
        '--line-height': `${dimensions.height}px`,
        '--line-progress': progress,
        '--line-state-progress': lineStateProgress,
      } as React.CSSProperties}
      data-line-state={lineState}
      data-next-state={nextState}
      aria-hidden="true"
    >
      {/* Ambient glow layer */}
      <div className="held-breath__ambient" />
      
      {/* The transforming line */}
      <div className="held-breath__line-container">
        <HeldBreathPath
          path={interpolatedPath}
          lineState={lineState}
          lineStateProgress={lineStateProgress}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>

      {/* State indicator dots (subtle) */}
      <div className="held-breath__state-indicators">
        {(['silent', 'pulse', 'wave', 'refined', 'keys'] as LineState[]).map((state, index) => (
          <div
            key={state}
            className={cn(
              'held-breath__state-dot',
              lineState === state && 'is-active',
              index < ['silent', 'pulse', 'wave', 'refined', 'keys'].indexOf(lineState) && 'is-passed'
            )}
          />
        ))}
      </div>

      {/* Shimmer overlay for keys state */}
      {lineState === 'keys' && (
        <div className="held-breath__shimmer" />
      )}
    </div>
  );
});

export default HeldBreath;
