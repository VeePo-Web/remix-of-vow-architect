import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSmoothScroll } from './SmoothScrollProvider';

interface PianoSection {
  id: string;
  label: string;
  isBlackKey?: boolean;
}

interface PianoKeyNavProps {
  sections: PianoSection[];
}

export function PianoKeyNav({ sections }: PianoKeyNavProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();
  const lenis = useSmoothScroll();

  // Reduced motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Show/hide based on scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.5;
      const hysteresis = 100;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else if (window.scrollY < (threshold - hysteresis)) {
        setIsVisible(false);
        setActiveIndex(-1);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track first animation
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const totalDuration = sections.length * 40 + 260;
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, sections.length]);

  // IntersectionObserver for active section
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    els.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const handleKeyPress = useCallback((id: string, index: number) => {
    setPressedIndex(index);
    setTimeout(() => {
      setPressedIndex(null);
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -80 });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, isMobile ? 200 : 80);
  }, [isMobile, lenis]);

  // Golden thread progress
  const scrollProgress = activeIndex >= 0
    ? ((activeIndex + 1) / sections.length) * 100
    : 0;

  // Mobile: compact dots
  if (isMobile) {
    return (
      <nav
        role="navigation"
        aria-label="Page sections"
        className={cn(
          'fixed right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2',
          'transition-opacity duration-[260ms]',
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {sections.map((section, i) => {
          const isActive = i === activeIndex;
          const isPressed = pressedIndex === i;

          return (
            <button
              key={section.id}
              onClick={() => handleKeyPress(section.id, i)}
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              className="w-[6px] h-[6px] rounded-full transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vow-yellow/40"
              style={{
                background: isActive
                  ? 'hsl(var(--vow-yellow))'
                  : 'hsl(var(--foreground) / 0.25)',
                transform: isPressed ? 'scale(1.4)' : 'scale(1)',
                animation: isActive && !isPressed ? 'piano-mobile-dot-pulse 3s ease-in-out infinite' : 'none',
                transition: 'transform 200ms cubic-bezier(0.22,0.61,0.36,1), background 180ms ease',
              }}
            />
          );
        })}
      </nav>
    );
  }

  // Desktop: full piano keys
  return (
    <nav
      role="navigation"
      aria-label="Page sections"
      className={cn(
        'fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-[2px] hidden md:flex',
        hasAnimated
          ? 'transition-opacity duration-[260ms]'
          : 'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Golden thread progress */}
      <div className="piano-key-thread" aria-hidden="true">
        <div
          className="piano-key-thread-fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {sections.map((section, i) => {
        const isActive = i === activeIndex;
        const isBlack = section.isBlackKey;
        const isHovered = hoveredIndex === i;
        const isPressed = pressedIndex === i;
        const enterDelay = reducedMotion ? 0 : i * 40;
        const animated = hasAnimated;
        const isDamped = hoveredIndex !== null && !isHovered && !isActive;

        return (
          <div key={section.id} className="relative flex items-center justify-end">
            {/* Tooltip */}
            <div
              className={cn(
                'piano-key-tooltip',
                isHovered && 'piano-key-tooltip--visible',
                isActive && !isHovered && 'piano-key-tooltip--active piano-key-tooltip--active-persistent',
                isActive && isHovered && 'piano-key-tooltip--visible piano-key-tooltip--active'
              )}
            >
              {section.label}
              <span className="piano-key-tooltip-caret" aria-hidden="true" />
            </div>

            {/* Key */}
            <button
              onClick={() => handleKeyPress(section.id, i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(null)}
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'piano-key',
                isBlack && 'piano-key--black',
                isActive && 'piano-key--active',
                isPressed && 'piano-key--pressed',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vow-yellow/40'
              )}
              style={{
                opacity: isDamped ? 0.4 : 1,
                transition: 'opacity 180ms ease',
                ...(animated
                  ? {}
                  : {
                      animation: isVisible
                        ? `piano-key-enter 260ms cubic-bezier(0.22,0.61,0.36,1) ${enterDelay}ms both`
                        : reducedMotion
                          ? 'none'
                          : `piano-key-exit 200ms ease-in ${enterDelay}ms both`,
                    }),
              }}
            />
          </div>
        );
      })}

      {/* "Sections" micro-label */}
      <span
        className="piano-key-sections-label"
        aria-hidden="true"
      >
        Sections
      </span>
    </nav>
  );
}
