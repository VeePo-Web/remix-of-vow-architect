import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DirectionalLink } from "@/components/DirectionalLink";

const topTenFAQs = [
  {
    question: "Do I need a mic for an outdoor ceremony?",
    answer: "Yes. Wind and distance kill intelligibility. I include lapel + handheld, live-mixed so words land at the back row—politely.",
    link: { to: "/proof", label: "Proof & Trust › SPL Logs" }
  },
  {
    question: "What if the venue has no power or PA?",
    answer: "My rig is silent battery—no generators, no permits, no hum. Banff-legal when amplification is prohibited.",
    link: { to: "/faq", label: "FAQ — Banff Mode™ Explained" }
  },
  {
    question: "What happens if your gear fails?",
    answer: "I bring triple redundancy: second mic chain, second amp, second keyboard, plus a pre-loaded speaker for critical cues.",
    link: { to: "/proof", label: "Proof & Trust › Redundancy Protocol" }
  },
  {
    question: "Can I cancel or downgrade after booking?",
    answer: "Yes. 14-day full refund on deposit, then transferable credit. Clear timelines in your policy PDF.",
    link: { to: "/pricing", label: "Pricing & Packages › Terms" }
  },
  {
    question: "How do I know my officiant will be coordinated?",
    answer: "I co-author your cue sheet with your officiant and planner—time-coded entrances, vows, exits.",
    link: { to: "/proof", label: "Proof & Trust › Real Plans" }
  },
  {
    question: "Will people in the back hear our vows?",
    answer: "Yes. My SPL-aware mixing targets 55–65 dBA for vows, proven at 20–30 m depending on venue.",
    link: { to: "/proof", label: "Proof & Trust › SPL Example" }
  },
  {
    question: "What if it rains or snows?",
    answer: "Covered gear, relocatable layout, and a pre-agreed Plan B. We move in minutes, not hours.",
    link: { to: "#weather", label: "FAQ › Weather Contingency" }
  },
  {
    question: "Can I see a plan before I commit?",
    answer: "Yes. Download a real sample plan with SPL log + cue sheet.",
    link: { to: "/proof", label: "Proof & Trust › Sample Download" }
  },
  {
    question: "How fast do I get confirmation after booking?",
    answer: "Within 24 hours you receive your PDF ceremony-audio plan with SPL / power / mic / cue notes.",
    link: { to: "/contact", label: "Contact / Hold Your Date" }
  },
  {
    question: "How do I compare this to a DJ or band?",
    answer: "Ask them for a SPL log, a battery/no-generator plan, and backup stack details. Then see my chart.",
    link: { to: "/pricing", label: "Pricing › Compare Vendors" }
  }
];

export function FAQTopTen() {
  return (
    <section className="section--default section-padding grain">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-4">Your concerns, solved before you ask.</h2>
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
