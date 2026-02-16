import { useEffect, useState } from "react";
import aboutHeroImg from "@/assets/about-hero.jpg";

/**
 * THE RESONANCE — Hero Section
 * A single vibrating golden string that resonates like a struck piano key
 * Background image with cinematic vignette and film grain
 */
export function WitnessHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background image with Ken Burns */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url(${aboutHeroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "ken-burns 25s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Cinematic vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)"
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, hsl(var(--vow-yellow)) 0%, transparent 70%)"
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* The Label */}
          <p 
            className={`text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            THE WITNESS
          </p>

          {/* The Vibrating String */}
          <div 
            className={`relative h-[2px] w-full max-w-2xl mx-auto mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="absolute inset-0 bg-primary/40 vibrating-string" />
            <div className="absolute inset-0 bg-primary blur-sm vibrating-string" style={{ animationDelay: "50ms" }} />
            {/* Center glow point */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
              style={{ boxShadow: "0 0 20px hsl(var(--vow-yellow)), 0 0 40px hsl(var(--vow-yellow) / 0.5)" }}
            />
          </div>

          {/* The Statement */}
          <h1 
            className={`font-display text-[clamp(32px,5vw,56px)] font-light leading-[1.1] mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            I don't perform at weddings.
          </h1>
          
          <p 
            className={`font-display text-[clamp(24px,3.5vw,40px)] font-light text-primary leading-[1.2] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            I witness them.
          </p>

          {/* Scroll indicator */}
          <div 
            className={`mt-20 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1500ms" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
