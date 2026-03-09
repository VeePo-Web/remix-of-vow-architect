import { useEffect, useState } from "react";
import aboutHeroImg from "@/assets/about-hero.jpg";

export function WitnessHero() {
  const [revealPhase, setRevealPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setRevealPhase(1), 200),
      setTimeout(() => setRevealPhase(2), 500),
      setTimeout(() => setRevealPhase(3), 900),
      setTimeout(() => setRevealPhase(4), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="witness-hero" aria-label="The Witness" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background piano-section-target">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url(${aboutHeroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns 25s ease-in-out infinite alternate",
            filter: "saturate(0.85) contrast(1.05)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)", animation: "witness-vignette-breathe 6s ease-in-out infinite" }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)" }} aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--vow-yellow)) 0%, transparent 70%)" }} aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section numeral */}
          <span
            className={`block font-display text-[40px] font-light leading-none mb-6 transition-all duration-700 ${
              revealPhase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            01
          </span>

          <p className={`text-xs uppercase tracking-[0.3em] ml-[0.15em] text-muted-foreground text-center mb-8 transition-all duration-700 ${revealPhase >= 1 ? "opacity-70 translate-y-0" : "opacity-0 translate-y-4"}`}>
            THE WITNESS
          </p>

          <div className={`relative h-[2px] w-full max-w-2xl mx-auto mb-12 transition-all duration-1000 ${revealPhase >= 2 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}>
            <div className="absolute inset-0 bg-primary/40 vibrating-string motion-reduce:animate-none" />
            <div className="absolute inset-0 bg-primary blur-sm vibrating-string motion-reduce:animate-none" style={{ animationDelay: "50ms" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary motion-reduce:animate-none" style={{ boxShadow: "0 0 20px hsl(var(--vow-yellow)), 0 0 40px hsl(var(--vow-yellow) / 0.5)", animation: "vigil-pulse 4s ease-in-out infinite" }} />
          </div>

          <h1 className={`font-display text-[clamp(32px,5vw,56px)] font-light leading-[1.1] mb-6 max-w-[16ch] mx-auto transition-all duration-700 ${revealPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            I don't perform at weddings.
          </h1>
          
          <p className={`font-display text-[clamp(24px,3.5vw,40px)] font-light text-primary leading-[1.2] transition-all duration-700 ${revealPhase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            I witness them.
          </p>

          <div className={`mt-20 transition-all duration-700 ${revealPhase >= 4 ? "opacity-100" : "opacity-0"}`}>
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent mx-auto animate-pulse motion-reduce:animate-none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} aria-hidden="true" />
    </section>
  );
}
