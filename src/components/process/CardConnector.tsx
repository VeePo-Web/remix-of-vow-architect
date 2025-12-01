import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface CardConnectorProps {
  /** Side of the card (determines curve direction) */
  side: 'left' | 'right';
  /** Whether the card is currently revealed */
  isRevealed: boolean;
  /** Whether this connector is currently highlighted */
  isHighlighted: boolean;
  /** Index of the movement (0-3) */
  index: number;
  className?: string;
}

/**
 * CardConnector — Golden Thread from Line to Card
 * 
 * A curved bezier connector that draws from the central
 * held breath line to each movement card. Uses ink-draw
 * animation (stroke-dasharray) for reveal effect.
 */
export const CardConnector = memo(function CardConnector({
  side,
  isRevealed,
  isHighlighted,
  index,
  className,
}: CardConnectorProps) {
  // Generate bezier path based on side
  const path = useMemo(() => {
    const width = 120;
    const height = 60;
    
    if (side === 'left') {
      // Curve from right (line) to left (card)
      return `M ${width} ${height / 2} 
              Q ${width * 0.6} ${height / 2} ${width * 0.4} ${height * 0.3}
              Q ${width * 0.2} ${height * 0.1} 0 ${height * 0.2}`;
    } else {
      // Curve from left (line) to right (card)
      return `M 0 ${height / 2}
              Q ${width * 0.4} ${height / 2} ${width * 0.6} ${height * 0.3}
              Q ${width * 0.8} ${height * 0.1} ${width} ${height * 0.2}`;
    }
  }, [side]);

  // Path length for dash animation
  const pathLength = 200;

  return (
    <div
      className={cn(
        'card-connector',
        `card-connector--${side}`,
        isRevealed && 'is-revealed',
        isHighlighted && 'is-highlighted',
        className
      )}
      style={{ '--connector-index': index } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 60"
        className="card-connector__svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Dotted pattern for the connector */}
          <pattern id={`connector-dots-${index}`} patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="2" cy="2" r="1.5" fill="hsl(45 80% 65%)" />
          </pattern>
        </defs>

        {/* Background glow (appears when highlighted) */}
        <path
          d={path}
          fill="none"
          stroke="hsl(45 80% 65%)"
          strokeWidth="6"
          strokeLinecap="round"
          className="card-connector__glow"
          style={{
            opacity: isHighlighted ? 0.3 : 0,
            filter: 'blur(4px)',
          }}
        />

        {/* Main connector line */}
        <path
          d={path}
          fill="none"
          stroke="hsl(45 80% 65%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={isRevealed ? 0 : pathLength}
          className="card-connector__line"
        />

        {/* Dotted overlay */}
        <path
          d={path}
          fill="none"
          stroke="hsl(45 80% 65%)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 6"
          strokeDashoffset={isRevealed ? 0 : pathLength}
          className="card-connector__dots"
          style={{
            opacity: isRevealed ? 0.5 : 0,
          }}
        />

        {/* Connection point dot */}
        <circle
          cx={side === 'left' ? 120 : 0}
          cy={30}
          r={isHighlighted ? 4 : 3}
          fill="hsl(45 80% 65%)"
          className="card-connector__anchor"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: `scale(${isHighlighted ? 1.2 : 1})`,
            transformOrigin: 'center',
          }}
        />
      </svg>
    </div>
  );
});

export default CardConnector;
