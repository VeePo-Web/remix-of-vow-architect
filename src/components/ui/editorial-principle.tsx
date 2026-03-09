import * as React from "react";
import { cn } from "@/lib/utils";

export interface EditorialPrincipleProps {
  index: number;
  label: string;
  description: string;
  className?: string;
}

/**
 * Editorial Principle Component
 * 
 * Numbered principle with letterpress numeral and breathing golden dot.
 * Removes generic icons in favor of luxury editorial typography.
 */
const EditorialPrinciple = React.forwardRef<HTMLDivElement, EditorialPrincipleProps>(
  ({ index, label, description, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative pl-16 py-6 border-l border-primary/15 hover:border-primary/30 transition-all duration-[180ms] group",
          className
        )}
      >
        {/* Numeral with letterpress emboss */}
        <span 
          className="absolute left-4 top-6 font-display text-[80px] leading-none text-foreground/[0.03] font-light select-none"
          style={{
            textShadow: '1px 1px 2px hsl(var(--vow-yellow) / 0.05)',
            transform: 'translateZ(0)'
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        
        {/* Golden dot with breathing glow */}
        <div 
          className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full motion-reduce:animate-none" 
          style={{
            background: 'hsl(var(--vow-yellow))',
            boxShadow: '0 0 16px hsl(var(--vow-yellow) / 0.4)',
            animation: 'vigil-pulse 4s ease-in-out infinite'
          }}
          aria-hidden="true"
        />
        
        {/* Content */}
        <h3 className="font-display text-2xl font-light text-foreground mb-3 tracking-wide">
          {label}
        </h3>
        <div 
          className="w-12 h-px mb-4" 
          style={{ background: 'linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), transparent)' }}
          aria-hidden="true"
        />
        <p className="text-muted-foreground leading-[1.7] max-w-[520px]">
          {description}
        </p>
      </div>
    );
  }
);

EditorialPrinciple.displayName = "EditorialPrinciple";

export { EditorialPrinciple };
