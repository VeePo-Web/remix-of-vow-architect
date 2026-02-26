import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Download, FileText, Activity, Mic } from "lucide-react";

export function PricingSampleDownload() {
  return (
    <section id="download" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="h2 text-center mb-4">
            Still comparing?
          </h2>
          <p className="p-lead text-muted-foreground max-w-2xl mx-auto">
            Download a real SPL log, cue sheet, and plan summary from a recent $750 package—see exactly how I document power, mic placement, and legal clarity.
          </p>
        </div>

        <Card className="p-8 card-keyline">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Activity size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">SPL Log</h3>
              <p className="text-sm text-muted-foreground">
                Three readings with timestamps
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <FileText size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Cue Sheet</h3>
              <p className="text-sm text-muted-foreground">
                Co-authored with planner
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Mic size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Plan Summary</h3>
              <p className="text-sm text-muted-foreground">
                Power, mic, and compliance notes
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="gap-2">
              <Download size={20} />
              See what a ceremony-audio plan actually looks like
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
