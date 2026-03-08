import { cn } from "@/lib/utils";

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
  return (
    <div role="radiogroup" aria-label={label}>
      <div
        className={cn(
          "grid gap-3",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {items.map((item) => {
          const isSelected = value === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(item.id)}
              className={cn(
                "relative text-left rounded-2xl border p-5 cursor-pointer transition-all duration-[180ms]",
                "hover:-translate-y-px hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                isSelected
                  ? "border-primary/60 bg-primary/[0.04] shadow-[0_0_16px_hsl(var(--vow-yellow)/0.12)] scale-[1.01]"
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
                  "absolute top-3 right-3 w-2.5 h-2.5 rounded-full transition-all duration-[180ms]",
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
