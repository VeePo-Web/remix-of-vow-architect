import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MovementData {
  numeral: string;
  name: string;
  action: string;
  quote: string;
  details: string;
  assumption: string;
  outcome: string;
}

interface ProcessMovementProps {
  movement: MovementData;
  index: number;
  onEnterView: () => void;
}

/**
 * ProcessMovement — Individual Step Card
 * 
 * Centered layout with sacred timing animations.
 * Typography matched to The Exhale section.
 */
export function ProcessMovement({
  movement,
  index,
  onEnterView,
}: ProcessMovementProps) {
  const movementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = movementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setHasTriggered(true);
      onEnterView();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!hasTriggered) {
            setHasTriggered(true);
            onEnterView();
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasTriggered, onEnterView]);

  return (
    <div
      ref={movementRef}
      className={cn(
        'process-movement',
        hasTriggered && 'is-visible'
      )}
      style={{ '--movement-index': index } as React.CSSProperties}
    >
      {/* Movement Header */}
      <div className="process-movement__header">
        <span className="process-movement__numeral">{movement.numeral}</span>
        <span className="process-movement__name">{movement.name}</span>
      </div>
      
      {/* Action Verb — Only yellow element */}
      <span className="process-movement__action">{movement.action}</span>
      
      {/* Quote — Cormorant italic */}
      <p className="process-movement__quote">"{movement.quote}"</p>
      
      {/* Details — Supporting text */}
      <p className="process-movement__details">{movement.details}</p>
      
      {/* Assumption — No yellow, muted */}
      <p className="process-movement__assumption">{movement.assumption}</p>
      
      {/* Outcome — Golden arrow only */}
      <p className="process-movement__outcome">
        <span className="process-movement__arrow">→</span>
        {movement.outcome}
      </p>
    </div>
  );
}
