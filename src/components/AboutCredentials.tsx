import { Shield, Activity, MapPin, Mountain, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const credentials = [
  {
    icon: Shield,
    label: "Insurance",
    description: "$2M General + $2M Professional + $25k Gear (certificates on request)",
  },
  {
    icon: Activity,
    label: "SPL System",
    description: "Calibrated Class-2 meter with written logs",
  },
  {
    icon: MapPin,
    label: "Venues (sample)",
    description: "Banff Centre, Stewart Creek, Deane House, Fairmont properties",
  },
  {
    icon: Mountain,
    label: "Parks Canada",
    description: "Acoustic-only compliance via Banff Mode™ (no PA, no generators)",
  },
];

export function AboutCredentials() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {credentials.map((credential, index) => (
          <Card key={index} className="p-6 bg-card border border-border">
            <div className="flex items-start gap-4">
              <credential.icon className="text-primary shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-foreground mb-2">{credential.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {credential.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-3">
        <Button size="lg" variant="outline" className="gap-2">
          <FileDown size={18} />
          Download my compliance packet
        </Button>
        <p className="text-sm text-muted-foreground italic">
          I pre-send documents so your planner never has to chase me.
        </p>
      </div>
    </div>
  );
}
