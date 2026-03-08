import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

interface BentoItem {
  id: string;
  label: string;
  description: string;
}

interface BentoSelectorProps {
  items: BentoItem[];
  value: string | undefined;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
  label?: string;
}

export function BentoSelector({ items, value, onChange, columns = 2, label }: BentoSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (index + 1) % items.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (index - 1 + items.length) % items.length;
      } else {
        return;
      }
      onChange(items[nextIndex].id);
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons?.[nextIndex]?.focus();
    },
    [items, onChange]
  );

  return (
    <div role="radiogroup" aria-label={label} ref={containerRef}>
      <div
        className={cn(
          "grid gap-3",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {items.map((item, index) => {
          const isSelected = value === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (!value && index === 0) ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative text-left rounded-lg border p-5 cursor-pointer transition-all duration-[180ms]",
                "hover:-translate-y-px hover:shadow-md",
                "active:scale-[0.98] active:translate-y-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isSelected
                  ? "border-primary/60 bg-primary/[0.04] shadow-[0_0_16px_hsl(var(--vow-yellow)/0.12)] scale-[1.02]"
                  : "border-border/60 bg-card/60 hover:border-muted-foreground/30"
              )}
            >
              <span className="block font-display text-sm font-medium text-foreground leading-snug">
                {item.label}
              </span>
              <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                {item.description}
              </span>
              {/* Selected indicator dot */}
              <span
                className={cn(
                  "absolute top-3 right-3 w-2.5 h-2.5 rounded-full transition-all duration-[80ms]",
                  isSelected
                    ? "bg-primary scale-100 opacity-100"
                    : "bg-muted-foreground/20 scale-75 opacity-50"
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
