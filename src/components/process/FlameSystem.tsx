import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface FlameSystemProps {
  progress: number;
  cssVars: Record<string, string>;
  isActive: boolean;
  className?: string;
}

/**
 * Narrative-driven flame states aligned with brand's Death→Life journey
 * - vigil: Sacred pause, held breath (honoring the moment before)
 * - awakening: First engagement, spark of inspiration
 * - drifting: Exploration through four movements
 * - converging: Crystallization, coming together
 * - covenant: Resolution, unified promise sealed
 */
type FlameState = 'vigil' | 'awakening' | 'drifting' | 'converging' | 'covenant';

interface FragmentConfig {
  id: number;
  angle: number;
  maxDistance: number;
  size: number;
  delay: number;
  movementIndex: number; // Which movement this fragment represents
}

// Easing function for spiral convergence
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

/**
 * FlameSystem — "From Spark to Symphony"
 * 
 * A single flame (vigil) fragments into 4 pieces (awakening/drifting),
 * then reconverges into a unified brilliant flame (covenant) above the closing CTA.
 * 
 * State machine aligned with brand narrative:
 * vigil (0-20%) → awakening (20-28%) → drifting (28-75%) → converging (75-88%) → covenant (88-100%)
 */
export function FlameSystem({
  progress,
  cssVars,
  isActive,
  className,
}: FlameSystemProps) {
  // Determine flame state based on scroll progress (narrative-driven thresholds)
  const flameState: FlameState = useMemo(() => {
    if (progress < 0.20) return 'vigil';      // Sacred pause through intro
    if (progress < 0.28) return 'awakening';  // Synced with Movement I entry
    if (progress < 0.75) return 'drifting';   // Four movements exploration
    if (progress < 0.88) return 'converging'; // Spiral toward unity
    return 'covenant';                         // Unified flame above CTA
  }, [progress]);

  // Calculate which fragment is active during drift (per-movement intensity)
  const activeDriftFragment = useMemo(() => {
    if (flameState !== 'drifting') return -1;
    const driftProgress = (progress - 0.28) / 0.47; // 0.28 to 0.75
    if (driftProgress < 0.255) return 0;      // Movement I: 28-40%
    if (driftProgress < 0.51) return 1;       // Movement II: 40-52%
    if (driftProgress < 0.765) return 2;      // Movement III: 52-64%
    return 3;                                  // Movement IV: 64-75%
  }, [flameState, progress]);

  // Fragment configurations (each represents a movement in the process)
  const fragments: FragmentConfig[] = useMemo(() => [
    { id: 1, angle: -50, maxDistance: 140, size: 0.65, delay: 0, movementIndex: 0 },
    { id: 2, angle: -18, maxDistance: 110, size: 0.75, delay: 80, movementIndex: 1 },
    { id: 3, angle: 18, maxDistance: 110, size: 0.75, delay: 160, movementIndex: 2 },
    { id: 4, angle: 50, maxDistance: 140, size: 0.65, delay: 240, movementIndex: 3 },
  ], []);

  // Calculate fragment positions based on state with enhanced choreography
  const getFragmentStyle = (fragment: FragmentConfig, index: number): React.CSSProperties => {
    const rad = (fragment.angle * Math.PI) / 180;
    const isActiveFragment = index === activeDriftFragment;
    
    switch (flameState) {
      case 'vigil':
        return {
          transform: 'translate(0, 0) scale(0)',
          opacity: 0,
        };
        
      case 'awakening': {
        // Burst outward from origin
        const awakeningProgress = Math.min(1, (progress - 0.20) / 0.08);
        const burstEase = 1 - Math.pow(1 - awakeningProgress, 3);
        const distance = fragment.maxDistance * 0.35 * burstEase;
        const x = Math.sin(rad) * distance;
        const y = -Math.cos(rad) * distance * 0.4;
        return {
          transform: `translate(${x}px, ${y}px) scale(${fragment.size * burstEase})`,
          opacity: burstEase,
          transitionDelay: `${fragment.delay}ms`,
        };
      }
      
      case 'drifting': {
        // Per-movement drift with active fragment intensity
        const driftProgress = (progress - 0.28) / 0.47;
        const distance = fragment.maxDistance * (0.35 + driftProgress * 0.65);
        const verticalDrift = driftProgress * 450;
        
        // Horizontal sway for organic movement
        const swayAmount = Math.sin(driftProgress * Math.PI * 2 + index) * 15;
        const x = Math.sin(rad) * distance + swayAmount;
        const y = verticalDrift - Math.cos(rad) * distance * 0.25;
        
        // Active fragment gets enhanced glow
        const activeScale = isActiveFragment ? fragment.size * 1.15 : fragment.size;
        const activeOpacity = isActiveFragment ? 1 : 0.7;
        
        return {
          transform: `translate(${x}px, ${y}px) scale(${activeScale})`,
          opacity: activeOpacity,
        };
      }
      
      case 'converging': {
        // Spiral convergence with easeOutQuart deceleration
        const convergeProgress = (progress - 0.75) / 0.13;
        const eased = easeOutQuart(convergeProgress);
        
        // Start from drift end position
        const startDistance = fragment.maxDistance;
        const startVertical = 450;
        
        // Spiral inward with rotation
        const spiralAngle = rad + (eased * Math.PI * 0.5 * (index % 2 === 0 ? 1 : -1));
        const currentDistance = startDistance * (1 - eased * 0.85);
        
        // Converge toward center-bottom (where unified flame will appear)
        const targetY = 520;
        const x = Math.sin(spiralAngle) * currentDistance * (1 - eased);
        const y = startVertical + (targetY - startVertical) * eased;
        
        return {
          transform: `translate(${x}px, ${y}px) scale(${fragment.size * (1 - eased * 0.6)})`,
          opacity: 1 - eased * 0.8,
        };
      }
      
      case 'covenant':
        return {
          transform: 'translate(0, 520px) scale(0)',
          opacity: 0,
        };
        
      default:
        return {};
    }
  };

  // Particle burst for awakening transition
  const particles = useMemo(() => 
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i * 22.5) + (Math.random() * 10 - 5),
      distance: 25 + Math.random() * 50,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 150,
    })),
  []);

  // Origin flame visibility and fading
  const originFading = flameState === 'awakening';
  const originVisible = flameState === 'vigil' || originFading;

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
      {/* Origin flame (single, breathing, vigil state) */}
      <div
        className={cn(
          'flame-system__origin',
          originVisible && 'is-visible',
          originFading && 'is-fading'
        )}
      >
        <div className="flame-system__flame flame-system__flame--vigil" />
      </div>

      {/* Particle burst (on awakening) */}
      <div
        className={cn(
          'flame-system__particles',
          flameState === 'awakening' && 'is-bursting'
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

      {/* Fragment flames (4 pieces representing each movement) */}
      <div className="flame-system__fragments">
        {fragments.map((fragment, index) => (
          <div
            key={fragment.id}
            className={cn(
              'flame-system__fragment',
              (flameState === 'drifting' || flameState === 'awakening' || flameState === 'converging') && 'is-visible',
              index === activeDriftFragment && 'is-active'
            )}
            style={getFragmentStyle(fragment, index)}
          >
            <div className="flame-system__flame flame-system__flame--fragment" />
          </div>
        ))}
      </div>

      {/* Unified flame (covenant state - brilliant, above CTA) */}
      <div
        className={cn(
          'flame-system__unified',
          flameState === 'covenant' && 'is-visible'
        )}
      >
        <div className="flame-system__flame flame-system__flame--covenant" />
        <div className="flame-system__radiance" />
        <div className="flame-system__burst" />
      </div>
    </div>
  );
}
