import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

/**
 * Shimmer Button Component
 * 
 * CTA with diagonal shimmer sweep on hover, inspired by hickoryandrose.
 */
const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, children, asChild, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-10 py-4",
          "text-[0.6875rem] tracking-[0.2em] uppercase font-sans",
          "border border-foreground/20 text-foreground",
          "hover:border-primary transition-all duration-300",
          "overflow-hidden group cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-70",
          "bg-transparent",
          className
        )}
        {...props}
      >
        {/* Shimmer sweep on hover */}
        <span 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none motion-reduce:hidden"
          style={{
            background: 'linear-gradient(110deg, transparent 20%, hsl(var(--vow-yellow) / 0.15) 40%, hsl(var(--vow-yellow) / 0.25) 50%, hsl(var(--vow-yellow) / 0.15) 60%, transparent 80%)'
          }}
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
