import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const covenantPromises = [
  "I will arrive an hour before you need me.",
  "I will prepare as though your ceremony were my own.",
  "I will guard the silence between your words.",
  "I will carry your vows so they land where they belong.",
  "I will remember what was spoken when memory fades.",
];

export function WitnessCovenant() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [signatureDrawn, setSignatureDrawn] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setSignatureDrawn(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section 
      id="witness-covenant"
      aria-label="The Covenant"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 piano-section-target"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--deep-graphite)) 100%)"
      }}
    >
      {/* Parallax watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.015]"
        style={{ color: "hsl(var(--foreground))" }}
        aria-hidden="true"
      >
        Promise
      </span>

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Section numeral + label */}
          <div className={cn(
            "text-center mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span
              className="block font-display text-[40px] font-light leading-none mb-3"
              style={{
                background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              05
            </span>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                THE COVENANT
              </p>
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
            </div>
          </div>

          <div className="w-12 h-px mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)", boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.08)" }} />

          {/* Certificate Container with shimmer sweep */}
          <div 
            className={cn(
              "group relative p-12 md:p-16 bg-[hsl(var(--deep-graphite))] border border-primary/20 rounded-sm overflow-hidden transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-8 blur-sm"
            )}
            style={{ 
              transitionDelay: "200ms",
              boxShadow: "0 20px 60px hsl(var(--rich-black) / 0.12), 0 0 0 1px hsl(var(--primary) / 0.08), inset 0 0 80px hsl(var(--vow-yellow) / 0.05)"
            }}
          >
            {/* Gold shimmer sweep on hover */}
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none motion-reduce:hidden"
              style={{
                background: "linear-gradient(105deg, transparent 40%, hsl(var(--vow-yellow) / 0.06) 50%, transparent 60%)",
              }}
              aria-hidden="true"
            />

            <div className="absolute inset-0 grain opacity-[0.08] rounded-sm pointer-events-none" aria-hidden="true" />

            {/* Corner ornaments */}
            <div className="absolute top-5 left-5 w-12 h-12 border-l border-t border-primary/40" style={{ filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.1))" }} />
            <div className="absolute top-5 right-5 w-12 h-12 border-r border-t border-primary/40" style={{ filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.1))" }} />
            <div className="absolute bottom-5 left-5 w-12 h-12 border-l border-b border-primary/40" style={{ filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.1))" }} />
            <div className="absolute bottom-5 right-5 w-12 h-12 border-r border-b border-primary/40" style={{ filter: "drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.1))" }} />

            <div className="text-center mb-10 relative">
              <h2 className="font-display text-[clamp(24px,3vw,36px)] font-light text-foreground">My Promise to You</h2>
              <div className="w-24 h-px mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
            </div>

            <div className="space-y-4 mb-12 relative">
              {covenantPromises.map((promise, index) => (
                <p 
                  key={index}
                  className={cn(
                    "font-display text-lg text-foreground text-center leading-relaxed transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  {promise}
                </p>
              ))}
            </div>

            {/* Signature Area */}
            <div className="relative text-center pt-8 border-t border-border/20">
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full pointer-events-none motion-reduce:hidden"
                style={{
                  background: "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.12) 0%, transparent 70%)",
                  animation: signatureDrawn ? "vigil-pulse 4s ease-in-out infinite" : "none",
                  opacity: signatureDrawn ? 1 : 0,
                  transition: "opacity 1.5s ease-out"
                }}
                aria-hidden="true"
              />
              <div className="relative h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 240 60" className="w-60 h-auto" style={{ overflow: "visible" }}>
                  <defs>
                    <filter id="inkBloom" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation={signatureDrawn ? "0" : "2"} result="blur">
                        <animate attributeName="stdDeviation" from="2" to="0" dur="1.5s" begin="0s" fill="freeze" className="motion-reduce:hidden" />
                      </feGaussianBlur>
                    </filter>
                    <filter id="goldenTrail" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" />
                    </filter>
                  </defs>
                  <path d="M20,30 Q40,20 60,30 T100,30 Q110,28 120,30 T160,30 Q170,28 180,30 T220,30" fill="none" stroke="hsl(var(--vow-yellow))" strokeWidth="2" strokeLinecap="round" filter="url(#goldenTrail)" opacity={signatureDrawn ? "0.4" : "0"} style={{ strokeDasharray: 300, strokeDashoffset: signatureDrawn ? 0 : 300, transition: "stroke-dashoffset 1.7s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s, opacity 0.5s ease-out 1.5s" }} />
                  <path d="M20,30 Q40,20 60,30 T100,30 Q110,28 120,30 T160,30 Q170,28 180,30 T220,30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" filter="url(#inkBloom)" style={{ strokeDasharray: 300, strokeDashoffset: signatureDrawn ? 0 : 300, transition: "stroke-dashoffset 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)" }} />
                </svg>
              </div>
              <p className={cn("font-display text-xl text-foreground transition-all duration-700", signatureDrawn ? "opacity-100" : "opacity-0")} style={{ textShadow: '0 1px 2px hsl(var(--rich-black) / 0.3), 0 -1px 1px hsl(var(--vow-yellow) / 0.05)' }}>
                Parker Gawryletz
              </p>
              <p className={cn("text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1 transition-all duration-700", signatureDrawn ? "opacity-100" : "opacity-0")} style={{ transitionDelay: "200ms" }}>
                Ceremony Pianist
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--rich-black)) 85%)" }} aria-hidden="true" />
    </section>
  );
}
