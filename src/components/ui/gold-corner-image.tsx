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
 * GoldCornerImage — Editorial image with Hickory & Rose-level hover treatments:
 * - Gold gradient L-bracket corners on hover
 * - Cinematic letterbox bars on hover
 * - Diagonal gold shimmer sweep on hover
 * - Ken Burns drift + film grain
 * - Frame index mark
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
          boxShadow: "0 20px 60px hsl(var(--rich-black) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.08)",
        }}
      >
        {/* Image with Ken Burns */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover motion-reduce:!animate-none"
          loading="lazy"
          decoding="async"
          style={{
            animation: "ken-burns 30s ease-in-out infinite alternate",
            filter: "saturate(0.85) contrast(1.05)",
            willChange: "transform",
            ...parallaxStyle,
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.6) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

        {/* Gold corner L-brackets — fade in on hover */}
        {/* Top-left */}
        <span
          className="absolute top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none motion-reduce:hidden"
          style={{
            borderLeft: "2px solid hsl(var(--vow-yellow) / 0.6)",
            borderTop: "2px solid hsl(var(--vow-yellow) / 0.6)",
            filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.15))",
          }}
          aria-hidden="true"
        />
        {/* Top-right */}
        <span
          className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none motion-reduce:hidden"
          style={{
            borderRight: "2px solid hsl(var(--vow-yellow) / 0.6)",
            borderTop: "2px solid hsl(var(--vow-yellow) / 0.6)",
            filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.15))",
            transitionDelay: "50ms",
          }}
          aria-hidden="true"
        />
        {/* Bottom-left */}
        <span
          className="absolute bottom-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none motion-reduce:hidden"
          style={{
            borderLeft: "2px solid hsl(var(--vow-yellow) / 0.6)",
            borderBottom: "2px solid hsl(var(--vow-yellow) / 0.6)",
            filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.15))",
            transitionDelay: "100ms",
          }}
          aria-hidden="true"
        />
        {/* Bottom-right */}
        <span
          className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none motion-reduce:hidden"
          style={{
            borderRight: "2px solid hsl(var(--vow-yellow) / 0.6)",
            borderBottom: "2px solid hsl(var(--vow-yellow) / 0.6)",
            filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.15))",
            transitionDelay: "150ms",
          }}
          aria-hidden="true"
        />

        {/* Cinematic letterbox bars */}
        <div
          className="absolute top-0 left-0 right-0 h-[8%] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-600 pointer-events-none motion-reduce:hidden"
          style={{ background: "linear-gradient(to bottom, hsl(var(--rich-black) / 0.7), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[8%] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-600 pointer-events-none motion-reduce:hidden"
          style={{ background: "linear-gradient(to top, hsl(var(--rich-black) / 0.7), transparent)" }}
          aria-hidden="true"
        />

        {/* Gold shimmer sweep */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none motion-reduce:hidden"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(var(--vow-yellow) / 0.08) 50%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Frame index mark */}
        {frameIndex && (
          <span
            className="absolute top-3 right-4 text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none select-none motion-reduce:hidden"
            style={{ color: "hsl(var(--vow-yellow))" }}
            aria-hidden="true"
          >
            {frameIndex}
          </span>
        )}
      </div>
    );
  }
);

GoldCornerImage.displayName = "GoldCornerImage";

export { GoldCornerImage };
