import { cn } from '@/lib/utils';

interface EchoRingsProps {
  /** Number of rings currently active (0-5) */
  activeRings: number;
  /** CSS variables from useProcessScroll */
  cssVars: Record<string, string>;
  /** Whether the section is active (in viewport) */
  isActive: boolean;
  /** Current scroll progress (0-1) */
  progress: number;
  className?: string;
}

interface RingConfig {
  id: number;
  radius: number;
  strokeWidth: number;
  drawDuration: number;
  breathCycle: number;
  delay: number;
}

const RINGS: RingConfig[] = [
  { id: 1, radius: 80, strokeWidth: 1.5, drawDuration: 1200, breathCycle: 6, delay: 0 },
  { id: 2, radius: 140, strokeWidth: 1.2, drawDuration: 1400, breathCycle: 8, delay: 200 },
  { id: 3, radius: 210, strokeWidth: 1.0, drawDuration: 1600, breathCycle: 10, delay: 400 },
  { id: 4, radius: 290, strokeWidth: 0.8, drawDuration: 1800, breathCycle: 12, delay: 600 },
  { id: 5, radius: 380, strokeWidth: 0.6, drawDuration: 2000, breathCycle: 14, delay: 800 },
];

const CENTER = 400;
const VIEWBOX = '0 0 800 800';

/**
 * EchoRings — "Sound Made Visible"
 * 
 * Five concentric SVG circles that expand sequentially as movements
 * enter viewport, visualizing sound emanating from silence.
 * 
 * - stroke-dasharray draw-in effect for each ring
 * - ring-breathe animation for subtle scale/opacity oscillation
 * - ring-interference overlay for additive blending
 * - Scroll-linked visibility synced with movement reveals
 */
export function EchoRings({
  activeRings,
  cssVars,
  isActive,
  progress,
  className,
}: EchoRingsProps) {
  return (
    <div
      className={cn('echo-rings', isActive && 'is-active', className)}
      style={cssVars as React.CSSProperties}
      aria-hidden="true"
    >
      <svg
        className="echo-rings__svg"
        viewBox={VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Filter definitions for glow effects */}
        <defs>
          {/* Standard glow filter */}
          <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Intense glow for active rings */}
          <filter id="ringGlowIntense" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Origin center point */}
        <circle
          className={cn('echo-rings__origin', activeRings > 0 && 'is-ignited')}
          cx={CENTER}
          cy={CENTER}
          r="4"
        />

        {/* Concentric rings */}
        {RINGS.map((ring) => {
          const circumference = 2 * Math.PI * ring.radius;
          const isRingActive = ring.id <= activeRings;
          
          return (
            <circle
              key={ring.id}
              className={cn(
                'echo-rings__ring',
                `echo-rings__ring--${ring.id}`,
                isRingActive && 'is-active',
                isRingActive && ring.id === activeRings && 'is-drawing'
              )}
              cx={CENTER}
              cy={CENTER}
              r={ring.radius}
              fill="none"
              strokeWidth={ring.strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={isRingActive ? 0 : circumference}
              filter={isRingActive ? 'url(#ringGlowIntense)' : 'url(#ringGlow)'}
              style={{
                '--ring-circumference': circumference,
                '--ring-draw-duration': `${ring.drawDuration}ms`,
                '--ring-breath-cycle': `${ring.breathCycle}s`,
                '--ring-delay': `${ring.delay}ms`,
              } as React.CSSProperties}
            />
          );
        })}
      </svg>

      {/* Interference overlay for additive blending */}
      <div 
        className={cn(
          'echo-rings__interference',
          activeRings >= 3 && 'is-visible'
        )}
        style={{
          '--interference-intensity': Math.min(progress * 1.5, 1),
        } as React.CSSProperties}
      />
    </div>
  );
}

export default EchoRings;
