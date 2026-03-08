import { Check, X, AlertTriangle } from "lucide-react";

const comparisonData = [
  { 
    feature: "Vow amplification", 
    dj: { value: "warning", label: "Basic rental mic" }, 
    band: { value: false, label: "Often not included" }, 
    parker: { value: true, label: "Wireless lapel + handheld, live-mixed" } 
  },
  { 
    feature: "Silent power", 
    dj: { value: false, label: "Generator noise common" }, 
    band: { value: "warning", label: "Sometimes" }, 
    parker: { value: true, label: "Battery system — no noise" } 
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

export function ComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-14 border-b-2 border-border">
            <th className="text-left px-4 py-3 text-sm font-bold">Feature</th>
            <th className="text-center px-4 py-3">
              <div className="text-sm font-bold text-muted-foreground">DJ</div>
              <div className="text-xs text-muted-foreground font-normal">≈ $1,500–$2,000</div>
            </th>
            <th className="text-center px-4 py-3">
              <div className="text-sm font-bold text-muted-foreground">Band</div>
              <div className="text-xs text-muted-foreground font-normal">≈ $3,500–$6,000</div>
            </th>
            <th className="text-center px-4 py-3">
              <div className="text-sm font-bold text-primary">Parker</div>
              <div className="text-xs text-primary/80 font-normal">$650–$1,200</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border/30 ${
                i % 2 === 0 ? "bg-primary/[0.02]" : ""
              }`}
            >
              <td className="px-4 py-4 text-sm font-medium">{row.feature}</td>
              <td className="text-center px-4 py-4">
                {row.dj.value === true && (
                  <Check size={18} className="inline text-accent" />
                )}
                {row.dj.value === false && (
                  <X size={18} className="inline text-destructive/60" />
                )}
                {row.dj.value === "warning" && (
                  <AlertTriangle size={18} className="inline text-primary/70" />
                )}
                {row.dj.label && (
                  <div className="text-xs text-muted-foreground mt-1">{row.dj.label}</div>
                )}
              </td>
              <td className="text-center px-4 py-4">
                {row.band.value === true && (
                  <Check size={18} className="inline text-accent" />
                )}
                {row.band.value === false && (
                  <X size={18} className="inline text-destructive/60" />
                )}
                {row.band.value === "warning" && (
                  <AlertTriangle size={18} className="inline text-yellow-600" />
                )}
                {row.band.label && (
                  <div className="text-xs text-muted-foreground mt-1">{row.band.label}</div>
                )}
              </td>
              <td className="text-center px-4 py-4">
                {row.parker.value === true && (
                  <Check size={18} className="inline text-primary" />
                )}
                {row.parker.value === false && (
                  <X size={18} className="inline text-destructive/60" />
                )}
                {row.parker.label && (
                  <div className="text-xs text-muted-foreground mt-1">{row.parker.label}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-center font-medium">
          I am not entertainment. I am the person who ensures every word of your vows is heard.
        </p>
        <p className="text-xs text-center text-muted-foreground mt-2">
          * See policy details below for timing windows and exceptions.
        </p>
      </div>
    </div>
  );
}
