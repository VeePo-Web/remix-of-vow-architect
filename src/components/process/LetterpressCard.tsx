import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { useCardPhysics } from '@/hooks/useCardPhysics';
import { EmbossedNumeral } from './EmbossedNumeral';
import { GoldRuleShimmer } from './GoldRuleShimmer';
import { PaperFiberLayers } from './PaperFiberLayers';

interface LetterpressCardProps {
  numeral: string;
  children: ReactNode;
  isRevealed?: boolean;
  isHighlighted?: boolean;
  side: 'left' | 'right';
  scrollVelocity?: number;
  scrollDirection?: 'up' | 'down' | 'idle';
  progress?: number;
  className?: string;
}

/**
 * LetterpressCard — Tactile Card Wrapper with Material Physics
 * 
 * Creates the composer's journal aesthetic with:
 * - 3D perspective tilt responding to scroll
 * - Light-catching embossed numerals
 * - Shimmer effect on gold rule
 * - Cream paper texture background
 * - Soft shadow for physical depth
 */
export function LetterpressCard({
  numeral,
  children,
  isRevealed = false,
  isHighlighted = false,
  side,
  scrollVelocity = 0,
  scrollDirection = 'idle',
  progress = 0,
  className,
}: LetterpressCardProps) {
  // Card physics for tilt, light, shimmer, and bloom
  const physics = useCardPhysics({
    scrollVelocity,
    scrollDirection,
    progress,
    isHighlighted,
    isRevealed,
    side,
  });

  return (
    <div
      className={cn(
        'letterpress-card',
        `letterpress-card--${side}`,
        isRevealed && 'is-revealed',
        isHighlighted && 'is-highlighted',
        className
      )}
      style={{
        ...physics.cssVars,
        transform: `perspective(1000px) rotateX(${physics.tiltX}deg) rotateY(${physics.tiltY}deg)`,
      } as React.CSSProperties}
    >
      {/* Paper fiber parallax layers */}
      <PaperFiberLayers
        tiltX={physics.tiltX}
        tiltY={physics.tiltY}
        shimmerActive={physics.shimmerActive}
        lightPosition={physics.shimmerPosition}
        isHighlighted={isHighlighted}
        className="letterpress-card__fibers"
      />
      
      {/* Gold rule shimmer (replaces static rule) */}
      <GoldRuleShimmer
        side={side}
        shimmerPosition={physics.shimmerPosition}
        shimmerActive={physics.shimmerActive}
        isHighlighted={isHighlighted}
        className="letterpress-card__rule"
      />
      
      {/* Embossed numeral with light-catching effect */}
      <EmbossedNumeral
        numeral={numeral}
        lightX={physics.lightX}
        lightY={physics.lightY}
        isHighlighted={isHighlighted}
        className="letterpress-card__numeral"
      />
      
      {/* Card content with bloom progress */}
      <div 
        className="letterpress-card__content"
        style={{
          '--bloom-progress': physics.bloomProgress,
        } as React.CSSProperties}
      >
        {children}
      </div>
      
      {/* Soft shadow layer - deepens with tilt */}
      <div 
        className="letterpress-card__shadow" 
        aria-hidden="true"
        style={{
          transform: `translateY(${4 + Math.abs(physics.tiltX) * 2}px)`,
          opacity: 0.12 + Math.abs(physics.tiltX) * 0.03,
        }}
      />
    </div>
  );
}

export default LetterpressCard;
