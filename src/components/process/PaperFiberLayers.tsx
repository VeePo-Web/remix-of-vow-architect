import { cn } from '@/lib/utils';

interface PaperFiberLayersProps {
  tiltX: number;
  tiltY: number;
  shimmerActive?: boolean;
  lightPosition?: number;
  isHighlighted?: boolean;
  className?: string;
}

/**
 * PaperFiberLayers — Multi-layer Handmade Paper Effect
 * 
 * Creates authentic paper depth with three fiber layers that shift
 * at different rates during card tilt, like looking at handmade
 * paper under a magnifying glass.
 * 
 * Layer Structure:
 * - Deep Fibers: Large, soft, barely move (0.5x parallax)
 * - Embedded Fibers: Medium density, moderate movement (1.5x parallax)
 * - Surface Fibers: Bright, thin, most movement (3.0x parallax) + shimmer
 */
export function PaperFiberLayers({
  tiltX,
  tiltY,
  shimmerActive = false,
  lightPosition = 0,
  isHighlighted = false,
  className,
}: PaperFiberLayersProps) {
  // Calculate fiber offsets based on tilt
  // Using tiltY for X offset and tiltX for Y offset (cross-axis parallax)
  const deepOffsetX = Math.max(-3, Math.min(3, tiltY * 0.5));
  const deepOffsetY = Math.max(-3, Math.min(3, tiltX * 0.5));
  
  const embeddedOffsetX = Math.max(-4.5, Math.min(4.5, tiltY * 1.5));
  const embeddedOffsetY = Math.max(-4.5, Math.min(4.5, tiltX * 1.5));
  
  const surfaceOffsetX = Math.max(-6, Math.min(6, tiltY * 3.0));
  const surfaceOffsetY = Math.max(-6, Math.min(6, tiltX * 3.0));

  return (
    <div 
      className={cn('paper-fiber-layers', className)}
      aria-hidden="true"
    >
      {/* Deep Fibers — Large, soft, barely move */}
      <div 
        className="paper-fiber-layer paper-fiber-layer--deep"
        style={{
          transform: `translate3d(${deepOffsetX}px, ${deepOffsetY}px, 0)`,
        }}
      />
      
      {/* Embedded Fibers — Medium density, moderate movement */}
      <div 
        className="paper-fiber-layer paper-fiber-layer--embedded"
        style={{
          transform: `translate3d(${embeddedOffsetX}px, ${embeddedOffsetY}px, 0)`,
        }}
      />
      
      {/* Surface Fibers — Bright, thin, most movement + shimmer */}
      <div 
        className={cn(
          'paper-fiber-layer paper-fiber-layer--surface',
          shimmerActive && 'is-shimmering',
          isHighlighted && 'is-highlighted'
        )}
        style={{
          transform: `translate3d(${surfaceOffsetX}px, ${surfaceOffsetY}px, 0)`,
          '--fiber-light-position': lightPosition,
        } as React.CSSProperties}
      />
    </div>
  );
}

export default PaperFiberLayers;
