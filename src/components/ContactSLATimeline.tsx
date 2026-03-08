export function ContactSLATimeline() {
  const steps = [
    {
      time: "Within 24 hours",
      description:
        "I send your personalized ceremony plan — venue considerations, suggested arrangements, and a timeline for your day.",
    },
    {
      time: "24–48 hours",
      description: "An optional follow-up to discuss song selections, planner coordination, and any questions.",
    },
    {
      time: "By 72 hours",
      description:
        "Your date is held. I will include a simple deposit link — no pressure, no obligation.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-display text-[clamp(24px,3vw,32px)] font-light mb-8 text-center">
        What happens after you reach out
      </h2>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary">{index + 1}</span>
              </div>
            </div>
            <div className="pt-2">
              <h4 className="font-display text-base font-light text-foreground mb-1">{step.time}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8 italic">
        Nothing is final until you say so — I am securing your clarity window.
      </p>
    </div>
  );
}
