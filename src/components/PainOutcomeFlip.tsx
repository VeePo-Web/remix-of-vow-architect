import { X, Check } from "lucide-react";

const pains = [
  "Wind muffles words → vows get missed.",
  "Cue timing drifts → awkward entrances.",
  "No power on site → gear fails or gets cancelled.",
  "Noise limits ignored → complaint or fine risk.",
];

const outcomes = [
  "Officiant mic + live mixing → guaranteed audibility.",
  "Cue-sheet co-signed with planner → flawless flow.",
  "Silent battery + fallback amp → redundancy ensured.",
  "SPL logs + local rules → clear, compliant sound.",
];

export function PainOutcomeFlip() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Why outdoor ceremonies fail—& how yours won't.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pain Column */}
          <div className="p-8 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="space-y-6">
              {pains.map((pain, index) => (
                <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
                  <X size={20} className="text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{pain}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome Column */}
          <div className="p-8 rounded-lg bg-accent/5 border border-accent/20">
            <div className="space-y-6">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
                  <Check size={20} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-lg font-semibold max-w-2xl mx-auto">
          This isn't "just music." It's <span className="text-primary">engineering a legal, intelligible ceremony</span>—with style.
        </p>
      </div>
    </section>
  );
}
