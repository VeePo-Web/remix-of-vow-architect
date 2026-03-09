import { SetupTimeline } from "./SetupTimeline";
import { StaggerChildren } from "@/components/animation";

const kitItems = [
  "88-key digital grand + venue-piano fallback",
  "Wireless lav mic + live mixing pack",
  "Redundant battery amp + backup keyboard",
  "≥60-minute pre-call setup window",
  "Run-of-show PDF, co-signed",
  "SPL log recorded & delivered post-event",
];

function GoldNumeral({ n }: { n: number }) {
  return (
    <span
      className="font-display text-sm font-light tracking-wide shrink-0"
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

export function SoundDirectorSection() {
  return (
    <section className="section--surface py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="h2 text-center mb-12 mx-auto">
          Not a musician—your Ceremony Sound Director™.
        </h2>

        <p className="p-lead text-center mb-16 max-w-4xl mx-auto text-muted-foreground">
          What if your pianist <strong>co-authored your cue sheet</strong>, ran <strong>mic tests</strong> with your officiant, and <strong>showed up an hour early with backups</strong>? That's not a "musician." That's a <strong>sound director</strong>—and that's what I do.
        </p>

        <h3 className="h3 text-center mb-8">My standard kit</h3>

        <StaggerChildren staggerDelay={80} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {kitItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-border/50"
            >
              <GoldNumeral n={index + 1} />
              <span className="p-body font-medium">{item}</span>
            </div>
          ))}
        </StaggerChildren>

        <SetupTimeline />
      </div>
    </section>
  );
}
