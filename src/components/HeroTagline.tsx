import { cn } from "@/lib/utils";

export function HeroTagline() {
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';
  const taglineDelay1 = hasPlayed ? '0ms' : '6600ms';
  const taglineDelay2 = hasPlayed ? '100ms' : '7200ms';

  return (
    <div className="absolute bottom-[var(--hero-space-bottom,48px)] left-[var(--hero-space-edge,24px)] md:left-[var(--hero-space-edge,48px)] z-20">
      {/* Main Tagline - Two Lines, Maximum Restraint */}
      <h1 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] text-foreground" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
        {/* Line 1: Death Theme */}
        <span 
          className="block opacity-0 animate-fade-in"
          style={{ 
            animationDelay: taglineDelay1,
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
            animationDelay: taglineDelay2,
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
