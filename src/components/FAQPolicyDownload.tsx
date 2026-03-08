import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const policyItems = [
  "Refund structure: full refund within 14 days; transferable credit after that, with clear timelines.",
  "Weather relocation: pre-approved backup positions and timing, agreed in advance.",
  "Redundancy: triple failover across wireless, sound system, and instrument.",
  "Flexibility: upgrade your arrangement up to 2 weeks before your ceremony.",
  "Response commitment: written confirmation and personalized plan within 24 hours."
];

export function FAQPolicyDownload() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="overline text-center mb-2">Policies</div>
          <h2 className="text-center mb-2">Total transparency — my full booking terms.</h2>
          <div className="chapter-rule mx-auto mb-12" />

          <div className="bg-card/80 backdrop-blur-[8px] border border-border/50 rounded-lg p-8 card-sacred">
            <ul className="space-y-4 mb-8">
              {policyItems.map((item, index) => (
                <li key={index} className="flex gap-3">
                  {/* Golden diamond instead of generic checkmark */}
                  <span
                    className="shrink-0 mt-1.5 w-2.5 h-2.5 rotate-45"
                    style={{
                      background: "hsl(var(--vow-yellow) / 0.7)",
                      boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.3)",
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-[15px] text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" variant="primary-dark" className="hover-scale" asChild>
              <a href="/terms">
                <FileDown className="w-4 h-4 mr-2" />
                Read my full booking terms
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
