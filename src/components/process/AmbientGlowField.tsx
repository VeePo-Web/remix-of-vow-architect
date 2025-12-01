import { cn } from '@/lib/utils';

interface AmbientGlowFieldProps {
  /** CSS variables from useProcessScroll */
  cssVars: Record<string, string>;
  /** Whether the section is active (in viewport) */
  isActive: boolean;
  /** Current scroll progress (0-1) */
  progress: number;
  className?: string;
}

/**
 * AmbientGlowField — Dual-Layer Breathing Glow System
 * 
 * Creates the living, breathing golden presence:
 * - Core: Inner ellipse with 8s breathing cycle
 * - Bloom: Outer ellipse with 12s breathing cycle (phase offset)
 * - Pulse: Expanding ring that appears mid-scroll
 * 
 * The overlapping breath cycles create organic, non-mechanical motion.
 * Glow intensity is modulated by scroll position (bell curve peaks mid-section).
 */
export function AmbientGlowField({
  cssVars,
  isActive,
  progress,
  className,
}: AmbientGlowFieldProps) {
  // Pulse ring appears after 30% scroll progress
  const showPulse = progress > 0.3;
  
  return (
    <div
      className={cn(
        'ambient-glow-field',
        isActive && 'is-active',
        className
      )}
      style={cssVars as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Core glow: Inner ellipse, faster breathing */}
      <div className="ambient-glow-field__core" />
      
      {/* Bloom glow: Outer ellipse, slower breathing */}
      <div className="ambient-glow-field__bloom" />
      
      {/* Pulse ring: Expanding circle, appears mid-scroll */}
      <div 
        className={cn(
          'ambient-glow-field__pulse',
          showPulse && 'is-visible'
        )} 
      />
    </div>
  );
}

export default AmbientGlowField;
