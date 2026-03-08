import { ArrowRight } from "lucide-react";

const steps = [
  "Arrive ≥60 min early",
  "Place piano & power",
  "Mic the officiant",
  "SPL baseline",
  "Final cue check",
  "Guests seated",
  "Processional",
];

export function SetupTimeline() {
  return (
    <div className="relative">
      <h3 className="font-display text-xl font-light text-center mb-8">Setup timeline</h3>
      
      <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory gap-4 scrollbar-thin">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4 shrink-0 snap-start">
            <div className="flex flex-col items-center min-w-[140px]">
              <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-sm font-bold mb-3">
                {index + 1}
              </div>
              <p className="text-xs text-center font-medium leading-tight">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight size={20} className="text-muted-foreground opacity-50 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
