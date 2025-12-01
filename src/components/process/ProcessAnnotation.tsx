import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProcessAnnotationProps {
  text: string;
  position: 'left' | 'right';
  delay?: number;
  isVisible: boolean;
  className?: string;
}

/**
 * ProcessAnnotation — Handwritten Margin Notes
 * 
 * Adds intimacy through handwritten-style annotations that
 * "write themselves in" with stroke animation.
 */
export function ProcessAnnotation({
  text,
  position,
  delay = 0,
  isVisible,
  className,
}: ProcessAnnotationProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      className={cn(
        'process-annotation',
        `process-annotation--${position}`,
        shouldAnimate && 'is-visible',
        className
      )}
      aria-hidden="true"
    >
      <span className="process-annotation__text">{text}</span>
    </div>
  );
}

/**
 * ProcessAnnotationSVG — SVG Path Handwriting
 * 
 * For more complex annotations that need stroke-draw animation.
 */
interface ProcessAnnotationSVGProps {
  pathData: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

export function ProcessAnnotationSVG({
  pathData,
  isVisible,
  delay = 0,
  className,
}: ProcessAnnotationSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <svg
      className={cn('process-annotation-svg', className)}
      viewBox="0 0 200 50"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={pathData}
        className={cn(
          'process-annotation-svg__path',
          shouldAnimate && 'is-drawn'
        )}
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: shouldAnimate ? 0 : pathLength,
        }}
      />
    </svg>
  );
}
