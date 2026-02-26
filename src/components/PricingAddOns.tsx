import { Card } from "./ui/card";
import { Music, Clock, MapPin, Mountain } from "lucide-react";

const addOns = [
  {
    icon: Music,
    title: "Learning Fee",
    price: "$75–$150",
    description: "Request a special song outside my standard set. Includes rehearsal and live cue integration. (Submit 8 weeks prior; feasibility confirmed in 7 days.)",
  },
  {
    icon: Clock,
    title: "Expedited Booking",
    price: "+$250 (< 8 weeks)",
    description: "Covers urgent cue review + plan building under timeline pressure.",
  },
  {
    icon: MapPin,
    title: "Travel Fee",
    price: "Quoted per km",
    description: "Applies to venues outside the Calgary–Cochrane–Canmore–Banff corridor. (No fee within 50 km of Cochrane.)",
  },
  {
    icon: Mountain,
    title: "Banff Mode™ Upgrade",
    price: "$0",
    description: "Included where required: acoustic set (no PA/generators) with proximity seating arc and a simple SPL chart in your plan.",
    highlight: true,
  },
];

export function PricingAddOns() {
  return (
    <section id="addons" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="h2 text-center mb-12">
          Personalize your sound experience
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {addOns.map((addon, index) => (
            <Card
              key={index}
              className={`p-6 card-keyline ${
                addon.highlight ? "border-primary/50" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${addon.highlight ? "bg-primary/10" : "bg-muted"}`}>
                  <addon.icon size={24} className={addon.highlight ? "text-primary" : "text-foreground"} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{addon.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-3 price-numeral">
                    {addon.price}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 italic">
          You'll never see a surprise fee. Ever.
        </p>
      </div>
    </section>
  );
}
