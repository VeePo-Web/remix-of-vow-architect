interface AvailabilityBadgeProps {
  status: "available" | "hold" | "booked";
}

export function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const config = {
    available: {
      label: "Available",
      color: "text-[#22C55E]",
      dotColor: "bg-[#22C55E]",
    },
    hold: {
      label: "On Hold",
      color: "text-[#F59E0B]",
      dotColor: "bg-[#F59E0B]",
    },
    booked: {
      label: "Booked",
      color: "text-muted-foreground",
      dotColor: "bg-muted-foreground",
    },
  };

  const { label, color, dotColor } = config[status];

  return (
    <div className="absolute top-3 right-3 flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
      <div className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
      <span className={`text-xs font-medium ${color}`}>{label}</span>
    </div>
  );
}
