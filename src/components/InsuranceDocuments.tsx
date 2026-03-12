import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";

const insuranceItems = [
  {
    title: "$2M Professional Liability",
    description: "Covers performance or plan execution failures.",
  },
  {
    title: "$2M General Liability",
    description: "Protects venue, guests, and property.",
  },
  {
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
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 transition-all duration-[180ms] text-center">
                <span
                  className="font-display text-[32px] font-light leading-none select-none block mb-4"
                  style={{
                    background: 'linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-medium mb-2">{item.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </StaggerChildren>

          <div className="text-center mb-8">
            <Button variant="outline" size="lg" className="hover-scale">
              Download sample certificate of insurance
            </Button>
            <p className="text-[14px] text-muted-foreground mt-3 leading-relaxed">
              I send certificates to your venue and planner in advance — no chasing forms.
            </p>
          </div>

          <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50">
            <blockquote className="border-l-2 border-primary/40 pl-4 mb-4">
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
