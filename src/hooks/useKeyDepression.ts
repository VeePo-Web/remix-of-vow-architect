import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * Key depression phase following real piano mechanics
 */
export type KeyPhase = 'rest' | 'press' | 'impact' | 'sustain' | 'release';

/**
 * Individual key state with full physics properties
 */
export interface KeyState {
  /** Key index (0-6) */
  index: number;
  /** Current displacement from rest (0-1, where 1 is fully pressed) */
  displacement: number;
  /** Current velocity (units per frame) */
  velocity: number;
  /** Current phase of the key */
  phase: KeyPhase;
  /** Shadow depth (increases with displacement) */
  shadowDepth: number;
  /** Glow intensity (peaks at impact) */
  glowIntensity: number;
  /** 3D rotation towards viewer (subtle tilt) */
  rotation: number;
  /** Whether this is a "black key" position */
  isBlackKey: boolean;
  /** Timestamp when press started */
  pressTimestamp: number;
}

/**
 * Movement to key mapping - which keys press for each movement
 */
const MOVEMENT_KEY_MAP: Record<number, number[]> = {
  0: [0, 1],       // Movement I: Keys 1-2 (C, D)
  1: [2, 3],       // Movement II: Keys 3-4 (E, F)
  2: [4, 5],       // Movement III: Keys 5-6 (G, A)
  3: [0, 1, 2, 3, 4, 5, 6], // Movement IV: All keys (full chord)
};

/**
 * Chord stagger timing - delay between keys in a chord
 */
const CHORD_STAGGER = {
  base: 25, // ms between each key
  maxSpread: 80, // maximum total spread for chord
};

/**
 * Spring physics constants (damped harmonic oscillator)
 */
const SPRING = {
  // Press phase (aggressive, quick attack)
  press: {
    k: 450,  // Spring constant (stiffness)
    c: 28,   // Damping coefficient
    m: 1,    // Mass
  },
  // Impact phase (brief bottom impact)
  impact: {
    k: 600,
    c: 45,
    m: 1,
  },
  // Settle phase (gentle settling)
  settle: {
    k: 200,
    c: 35,
    m: 1,
  },
  // Release phase (key returning)
  release: {
    k: 180,
    c: 22,
    m: 1,
  },
};

/**
 * Depression depth based on velocity (velocity-sensitive)
 */
const DEPRESSION_DEPTH = {
  min: 0.6,  // Minimum depression (pianissimo)
  max: 1.0,  // Maximum depression (fortissimo)
  default: 0.85,
};

/**
 * Phase timing (milliseconds)
 */
const PHASE_TIMING = {
  press: 80,     // Time to reach bottom
  impact: 40,    // Bottom impact duration
  sustain: 400,  // Hold at bottom
  release: 280,  // Time to return to rest
};

/**
 * Black key positions (in 7-key layout)
 */
const BLACK_KEY_POSITIONS = [1, 2, 4, 5];

interface UseKeyDepressionOptions {
  /** Currently highlighted movement (0-3) */
  highlightedMovement?: number;
  /** Scroll velocity for velocity-sensitive depression */
  scrollVelocity?: number;
  /** Whether the system is active */
  isActive: boolean;
  /** Line state - only animate in 'keys' state */
  lineState: string;
}

interface UseKeyDepressionResult {
  /** Array of all 7 key states */
  keyStates: KeyState[];
  /** Whether any keys are currently active */
  hasActiveKeys: boolean;
  /** Whether this is a full chord (Movement IV) */
  isFullChord: boolean;
  /** Manually trigger a key press */
  pressKey: (keyIndex: number, velocity?: number) => void;
  /** Manually release a key */
  releaseKey: (keyIndex: number) => void;
}

/**
 * Calculate spring force using damped harmonic oscillator
 */
function calculateSpringForce(
  displacement: number,
  velocity: number,
  target: number,
  config: typeof SPRING.press
): number {
  const { k, c, m } = config;
  const x = displacement - target;
  // F = -kx - cv (Hooke's law with damping)
  const force = (-k * x - c * velocity) / m;
  return force;
}

