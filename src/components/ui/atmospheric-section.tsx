import * as React from "react";
import { cn } from "@/lib/utils";

export interface AtmosphericSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether to reduce atmospheric layers on mobile (default: true) */
  reduceMobile?: boolean;
  /** Whether to include fog drift animation (default: true) */
  includeFog?: boolean;
}

/**
 * Atmospheric Section Component
 * 
 * Wrapper that applies 4-layer atmospheric treatment automatically:
 * 1. Film grain
 * 2. Breathing vignette
 * 3. Candlelight warmth
 * 4. Fog drift (optional)
 * 
 * Inspired by Fantasy.co "empty venue" aesthetic.
 */
const AtmosphericSection = React.forwardRef<HTMLElement, AtmosphericSectionProps>(
  ({ className, children, reduceMobile = true, includeFog = true, ...props }, ref) => {
    return (
      <section 
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Layer 1: Film grain */}
        <div 
          className={cn(
            "absolute inset-0 grain pointer-events-none mix-blend-overlay",
            reduceMobile ? "opacity-[0.03] md:opacity-[0.06]" : "opacity-[0.06]"
          )}
          aria-hidden="true"
        />

        {/* Layer 2: Edge vignette — breathing */}
        <div 
          className="absolute inset-0 pointer-events-none motion-reduce:opacity-70"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black) / 0.6) 70%, hsl(var(--rich-black)) 100%)',
            animation: 'witness-vignette-breathe 6s ease-in-out infinite'
          }}
          aria-hidden="true"
        />

        {/* Layer 3: Candlelight warmth — dual-origin */}
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            reduceMobile && "hidden md:block"
          )}
          style={{
            background: 'radial-gradient(ellipse 50% 70% at 25% 45%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 50%)'
          }}
          aria-hidden="true"
        />

        {/* Layer 4: Fog drift — charcoal */}
        {includeFog && (
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none motion-reduce:hidden",
              reduceMobile && "hidden md:block"
            )}
            style={{
              background: 'radial-gradient(ellipse at 70% 80%, hsl(var(--ebon-charcoal) / 0.4) 0%, transparent 45%)',
              animation: 'menu-fog-drift 18s ease-in-out infinite alternate'
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </section>
    );
  }
);

AtmosphericSection.displayName = "AtmosphericSection";

export { AtmosphericSection };
