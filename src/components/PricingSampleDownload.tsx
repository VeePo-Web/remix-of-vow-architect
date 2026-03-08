import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Download, FileText, Activity, Mic } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Volume Documentation",
    description: "Three verified readings with timestamps",
  },
  {
    icon: FileText,
    title: "Cue Sheet",
    description: "Co-authored with your planner",
  },
  {
    icon: Mic,
    title: "Ceremony Plan",
    description: "Venue, power, and timeline notes",
  },
];

export function PricingSampleDownload() {
  return (
    <section id="download" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">
            See what a ceremony plan looks like.
          </h2>
          <p className="font-sans text-[15px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Download a real plan from a recent ceremony — venue considerations, timeline, and documentation included.
          </p>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/[0.06] border border-primary/10 flex items-center justify-center mb-3">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display text-base font-medium mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button size="lg" variant="primary-dark" className="gap-2 hover-scale">
              <Download size={20} />
              Download a sample ceremony plan
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
