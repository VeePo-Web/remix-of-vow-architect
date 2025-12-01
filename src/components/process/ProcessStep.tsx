import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ProcessAnnotation } from './ProcessAnnotation';

interface StepData {
  numeral: string;
  name: string;
  action: string;
  quote: string;
  details: string;
  assumption: string;
  outcome: string;
  annotations?: { text: string; position: 'left' | 'right' }[];
}

interface ProcessStepProps {
  step: StepData;
  index: number;
  isActive: boolean;
  position: 'left' | 'right';
  onEnterView: () => void;
}

/**
 * ProcessStep — Individual Movement Card
 * 
 * Alternates left/right of the staff spine.
 * Staggered reveal animation for each text element.
 */
export function ProcessStep({
  step,
  index,
  isActive,
  position,
  onEnterView,
}: ProcessStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = stepRef.current;
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
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          if (!hasTriggered) {
            setHasTriggered(true);
            onEnterView();
          }
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasTriggered, onEnterView]);

  return (
    <div
      ref={stepRef}
      className={cn(
        'process-step',
        `process-step--${position}`,
        hasTriggered && 'is-visible'
      )}
      style={{ '--step-index': index } as React.CSSProperties}
    >
      {/* Mini Staff for Mobile */}
      <div className="process-step__mini-staff" aria-hidden="true">
        <svg viewBox="0 0 120 60" className="process-step__mini-staff-svg">
          {/* 5 lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={10 + i * 10}
              x2="120"
              y2={10 + i * 10}
              className="process-staff__line"
            />
          ))}
          {/* Notes based on step */}
          {index === 0 && (
            <g className="process-note">
              <ellipse cx="60" cy="30" rx="8" ry="6" className="process-note__head" />
              <line x1="68" y1="30" x2="68" y2="5" className="process-note__stem" />
            </g>
          )}
          {index === 1 && (
            <>
              {[25, 45, 65, 85, 105].map((x, i) => (
                <g key={i} className="process-note">
                  <ellipse cx={x} cy={20 + (i % 3) * 10} rx="6" ry="5" className="process-note__head" />
                  <line x1={x + 6} y1={20 + (i % 3) * 10} x2={x + 6} y2={-5 + (i % 3) * 10} className="process-note__stem" />
                </g>
              ))}
            </>
          )}
          {index === 2 && (
            <>
              <g className="process-note--ghost">
                <ellipse cx="40" cy="30" rx="6" ry="5" className="process-note__head--ghost" />
                <line x1="30" y1="40" x2="50" y2="20" className="process-note__strike" />
              </g>
              <g className="process-note">
                <ellipse cx="70" cy="25" rx="6" ry="5" className="process-note__head" />
                <line x1="76" y1="25" x2="76" y2="0" className="process-note__stem" />
              </g>
            </>
          )}
          {index === 3 && (
            <>
              {[20, 40, 60, 80, 100].map((x, i) => (
                <g key={i} className="process-note">
                  <ellipse cx={x} cy={25 + (i % 2) * 10} rx="6" ry="5" className="process-note__head" />
                  <line x1={x + 6} y1={25 + (i % 2) * 10} x2={x + 6} y2={(i % 2) * 10} className="process-note__stem" />
                </g>
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Step Content */}
      <div className="process-step__content">
        <div className="process-step__header">
          <span className="process-step__numeral">{step.numeral}</span>
          <span className="process-step__name">{step.name}</span>
        </div>
        
        <span className="process-step__action">{step.action}</span>
        
        <p className="process-step__quote">"{step.quote}"</p>
        
        <p className="process-step__details">{step.details}</p>
        
        <p className="process-step__assumption">{step.assumption}</p>
        
        <p className="process-step__outcome">
          <span className="process-step__arrow">→</span>
          {step.outcome}
        </p>
      </div>

      {/* Handwritten Annotations */}
      {step.annotations?.map((annotation, i) => (
        <ProcessAnnotation
          key={i}
          text={annotation.text}
          position={annotation.position}
          isVisible={hasTriggered}
          delay={800 + i * 200}
        />
      ))}
    </div>
  );
}
