import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Movement {
  numeral: string;
  action: string;
  name: string;
  openingQuote: string;
  supportingLines: string[];
  noAssume: string;
  outcome: string;
}

const movements: Movement[] = [
  {
    numeral: 'I',
    action: 'I ask',
    name: 'THE LISTENING',
    openingQuote: 'Before I play a single note, I learn your story.',
    supportingLines: [
      'What song was playing when you knew?',
      'What tempo matches the way your heart beats when you think about walking toward them?',
    ],
    noAssume: 'I don\'t assume I know. I ask.',
    outcome: 'We begin with a conversation.',
  },
  {
    numeral: 'II',
    action: 'I create',
    name: 'THE CRAFTING',
    openingQuote: 'Then I disappear into your vision.',
    supportingLines: [
      'Note by note. Measure by measure.',
      'Your walk-down song—not selected from a list, but composed from our conversation.',
    ],
    noAssume: 'I don\'t assume a cover will capture it. I create.',
    outcome: 'Custom arrangement. Your love story, translated.',
  },
  {
    numeral: 'III',
    action: 'I refine',
    name: 'THE REFINING',
    openingQuote: 'I send you a first draft—raw, unpolished, honest.',
    supportingLines: [
      'Not to impress you. To ask you:',
      '"Am I heading the right direction?"',
      'If something feels off, we course-correct.',
      'Your feedback isn\'t inconvenient. It\'s essential.',
    ],
    noAssume: 'I don\'t assume I got it right. I check.',
    outcome: 'We iterate until it sounds exactly like you imagined.',
  },
  {
    numeral: 'IV',
    action: 'We complete',
    name: 'THE COMPLETING',
    openingQuote: 'Now we fill the rest of the air together.',
    supportingLines: [
      'Prelude. Procession. Cocktails. Dinner.',
      'You brainstorm, or I suggest—either way, we decide together.',
      'Communication all the way through.',
      'No one left wondering. No silence where there should be sound.',
    ],
    noAssume: 'I don\'t assume you know what you want. I guide and ask.',
    outcome: 'Every note intentional. Every decision yours.',
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
      { threshold: 0.1 }
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
        
        {movements.map((movement, index) => (
          <div 
            key={movement.numeral}
            className="preparation-movement"
            style={{ '--step-index': index } as React.CSSProperties}
          >
            <div className="preparation-node" aria-hidden="true">
              <span className="preparation-numeral">{movement.numeral}</span>
            </div>
            <div className="preparation-content">
              <div className="movement-header">
                <span className="movement-action">{movement.action}</span>
                <span className="movement-name">{movement.name}</span>
              </div>
              <blockquote className="movement-quote">
                "{movement.openingQuote}"
              </blockquote>
              <div className="movement-lines">
                {movement.supportingLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p className="movement-noassume">{movement.noAssume}</p>
              <p className="movement-outcome">
                <span className="outcome-arrow">→</span> {movement.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing Block */}
      <div className={`preparation-closing ${isVisible ? 'is-visible' : ''}`}>
        <p className="preparation-promise">
          Because there's one chance to get this right.
        </p>
        <p className="preparation-assurance">And it will be right.</p>
        <Link to="/contact" className="preparation-cta">
          Begin the conversation
        </Link>
      </div>
    </section>
  );
}

export default TheFourMovements;
