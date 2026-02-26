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
    answer: "Yes—upgrade up to 2 weeks before your event. I'll adjust your plan and invoice seamlessly.",
  },
  {
    question: "Is my deposit refundable?",
    answer: "Yes—fully refundable for 14 days. After that, it converts to transferable credit. (Full policy and timelines are documented on your agreement.)",
  },
  {
    question: "What if I cancel?",
    answer: "Your credit can be transferred to a new date or used toward a referred vendor—my contract lays out clear percentages by notice window.",
  },
  {
    question: "How do I compare this to a DJ?",
    answer: "Use the chart above—and ask any DJ for their SPL log and battery/no-generator plan for outdoor vows.",
  },
];

export function PricingFAQ() {
  return (
    <section id="faqs" className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="h2 text-center mb-12">
          Frequently Asked Pricing Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <DirectionalLink to="/gallery">View SPL Logs</DirectionalLink>
          <DirectionalLink to="/contact">Hold Your Date</DirectionalLink>
        </div>
      </div>
    </section>
  );
}
