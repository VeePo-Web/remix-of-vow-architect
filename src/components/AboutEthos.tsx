import { Eye, Shield, Clock, Sparkles, Heart } from "lucide-react";

const values = [
  {
    icon: Eye,
    name: "Clarity",
    description: "Every word heard, every cue nailed.",
  },
  {
    icon: Shield,
    name: "Preparation",
    description: "Triple backups. Pre-sent plans. Insurance-ready.",
  },
  {
    icon: Clock,
    name: "Responsiveness",
    description: "Planners in ≤12h. Couples in ≤24h.",
  },
  {
    icon: Sparkles,
    name: "Elegance",
    description: "Gear that disappears. Attention that doesn't.",
  },
  {
    icon: Heart,
    name: "Respect",
    description: "You get married once. I treat it that way.",
  },
];

export function AboutEthos() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {values.map((value, index) => (
        <div key={index} className="flex items-start gap-4">
          <value.icon className="text-primary shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-foreground mb-1">{value.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {value.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
