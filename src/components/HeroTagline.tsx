import { cn } from "@/lib/utils";

export function HeroTagline() {
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';
  
  // Stagger delays: role label → tagline line 1 → tagline line 2 → golden thread → subtitle
  const roleDelay = hasPlayed ? '0ms' : '6200ms';
  const taglineDelay1 = hasPlayed ? '50ms' : '6600ms';
  const taglineDelay2 = hasPlayed ? '150ms' : '7200ms';
  const threadDelay = hasPlayed ? '250ms' : '7600ms';
  const subtitleDelay = hasPlayed ? '350ms' : '7900ms';

  return (
    <div className="absolute bottom-[var(--hero-space-bottom,64px)] md:bottom-[var(--hero-space-bottom,64px)] left-[var(--hero-space-edge,24px)] md:left-[var(--hero-space-edge,48px)] z-20 pb-[env(safe-area-inset-bottom,0px)]">
      
      {/* Role Label — Whispered Context */}
      <p
        className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground opacity-0 animate-fade-in mb-4"
        style={{
          animationDelay: roleDelay,
          animationFillMode: "forwards",
        }}
      >
        Ceremony Pianist
      </p>

      {/* Main Tagline */}
      <h1 className="font-display text-[clamp(28px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] text-foreground" style={{ textShadow: '0 2px 16px hsl(var(--rich-black) / 0.5)' }}>
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
            className="text-primary"
            style={{ 
              textShadow: "0 0 40px hsl(var(--vow-yellow) / 0.5)",
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
            className="text-primary"
            style={{ 
              textShadow: "0 0 40px hsl(var(--vow-yellow) / 0.5)",
              opacity: 0.9
            }}
          >
            .
          </span>
        </span>
      </h1>

      {/* Golden Thread — 48px line, draws from left */}
      <div
        className="opacity-0 animate-fade-in mt-5 mb-4"
        style={{
          animationDelay: threadDelay,
          animationFillMode: "forwards",
        }}
      >
        <div
          className="h-[1px] w-12 origin-left animate-scale-in"
          style={{
            background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), transparent)",
            animationDelay: threadDelay,
            animationFillMode: "forwards",
          }}
        />
      </div>

      {/* Positioning Subtitle */}
      <p
        className="font-sans text-[clamp(13px,1.8vw,16px)] text-muted-foreground opacity-0 animate-fade-in max-w-[320px] md:max-w-[400px] leading-relaxed"
        style={{
          animationDelay: subtitleDelay,
          animationFillMode: "forwards",
        }}
      >
        I carry the weight of your ceremony — so every word spoken lands where it belongs.
      </p>
    </div>
  );
}
