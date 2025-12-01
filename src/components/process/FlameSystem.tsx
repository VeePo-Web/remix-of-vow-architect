import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface FlameSystemProps {
  progress: number;
  cssVars: Record<string, string>;
  isActive: boolean;
  className?: string;
}

type FlameState = 'origin' | 'fragmenting' | 'drifting' | 'converging' | 'unified';

interface FragmentConfig {
  id: number;
  angle: number;
  maxDistance: number;
  size: number;
  delay: number;
}

/**
 * FlameSystem — "From Spark to Symphony"
 * 
 * A single flame fragments into 4 pieces that drift with each movement,
 * then reconverge into a unified brilliant flame above the closing CTA.
 * 
 * State machine: origin → fragmenting → drifting → converging → unified
 */
export function FlameSystem({
  progress,
  cssVars,
  isActive,
  className,
}: FlameSystemProps) {
  // Determine flame state based on scroll progress
  const flameState: FlameState = useMemo(() => {
    if (progress < 0.08) return 'origin';
    if (progress < 0.15) return 'fragmenting';
    if (progress < 0.75) return 'drifting';
    if (progress < 0.90) return 'converging';
    return 'unified';
  }, [progress]);

  // Fragment configurations
  const fragments: FragmentConfig[] = useMemo(() => [
    { id: 1, angle: -45, maxDistance: 120, size: 0.7, delay: 0 },
    { id: 2, angle: -15, maxDistance: 100, size: 0.8, delay: 100 },
    { id: 3, angle: 15, maxDistance: 100, size: 0.8, delay: 200 },
    { id: 4, angle: 45, maxDistance: 120, size: 0.7, delay: 300 },
  ], []);

  // Calculate fragment positions based on state
  const getFragmentStyle = (fragment: FragmentConfig): React.CSSProperties => {
    const rad = (fragment.angle * Math.PI) / 180;
    
    switch (flameState) {
      case 'origin':
        return {
          transform: 'translate(0, 0) scale(0)',
          opacity: 0,
        };
      case 'fragmenting': {
        const fragmentProgress = Math.min(1, (progress - 0.08) / 0.07);
        const distance = fragment.maxDistance * 0.3 * fragmentProgress;
        const x = Math.sin(rad) * distance;
        const y = -Math.cos(rad) * distance * 0.5;
        return {
          transform: `translate(${x}px, ${y}px) scale(${fragment.size * fragmentProgress})`,
          opacity: fragmentProgress,
          transitionDelay: `${fragment.delay}ms`,
        };
      }
      case 'drifting': {
        const driftProgress = (progress - 0.15) / 0.60;
        const distance = fragment.maxDistance * (0.3 + driftProgress * 0.7);
        const verticalDrift = driftProgress * 400; // Drift downward with scroll
        const x = Math.sin(rad) * distance;
        const y = verticalDrift - Math.cos(rad) * distance * 0.3;
        return {
          transform: `translate(${x}px, ${y}px) scale(${fragment.size})`,
          opacity: 0.9,
        };
      }
      case 'converging': {
        const convergeProgress = (progress - 0.75) / 0.15;
        const eased = 1 - Math.pow(1 - convergeProgress, 3); // Ease out cubic
        const startDistance = fragment.maxDistance;
        const distance = startDistance * (1 - eased);
        const verticalDrift = 400 + (convergeProgress * 100);
        const x = Math.sin(rad) * distance * (1 - eased);
        const y = verticalDrift;
        return {
          transform: `translate(${x}px, ${y}px) scale(${fragment.size * (1 - eased * 0.3)})`,
          opacity: 1 - eased * 0.5,
        };
      }
      case 'unified':
        return {
          transform: 'translate(0, 500px) scale(0)',
          opacity: 0,
        };
      default:
        return {};
    }
  };

  // Particle burst for fragmentation
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) + (Math.random() * 15 - 7.5),
      distance: 30 + Math.random() * 40,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 200,
    })),
  []);

  return (
    <div
      className={cn(
        'flame-system',
        `flame-system--${flameState}`,
        isActive && 'is-active',
        className
      )}
      style={cssVars as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Origin flame (single, breathing, above intro) */}
      <div
        className={cn(
          'flame-system__origin',
          flameState === 'origin' && 'is-visible'
        )}
      >
        <div className="flame-system__flame flame-system__flame--origin" />
      </div>

      {/* Particle burst (on fragmentation) */}
      <div
        className={cn(
          'flame-system__particles',
          flameState === 'fragmenting' && 'is-bursting'
        )}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="flame-system__particle"
            style={{
              '--particle-angle': `${particle.angle}deg`,
              '--particle-distance': `${particle.distance}px`,
              '--particle-size': `${particle.size}px`,
              '--particle-delay': `${particle.delay}ms`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Fragment flames (4 pieces with drift) */}
      <div className="flame-system__fragments">
        {fragments.map((fragment) => (
          <div
            key={fragment.id}
            className={cn(
              'flame-system__fragment',
              (flameState === 'drifting' || flameState === 'fragmenting' || flameState === 'converging') && 'is-visible'
            )}
            style={getFragmentStyle(fragment)}
          >
            <div className="flame-system__flame flame-system__flame--fragment" />
          </div>
        ))}
      </div>

      {/* Unified flame (converged, brilliant, above CTA) */}
      <div
        className={cn(
          'flame-system__unified',
          flameState === 'unified' && 'is-visible'
        )}
      >
        <div className="flame-system__flame flame-system__flame--unified" />
        <div className="flame-system__burst" />
      </div>
    </div>
  );
}
