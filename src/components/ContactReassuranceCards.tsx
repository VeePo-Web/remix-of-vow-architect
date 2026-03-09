import { Card } from "@/components/ui/card";

const reassuranceItems = [
  "No cost to hold your date — take the time you need to decide.",
  "Full refund within 14 days — a commitment without pressure.",
  "Response within 24 hours — your personalized plan, always.",
  "Insurance, redundancy, and documentation — included in every arrangement.",
];

function GoldNumeral({ n }: { n: number }) {
  return (
    <span
      className="font-display text-sm font-light tracking-wide shrink-0 mt-0.5"
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

export function ContactReassuranceCards() {
  return (
    <div className="space-y-4">
      {reassuranceItems.map((text, index) => (
        <Card
          key={index}
          className="bg-card/50 border-border p-4 flex items-start gap-3"
        >
          <GoldNumeral n={index + 1} />
          <p className="text-sm text-foreground leading-relaxed">{text}</p>
        </Card>
      ))}
    </div>
  );
}
