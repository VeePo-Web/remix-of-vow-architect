import { cn } from "@/lib/utils";

interface VigilGlowProps {
  isGlowing?: boolean;
  isPulsing?: boolean;
}

/**
 * Vigil Glow — Radial Vow-Yellow Background Layer
 * - 8s breathing pulse animation
 * - 3–5% opacity (barely perceptible)
 * - Sits behind hero content
 */
export function VigilGlow({ isGlowing = false, isPulsing = false }: VigilGlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-[600ms]",
        isGlowing ? "opacity-100" : "opacity-0"
      )}
      style={{
        background: "radial-gradient(circle at center, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
        animation: isPulsing ? "vigil-pulse 8s ease-in-out infinite" : undefined,
      }}
      aria-hidden="true"
    />
  );
}
