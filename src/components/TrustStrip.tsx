import { Shield, Music, Zap } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Insured" },
  { icon: Music, label: "SOCAN Licensed" },
  { icon: Zap, label: "Redundant Audio Chain" },
];

export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-muted-foreground">
      {trustItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <item.icon size={16} className="text-accent" />
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
