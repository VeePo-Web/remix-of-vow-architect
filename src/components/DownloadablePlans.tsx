import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
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
              <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms] group cursor-pointer">
                <div className="aspect-[3/4] bg-muted/40 border border-border/30 rounded-md flex flex-col items-center justify-center mb-4 group-hover:border-primary/20 transition-colors duration-[180ms]">
                  <FileText className="text-muted-foreground/60 mb-2" size={48} />
                  <Download className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors duration-[180ms]" size={20} />
                </div>
                <h3 className="font-display text-base font-medium mb-1">{plan.title}</h3>
                <p className="text-[14px] text-primary mb-2">{plan.venue}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{plan.description}</p>
              </Card>
            ))}
          </StaggerChildren>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/contact">
              <Button size="lg" variant="primary-dark" className="hover-scale">
                Hold my date
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
