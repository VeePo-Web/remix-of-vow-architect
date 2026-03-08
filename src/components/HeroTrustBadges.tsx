import { Check, Mic, Battery, Activity, ShieldCheck } from "lucide-react";

const badges = [
  { icon: Mic, label: "Sound system included" },
  { icon: Battery, label: "Silent battery power" },
  { icon: Activity, label: "Volume verified at three key moments" },
  { icon: ShieldCheck, label: "Fully insured — $2M liability + $25k equipment" },
];

export function HeroTrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm"
        >
          <Check size={16} className="text-accent shrink-0 mt-0.5" />
          <span className="text-sm font-medium leading-tight">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
