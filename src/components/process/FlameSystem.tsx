import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface FlameSystemProps {
  progress: number;
  cssVars: Record<string, string>;
  isActive: boolean;
  className?: string;
}

/**
 * Narrative-driven flame states aligned with brand's Death→Life journey
 */
type FlameState = 'vigil' | 'awakening' | 'drifting' | 'converging' | 'covenant';

interface FragmentConfig {
  id: number;
  angle: number;
  maxDistance: number;
  size: number;
  delay: number;
  movementIndex: number;
  // Fragment personality traits
  personality: {
    name: 'listening' | 'crafting' | 'refining' | 'completing';
    colorTemp: 'warm' | 'neutral' | 'cool' | 'golden';
    breathCycle: number;
    swayAmplitude: number;
  };
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}

interface Ember {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

// Easing functions
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * FlameSystem — "From Spark to Symphony"
 * 
 * A world-class, Fantasy.co-grade flame visualization system.
 * Features: Multi-layer flames, fragment personalities, drift trails,
 * convergence threads, ember field, aurora bursts, heat shimmer.
 */
export function FlameSystem({
  progress,
  cssVars,
  isActive,
  className,
}: FlameSystemProps) {
  const lastTrailUpdate = useRef<number>(0);
  const [trails, setTrails] = useState<Map<number, TrailPoint[]>>(new Map());
  
  // Determine flame state based on scroll progress
  const flameState: FlameState = useMemo(() => {
    if (progress < 0.20) return 'vigil';
    if (progress < 0.28) return 'awakening';
    if (progress < 0.75) return 'drifting';
    if (progress < 0.88) return 'converging';
    return 'covenant';
  }, [progress]);

  // Calculate which fragment is active during drift
  const activeDriftFragment = useMemo(() => {
    if (flameState !== 'drifting') return -1;
    const driftProgress = (progress - 0.28) / 0.47;
    if (driftProgress < 0.255) return 0;
    if (driftProgress < 0.51) return 1;
    if (driftProgress < 0.765) return 2;
    return 3;
  }, [flameState, progress]);

  // Fragment configurations with personality system
  const fragments: FragmentConfig[] = useMemo(() => [
    { 
      id: 1, 
      angle: -50, 
      maxDistance: 140, 
      size: 0.65, 
      delay: 0, 
      movementIndex: 0,
      personality: {
        name: 'listening',
        colorTemp: 'warm',
        breathCycle: 3.2,
        swayAmplitude: 12,
      }
    },
    { 
      id: 2, 
      angle: -18, 
      maxDistance: 110, 
      size: 0.75, 
      delay: 80, 
      movementIndex: 1,
      personality: {
        name: 'crafting',
        colorTemp: 'golden',
        breathCycle: 2.8,
        swayAmplitude: 8,
      }
    },
    { 
      id: 3, 
      angle: 18, 
      maxDistance: 110, 
      size: 0.75, 
      delay: 160, 
      movementIndex: 2,
      personality: {
        name: 'refining',
        colorTemp: 'neutral',
        breathCycle: 3.0,
        swayAmplitude: 10,
      }
    },
    { 
      id: 4, 
      angle: 50, 
      maxDistance: 140, 
      size: 0.65, 
      delay: 240, 
      movementIndex: 3,
      personality: {
        name: 'completing',
        colorTemp: 'cool',
        breathCycle: 2.6,
        swayAmplitude: 14,
      }
    },
  ], []);

  // Calculate fragment positions
  const getFragmentPosition = useCallback((fragment: FragmentConfig, index: number): { x: number; y: number } => {
    const rad = (fragment.angle * Math.PI) / 180;
    
    switch (flameState) {
      case 'vigil':
        return { x: 0, y: 0 };
        
      case 'awakening': {
        const awakeningProgress = Math.min(1, (progress - 0.20) / 0.08);
        const burstEase = 1 - Math.pow(1 - awakeningProgress, 3);
        const distance = fragment.maxDistance * 0.35 * burstEase;
        return {
          x: Math.sin(rad) * distance,
          y: -Math.cos(rad) * distance * 0.4,
        };
      }
      
      case 'drifting': {
        const driftProgress = (progress - 0.28) / 0.47;
        const distance = fragment.maxDistance * (0.35 + driftProgress * 0.65);
        const verticalDrift = driftProgress * 450;
        const swayAmount = Math.sin(driftProgress * Math.PI * 2 + index) * fragment.personality.swayAmplitude;
        return {
          x: Math.sin(rad) * distance + swayAmount,
          y: verticalDrift - Math.cos(rad) * distance * 0.25,
        };
      }
      
      case 'converging': {
        const convergeProgress = (progress - 0.75) / 0.13;
        const eased = easeOutQuart(convergeProgress);
        const startDistance = fragment.maxDistance;
        const startVertical = 450;
        const spiralAngle = rad + (eased * Math.PI * 0.5 * (index % 2 === 0 ? 1 : -1));
        const currentDistance = startDistance * (1 - eased * 0.85);
        const targetY = 520;
        return {
          x: Math.sin(spiralAngle) * currentDistance * (1 - eased),
          y: startVertical + (targetY - startVertical) * eased,
        };
      }
      
      case 'covenant':
        return { x: 0, y: 520 };
        
      default:
        return { x: 0, y: 0 };
    }
  }, [flameState, progress]);

  // Get fragment style
  const getFragmentStyle = (fragment: FragmentConfig, index: number): React.CSSProperties => {
    const pos = getFragmentPosition(fragment, index);
    const isActiveFragment = index === activeDriftFragment;
    
    switch (flameState) {
      case 'vigil':
        return {
          transform: 'translate(0, 0) scale(0)',
          opacity: 0,
        };
        
      case 'awakening': {
        const awakeningProgress = Math.min(1, (progress - 0.20) / 0.08);
        const burstEase = 1 - Math.pow(1 - awakeningProgress, 3);
        return {
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${fragment.size * burstEase})`,
          opacity: burstEase,
          transitionDelay: `${fragment.delay}ms`,
        };
      }
      
      case 'drifting': {
        const activeScale = isActiveFragment ? fragment.size * 1.15 : fragment.size;
        const activeOpacity = isActiveFragment ? 1 : 0.7;
        return {
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${activeScale})`,
          opacity: activeOpacity,
        };
      }
      
      case 'converging': {
        const convergeProgress = (progress - 0.75) / 0.13;
        const eased = easeOutQuart(convergeProgress);
        return {
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${fragment.size * (1 - eased * 0.6)})`,
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

  // Update trails during drifting
  useEffect(() => {
    if (flameState !== 'drifting' || !isActive) {
      setTrails(new Map());
      return;
    }

    const now = Date.now();
    if (now - lastTrailUpdate.current < 100) return;
    lastTrailUpdate.current = now;

    setTrails(prev => {
      const newTrails = new Map(prev);
      fragments.forEach((fragment, index) => {
        const pos = getFragmentPosition(fragment, index);
        const existingTrail = newTrails.get(index) || [];
        const newPoint: TrailPoint = {
          x: pos.x,
          y: pos.y,
          opacity: index === activeDriftFragment ? 0.6 : 0.3,
          timestamp: now,
        };
        // Keep last 8 trail points
        const updatedTrail = [...existingTrail, newPoint].slice(-8);
        newTrails.set(index, updatedTrail);
      });
      return newTrails;
    });
  }, [flameState, progress, isActive, fragments, getFragmentPosition, activeDriftFragment]);

  // Particle burst configuration
  const particles = useMemo(() => 
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i * 15) + (Math.random() * 8 - 4),
      distance: 30 + Math.random() * 60,
      size: 2 + Math.random() * 5,
      delay: Math.random() * 200,
    })),
  []);

  // Ambient ember field
  const embers: Ember[] = useMemo(() => 
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: -120 + Math.random() * 240,
      size: 2 + Math.random() * 3,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 12,
    })),
  []);

  // Aurora burst rings for covenant
  const auroraRings = useMemo(() => [
    { id: 1, delay: 0, maxScale: 2.5 },
    { id: 2, delay: 150, maxScale: 3.2 },
    { id: 3, delay: 300, maxScale: 4 },
  ], []);

  // Convergence thread calculations
  const convergenceThreads = useMemo(() => {
    if (flameState !== 'converging') return [];
    
    const convergeProgress = (progress - 0.75) / 0.13;
    const eased = easeInOutSine(Math.min(1, convergeProgress));
    
    return fragments.map((fragment, index) => {
      const pos = getFragmentPosition(fragment, index);
      const nextIndex = (index + 1) % fragments.length;
      const nextPos = getFragmentPosition(fragments[nextIndex], nextIndex);
      
      return {
        id: fragment.id,
        startX: pos.x,
        startY: pos.y,
        endX: nextPos.x,
        endY: nextPos.y,
        opacity: eased * 0.6,
      };
    });
  }, [flameState, progress, fragments, getFragmentPosition]);

  const originFading = flameState === 'awakening';
  const originVisible = flameState === 'vigil' || originFading;
  const showEmbers = flameState === 'drifting' || flameState === 'converging';

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
      {/* Heat shimmer effect */}
      <div className={cn(
        'flame-system__shimmer',
        (flameState === 'vigil' || flameState === 'covenant') && 'is-visible'
      )} />

      {/* Ambient ember field */}
      <div className={cn(
        'flame-system__embers',
        showEmbers && 'is-visible'
      )}>
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="flame-system__ember"
            style={{
              '--ember-x': `${ember.x}px`,
              '--ember-size': `${ember.size}px`,
              '--ember-duration': `${ember.duration}s`,
              '--ember-delay': `${ember.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Origin flame (multi-layer) */}
      <div
        className={cn(
          'flame-system__origin',
          originVisible && 'is-visible',
          originFading && 'is-fading'
        )}
      >
        <div className="flame-system__flame-layers">
          <div className="flame-system__layer flame-system__layer--outer" />
          <div className="flame-system__layer flame-system__layer--middle" />
          <div className="flame-system__layer flame-system__layer--core" />
        </div>
        <div className="flame-system__ambient-glow" />
      </div>

      {/* Particle burst */}
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

      {/* Drift trails */}
      <div className="flame-system__trails">
        {Array.from(trails.entries()).map(([fragmentIndex, trailPoints]) => (
          <div key={fragmentIndex} className="flame-system__trail">
            {trailPoints.map((point, i) => (
              <div
                key={i}
                className="flame-system__trail-point"
                style={{
                  '--trail-x': `${point.x}px`,
                  '--trail-y': `${point.y}px`,
                  '--trail-opacity': point.opacity * ((i + 1) / trailPoints.length),
                  '--trail-scale': 0.3 + (i / trailPoints.length) * 0.7,
                } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Fragment flames with personality */}
      <div className="flame-system__fragments">
        {fragments.map((fragment, index) => (
          <div
            key={fragment.id}
            className={cn(
              'flame-system__fragment',
              (flameState === 'drifting' || flameState === 'awakening' || flameState === 'converging') && 'is-visible',
              index === activeDriftFragment && 'is-active'
            )}
            data-movement={fragment.personality.name}
            data-color-temp={fragment.personality.colorTemp}
            style={{
              ...getFragmentStyle(fragment, index),
              '--breath-cycle': `${fragment.personality.breathCycle}s`,
            } as React.CSSProperties}
          >
            <div className="flame-system__flame-layers flame-system__flame-layers--fragment">
              <div className="flame-system__layer flame-system__layer--outer" />
              <div className="flame-system__layer flame-system__layer--middle" />
              <div className="flame-system__layer flame-system__layer--core" />
            </div>
          </div>
        ))}
      </div>

      {/* Convergence golden threads */}
      {convergenceThreads.length > 0 && (
        <svg className="flame-system__convergence-threads" viewBox="-150 0 300 600">
          <defs>
            <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(45 100% 72%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(45 100% 72%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(45 100% 72%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {convergenceThreads.map((thread) => (
            <line
              key={thread.id}
              className="flame-system__thread"
              x1={thread.startX}
              y1={thread.startY}
              x2={thread.endX}
              y2={thread.endY}
              stroke="url(#threadGradient)"
              strokeWidth="1"
              style={{ opacity: thread.opacity }}
            />
          ))}
        </svg>
      )}

      {/* Unified flame (covenant) */}
      <div
        className={cn(
          'flame-system__unified',
          flameState === 'covenant' && 'is-visible'
        )}
      >
        {/* Aurora burst rings */}
        <div className="flame-system__aurora">
          {auroraRings.map((ring) => (
            <div
              key={ring.id}
              className="flame-system__aurora-ring"
              style={{
                '--aurora-delay': `${ring.delay}ms`,
                '--aurora-scale': ring.maxScale,
              } as React.CSSProperties}
            />
          ))}
        </div>
        
        {/* Multi-layer covenant flame */}
        <div className="flame-system__flame-layers flame-system__flame-layers--covenant">
          <div className="flame-system__layer flame-system__layer--outer" />
          <div className="flame-system__layer flame-system__layer--middle" />
          <div className="flame-system__layer flame-system__layer--core" />
        </div>
        
        <div className="flame-system__radiance" />
      </div>
    </div>
  );
}
