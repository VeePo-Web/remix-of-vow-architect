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
  /** Which side of the score this movement appears on */
  side: 'left' | 'right';
  /** Whether this movement is synced with active flame fragment */
  isHighlighted?: boolean;
  onEnterView: () => void;
}

/**
 * ProcessMovement — "The Measure"
 * 
 * Fantasy.co-grade design: Each movement is a measure in the score.
 * Cards alternate left/right with bar-line accent and aligned text.
 * 
 * 6-phase reveal system with sacred timing stagger:
 * - Phase 1: Header (numeral + name) — T+0ms
 * - Phase 2: Action verb — T+200ms
 * - Phase 3: Quote — T+350ms
 * - Phase 4: Details — T+500ms
 * - Phase 5: Assumption — T+650ms
 * - Phase 6: Outcome — T+800ms
 */
export function ProcessMovement({
  movement,
  index,
  side,
  isHighlighted = false,
  onEnterView,
}: ProcessMovementProps) {
  const movementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0);

  // IntersectionObserver for trigger
  useEffect(() => {
    const element = movementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setHasTriggered(true);
      setRevealPhase(6);
      onEnterView();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.30) {
          if (!hasTriggered) {
            setHasTriggered(true);
            onEnterView();
          }
        }
      },
      { threshold: 0.30 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasTriggered, onEnterView]);

  // Staggered reveal phases
  useEffect(() => {
    if (!hasTriggered) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setRevealPhase(6);
      return;
    }

    // Phase timings in ms
    const timings = [0, 200, 350, 500, 650, 800];
    const timers: NodeJS.Timeout[] = [];

    timings.forEach((delay, phase) => {
      const timer = setTimeout(() => {
        setRevealPhase(phase + 1);
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [hasTriggered]);

  return (
    <div
      ref={movementRef}
      className={cn(
        'process-movement',
        `process-movement--${side}`,
        hasTriggered && 'is-triggered',
        isHighlighted && 'is-flame-synced'
      )}
      style={{ '--movement-index': index } as React.CSSProperties}
      data-reveal-phase={revealPhase}
    >
      {/* Bar-line accent — like a measure line in sheet music */}
      <div className="process-movement__bar-line" aria-hidden="true" />

      {/* Phase 1: Movement Header */}
      <div className={cn(
        'process-movement__header',
        revealPhase >= 1 && 'is-visible'
      )}>
        <span className="process-movement__numeral">{movement.numeral}</span>
        <span className="process-movement__name">{movement.name}</span>
      </div>
      
      {/* Phase 2: Action Verb — Only yellow element */}
      <span className={cn(
        'process-movement__action',
        revealPhase >= 2 && 'is-visible'
      )}>
        {movement.action}
      </span>
      
      {/* Phase 3: Quote — Cormorant italic */}
      <p className={cn(
        'process-movement__quote',
        revealPhase >= 3 && 'is-visible'
      )}>
        "{movement.quote}"
      </p>
      
      {/* Phase 4: Details — Supporting text */}
      <p className={cn(
        'process-movement__details',
        revealPhase >= 4 && 'is-visible'
      )}>
        {movement.details}
      </p>
      
      {/* Phase 5: Assumption — No yellow, muted */}
      <p className={cn(
        'process-movement__assumption',
        revealPhase >= 5 && 'is-visible'
      )}>
        {movement.assumption}
      </p>
      
      {/* Phase 6: Outcome — Golden arrow only */}
      <p className={cn(
        'process-movement__outcome',
        revealPhase >= 6 && 'is-visible'
      )}>
        <span className="process-movement__arrow">→</span>
        <span className="process-movement__outcome-text">{movement.outcome}</span>
      </p>
    </div>
  );
}
