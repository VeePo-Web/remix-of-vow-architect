import { cn } from "@/lib/utils";

export function HeroTagline() {
  return (
    <div className="absolute bottom-12 md:bottom-16 left-8 md:left-12 z-20 space-y-4">
      {/* Main Tagline - Two Lines */}
      <div className="space-y-2">
        <h1 className="font-display text-[clamp(36px,5vw,54px)] leading-[1.1] text-foreground">
          {/* Line 1: Death Theme */}
          <span 
            className="block opacity-0 animate-fade-in"
            style={{ 
              animationDelay: "1200ms",
              animationFillMode: "forwards"
            }}
          >
            'Til Death
            <span 
              className="text-[hsl(var(--vow-yellow))]"
              style={{ 
                textShadow: "0 0 40px hsl(var(--vow-yellow) / 0.6)",
                opacity: 0.8
              }}
            >
              ;
            </span>
          </span>

          {/* Line 2: Life Theme */}
          <span 
            className="block opacity-0 animate-fade-in"
            style={{ 
              animationDelay: "1400ms",
              animationFillMode: "forwards"
            }}
          >
            Unto Life
            <span 
              className="text-[hsl(var(--vow-yellow))]"
              style={{ 
                textShadow: "0 0 40px hsl(var(--vow-yellow) / 0.6)",
                opacity: 0.9
              }}
            >
              .
            </span>
          </span>
        </h1>

        {/* Golden Divider */}
        <div 
          className="h-[1px] w-12 opacity-0 animate-fade-in"
          style={{ 
            background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.8), transparent)",
            animationDelay: "1600ms",
            animationFillMode: "forwards"
          }}
        />
      </div>

      {/* Subtitle */}
      <p 
        className="text-sm font-sans text-muted-foreground uppercase tracking-[0.22em] opacity-0 animate-fade-in"
        style={{ 
          animationDelay: "1800ms",
          animationFillMode: "forwards"
        }}
      >
        Wedding Pianist
      </p>
    </div>
  );
}
