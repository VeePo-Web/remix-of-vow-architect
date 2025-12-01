import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: React.ElementType;
}

export function StaggerChildren({
  children,
  staggerDelay = 80,
  threshold = 0.15,
  rootMargin = '-60px 0px',
  className,
  as: Component = 'div',
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
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
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Component
      ref={containerRef}
      className={cn('stagger-reveal', isVisible && 'is-visible', className)}
      style={{ '--duration-stagger': `${staggerDelay}ms` } as React.CSSProperties}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            className: cn(
              child.props.className,
              'reveal reveal--up',
              isVisible && 'is-visible'
            ),
            style: {
              ...child.props.style,
              '--stagger-index': index,
            },
          } as React.HTMLAttributes<HTMLElement>);
        }
        return child;
      })}
    </Component>
  );
}
