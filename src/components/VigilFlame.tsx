import { cn } from "@/lib/utils";

interface VigilFlameProps {
  isVisible: boolean;
  isDissolving: boolean;
}

/**
 * Vigil Flame — The Sacred Spark (Refined)
 * - Smaller, more precious flame at dead center
 * - Breathing animation synced to 4s global breath
 * - Dissolves during Act III (Revelation)
 */
export function VigilFlame({ isVisible, isDissolving }: VigilFlameProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity duration-1000",
        !isVisible && "opacity-0",
        isDissolving && "opacity-0"
      )}
      aria-hidden="true"
    >
      <div
        className="w-1.5 h-2.5 rounded-full"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--vow-yellow)) 0%, hsl(39 100% 60%) 50%, transparent 100%)",
          boxShadow: "0 0 24px hsl(var(--vow-yellow) / 0.7), 0 0 48px hsl(39 100% 60% / 0.35)",
          animation: isVisible && !isDissolving ? "flame-breathe 4s ease-in-out infinite" : undefined,
        }}
      />
    </div>
  );
}
