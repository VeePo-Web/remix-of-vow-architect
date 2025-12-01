import { Card } from "@/components/ui/card";
import { Music, Users, FileText } from "lucide-react";
import { StaggerChildren } from "@/components/animation";

const systemParts = [
  {
    icon: Music,
    title: "Curated Acoustic Set",
    description: "Handpicked piano pieces that project naturally outdoors—balanced tempos, no muddy low end, and dynamics that travel.",
  },
  {
    icon: Users,
    title: "Seating Arc Logic",
    description: "A semicircular proximity layout so words and music carry; we reduce distance and angle the \"first row\" for line-of-sight and sound.",
  },
  {
    icon: FileText,
    title: "Cue-Sheet Discipline",
    description: "Entrances, vows, and exits follow time-based cues, not \"wait for the chorus.\" Your officiant and I coordinate ahead of time.",
  },
];

export function BanffModeSystemDiagram() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Assured Ceremony Audio™—even without power
            </h2>
            <p className="lead text-muted-foreground">
              Banff Mode™ is my acoustic-only protocol engineered for audibility and flow without any electricity.
            </p>
            <div className="chapter-rule mx-auto mt-6" />
          </div>

          <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6">
            {systemParts.map((part, index) => {
              const Icon = part.icon;
              return (
                <Card key={index} className="p-6 text-center bg-card border-border card-keyline hover-scale">
                  <Icon className="mx-auto mb-4 text-primary" size={32} />
                  <h4 className="font-bold mb-3">{part.title}</h4>
                  <p className="text-sm text-muted-foreground">{part.description}</p>
                </Card>
              );
            })}
          </StaggerChildren>

          <Card className="p-6 bg-accent/10 border-accent/20 text-center">
            <blockquote className="text-lg font-medium italic">
              "Our Banff ceremony felt like a cathedral in the forest—no tech, all clarity."
            </blockquote>
            <p className="text-sm text-muted-foreground mt-2">
              — Emma & Thomas, Cascade Gardens
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
