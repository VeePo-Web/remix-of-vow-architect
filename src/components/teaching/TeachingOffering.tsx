import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function TeachingOffering() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="teaching-offering"
      ref={ref}
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="The Offering"
    >
      {/* Warm radial glow */}
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
            "radial-gradient(ellipse at center, transparent 45%, hsl(38 25% 85% / 0.45) 100%)",
          animation: isVisible
            ? "offering-vignette 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[560px] mx-auto text-center">
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[1800ms]",
            isVisible
              ? "opacity-50 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(30 10% 45%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          The offering
        </p>

        {/* Golden dot anchor */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-5 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{
            background: "hsl(var(--vow-yellow))",
            boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
            animation: isVisible
              ? "offering-dot-breathe 4s ease-in-out infinite"
              : undefined,
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "100ms",
          }}
          aria-hidden="true"
        />

        {/* Vertical golden thread — dot to content */}
        <div
          className={cn(
            "w-px h-[60px] mx-auto mb-fitz-9 origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.06))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
          }}
          aria-hidden="true"
        />

        {/* Framing question */}
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight leading-[1.15] mb-fitz-8 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[12px]"
          )}
          style={{
            color: "hsl(30 15% 20%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "300ms",
            textShadow: "0 1px 2px hsl(40 20% 80% / 0.25)",
          }}
        >
          Are you ready to sit down?
        </h2>

        {/* Price — understated */}
        <p
          className={cn(
            "font-sans text-[18px] md:text-[20px] font-normal tracking-[0.01em] mb-fitz-3 transition-all duration-[700ms]",
            isVisible
              ? "opacity-70 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(30 12% 30%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "500ms",
          }}
        >
          $60 per hour
        </p>

        {/* Anti-anxiety primary */}
        <p
          className={cn(
            "font-sans text-[13px] tracking-[0.02em] mb-fitz-8 transition-all duration-[700ms]",
            isVisible
              ? "opacity-50 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(30 10% 40%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "600ms",
          }}
        >
          No packages. No commitments. One conversation at a time.
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
            transitionDelay: "700ms",
          }}
        >
          <Button
            asChild
            size="lg"
            className="font-sans text-[14px] uppercase tracking-[0.14em] bg-[hsl(var(--vow-yellow))] text-[hsl(30_10%_12%)] hover:bg-[hsl(var(--vow-yellow)/0.85)] transition-colors duration-[180ms] border-2 border-[hsl(var(--vow-yellow))] rounded-md px-10 py-3.5"
          >
            <Link to="/contact">Begin the conversation</Link>
          </Button>
        </div>

        {/* Anti-anxiety secondary with underline on "question" */}
        <p
          className={cn(
            "font-sans text-[12px] mb-fitz-2 transition-all duration-[700ms]",
            isVisible
              ? "opacity-40 translate-y-0"
              : "opacity-0 translate-y-[4px]"
          )}
          style={{
            color: "hsl(30 10% 45%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "850ms",
          }}
        >
          The first session begins with a{" "}
          <span className="relative inline-block">
            question
            <span
              className={cn(
                "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: "1100ms",
              }}
              aria-hidden="true"
            />
          </span>
          , not a scale.
        </p>

        {/* Pencil annotation */}
        <span
          className={cn(
            "inline-block font-display italic text-[13px] mt-fitz-4 mb-fitz-7 transition-all duration-[700ms]",
            isVisible ? "opacity-30" : "opacity-0"
          )}
          style={{
            color: "hsl(30 12% 50%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "1000ms",
          }}
          aria-label="Annotation"
        >
          — what do you want to say?
        </span>

        {/* Vertical golden thread — content to bottom */}
        <div
          className={cn(
            "w-px h-[60px] mx-auto origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.06), hsl(var(--vow-yellow) / 0.20))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "900ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes offering-dot-breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes offering-vignette {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-offering * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
