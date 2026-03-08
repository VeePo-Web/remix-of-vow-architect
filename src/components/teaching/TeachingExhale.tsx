import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const lines = [
  "You have a song inside you that you have never been able to play.",
  "You have heard it in the car, in the quiet, in the space between what you feel and what you can say.",
  "I understand.",
  "The piano has been waiting.",
];

export function TeachingExhale() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      id="teaching-exhale"
      ref={ref}
      className="relative py-[120px] md:py-[160px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(40 30% 95%)" }}
      role="region"
      aria-label="Recognition"
    >
      {/* Warm ambient glow — barely perceptible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.025), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(40 25% 88% / 0.5) 100%)",
          animation: isVisible
            ? "exhale-vignette-breathe 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        {/* Golden dot anchor — heartbeat */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-8 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{
            background: "hsl(var(--vow-yellow))",
            animation: isVisible
              ? "exhale-dot-pulse 4s ease-in-out infinite"
              : undefined,
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
          aria-hidden="true"
        />

        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "font-display italic tracking-tight transition-all duration-[700ms]",
              i < 2
                ? "text-[20px] md:text-[28px] leading-[1.5] mb-fitz-5"
                : i === 2
                  ? "text-[18px] md:text-[24px] leading-[1.5] mb-fitz-3"
                  : "text-[20px] md:text-[28px] leading-[1.5] mb-0",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[12px]"
            )}
            style={{
              color:
                i === 2 ? "hsl(30 10% 35%)" : "hsl(30 10% 25%)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: `${300 + i * 400}ms`,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes exhale-dot-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); box-shadow: 0 0 0 0 hsl(var(--vow-yellow) / 0.3); }
          50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 12px 4px hsl(var(--vow-yellow) / 0.15); }
        }
        @keyframes exhale-vignette-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-exhale * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
