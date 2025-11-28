import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const chips = [
  {
    question: "Do I need a mic for vows?",
    answer: "Yes—unless guest count is under ~10 and you're in Banff Mode. I include lapel + handheld, both live-mixed for clarity.",
    link: { to: "/proof", label: "See proof (SPL logs)" }
  },
  {
    question: "What if there's no power?",
    answer: "I run a silent, generator-free battery system with backups.",
    link: { to: "/banff-mode", label: "See Banff Mode" }
  },
  {
    question: "Can I change my package later?",
    answer: "Yes. Upgrade up to 2 weeks before your date.",
    link: { to: "/pricing", label: "See Pricing" }
  },
  {
    question: "What's your refund policy?",
    answer: "14-day full refund on deposit; after that, credit is transferable.",
    link: { to: "#", label: "See Policy PDF" }
  },
  {
    question: "Do I get a plan—or just showtime?",
    answer: "You get a written ceremony-audio plan in 24 hours: SPL, power, mic, cues.",
    link: { to: "/proof", label: "See Sample Plan" }
  }
];

export function FAQChips() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-2">Got a ceremony-audio question?</h2>
          <p className="caption text-center text-muted-foreground mb-8">
            Scroll or tap — every answer links to real evidence.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {chips.map((chip, index) => (
              <Collapsible
                key={index}
                open={openIndex === index}
                onOpenChange={(isOpen) => setOpenIndex(isOpen ? index : null)}
              >
                <CollapsibleTrigger asChild>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer transition-all hover:bg-primary/10 px-4 py-2 text-sm ${
                      openIndex === index ? "bg-primary/10 border-primary/50" : ""
                    }`}
                  >
                    {chip.question}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 max-w-2xl mx-auto">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <p className="text-sm text-muted-foreground mb-3">{chip.answer}</p>
                    <DirectionalLink to={chip.link.to}>{chip.link.label}</DirectionalLink>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
