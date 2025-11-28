import { Shield, Music, Mic, Users, Wrench } from "lucide-react";

const inclusions = [
  { icon: Shield, label: "$2M liability insurance" },
  { icon: Music, label: "SOCAN licensed repertoire" },
  { icon: Wrench, label: "Backup amp, mic, and instrument on-site" },
  { icon: Users, label: "Pre-ceremony consultation & song selection" },
  { icon: Mic, label: "Real-time coordination with officiant" },
];

export function InclusionBlock() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4">What every package includes</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {inclusions.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div className="flex items-center gap-2">
              <item.icon size={16} className="text-accent flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
