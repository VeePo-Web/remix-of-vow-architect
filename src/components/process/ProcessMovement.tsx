import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CardConnector } from './CardConnector';
import { MovementImage } from './MovementImage';
import { LetterpressCard } from './LetterpressCard';
import { HandwrittenNote } from './HandwrittenNote';
import type { LineState } from '@/hooks/usePathMorph';

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
  /** Which side of the score this movement appears on */
  side: 'left' | 'right';
  /** Whether this movement is synced with conductor's dot arrival */
  isHighlighted?: boolean;
  onEnterView?: () => void;
  /** Current line state from orchestrator */
  lineState?: LineState;
}

/**
 * ProcessMovement — "The Measure"
 * 
 * Fantasy.co-grade design: Each movement is a measure in the score.
 * Cards alternate left/right with bar-line accent and aligned text.
 * 
 * CONDUCTOR-CONNECTED: Reveals are driven by orchestrator's highlightedMovement,
 * NOT by local IntersectionObserver. This creates perfect sync with the dot.
 * 
 * 6-phase reveal system with sacred timing stagger:
 * - Phase 1: Header (numeral + name) — T+0ms
 * - Phase 2: Action verb — T+150ms
 * - Phase 3: Quote — T+280ms
 * - Phase 4: Details — T+400ms
 * - Phase 5: Assumption — T+520ms
 * - Phase 6: Outcome — T+640ms
 */
export function ProcessMovement({
  movement,
  index,
  side,
  isHighlighted = false,
  onEnterView,
  lineState,
}: ProcessMovementProps) {
  const movementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0);
  const prevHighlightedRef = useRef(false);

  // Conductor-connected reveal: triggered by isHighlighted from orchestrator
  useEffect(() => {
    // Detect rising edge: false → true
    if (isHighlighted && !prevHighlightedRef.current && !hasTriggered) {
      setHasTriggered(true);
      onEnterView?.();
    }
    prevHighlightedRef.current = isHighlighted;
  }, [isHighlighted, hasTriggered, onEnterView]);

  // Staggered reveal phases — tighter timing for conductor sync
  useEffect(() => {
    if (!hasTriggered) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setRevealPhase(6);
      return;
    }

    // Tighter phase timings for snappier reveals
    const timings = [0, 150, 280, 400, 520, 640];
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
        'process-movement process-movement--journal',
        `process-movement--${side}`,
        hasTriggered && 'is-triggered',
        isHighlighted && 'is-conductor-synced',
        lineState && `line-state--${lineState}`
      )}
      style={{ '--movement-index': index } as React.CSSProperties}
      data-reveal-phase={revealPhase}
    >
      {/* Movement Image with parallax */}
      <MovementImage
        numeral={movement.numeral}
        alt={`${movement.name} - ${movement.quote}`}
        isRevealed={hasTriggered}
        isHighlighted={isHighlighted}
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

      {/* Golden connector thread from line to card */}
      <CardConnector
        side={side}
        isRevealed={hasTriggered}
        isHighlighted={isHighlighted}
        index={index}
        className="process-movement__connector"
      />

      {/* Letterpress Card wrapping content */}
      <LetterpressCard
        numeral={movement.numeral}
        isRevealed={hasTriggered}
        isHighlighted={isHighlighted}
        side={side}
      >
        {/* Phase 1: Movement Header */}
        <div className={cn(
          'process-movement__header',
          revealPhase >= 1 && 'is-visible'
        )}>
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
      </LetterpressCard>
    </div>
  );
}
