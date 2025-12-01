import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface ReadingCardProps {
  timestamp: string;
  reading: string;
  moment: string;
}

const readings: ReadingCardProps[] = [
  {
    timestamp: "14:32",
    reading: "62 dBA",
    moment: "Prelude",
  },
  {
    timestamp: "14:47",
    reading: "68 dBA",
    moment: "Vows",
  },
  {
    timestamp: "15:02",
    reading: "72 dBA",
    moment: "Recession",
  },
];

export function TheRecord() {
  return (
    <section className="section--dark py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
              THE RECORD
            </p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight text-ink-inverse mb-4">
              The evidence of being heard
            </h2>
          </div>

          {/* Three Reading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {readings.map((reading, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 transition-all duration-300 hover:bg-card/70 hover:border-border/50 hover:-translate-y-1"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
                }}
              >
                {/* Timestamp */}
                <p 
                  className="text-xs mb-3 opacity-50"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {reading.timestamp}
                </p>

                {/* Reading Number */}
                <div className="text-5xl font-display font-light mb-3 text-card-foreground">
                  {reading.reading}
                </div>

                {/* Moment Label */}
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {reading.moment}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantee Section */}
          <div className="text-center">
            <div 
              className="h-[1px] w-32 mx-auto mb-8"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)"
              }}
              aria-hidden="true"
            />

            <p className="text-2xl font-display font-light italic text-ink-inverse/90 mb-2">
              "If all failsafes fail,
            </p>
            <p className="text-2xl font-display font-light italic text-ink-inverse/90 mb-8">
              your remedy is automatic."
            </p>

            <Button variant="ghost-dark" className="gap-2" asChild>
              <a href="/resources">
                <FileDown size={18} />
                Download sample report
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
