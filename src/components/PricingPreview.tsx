import { Card } from "./ui/card";
import { DirectionalLink } from "./DirectionalLink";

const packages = [
  { name: "Ceremony Only", price: 650 },
  { name: "Essentials (Pre + Ceremony)", price: 750 },
  { name: "Full Day (Pre, Ceremony, Cocktail, Dinner)", price: 1200 },
];

export function PricingPreview() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Three quick picks
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8 stagger-fade">
          {packages.map((pkg, index) => (
            <Card key={index} className="p-8 text-center hover-scale">
              <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
              <p className="text-4xl font-bold price-numeral mb-2">
                ${pkg.price}
              </p>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-8 italic">
          Includes mic, power, SPL, backups, and bylaw-aware mixing.
        </p>

        <div className="text-center space-y-2 mb-8">
          <p className="text-sm text-muted-foreground">
            50% deposit • Refundable within 14 days • Upgrade/add-ons anytime • Balance due 14 days prior.
          </p>
        </div>

        <div className="flex justify-center">
          <DirectionalLink to="/pricing">See all packages & policies</DirectionalLink>
        </div>
      </div>
    </section>
  );
}
