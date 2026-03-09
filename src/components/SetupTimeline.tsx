const steps = [
  "Arrive ≥60 min early",
  "Place piano & power",
  "Mic the officiant",
  "SPL baseline",
  "Final cue check",
  "Guests seated",
  "Processional",
];

function GoldNumeral({ n }: { n: number }) {
  return (
    <span
      className="font-display text-xs font-light tracking-wide"
      style={{
        background: "linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function SetupTimeline() {
  return (
    <div className="relative">
      <h3 className="font-display text-xl font-light text-center mb-8">Setup timeline</h3>
      
      <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory gap-4 scrollbar-thin">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4 shrink-0 snap-start">
            <div className="flex flex-col items-center min-w-[140px]">
              <div className="mb-3">
                <GoldNumeral n={index + 1} />
              </div>
              <p className="text-xs text-center font-medium leading-tight">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <span className="text-muted-foreground opacity-30 shrink-0 text-sm">—</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
