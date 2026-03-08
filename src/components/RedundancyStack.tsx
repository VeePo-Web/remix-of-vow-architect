import { Card } from "@/components/ui/card";
import { Mic, Zap, Piano, Speaker } from "lucide-react";
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
          <div className="overline text-center mb-2">Redundancy</div>
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">Backup on Backup on Backup.</h2>
          <div className="chapter-rule mx-auto mb-12" />
          
          <StaggerChildren staggerDelay={100} as="div" className="space-y-3 mb-8">
            {failoverTiers.map((tier, i) => (
              <div key={i}>
                <Card 
                  className={`p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-[180ms] ${
                    tier.highlight ? 'border-primary/30 hover:shadow-[0_0_24px_rgba(255,224,138,0.06)]' : 'opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tier.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/[0.06] border border-primary/10 text-primary'
                    }`}>
                      <tier.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium mb-1">{tier.tier}</h3>
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{tier.description}</p>
                    </div>
                  </div>
                </Card>
                
                {i < failoverTiers.length - 1 && (
                  <div className="flex justify-center py-1.5" aria-hidden="true">
                    <div
                      className="w-px h-6"
                      style={{
                        background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.3), hsl(var(--vow-yellow) / 0.08))",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </StaggerChildren>

          <Card className="p-6 bg-primary/[0.04] border-primary/20 text-center backdrop-blur-[8px]">
            <p className="font-display text-[15px] text-foreground font-medium leading-relaxed">
              Every tier includes physical, electrical, and musical redundancy. I don't hope — I duplicate.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
