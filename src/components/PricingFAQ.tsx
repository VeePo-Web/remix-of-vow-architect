import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DirectionalLink } from "./DirectionalLink";

const faqs = [
  {
    question: "Can I start with Ceremony Only and upgrade later?",
    answer: "Yes — upgrade up to 2 weeks before your event. I will adjust your plan and invoice seamlessly.",
  },
  {
    question: "Is my deposit refundable?",
    answer: "Yes — fully refundable for 14 days. After that, it converts to transferable credit. Full policy and timelines are documented on your agreement.",
  },
  {
    question: "What if I cancel?",
    answer: "Your credit can be transferred to a new date or used toward a referred musician — my contract lays out clear percentages by notice window.",
  },
  {
    question: "How does a ceremony pianist compare to a DJ?",
    answer: "The comparison chart above outlines the differences. The simplest question to ask any alternative: how do they ensure your outdoor vows are heard clearly and quietly?",
  },
];

export function PricingFAQ() {
  return (
    <section id="faqs" className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">
          Questions about the investment.
        </h2>
        <p className="font-sans text-[15px] text-muted-foreground text-center mb-8">
          Clarity before commitment — that is the standard I hold.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/40">
              <AccordionTrigger className="text-left font-display text-[18px] font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <DirectionalLink to="/proof">See how I prepare</DirectionalLink>
          <DirectionalLink to="/contact">Reserve My Date!</DirectionalLink>
        </div>
      </div>
    </section>
  );
}
