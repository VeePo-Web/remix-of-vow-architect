import { Button } from "@/components/ui/button";
import { Check, FileDown } from "lucide-react";

const policyItems = [
  "Refund structure: full refund within 14 days; transferable credit after that, with clear timelines.",
  "Weather relocation: pre-approved backup positions and timing, agreed in advance.",
  "Redundancy: triple failover across microphone, amplifier, and instrument.",
  "Flexibility: upgrade your arrangement up to 2 weeks before your ceremony.",
  "Response commitment: written confirmation and personalized plan within 24 hours."
];

export function FAQPolicyDownload() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-2">Total transparency — my full booking terms.</h2>
          <div className="chapter-rule mx-auto mb-12" />

          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <ul className="space-y-4 mb-8">
              {policyItems.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="w-full sm:w-auto">
              <FileDown className="w-4 h-4 mr-2" />
              Download my full policy sheet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
