import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * THE SUSTAIN — Abstract Piano Visualization
 * Three illuminated golden nodes connected by lines
 * Words, Silence, Memory — the sustain pedal metaphor
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
        background: "linear-gradient(180deg, hsl(var(--surface)) 0%, hsl(var(--surface-warm)) 100%)"
      }}
    >
      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" style={{ willChange: "opacity" }} aria-hidden="true" />

      {/* Ambient golden glow behind visualization */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow)) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-center mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0 text-muted-foreground" : "opacity-0 translate-y-4"
            )}
          >
            THE SUSTAIN
          </p>

          {/* Headline */}
          <h2 
            className={cn(
              "font-display text-[clamp(28px,4vw,48px)] font-light text-center leading-tight mb-16 text-foreground transition-all duration-700 max-w-3xl mx-auto",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Like a sustain pedal holds a note,<br />
            I hold your ceremony.
          </h2>

          {/* Abstract Visualization — Three connected golden nodes with glow filter */}
          <div 
            className={cn(
              "relative flex justify-center items-center mb-16 h-20 transition-all duration-1000",
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
              {/* Connecting line — elegant dashed */}
              <line 
                x1="60" y1="20" x2="340" y2="20" 
                stroke="hsl(var(--vow-yellow))" 
                strokeWidth="1" 
                opacity="0.15"
                strokeDasharray="4 8"
              />
              {/* Three nodes with glow filter */}
              {[60, 200, 340].map((cx, i) => (
                <g key={i} filter="url(#nodeGlow)">
                  <circle cx={cx} cy="20" r="12" fill="hsl(var(--vow-yellow))" opacity="0.08">
                    <animate attributeName="opacity" values="0.06;0.12;0.06" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy="20" r="6" fill="hsl(var(--vow-yellow))" opacity="0.15">
                    <animate attributeName="opacity" values="0.12;0.22;0.12" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy="20" r="3" fill="hsl(var(--vow-yellow))" opacity="0.8">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* Three Keys Content */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {threeKeys.map((item, index) => (
              <div 
                key={item.label}
                className={cn(
                  "text-center p-6 rounded-lg bg-card/60 backdrop-blur-[6px] border border-border/40 card-sacred-sm transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                {/* Glowing dot */}
                <div 
                  className="w-3 h-3 rounded-full bg-primary mx-auto mb-4"
                  style={{ boxShadow: "0 0 12px hsl(var(--vow-yellow) / 0.15), 0 0 20px hsl(var(--vow-yellow) / 0.1)" }}
                />
                
                {/* Label */}
                <h3 className="font-display text-2xl font-light text-foreground mb-3">
                  {item.label}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-[14px] leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section fade bottom → Presence */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
