import { cn } from "@/lib/utils";

interface TaglineCovenantProps {
  isVisible?: boolean;
}

/**
 * Sacred Tagline: "'Til Death; Unto Life"
 * - Two-line split with semicolon pivot
 * - Semicolon heartbeat animation
 * - Blur-reveal cascade (semicolon → death → life)
 * - Vow-yellow underline on "Unto Life"
 */
export function TaglineCovenant({ isVisible = false }: TaglineCovenantProps) {
  return (
    <div className="text-center">
      <div className="inline-flex flex-col items-center gap-1">
        {/* Line 1: 'Til Death */}
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "font-display text-2xl md:text-3xl font-medium text-muted-foreground tracking-tight reveal reveal--blur",
              isVisible && "is-visible"
            )}
            style={{ "--animation-delay": "1050ms" } as React.CSSProperties}
          >
            'Til Death
          </span>
          {/* Semicolon — The Pivot */}
          <span
            className={cn(
              "font-display text-2xl md:text-3xl font-medium text-primary reveal reveal--blur",
              isVisible && "is-visible"
            )}
            style={{
              "--animation-delay": "900ms",
              animation: isVisible ? "semicolon-heartbeat 2s ease-in-out infinite" : undefined,
            } as React.CSSProperties}
          >
            ;
          </span>
        </div>

        {/* Line 2: Unto Life — with underline */}
        <div className="relative">
          <span
            className={cn(
              "font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight reveal reveal--blur",
              isVisible && "is-visible"
            )}
            style={{ "--animation-delay": "1200ms" } as React.CSSProperties}
          >
            Unto Life
          </span>
          {/* Vow Yellow Underline */}
          <span
            className={cn(
              "absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-[450ms]",
              isVisible && "scale-x-100"
            )}
            style={{
              transitionDelay: "1400ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
