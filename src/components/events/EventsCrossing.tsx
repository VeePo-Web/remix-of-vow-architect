import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import venueEmptyImg from "@/assets/venue-empty-golden.jpg";

export function EventsCrossing() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="events-crossing"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--rich-black))" }}
      data-theme="death"
      role="region"
      aria-label="The Crossing"
    >
      {/* Background texture with Ken Burns */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${venueEmptyImg})`,
          opacity: 0.04,
          animation: "events-crossing-kb 30s linear infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Breathing warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Dual-origin fog */}
      <div
        className="absolute inset-0 pointer-events-none motion-reduce:hidden"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 25% 75%, hsl(var(--vow-yellow) / 0.025), transparent 65%)",
        }}
        aria-hidden="true"
      />

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
          <span className="text-primary">.</span>
        </p>

        {/* CTA with golden halo */}
        <div
          className={cn(
            "relative mb-fitz-5 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionDelay: "500ms" }}
        >
          {/* Ambient halo behind CTA */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[70px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.12), transparent 70%)",
              animation: isVisible ? "events-crossing-halo 4s ease-in-out infinite" : undefined,
            }}
            aria-hidden="true"
          />
          <Button asChild size="lg" variant="primary-dark" className="relative">
            <Link to="/events/contact">Discuss your event</Link>
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
            "font-sans text-[12px] text-muted-foreground mt-1 transition-all duration-[700ms]",
            isVisible ? "opacity-60" : "opacity-0"
          )}
          style={{ transitionDelay: "850ms" }}
        >
          No obligation — just a conversation.
        </p>
      </div>

      <style>{`
        @keyframes events-crossing-kb {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.03) translate(0.2%, -0.2%); }
        }
        @keyframes events-crossing-halo {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          #events-crossing * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
