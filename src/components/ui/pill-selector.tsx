import { cn } from "@/lib/utils";

interface PillOption {
  id: string;
  label: string;
}

interface PillSelectorProps {
  options: PillOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  wrap?: boolean;
}

export function PillSelector({
  options,
  value,
  onChange,
  label,
  wrap = true,
}: PillSelectorProps) {
  return (
    <div role="radiogroup" aria-label={label}>
      <div className={cn("flex gap-2", wrap && "flex-wrap")}>
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              className={cn(
                "px-4 py-2 text-[0.625rem] tracking-[0.14em] uppercase font-light border",
                "transition-all duration-200 rounded-none",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
                selected
                  ? "border-primary/60 text-foreground bg-primary/[0.06]"
                  : "border-border/60 text-muted-foreground hover:border-muted-foreground hover:text-foreground bg-transparent"
              )}
              style={
                selected
                  ? {
                      boxShadow:
                        "0 0 10px hsl(var(--vow-yellow) / 0.08), inset 0 0 0 1px hsl(var(--primary) / 0.2)",
                    }
                  : undefined
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
