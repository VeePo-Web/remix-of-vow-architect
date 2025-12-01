import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface WeavingThreadProps {
  progress: number;
  isActive: boolean;
  highlightedMovement?: number;
  className?: string;
}

interface DotPosition {
  x: number;
  y: number;
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}

// Step marker positions along the path (0-1) — aligned with card centers
// These are the progress values where dot reaches each apex
const STEP_PROGRESS = [0.18, 0.40, 0.62, 0.84];

/**
 * WeavingThread — "The Conductor's Score"
 * 
 * Fantasy.co-grade design: Thread weaves between alternating cards
 * at x=21 (left card center) and x=79 (right card center).
 * Single scroll-synced dot follows the path with eased movement.
 * Diamond step markers glow when dot arrives.
 * Subtle ink trail follows the dot.
 */
export function WeavingThread({
  progress,
  isActive,
  highlightedMovement = -1,
  className,
}: WeavingThreadProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1200);
  const [dotPosition, setDotPosition] = useState<DotPosition>({ x: 50, y: 0 });
  const [stepMarkerPositions, setStepMarkerPositions] = useState<DotPosition[]>([]);
  const [activeMarker, setActiveMarker] = useState(-1);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const lastTrailUpdateRef = useRef(0);

  // Alternating weave path: center → left (x=21) → right (x=79) → left → right
  // Path coordinates aligned with card centers in the grid
  const weavingPath = useMemo(() => {
    return `
      M 50 0
      C 50 50, 21 80, 21 140
      C 21 200, 50 230, 50 280
      C 50 330, 79 360, 79 420
      C 79 480, 50 510, 50 560
      C 50 610, 21 640, 21 700
      C 21 760, 50 790, 50 840
      C 50 890, 79 920, 79 980
      C 79 1040, 50 1070, 50 1120
    `;
  }, []);

  // Get path length and step marker positions on mount
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);

      // Calculate actual step marker positions using getPointAtLength
      const markers = STEP_PROGRESS.map(t => {
        try {
          const point = pathRef.current!.getPointAtLength(length * t);
          return { x: point.x, y: point.y };
        } catch {
          return { x: 50, y: t * 1120 };
        }
      });
      setStepMarkerPositions(markers);
    }
  }, []);

  // Calculate dot position using getPointAtLength with eased movement
  const updateDotPosition = useCallback(() => {
    if (!pathRef.current) return;
    
    // Map progress 0.1-0.85 to path 0-100%
    const normalized = Math.max(0, Math.min(1, (progress - 0.1) / 0.75));
    const targetLength = pathLength * normalized;
    
    try {
      const point = pathRef.current.getPointAtLength(targetLength);
      setDotPosition({ x: point.x, y: point.y });

      // Update ink trail (throttled to ~30fps)
      const now = performance.now();
      if (now - lastTrailUpdateRef.current > 33 && normalized > 0.01) {
        lastTrailUpdateRef.current = now;
        setTrail(prev => {
          const newTrail = [
            { x: point.x, y: point.y, opacity: 0.6, timestamp: now },
            ...prev.slice(0, 4), // Keep last 5 points
          ].map((p, i) => ({
            ...p,
            opacity: 0.6 * Math.pow(0.5, i), // Exponential fade
          }));
          return newTrail;
        });
      }

      // Check if dot is near any step marker (within threshold)
      const ARRIVAL_THRESHOLD = 0.03; // 3% of path
      let newActiveMarker = -1;
      STEP_PROGRESS.forEach((stepProgress, index) => {
        const stepNormalized = (stepProgress - 0.1) / 0.75;
        if (Math.abs(normalized - stepNormalized) < ARRIVAL_THRESHOLD) {
          newActiveMarker = index;
        }
      });
      setActiveMarker(newActiveMarker);
    } catch {
      // Fallback if getPointAtLength fails
      setDotPosition({ x: 50, y: normalized * 1120 });
    }
  }, [progress, pathLength]);

  // Update dot position on progress change
  useEffect(() => {
    updateDotPosition();
  }, [updateDotPosition]);

  // Calculate stroke dashoffset based on scroll progress
  const drawProgress = useMemo(() => {
    const normalized = Math.max(0, Math.min(1, (progress - 0.1) / 0.75));
    return pathLength * (1 - normalized);
  }, [progress, pathLength]);

  // Fade out old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      setTrail(prev => prev.filter(p => now - p.timestamp < 800));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        'weaving-thread',
        isActive && 'is-active',
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="weaving-thread__svg"
        viewBox="0 0 100 1120"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        {/* Glow filter for dot */}
        <defs>
          <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="markerGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background path (subtle guide) */}
        <path
          className="weaving-thread__path-bg"
          d={weavingPath}
          stroke="hsl(var(--vow-yellow) / 0.04)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Main animated path */}
        <path
          ref={pathRef}
          className="weaving-thread__path"
          d={weavingPath}
          stroke="url(#threadGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: drawProgress,
            transition: 'stroke-dashoffset 120ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />

        {/* Diamond step markers — glow when dot arrives */}
        {stepMarkerPositions.map((pos, index) => (
          <g key={index} className="weaving-thread__marker-group">
            {/* Outer glow ring (only visible when active) */}
            <rect
              className={cn(
                'weaving-thread__step-marker-glow',
                activeMarker === index && 'is-active'
              )}
              x={pos.x - 6}
              y={pos.y - 6}
              width="12"
              height="12"
              transform={`rotate(45 ${pos.x} ${pos.y})`}
              fill="hsl(var(--vow-yellow) / 0.3)"
              filter="url(#markerGlow)"
              style={{
                opacity: activeMarker === index ? 0.8 : 0,
                transform: `rotate(45deg) scale(${activeMarker === index ? 1.5 : 1})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
                transition: 'opacity 300ms ease-out, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
            {/* Core diamond */}
            <rect
              className={cn(
                'weaving-thread__step-marker',
                activeMarker === index && 'is-active',
                highlightedMovement === index && 'is-highlighted'
              )}
              x={pos.x - 3.5}
              y={pos.y - 3.5}
              width="7"
              height="7"
              transform={`rotate(45 ${pos.x} ${pos.y})`}
              fill={activeMarker === index ? 'hsl(var(--vow-yellow))' : 'hsl(var(--vow-yellow) / 0.25)'}
              style={{
                transition: 'fill 200ms ease-out, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: `rotate(45deg) scale(${activeMarker === index ? 1.2 : 1})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
              }}
            />
          </g>
        ))}

        {/* Ink trail — fading circles behind dot */}
        {trail.map((point, index) => (
          <circle
            key={`trail-${index}-${point.timestamp}`}
            className="weaving-thread__trail-point"
            cx={point.x}
            cy={point.y}
            r={3 - index * 0.4}
            fill="hsl(var(--vow-yellow))"
            style={{
              opacity: point.opacity,
              transition: 'opacity 150ms ease-out',
            }}
          />
        ))}

        {/* Scroll-synced dot — the note head */}
        <circle
          className="weaving-thread__scroll-dot"
          cx={dotPosition.x}
          cy={dotPosition.y}
          r="5"
          fill="hsl(var(--vow-yellow))"
          filter="url(#dotGlow)"
          style={{
            transition: 'cx 120ms cubic-bezier(0.25, 0.1, 0.25, 1), cy 120ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />
      </svg>
    </div>
  );
}

export default WeavingThread;
