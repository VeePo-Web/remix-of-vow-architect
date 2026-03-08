import { Card } from "@/components/ui/card";
import { Mic, Zap, Piano, Speaker, ArrowDown } from "lucide-react";
import { StaggerChildren } from "@/components/animation";

const failoverTiers = [
  {
    icon: Mic,
    tier: "Primary System",
    description: "Wireless sound, live balance, battery power, and piano",
    highlight: true,
  },
  {
    icon: Zap,
    tier: "Second System",
    description: "Independent backup wireless unit and sound system on a separate channel",
    highlight: false,
  },
  {
    icon: Piano,
    tier: "Acoustic Fallback",
    description: "Second keyboard ready — music never stops",
    highlight: false,
  },
  {
    icon: Speaker,
    tier: "Emergency Playback",
    description: "Portable speaker with your processional and recessional pre-loaded",
    highlight: false,
  },
];

export function RedundancyStack() {
  return (
    <section className="section--default section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="h2 mb-4 text-center">Backup on Backup on Backup.</h2>
          
          <StaggerChildren staggerDelay={100} as="div" className="space-y-4 mb-8">
            {failoverTiers.map((tier, i) => (
              <div key={i}>
                <Card 
                  className={`p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-[180ms] ${
                    tier.highlight ? 'ring-2 ring-primary/30 hover:shadow-[0_0_24px_rgba(255,224,138,0.06)]' : 'opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tier.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <tier.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium mb-1">{tier.tier}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                </Card>
                
                {i < failoverTiers.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="text-muted-foreground/50" size={20} />
                  </div>
                )}
              </div>
            ))}
          </StaggerChildren>

          <Card className="p-6 bg-primary/5 border-primary/20 text-center backdrop-blur-[8px]">
            <p className="text-foreground font-medium">
              Every tier includes physical, electrical, and musical redundancy. I don't hope—I duplicate.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
