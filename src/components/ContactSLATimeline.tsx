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
      <h2 className="font-display text-[clamp(24px,3vw,32px)] font-light mb-10 text-center">
        What happens after you reach out
      </h2>

      <div className="relative pl-6">
        {/* Golden vertical thread */}
        <div
          className="absolute left-0 top-1 bottom-1 w-px bg-primary/30"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Em-dash marker on the thread */}
              <span
                className="absolute -left-6 top-[0.35em] w-4 h-px bg-primary/40"
                aria-hidden="true"
              />
              <h4 className="font-display text-sm italic text-foreground/80 mb-1">
                {step.time}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-10 italic">
        Nothing is final until you say so — I am securing your clarity window.
      </p>

    </div>
  );
}
