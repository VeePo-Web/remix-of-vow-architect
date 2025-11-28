import { Shield, Music, Zap } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Insured" },
  { icon: Music, label: "SOCAN-licensed" },
  { icon: Zap, label: "Redundant audio chain" },
];

export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {trustItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <item.icon size={20} className="text-muted-foreground/85" />
          <span className="text-sm font-medium text-muted-foreground/85">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
