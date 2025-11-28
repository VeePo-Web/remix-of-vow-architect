import { Star } from "lucide-react";

export function MostSelectedPill() {
  return (
    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/12 px-3 py-1.5 rounded-xl">
      <Star size={8} className="text-primary fill-primary" />
      <span className="text-xs font-semibold text-primary">Most selected</span>
    </div>
  );
}
