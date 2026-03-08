import { Shield, Music, Mic, Users, Wrench, Clock, Battery, FileCheck, Activity } from "lucide-react";
import { StaggerChildren } from "@/components/animation";

const inclusions = [
  { 
    icon: Music, 
    label: "Live piano",
    description: "Full 88-key instrument — or venue piano if it meets the standard"
  },
  { 
    icon: Mic, 
    label: "Amplification for vows",
    description: "Wireless microphones for officiant and personal vows — every word heard"
  },
  { 
    icon: Battery, 
    label: "Silent power",
    description: "Battery-powered system — no generator noise during your ceremony"
  },
  { 
    icon: Activity, 
    label: "Volume documentation",
    description: "Three verified readings across the ceremony — proof that it carried"
  },
  { 
    icon: Clock, 
    label: "Early arrival",
    description: "At least 60 minutes before guests — setup, sound check, final walk-through"
  },
  { 
    icon: Wrench, 
    label: "Redundancy",
    description: "Backup amplifier, microphone, and instrument — layered assurance"
  },
  { 
    icon: Shield, 
    label: "Full insurance",
    description: "$2M professional liability, $2M general liability, $25k equipment coverage"
  },
  { 
    icon: FileCheck, 
    label: "Collaborative cue sheet",
    description: "Co-authored with your planner and officiant — every moment choreographed"
  },
];

export function InclusionBlock() {
  return (
    <div className="bg-card/80 backdrop-blur-[8px] border border-primary/10 rounded-lg p-8 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="text-center mb-8">
        <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">
          Every path includes the same devoted preparation.
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          I bring everything required so you never have to think about sound, power, or logistics on your day.
        </p>
      </div>

      <StaggerChildren staggerDelay={80} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {inclusions.map((item, i) => (
          <div key={i} className="flex flex-col items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/[0.06] border border-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display text-base font-medium mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </StaggerChildren>

      <p className="text-center text-sm text-muted-foreground italic">
        No upsell. No surprises. No wires. This is your base level of assurance.
      </p>
    </div>
  );
}
