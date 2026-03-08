import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * THE COVENANT — Personal Promise Certificate
 * Certificate-style layout with signature draw animation
 * Warm texture and breathing golden glow behind signature
 */

const covenantPromises = [
  "I will arrive an hour before you need me.",
  "I will test every microphone before your guests arrive.",
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
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 piano-section-target"
      style={{
        background: "linear-gradient(180deg, hsl(var(--surface)) 0%, hsl(var(--surface-warm)) 100%)"
      }}
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-center mb-4 transition-all duration-700",
              isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            THE COVENANT
          </p>

          {/* Golden rule separator with luminous glow */}
          <div 
            className="w-12 h-px mx-auto mb-8" 
            style={{ 
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)",
              boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.08)",
            }} 
          />

          {/* Certificate Container — upgraded ornaments and warmth */}
          <div 
            className={cn(
              "relative p-12 md:p-16 bg-card border border-primary/15 rounded-sm transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ 
              transitionDelay: "200ms",
              boxShadow: "0 20px 60px hsl(var(--rich-black) / 0.08), 0 0 0 1px hsl(var(--primary) / 0.06), inset 0 0 80px hsl(var(--vow-yellow) / 0.04)"
            }}
          >
            {/* Film grain texture on certificate */}
            <div className="absolute inset-0 grain opacity-[0.08] rounded-sm pointer-events-none" aria-hidden="true" />

            {/* Corner ornaments — larger, warmer */}
            <div className="absolute top-5 left-5 w-16 h-16 border-l border-t border-primary/30" />
            <div className="absolute top-5 right-5 w-16 h-16 border-r border-t border-primary/30" />
            <div className="absolute bottom-5 left-5 w-16 h-16 border-l border-b border-primary/30" />
            <div className="absolute bottom-5 right-5 w-16 h-16 border-r border-b border-primary/30" />

            {/* Certificate Header */}
            <div className="text-center mb-10 relative">
              <h2 className="font-display text-[clamp(24px,3vw,36px)] font-light text-foreground">
                My Promise to You
              </h2>
              <div 
                className="w-24 h-px mx-auto mt-4" 
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)" }}
              />
            </div>

            {/* Promises */}
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

            {/* Signature Area with breathing glow */}
            <div className="relative text-center pt-8 border-t border-border/20">
              {/* Breathing golden glow behind signature — stronger */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 rounded-full pointer-events-none motion-reduce:animate-none"
                style={{
                  background: "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.10) 0%, transparent 70%)",
                  animation: signatureDrawn ? "vigil-pulse 8s ease-in-out infinite" : "none",
                }}
                aria-hidden="true"
              />

              {/* Signature SVG with draw animation */}
              <div className="relative h-16 mb-4 flex items-center justify-center">
                <svg 
                  viewBox="0 0 200 50" 
                  className="w-48 h-auto"
                  style={{ overflow: "visible" }}
                >
                  <path
                    d="M10,35 Q30,10 50,30 T90,25 Q110,20 130,30 T170,28 Q185,25 190,30"
                    fill="none"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={cn(
                      "transition-all duration-1000",
                      signatureDrawn ? "signature-drawn" : "signature-hidden"
                    )}
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: signatureDrawn ? 0 : 300,
                    }}
                  />
                </svg>
              </div>
              
              {/* Name */}
              <p 
                className={cn(
                  "font-display text-xl text-foreground transition-all duration-700",
                  signatureDrawn ? "opacity-100" : "opacity-0"
                )}
              >
                Parker Gawryletz
              </p>
              <p 
                className={cn(
                  "text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1 transition-all duration-700",
                  signatureDrawn ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                Ceremony Pianist
              </p>
            </div>
          </div>

          {/* Tagline beneath — sacred semicolon treatment */}
          <div 
            className={cn(
              "mt-12 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "2000ms" }}
          >
            <div 
              className="h-px w-16 mx-auto mb-6"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)" }}
            />
            <p className="font-display text-xl text-center text-foreground italic">
              'Til Death<span className="text-primary not-italic">;</span> Unto Life.
            </p>
          </div>
        </div>
      </div>

      {/* Section fade bottom → Crossing */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--rich-black)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
