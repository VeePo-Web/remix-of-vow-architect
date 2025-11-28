import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { Shield, FileCheck, Package } from "lucide-react";

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
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Fully Insured. Fully Transparent.</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 stagger-fade">
            {insuranceItems.map((item, i) => (
              <Card key={i} className="p-6 bg-card border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mb-8">
            <Button variant="outline" size="lg" className="hover-scale">
              <FileCheck size={18} className="mr-2" />
              Download Sample Certificate of Insurance (PDF)
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              I send certificates to your venue and planner in advance—no chasing forms.
            </p>
          </div>

          <Card className="p-6 bg-card/50 border-primary/20">
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
