import { Card } from "@/components/ui/card";
import { Mic, Zap, Piano, Speaker, ArrowDown } from "lucide-react";

const failoverTiers = [
  {
    icon: Mic,
    tier: "Primary Chain",
    description: "Officiant/vow mic → live mix → battery amp → piano",
    highlight: true,
  },
  {
    icon: Zap,
    tier: "Failover #1",
    description: "Secondary amp + mic chain (independent channel)",
    highlight: false,
  },
  {
    icon: Piano,
    tier: "Failover #2",
    description: "Secondary keyboard (analog fallback)",
    highlight: false,
  },
  {
    icon: Speaker,
    tier: "Failover #3",
    description: "Portable speaker with pre-loaded processional & recessional",
    highlight: false,
  },
];

export function RedundancyStack() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Backup on Backup on Backup.</h2>
          
          <div className="space-y-4 mb-8">
            {failoverTiers.map((tier, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <Card 
                  className={`p-6 bg-card border-border ${
                    tier.highlight ? 'ring-2 ring-primary/30' : 'opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tier.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <tier.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{tier.tier}</h3>
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
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20 text-center">
            <p className="text-foreground font-medium">
              Every tier includes physical, electrical, and musical redundancy. I don't hope—I duplicate.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
