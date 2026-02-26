import { cn } from '@/lib/utils';

interface GradientDawnBackgroundProps {
  /** CSS variables from useProcessScroll */
  cssVars: Record<string, string>;
  /** Whether the section is active (in viewport) */
  isActive: boolean;
  className?: string;
}

/**
 * GradientDawnBackground — Composer's Journal Paper System
 * 
 * Creates warm paper aesthetic:
 * - Layer 0 (Base): Warm walnut → espresso gradient
 * - Layer 1 (Paper): Cream paper texture overlay
 * - Layer 2 (Candlelight): Radial amber glow pools at corners
 * - Layer 3 (Grain): Film grain for tactile depth
 * - Layer 4 (Vignette): Soft edge darkening
 */
export function GradientDawnBackground({
  cssVars,
  isActive,
  className,
}: GradientDawnBackgroundProps) {
  return (
    <div
      className={cn('gradient-dawn gradient-dawn--journal', isActive && 'is-active', className)}
      style={cssVars as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Layer 0: Warm paper base gradient */}
      <div className="gradient-dawn__base" />
      
      {/* Layer 1: Paper texture overlay */}
      <div className="gradient-dawn__paper" />
      
      {/* Layer 1.5: Scroll-linked warmth */}
      <div className="gradient-dawn__warmth" />
      
      {/* Layer 2: Candlelight glow pools */}
      <div className="gradient-dawn__candlelight gradient-dawn__candlelight--tl" />
      <div className="gradient-dawn__candlelight gradient-dawn__candlelight--tr" />
      <div className="gradient-dawn__candlelight gradient-dawn__candlelight--bl" />
      <div className="gradient-dawn__candlelight gradient-dawn__candlelight--br" />
      
      {/* Layer 3: Film grain texture */}
      <div className="gradient-dawn__grain" />
      
      {/* Layer 4: Edge vignette */}
      <div className="gradient-dawn__vignette" />
    </div>
  );
}

export default GradientDawnBackground;
