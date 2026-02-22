import { cn } from "@/lib/utils";

export function HeroTagline() {
  return (
    <div className="absolute bottom-[var(--hero-space-bottom,48px)] left-[var(--hero-space-edge,24px)] md:left-[var(--hero-space-edge,48px)] z-20">
      {/* Main Tagline - Two Lines, Maximum Restraint */}
      <h1 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] text-foreground" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
        {/* Line 1: Death Theme */}
        <span 
          className="block opacity-0 animate-fade-in"
          style={{ 
            animationDelay: "6600ms",
            animationFillMode: "forwards"
          }}
        >
          'Til Death
          <span 
            className="text-[hsl(var(--vow-yellow))]"
            style={{ 
              textShadow: "0 0 32px hsl(var(--vow-yellow) / 0.5)",
              opacity: 0.85
            }}
          >
            ;
          </span>
        </span>

        {/* Line 2: Life Theme */}
        <span 
          className="block opacity-0 animate-fade-in"
          style={{ 
            animationDelay: "7200ms",
            animationFillMode: "forwards"
          }}
        >
          Unto Life
          <span 
            className="text-[hsl(var(--vow-yellow))]"
            style={{ 
              textShadow: "0 0 32px hsl(var(--vow-yellow) / 0.5)",
              opacity: 0.9
            }}
          >
            .
          </span>
        </span>
      </h1>
    </div>
  );
}
