import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Import process images
import listeningImg from '@/assets/process/listening.jpg';
import craftingImg from '@/assets/process/crafting.jpg';
import refiningImg from '@/assets/process/refining.jpg';
import completingImg from '@/assets/process/completing.jpg';

const MOVEMENT_IMAGES: Record<string, string> = {
  'I': listeningImg,
  'II': craftingImg,
  'III': refiningImg,
  'IV': completingImg,
};

interface MovementImageProps {
  numeral: string;
  alt: string;
  isRevealed?: boolean;
  isHighlighted?: boolean;
  side: 'left' | 'right';
  className?: string;
}

/**
 * MovementImage — Parallax Photo Component
 * 
 * Full-bleed photography for each movement with:
 * - Ken Burns drift animation (0.5% zoom over 8s)
 * - Desaturated film-like treatment
 * - Scroll-triggered reveal with fade + scale
 * - Golden thread overlay positioning
 */
export function MovementImage({
  numeral,
  alt,
  isRevealed = false,
  isHighlighted = false,
  side,
  className,
}: MovementImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = MOVEMENT_IMAGES[numeral];

  // Handle image load
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = imageSrc;
  }, [imageSrc]);

  return (
    <div
      ref={imageRef}
      className={cn(
        'movement-image',
        `movement-image--${side}`,
        isRevealed && 'is-revealed',
        isHighlighted && 'is-highlighted',
        isLoaded && 'is-loaded',
        className
      )}
      aria-hidden="true"
    >
      {/* Warm vignette overlay */}
      <div className="movement-image__vignette" />
      
      {/* The photograph with Ken Burns */}
      <div className="movement-image__frame">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={alt}
            className="movement-image__photo"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      
      {/* Golden thread entry point */}
      <div className="movement-image__thread-anchor" />
      
      {/* Candlelight glow pool */}
      <div className="movement-image__glow" />
    </div>
  );
}

export default MovementImage;
