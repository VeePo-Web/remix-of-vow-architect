import * as React from "react";
import { cn } from "@/lib/utils";

export interface GoldCornerImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  maxHeight?: string;
  frameIndex?: string;
  className?: string;
  parallaxStyle?: React.CSSProperties;
}

/**
 * GoldCornerImage — Clean editorial image with subtle hover treatment.
 * Stripped of gimmicky gold corners, letterbox bars, and shimmer effects.
 * Keeps: Ken Burns drift, film grain, subtle hover scale.
 */
const GoldCornerImage = React.forwardRef<HTMLDivElement, GoldCornerImageProps>(
  ({ src, alt, aspectRatio = "3/4", maxHeight = "560px", frameIndex, className, parallaxStyle }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("group relative overflow-hidden rounded-sm", className)}
        style={{
          aspectRatio,
          maxHeight,
        }}
      >
        {/* Image with Ken Burns + subtle hover scale */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:!animate-none motion-reduce:!transform-none"
          loading="lazy"
          decoding="async"
          style={{
            animation: "ken-burns 30s ease-in-out infinite alternate",
            filter: "saturate(0.9) contrast(1.03)",
            willChange: "transform",
            ...parallaxStyle,
          }}
        />

        {/* Subtle vignette — always visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.4) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-[0.03] pointer-events-none" aria-hidden="true" />
      </div>
    );
  }
);

GoldCornerImage.displayName = "GoldCornerImage";

export { GoldCornerImage };
