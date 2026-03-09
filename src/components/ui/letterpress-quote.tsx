import * as React from "react";
import { cn } from "@/lib/utils";

export interface LetterPressQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

/**
 * LetterPress Quote Component
 * 
 * Embossed quotation block with letterpress depth.
 * Removes generic Card/Quote icon in favor of typographic emboss.
 */
const LetterPressQuote = React.forwardRef<HTMLDivElement, LetterPressQuoteProps>(
  ({ quote, attribution, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn("relative pl-12 py-8", className)}
        style={{
          borderLeft: "2px solid transparent",
          borderImage: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.15)) 1",
        }}
      >
        {/* Embossed quotation mark */}
        <span 
          className="absolute -left-2 top-0 font-display text-[120px] leading-none text-foreground/[0.04] select-none"
          style={{
            textShadow: '2px 2px 4px hsl(var(--vow-yellow) / 0.08)',
          }}
          aria-hidden="true"
        >
          "
        </span>
        
        {/* Quote text */}
        <blockquote className="font-display text-2xl font-light italic text-foreground leading-[1.4] mb-6">
          {quote}
        </blockquote>
        
        {/* Attribution */}
        {attribution && (
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {attribution}
          </p>
        )}
      </div>
    );
  }
);

LetterPressQuote.displayName = "LetterPressQuote";

export { LetterPressQuote };
