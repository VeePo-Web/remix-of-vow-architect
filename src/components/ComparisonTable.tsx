import { Check, X } from "lucide-react";

const comparisonData = [
  { feature: "Bylaw compliant (Banff, parks)", dj: false, band: false, parker: true },
  { feature: "Triple-tier backup system", dj: false, band: false, parker: true },
  { feature: "$2M liability insurance", dj: "varies", band: "varies", parker: true },
  { feature: "Real-time ceremony coordination", dj: false, band: false, parker: true },
  { feature: "SOCAN licensed repertoire", dj: true, band: "varies", parker: true },
  { feature: "Fixed, guaranteed pricing", dj: "varies", band: false, parker: true },
];

export function ComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-12 border-b border-border">
            <th className="text-left px-4 py-3 text-sm font-semibold">Feature</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground">DJ</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground">Band</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-primary">Parker</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, i) => (
            <tr
              key={i}
              className={`h-10 border-b border-border/30 ${
                i % 2 === 0 ? "bg-primary/[0.04]" : ""
              }`}
            >
              <td className="px-4 py-3 text-sm">{row.feature}</td>
              <td className="text-center px-4 py-3">
                {typeof row.dj === "boolean" ? (
                  row.dj ? (
                    <Check size={16} className="inline text-accent" />
                  ) : (
                    <X size={16} className="inline text-muted-foreground" />
                  )
                ) : (
                  <span className="text-xs text-muted-foreground">{row.dj}</span>
                )}
              </td>
              <td className="text-center px-4 py-3">
                {typeof row.band === "boolean" ? (
                  row.band ? (
                    <Check size={16} className="inline text-accent" />
                  ) : (
                    <X size={16} className="inline text-muted-foreground" />
                  )
                ) : (
                  <span className="text-xs text-muted-foreground">{row.band}</span>
                )}
              </td>
              <td className="text-center px-4 py-3">
                {typeof row.parker === "boolean" ? (
                  row.parker ? (
                    <Check size={16} className="inline text-primary" />
                  ) : (
                    <X size={16} className="inline text-muted-foreground" />
                  )
                ) : (
                  <span className="text-xs text-muted-foreground">{row.parker}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
