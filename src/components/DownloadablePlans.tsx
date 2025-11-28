import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";

const samplePlans = [
  {
    title: "SPL Report + Cue Sheet",
    venue: "Cascade Gardens (Banff Mode)",
    description: "Complete acoustic protocol with dBA readings",
  },
  {
    title: "Timeline PDF with Seating Arc",
    venue: "Cochrane Ranch",
    description: "Visual layout and minute-by-minute timing",
  },
  {
    title: "Planner Co-signed Cue Map",
    venue: "Canmore Hall",
    description: "Coordinated entrance/exit timing document",
  },
];

export function DownloadablePlans() {
  return (
    <section className="section--surface section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">You Don't Get a Musician—You Get a Plan.</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 stagger-fade">
            {samplePlans.map((plan, i) => (
              <Card key={i} className="p-6 bg-card border-border hover-scale group cursor-pointer">
                <div className="aspect-[3/4] bg-muted rounded-md flex flex-col items-center justify-center mb-4 group-hover:bg-muted/70 transition-colors">
                  <FileText className="text-muted-foreground mb-2" size={48} />
                  <Download className="text-muted-foreground/50" size={20} />
                </div>
                <h3 className="font-bold mb-1">{plan.title}</h3>
                <p className="text-sm text-primary mb-2">{plan.venue}</p>
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/contact">
              <Button size="lg" className="hover-scale">
                Want your venue's SPL plan? → Hold my date now
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
            Delivered within 24 hours after booking, these documents turn "I hope" into "we're covered."
          </p>
        </div>
      </div>
    </section>
  );
}
