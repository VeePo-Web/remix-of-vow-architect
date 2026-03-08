import { Card } from "./ui/card";
import { DirectionalLink } from "./DirectionalLink";
import { StaggerChildren } from "@/components/animation";

const packages = [
  { name: "The Ceremony", price: 650 },
  { name: "The Prelude", price: 750 },
  { name: "The Story", price: 1200 },
];

export function PricingPreview() {
  return (
    <section className="section--surface py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="overline text-center mb-2">The Offering</div>
        <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3 mx-auto">
          Three paths to presence.
        </h2>
        <div className="chapter-rule mx-auto mb-12" />

        <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg, index) => (
            <Card key={index} className="p-8 text-center bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-sacred-hover transition-all duration-[180ms]">
              <h3 className="font-display text-lg font-medium mb-4">{pkg.name}</h3>
              <p className="font-display text-[clamp(32px,4vw,48px)] font-light text-primary mb-2">
                ${pkg.price}
              </p>
            </Card>
          ))}
        </StaggerChildren>

        <p className="text-center text-[14px] text-muted-foreground mb-8 italic leading-relaxed">
          Includes mic, power, SPL, backups, and bylaw-aware mixing.
        </p>

        <div className="text-center space-y-2 mb-8">
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            50% deposit · Refundable within 14 days · Upgrade anytime · Balance due 14 days prior.
          </p>
        </div>

        <div className="flex justify-center">
          <DirectionalLink to="/pricing">See all paths and policies</DirectionalLink>
        </div>
      </div>
    </section>
  );
}
