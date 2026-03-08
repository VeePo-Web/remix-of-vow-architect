import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useCallback } from 'react';
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
    quote: 'Before I touch a single key, I learn your story.',
    details: 'What song was playing when you knew? What do you want to feel the moment you begin your walk?',
    assumption: 'I never assume. I listen first.',
    outcome: 'It starts with a conversation — not a playlist.',
    annotation: 'it starts here',
  },
  {
    numeral: 'II',
    name: 'THE CRAFTING',
    action: 'I compose',
    quote: 'Then I disappear into the music.',
    details: 'Your walk-down song — composed from our conversation, not selected from a catalogue.',
    assumption: 'A cover cannot hold what is yours alone. So I write it.',
    outcome: 'Your story, made audible.',
    annotation: 'note by note',
  },
  {
    numeral: 'III',
    name: 'THE REFINING',
    action: 'I refine',
    quote: 'I send a first draft — unpolished, honest, yours to shape.',
    details: 'Not to impress you — to ask: does this sound like us? Your feedback is not inconvenient. It is the whole point.',
    assumption: 'I would rather revise ten times than settle once.',
    outcome: 'We refine until it sounds exactly as you imagined.',
    annotation: "until it's right",
  },
  {
    numeral: 'IV',
    name: 'THE COMPLETING',
    action: 'We complete',
    quote: 'Now we shape the rest of the day — together.',
    details: 'Prelude. Procession. Cocktails. Dinner. You suggest, or I guide — either way, every decision is shared. No one left wondering. No silence where there should be sound.',
    assumption: 'You lead. I follow. And when you need direction, I offer it.',
    outcome: 'Every note chosen. Every moment accounted for.',
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
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Scroll-linked parallax for background layers
  const updateParallax = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollY = -rect.top;
    sectionRef.current.style.setProperty('--process-scroll-y', `${scrollY}px`);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateParallax);
          };
          window.addEventListener('scroll', onScroll, { passive: true });
          updateParallax();
          (section as any).__scrollHandler = onScroll;
        } else {
          const handler = (section as any).__scrollHandler;
          if (handler) window.removeEventListener('scroll', handler);
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0, rootMargin: '100px 0px' }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      const handler = (section as any).__scrollHandler;
      if (handler) window.removeEventListener('scroll', handler);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateParallax]);

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
      ref={sectionRef}
      className="process-section piano-section-target"
      aria-label="My preparation process"
      style={{ position: 'relative' }}
    >
      {/* Layer 0: Gradient Dawn Background */}
      <GradientDawnBackground
        cssVars={cssVars}
        isActive={true}
      />

      {/* Section transition fade — top */}
      <div className="process-section__fade-top" aria-hidden="true" />

      {/* Intro Block */}
      <div ref={introRef as React.RefObject<HTMLDivElement>} className={cn('process-intro', introVisible && 'is-visible')}>
        <div className="process-intro__anchor" aria-hidden="true" />
        <span className="process-intro__label">The Process</span>
        <h2 className="process-intro__headline">
          Excellence on the day of your ceremony doesn't happen the day of your ceremony.
        </h2>
        <p className="process-intro__highlight">
          <span className="exhale-emphasis">It happens now.</span>
        </p>
        <p className="process-intro__bridge">
          This is how I prepare — so the moment you've imagined is the moment you live.
        </p>
        <h3 className="process-intro__statement">
          Because there are no second takes on a <span className="exhale-emphasis">First Moment</span>
        </h3>
      </div>

      {/* Golden Thread — visual continuity from intro to movements */}
      <div className="process-intro__thread" aria-hidden="true" />

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
            decoding="async"
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
          <Link to="/contact" className="process-closing__cta cta-commitment cta-breathe-glow">
            <span className="process-closing__cta-text">Begin the conversation</span>
            <span className="process-closing__cta-glow" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Section transition fade — bottom */}
      <div className="process-section__fade-bottom" aria-hidden="true" />

      {/* Screen reader narrative */}
      <span className="sr-only">
        This section describes my four-movement process for creating your ceremony music:
        First, The Listening, where I learn your story through conversation.
        Second, The Crafting, where I compose custom arrangements from our discussion.
        Third, The Refining, where we iterate on drafts until the music sounds exactly right.
        Fourth, The Completing, where we collaboratively fill in the remaining music for your ceremony.
        Excellence on the day of your ceremony happens through careful preparation now.
      </span>
    </section>
  );
}

export default ProcessSection;
