import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ChordRadianceProps {
  /** Whether the full chord is active */
  isActive: boolean;
  /** Container width for positioning */
  width: number;
  /** Container height for positioning */
  height: number;
  /** Intensity multiplier */
  intensity?: number;
  className?: string;
}

/**
 * ChordRadiance — Movement IV Full-Chord Golden Bloom
 * 
 * When all 7 keys are pressed simultaneously (Movement IV),
 * this component renders a radiant golden bloom emanating
 * from the key bed. Represents the culmination of the
 * couple's story being played as a complete chord.
 * 
 * The effect:
 * 1. Initial flash at chord strike
 * 2. Expanding radial gradient
 * 3. Warm golden particles rising
 * 4. Gradual fade with sustained glow
 */
export const ChordRadiance = memo(function ChordRadiance({
  isActive,
  width,
  height,
  intensity = 1,
  className,
}: ChordRadianceProps) {
  const [phase, setPhase] = useState<'inactive' | 'flash' | 'bloom' | 'sustain' | 'fade'>('inactive');
  const [particles, setParticles] = useState<Array<{ id: string; x: number; delay: number }>>([]);

  // Phase transitions
  useEffect(() => {
    if (isActive && phase === 'inactive') {
      // Start the sequence
      setPhase('flash');
      
      // Generate particles
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: `particle-${Date.now()}-${i}`,
        x: 10 + (i / 12) * 80, // Distributed across 10-90%
        delay: Math.random() * 200,
      }));
      setParticles(newParticles);

      // Phase transitions
      const flashTimer = setTimeout(() => setPhase('bloom'), 80);
      const bloomTimer = setTimeout(() => setPhase('sustain'), 400);
      const fadeTimer = setTimeout(() => setPhase('fade'), 800);
      const endTimer = setTimeout(() => {
        setPhase('inactive');
        setParticles([]);
      }, 1200);

      return () => {
        clearTimeout(flashTimer);
        clearTimeout(bloomTimer);
        clearTimeout(fadeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isActive, phase]);

  // Reset when deactivated
  useEffect(() => {
    if (!isActive && phase !== 'inactive') {
      setPhase('fade');
      const endTimer = setTimeout(() => {
        setPhase('inactive');
        setParticles([]);
      }, 300);
      return () => clearTimeout(endTimer);
    }
  }, [isActive, phase]);

  if (phase === 'inactive') return null;

  const centerY = height / 2;

  return (
    <g
      className={cn(
        'chord-radiance',
        `chord-radiance--${phase}`,
        className
      )}
      style={{
        '--radiance-intensity': intensity,
      } as React.CSSProperties}
    >
      <defs>
        {/* Central bloom gradient */}
        <radialGradient id="chord-bloom-gradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(45 100% 90%)" stopOpacity={phase === 'flash' ? 0.9 : 0.6} />
          <stop offset="30%" stopColor="hsl(45 100% 76%)" stopOpacity={0.4} />
          <stop offset="60%" stopColor="hsl(45 90% 65%)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="hsl(45 80% 60%)" stopOpacity={0} />
        </radialGradient>

        {/* Horizontal glow gradient */}
        <linearGradient id="chord-horizontal-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(45 100% 76%)" stopOpacity={0} />
          <stop offset="20%" stopColor="hsl(45 100% 76%)" stopOpacity={0.3} />
          <stop offset="50%" stopColor="hsl(45 100% 85%)" stopOpacity={0.6} />
          <stop offset="80%" stopColor="hsl(45 100% 76%)" stopOpacity={0.3} />
          <stop offset="100%" stopColor="hsl(45 100% 76%)" stopOpacity={0} />
        </linearGradient>

        {/* Blur filter for soft edges */}
        <filter id="chord-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={phase === 'flash' ? 3 : 8} />
        </filter>

        {/* Particle glow filter */}
        <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Initial flash layer */}
      {phase === 'flash' && (
        <rect
          x={0}
          y={centerY - 30}
          width={width}
          height={60}
          fill="hsl(45 100% 95%)"
          filter="url(#chord-blur)"
          className="chord-radiance__flash"
          style={{
            opacity: 0.8 * intensity,
            animation: 'chord-flash 100ms ease-out forwards',
          }}
        />
      )}

      {/* Central bloom ellipse */}
      <ellipse
        cx={width / 2}
        cy={centerY}
        rx={phase === 'flash' ? width * 0.3 : phase === 'bloom' ? width * 0.5 : width * 0.4}
        ry={phase === 'flash' ? 20 : phase === 'bloom' ? 40 : 30}
        fill="url(#chord-bloom-gradient)"
        filter="url(#chord-blur)"
        className="chord-radiance__bloom"
        style={{
          opacity: phase === 'fade' ? 0.2 : phase === 'sustain' ? 0.5 : 0.7,
          transition: 'all 200ms ease-out',
          transform: `scale(${intensity})`,
          transformOrigin: 'center',
        }}
      />

      {/* Horizontal glow band */}
      <rect
        x={0}
        y={centerY - 15}
        width={width}
        height={30}
        fill="url(#chord-horizontal-glow)"
        filter="url(#chord-blur)"
        className="chord-radiance__band"
        style={{
          opacity: phase === 'fade' ? 0.1 : 0.4 * intensity,
          transition: 'opacity 300ms ease-out',
        }}
      />

      {/* Rising particles */}
      {particles.map(particle => (
        <circle
          key={particle.id}
          cx={(particle.x / 100) * width}
          cy={centerY}
          r={2 + Math.random() * 2}
          fill="hsl(45 100% 85%)"
          filter="url(#particle-glow)"
          className="chord-radiance__particle"
          style={{
            opacity: phase === 'fade' ? 0 : 0.7,
            animation: `chord-particle-rise 800ms ease-out ${particle.delay}ms forwards`,
            transformOrigin: 'center',
          }}
        />
      ))}

      {/* Edge accent lines */}
      <line
        x1={width * 0.1}
        y1={centerY}
        x2={width * 0.9}
        y2={centerY}
        stroke="hsl(45 100% 80%)"
        strokeWidth={1}
        strokeLinecap="round"
        className="chord-radiance__accent-line"
        style={{
          opacity: phase === 'fade' ? 0 : 0.3 * intensity,
          strokeDasharray: width * 0.8,
          strokeDashoffset: phase === 'flash' ? width * 0.8 : 0,
          transition: 'stroke-dashoffset 400ms ease-out, opacity 300ms ease-out',
        }}
      />
    </g>
  );
});

export default ChordRadiance;
