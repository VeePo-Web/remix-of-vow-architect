import { cn } from "@/lib/utils";

interface VigilFlameProps {
  isVisible: boolean;
  isDissolving: boolean;
}

/**
 * Vigil Flame — The Sacred Spark
 * - Single flame at dead center during Act I (Stillness)
 * - Breathing animation (scale 0.95 → 1.08, 3s cycle)
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
        className="w-2 h-3 rounded-full"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--vow-yellow)) 0%, hsl(39 100% 60%) 50%, transparent 100%)",
          boxShadow: "0 0 40px hsl(var(--vow-yellow) / 0.8), 0 0 80px hsl(39 100% 60% / 0.4)",
          animation: isVisible && !isDissolving ? "flame-breathe 3s ease-in-out infinite" : undefined,
        }}
      />
    </div>
  );
}
