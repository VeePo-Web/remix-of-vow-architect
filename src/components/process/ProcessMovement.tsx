import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CardConnector } from './CardConnector';
import { MovementImage } from './MovementImage';
import { LetterpressCard } from './LetterpressCard';
import { HandwrittenNote } from './HandwrittenNote';
import { InkBloomText } from './InkBloomText';
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
  /** Scroll velocity for physics */
  scrollVelocity?: number;
  /** Scroll direction for physics */
  scrollDirection?: 'up' | 'down' | 'idle';
  /** Overall progress for light tracking */
  progress?: number;
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
  scrollVelocity = 0,
  scrollDirection = 'idle',
  progress = 0,
}: ProcessMovementProps) {
  const movementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0);
  const [bloomProgress, setBloomProgress] = useState(0);
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
      setBloomProgress(1);
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

    // Bloom animation over 600ms
    let startTime: number;
    const animateBloom = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / 600, 1);
      setBloomProgress(progress);
      if (progress < 1) requestAnimationFrame(animateBloom);
    };
    requestAnimationFrame(animateBloom);

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
        scrollVelocity={scrollVelocity}
        scrollDirection={scrollDirection}
        progress={progress}
      >
        {/* Phase 1: Movement Header */}
        <div className={cn(
          'process-movement__header',
          revealPhase >= 1 && 'is-visible'
        )}>
          <InkBloomText 
            variant="muted" 
            isRevealed={revealPhase >= 1}
            bloomProgress={bloomProgress}
            delay={0}
          >
            <span className="process-movement__name">{movement.name}</span>
          </InkBloomText>
        </div>
        
        {/* Phase 2: Action Verb — Only yellow element with dramatic bloom */}
        <InkBloomText
          variant="action"
          isRevealed={revealPhase >= 2}
          bloomProgress={Math.max(0, (bloomProgress - 0.15) / 0.85)}
          delay={150}
          className={cn(
            'process-movement__action',
            revealPhase >= 2 && 'is-visible'
          )}
        >
          {movement.action}
        </InkBloomText>
        
        {/* Phase 3: Quote — Cormorant italic */}
        <InkBloomText
          variant="quote"
          isRevealed={revealPhase >= 3}
          bloomProgress={Math.max(0, (bloomProgress - 0.25) / 0.75)}
          delay={280}
          className={cn(
            'process-movement__quote',
            revealPhase >= 3 && 'is-visible'
          )}
        >
          <p>"{movement.quote}"</p>
        </InkBloomText>
        
        {/* Phase 4: Details — Supporting text */}
        <InkBloomText
          variant="default"
          isRevealed={revealPhase >= 4}
          bloomProgress={Math.max(0, (bloomProgress - 0.4) / 0.6)}
          delay={400}
          className={cn(
            'process-movement__details',
            revealPhase >= 4 && 'is-visible'
          )}
        >
          <p>{movement.details}</p>
        </InkBloomText>
        
        {/* Phase 5: Assumption — No yellow, muted */}
        <InkBloomText
          variant="muted"
          isRevealed={revealPhase >= 5}
          bloomProgress={Math.max(0, (bloomProgress - 0.55) / 0.45)}
          delay={520}
          className={cn(
            'process-movement__assumption',
            revealPhase >= 5 && 'is-visible'
          )}
        >
          <p>{movement.assumption}</p>
        </InkBloomText>
        
        {/* Phase 6: Outcome — Golden arrow only */}
        <InkBloomText
          variant="default"
          isRevealed={revealPhase >= 6}
          bloomProgress={Math.max(0, (bloomProgress - 0.7) / 0.3)}
          delay={640}
          className={cn(
            'process-movement__outcome',
            revealPhase >= 6 && 'is-visible'
          )}
        >
          <p>
            <span className="process-movement__arrow">→</span>
            <span className="process-movement__outcome-text">{movement.outcome}</span>
          </p>
        </InkBloomText>
      </LetterpressCard>
    </div>
  );
}
