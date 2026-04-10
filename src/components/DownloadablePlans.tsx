import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StaggerChildren } from "@/components/animation";

const samplePlans = [
  {
    title: "Volume Documentation & Cue Sheet",
    venue: "Cascade Gardens",
    description: "Verified readings with timestamps and ceremony timeline",
  },
  {
    title: "Ceremony Timeline with Seating Plan",
    venue: "Cochrane Ranch",
    description: "Visual layout and minute-by-minute timing",
  },
  {
    title: "Planner-Coordinated Cue Map",
    venue: "Canmore Hall",
    description: "Co-authored entrance, vow, and exit timing",
  },
];

export function DownloadablePlans() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="overline text-center mb-2">Downloads</div>
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-3">You do not get a musician — you get a plan.</h2>
          <div className="chapter-rule mx-auto mb-12" />
          
          <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6 mb-8">
            {samplePlans.map((plan, i) => (
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 transition-all duration-[180ms] group cursor-pointer">
                {/* Gold numeral */}
                <span
                  className="font-display text-[28px] font-light leading-none select-none block mb-4"
                  style={{
                    background: 'linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Letterpress insert */}
                <div
                  className="border-l-2 pl-4 py-3 mb-4 group-hover:border-l-primary/40 transition-colors duration-[180ms]"
                  style={{
                    borderLeftColor: 'hsl(var(--vow-yellow) / 0.25)',
                    background: 'hsl(var(--muted) / 0.3)',
                  }}
                >
                  <p className="font-display text-[13px] font-medium text-foreground/80 leading-snug">
                    {plan.title}
                  </p>
                </div>

                <p className="text-[14px] text-primary mb-2">{plan.venue}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{plan.description}</p>
              </Card>
            ))}
          </StaggerChildren>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/contact">
              <Button size="lg" variant="primary-dark" className="hover-scale">
                Reserve My Date!
              </Button>
            </Link>
          </div>

          <p className="text-[14px] text-muted-foreground text-center mt-6 max-w-2xl mx-auto leading-relaxed">
            Delivered within 24 hours after booking, these documents turn "I hope" into "we're covered."
          </p>
        </div>
      </div>
    </section>
  );
}
