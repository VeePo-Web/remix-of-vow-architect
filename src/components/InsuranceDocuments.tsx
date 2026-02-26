import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { Shield, FileCheck, Package } from "lucide-react";
import { StaggerChildren } from "@/components/animation";

const insuranceItems = [
  {
    icon: Shield,
    title: "$2M Professional Liability",
    description: "Covers performance or plan execution failures.",
  },
  {
    icon: Shield,
    title: "$2M General Liability",
    description: "Protects venue, guests, and property.",
  },
  {
    icon: Package,
    title: "$25k Equipment Coverage",
    description: "If anything breaks, it's covered.",
  },
];

export function InsuranceDocuments() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="h2 mb-12 text-center">Fully Insured. Fully Transparent.</h2>
          
          <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6 mb-8">
            {insuranceItems.map((item, i) => (
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms] text-center">
                <div className="w-12 h-12 rounded-full bg-primary/[0.06] border border-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-base font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </StaggerChildren>

          <div className="text-center mb-8">
            <Button variant="outline" size="lg" className="hover-scale">
              <FileCheck size={18} className="mr-2" />
              Download Sample Certificate of Insurance (PDF)
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              I send certificates to your venue and planner in advance—no chasing forms.
            </p>
          </div>

          <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
            <p className="italic text-foreground mb-3">
              "The venue waived their vendor deposit—policy covered everything."
            </p>
            <div className="flex items-center gap-3">
              <TestimonialAvatar
                alt="Jasmine & Colin"
                fallback="JC"
              />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Jasmine & Colin</p>
                <p className="text-muted-foreground">Calgary</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
