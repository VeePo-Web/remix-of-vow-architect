import { Shield, Music, Mic, Users, Wrench, Clock, Battery, FileCheck, Activity } from "lucide-react";

const inclusions = [
  { 
    icon: Music, 
    label: "Live piano",
    description: "88-key digital grand; venue piano fallback if house instrument isn't show-ready"
  },
  { 
    icon: Mic, 
    label: "Officiant + vow mic",
    description: "Wireless lapel + handheld; live-mixed for intelligibility"
  },
  { 
    icon: Battery, 
    label: "Silent battery system",
    description: "Generator-free, with backups"
  },
  { 
    icon: Activity, 
    label: "SPL log",
    description: "Three readings: Prelude / Vows / Recessional"
  },
  { 
    icon: Clock, 
    label: "≥ 60-minute early arrival",
    description: "Setup, sound test, cue checks"
  },
  { 
    icon: Wrench, 
    label: "Backup amp, mic, instrument",
    description: "Layered fail-safes"
  },
  { 
    icon: Shield, 
    label: "Insurance",
    description: "$2M professional + $2M general liability + $25k equipment"
  },
  { 
    icon: FileCheck, 
    label: "Co-authored cue sheet",
    description: "With your planner/officiant"
  },
];

export function InclusionBlock() {
  return (
    <div className="bg-card border border-border rounded-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          All Packages Include Ceremony-Proof Clarity
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          I bring everything required to make vows heard, cues flawless, and plans compliant—without you managing gear, power, or bylaws.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {inclusions.map((item, i) => (
          <div key={i} className="flex flex-col items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        No upsell. No surprises. No wires. This is your base level of assurance.
      </p>
    </div>
  );
}
