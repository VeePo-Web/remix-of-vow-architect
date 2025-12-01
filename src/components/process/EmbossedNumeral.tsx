import { cn } from '@/lib/utils';

interface EmbossedNumeralProps {
  numeral: string;
  lightX?: number;
  lightY?: number;
  isHighlighted?: boolean;
  className?: string;
}

/**
 * EmbossedNumeral — Light-Catching Emboss Effect
 * 
 * Creates the illusion of debossed/embossed letterpress numerals
 * that catch light dynamically based on scroll position.
 * 
 * 4-layer system:
 * 1. Shadow layer (opposite to light)
 * 2. Base numeral (slightly recessed)
 * 3. Highlight layer (catches light)
 * 4. Gloss layer (specular highlight)
 */
export function EmbossedNumeral({
  numeral,
  lightX = 0.3,
  lightY = 0.2,
  isHighlighted = false,
  className,
}: EmbossedNumeralProps) {
  // Calculate shadow and highlight offsets based on light position
  // Light from top-left means shadow goes bottom-right
  const shadowOffsetX = (0.5 - lightX) * 3;
  const shadowOffsetY = (0.5 - lightY) * 3;
  const highlightOffsetX = (lightX - 0.5) * 2;
  const highlightOffsetY = (lightY - 0.5) * 2;
  
  return (
    <div 
      className={cn(
        'embossed-numeral',
        isHighlighted && 'embossed-numeral--highlighted',
        className
      )}
      aria-hidden="true"
    >
      {/* Layer 1: Shadow (depth illusion) */}
      <span 
        className="embossed-numeral__shadow"
        style={{
          transform: `translate(${shadowOffsetX}px, ${shadowOffsetY}px)`,
        }}
      >
        {numeral}
      </span>
      
      {/* Layer 2: Base numeral */}
      <span className="embossed-numeral__base">
        {numeral}
      </span>
      
      {/* Layer 3: Highlight (light catching) */}
      <span 
        className="embossed-numeral__highlight"
        style={{
          transform: `translate(${highlightOffsetX}px, ${highlightOffsetY}px)`,
          opacity: 0.3 + lightY * 0.4,
        }}
      >
        {numeral}
      </span>
      
      {/* Layer 4: Gloss (specular highlight on edges) */}
      <span 
        className="embossed-numeral__gloss"
        style={{
          background: `radial-gradient(
            ellipse 60% 40% at ${lightX * 100}% ${lightY * 100}%,
            hsl(45 60% 85% / 0.4) 0%,
            transparent 70%
          )`,
        }}
      >
        {numeral}
      </span>
      
      {/* Light sweep animation overlay */}
      <div 
        className="embossed-numeral__sweep"
        style={{
          background: `linear-gradient(
            ${90 + (lightX - 0.5) * 30}deg,
            transparent 0%,
            hsl(45 60% 90% / 0.15) 45%,
            hsl(45 60% 95% / 0.25) 50%,
            hsl(45 60% 90% / 0.15) 55%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
}

export default EmbossedNumeral;
