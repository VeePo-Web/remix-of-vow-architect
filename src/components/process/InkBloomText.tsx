import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface InkBloomTextProps {
  children: ReactNode;
  variant?: 'default' | 'action' | 'quote' | 'muted';
  delay?: number;
  isRevealed?: boolean;
  bloomProgress?: number;
  className?: string;
}

/**
 * InkBloomText — Ink Bloom Animation Wrapper
 * 
 * Text appears as if ink is blooming on fine paper:
 * - Blur to sharp transition
 * - Micro-expansion (scale 0.98 → 1)
 * - Color saturation shift
 * 
 * The 'action' variant uses a more dramatic reveal
 * for the vow-yellow action verbs.
 */
export function InkBloomText({
  children,
  variant = 'default',
  delay = 0,
  isRevealed = false,
  bloomProgress = 0,
  className,
}: InkBloomTextProps) {
  // Calculate bloom values based on progress
  const blurAmount = Math.max(0, (1 - bloomProgress) * 4);
  const scale = 0.98 + bloomProgress * 0.02;
  const opacity = Math.min(1, bloomProgress * 1.2);
  
  // Action variant gets more dramatic treatment
  const isAction = variant === 'action';
  const actionScale = isAction ? 0.95 + bloomProgress * 0.05 : scale;
  const actionBlur = isAction ? Math.max(0, (1 - bloomProgress) * 6) : blurAmount;
  
  return (
    <span
      className={cn(
        'ink-bloom-text',
        `ink-bloom-text--${variant}`,
        isRevealed && 'ink-bloom-text--revealed',
        className
      )}
      style={{
        '--bloom-delay': `${delay}ms`,
        '--bloom-blur': `${isAction ? actionBlur : blurAmount}px`,
        '--bloom-scale': isAction ? actionScale : scale,
        '--bloom-opacity': opacity,
        '--bloom-progress': bloomProgress,
      } as React.CSSProperties}
    >
      <span className="ink-bloom-text__content">
        {children}
      </span>
      
      {/* Action variant gets stroke-draw underline */}
      {isAction && isRevealed && (
        <span className="ink-bloom-text__stroke" aria-hidden="true" />
      )}
    </span>
  );
}

export default InkBloomText;
