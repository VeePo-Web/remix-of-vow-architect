import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const inclusions = [
  "Co-authored cue sheet with your officiant and planner",
  "Early arrival and a quick acoustic walk-through",
  "Redundant analog instrument contingency (backup keyboard on site)",
  "Seating placement check for projection and wind considerations",
  "Dynamic projection routine (my performance approach adjusts to guests and setting)",
];

export function BanffInclusionsList() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Banff Mode still means fully directed ceremony sound.
            </h2>
            <div className="chapter-rule mx-auto" />
          </div>

          <div className="space-y-4">
            {inclusions.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                <Check className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <Card className="p-6 bg-accent/10 border-accent/20">
            <p className="text-center text-lg font-medium">
              Just because there's no mic doesn't mean there's no sound strategy—we simply engineer the room outdoors.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
