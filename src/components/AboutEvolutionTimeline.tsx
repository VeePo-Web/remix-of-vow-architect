import { ArrowDown } from "lucide-react";

const milestones = [
  { year: "2015", description: "Wedding pianist—mostly classical repertoire." },
  { year: "2017", description: "A DJ timing miss → I write my first cue sheet." },
  { year: "2018", description: "Test dual-mic + amp setups at three venues." },
  { year: "2020", description: "Add SPL metering → visual proof of audibility." },
  { year: "2022", description: "Create Banff Mode™ for no-PA bylaws." },
  { year: "2023–2024", description: "Approved at 40+ Alberta venues; plans standardized." },
];

export function AboutEvolutionTimeline() {
  return (
    <div className="space-y-8">
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex overflow-x-auto pb-4 gap-6">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-center min-w-[200px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-bold mb-3">
                {milestone.year}
              </div>
              <p className="text-sm text-center leading-tight text-foreground">
                {milestone.description}
              </p>
            </div>
            {index < milestones.length - 1 && (
              <div className="h-0.5 w-8 bg-border shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical */}
      <div className="md:hidden space-y-6">
        {milestones.map((milestone, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-bold text-sm shrink-0">
                {milestone.year}
              </div>
              <p className="text-sm leading-relaxed text-foreground pt-2">
                {milestone.description}
              </p>
            </div>
            {index < milestones.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown size={16} className="text-muted-foreground/50" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground italic text-center mt-8">
        Every failure I saw became a feature in your plan.
      </p>
    </div>
  );
}
