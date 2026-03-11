import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useNavigate } from "react-router-dom";
import eventsHeroImg from "@/assets/events-hero.jpg";

export function EventsAboutCrossing() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const navigate = useNavigate();

  return (
    <section
      id="events-about-crossing"
      aria-label="The Crossing"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[140px] px-4 overflow-hidden piano-section-target"
      data-theme="death"
      style={{ background: "hsl(var(--rich-black))" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={eventsHeroImg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{
            opacity: 0.08,
            animation: "ken-burns 30s ease-in-out infinite alternate",
            filter: "saturate(0.6) contrast(1.1)",
            willChange: "transform",
          }}
        />
      </div>

      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black)) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className={cn(
              "text-xs uppercase tracking-[0.3em] ml-[0.15em] mb-6 transition-all duration-700",
              isVisible ? "opacity-50 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            THE CROSSING
          </p>

          <h2
            className={cn(
              "font-display text-[clamp(24px,3.5vw,44px)] font-light text-foreground mb-6 transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Your event deserves{" "}
            <span className="italic" style={{ color: "hsl(var(--vow-yellow))" }}>presence.</span>
          </h2>

          <p
            className={cn(
              "text-lg text-muted-foreground leading-relaxed mb-10 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            Tell me about your gathering — the venue, the guests, the feeling you want in the room. I will show you how live piano transforms it.
          </p>

          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "600ms" }}
          >
            <ShimmerButton onClick={() => navigate("/events/contact")}>Discuss your event</ShimmerButton>
          </div>

          <p
            className={cn(
              "text-xs text-muted-foreground mt-6 transition-all duration-700",
              isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "800ms" }}
          >
            Response within 24 hours. Always.
          </p>

          {/* Golden thread */}
          <div
            className={cn(
              "mt-12 transition-all duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1000ms" }}
          >
            <div
              className="h-px w-32 mx-auto mb-4"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }}
            />
            <p className="font-display text-sm text-muted-foreground italic opacity-50">
              'Til Death; Unto Life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
