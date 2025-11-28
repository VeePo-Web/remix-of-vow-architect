import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, CheckCircle2 } from "lucide-react";

export function ResourcesPlannerModule() {
  const handleShare = () => {
    const subject = encodeURIComponent("Ceremony Audio Planning Tools from Parker Wedding Piano");
    const body = encodeURIComponent(
      "Hi,\n\nI wanted to share these ceremony planning resources from Parker Wedding Piano. They include SPL logs, cue sheets, and compliance checklists used at real Alberta weddings.\n\nDownload here: [Your URL]\n\nBest,\n[Your Name]"
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section--default section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Planners: use these with every couple</h2>
            <div className="chapter-rule mx-auto mb-6" />
            <p className="lead text-muted-foreground max-w-2xl mx-auto">
              Over 40 Alberta planners and coordinators rely on these assets to ensure setup, 
              cue accuracy, and risk mitigation—with zero learning curve.
            </p>
          </div>

          <Card className="card-keyline bg-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Share these tools with clients or venues</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Pre-approved by 40+ venues across Alberta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Designed for non-technical couples and venue coordinators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Reduces back-and-forth questions by 70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Compatible with all major planning software</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <Button size="lg" onClick={handleShare} className="w-full hover-scale">
                  <Share2 size={18} className="mr-2" />
                  Send these to a client or venue
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Opens your email client with shareable links
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Keywords: <span className="text-foreground">ceremony planning toolkit download</span> • 
              <span className="text-foreground"> cue sheet for wedding audio</span> • 
              <span className="text-foreground"> SPL compliant wedding musician</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
