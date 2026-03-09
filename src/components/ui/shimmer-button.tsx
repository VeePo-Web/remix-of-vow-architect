import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

/**
 * Shimmer Button Component
 * 
 * CTA with diagonal shimmer sweep on hover, inspired by hickoryandrose.
 * Replaces generic Button components with luxury brand-aligned interaction.
 */
const ShimmerButton = React.forwardRef<HTMLAnchorElement, ShimmerButtonProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-10 py-4",
          "text-[0.6875rem] tracking-[0.2em] uppercase font-sans",
          "border border-foreground/20 text-foreground",
          "hover:border-primary transition-all duration-300",
          "overflow-hidden group cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-70",
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
      </Comp>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
