import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'surface' | 'accent-soft' | 'dark';
  threshold?: number;
  staggerDelay?: number;
}

export function AnimatedSection({
  children,
  className,
  variant = 'default',
  threshold = 0.1,
  staggerDelay = 100,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '-80px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        `section--${variant}`,
        'section-reveal',
        isVisible && 'is-visible',
        className
      )}
      style={{ '--duration-stagger': `${staggerDelay}ms` } as React.CSSProperties}
    >
      {children}
    </section>
  );
}
