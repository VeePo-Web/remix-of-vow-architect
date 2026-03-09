interface StarBarProps {
  rating?: number;
  className?: string;
}

export function StarBar({ rating = 5, className = "" }: StarBarProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-2 h-2 rotate-45"
          style={{
            background:
              i < rating
                ? "hsl(var(--vow-yellow) / 0.8)"
                : "hsl(var(--muted-foreground) / 0.15)",
            boxShadow:
              i < rating
                ? "0 0 4px hsl(var(--vow-yellow) / 0.2)"
                : "none",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
