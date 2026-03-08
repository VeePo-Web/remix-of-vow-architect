import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * TeachingExhale — Recognition / Sacred Pause
 * 
 * Dual-weight typographic reveal: italic (emotional) vs roman (declarative).
 * "I understand." breaks the italic pattern — a moment of grounded authority.
 * "The piano has been waiting." carries vow-yellow underline on "waiting."
 * Closing horizontal golden thread anchors the section.
 */

const lines = [
  {
    text: "You have a song inside you that you have never been able to play.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
  },
  {
    text: "You have heard it in the car, in the quiet, in the space between what you feel and what you can say.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
  },
  {
    text: "I understand.",
    italic: false, // Roman — declarative break
    size: "text-[18px] md:text-[24px]",
  },
  {
    text: "The piano has been waiting.",
    italic: true,
    size: "text-[20px] md:text-[28px]",
    underlineWord: "waiting",
  },
];

function renderLine(
  line: (typeof lines)[number],
  isVisible: boolean,
  delay: number
) {
  const baseStyle = {
    color: line.italic ? "hsl(30 10% 25%)" : "hsl(30 10% 35%)",
    transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
    transitionDelay: `${delay}ms`,
  };

  if (!line.underlineWord) {
    return (
      <span style={baseStyle} className="block">
        {line.text}
      </span>
    );
  }

  // Render with vow-yellow underline on the target word
  const idx = line.text
    .toLowerCase()
    .indexOf(line.underlineWord.toLowerCase());
  if (idx === -1) return <span style={baseStyle}>{line.text}</span>;

  const before = line.text.slice(0, idx);
  const match = line.text.slice(idx, idx + line.underlineWord.length);
  const after = line.text.slice(idx + line.underlineWord.length);

  return (
    <span style={baseStyle} className="block">
      {before}
      <span className="relative inline-block">
        {match}
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 w-full h-[2px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: `${delay + 400}ms`,
          }}
          aria-hidden="true"
        />
      </span>
      {after}
    </span>
  );
}

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
      {/* Warm ambient glow */}
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
              "font-display tracking-tight transition-all duration-[700ms] leading-[1.5]",
              line.size,
              line.italic ? "italic" : "font-medium not-italic",
              i < lines.length - 1 ? "mb-fitz-5" : "mb-0",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[12px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: `${300 + i * 400}ms`,
            }}
          >
            {renderLine(line, isVisible, 300 + i * 400)}
          </p>
        ))}

        {/* Closing horizontal golden thread */}
        <div
          className={cn(
            "mx-auto h-px max-w-[120px] mt-fitz-8 transition-transform duration-[700ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "1800ms",
          }}
          aria-hidden="true"
        />
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
