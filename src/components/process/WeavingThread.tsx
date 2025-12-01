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

// Step marker positions along the path (0-1) — aligned with card positions
const STEP_MARKERS = [0.15, 0.38, 0.62, 0.85];

/**
 * WeavingThread — "The Score"
 * 
 * Fantasy.co-grade design: Thread weaves between alternating cards
 * like a musical score being composed. Single scroll-synced dot follows the path.
 * Diamond step markers at each movement position.
 */
export function WeavingThread({
  progress,
  isActive,
  className,
}: WeavingThreadProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(950);
  const [dotPosition, setDotPosition] = useState<DotPosition>({ x: 50, y: 0 });

  // Alternating weave path: left → right → left → right
  // x=15 (left cards) to x=85 (right cards)
  const weavingPath = useMemo(() => {
    return `
      M 50 0
      C 50 40, 15 60, 15 120
      C 15 180, 50 200, 50 240
      C 50 280, 85 300, 85 360
      C 85 420, 50 440, 50 480
      C 50 520, 15 540, 15 600
      C 15 660, 50 680, 50 720
      C 50 760, 85 780, 85 840
      C 85 900, 50 920, 50 960
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
      setDotPosition({ x: 50, y: normalized * 960 });
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
    if (!pathRef.current) {
      // Fallback positions matching the weave pattern
      return [
        { x: 15, y: 120 },   // Left
        { x: 85, y: 360 },   // Right
        { x: 15, y: 600 },   // Left
        { x: 85, y: 840 },   // Right
      ];
    }
    
    return STEP_MARKERS.map(t => {
      try {
        const point = pathRef.current!.getPointAtLength(pathLength * t);
        return { x: point.x, y: point.y };
      } catch {
        return { x: 50, y: t * 960 };
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
        viewBox="0 0 100 960"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Glow filter for dot */}
        <defs>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Background path (subtle guide) */}
        <path
          className="weaving-thread__path-bg"
          d={weavingPath}
          stroke="hsl(var(--vow-yellow) / 0.06)"
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
          }}
        />

        {/* Diamond step markers — like quarter rests */}
        {stepMarkerPositions.map((pos, index) => (
          <rect
            key={index}
            className="weaving-thread__step-marker"
            x={pos.x - 3}
            y={pos.y - 3}
            width="6"
            height="6"
            transform={`rotate(45 ${pos.x} ${pos.y})`}
            fill="hsl(var(--vow-yellow) / 0.25)"
          />
        ))}

        {/* Scroll-synced dot — the note head */}
        <circle
          className="weaving-thread__scroll-dot"
          cx={dotPosition.x}
          cy={dotPosition.y}
          r="4"
          fill="hsl(var(--vow-yellow))"
          filter="url(#dotGlow)"
        />
      </svg>
    </div>
  );
}

export default WeavingThread;
