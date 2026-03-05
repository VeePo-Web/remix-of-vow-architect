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
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="The Crossing"
    >
      {/* Bench photograph — occupied feeling */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: `url(${benchImg})` }}
        aria-hidden="true"
      />

      {/* Golden thread from above */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-px h-[80px] transition-transform duration-[450ms] origin-top",
          isVisible ? "scale-y-100" : "scale-y-0"
        )}
        style={{
          background: "hsl(var(--vow-yellow) / 0.2)",
          transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        {/* Tagline bookend */}
        <p
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight mb-fitz-7 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          )}
          style={{
            color: "hsl(30 10% 20%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
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
            "mb-fitz-6 transition-all duration-[600ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "300ms",
          }}
        >
          <Button
            asChild
            size="lg"
            className="font-sans text-[14px] uppercase tracking-[0.14em] bg-[hsl(var(--vow-yellow))] text-[hsl(30_10%_12%)] hover:bg-[hsl(var(--vow-yellow)/0.85)] transition-colors duration-[180ms] border-2 border-[hsl(var(--vow-yellow))] rounded-md px-8 py-3"
          >
            <Link to="/contact">Sit down with me.</Link>
          </Button>
        </div>

        {/* Anti-anxiety */}
        <p
          className={cn(
            "font-sans text-[14px] leading-relaxed mb-fitz-2 transition-all duration-[600ms]",
            isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-2"
          )}
          style={{
            color: "hsl(30 10% 35%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "500ms",
          }}
        >
          Response within 24 hours. Always.
        </p>
        <p
          className={cn(
            "font-sans text-[13px] transition-all duration-[600ms]",
            isVisible ? "opacity-50 translate-y-0" : "opacity-0 translate-y-2"
          )}
          style={{
            color: "hsl(30 10% 40%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "600ms",
          }}
        >
          This is a conversation, not a commitment.
        </p>
      </div>
    </section>
  );
}
