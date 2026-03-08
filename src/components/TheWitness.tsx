import React, { useCallback } from "react";
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

/* ═══════════════════════════════════════════════════════════
   SECTION A — "The Preparation" (Declarations)
   Life-space cream · image left, text right · [2fr 3fr]
   ═══════════════════════════════════════════════════════════ */

function PreparationSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="the-witness"
      ref={ref as React.RefObject<HTMLElement>}
      data-theme="life"
      role="region"
      aria-label="The Preparation"
      className="relative section--surface py-[80px] md:py-[120px] piano-section-target overflow-hidden min-h-[400px]"
      style={{
        background: "linear-gradient(180deg, hsl(var(--warm-cream)) 0%, hsl(var(--warm-cream-mid)) 45%, hsl(var(--warm-cream)) 100%)",
      }}
    >
      <span className="sr-only">
        The Preparation section describes Parker's commitment to excellence: early arrival,
        sound-checked piano, and rehearsed cue sheets.
      </span>

      {/* ── Atmospheric layers ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 40% 40%, hsl(var(--warm-glow-soft) / 0.08) 0%, transparent 80%)',
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, hsl(var(--warm-vignette) / 0.18) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="witness-breathing-glow absolute pointer-events-none"
        style={{
          width: '500px', height: '500px', left: '15%', top: '30%',
          background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Top fade from TheTransformation */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(var(--warm-card-top)))' }}
        aria-hidden="true"
      />

      {/* ── Content grid ── */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-start">

          {/* LEFT: Cinematic image */}
          <div
            className={cn(
              "witness-image-frame relative rounded-lg overflow-hidden",
              "aspect-[4/3] md:aspect-auto md:min-h-[480px]",
              "transition-all duration-[900ms]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
          >
            <img
              src={witnessCeremony}
              alt="Piano prepared for a wedding ceremony"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.28,
                animation: 'witness-ken-burns 30s ease-in-out infinite alternate',
                filter: 'saturate(0.7) sepia(0.15) contrast(1.1)',
              }}
              loading="lazy"
              decoding="async"
            />
            <div className="witness-frame-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--warm-cream-mid) / 0.75) 100%)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px hsl(var(--vow-yellow) / 0.1)' }}
              aria-hidden="true"
            />
            <div
              className="witness-light-bleed absolute -inset-4 pointer-events-none rounded-lg"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)',
                filter: 'blur(20px)', zIndex: -1,
              }}
              aria-hidden="true"
            />
          </div>

          {/* RIGHT: Label, headline, paragraph, declaration cards */}
          <div className="flex flex-col pt-2 md:pt-0">
            {/* Label */}
            <p
              className={cn(
                "text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground mb-0 transition-all duration-700 flex items-center gap-2",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              )}
            >
              <span
                className="witness-label-diamond w-[4px] h-[4px] rotate-45 inline-block flex-shrink-0"
                style={{ background: 'hsl(var(--vow-yellow) / 0.45)' }}
                aria-hidden="true"
              />
              THE PREPARATION
            </p>

            {/* Thread bridge */}
            <div
              className={cn(
                "flex justify-start my-3 transition-all duration-700",
                isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              )}
              style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
              aria-hidden="true"
            >
              <div
                className="witness-label-thread w-[1px] h-[24px]"
                style={{ background: 'linear-gradient(180deg, hsl(var(--vow-yellow) / 0.35), hsl(var(--vow-yellow) / 0.08))' }}
              />
            </div>

            {/* Headline */}
            <div className="relative mb-10">
              <div
                className="witness-headline-glow absolute pointer-events-none"
                style={{
                  width: '300px', height: '160px', right: '5%', bottom: '10%',
                  background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.05) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <h2
                className={cn(
                  "text-[clamp(30px,4.5vw,40px)] font-display font-light leading-tight tracking-[0.02em] transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
                )}
                style={{
                  transitionDelay: isVisible ? "200ms" : "0ms",
                  textWrap: "balance" as any,
                }}
              >
                Not a performer—<br />
                your ceremony{" "}
                <span className="relative inline-block">
                  pianist
                  <span
                    className={cn(
                      "witness-pianist-underline absolute left-0 right-0 -bottom-1 h-[2px] origin-left transition-transform duration-700",
                      isVisible ? "scale-x-100" : "scale-x-0"
                    )}
                    style={{
                      background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.2))",
                      transitionDelay: isVisible ? "600ms" : "0ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                    }}
                    aria-hidden="true"
                  />
                </span>
                .
              </h2>
            </div>

            {/* Introductory paragraph */}
            <p
              className={cn(
                "text-base md:text-lg leading-relaxed text-muted-foreground max-w-[38ch] mb-10 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              )}
              style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
            >
              Excellence on the big day does not happen on the big day. It happens in the weeks before — in the conversations, the rehearsals, the quiet hours of preparation that no one sees.
            </p>

            {/* Declaration Cards */}
            <div className="witness-declarations-container relative">
              <div
                className="witness-golden-thread absolute left-4 md:left-5 top-4 bottom-4 w-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 2%, hsl(var(--vow-yellow) / 0.3) 15%, hsl(var(--vow-yellow) / 0.3) 85%, transparent 98%)' }}
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
                      transitionDelay: isVisible ? `${500 + index * 100}ms` : "0ms",
                      background: 'linear-gradient(180deg, hsl(var(--warm-card-top) / 0.7) 0%, hsl(var(--warm-card-bottom) / 0.5) 100%)',
                      border: '1px solid hsl(var(--warm-card-border) / 0.25)',
                      borderTop: '1px solid hsl(var(--warm-card-highlight) / 0.5)',
                    }}
                  >
                    <span
                      className={cn(
                        "witness-thread-diamond absolute left-[13px] md:left-[16px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rotate-45",
                        isVisible && "witness-thread-diamond--active"
                      )}
                      style={{
                        background: 'hsl(var(--vow-yellow) / 0.45)',
                        boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                        animationDelay: isVisible ? `${600 + index * 100}ms` : '0ms',
                      }}
                      aria-hidden="true"
                    />
                    <p className="text-base md:text-lg font-display font-light leading-relaxed text-foreground">
                      {declaration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Golden thread bridge at bottom boundary */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 15%, hsl(var(--vow-yellow) / 0.12) 50%, transparent 85%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION B — "The Kit" (Inventory)
   Life-space warmer cream · text left, image right · [3fr 2fr]
   ═══════════════════════════════════════════════════════════ */

function KitSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="the-witness-kit"
      ref={ref as React.RefObject<HTMLElement>}
      data-theme="life"
      role="region"
      aria-label="The Kit — Everything I bring"
      className="relative section--surface py-[80px] md:py-[120px] overflow-hidden min-h-[400px]"
      style={{
        background: "linear-gradient(180deg, hsl(var(--warm-cream-deep)) 0%, hsl(var(--warm-cream-mid)) 50%, hsl(var(--warm-cream-dark)) 100%)",
      }}
    >
      <span className="sr-only">
        The Kit section lists everything Parker brings: piano, backup piano, sound system,
        printed cue sheet, liability insurance, and rain cover.
      </span>

      {/* ── Atmospheric layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, hsl(var(--warm-radial-soft) / 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, hsl(var(--warm-vignette-alt) / 0.15) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="witness-breathing-glow absolute pointer-events-none"
        style={{
          width: '400px', height: '400px', right: '10%', top: '25%',
          background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain opacity-[0.05] pointer-events-none" aria-hidden="true" />

      {/* ── Content grid (mirrored: text left, image right) ── */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-start">

          {/* LEFT: Text content */}
          <div className="flex flex-col">
            {/* Bridge sentence */}
            <p
              className={cn(
                "font-display text-lg md:text-xl font-light italic text-foreground/60 mb-6 md:mb-8 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              )}
            >
              And this is what I carry with me.
            </p>

            {/* Label */}
            <p
              className={cn(
                "font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5 transition-all duration-700 flex items-center gap-2",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              )}
              style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
            >
              <span
                className="w-[4px] h-[4px] rotate-45 inline-block flex-shrink-0"
                style={{ background: 'hsl(var(--vow-yellow) / 0.45)' }}
                aria-hidden="true"
              />
              Everything I bring.
            </p>

            {/* Kit grid */}
            <div
              className={cn(
                "relative transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              )}
              style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {standardKit.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "witness-kit-cell group flex flex-col items-center gap-2 py-3 px-2 rounded-sm cursor-default",
                      "transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    )}
                    style={{
                      transitionDelay: isVisible ? `${300 + index * 80}ms` : "0ms",
                      background: 'linear-gradient(180deg, hsl(var(--warm-card-kit-top) / 0.6) 0%, hsl(var(--warm-card-kit-bottom) / 0.4) 100%)',
                      border: '1px solid hsl(var(--warm-card-border) / 0.25)',
                      borderTop: '1px solid hsl(var(--warm-card-kit-highlight) / 0.45)',
                    }}
                  >
                    <span
                      className="witness-kit-diamond inline-block w-[5px] h-[5px] rotate-45 transition-all duration-[180ms]"
                      style={{
                        background: 'hsl(var(--vow-yellow) / 0.45)',
                        boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                        animationDelay: `${index * 700}ms`,
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground group-hover:text-foreground transition-colors duration-[180ms] text-center">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breathing diamond separator */}
            <div
              className={cn(
                "flex justify-center my-6 md:my-10 transition-all duration-700",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              )}
              style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
              aria-hidden="true"
            >
              <div
                className="witness-threshold-diamond w-[5px] h-[5px] rotate-45"
                style={{ background: 'hsl(var(--vow-yellow) / 0.4)' }}
              />
            </div>

            {/* Closing quote + CTA */}
            <div className="relative">
              <div
                className="absolute -inset-8 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <div
                className={cn(
                  "h-[1px] w-10 mb-3 md:mb-4 transition-all duration-700",
                  isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
                style={{
                  background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--vow-yellow) / 0.15))",
                  transitionDelay: isVisible ? "850ms" : "0ms",
                }}
                aria-hidden="true"
              />
              <p
                className={cn(
                  "witness-closing-quote text-lg md:text-xl font-display font-light text-foreground/80 relative z-10 leading-relaxed",
                  "transition-[opacity,transform,filter] duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-[12px] blur-[4px]"
                )}
                style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
              >
                Now{"\u2014"}choose how long you want me there.
              </p>
              <a
                href="#three-paths"
                className={cn(
                  "witness-ghost-cta inline-flex items-center gap-2 mt-4 md:mt-5 text-xs font-sans uppercase tracking-[0.22em]",
                  "text-muted-foreground hover:text-foreground relative z-10",
                  "transition-[opacity,transform,color] duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: isVisible ? "1000ms" : "0ms" }}
              >
                See my three paths
                <span className="inline-block w-4 h-[1px] bg-current opacity-40" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* RIGHT: Cinematic image (witnessKeys) */}
          <div
            className={cn(
              "witness-image-frame relative rounded-lg overflow-hidden order-last",
              "aspect-[4/3] md:aspect-auto md:min-h-[480px]",
              "transition-all duration-[900ms]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            <img
              src={witnessKeys}
              alt="Piano keys in warm candlelight"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.28,
                animation: 'witness-ken-burns 30s ease-in-out infinite alternate',
                filter: 'saturate(0.6) sepia(0.2) contrast(1.1)',
              }}
              loading="lazy"
              decoding="async"
            />
            <div className="witness-frame-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--warm-frame-vignette) / 0.75) 100%)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px hsl(var(--vow-yellow) / 0.1)' }}
              aria-hidden="true"
            />
            <div
              className="witness-light-bleed absolute -inset-4 pointer-events-none rounded-lg"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.05) 0%, transparent 70%)',
                filter: 'blur(20px)', zIndex: -1,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade into ThreePaths dark */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, hsl(var(--rich-black)))',
        }}
        aria-hidden="true"
      />
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

/* ═══════════════════════════════════════════════════════════
   PUBLIC EXPORT — Renders both sections in sequence
   ═══════════════════════════════════════════════════════════ */

export function TheWitness() {
  return (
    <>
      <PreparationSection />
      <KitSection />
    </>
  );
}
