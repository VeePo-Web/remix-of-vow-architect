import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DirectionalLink } from "@/components/DirectionalLink";

const topTenFAQs = [
  {
    question: "Will every word carry outdoors?",
    answer: "Yes. Wind and distance make it difficult for guests to hear unaided vows. I include a dedicated wireless system, balanced in real time so every word carries — even to the last row.",
    link: { to: "/proof", label: "See how I prepare" }
  },
  {
    question: "What if the venue has no power?",
    answer: "I use a silent battery system — no noise, no permits required, completely quiet during your ceremony.",
    link: { to: "/proof", label: "See the equipment" }
  },
  {
    question: "What happens if equipment fails?",
    answer: "I bring triple redundancy: a second microphone, a second amplifier, a second instrument, and a pre-loaded speaker for critical cues.",
    link: { to: "/proof", label: "See the redundancy plan" }
  },
  {
    question: "Can I cancel or change my mind after booking?",
    answer: "Yes. Full refund within 14 days. After that, your deposit converts to transferable credit. Clear timelines are documented in your agreement.",
    link: { to: "/pricing", label: "See the terms" }
  },
  {
    question: "How do I know my officiant will be coordinated?",
    answer: "I co-author your cue sheet with your officiant and planner — every entrance, every vow, every exit is timed and agreed upon in advance.",
    link: { to: "/proof", label: "See a sample plan" }
  },
  {
    question: "Will people in the back hear our vows?",
    answer: "Yes. I measure and verify volume levels at multiple distances during setup to ensure clarity reaches every seat.",
    link: { to: "/proof", label: "See the documentation" }
  },
  {
    question: "What if it rains or snows?",
    answer: "All equipment is weather-protected. We agree on a Plan B location in advance, and I can relocate within minutes.",
    link: { to: "#weather", label: "Weather contingency details" }
  },
  {
    question: "Can I see an example plan before I commit?",
    answer: "Yes. You can download a real sample ceremony plan to see exactly what you will receive.",
    link: { to: "/proof", label: "Download a sample" }
  },
  {
    question: "How quickly do I hear back after reaching out?",
    answer: "Within 24 hours, you receive a personalized ceremony plan — venue considerations, suggested arrangements, and a timeline for your day.",
    link: { to: "/contact", label: "Hold my date" }
  },
  {
    question: "How does a ceremony pianist compare to a DJ or band?",
    answer: "The simplest question to ask any alternative: how do they ensure your outdoor vows are heard without generator noise? The comparison chart on the pricing page outlines the differences.",
    link: { to: "/pricing", label: "See the comparison" }
  }
];

export function FAQTopTen() {
  return (
    <section className="section--default section-padding grain">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-4">Your concerns, addressed before you ask.</h2>
          <div className="chapter-rule mx-auto mb-12" />

          <Accordion type="single" collapsible className="space-y-4">
            {topTenFAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">{faq.answer}</p>
                  <DirectionalLink to={faq.link.to}>{faq.link.label}</DirectionalLink>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
