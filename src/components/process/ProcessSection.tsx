import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProcessMovement } from './ProcessMovement';
import { GradientDawnBackground } from './GradientDawnBackground';

// Ceremony background for closing block
import ceremonyImg from '@/assets/process/ceremony.jpg';

interface Movement {
  numeral: string;
  name: string;
  action: string;
  quote: string;
  details: string;
  assumption: string;
  outcome: string;
  annotation?: string;
}

const movements: Movement[] = [
  {
    numeral: 'I',
    name: 'THE LISTENING',
    action: 'I ask',
    quote: 'Before I play a single note, I learn your story.',
    details: 'What song was playing when you knew? What does your heart sound like when you think about walking toward them?',
    assumption: "I don't assume I know. I ask.",
    outcome: 'It begins with a conversation.',
    annotation: 'your story begins here',
  },
  {
    numeral: 'II',
    name: 'THE CRAFTING',
    action: 'I create',
    quote: 'Then I disappear into your vision.',
    details: 'Note by note. Measure by measure. Your walk-down song—not selected from a list, but composed from our conversation.',
    assumption: "I don't assume a cover will capture it. I create.",
    outcome: 'Your love story, translated into sound.',
    annotation: 'note by note',
  },
  {
    numeral: 'III',
    name: 'THE REFINING',
    action: 'I refine',
    quote: 'I send you a first draft—raw, unpolished, honest.',
    details: "Not to impress you. To ask: 'Does this sound like you?' If something feels off, we course-correct. Your feedback is not inconvenient\u2014it is essential.",
    assumption: "I don't assume I got it right. I check.",
    outcome: 'We iterate until it sounds exactly like you imagined.',
    annotation: 'until it feels right',
  },
  {
    numeral: 'IV',
    name: 'THE COMPLETING',
    action: 'We complete',
    quote: 'Now we fill the rest of the air together.',
    details: "Prelude. Procession. Cocktails. Dinner. You brainstorm, or I suggest—either way, we decide together. Communication all the way through. No one left wondering. No silence where there should be sound.",
    assumption: "I don't assume you know what you need. I guide, and I ask.",
    outcome: 'Every note intentional. Every decision yours.',
    annotation: 'together',
  },
];

/**
 * ProcessSection — "The Score"
 * 
 * Simplified design: clean cards with IntersectionObserver fade-in reveals.
 * Warm dawn gradient background. No complex orchestration systems.
 */
export function ProcessSection() {
  const { ref: introRef, isVisible: introVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: closingRef, isVisible: closingVisible } = useScrollReveal({ threshold: 0.2 });

  // Simple background CSS vars (static warm tone)
  const cssVars = {
    '--process-bg-h': '35',
    '--process-bg-s': '20%',
    '--process-bg-l': '8%',
    '--process-temperature': '0.7',
  };

  return (
    <section
      id="process"
      className="process-section"
      aria-label="My preparation process"
      style={{ position: 'relative' }}
    >
      {/* Layer 0: Gradient Dawn Background */}
      <GradientDawnBackground
        cssVars={cssVars}
        isActive={true}
      />

      {/* Intro Block */}
      <div ref={introRef as React.RefObject<HTMLDivElement>} className={cn('process-intro', introVisible && 'is-visible')}>
        <div className="process-intro__anchor" aria-hidden="true" />
        <span className="process-intro__label">The Process</span>
        <h2 className="process-intro__headline">
          Excellence on the big day doesn't happen on the big day.
        </h2>
        <p className="process-intro__highlight">
          <span className="exhale-emphasis">It happens now.</span>
        </p>
        <p className="process-intro__bridge">
          This is how I prepare for the moment that matters most.
        </p>
        <h3 className="process-intro__statement">
          Because there are no second chances for <span className="exhale-emphasis">First Moments</span>
        </h3>
      </div>

      {/* Movement Cards */}
      <div className="process-score">
        <div className="process-score__movements">
          {movements.map((movement, index) => (
            <ProcessMovement
              key={movement.numeral}
              movement={movement}
              index={index}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>

      {/* Closing Block with Ceremony Background */}
      <div 
        ref={closingRef as React.RefObject<HTMLDivElement>}
        className={cn('process-closing process-closing--journal', closingVisible && 'is-visible')}
      >
        {/* Ceremony background image */}
        <div className="process-closing__backdrop">
          <img 
            src={ceremonyImg} 
            alt="" 
            className="process-closing__backdrop-img"
            loading="lazy"
          />
          <div className="process-closing__backdrop-overlay" />
        </div>
        
        <div className="process-closing__content">
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
