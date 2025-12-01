import React, { forwardRef, HTMLAttributes } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type AnimationVariant = 'up' | 'scale' | 'left' | 'right' | 'blur';
type AnimationSpeed = 'fast' | 'default' | 'slow';

interface RevealOnScrollProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AnimationVariant;
  speed?: AnimationSpeed;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const RevealOnScroll = forwardRef<HTMLDivElement, RevealOnScrollProps>(
  (
    {
      variant = 'up',
      speed = 'default',
      delay = 0,
      threshold = 0.15,
      triggerOnce = true,
      as: Component = 'div',
      className,
      children,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const { ref, isVisible } = useScrollReveal({
      threshold,
      triggerOnce,
      delay,
    });

    return (
      <Component
        ref={(node: HTMLDivElement) => {
          // Handle both refs
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn(
          'reveal',
          `reveal--${variant}`,
          speed !== 'default' && `reveal--${speed}`,
          isVisible && 'is-visible',
          className
        )}
        style={{
          ...style,
          '--animation-delay': `${delay}ms`,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

RevealOnScroll.displayName = 'RevealOnScroll';
