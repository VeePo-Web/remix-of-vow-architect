import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const chips = [
  {
    question: "Do I need amplification for vows?",
    answer: "Yes. I include wireless microphones, live-mixed so every word carries.",
    link: { to: "/proof", label: "See how I prepare" }
  },
  {
    question: "What if there is no power?",
    answer: "I use a silent battery system with backups — no generators.",
    link: { to: "/proof", label: "See the equipment" }
  },
  {
    question: "Can I change my arrangement later?",
    answer: "Yes. Upgrade up to 2 weeks before your date.",
    link: { to: "/pricing", label: "See the options" }
  },
  {
    question: "What is the refund policy?",
    answer: "Full refund within 14 days. After that, your deposit becomes transferable credit.",
    link: { to: "#", label: "See policy details" }
  },
  {
    question: "Do I receive a plan — or just a performance?",
    answer: "You receive a personalized ceremony plan within 24 hours — venue, timeline, and arrangements.",
    link: { to: "/proof", label: "See a sample plan" }
  }
];

export function FAQChips() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-center mb-2">Common questions.</h2>
          <div className="chapter-rule mx-auto" />
          <p className="caption text-center text-muted-foreground mb-8">
            Tap any question — every answer links to real documentation.
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
