import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";

const splReadings = [
  {
    phase: "Prelude",
    range: "35–45 dBA",
    description: "Baseline for guest arrival",
    level: 30,
  },
  {
    phase: "Vows",
    range: "55–65 dBA",
    description: "Intelligibility window",
    level: 60,
  },
  {
    phase: "Recessional",
    range: "70–75 dBA max",
    description: "Celebratory peak",
    level: 80,
  },
];

export function SPLTriptych() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll variant="up">
            <h2 className="h2 mb-4 text-center">Clarity. Documented.</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              I measure and log sound pressure levels at three critical moments—Prelude, Vows, and Recessional—so you (and your venue) can verify both audibility and policy compliance. These logs are especially valuable for Parks Canada and other strict-sound venues.
            </p>
          </RevealOnScroll>

          <StaggerChildren staggerDelay={120} className="grid md:grid-cols-3 gap-6 mb-8">
            {splReadings.map((reading, i) => (
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms]">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="text-primary" size={24} />
                  <h3 className="font-display text-lg font-medium">{reading.phase}</h3>
                </div>
                <div className="font-display text-[clamp(24px,3vw,32px)] font-light text-primary mb-2">{reading.range}</div>
                <p className="text-sm text-muted-foreground mb-4">{reading.description}</p>
                
                <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden shadow-[0_0_8px_hsl(var(--vow-yellow)/0.1)]">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-500"
                    style={{ width: `${reading.level}%` }}
                  />
                </div>
              </Card>
            ))}
          </StaggerChildren>

          <RevealOnScroll variant="up" delay={200}>
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              Logged with a professional dBA meter, timestamped and archived in your ceremony-audio plan. (Actual values adapt to venue, wind, and guest count.)
            </p>

            <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
              <p className="italic text-foreground mb-3">
                "We used the SPL log in our permit application—approved instantly."
              </p>
              <div className="flex items-center gap-3">
                <TestimonialAvatar
                  alt="Elise"
                  fallback="E"
                />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Elise</p>
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