/**
 * Create initial key state
 */
function createInitialKeyState(index: number): KeyState {
  return {
    index,
    displacement: 0,
    velocity: 0,
    phase: 'rest',
    shadowDepth: 0,
    glowIntensity: 0,
    rotation: 0,
    isBlackKey: BLACK_KEY_POSITIONS.includes(index),
    pressTimestamp: 0,
  };
}

/**
 * useKeyDepression — Piano Key Spring Physics System
 * 
 * Implements a damped harmonic oscillator for realistic piano key
 * depression. Each key has independent physics with:
 * - Velocity-sensitive depression depth
 * - Spring-based return motion
 * - Impact bounce at bottom
 * - Chord stagger for musical feel
 */
export function useKeyDepression({
  highlightedMovement,
  scrollVelocity = 0,
  isActive,
  lineState,
}: UseKeyDepressionOptions): UseKeyDepressionResult {
  // Initialize 7 keys
  const [keyStates, setKeyStates] = useState<KeyState[]>(() =>
    Array.from({ length: 7 }, (_, i) => createInitialKeyState(i))
  );

  // Track last highlighted movement to detect changes
  const lastHighlightedRef = useRef<number | undefined>(undefined);
  const animationFrameRef = useRef<number | null>(null);
  const pendingPressesRef = useRef<Map<number, { velocity: number; delay: number }>>(new Map());
  const lastFrameTimeRef = useRef<number>(0);

  // Calculate velocity-based depression target
  const getDepressionTarget = useCallback((velocity: number = 0): number => {
    const normalizedVelocity = Math.min(Math.abs(velocity) / 0.1, 1);
    return DEPRESSION_DEPTH.min + normalizedVelocity * (DEPRESSION_DEPTH.max - DEPRESSION_DEPTH.min);
  }, []);

  // Press a single key
  const pressKey = useCallback((keyIndex: number, velocity: number = DEPRESSION_DEPTH.default) => {
    setKeyStates(prev => prev.map((key, i) => {
      if (i !== keyIndex) return key;
      if (key.phase !== 'rest') return key; // Don't interrupt active keys
      
      return {
        ...key,
        phase: 'press' as KeyPhase,
        velocity: 0.05, // Initial downward velocity
        pressTimestamp: performance.now(),
      };
    }));
  }, []);

  // Release a single key
  const releaseKey = useCallback((keyIndex: number) => {
    setKeyStates(prev => prev.map((key, i) => {
      if (i !== keyIndex) return key;
      if (key.phase === 'rest' || key.phase === 'release') return key;
      
      return {
        ...key,
        phase: 'release' as KeyPhase,
      };
    }));
  }, []);

  // Trigger keys for a movement with stagger
  const triggerMovementKeys = useCallback((movement: number, velocity: number) => {
    const keysToPress = MOVEMENT_KEY_MAP[movement];
    if (!keysToPress) return;

    // Clear pending presses
    pendingPressesRef.current.clear();

    // Calculate stagger delays
    const totalKeys = keysToPress.length;
    const staggerDelay = Math.min(CHORD_STAGGER.base, CHORD_STAGGER.maxSpread / totalKeys);

    keysToPress.forEach((keyIndex, i) => {
      const delay = i * staggerDelay;
      
      if (delay === 0) {
        pressKey(keyIndex, velocity);
      } else {
        pendingPressesRef.current.set(keyIndex, { velocity, delay });
        
        // Schedule the press
        setTimeout(() => {
          pressKey(keyIndex, velocity);
          pendingPressesRef.current.delete(keyIndex);
        }, delay);
      }
    });
  }, [pressKey]);

  // Handle movement changes
  useEffect(() => {
    // Only trigger in 'keys' state
    if (lineState !== 'keys') return;
    
    if (
      highlightedMovement !== undefined &&
      highlightedMovement !== lastHighlightedRef.current &&
      highlightedMovement >= 0 &&
      highlightedMovement <= 3
    ) {
      const velocity = getDepressionTarget(scrollVelocity);
      triggerMovementKeys(highlightedMovement, velocity);
      lastHighlightedRef.current = highlightedMovement;
    }
  }, [highlightedMovement, lineState, scrollVelocity, getDepressionTarget, triggerMovementKeys]);

  // Physics animation loop
  useEffect(() => {
    if (!isActive) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const animate = (timestamp: number) => {
      const deltaTime = lastFrameTimeRef.current ? (timestamp - lastFrameTimeRef.current) / 1000 : 0.016;
      lastFrameTimeRef.current = timestamp;

      // Cap delta to prevent physics explosion on tab switch
      const dt = Math.min(deltaTime, 0.033);

      setKeyStates(prev => {
        let hasChanges = false;
        
        const newStates = prev.map(key => {
          // Rest state - no physics needed
          if (key.phase === 'rest' && key.displacement === 0) {
            return key;
          }

          hasChanges = true;
          const elapsed = timestamp - key.pressTimestamp;

          // Determine target and spring config based on phase
          let target = 0;
          let springConfig = SPRING.release;
          let nextPhase = key.phase;

          switch (key.phase) {
            case 'press':
              target = DEPRESSION_DEPTH.default;
              springConfig = SPRING.press;
              if (key.displacement >= target * 0.95) {
                nextPhase = 'impact';
              }
              break;

            case 'impact':
              target = DEPRESSION_DEPTH.default;
              springConfig = SPRING.impact;
              if (elapsed > PHASE_TIMING.press + PHASE_TIMING.impact) {
                nextPhase = 'sustain';
              }
              break;

            case 'sustain':
              target = DEPRESSION_DEPTH.default * 0.95;
              springConfig = SPRING.settle;
              if (elapsed > PHASE_TIMING.press + PHASE_TIMING.impact + PHASE_TIMING.sustain) {
                nextPhase = 'release';
              }
              break;

            case 'release':
              target = 0;
              springConfig = SPRING.release;
              if (Math.abs(key.displacement) < 0.01 && Math.abs(key.velocity) < 0.01) {
                nextPhase = 'rest';
              }
              break;
          }

          // For reduced motion, snap to target
          if (prefersReducedMotion) {
            return {
              ...key,
              displacement: key.phase === 'rest' || key.phase === 'release' ? 0 : target,
              velocity: 0,
              phase: nextPhase,
              shadowDepth: key.phase === 'rest' || key.phase === 'release' ? 0 : target * 0.8,
              glowIntensity: key.phase === 'impact' ? 1 : key.phase === 'sustain' ? 0.5 : 0,
              rotation: key.phase === 'rest' || key.phase === 'release' ? 0 : target * 3,
            };
          }

          // Calculate spring force
          const force = calculateSpringForce(key.displacement, key.velocity, target, springConfig);
          
          // Update velocity and position (Euler integration)
          const newVelocity = key.velocity + force * dt;
          const newDisplacement = Math.max(0, Math.min(1, key.displacement + newVelocity * dt));

          // Calculate derived properties
          const shadowDepth = newDisplacement * 0.8;
          const glowIntensity = key.phase === 'impact' ? 1 :
                               key.phase === 'press' ? newDisplacement * 0.7 :
                               key.phase === 'sustain' ? 0.3 + Math.sin(elapsed / 200) * 0.1 :
                               newDisplacement * 0.3;
          const rotation = newDisplacement * 3; // Max 3 degrees tilt

          return {
            ...key,
            displacement: newDisplacement,
            velocity: newVelocity,
            phase: nextPhase,
            shadowDepth,
            glowIntensity,
            rotation,
          };
        });

        return hasChanges ? newStates : prev;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  // Derived state
  const hasActiveKeys = useMemo(() => 
    keyStates.some(k => k.phase !== 'rest'),
    [keyStates]
  );

  const isFullChord = useMemo(() => 
    highlightedMovement === 3 && keyStates.filter(k => k.phase !== 'rest').length >= 5,
    [highlightedMovement, keyStates]
  );

  return {
    keyStates,
    hasActiveKeys,
    isFullChord,
    pressKey,
    releaseKey,
  };
}

export default useKeyDepression;
