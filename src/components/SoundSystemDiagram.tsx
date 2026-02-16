import { Mic, Battery, Activity } from "lucide-react";
import { DirectionalLink } from "./DirectionalLink";
import { Card } from "./ui/card";
import { StaggerChildren } from "@/components/animation";

const systemCards = [
  {
    icon: Mic,
    title: "Live-mixed vows, crystal clear—even in wind.",
    description: "I place and mix your officiant/vow mic so words land without 'shouty' volume.",
  },
  {
    icon: Battery,
    title: "Generator-free, silent battery",
    description: "with ≥2.5× ceremony runtime and on-site backups. No hum. No drama.",
  },
  {
    icon: Activity,
    title: "Measured clarity",
    description: "within local limits; I log three readings (Prelude / Vows / Recessional) and adjust in real time.",
  },
];

export function SoundSystemDiagram() {
  return (
    <section className="section--surface py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <p className="p-lead text-center mb-16 mx-auto text-muted-foreground">
          Ceremony sound isn't guesswork. I prove it with a simple, three-part system.
        </p>

        <StaggerChildren staggerDelay={100} className="grid md:grid-cols-3 gap-8 mb-12">
          {systemCards.map((card, index) => (
            <Card key={index} className="p-8 hover-scale">
              <card.icon size={32} className="text-primary mb-6" />
              <h3 className="h4 mb-4">{card.title}</h3>
              <p className="p-body text-muted-foreground">{card.description}</p>
            </Card>
          ))}
        </StaggerChildren>

        <div className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-semibold border border-accent/20">
            Power & Clarity Guarantee
          </div>
          <p className="text-sm text-muted-foreground">documented, insured, and remedy-backed.</p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <DirectionalLink to="/faq">See Banff Mode™ FAQ</DirectionalLink>
            <DirectionalLink to="/proof">See Proof & Trust</DirectionalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
