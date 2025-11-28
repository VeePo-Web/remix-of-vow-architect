import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DirectionalLink } from "@/components/DirectionalLink";

const faqs = [
  {
    question: "Can guests in the back hear us without a mic?",
    answer: "Yes. I seat by proximity arc and play a projection-friendly set so vows and music carry naturally. (I'll show you the sketch in your plan.)",
  },
  {
    question: "What if it rains?",
    answer: "Banff Mode is covered and relocatable. I prepare a quick Plan B placement with your planner so we move in minutes, not hours.",
  },
  {
    question: "Do we need to tell our officiant?",
    answer: "I handle it. Your officiant gets a one-page cue guide with time-based marks and positioning notes.",
  },
];

export function BanffFAQ() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FAQ: Banff Edition
            </h2>
            <div className="chapter-rule mx-auto" />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center pt-4">
            <p className="text-muted-foreground mb-2">Want more?</p>
            <DirectionalLink to="/faq">
              See the full FAQ / Risk Elimination page
            </DirectionalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
