import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import eventsHeroImg from "@/assets/events-hero.jpg";

export function EventsAboutHero() {
  const [revealPhase, setRevealPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setRevealPhase(1), 200),   // Label
      setTimeout(() => setRevealPhase(2), 500),   // Vibration string
      setTimeout(() => setRevealPhase(3), 900),   // Headline
      setTimeout(() => setRevealPhase(4), 1300),  // Description
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="events-about-hero"
      aria-label="The Atmosphere"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden piano-section-target"
      style={{ background: "hsl(var(--rich-black))" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={eventsHeroImg}
          alt=""
          className="w-full h-full object-cover"
          style={{
            opacity: 0.12,
            animation: "ken-burns 30s ease-in-out infinite alternate",
            filter: "saturate(0.7) contrast(1.1)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black)) 100%)",
          animation: "witness-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Warm fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Label */}
        <p
          className={cn(
            "text-xs uppercase tracking-[0.3em] ml-[0.15em] mb-6 transition-all duration-700",
            revealPhase >= 1 ? "opacity-50 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          THE ATMOSPHERE
        </p>

        {/* Vibrating string */}
        <div
          className={cn(
            "relative h-[2px] w-48 mx-auto mb-10 transition-all duration-1000",
            revealPhase >= 2 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
        >
          <div className="absolute inset-0 bg-primary/30 blur-[2px]" />
          <div className="absolute inset-0 bg-primary/50" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "hsl(var(--vow-yellow) / 0.15)",
              filter: "blur(6px)",
              animation: "vigil-pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "font-display text-[clamp(28px,4.5vw,56px)] font-light leading-[1.15] text-foreground transition-all duration-1000",
            revealPhase >= 3 ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
          )}
        >
          I don't play at events.
          <br />
          <span className="italic" style={{ color: "hsl(var(--vow-yellow))" }}>
            I listen to them.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "mt-6 text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-700",
            revealPhase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Live music that shapes the feeling of being together.
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
