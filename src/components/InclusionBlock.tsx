import { StaggerChildren } from "@/components/animation";

const inclusions = [
  { 
    label: "Live piano",
    description: "Full 88-key instrument — or venue piano if it meets the standard"
  },
  { 
    label: "Clarity for every word",
    description: "Wireless sound for your officiant and personal vows — every word heard, naturally"
  },
  { 
    label: "Silent power",
    description: "Battery-powered system — quiet, clean, and unobtrusive throughout your ceremony"
  },
  { 
    label: "Volume documentation",
    description: "Three verified readings across the ceremony — proof that it carried"
  },
  { 
    label: "Early arrival",
    description: "At least 60 minutes before guests — setup, final adjustments, and walk-through"
  },
  { 
    label: "Redundancy",
    description: "Backup systems at every level — layered assurance so nothing is left to chance"
  },
  { 
    label: "Full insurance",
    description: "$2M professional liability, $2M general liability, $25k equipment coverage"
  },
  { 
    label: "Collaborative cue sheet",
    description: "Co-authored with your planner and officiant — every moment choreographed"
  },
];

function GoldenDiamond() {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rotate-45 flex-shrink-0 mt-1.5"
      style={{
        background: "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.25)",
      }}
      aria-hidden="true"
    />
  );
}

export function InclusionBlock() {
  return (
    <div className="bg-card/80 backdrop-blur-[8px] border border-primary/10 rounded-lg p-8 mb-8 card-sacred">
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
          <div key={i} className="flex items-start gap-3">
            <GoldenDiamond />
            <div>
              <h3 className="font-display text-base font-medium mb-1">{item.label}</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </StaggerChildren>

      <p className="text-center text-[14px] text-muted-foreground italic">
        No hidden fees. No surprises. This is your baseline of assurance.
      </p>
    </div>
  );
}
