import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * THE SUSTAIN — Abstract Piano Visualization
 * Three illuminated golden nodes connected by lines
 * Words, Silence, Memory — editorial layout, no card containers
 * Dark background to match vigil mood and ensure contrast
 */

const threeKeys = [
  {
    label: "Words",
    description: "I carry every syllable so it lands where it belongs."
  },
  {
    label: "Silence",
    description: "I guard the pause between what is spoken."
  },
  {
    label: "Memory",
    description: "I remember what was said when memory fades."
  }
];

export function WitnessSustain() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      id="witness-sustain"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 piano-section-target"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--surface)) 100%)"
      }}
    >
      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Ambient golden glow behind visualization */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow)) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-center mb-4 transition-all duration-700",
              isVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            THE SUSTAIN
          </p>

          {/* Golden rule */}
          <div className="w-12 h-px mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)" }} />

          {/* Headline */}
          <h2 
            className={cn(
              "font-display text-[clamp(28px,4vw,48px)] font-normal text-center leading-tight mb-16 text-foreground transition-all duration-700 max-w-3xl mx-auto",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Like a sustain pedal holds a note,<br />
            I hold your ceremony.
          </h2>

          {/* Abstract Visualization — Three connected golden nodes with boosted opacity */}
          <div 
            className={cn(
              "relative flex justify-center items-center mb-20 h-20 transition-all duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <svg viewBox="0 0 400 40" className="w-full max-w-md h-auto" aria-hidden="true">
              <defs>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Connecting line — boosted opacity */}
              <line 
                x1="60" y1="20" x2="340" y2="20" 
                stroke="hsl(var(--vow-yellow))" 
                strokeWidth="1" 
                opacity="0.20"
              />
              {/* Three nodes with boosted glow */}
              {[60, 200, 340].map((cx, i) => (
                <g key={i} filter="url(#nodeGlow)">
                  <circle cx={cx} cy="20" r="18" fill="hsl(var(--vow-yellow))" opacity="0.12">
                    <animate attributeName="opacity" values="0.08;0.16;0.08" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy="20" r="7" fill="hsl(var(--vow-yellow))" opacity="0.3">
                    <animate attributeName="opacity" values="0.2;0.4;0.2" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy="20" r="3" fill="hsl(var(--vow-yellow))" opacity="1">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* Three Keys — Editorial layout, no card containers */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {threeKeys.map((item, index) => (
              <div 
                key={item.label}
                className={cn(
                  "text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                {/* Glowing dot — boosted */}
                <div 
                  className="w-2.5 h-2.5 rounded-full mx-auto mb-6"
                  style={{ 
                    background: "hsl(var(--vow-yellow))",
                    boxShadow: "0 0 16px hsl(var(--vow-yellow) / 0.4), 0 0 32px hsl(var(--vow-yellow) / 0.2)" 
                  }}
                />
                
                {/* Label */}
                <h3 className="font-display text-2xl font-light text-foreground mb-4 tracking-wide">
                  {item.label}
                </h3>

                {/* Golden thread separator */}
                <div 
                  className="w-8 h-px mx-auto mb-4"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)" }}
                />
                
                {/* Description */}
                <p className="text-muted-foreground text-[15px] leading-[1.7] max-w-[240px] mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section fade bottom → Presence */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
