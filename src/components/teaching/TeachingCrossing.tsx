import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import benchImg from "@/assets/teaching-bench.jpg";

export function TeachingCrossing() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="teaching-crossing"
      ref={ref}
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="The Crossing"
    >
      {/* Bench photograph — occupied feeling */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${benchImg})`,
          opacity: 0.07,
          animation: "crossing-ken-burns 30s linear infinite alternate",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Warm atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(38 25% 85% / 0.5) 100%)",
          animation: isVisible
            ? "crossing-vignette 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Golden thread from above */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-px h-[100px] transition-transform duration-[700ms] origin-top",
          isVisible ? "scale-y-100" : "scale-y-0"
        )}
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.06))",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        {/* Golden dot — arrival marker */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-8 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{
            background: "hsl(var(--vow-yellow))",
            boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
          aria-hidden="true"
        />

        {/* Tagline bookend */}
        <p
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight mb-fitz-7 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[12px]"
          )}
          style={{
            color: "hsl(30 10% 20%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
          }}
        >
          From Silence
          <span
            className="text-[hsl(var(--vow-yellow))]"
            style={{
              animation: isVisible
                ? "semicolon-breathe 3s ease-in-out infinite"
                : undefined,
            }}
            aria-hidden="true"
          >
            ;
          </span>{" "}
          Unto Sound
          <span className="text-[hsl(var(--vow-yellow))]">.</span>
        </p>

        {/* CTA */}
        <div
          className={cn(
            "mb-fitz-6 transition-all duration-[700ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
        >
          <Button
            asChild
            size="lg"
            className="font-sans text-[14px] uppercase tracking-[0.14em] bg-[hsl(var(--vow-yellow))] text-[hsl(30_10%_12%)] hover:bg-[hsl(var(--vow-yellow)/0.85)] transition-colors duration-[180ms] border-2 border-[hsl(var(--vow-yellow))] rounded-md px-10 py-3.5"
          >
            <Link to="/contact">Sit down with me.</Link>
          </Button>
        </div>

        {/* Anti-anxiety */}
        <p
          className={cn(
            "font-sans text-[14px] leading-relaxed mb-fitz-2 transition-all duration-[700ms]",
            isVisible
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(30 10% 35%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "600ms",
          }}
        >
          Response within 24 hours. Always.
        </p>
        <p
          className={cn(
            "font-sans text-[13px] transition-all duration-[700ms]",
            isVisible
              ? "opacity-45 translate-y-0"
              : "opacity-0 translate-y-[4px]"
          )}
          style={{
            color: "hsl(30 10% 40%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "700ms",
          }}
        >
          This is a conversation, not a commitment.
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes crossing-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.03) translate(0.3%, -0.3%); }
        }
        @keyframes crossing-vignette {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.68; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-crossing * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
