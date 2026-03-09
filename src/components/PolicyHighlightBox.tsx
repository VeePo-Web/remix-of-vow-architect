import { ReactNode } from "react";

interface PolicyHighlightBoxProps {
  variant?: "info" | "warning" | "success";
  children: ReactNode;
}

function GoldDiamond({ green = false }: { green?: boolean }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rotate-45 flex-shrink-0 mt-1"
      style={{
        background: green
          ? "hsl(var(--vine-green) / 0.7)"
          : "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: green
          ? "0 0 6px hsl(var(--vine-green) / 0.25)"
          : "0 0 6px hsl(var(--vow-yellow) / 0.25)",
      }}
      aria-hidden="true"
    />
  );
}

function WarningMark() {
  return (
    <span
      className="font-display text-lg font-light text-primary flex-shrink-0 mt-0.5 select-none"
      aria-hidden="true"
    >
      —
    </span>
  );
}

export function PolicyHighlightBox({ variant = "info", children }: PolicyHighlightBoxProps) {
  const marks = {
    info: <GoldDiamond />,
    warning: <WarningMark />,
    success: <GoldDiamond green />,
  };

  return (
    <div
      className="rounded-sm p-4 my-6"
      style={{
        borderLeft: `2px solid ${
          variant === "success"
            ? "hsl(var(--vine-green) / 0.35)"
            : "hsl(var(--vow-yellow) / 0.25)"
        }`,
        background:
          variant === "success"
            ? "hsl(var(--accent) / 0.06)"
            : "hsl(var(--muted) / 0.3)",
      }}
    >
      <div className="flex gap-3">
        {marks[variant]}
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
