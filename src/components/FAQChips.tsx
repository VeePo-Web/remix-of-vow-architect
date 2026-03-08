import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const chips = [
  {
    question: "Will every word be heard clearly?",
    answer: "Yes. I include a dedicated wireless system, balanced in real time so every word carries.",
    link: { to: "/gallery", label: "See how I prepare" }
  },
  {
    question: "What if there is no power?",
    answer: "I use a silent battery system with backups — completely quiet.",
    link: { to: "/gallery", label: "See the equipment" }
  },
  {
    question: "Can I change my arrangement later?",
    answer: "Yes. Upgrade up to 2 weeks before your date.",
    link: { to: "/pricing", label: "See the options" }
  },
  {
    question: "What is the refund policy?",
    answer: "Full refund within 14 days. After that, your deposit becomes transferable credit.",
    link: { to: "/terms", label: "See the terms" }
  },
  {
    question: "Do I receive a plan — or just a performance?",
    answer: "You receive a personalized ceremony plan within 24 hours — venue, timeline, and arrangements.",
    link: { to: "/gallery", label: "See a sample plan" }
  }
];

export function FAQChips() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="overline text-center mb-2">Quick Answers</div>
          <h2 className="text-center mb-2">Common questions.</h2>
          <div className="chapter-rule mx-auto" />
          <p className="text-[15px] text-center text-muted-foreground mb-8 leading-relaxed">
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
                    className={`cursor-pointer transition-all duration-[180ms] hover:bg-primary/10 px-4 py-2.5 text-sm font-display ${
                      openIndex === index ? "bg-primary/10 border-primary/50 shadow-[0_0_12px_rgba(255,224,138,0.08)]" : ""
                    }`}
                  >
                    {chip.question}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 max-w-2xl mx-auto">
                  <div className="bg-card/80 backdrop-blur-[8px] border border-border/50 rounded-lg p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
                    <p className="text-[15px] text-muted-foreground mb-3 leading-relaxed">{chip.answer}</p>
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
