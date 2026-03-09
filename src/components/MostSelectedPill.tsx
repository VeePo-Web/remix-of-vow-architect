export function MostSelectedPill() {
  return (
    <div
      className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{
        background: "hsl(var(--vow-yellow) / 0.12)",
        border: "1px solid hsl(var(--vow-yellow) / 0.25)",
        boxShadow: "0 0 12px hsl(var(--vow-yellow) / 0.08)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rotate-45"
        style={{ background: "hsl(var(--vow-yellow) / 0.8)" }}
        aria-hidden="true"
      />
      <span className="text-[11px] font-display font-medium text-primary tracking-[0.05em]">Most selected</span>
    </div>
  );
}
