const badges = [
  { label: "Sound system included" },
  { label: "Silent battery power" },
  { label: "Volume verified at three key moments" },
  { label: "Fully insured — $2M liability + $25k equipment" },
];

function GoldDiamond() {
  return (
    <span
      className="inline-block w-2 h-2 rotate-45 shrink-0 mt-0.5"
      style={{
        background: "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: "0 0 5px hsl(var(--vow-yellow) / 0.2)",
      }}
      aria-hidden="true"
    />
  );
}

export function HeroTrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm"
        >
          <GoldDiamond />
          <span className="text-sm font-medium leading-tight">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
