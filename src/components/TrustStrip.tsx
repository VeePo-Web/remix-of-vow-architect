const trustItems = [
  { label: "Insured" },
  { label: "SOCAN-licensed" },
  { label: "Redundant audio chain" },
];

function GoldDiamond() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rotate-45"
      style={{
        background: "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: "0 0 4px hsl(var(--vow-yellow) / 0.2)",
      }}
      aria-hidden="true"
    />
  );
}

export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {trustItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <GoldDiamond />
          <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
