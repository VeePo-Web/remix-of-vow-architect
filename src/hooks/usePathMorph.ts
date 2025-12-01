import { useMemo, useCallback } from 'react';
import { interpolate } from 'flubber';

/**
 * Line states representing emotional progression
 */
export type LineState = 'silent' | 'pulse' | 'wave' | 'refined' | 'keys';

/**
 * Line state boundaries mapped to orchestrator progress
 */
export const LINE_STATE_BOUNDARIES = {
  silent: { start: 0, end: 0.15 },
  pulse: { start: 0.15, end: 0.30 },
  wave: { start: 0.30, end: 0.55 },
  refined: { start: 0.55, end: 0.75 },
  keys: { start: 0.75, end: 1.0 },
} as const;

/**
 * Get line state from progress
 */
export function getLineState(progress: number): LineState {
  for (const [state, bounds] of Object.entries(LINE_STATE_BOUNDARIES)) {
    if (progress >= bounds.start && progress < bounds.end) {
      return state as LineState;
    }
  }
  return 'keys';
}

/**
 * Get progress within current line state (0-1)
 */
export function getLineStateProgress(progress: number): number {
  const state = getLineState(progress);
  const bounds = LINE_STATE_BOUNDARIES[state];
  const range = bounds.end - bounds.start;
  return Math.max(0, Math.min(1, (progress - bounds.start) / range));
}

/**
 * Path generators for each state
 * All paths are normalized to 0-100 coordinate space
 */
const pathGenerators = {
  // Silent: Single horizontal line
  silent: (width: number, height: number): string => {
    const y = height / 2;
    return `M 0 ${y} L ${width} ${y}`;
  },

  // Pulse: Line with subtle center bulge (heartbeat)
  pulse: (width: number, height: number, stateProgress: number): string => {
    const y = height / 2;
    const amplitude = 4 + stateProgress * 8;
    const mid = width / 2;
    
    return `M 0 ${y} 
            Q ${mid * 0.3} ${y} ${mid * 0.4} ${y - amplitude * 0.3}
            Q ${mid * 0.5} ${y - amplitude} ${mid} ${y - amplitude}
            Q ${mid * 1.5} ${y - amplitude} ${mid * 1.6} ${y - amplitude * 0.3}
            Q ${mid * 1.7} ${y} ${width} ${y}`;
  },

  // Wave: Sinusoidal wave pattern
  wave: (width: number, height: number, stateProgress: number): string => {
    const y = height / 2;
    const amplitude = 8 + stateProgress * 12;
    const frequency = 3 + stateProgress * 2;
    const points: string[] = [`M 0 ${y}`];
    
    for (let i = 0; i <= 100; i += 2) {
      const x = (i / 100) * width;
      const wave = Math.sin((i / 100) * Math.PI * frequency) * amplitude;
      points.push(`L ${x} ${y + wave}`);
    }
    
    return points.join(' ');
  },

  // Refined: Smoother, more controlled wave pattern
  refined: (width: number, height: number, stateProgress: number): string => {
    const y = height / 2;
    const amplitude = 6 * (1 - stateProgress * 0.5);
    const points: string[] = [`M 0 ${y}`];
    
    // Gradually flattening wave
    for (let i = 0; i <= 100; i += 4) {
      const x = (i / 100) * width;
      const dampening = 1 - Math.pow(Math.abs(i - 50) / 50, 2) * stateProgress;
      const wave = Math.sin((i / 100) * Math.PI * 4) * amplitude * dampening;
      points.push(`L ${x} ${y + wave}`);
    }
    
    return points.join(' ');
  },

  // Keys: Piano key pattern emerges
  keys: (width: number, height: number, stateProgress: number): string => {
    const y = height / 2;
    const keyCount = 7;
    const keyWidth = width / keyCount;
    const keyHeight = 16 + stateProgress * 8;
    const points: string[] = [`M 0 ${y}`];
    
    for (let i = 0; i < keyCount; i++) {
      const xStart = i * keyWidth;
      const xMid = xStart + keyWidth / 2;
      const xEnd = (i + 1) * keyWidth;
      
      // Alternate between white and black key heights
      const isBlackKey = [1, 2, 4, 5, 6].includes(i % 7) && i < keyCount - 1;
      const thisKeyHeight = isBlackKey ? keyHeight * 0.6 : keyHeight;
      
      // Each key is a rectangle-like bump
      points.push(
        `L ${xStart + 2} ${y}`,
        `L ${xStart + 2} ${y - thisKeyHeight * stateProgress}`,
        `L ${xEnd - 2} ${y - thisKeyHeight * stateProgress}`,
        `L ${xEnd - 2} ${y}`
      );
    }
    
    points.push(`L ${width} ${y}`);
    return points.join(' ');
  },
};

interface UsePathMorphOptions {
  width: number;
  height: number;
  progress: number;
}

interface PathMorphResult {
  currentPath: string;
  lineState: LineState;
  lineStateProgress: number;
  nextState: LineState | null;
  interpolatedPath: string;
}

/**
 * usePathMorph — Manages SVG path morphing between line states
 * 
 * Uses flubber for smooth path interpolation between states.
 * Returns current path, state info, and interpolated path for rendering.
 */
export function usePathMorph({ width, height, progress }: UsePathMorphOptions): PathMorphResult {
  const lineState = useMemo(() => getLineState(progress), [progress]);
  const lineStateProgress = useMemo(() => getLineStateProgress(progress), [progress]);
  
  // Determine next state for interpolation
  const nextState = useMemo((): LineState | null => {
    const states: LineState[] = ['silent', 'pulse', 'wave', 'refined', 'keys'];
    const currentIndex = states.indexOf(lineState);
    return currentIndex < states.length - 1 ? states[currentIndex + 1] : null;
  }, [lineState]);

  // Generate paths for current and next state
  const currentPath = useMemo(() => {
    const generator = pathGenerators[lineState];
    return generator(width, height, lineStateProgress);
  }, [width, height, lineState, lineStateProgress]);

  const nextPath = useMemo(() => {
    if (!nextState) return null;
    const generator = pathGenerators[nextState];
    return generator(width, height, 0);
  }, [width, height, nextState]);

  // Interpolate between current and next state based on state progress
  const interpolatedPath = useMemo(() => {
    if (!nextPath || lineStateProgress < 0.7) {
      return currentPath;
    }
    
    try {
      // Start interpolating in the last 30% of each state
      const interpolateProgress = (lineStateProgress - 0.7) / 0.3;
      const interpolator = interpolate(currentPath, nextPath, { maxSegmentLength: 5 });
      return interpolator(Math.min(1, interpolateProgress * 0.5)); // Gradual transition
    } catch {
      return currentPath;
    }
  }, [currentPath, nextPath, lineStateProgress]);

  return {
    currentPath,
    lineState,
    lineStateProgress,
    nextState,
    interpolatedPath,
  };
}

export default usePathMorph;
