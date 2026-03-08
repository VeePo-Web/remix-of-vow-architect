import { Card } from "./ui/card";
import { StaggerChildren } from "@/components/animation";

const addOns = [
  {
    title: "Special Song Request",
    price: "$75–$150",
    description: "A song outside my standard repertoire, learned and rehearsed for your ceremony. Submit at least 8 weeks prior — I will confirm feasibility within 7 days.",
  },
  {
    title: "Short-Notice Booking",
    price: "+$250 (under 8 weeks)",
    description: "For ceremonies booked within 8 weeks — covers accelerated preparation and plan coordination.",
  },
  {
    title: "Travel Fee",
    price: "Quoted per km",
    description: "Applies to venues outside the Calgary–Cochrane–Canmore corridor. No fee within 50 km of Cochrane.",
  },
];

export function PricingAddOns() {
  return (
    <section id="addons" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">
          Personalize your sound experience.
        </h2>
        <p className="font-sans text-[15px] text-muted-foreground text-center mb-8">
          Optional additions — each quoted transparently before you commit.
        </p>

        <StaggerChildren staggerDelay={100} className="grid md:grid-cols-3 gap-6">
          {addOns.map((addon, index) => (
            <Card
              key={index}
              className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-sacred-hover transition-all duration-[180ms]"
            >
              {/* Golden diamond marker */}
              <span
                className="inline-block w-2.5 h-2.5 rotate-45 mb-4"
                style={{
                  background: "hsl(var(--vow-yellow) / 0.7)",
                  boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.25)",
                }}
                aria-hidden="true"
              />
              <h3 className="font-display text-[18px] font-medium mb-1">{addon.title}</h3>
              <p className="font-display text-[clamp(24px,3vw,32px)] font-light text-primary mb-3">
                {addon.price}
              </p>
              <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">
                {addon.description}
              </p>
            </Card>
          ))}
        </StaggerChildren>

        <p className="text-center text-[14px] text-muted-foreground mt-8 italic">
          You will never see a surprise fee. Ever.
        </p>
      </div>
    </section>
  );
}
