import { Mic, Battery, Activity } from "lucide-react";
import { DirectionalLink } from "./DirectionalLink";
import { Card } from "./ui/card";
import { StaggerChildren } from "@/components/animation";

const systemCards = [
  {
    icon: Mic,
    title: "Every word carries — even outdoors.",
    description: "I position and balance sound so your vows land clearly in every seat, without feeling amplified or unnatural.",
  },
  {
    icon: Battery,
    title: "Silent power, zero interruptions.",
    description: "Battery-powered systems with on-site backups ensure clean, quiet operation throughout your ceremony.",
  },
  {
    icon: Activity,
    title: "Verified at three key moments.",
    description: "I check volume during the Prelude, Vows, and Recessional — adjusting in real time so every phase sounds exactly right.",
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
            <DirectionalLink to="/faq">See full FAQ</DirectionalLink>
            <DirectionalLink to="/gallery">See how I prepare</DirectionalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
