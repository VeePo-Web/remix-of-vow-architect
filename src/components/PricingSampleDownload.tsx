import { Button } from "./ui/button";
import { Card } from "./ui/card";

const features = [
  {
    title: "Volume Documentation",
    description: "Three verified readings with timestamps",
  },
  {
    title: "Cue Sheet",
    description: "Co-authored with your planner",
  },
  {
    title: "Ceremony Plan",
    description: "Venue, power, and timeline notes",
  },
];

function GoldenDiamond() {
  return (
    <span
      className="inline-block w-2 h-2 rotate-45 mx-auto mb-3"
      style={{
        background: "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.25)",
      }}
      aria-hidden="true"
    />
  );
}

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

        <Card className="p-8 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <GoldenDiamond />
                <h3 className="font-display text-base font-medium mb-1">{f.title}</h3>
                <p className="text-[14px] text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button size="lg" variant="primary-dark" className="hover-scale">
              Download a sample ceremony plan
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
