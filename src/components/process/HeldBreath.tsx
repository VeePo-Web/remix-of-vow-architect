import { useRef, memo, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathMorph, type LineState } from '@/hooks/usePathMorph';
import { useLineDimensions } from '@/hooks/useLineDimensions';
import { useBreathCycle } from '@/hooks/useBreathCycle';
import { useStrikeAnimation, STRIKE_POSITIONS } from '@/hooks/useStrikeAnimation';
import { HeldBreathPath } from './HeldBreathPath';
import { ResonanceRing } from './ResonanceRing';

interface HeldBreathProps {
  progress: number;
  isActive: boolean;
  /** Currently highlighted movement (0-3) for strike triggering */
  highlightedMovement?: number;
  className?: string;
}

interface ActiveRing {
  id: string;
  position: number;
  timestamp: number;
}

/**
 * HeldBreath — The Living, Breathing Line
 * 
 * A single horizontal golden line that transforms through 5 states
 * as users scroll through the process section. Now enhanced with:
 * 
 * - Breath Cycle: 4-second continuous breathing animation
 * - Strike Response: ADSR envelope when movements connect
 * - Resonance Rings: Harmonic overtones emanating from strike points
 * 
 * The breath-to-instrument metaphor: what begins as silence
 * transforms into the very instrument that will carry the vows.
 */
export const HeldBreath = memo(function HeldBreath({
  progress,
  isActive,
  highlightedMovement,
  className,
}: HeldBreathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useLineDimensions({ containerRef });
  const [activeRings, setActiveRings] = useState<ActiveRing[]>([]);
  const lastHighlightedRef = useRef<number | undefined>(undefined);
  
  const { interpolatedPath, lineState, lineStateProgress, nextState } = usePathMorph({
    width: dimensions.width,
    height: dimensions.height,
    progress,
  });

  // Breath cycle system
  const breathProps = useBreathCycle({
    lineState,
    isActive,
    pauseForStrike: false, // Will be connected to strike state
  });

  // Calculate strike position from highlighted movement
  const strikePosition = highlightedMovement !== undefined && 
    highlightedMovement >= 0 && 
    highlightedMovement < STRIKE_POSITIONS.length
      ? STRIKE_POSITIONS[highlightedMovement]
      : undefined;

  // Strike animation system
  const handleStrikePeak = useCallback((position: number) => {
    // Spawn resonance ring at strike peak
    const newRing: ActiveRing = {
      id: `ring-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position,
      timestamp: Date.now(),
    };
    setActiveRings(prev => [...prev, newRing]);
  }, []);

  const handleStrikeComplete = useCallback((position: number) => {
    // Could trigger additional effects here
  }, []);

  const [strikeState, triggerStrike] = useStrikeAnimation({
    strikePosition,
    onStrikePeak: handleStrikePeak,
    onStrikeComplete: handleStrikeComplete,
    isActive,
  });

  // Trigger strike when highlighted movement changes
  useEffect(() => {
    if (
      highlightedMovement !== undefined &&
      highlightedMovement !== lastHighlightedRef.current &&
      highlightedMovement >= 0 &&
      highlightedMovement < STRIKE_POSITIONS.length
    ) {
      triggerStrike(STRIKE_POSITIONS[highlightedMovement]);
      lastHighlightedRef.current = highlightedMovement;
    }
  }, [highlightedMovement, triggerStrike]);

  // Clean up completed rings
  const handleRingComplete = useCallback((ringId: string) => {
    setActiveRings(prev => prev.filter(ring => ring.id !== ringId));
  }, []);

  // Calculate line center Y position
  const lineCenterY = dimensions.height / 2;

  // Calculate intensity based on line state for rings
  const ringIntensity = lineState === 'silent' ? 0.6 :
                        lineState === 'pulse' ? 0.8 :
                        lineState === 'wave' ? 1.0 :
                        lineState === 'refined' ? 1.1 :
                        1.3;

  return (
    <div
      ref={containerRef}
      className={cn(
        'held-breath',
        `held-breath--${lineState}`,
        isActive && 'is-active',
        strikeState.isActive && 'is-striking',
        dimensions.isMobile && 'held-breath--mobile',
        className
      )}
      style={{
        '--line-width': `${dimensions.width}px`,
        '--line-height': `${dimensions.height}px`,
        '--line-progress': progress,
        '--line-state-progress': lineStateProgress,
        '--breath-phase': breathProps.phase,
        '--breath-opacity': breathProps.opacity,
        '--breath-glow': breathProps.glowIntensity,
        '--breath-stroke': breathProps.strokeWidth,
        '--strike-displacement': strikeState.displacement,
        '--strike-wave-radius': strikeState.waveRadius,
        '--strike-wave-amplitude': strikeState.waveAmplitude,
      } as React.CSSProperties}
      data-line-state={lineState}
      data-next-state={nextState}
      data-breath-stage={breathProps.stage}
      data-strike-phase={strikeState.phase}
      aria-hidden="true"
    >
      {/* Ambient glow layer - now breath-responsive */}
      <div 
        className="held-breath__ambient"
        style={{
          opacity: 0.3 + breathProps.glowIntensity * 0.4,
          filter: `blur(${breathProps.glowBlur}px)`,
        }}
      />
      
      {/* Strike point indicators */}
      <div className="held-breath__strike-points">
        {STRIKE_POSITIONS.map((pos, index) => (
          <div
            key={`strike-point-${index}`}
            className={cn(
              'held-breath__strike-point',
              highlightedMovement === index && 'is-active',
              strikeState.isActive && strikeState.position === pos && 'is-striking'
            )}
            style={{
              left: `${pos * 100}%`,
              top: '50%',
            }}
          />
        ))}
      </div>
      
      {/* The transforming line */}
      <div className="held-breath__line-container">
        <HeldBreathPath
          path={interpolatedPath}
          lineState={lineState}
          lineStateProgress={lineStateProgress}
          width={dimensions.width}
          height={dimensions.height}
          breathProps={breathProps}
          strikeState={strikeState}
        />
      </div>

      {/* Resonance rings layer */}
      <div className="held-breath__rings-layer">
        {activeRings.map(ring => (
          <ResonanceRing
            key={ring.id}
            id={ring.id}
            x={ring.position}
            y={lineCenterY}
            containerWidth={dimensions.width}
            intensity={ringIntensity}
            onComplete={() => handleRingComplete(ring.id)}
          />
        ))}
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
        <div 
          className="held-breath__shimmer"
          style={{
            opacity: breathProps.glowIntensity,
          }}
        />
      )}
    </div>
  );
});

export default HeldBreath;
