import { cn } from '@/lib/utils';

interface GradientDawnBackgroundProps {
  /** CSS variables from useProcessScroll */
  cssVars: Record<string, string>;
  /** Whether the section is active (in viewport) */
  isActive: boolean;
  className?: string;
}

/**
 * GradientDawnBackground — Three-Layer Gradient System
 * 
 * Creates the "void to voice" background transformation:
 * - Layer 0 (Base): Deep gradient consuming CSS variables for hue shift
 * - Layer 1 (Warmth): Scroll-linked radial bloom from center
 * - Layer 2 (Veil): Atmospheric edge darkening for depth
 * - Layer 3 (Grain): Subtle film grain for texture
 * 
 * All color transitions happen via CSS variables for GPU acceleration.
 */
export function GradientDawnBackground({
  cssVars,
  isActive,
  className,
}: GradientDawnBackgroundProps) {
  return (
    <div
      className={cn('gradient-dawn', isActive && 'is-active', className)}
      style={cssVars as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Layer 0: Base depth gradient */}
      <div className="gradient-dawn__base" />
      
      {/* Layer 1: Warmth bloom (scroll-linked radial) */}
      <div className="gradient-dawn__warmth" />
      
      {/* Layer 2: Edge veil for depth framing */}
      <div className="gradient-dawn__veil" />
      
      {/* Layer 3: Film grain texture */}
      <div className="gradient-dawn__grain" />
    </div>
  );
}

export default GradientDawnBackground;
