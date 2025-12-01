import { cn } from '@/lib/utils';

interface ProcessThreadProps {
  activeStep: number;
  className?: string;
}

/**
 * ProcessThread — Golden Vertical Thread
 * 
 * Replaces the literal musical staff with an abstract golden thread
 * connecting four anchor dots. Thread draws on scroll, dots ignite
 * when their corresponding movement becomes active.
 */
export function ProcessThread({ activeStep, className }: ProcessThreadProps) {
  const dotPositions = [12, 31, 50, 69]; // Percentage positions for 4 dots
  
  return (
    <div className={cn('process-thread', className)} aria-hidden="true">
      {/* Vertical Golden Line */}
      <svg
        className="process-thread__svg"
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="threadVerticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
            <stop offset="10%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.8" />
            <stop offset="90%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="10"
          y1="8"
          x2="10"
          y2="92"
          stroke="url(#threadVerticalGradient)"
          strokeWidth="1"
          className={cn(
            'process-thread__line',
            activeStep >= 1 && 'is-drawing'
          )}
        />
      </svg>

      {/* Anchor Dots */}
      {dotPositions.map((pos, index) => (
        <div
          key={index}
          className={cn(
            'process-thread__dot',
            activeStep > index && 'is-ignited'
          )}
          style={{ 
            top: `${pos}%`,
            '--dot-delay': `${index * 200}ms`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
