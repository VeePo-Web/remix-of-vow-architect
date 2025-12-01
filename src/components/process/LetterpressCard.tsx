import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface LetterpressCardProps {
  numeral: string;
  children: ReactNode;
  isRevealed?: boolean;
  isHighlighted?: boolean;
  side: 'left' | 'right';
  className?: string;
}

/**
 * LetterpressCard — Tactile Card Wrapper
 * 
 * Creates the composer's journal aesthetic:
 * - Cream paper texture background
 * - Single gold rule border (evolved bar-line)
 * - Embossed numeral styling
 * - Soft shadow for physical depth
 */
export function LetterpressCard({
  numeral,
  children,
  isRevealed = false,
  isHighlighted = false,
  side,
  className,
}: LetterpressCardProps) {
  return (
    <div
      className={cn(
        'letterpress-card',
        `letterpress-card--${side}`,
        isRevealed && 'is-revealed',
        isHighlighted && 'is-highlighted',
        className
      )}
    >
      {/* Paper texture layer */}
      <div className="letterpress-card__texture" aria-hidden="true" />
      
      {/* Gold rule border accent */}
      <div className="letterpress-card__rule" aria-hidden="true" />
      
      {/* Embossed numeral watermark */}
      <span className="letterpress-card__numeral" aria-hidden="true">
        {numeral}
      </span>
      
      {/* Card content */}
      <div className="letterpress-card__content">
        {children}
      </div>
      
      {/* Soft shadow layer */}
      <div className="letterpress-card__shadow" aria-hidden="true" />
    </div>
  );
}

export default LetterpressCard;
