import { cn } from '@/lib/utils';

interface GoldRuleShimmerProps {
  side: 'left' | 'right';
  shimmerPosition?: number;
  shimmerActive?: boolean;
  isHighlighted?: boolean;
  className?: string;
}

/**
 * GoldRuleShimmer — Gilt Edge Shimmer Effect
 * 
 * Creates the golden vertical rule with animated shimmer
 * like light catching gilt edges of a fine book.
 * 
 * 3-layer system:
 * 1. Base gold rule (static)
 * 2. Shimmer gradient (animated)
 * 3. Afterglow blur (trail effect)
 */
export function GoldRuleShimmer({
  side,
  shimmerPosition = 0,
  shimmerActive = false,
  isHighlighted = false,
  className,
}: GoldRuleShimmerProps) {
  return (
    <div 
      className={cn(
        'gold-rule-shimmer',
        `gold-rule-shimmer--${side}`,
        shimmerActive && 'gold-rule-shimmer--active',
        isHighlighted && 'gold-rule-shimmer--highlighted',
        className
      )}
      aria-hidden="true"
      style={{
        '--shimmer-position': `${shimmerPosition * 100}%`,
      } as React.CSSProperties}
    >
      {/* Layer 1: Base gold rule */}
      <div className="gold-rule-shimmer__base" />
      
      {/* Layer 2: Shimmer highlight */}
      <div 
        className="gold-rule-shimmer__shimmer"
        style={{
          transform: `translateY(calc(${shimmerPosition * 100}% - 50%))`,
          opacity: shimmerActive ? 1 : 0,
        }}
      />
      
      {/* Layer 3: Afterglow trail */}
      <div 
        className="gold-rule-shimmer__afterglow"
        style={{
          transform: `translateY(calc(${shimmerPosition * 100}% - 30%))`,
          opacity: shimmerActive ? 0.6 : 0,
        }}
      />
      
      {/* Ambient glow when highlighted */}
      <div className="gold-rule-shimmer__ambient" />
    </div>
  );
}

export default GoldRuleShimmer;
