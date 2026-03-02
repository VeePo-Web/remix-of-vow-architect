import React from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import witnessCeremony from "@/assets/witness-setup-ai.jpg";
import witnessKeys from "@/assets/witness-keys-ai.jpg";

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
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

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
      {/* Film grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Warm atmospheric fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Top fade from TheTransformation warm exit */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(42 28% 91%))' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Step 1: Asymmetric Two-Column Layout ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-start">

          {/* ── LEFT COLUMN: Cinematic Image Frame (Steps 1-2) ── */}
          <div
            className={cn(
              "witness-image-frame relative rounded-lg overflow-hidden transition-all duration-700",
              "aspect-[3/4] md:aspect-auto md:min-h-[520px]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{
              transitionDelay: isVisible ? "100ms" : "0ms",
            }}
          >
            {/* Image with cinematic grade + Ken Burns */}
            <img
              src={witnessCeremony}
              alt="Piano prepared for a wedding ceremony"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.28,
                animation: 'witness-ken-burns 30s ease-in-out infinite alternate',
                filter: 'saturate(0.7) sepia(0.15) contrast(1.1)',
                willChange: 'transform',
              }}
              loading="lazy"
              decoding="async"
            />
            {/* Radial vignette inside the frame */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, hsl(45 20% 93% / 0.85) 100%)',
              }}
              aria-hidden="true"
            />
            {/* Inner film grain */}
            <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />
            {/* Warm border */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 0 1px hsl(var(--vow-yellow) / 0.08)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── RIGHT COLUMN: Text Content (Steps 4-8) ── */}
          <div className="flex flex-col pt-2 md:pt-0">
            {/* Label */}
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE PREPARATION
            </p>

            {/* Step 8: Headline with ambient warm glow */}
            <div className="relative mb-10">
              {/* Glow behind "pianist" */}
              <div
                className="witness-headline-glow absolute pointer-events-none"
                style={{
                  width: '200px',
                  height: '120px',
                  right: '10%',
                  bottom: '20%',
                  background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <h2
                className={cn(
                  "text-[clamp(28px,4vw,40px)] font-display font-light leading-tight transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.97]"
                )}
                style={{
                  transitionDelay: isVisible ? "200ms" : "0ms",
                  textWrap: "balance" as any,
                  transformOrigin: "left center",
                }}
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
            </div>

            {/* Step 4 + 7: Declaration Cards with Golden Thread Connector */}
            <div className="relative mb-12">
              {/* Step 7: Vertical golden thread behind declarations */}
              <div
                className="witness-golden-thread absolute left-4 md:left-5 top-4 bottom-4 w-[1px] pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent, hsl(var(--vow-yellow) / 0.15), hsl(var(--vow-yellow) / 0.15), transparent)',
                }}
                aria-hidden="true"
              />

              <div className="space-y-4">
                {declarations.map((declaration, index) => (
                  <div
                    key={index}
                    className={cn(
                      "witness-declaration-card relative pl-10 md:pl-12 pr-5 py-5 rounded-md transition-all duration-700",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-12px]"
                    )}
                    style={{
                      transitionDelay: isVisible ? `${350 + index * 150}ms` : "0ms",
                      background: 'hsl(45 20% 92% / 0.5)',
                      border: '1px solid hsl(45 20% 85% / 0.2)',
                      boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03)',
                    }}
                  >
                    {/* Thread node diamond */}
                    <span
                      className="absolute left-[13px] md:left-[16px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rotate-45"
                      style={{
                        background: 'hsl(var(--vow-yellow) / 0.45)',
                        boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                      }}
                      aria-hidden="true"
                    />
                    <p className="text-base md:text-lg font-display font-light leading-relaxed text-foreground/90">
                      {declaration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden thread separator */}
            <div 
              className={cn(
                "h-[1px] w-16 mb-10 transition-all duration-700",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                transitionDelay: isVisible ? "700ms" : "0ms",
              }}
              aria-hidden="true"
            />

            {/* Step 6: Kit Items as a Visual Grid */}
            <div
              className={cn(
                "relative transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"
              )}
              style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
            >
              {/* Step 3: Piano keys texture behind kit */}
              <div className="absolute inset-0 -m-4 rounded-lg overflow-hidden pointer-events-none" aria-hidden="true">
                <img
                  src={witnessKeys}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.035, filter: 'saturate(0.5) blur(2px)' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5 relative z-10">
                What arrives with me
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
                {standardKit.map((item, index) => (
                  <div
                    key={index}
                    className="witness-kit-cell group flex flex-col items-center gap-2 py-3 px-2 rounded-md cursor-default transition-all duration-[180ms]"
                    style={{
                      background: 'hsl(45 20% 93% / 0.4)',
                      border: '1px solid hsl(45 20% 85% / 0.25)',
                    }}
                  >
                    {/* Diamond icon */}
                    <span
                      className="witness-kit-diamond inline-block w-[5px] h-[5px] rotate-45 transition-all duration-[180ms]"
                      style={{
                        background: 'hsl(var(--vow-yellow) / 0.45)',
                        boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-xs uppercase tracking-[0.18em] font-display text-muted-foreground group-hover:text-foreground transition-colors duration-[180ms] text-center">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing thought */}
            <p
              className={cn(
                "text-sm md:text-[15px] font-display font-light italic text-muted-foreground mt-12 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "950ms" : "0ms" }}
            >
              Now{"\u2014"}choose how long you want me there.
            </p>
          </div>
        </div>
      </div>

      {/* Step 9: Bottom fade into ThreePaths dark — extended height */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, hsl(240 9% 4%))',
        }}
        aria-hidden="true"
      />
      {/* Threshold golden line at bottom */}
      <div
        className="absolute bottom-[60px] left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, hsl(var(--vow-yellow) / 0.08) 50%, transparent 90%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
