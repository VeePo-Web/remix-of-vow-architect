import { Card } from "@/components/ui/card";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";

const setupSteps = [
  {
    title: "Cue Sheet & Live Mix",
    description: "Co-authored with your planner and officiant — every entrance, vow, and exit is timed.",
  },
  {
    title: "Silent Battery Power",
    description: "Silent battery power — placement optimized for distance and wind.",
  },
  {
    title: "Natural Projection Layout",
    description: "Seating arranged so words and music carry naturally — without excessive volume.",
  },
];

export function SetupPhotoGallery() {
  return (
    <section className="section--default section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="overline text-center mb-2">Preparation</div>
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">Preparation in practice.</h2>
          <div className="chapter-rule mx-auto mb-12" />
          
          <StaggerChildren staggerDelay={100} as="div" className="space-y-6 mb-10">
            {setupSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-5 group"
              >
                <span
                  className="font-display text-[28px] font-light leading-none select-none flex-shrink-0 pt-1"
                  style={{
                    background: 'linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="border-l border-primary/15 pl-5 py-1 group-hover:border-primary/30 transition-colors duration-[180ms]"
                >
                  <h3 className="font-display text-base font-medium mb-1">{step.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>

          <RevealOnScroll variant="up">
            <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50">
              <blockquote className="border-l-2 border-primary/40 pl-4 mb-4">
                <p className="font-display text-[15px] text-foreground italic leading-relaxed">
                  "Our planner called Parker the most prepared musician she's worked with."
                </p>
              </blockquote>
              <div className="flex items-center gap-3">
                <TestimonialAvatar alt="Miguel" fallback="M" />
                <div className="text-sm">
                  <p className="font-display font-medium text-foreground">Miguel</p>
                  <p className="text-muted-foreground">Deane House</p>
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
