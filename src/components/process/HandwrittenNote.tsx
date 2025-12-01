import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HandwrittenNoteProps {
  text: string;
  isRevealed?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  className?: string;
}

/**
 * HandwrittenNote — SVG Stroke-Draw Animation
 * 
 * Creates the composer's margin annotation aesthetic:
 * - Caveat/script font styling
 * - SVG stroke-draw reveal animation
 * - Positioned as margin notes over images
 */
export function HandwrittenNote({
  text,
  isRevealed = false,
  position = 'top-right',
  delay = 0,
  className,
}: HandwrittenNoteProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => setIsAnimating(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, delay]);

  return (
    <div
      className={cn(
        'handwritten-note',
        `handwritten-note--${position}`,
        isAnimating && 'is-animating',
        className
      )}
      aria-hidden="true"
    >
      <span className="handwritten-note__text">{text}</span>
      <svg 
        className="handwritten-note__underline" 
        viewBox="0 0 100 8" 
        preserveAspectRatio="none"
      >
        <path
          className="handwritten-note__stroke"
          d="M0,4 Q25,2 50,4 T100,4"
          fill="none"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export default HandwrittenNote;
