import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface WeavingThreadProps {
  activeStep: number;
  progress: number;
  cssVars: Record<string, string>;
  isActive: boolean;
  className?: string;
}

interface AnchorNode {
  x: number;
  y: number;
  delay: number;
}

/**
 * WeavingThread — "The Path That Breathes"
 * 
 * A curved SVG path that weaves through the Process section,
 * drawing itself with scroll and pulsing at anchor nodes.
 */
export function WeavingThread({
  activeStep,
  progress,
  cssVars,
  isActive,
  className,
}: WeavingThreadProps) {
  // Curved path that weaves around content (desktop layout)
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

  // Anchor nodes positioned along the path
  const anchorNodes: AnchorNode[] = useMemo(() => [
    { x: 50, y: 180, delay: 0 },
    { x: 50, y: 360, delay: 200 },
    { x: 50, y: 540, delay: 400 },
    { x: 50, y: 720, delay: 600 },
  ], []);

  // Calculate stroke dashoffset based on scroll progress
  const pathLength = 950;
  const drawProgress = useMemo(() => {
    // Map progress 0.1-0.8 to draw 0-100%
    const normalized = Math.max(0, Math.min(1, (progress - 0.1) / 0.7));
    return pathLength * (1 - normalized);
  }, [progress]);

  return (
    <div
      className={cn(
        'weaving-thread',
        isActive && 'is-active',
        className
      )}
      style={cssVars as React.CSSProperties}
      aria-hidden="true"
    >
      <svg
        className="weaving-thread__svg"
        viewBox="0 0 100 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Glow filters */}
        <defs>
          <filter id="threadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="anchorGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.3" />
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
          className="weaving-thread__path"
          d={weavingPath}
          stroke="url(#threadGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#threadGlow)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: drawProgress,
          }}
        />

        {/* Origin point */}
        <circle
          className="weaving-thread__origin"
          cx="50"
          cy="0"
          r="3"
          fill="hsl(var(--vow-yellow))"
          filter="url(#anchorGlow)"
        />

        {/* Anchor nodes */}
        {anchorNodes.map((node, index) => (
          <g key={index} className="weaving-thread__anchor-group">
            {/* Pulse ring */}
            <circle
              className={cn(
                'weaving-thread__anchor-ring',
                activeStep > index && 'is-active'
              )}
              cx={node.x}
              cy={node.y}
              r="8"
              fill="none"
              stroke="hsl(var(--vow-yellow))"
              strokeWidth="0.5"
              style={{ animationDelay: `${node.delay}ms` }}
            />
            {/* Core dot */}
            <circle
              className={cn(
                'weaving-thread__anchor',
                activeStep > index && 'is-ignited'
              )}
              cx={node.x}
              cy={node.y}
              r="4"
              fill="hsl(var(--vow-yellow))"
              filter="url(#anchorGlow)"
              style={{ animationDelay: `${node.delay}ms` }}
            />
          </g>
        ))}

        {/* Terminus point */}
        <circle
          className={cn(
            'weaving-thread__terminus',
            activeStep >= 4 && 'is-complete'
          )}
          cx="50"
          cy="900"
          r="5"
          fill="hsl(var(--vow-yellow))"
          filter="url(#anchorGlow)"
        />
      </svg>
    </div>
  );
}
