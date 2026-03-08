import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function EventsCrossing() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="events-crossing"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6"
      style={{ background: "hsl(var(--rich-black))" }}
      role="region"
      aria-label="The Crossing"
    >
      {/* Breathing warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Golden thread */}
        <div
          className={cn(
            "w-16 h-px mx-auto mb-fitz-6 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Tagline bookend */}
        <p
          className={cn(
            "font-display text-[24px] md:text-[36px] font-light tracking-tight text-foreground mb-fitz-6 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
          }}
        >
          Every room has a sound it's waiting for
          <span className="text-[hsl(var(--vow-yellow))]">.</span>
        </p>

        {/* CTA */}
        <div
          className={cn(
            "mb-fitz-5 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionDelay: "500ms" }}
        >
          <Button asChild size="lg" variant="primary-dark">
            <Link to="/contact">Discuss your event</Link>
          </Button>
        </div>

        {/* Anti-anxiety */}
        <p
          className={cn(
            "font-sans text-[13px] text-muted-foreground transition-all duration-[700ms]",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "700ms" }}
        >
          Response within 24 hours. Always.
        </p>
        <p
          className={cn(
            "font-sans text-[12px] text-muted-foreground/60 mt-1 transition-all duration-[700ms]",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "850ms" }}
        >
          No obligation — just a conversation.
        </p>
      </div>
    </section>
  );
}
