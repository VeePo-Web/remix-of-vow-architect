import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display text-[15px] font-medium transition-all duration-[250ms] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(255,224,138,0.18)] hover:bg-[hsl(45,100%,70%)] hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(255,224,138,0.24)] hover:-translate-y-px active:translate-y-0",
        "primary-dark": "bg-ink-inverse text-ink-primary border border-ink-inverse hover:bg-transparent hover:text-ink-inverse hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        "ghost-dark": "bg-transparent text-ink-inverse border border-ink-inverse hover:bg-ink-inverse hover:text-ink-primary hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        "ghost-light": "bg-transparent text-ink-primary border border-lines hover:bg-card hover:border-border hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        accent: "bg-accent text-accent-foreground border border-accent hover:bg-[hsl(95,65%,62%)] hover:border-[hsl(95,65%,62%)] hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        outline: "border-[1.5px] border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.02] hover:-translate-y-px active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
