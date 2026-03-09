import { StaggerChildren } from "@/components/animation";

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

function GoldDiamond() {
  return (
    <span
      className="inline-block w-2 h-2 rotate-45 shrink-0 mt-1.5"
      style={{
        background: "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: "0 0 5px hsl(var(--vow-yellow) / 0.2)",
      }}
      aria-hidden="true"
    />
  );
}

export function PainOutcomeFlip() {
  return (
    <section className="section--default py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="h2 text-center mb-16 mx-auto">
          Why outdoor ceremonies fail—& how yours won't.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pain Column */}
          <div className="p-8 rounded-lg bg-destructive/5 border border-destructive/20">
            <StaggerChildren staggerDelay={80} as="div" className="space-y-6">
              {pains.map((pain, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-destructive/60 font-display text-sm mt-0.5 shrink-0" aria-hidden="true">—</span>
                  <p className="p-body">{pain}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>

          {/* Outcome Column */}
          <div className="p-8 rounded-lg bg-accent/5 border border-accent/20">
            <StaggerChildren staggerDelay={80} as="div" className="space-y-6">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <GoldDiamond />
                  <p className="p-body">{outcome}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>

        <p className="text-center text-lg font-medium max-w-2xl mx-auto">
          This isn't "just music." It's <span className="text-primary">engineering a legal, intelligible ceremony</span>—with style.
        </p>
      </div>
    </section>
  );
}
