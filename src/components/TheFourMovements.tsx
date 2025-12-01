import { useEffect, useRef, useState } from 'react';

interface Step {
  numeral: string;
  action: string;
  question: string;
  reason: string;
}

const steps: Step[] = [
  {
    numeral: 'I',
    action: 'I ask',
    question: 'What song was playing when you knew?',
    reason: 'Because I don\'t assume what moves you.',
  },
  {
    numeral: 'II',
    action: 'I create',
    question: 'Your aisle music—composed. Not selected.',
    reason: 'Because I don\'t assume what it should sound like.',
  },
  {
    numeral: 'III',
    action: 'I refine',
    question: 'A first draft. Is this the direction?',
    reason: 'Because I don\'t assume I got it right.',
  },
  {
    numeral: 'IV',
    action: 'I complete',
    question: 'You curate. Or I suggest. Either way—together.',
    reason: 'Because I don\'t assume what you want.',
  },
];

export function TheFourMovements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="preparation-section"
      aria-label="My preparation process"
    >
      {/* Opening Block */}
      <div className={`preparation-opening ${isVisible ? 'is-visible' : ''}`}>
        <span className="preparation-label">The Process</span>
        <h2 className="preparation-headline">
          Excellence on the big day doesn't happen on the big day.
        </h2>
        <p className="preparation-subheadline">It happens now.</p>
        <p className="preparation-bridge">
          This is my process for ensuring it happens every time.
        </p>
      </div>

      {/* Vertical Stepper */}
      <div className={`preparation-stepper ${isVisible ? 'is-visible' : ''}`}>
        <div className="preparation-thread" aria-hidden="true" />
        
        {steps.map((step, index) => (
          <div 
            key={step.numeral}
            className="preparation-step"
            style={{ '--step-index': index } as React.CSSProperties}
          >
            <div className="preparation-node" aria-hidden="true">
              <span className="preparation-numeral">{step.numeral}</span>
            </div>
            <div className="preparation-content">
              <span className="preparation-action">{step.action}</span>
              <p className="preparation-question">{step.question}</p>
              <p className="preparation-reason">{step.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing Block */}
      <div className={`preparation-closing ${isVisible ? 'is-visible' : ''}`}>
        <p className="preparation-promise">
          Because there are no second chances for a first moment.
        </p>
        <p className="preparation-assurance">And yours will be right.</p>
      </div>
    </section>
  );
}

export default TheFourMovements;
