import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { StaggerChildren } from "@/components/animation";

const splReadings = [
  { phase: "Prelude baseline", reading: "60–65 dBA", location: "at aisle midpoint", note: "(timestamp)" },
  { phase: "Vows", reading: "intelligibility confirmed", location: "level tucked under local limits", note: "(timestamp)" },
  { phase: "Recessional", reading: "dynamic peak logged", location: "", note: "(timestamp)" },
];

function GoldNumeral({ n }: { n: number }) {
  return (
    <span
      className="font-display text-lg font-light"
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

export function ProofBlock() {
  return (
    <section className="section--surface py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="h2 text-center mb-16 mx-auto">
          Proof beats promises.
        </h2>

        <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6 mb-12">
          {splReadings.map((reading, index) => (
            <Card key={index} className="p-8">
              <h3 className="h4 mb-3">{reading.phase}</h3>
              <p className="text-2xl font-display font-medium text-primary price-numeral mb-2">
                {reading.reading}
              </p>
              <p className="p-small text-muted-foreground">
                {reading.location} {reading.note}
              </p>
            </Card>
          ))}
        </StaggerChildren>

        <div className="text-center mb-12">
          <Button variant="outline" size="lg">
            Sample Post-Ceremony Report (PDF)
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            includes SPL log, notes, and next-day follow-up.
          </p>
        </div>

        <Card className="p-8 bg-accent/5 border-accent/30 border-2 mb-8">
          <div className="flex items-start gap-4">
            <GoldNumeral n={1} />
            <div>
              <h3 className="h4 mb-3">Power & Clarity Guarantee</h3>
              <p className="p-body">
                If power or mic fails and all backups do too, I <strong>auto-trigger a proportional refund</strong>. That's the Power & Clarity Guarantee.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            $2M professional liability • $2M general liability • $25k equipment coverage. Documents available on request.
          </p>
        </div>
      </div>
    </section>
  );
}
