import { useEffect, useState } from "react";

interface VerticalRhythmDotsProps {
  sections: { id: string; label: string }[];
}

/**
 * Minimal mobile section navigation
 * Right-edge vertical dots with golden glow on active section
 * Provides tactile "haptic" feedback via scale pulse on tap
 */
export function VerticalRhythmDots({ sections }: VerticalRhythmDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px' }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach(o => o?.disconnect());
    };
  }, [sections]);

  const handleDotClick = (index: number) => {
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 md:hidden"
      role="navigation"
      aria-label="Section navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          className="w-2 h-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          style={{
            background: activeIndex === index 
              ? 'hsl(var(--vow-yellow))'
              : 'hsl(var(--primary) / 0.2)',
            boxShadow: activeIndex === index
              ? '0 0 12px hsl(var(--vow-yellow) / 0.4)'
              : 'none',
            transform: activeIndex === index ? 'scale(1.4)' : 'scale(1)'
          }}
          onClick={() => handleDotClick(index)}
          aria-label={`Navigate to ${section.label}`}
          aria-current={activeIndex === index ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}
