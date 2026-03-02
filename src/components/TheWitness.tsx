import React from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import witnessCeremony from "@/assets/witness-setup-ai.jpg";

const declarations = [
  "I arrive before anyone else\u2014and I stay until the room is empty.",
  "Every note is heard in the room before your first guest walks in.",
  "Your cue sheet is rehearsed until it feels like instinct.",
];

const standardKit = [
  "Piano",
  "Backup Piano",
  "Sound System",
  "Printed Cue Sheet",
  "Liability Insurance",
  "Rain Cover",
];

export function TheWitness() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      id="the-witness"
      ref={sectionRef}
      data-theme="life"
      className="relative section--surface section-padding-standard piano-section-target overflow-hidden min-h-[400px]"
      style={{
        background: "linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)",
      }}
    >
      {/* Background image layer with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={witnessCeremony}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
          style={{
            animation: 'witness-ken-burns 25s ease-in-out infinite alternate',
            filter: 'saturate(0.85) contrast(1.05)',
            willChange: 'transform',
          }}
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(45 20% 93% / 0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Warm atmospheric fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Top fade from TheTransformation warm exit */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(42 28% 91%))' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            {/* Label */}
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE WITNESS
            </p>

            {/* Step 5: Headline with animated golden vow underline on "pianist" */}
            <h2
              className={cn(
                "text-[clamp(28px,4vw,40px)] font-display font-light leading-tight mb-10 text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any }}
            >
            Not a performer—<br />
            your ceremony{" "}
              <span className="relative inline-block">
                pianist
                <span
                  className={cn(
                    "absolute left-0 right-0 -bottom-1 h-[2px] origin-left transition-transform duration-700",
                    isVisible ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.2))",
                    boxShadow: isVisible ? "0 0 8px hsl(var(--vow-yellow) / 0.3)" : "none",
                    transitionDelay: isVisible ? "600ms" : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                  }}
                  aria-hidden="true"
                />
              </span>
              .
            </h2>

            {/* Three Declarations — generous spacing */}
            <div className="space-y-6 mb-12">
              {declarations.map((declaration, index) => (
                <React.Fragment key={index}>
                  <p 
                    className={cn(
                      "text-lg font-display font-light leading-relaxed text-foreground/90 text-center transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms" }}
                  >
                    {declaration}
                  </p>
                  {index < declarations.length - 1 && (
                    <div className="flex justify-center" aria-hidden="true">
                      <span
                        className="inline-block w-[4px] h-[4px] rotate-45"
                        style={{
                          background: 'hsl(var(--vow-yellow) / 0.4)',
                          boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Golden thread separator */}
            <div 
              className={cn(
                "h-[1px] w-16 mx-auto mb-10 transition-all duration-700",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                transitionDelay: isVisible ? "550ms" : "0ms",
              }}
              aria-hidden="true"
            />

            {/* Step 6: Standard Kit — with hover accent bars */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5">
                What arrives with me
              </p>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                {standardKit.map((item, index) => (
                  <span key={index} className="flex items-center gap-x-3">
                    <span className="group relative text-xs uppercase tracking-[0.18em] font-display text-muted-foreground transition-colors duration-[180ms] hover:text-foreground flex items-center gap-2 cursor-default">
                      {/* Hover accent bar */}
                      <span
                        className="w-[2px] h-0 group-hover:h-4 rounded-full transition-all duration-[180ms]"
                        style={{
                          background: 'hsl(var(--vow-yellow) / 0.5)',
                          transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                        }}
                        aria-hidden="true"
                      />
                      {item}
                    </span>
                    {index < standardKit.length - 1 && (
                      <span
                        className="witness-kit-diamond inline-block w-[4px] h-[4px] rotate-45"
                        style={{
                          background: 'hsl(var(--vow-yellow) / 0.5)',
                          boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.2)',
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Closing thought */}
            <p
              className={cn(
                "text-sm font-display font-light italic text-muted-foreground text-center mt-10 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "750ms" : "0ms" }}
            >
              Now{"\u2014"}choose how long you want me there.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade into ThreePaths dark */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 4%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
