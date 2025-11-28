import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How far in advance should we book?",
    answer:
      "For peak wedding season (June-September), I recommend booking 12-18 months in advance. For off-season dates, 6-9 months is typically sufficient. However, I occasionally have last-minute availability.",
  },
  {
    question: "Can you learn a specific song for our ceremony?",
    answer:
      "Absolutely. I maintain an extensive repertoire and am happy to learn new pieces with sufficient notice (typically 4-6 weeks). Custom arrangements are available as an add-on service.",
  },
  {
    question: "What happens if there's a technical issue?",
    answer:
      "I bring complete backup equipment to every event: backup keyboard, backup amplification, backup power. In 200+ ceremonies, I've never had an unrecoverable failure. Your music continues uninterrupted.",
  },
  {
    question: "Do you coordinate with our officiant and wedding planner?",
    answer:
      "Yes. I typically connect with your officiant and coordinator 2-3 weeks before the ceremony to align on timing, cues, and any special requirements. Clear communication ensures seamless execution.",
  },
  {
    question: "What's your attire?",
    answer:
      "I dress to complement your ceremony aesthetic—typically formal black attire (suit or tuxedo). If you have specific attire requests to match your wedding theme, I'm happy to accommodate.",
  },
  {
    question: "What if it rains at our outdoor ceremony?",
    answer:
      "All my equipment is weather-protected and I bring covers for unexpected conditions. However, I recommend having a covered backup location for instrument safety and optimal sound quality.",
  },
];

export default function FAQ() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Breadcrumbs items={[
              { label: "Home", path: "/" },
              { label: "FAQ / Risk Elimination" }
            ]} />

            <div className="text-center mb-16">
              <div className="overline mb-2">FAQ</div>
              <h1 className="mx-auto">Frequently Asked Questions</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                Everything you need to know about ceremony piano services.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <DirectionalLink to="/contact">
                Get in touch
              </DirectionalLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
