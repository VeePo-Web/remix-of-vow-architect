import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProcessStaff } from './ProcessStaff';
import { ProcessStep } from './ProcessStep';

interface Step {
  numeral: string;
  name: string;
  action: string;
  quote: string;
  details: string;
  assumption: string;
  outcome: string;
  annotations?: { text: string; position: 'left' | 'right' }[];
}

const steps: Step[] = [
  {
    numeral: 'I',
    name: 'THE LISTENING',
    action: 'I ask',
    quote: 'Before I play a single note, I learn your story.',
    details: 'What song was playing when you knew? What tempo matches the way your heart beats when you think about walking toward them?',
    assumption: "I don't assume I know. I ask.",
    outcome: 'We begin with a conversation.',
    annotations: [
      { text: 'What song was playing when you knew?', position: 'right' },
    ],
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
    annotations: [
      { text: 'Too fast?', position: 'left' },
      { text: 'Softer here?', position: 'right' },
    ],
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
 * ProcessSection — "Sheet Music That Writes Itself"
 * 
 * A Fantasy.co-grade scroll experience where the musical staff
 * progressively fills with notes as users journey through each movement.
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

  const handleStepEnterView = useCallback((stepIndex: number) => {
    setActiveStep((prev) => Math.max(prev, stepIndex + 1));
    if (stepIndex === 3) {
      setTimeout(() => setClosingVisible(true), 600);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section"
      aria-label="My preparation process"
    >
      {/* Paper Texture Overlay */}
      <div className="process-section__texture" aria-hidden="true" />

      {/* SVG Staff Spine (Desktop) */}
      <ProcessStaff activeStep={activeStep} className="process-section__staff" />

      {/* Intro Block */}
      <div className={cn('process-intro', introVisible && 'is-visible')}>
        <span className="process-intro__label">The Process</span>
        <h2 className="process-intro__headline">
          Excellence on the big day doesn't happen on the big day.
        </h2>
        <p className="process-intro__highlight">It happens now.</p>
        <p className="process-intro__bridge">
          This is my process for ensuring it happens every time.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="process-steps">
        {steps.map((step, index) => (
          <ProcessStep
            key={step.numeral}
            step={step}
            index={index}
            isActive={activeStep > index}
            position={index % 2 === 0 ? 'left' : 'right'}
            onEnterView={() => handleStepEnterView(index)}
          />
        ))}
      </div>

      {/* Closing Block */}
      <div className={cn('process-closing', closingVisible && 'is-visible')}>
        <p className="process-closing__promise">
          Because there's one chance to get this right.
        </p>
        <p className="process-closing__assurance">And it will be right.</p>
        <Link to="/contact" className="process-closing__cta">
          Begin the conversation
        </Link>
      </div>
    </section>
  );
}

export default ProcessSection;
