const comparisonData = [
  { 
    feature: "Vow clarity", 
    dj: { value: "warning", label: "Basic setup" }, 
    band: { value: false, label: "Often not included" }, 
    parker: { value: true, label: "Dedicated wireless system, balanced live" } 
  },
  { 
    feature: "Silent power", 
    dj: { value: false, label: "Noisy equipment common" }, 
    band: { value: "warning", label: "Sometimes" }, 
    parker: { value: true, label: "Battery system — completely quiet" } 
  },
  { 
    feature: "Volume verification", 
    dj: { value: false, label: "Not measured" }, 
    band: { value: false, label: "" }, 
    parker: { value: true, label: "Documented and delivered" } 
  },
  { 
    feature: "Refund policy", 
    dj: { value: false, label: "Vague" }, 
    band: { value: false, label: "Limited" }, 
    parker: { value: true, label: "14-day full refund window*" } 
  },
  { 
    feature: "Cue sheet collaboration", 
    dj: { value: false, label: "No involvement" }, 
    band: { value: false, label: "Music-only focus" }, 
    parker: { value: true, label: "Co-authored with your planner" } 
  },
  { 
    feature: "Backup systems", 
    dj: { value: "warning", label: "One level max" }, 
    band: { value: "warning", label: "Instrument only" }, 
    parker: { value: true, label: "Triple redundancy" } 
  },
];

/** Golden diamond for Parker's column */
function GoldenCheck() {
  return (
    <span
      className="inline-block w-3 h-3 rotate-45"
      style={{
        background: "hsl(var(--vow-yellow) / 0.8)",
        boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.3)",
      }}
      aria-label="Included"
    />
  );
}

function CompetitorMark({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: "hsl(var(--vow-yellow) / 0.5)" }}
        aria-label="Included"
      />
    );
  }
  if (value === "warning") {
    return <span className="text-muted-foreground/70 text-sm" aria-label="Partial">·</span>;
  }
  return <span className="text-muted-foreground/60 text-sm" aria-label="Not included">—</span>;
}

export function ComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-card/80 backdrop-blur-[8px] border border-border/50 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left px-5 py-4 text-[13px] font-sans font-medium uppercase tracking-[0.1em] text-muted-foreground">Feature</th>
              <th className="text-center px-4 py-4">
                <div className="font-display text-sm font-medium text-muted-foreground">DJ</div>
                <div className="text-[11px] text-muted-foreground font-sans mt-0.5 opacity-60">≈ $1,500–$2,000</div>
              </th>
              <th className="text-center px-4 py-4">
                <div className="font-display text-sm font-medium text-muted-foreground">Band</div>
                <div className="text-[11px] text-muted-foreground font-sans mt-0.5 opacity-60">≈ $3,500–$6,000</div>
              </th>
              <th className="text-center px-4 py-4">
                <div className="font-display text-sm font-medium text-primary">Parker</div>
                <div className="text-[11px] text-primary font-sans mt-0.5 opacity-70">$650–$1,200</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-border/20 transition-colors duration-[180ms] hover:bg-primary/[0.02] ${
                  i % 2 === 0 ? "bg-primary/[0.015]" : ""
                }`}
              >
                <td className="px-5 py-4 text-[14px] font-display font-medium">{row.feature}</td>
                <td className="text-center px-4 py-4">
                  <CompetitorMark value={row.dj.value} />
                  {row.dj.label && <div className="text-[12px] text-muted-foreground mt-1 leading-snug opacity-70">{row.dj.label}</div>}
                </td>
                <td className="text-center px-4 py-4">
                  <CompetitorMark value={row.band.value} />
                  {row.band.label && <div className="text-[12px] text-muted-foreground mt-1 leading-snug opacity-70">{row.band.label}</div>}
                </td>
                <td className="text-center px-4 py-4">
                  {row.parker.value === true && <GoldenCheck />}
                  {row.parker.label && <div className="text-[12px] text-muted-foreground mt-1.5 leading-snug">{row.parker.label}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-5 bg-card/60 backdrop-blur-[6px] border border-border/40 rounded-lg">
        <p className="font-display text-[15px] text-center font-medium leading-relaxed">
          I am not entertainment. I am the person who ensures every word of your vows is heard.
        </p>
        <p className="text-[12px] text-center text-muted-foreground mt-2">
          * See policy details below for timing windows and exceptions.
        </p>
      </div>
    </div>
  );
}
