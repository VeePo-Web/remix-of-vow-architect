import * as React from "react";
import { cn } from "@/lib/utils";

interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const LuxuryInput = React.forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="luxury-input-wrapper group relative">
        <label
          htmlFor={inputId}
          className={cn(
            "block text-xs tracking-[0.15em] uppercase font-light transition-colors duration-200",
            error ? "text-destructive/70" : "text-muted-foreground group-focus-within:text-primary/60"
          )}
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "luxury-input w-full mt-2 pb-2.5 pt-0 bg-transparent border-0 border-b",
            "text-base font-light text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:ring-0 transition-all duration-300",
            error ? "border-destructive/50" : "border-border/60",
            className
          )}
          {...props}
        />
        {/* Gold focus line — layered below via ::after in CSS */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300",
            "group-focus-within:scale-x-100"
          )}
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--primary) / 0.4))",
          }}
          aria-hidden="true"
        />
        {error && (
          <p className="mt-1 text-xs text-destructive/80 font-light">{error}</p>
        )}
      </div>
    );
  }
);
LuxuryInput.displayName = "LuxuryInput";

interface LuxuryTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const LuxuryTextarea = React.forwardRef<HTMLTextAreaElement, LuxuryTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="luxury-input-wrapper group relative">
        <label
          htmlFor={inputId}
          className={cn(
            "block text-xs tracking-[0.15em] uppercase font-light transition-colors duration-200",
            error ? "text-destructive/70" : "text-muted-foreground group-focus-within:text-primary/60"
          )}
        >
          {label}
        </label>
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "w-full mt-2 pb-2.5 pt-2 bg-transparent border-0 border-b resize-none",
            "text-base font-light text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:ring-0 transition-all duration-300",
            error ? "border-destructive/50" : "border-border/60",
            className
          )}
          {...props}
        />
        <div
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--primary) / 0.4))",
          }}
          aria-hidden="true"
        />
        {error && (
          <p className="mt-1 text-xs text-destructive/80 font-light">{error}</p>
        )}
      </div>
    );
  }
);
LuxuryTextarea.displayName = "LuxuryTextarea";
