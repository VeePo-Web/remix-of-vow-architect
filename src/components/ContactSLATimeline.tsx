export function ContactSLATimeline() {
  const steps = [
    {
      time: "0–24 hours",
      description:
        "I send your ceremony-audio plan: SPL overview, proximity seating arc, mic/power (or Banff Mode) notes, and a cue-sheet starter.",
    },
    {
      time: "24–48 hours",
      description: "Optional follow-up for song selections and planner/officiant sync.",
    },
    {
      time: "By 72 hours",
      description:
        "Your spot is held; I'll include an optional deposit link—no pressure.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        What happens after you submit this form?
      </h2>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>
            </div>
            <div className="pt-2">
              <h4 className="font-semibold text-foreground mb-1">{step.time}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8 italic">
        Nothing is final until you say so—I'm securing your clarity window.
      </p>
    </div>
  );
}
