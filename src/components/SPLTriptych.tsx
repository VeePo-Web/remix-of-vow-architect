import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";

const splReadings = [
  {
    phase: "Prelude",
    range: "Gentle ambiance",
    description: "Quiet enough for conversation, present enough to set the tone",
    level: 30,
  },
  {
    phase: "Vows",
    range: "Crystal clarity",
    description: "Every word heard — even in the last row",
    level: 60,
  },
  {
    phase: "Recessional",
    range: "Joyful celebration",
    description: "The exhale — music that matches the moment",
    level: 80,
  },
];

export function SPLTriptych() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll variant="up">
            <div className="overline text-center mb-2">Documentation</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">Clarity. Documented.</h2>
            <div className="chapter-rule mx-auto mb-4" />
            <p className="text-[15px] text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              I measure and verify volume levels at three critical moments — Prelude, Vows, and Recessional — so you and your venue can confirm that every word carries.
            </p>
          </RevealOnScroll>

          <StaggerChildren staggerDelay={120} className="grid md:grid-cols-3 gap-6 mb-8">
            {splReadings.map((reading, i) => (
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/[0.06] border border-primary/10 flex items-center justify-center">
                    <Activity className="text-primary" size={20} />
                  </div>
                  <h3 className="font-display text-lg font-medium">{reading.phase}</h3>
                </div>
                <div className="font-display text-[clamp(24px,3vw,32px)] font-light text-primary mb-2">{reading.range}</div>
                <p className="text-[14px] text-muted-foreground mb-4 leading-relaxed">{reading.description}</p>
                
                <div className="relative w-full h-2.5 bg-muted/60 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${reading.level}%`,
                      background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--vow-yellow)))",
                      boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.2)",
                    }}
                  />
                </div>
              </Card>
            ))}
          </StaggerChildren>

          <RevealOnScroll variant="up" delay={200}>
            <p className="text-[14px] text-muted-foreground text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              Volume is verified with professional instruments, timestamped, and included in your ceremony plan. Readings adapt to your venue, weather, and guest count.
            </p>

            <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
              <blockquote className="border-l-2 border-[hsl(var(--vow-yellow)/0.4)] pl-4 mb-4">
                <p className="font-display text-[15px] text-foreground italic leading-relaxed">
                  "We included the volume documentation in our permit application — approved instantly."
                </p>
              </blockquote>
              <div className="flex items-center gap-3">
                <TestimonialAvatar alt="Elise" fallback="E" />
                <div className="text-sm">
                  <p className="font-display font-medium text-foreground">Elise</p>
                  <p className="text-muted-foreground">Tunnel Mountain</p>
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
