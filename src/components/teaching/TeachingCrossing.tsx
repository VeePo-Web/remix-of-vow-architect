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
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[700ms]",
            isVisible
              ? "opacity-40 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(30 10% 45%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "100ms",
          }}
        >
          The invitation
        </p>

        {/* Golden dot — arrival marker */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-7 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{
            background: "hsl(var(--vow-yellow))",
            boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "150ms",
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
            transitionDelay: "300ms",
            textShadow: "0 1px 2px hsl(40 20% 80% / 0.25)",
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

        {/* CTA — warm glow halo behind button */}
        <div
          className={cn(
            "relative mb-fitz-6 transition-all duration-[700ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "500ms",
          }}
        >
          {/* Ambient halo behind CTA */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[60px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.12), transparent 70%)",
              animation: isVisible
                ? "cta-halo-breathe 4s ease-in-out infinite"
                : undefined,
            }}
            aria-hidden="true"
          />
          <Button
            asChild
            size="lg"
            className="relative font-sans text-[14px] uppercase tracking-[0.14em] bg-[hsl(var(--vow-yellow))] text-[hsl(30_10%_12%)] hover:bg-[hsl(var(--vow-yellow)/0.85)] border-2 border-[hsl(var(--vow-yellow))] rounded-md px-10 py-3.5 transition-all duration-[260ms] hover:shadow-[0_4px_20px_hsl(var(--vow-yellow)/0.25)] hover:-translate-y-[1px]"
          >
            <Link to="/contact">Sit down with me.</Link>
          </Button>
        </div>

        {/* Anti-anxiety with vow-yellow underline on "Always" */}
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
            transitionDelay: "700ms",
          }}
        >
          Response within 24 hours.{" "}
          <span className="relative inline-block">
            Always
            <span
              className={cn(
                "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: "1000ms",
              }}
              aria-hidden="true"
            />
          </span>
          .
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
            transitionDelay: "800ms",
          }}
        >
          This is a conversation, not a commitment.
        </p>

        {/* Closing golden thread — page terminus */}
        <div
          className={cn(
            "w-px h-[60px] mx-auto mt-fitz-9 origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.20), hsl(var(--vow-yellow) / 0.04))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "1100ms",
          }}
          aria-hidden="true"
        />

        {/* Pencil annotation — page closing */}
        <span
          className={cn(
            "inline-block font-display italic text-[13px] mt-fitz-4 transition-all duration-[700ms]",
            isVisible ? "opacity-35" : "opacity-0"
          )}
          style={{
            color: "hsl(30 12% 50%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "1300ms",
          }}
          aria-label="Closing annotation"
        >
          — the bench is ready
        </span>
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
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
        }
        @keyframes cta-halo-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
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
