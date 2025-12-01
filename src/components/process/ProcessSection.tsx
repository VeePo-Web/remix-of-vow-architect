import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProcessMovement } from './ProcessMovement';
import { GradientDawnBackground } from './GradientDawnBackground';
import { AmbientGlowField } from './AmbientGlowField';
import { WeavingThread } from './WeavingThread';
import { ProcessDebugOverlay } from './ProcessDebugOverlay';
import { useProcessOrchestrator } from '@/hooks/useProcessOrchestrator';

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
 * ProcessSection — "The Score"
 * 
 * Fantasy.co-grade design: 3-column grid with alternating left/right cards.
 * Thread weaves between cards like a musical score being written.
 */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [closingVisible, setClosingVisible] = useState(false);

  // Master orchestrator — unified timing system
  const orchestrator = useProcessOrchestrator(sectionRef, {
    debug: process.env.NODE_ENV === 'development',
  });

  // Intro reveal based on scroll activation
  useEffect(() => {
    if (orchestrator.isActive && orchestrator.progress > 0.12) {
      setIntroVisible(true);
    }
  }, [orchestrator.isActive, orchestrator.progress]);

  // Map phases to movement visibility
  useEffect(() => {
    if (orchestrator.phase === 'drifting' && orchestrator.highlightedMovement >= 0) {
      setActiveStep(orchestrator.highlightedMovement + 1);
    } else if (orchestrator.phase === 'converging' || orchestrator.phase === 'covenant') {
      setActiveStep(4);
      setClosingVisible(true);
    }
  }, [orchestrator.phase, orchestrator.highlightedMovement]);

  // Movement enter view handler
  const handleMovementEnterView = useCallback((movementIndex: number) => {
    setActiveStep((prev) => Math.max(prev, movementIndex + 1));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section"
      aria-label="My preparation process"
      data-phase={orchestrator.phase}
      data-scroll-progress={orchestrator.progress.toFixed(2)}
      style={orchestrator.cssVars as React.CSSProperties}
    >
      {/* Debug Overlay (dev only) */}
      <ProcessDebugOverlay
        progress={orchestrator.progress}
        phase={orchestrator.phase}
        phaseProgress={orchestrator.phaseProgress}
        velocity={orchestrator.velocity}
        direction={orchestrator.direction}
        highlightedMovement={orchestrator.highlightedMovement}
        isActive={orchestrator.isActive}
      />

      {/* Layer 0: Gradient Dawn Background (void → warm dawn) */}
      <GradientDawnBackground
        cssVars={orchestrator.cssVars}
        isActive={orchestrator.isActive}
      />

      {/* Layer 1: Ambient Glow Field (breathing golden presence) */}
      <AmbientGlowField
        cssVars={orchestrator.cssVars}
        isActive={orchestrator.isActive}
        progress={orchestrator.progress}
      />

      {/* Intro Block */}
      <div className={cn('process-intro', introVisible && 'is-visible')}>
        <div className="process-intro__anchor" aria-hidden="true" />
        <span className="process-intro__label">The Process</span>
        <h2 className="process-intro__headline">
          Excellence on the big day doesn't happen on the big day.
        </h2>
        <p className="process-intro__highlight">
          <span className="exhale-emphasis">It happens now.</span>
        </p>
        <p className="process-intro__bridge">
          This is my process for ensuring it happens every time.
        </p>
      </div>

      {/* The Score: 3-Column Grid with Weaving Thread */}
      <div className="process-score">
        {/* Center channel: Weaving Thread (full-width, conductor-connected) */}
        <WeavingThread
          progress={orchestrator.progress}
          isActive={orchestrator.isActive}
          highlightedMovement={orchestrator.highlightedMovement}
          className="process-score__thread"
        />

        {/* Movements: Alternating left/right */}
        <div className="process-score__movements">
          {movements.map((movement, index) => (
            <ProcessMovement
              key={movement.numeral}
              movement={movement}
              index={index}
              side={index % 2 === 0 ? 'left' : 'right'}
              isHighlighted={orchestrator.highlightedMovement === index}
              onEnterView={() => handleMovementEnterView(index)}
            />
          ))}
        </div>
      </div>

      {/* Closing Block */}
      <div 
        className={cn('process-closing', closingVisible && 'is-visible')}
        data-flame-state={orchestrator.phase}
      >
        <div className="process-closing__flame-spacer" aria-hidden="true" />
        <div className="process-closing__radiance" aria-hidden="true" />
        <p className="process-closing__promise">
          Because there's one chance to get this right.
        </p>
        <p className="process-closing__assurance">
          <span className="exhale-emphasis">And it will be right.</span>
        </p>
        <Link to="/contact" className="process-closing__cta">
          <span className="process-closing__cta-text">Begin the conversation</span>
          <span className="process-closing__cta-glow" aria-hidden="true" />
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
