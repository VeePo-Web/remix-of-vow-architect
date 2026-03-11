import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { MovementImage } from './MovementImage';
import { HandwrittenNote } from './HandwrittenNote';

interface MovementData {
  numeral: string;
  name: string;
  action: string;
  quote: string;
  details: string;
  assumption: string;
  outcome: string;
  annotation?: string;
}

interface ProcessMovementProps {
  movement: MovementData;
  index: number;
  side: 'left' | 'right';
}

/**
 * ProcessMovement — Simplified Card
 * 
 * Clean IntersectionObserver-driven reveal. No physics, no orchestrator.
 * Staggered opacity+translateY for each content phase.
 */
export function ProcessMovement({
  movement,
  index,
  side,
}: ProcessMovementProps) {
  const movementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0);

  // IntersectionObserver reveal
  useEffect(() => {
    const el = movementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasTriggered(true);
      setRevealPhase(6);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Staggered reveal phases
  useEffect(() => {
    if (!hasTriggered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setRevealPhase(6); return; }

    const timings = [0, 200, 380, 560, 720, 880];
    const timers: ReturnType<typeof setTimeout>[] = [];

    timings.forEach((delay, phase) => {
      const timer = setTimeout(() => setRevealPhase(phase + 1), delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [hasTriggered]);

  return (
    <div
      ref={movementRef}
      className={cn(
        'process-movement process-movement--journal',
        `process-movement--${side}`,
        hasTriggered && 'is-triggered',
      )}
      style={{ '--movement-index': index } as React.CSSProperties}
      data-reveal-phase={revealPhase}
    >
      {/* Movement Image */}
      <MovementImage
        numeral={movement.numeral}
        alt={`${movement.name} - ${movement.quote}`}
        isRevealed={hasTriggered}
        isHighlighted={false}
        side={side}
      />

      {/* Handwritten annotation over image */}
      {movement.annotation && (
        <HandwrittenNote
          text={movement.annotation}
          isRevealed={hasTriggered}
          position={side === 'left' ? 'top-right' : 'top-left'}
          delay={400}
        />
      )}

      {/* Clean card container */}
      <div className={cn(
        'process-card',
        `process-card--${side}`,
        hasTriggered && 'is-revealed',
      )}>
        {/* Gold left-border accent */}
        <div className="process-card__accent" aria-hidden="true" />
        
        {/* Numeral */}
        <span className="process-card__numeral">{movement.numeral}</span>

        {/* Phase 1: Movement Header */}
        <div className={cn('process-movement__header', revealPhase >= 1 && 'is-visible')}>
          <span className="process-movement__name">{movement.name}</span>
        </div>
        
        {/* Phase 2: Action Verb */}
        <div className={cn('process-movement__action', revealPhase >= 2 && 'is-visible')}>
          {movement.action}
        </div>
        
        {/* Phase 3: Quote */}
        <div className={cn('process-movement__quote', revealPhase >= 3 && 'is-visible')}>
          <p>"{movement.quote}"</p>
        </div>
        
        {/* Phase 4: Details */}
        <div className={cn('process-movement__details', revealPhase >= 4 && 'is-visible')}>
          <p>{movement.details}</p>
        </div>
        
        {/* Phase 5: Assumption */}
        <div className={cn('process-movement__assumption', revealPhase >= 5 && 'is-visible')}>
          <p>{movement.assumption}</p>
        </div>
        
        {/* Phase 6: Outcome */}
        <div className={cn('process-movement__outcome', revealPhase >= 6 && 'is-visible')}>
          <p>
            <span className="process-movement__arrow">→</span>
            <span className="process-movement__outcome-text">{movement.outcome}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
