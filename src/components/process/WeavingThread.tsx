import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface WeavingThreadProps {
  progress: number;
  isActive: boolean;
  className?: string;
}

interface DotPosition {
  x: number;
  y: number;
}

// Step marker positions along the path (0-1)
const STEP_MARKERS = [0.2, 0.4, 0.6, 0.8];

/**
 * WeavingThread — "The Golden Thread"
 * 
 * Fantasy.co-grade simplicity: One curved path, one scroll-synced dot.
 * Nothing competes. Nothing overwhelms. Just the journey.
 */
export function WeavingThread({
  progress,
  isActive,
  className,
}: WeavingThreadProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(950);
  const [dotPosition, setDotPosition] = useState<DotPosition>({ x: 50, y: 0 });

  // Curved path that weaves through content
  const weavingPath = useMemo(() => {
    return `
      M 50 0
      C 50 80, 30 120, 50 180
      C 70 240, 30 300, 50 360
      C 70 420, 30 480, 50 540
      C 70 600, 30 660, 50 720
      C 70 780, 50 840, 50 900
    `;
  }, []);

  // Get path length on mount
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Calculate dot position using getPointAtLength
  const updateDotPosition = useCallback(() => {
    if (!pathRef.current) return;
    
    // Map progress 0.1-0.85 to path 0-100%
    const normalized = Math.max(0, Math.min(1, (progress - 0.1) / 0.75));
    const targetLength = pathLength * normalized;
    
    try {
      const point = pathRef.current.getPointAtLength(targetLength);
      setDotPosition({ x: point.x, y: point.y });
    } catch {
      // Fallback if getPointAtLength fails
      setDotPosition({ x: 50, y: normalized * 900 });
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

  // Calculate step marker positions
  const stepMarkerPositions = useMemo(() => {
    if (!pathRef.current) return STEP_MARKERS.map((_, i) => ({ x: 50, y: 180 + i * 180 }));
    
    return STEP_MARKERS.map(t => {
      try {
        const point = pathRef.current!.getPointAtLength(pathLength * t);
        return { x: point.x, y: point.y };
      } catch {
        return { x: 50, y: t * 900 };
      }
    });
  }, [pathLength]);

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
        viewBox="0 0 100 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Glow filter for dot */}
        <defs>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Background path (subtle guide) */}
        <path
          className="weaving-thread__path-bg"
          d={weavingPath}
          stroke="hsl(var(--vow-yellow) / 0.08)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Main animated path */}
        <path
          ref={pathRef}
          className="weaving-thread__path"
          d={weavingPath}
          stroke="url(#threadGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: drawProgress,
          }}
        />

        {/* Static step markers */}
        {stepMarkerPositions.map((pos, index) => (
          <circle
            key={index}
            className="weaving-thread__step-marker"
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill="hsl(var(--vow-yellow) / 0.25)"
          />
        ))}

        {/* Scroll-synced dot */}
        <circle
          className="weaving-thread__scroll-dot"
          cx={dotPosition.x}
          cy={dotPosition.y}
          r="5"
          fill="hsl(var(--vow-yellow))"
          filter="url(#dotGlow)"
        />
      </svg>
    </div>
  );
}

export default WeavingThread;
