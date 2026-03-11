import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const threeKeys = [
  { label: "Words", description: "I carry every syllable so it lands where it belongs." },
  { label: "Silence", description: "I guard the pause between what is spoken." },
  { label: "Memory", description: "I remember what was said when memory fades." },
];

export function WitnessSustain() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      id="witness-sustain"
      aria-label="The Sustain"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 piano-section-target"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)"
      }}
    >
      {/* Parallax watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.015]"
        style={{ color: "hsl(var(--foreground))" }}
        aria-hidden="true"
      >
        Sustain
      </span>

      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow)) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Section numeral + label */}
          <div className={cn(
            "text-center mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span
              className="block font-display text-[40px] font-light leading-none mb-3 mx-auto"
              style={{
                background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              03
            </span>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                THE SUSTAIN
              </p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          <div className="w-12 h-px mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)" }} />

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

          {/* SVG Visualization */}
          <div 
            className={cn(
              "relative flex justify-center items-center mb-20 h-24 transition-all duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <div 
              className="absolute inset-0 flex justify-center items-center"
              style={{
                background: 'radial-gradient(ellipse 60% 100% at center, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
              aria-hidden="true"
            />
            <svg viewBox="0 0 400 60" className="w-full max-w-md h-auto relative z-10" aria-hidden="true">
              <defs>
                <filter id="outerGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="midGlow" x="-75%" y="-75%" width="250%" height="250%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0.3">
                    <animate attributeName="stopOpacity" values="0.1;0.4;0.1" dur="8s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="hsl(var(--vow-yellow))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="60" y1="30" x2="340" y2="30" stroke="hsl(var(--vow-yellow))" strokeWidth="1.5" opacity="0.25" strokeDasharray="280" strokeDashoffset="0">
                <animate attributeName="strokeDashoffset" from="280" to="0" dur="6s" repeatCount="indefinite" />
              </line>
              <line x1="60" y1="30" x2="340" y2="30" stroke="url(#shimmerGradient)" strokeWidth="2" opacity="1" />
              {[60, 200, 340].map((cx, i) => (
                <g key={i}>
                  <circle cx={cx} cy="30" r="24" fill="hsl(var(--vow-yellow))" opacity="0.08" filter="url(#outerGlow)" className="motion-reduce:animate-none">
                    <animate attributeName="opacity" values="0.08;0.16;0.08" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy="30" r="12" fill="hsl(var(--vow-yellow))" opacity="0.2" filter="url(#midGlow)" className="motion-reduce:animate-none">
                    <animate attributeName="opacity" values="0.2;0.4;0.2" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy="30" r="4" fill="hsl(var(--vow-yellow))" opacity="0.8" filter="url(#innerGlow)" className="motion-reduce:animate-none">
                    <animate attributeName="opacity" values="0.8;1.0;0.8" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* Three Keys */}
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
                <div 
                  className="w-2.5 h-2.5 rounded-full mx-auto mb-6"
                  style={{ 
                    background: "hsl(var(--vow-yellow))",
                    boxShadow: "0 0 16px hsl(var(--vow-yellow) / 0.4), 0 0 32px hsl(var(--vow-yellow) / 0.2)" 
                  }}
                />
                <h3 className="font-display text-2xl font-light text-foreground mb-4 tracking-wide">{item.label}</h3>
                <div className="w-8 h-px mx-auto mb-4" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)" }} />
                <p className="text-muted-foreground text-[15px] leading-[1.7] max-w-[240px] mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
