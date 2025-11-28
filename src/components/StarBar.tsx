import { Star } from "lucide-react";

interface StarBarProps {
  rating?: number;
  className?: string;
}

export function StarBar({ rating = 5, className = "" }: StarBarProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-primary fill-primary" : "text-muted"}
        />
      ))}
    </div>
  );
}
