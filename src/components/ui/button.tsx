import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button — "The Piano Key"
 * 
 * Every button follows piano-key physics:
 * - Rest: translateY(0) — the key at rest
 * - Hover: -1px lift + scale(1.02) — magnetic anticipation, shadow deepens
 * - Press: translateY(0) snap — the key depresses, shadow compresses
 * - Release: springs back at 250ms brand easing
 * 
 * Timing follows the Motion Philosophy:
 * - 60ms: snap-down on press (hammer strike)
 * - 180ms: hover lift (intentional response)
 * - 250ms: release return (key resonance)
 * 
 * All variants use rounded-full (pill), font-display at 15px,
 * and golden focus rings for accessibility.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-display text-[15px] font-medium",
    "transition-all duration-[250ms]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/70",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    /* Piano key depression physics — universal */
    "hover:-translate-y-px hover:scale-[1.02]",
    "active:translate-y-0 active:scale-100",
  ].join(" "),
  {
    variants: {
      variant: {
        /**
         * DEFAULT — Vow Yellow (Primary CTA)
         * "Hold my date." The most sacred action.
         * Golden candlelight glow beneath, as if lit from within.
         */
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_8px_24px_rgba(255,224,138,0.18)]",
          "hover:bg-[hsl(var(--vow-yellow)/0.85)]",
          "hover:shadow-[0_12px_32px_rgba(255,224,138,0.28),0_0_16px_rgba(255,224,138,0.08)]",
          "active:shadow-[0_4px_12px_rgba(255,224,138,0.12)]",
        ].join(" "),

        /**
         * PRIMARY-DARK — White candle on dark sections
         * The button is a candle. On hover, the candle extinguishes
         * and you see through to the vigil space.
         */
        "primary-dark": [
          "bg-ink-inverse text-ink-primary border border-ink-inverse",
          "shadow-[0_4px_16px_rgba(255,255,255,0.06)]",
          "hover:bg-transparent hover:text-ink-inverse",
          "hover:shadow-[0_8px_24px_rgba(255,255,255,0.04),inset_0_0_12px_rgba(255,255,255,0.03)]",
          "active:shadow-[0_2px_8px_rgba(255,255,255,0.04)]",
        ].join(" "),

        /**
         * GHOST-DARK — Outline on dark sections
         * The ghost is potential energy. Outline says "I could be."
         * Hover fill says "Now I am."
         */
        "ghost-dark": [
          "bg-transparent text-ink-inverse border border-ink-inverse/60",
          "hover:bg-ink-inverse hover:text-ink-primary hover:border-ink-inverse",
          "hover:shadow-[0_8px_24px_rgba(255,255,255,0.06)]",
          "active:shadow-[0_2px_8px_rgba(255,255,255,0.04)]",
        ].join(" "),

        /**
         * GHOST-LIGHT — Outline on light sections
         * Barely exists until you need it.
         */
        "ghost-light": [
          "bg-transparent text-ink-primary border border-lines",
          "hover:bg-card hover:border-border",
          "hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]",
          "active:shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        ].join(" "),

        /**
         * ACCENT — Vine Green
         * Appears only at confirmation moments.
         * "The door is open."
         */
        accent: [
          "bg-accent text-accent-foreground border border-accent",
          "shadow-[0_4px_16px_rgba(155,225,93,0.12)]",
          "hover:bg-[hsl(var(--vine-green)/0.85)] hover:border-[hsl(var(--vine-green)/0.85)]",
          "hover:shadow-[0_8px_24px_rgba(155,225,93,0.18)]",
          "active:shadow-[0_2px_8px_rgba(155,225,93,0.1)]",
        ].join(" "),

        /**
         * OUTLINE — Vow Yellow border
         * The outline is a promise not yet made.
         * The fill is the promise kept.
         */
        outline: [
          "border-[1.5px] border-primary text-primary bg-transparent",
          "hover:bg-primary hover:text-primary-foreground",
          "hover:shadow-[0_8px_24px_rgba(255,224,138,0.16)]",
          "active:shadow-[0_4px_12px_rgba(255,224,138,0.1)]",
        ].join(" "),

        destructive: [
          "bg-destructive text-destructive-foreground shadow-sm",
          "hover:bg-destructive/90",
          "hover:shadow-[0_8px_20px_rgba(239,68,68,0.15)]",
          "active:shadow-[0_2px_8px_rgba(239,68,68,0.1)]",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
          "hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]",
          "active:shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        ].join(" "),

        ghost: "hover:bg-accent hover:text-accent-foreground",

        link: "text-primary underline-offset-4 hover:underline hover:translate-y-0 hover:scale-100 active:translate-y-0",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          ...props.style,
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
