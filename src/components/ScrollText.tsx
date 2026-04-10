import { cn } from '@/lib/utils';

/**
 * ScrollText — Scroll-driven text overlay with cinematic readability.
 *
 * Fades in/out at configurable scroll thresholds with text-shadow
 * for guaranteed readability over any video background.
 */

interface ScrollTextProps {
  enterAt: number;
  exitAt: number;
  progress: number;
  children: React.ReactNode;
  position?: 'center' | 'left' | 'right';
  animation?: 'fade-up' | 'fade' | 'scale' | 'blur';
  className?: string;
  isLabel?: boolean;
}

export function ScrollText({
  enterAt,
  exitAt,
  progress,
  children,
  position = 'center',
  animation = 'fade-up',
  className,
  isLabel,
}: ScrollTextProps) {
  // Outside range → invisible
  if (progress < enterAt - 0.01 || progress > exitAt + 0.01) return null;

  const range = exitAt - enterAt;
  const fadeIn = range * 0.20;  // 20% of range for fade in
  const fadeOut = range * 0.20; // 20% of range for fade out
  const fadeInEnd = enterAt + fadeIn;
  const fadeOutStart = exitAt - fadeOut;

  let opacity = 0;
  if (progress < enterAt) {
    opacity = 0;
  } else if (progress < fadeInEnd) {
    opacity = (progress - enterAt) / fadeIn;
  } else if (progress > fadeOutStart) {
    opacity = 1 - (progress - fadeOutStart) / fadeOut;
  } else {
    opacity = 1;
  }

  opacity = Math.max(0, Math.min(1, opacity));
  if (opacity < 0.005) return null;

  // Animation transforms
  const inProgress = Math.max(0, Math.min(1, (progress - enterAt) / fadeIn));
  let transform = '';
  let filter: string | undefined;

  switch (animation) {
    case 'fade-up':
      transform = `translateY(${(1 - inProgress) * 30}px)`;
      break;
    case 'scale':
      transform = `scale(${0.90 + inProgress * 0.10})`;
      break;
    case 'blur':
      transform = `translateY(${(1 - inProgress) * 16}px)`;
      filter = `blur(${(1 - inProgress) * 6}px)`;
      break;
    case 'fade':
    default:
      break;
  }

  // Position alignment
  const posMap = {
    center: 'items-center justify-center text-center',
    left: 'items-start justify-center text-left pl-[6%] md:pl-[10%] lg:pl-[12%]',
    right: 'items-end justify-center text-right pr-[6%] md:pr-[10%] lg:pr-[12%]',
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col z-10 pointer-events-none',
        posMap[position],
      )}
      style={{
        opacity,
        transform,
        filter,
        willChange: 'opacity, transform',
      }}
    >
      <div
        className={cn(
          'px-6 md:px-0 max-w-[90vw]',
          // Cinematic text shadow for readability over ANY video frame
          'video-text-shadow',
          isLabel && 'mb-4',
          className,
        )}
      >
        {typeof children === 'string'
          ? children.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))
          : children
        }
      </div>
    </div>
  );
}
