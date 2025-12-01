import { cn } from "@/lib/utils";

interface VigilRevealProps {
  isRevealing: boolean;
  isComplete: boolean;
  children: React.ReactNode;
}

/**
 * Vigil Reveal — Radial Mask Expansion
 * - Reveals hero image from center outward during Act II (Kindling)
 * - Coordinates with flame position
 * - Brightness rises from 0.1 → 0.65
 */
export function VigilReveal({ isRevealing, isComplete, children }: VigilRevealProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-all duration-2000",
        !isRevealing && !isComplete && "opacity-10"
      )}
      style={{
        maskImage: isRevealing || isComplete
          ? "radial-gradient(circle at center, black 100%, transparent 100%)"
          : "radial-gradient(circle at center, black 0%, transparent 0%)",
        WebkitMaskImage: isRevealing || isComplete
          ? "radial-gradient(circle at center, black 100%, transparent 100%)"
          : "radial-gradient(circle at center, black 0%, transparent 0%)",
        animation: isRevealing && !isComplete ? "kindle-reveal 2s var(--ease-sacred) forwards" : undefined,
      }}
    >
      {children}
    </div>
  );
}
