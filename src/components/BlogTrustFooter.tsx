import { Shield, FileCheck, Database } from "lucide-react";

export function BlogTrustFooter() {
  return (
    <div className="py-12 px-4 border-t border-border/40">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Mini Bio */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            I'm <span className="font-semibold text-foreground">Parker</span>—a Calgary-based Ceremony Sound Director, pianist, and creator of Banff Mode™. My SPL-mapped plans are used at 40+ Alberta venues and align with Parks Canada rules.
          </p>
        </div>

        {/* Social Proof Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCheck size={16} className="text-primary" />
            <span>Planner-approved</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield size={16} className="text-primary" />
            <span>Venue-ready</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Database size={16} className="text-primary" />
            <span>Logged & Insured</span>
          </div>
        </div>

        {/* Hidden SEO H2s (visually hidden but present for SEO) */}
        <div className="sr-only">
          <h2>Wedding ceremony sound checklist Alberta</h2>
          <h2>Outdoor vow audio rules Canada</h2>
          <h2>Cue sheet example wedding music planner</h2>
        </div>
      </div>
    </div>
  );
}
