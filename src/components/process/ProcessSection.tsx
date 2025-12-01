import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProcessThread } from './ProcessThread';
import { ProcessMovement } from './ProcessMovement';

interface Movement {
  numeral: string;
  name: string;
  action: string;
  quote: string;
  details: string;
  assumption: string;
  outcome: string;
}

const movements: Movement[] = [
  {
    numeral: 'I',
    name: 'THE LISTENING',
    action: 'I ask',
    quote: 'Before I play a single note, I learn your story.',
    details: 'What song was playing when you knew? What tempo matches the way your heart beats when you think about walking toward them?',
    assumption: "I don't assume I know. I ask.",
    outcome: 'We begin with a conversation.',
  },
  {
    numeral: 'II',
    name: 'THE CRAFTING',
    action: 'I create',
    quote: 'Then I disappear into your vision.',
    details: 'Note by note. Measure by measure. Your walk-down song—not selected from a list, but composed from our conversation.',
    assumption: "I don't assume a cover will capture it. I create.",
    outcome: 'Custom arrangement. Your love story, translated.',
  },
  {
    numeral: 'III',
    name: 'THE REFINING',
    action: 'I refine',
    quote: 'I send you a first draft—raw, unpolished, honest.',
    details: "Not to impress you. To ask you: 'Am I heading the right direction?' If something feels off, we course-correct. Your feedback isn't inconvenient. It's essential.",
    assumption: "I don't assume I got it right. I check.",
    outcome: 'We iterate until it sounds exactly like you imagined.',
  },
  {
    numeral: 'IV',
    name: 'THE COMPLETING',
    action: 'We complete',
    quote: 'Now we fill the rest of the air together.',
    details: "Prelude. Procession. Cocktails. Dinner. You brainstorm, or I suggest—either way, we decide together. Communication all the way through. No one left wondering. No silence where there should be sound.",
    assumption: "I don't assume you know what you want. I guide and ask.",
    outcome: 'Every note intentional. Every decision yours.',
  },
];

/**
 * ProcessSection — "Composition in the Dark"
 * 
 * Fantasy.co-grade scroll experience with rich black background,
 * golden thread notation system, and sacred timing animations.
 * Matches the visual language of Hero and Exhale sections.
 */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [closingVisible, setClosingVisible] = useState(false);

  // Intro reveal
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIntroVisible(true);
      setActiveStep(4);
      setClosingVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleMovementEnterView = useCallback((movementIndex: number) => {
    setActiveStep((prev) => Math.max(prev, movementIndex + 1));
    if (movementIndex === 3) {
      setTimeout(() => setClosingVisible(true), 800);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section"
      aria-label="My preparation process"
    >
      {/* Layer 0: Depth gradient background */}
      <div className="process-section__gradient" />

      {/* Layer 1: Ambient glow */}
      <div 
        className={cn(
          'process-section__glow',
          introVisible && 'is-visible'
        )}
      />

      {/* Golden Thread (Desktop) */}
      <ProcessThread 
        activeStep={activeStep} 
        className="process-section__thread" 
      />

      {/* Intro Block */}
      <div className={cn('process-intro', introVisible && 'is-visible')}>
        {/* Golden Anchor Dot */}
        <div className="process-intro__anchor" aria-hidden="true" />
        
        <span className="process-intro__label">The Process</span>
        <h2 className="process-intro__headline">
          Excellence on the big day doesn't happen on the big day.
        </h2>
        <p className="process-intro__highlight">
          <span className="exhale-emphasis exhale-emphasis--visible">It happens now.</span>
        </p>
        <p className="process-intro__bridge">
          This is my process for ensuring it happens every time.
        </p>
      </div>

      {/* Movements */}
      <div className="process-movements">
        {movements.map((movement, index) => (
          <ProcessMovement
            key={movement.numeral}
            movement={movement}
            index={index}
            onEnterView={() => handleMovementEnterView(index)}
          />
        ))}
      </div>

      {/* Closing Block */}
      <div className={cn('process-closing', closingVisible && 'is-visible')}>
        <p className="process-closing__promise">
          Because there's one chance to get this right.
        </p>
        <p className="process-closing__assurance">
          <span className="exhale-emphasis exhale-emphasis--visible">And it will be right.</span>
        </p>
        <Link to="/contact" className="process-closing__cta">
          Begin the conversation
        </Link>
      </div>

      {/* Screen reader narrative */}
      <span className="sr-only">
        This section describes my four-movement process for creating your ceremony music:
        First, The Listening, where I learn your story through conversation.
        Second, The Crafting, where I compose custom arrangements from our discussion.
        Third, The Refining, where we iterate on drafts until the music sounds exactly right.
        Fourth, The Completing, where we collaboratively fill in the remaining music for your ceremony.
        Excellence on the big day happens through careful preparation now.
      </span>
    </section>
  );
}

export default ProcessSection;
