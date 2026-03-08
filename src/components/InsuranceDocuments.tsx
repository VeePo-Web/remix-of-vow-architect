import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { Shield, FileCheck, Package } from "lucide-react";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";

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
          <RevealOnScroll variant="up">
            <div className="overline text-center mb-2">Insurance</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">Fully Insured. Fully Transparent.</h2>
            <div className="chapter-rule mx-auto mb-4" />
            <p className="text-[15px] text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              Every performance is backed by comprehensive coverage — sent to your venue and planner before the day arrives.
            </p>
          </RevealOnScroll>
          
          <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6 mb-8">
            {insuranceItems.map((item, i) => (
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-sacred-hover transition-all duration-[180ms] text-center">
                <div className="w-12 h-12 rounded-full bg-primary/[0.06] border border-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-base font-medium mb-2">{item.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </StaggerChildren>

          <div className="text-center mb-8">
            <Button variant="outline" size="lg" className="hover-scale gap-2">
              <FileCheck size={18} />
              Download sample certificate of insurance
            </Button>
            <p className="text-[14px] text-muted-foreground mt-3 leading-relaxed">
              I send certificates to your venue and planner in advance — no chasing forms.
            </p>
          </div>

          <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
            <blockquote className="border-l-2 border-[hsl(var(--vow-yellow)/0.4)] pl-4 mb-4">
              <p className="font-display text-[15px] text-foreground italic leading-relaxed">
                "The venue waived their deposit — policy covered everything."
              </p>
            </blockquote>
            <div className="flex items-center gap-3">
              <TestimonialAvatar alt="Jasmine & Colin" fallback="JC" />
              <div className="text-sm">
                <p className="font-display font-medium text-foreground">Jasmine & Colin</p>
                <p className="text-muted-foreground">Calgary</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
