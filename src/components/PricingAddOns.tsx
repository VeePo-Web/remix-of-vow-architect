import { Card } from "./ui/card";
import { Music, Clock, MapPin } from "lucide-react";
import { StaggerChildren } from "@/components/animation";

const addOns = [
  {
    icon: Music,
    title: "Special Song Request",
    price: "$75–$150",
    description: "A song outside my standard repertoire, learned and rehearsed for your ceremony. Submit at least 8 weeks prior — I will confirm feasibility within 7 days.",
  },
  {
    icon: Clock,
    title: "Short-Notice Booking",
    price: "+$250 (under 8 weeks)",
    description: "For ceremonies booked within 8 weeks — covers accelerated preparation and plan coordination.",
  },
  {
    icon: MapPin,
    title: "Travel Fee",
    price: "Quoted per km",
    description: "Applies to venues outside the Calgary–Cochrane–Canmore corridor. (No fee within 50 km of Cochrane.)",
  },
];

export function PricingAddOns() {
  return (
    <section id="addons" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="h2 text-center mb-12">
          Personalize your sound experience
        </h2>

        <StaggerChildren staggerDelay={100} className="grid md:grid-cols-2 gap-6">
          {addOns.map((addon, index) => (
            <Card
              key={index}
              className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <addon.icon size={24} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-medium mb-1">{addon.title}</h3>
                  <p className="font-display text-2xl font-light text-primary mb-3">
                    {addon.price}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </StaggerChildren>

        <p className="text-center text-sm text-muted-foreground mt-8 italic">
          You'll never see a surprise fee. Ever.
        </p>
      </div>
    </section>
  );
}
