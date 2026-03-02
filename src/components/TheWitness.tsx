import React, { useRef, useEffect, useState, useCallback } from "react";
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

  // Refs for parallax (3-layer depth stack)
  const sectionElRef = useRef<HTMLElement | null>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const fogPrimaryRef = useRef<HTMLDivElement>(null);

  // Reduced motion detection
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealDone, setRevealDone] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // After reveal completes, enable parallax mode
  useEffect(() => {
    if (isVisible && !revealDone) {
      const timer = setTimeout(() => setRevealDone(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, revealDone]);

  // Merge refs
  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionElRef.current = node;
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [sectionRef]);

  // Step 2: Scroll-linked parallax (3-layer depth) + warmth variable
  useEffect(() => {
    if (reducedMotion || !revealDone) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = sectionElRef.current;
        const imageCol = imageColRef.current;
        const textCol = textColRef.current;
        const bgImage = bgImageRef.current;
        const fogPrimary = fogPrimaryRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
        const sectionH = rect.height;

        // How far through the section (0 at top entering, 1 at bottom leaving)
        const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + sectionH)));

        // Warmth: 0 → 1 as visitor scrolls deeper
        section.style.setProperty('--witness-warmth', String(progress));

        // A. Image column parallax: ±15px (medium speed layer)
        if (imageCol) {
          imageCol.style.transform = `translateY(${(progress - 0.5) * 30}px)`;
        }

        // B. Text column counter-parallax: ±4px (fastest layer, opposite direction)
        if (textCol) {
          textCol.style.transform = `translateY(${(progress - 0.5) * -8}px)`;
        }

        // C. Background image: composite Ken Burns oscillation + scroll parallax
        if (bgImage) {
          const elapsed = (Date.now() % 30000) / 30000;
          const kbProgress = (Math.sin(elapsed * Math.PI * 2 - Math.PI / 2) + 1) / 2;
          const kbScale = 1 + kbProgress * 0.06;
          const kbX = -kbProgress * 1;
          const kbY = kbProgress * 1;
          const parallaxY = (progress - 0.5) * 6;
          bgImage.style.transform = `translateY(${parallaxY}px) scale(${kbScale}) translate(${kbX}%, ${kbY}%)`;
        }

        // D. Primary fog vertical drift: light source appears overhead
        if (fogPrimary) {
          fogPrimary.style.backgroundPosition = `50% ${40 - progress * 5}%`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      // Reset transforms on cleanup
      if (imageColRef.current) imageColRef.current.style.transform = '';
      if (textColRef.current) textColRef.current.style.transform = '';
      if (bgImageRef.current) bgImageRef.current.style.transform = '';
      if (fogPrimaryRef.current) fogPrimaryRef.current.style.backgroundPosition = '';
    };
  }, [reducedMotion, revealDone]);

  return (
    <section
      id="the-witness"
      ref={setRefs}
      data-theme="life"
      role="region"
      aria-label="The Preparation"
      className="relative section--surface section-padding-standard piano-section-target overflow-hidden min-h-[400px]"
      style={{
        background: "linear-gradient(180deg, hsl(40 18% 94%) 0%, hsl(45 22% 95%) 45%, hsl(38 15% 90%) 100%)",
        // @ts-ignore
        '--witness-warmth': '0',
      } as React.CSSProperties}
    >
      {/* Step 8: Screen reader narrative */}
      <span className="sr-only">
        The Preparation section describes what Parker brings to your ceremony: early arrival,
        sound-checked piano, backup equipment, printed cue sheet, liability insurance, and rain cover.
        Three declaration promises outline his commitment to excellence.
      </span>

      {/* ── Layer 1: Full-section background image with Ken Burns ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={witnessKeys}
          alt=""
          ref={bgImageRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 0.10,
            filter: 'saturate(0.4) sepia(0.2) contrast(1.15) brightness(0.85)',
            willChange: 'transform',
          }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ── Layer 2a: Primary warm fog (amber cloud near image column) ── */}
      <div
        ref={fogPrimaryRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 40% 40%, hsl(40 45% 80% / 0.08) 0%, transparent 80%)',
          opacity: 'calc(0.8 + var(--witness-warmth) * 0.2)',
        }}
        aria-hidden="true"
      />
      {/* ── Layer 2b: Secondary warm fog (closing area pool) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 70%, hsl(45 40% 85% / 0.05) 0%, transparent 60%)',
          opacity: 'calc(0.8 + var(--witness-warmth) * 0.2)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Radial vignette (visible edge darkening) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, hsl(40 15% 75% / 0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4a: Breathing candlelight glow pool (image column) ── */}
      <div
        className="witness-breathing-glow absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          left: '15%',
          top: '30%',
          background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.05) 0%, transparent 70%)',
          opacity: 'calc(0.7 + var(--witness-warmth) * 0.3)',
        }}
        aria-hidden="true"
      />
      {/* ── Layer 4b: Secondary glow pool (closing/CTA area) ── */}
      <div
        className="witness-breathing-glow absolute pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          right: '20%',
          bottom: '30%',
          background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)',
          opacity: 'calc(0.6 + var(--witness-warmth) * 0.4)',
        }}
        aria-hidden="true"
      />

      {/* Film grain overlay (6% for tactile paper texture on cream) */}
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Top fade matching TheTransformation's warm cream exit */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 25% 96%))' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Asymmetric Two-Column Layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-start">

          {/* ── LEFT COLUMN: Cinematic Image Frame ── */}
          <div
            ref={imageColRef}
            className={cn(
              "witness-image-frame relative rounded-lg overflow-hidden",
              "aspect-[3/4] md:aspect-auto md:min-h-[520px]",
              !revealDone && "transition-all duration-[900ms]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{
              transitionDelay: isVisible && !revealDone ? "100ms" : "0ms",
            }}
          >
            {/* Image with cinematic grade + Ken Burns */}
            <img
              src={witnessCeremony}
              alt="Piano prepared for a wedding ceremony"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.35,
                animation: 'witness-ken-burns 30s ease-in-out infinite alternate',
                filter: 'saturate(0.7) sepia(0.15) contrast(1.1)',
                willChange: 'transform',
              }}
              loading="lazy"
              decoding="async"
            />

            {/* Step 3: Candlelight shimmer inside frame */}
            <div className="witness-frame-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />

            {/* Radial vignette inside the frame */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, hsl(45 20% 93% / 0.75) 100%)',
              }}
              aria-hidden="true"
            />
            {/* Inner film grain */}
            <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />
            {/* Warm border */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 0 1px hsl(var(--vow-yellow) / 0.1)',
              }}
              aria-hidden="true"
            />

            {/* Step 3: Light bleed behind frame */}
            <div
              className="witness-light-bleed absolute -inset-4 pointer-events-none rounded-lg"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: -1,
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── RIGHT COLUMN: Text Content ── */}
          <div ref={textColRef} className="flex flex-col pt-2 md:pt-0">
            {/* Label */}
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE PREPARATION
            </p>

            {/* Headline with ambient warm glow */}
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
                  {/* Step 6: Underline with trailing glow */}
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

            {/* Step 4: Declaration Cards with Golden Thread Connector */}
            <div className="relative mb-12">
              {/* Vertical golden thread behind declarations */}
              <div
                className="witness-golden-thread absolute left-4 md:left-5 top-4 bottom-4 w-[1px] pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 2%, hsl(var(--vow-yellow) / 0.3) 15%, hsl(var(--vow-yellow) / 0.3) 85%, transparent 98%)',
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
                      background: 'linear-gradient(180deg, hsl(45 25% 96% / 0.7) 0%, hsl(42 18% 90% / 0.5) 100%)',
                      border: '1px solid hsl(45 20% 85% / 0.25)',
                      borderTop: '1px solid hsl(45 30% 92% / 0.5)',
                    }}
                  >
                    {/* Thread node diamond */}
                    <span
                      className={cn(
                        "witness-thread-diamond absolute left-[13px] md:left-[16px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rotate-45",
                        isVisible && "witness-thread-diamond--active"
                      )}
                      style={{
                        background: 'hsl(var(--vow-yellow) / 0.45)',
                        boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                        animationDelay: isVisible ? `${450 + index * 150}ms` : '0ms',
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

            {/* Step 5: Sacred Inventory Kit Grid */}
            <div
              className={cn(
                "relative transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"
              )}
              style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
            >
              {/* Keys texture behind entire kit */}
              <div className="absolute inset-0 -m-4 rounded-lg overflow-hidden pointer-events-none" aria-hidden="true">
                <img
                  src={witnessKeys}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.05, filter: 'saturate(0.5) blur(2px)' }}
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
                    className={cn(
                      "witness-kit-cell group flex flex-col items-center gap-2 py-3 px-2 rounded-md cursor-default",
                      "transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    )}
                    style={{
                      transitionDelay: isVisible ? `${900 + index * 80}ms` : "0ms",
                      background: 'linear-gradient(180deg, hsl(45 24% 95% / 0.6) 0%, hsl(42 18% 91% / 0.4) 100%)',
                      border: '1px solid hsl(45 20% 85% / 0.25)',
                      borderTop: '1px solid hsl(45 28% 93% / 0.45)',
                      boxShadow: index < 2
                        ? '0 1px 2px -1px hsl(40 20% 50% / 0.05), inset 0 1px 0 hsl(0 0% 100% / 0.1), inset 2px 0 6px -2px hsl(var(--vow-yellow) / 0.06)'
                        : undefined,
                    }}
                  >
                    {/* Diamond icon */}
                    <span
                      className="witness-kit-diamond inline-block w-[5px] h-[5px] rotate-45 transition-all duration-[180ms]"
                      style={{
                        background: 'hsl(var(--vow-yellow) / 0.45)',
                        boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.15)',
                        animationDelay: `${index * 700}ms`,
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

            {/* Step 7: Closing threshold with weight */}
            <div className="relative mt-12">
              {/* Warm glow behind closing */}
              <div
                className="absolute -inset-8 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)',
                  opacity: 'calc(0.6 + var(--witness-warmth) * 0.4)',
                }}
                aria-hidden="true"
              />

              {/* Golden thread rule */}
              <div
                className={cn(
                  "h-[1px] w-16 mb-6 transition-all duration-700",
                  isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                  transitionDelay: isVisible ? "950ms" : "0ms",
                }}
                aria-hidden="true"
              />

              {/* Closing thought with blur-to-sharp */}
              <p
                className={cn(
                  "text-sm md:text-[15px] font-display font-light italic text-muted-foreground relative z-10",
                  "transition-[opacity,transform,filter] duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-4 blur-[4px]"
                )}
                style={{ transitionDelay: isVisible ? "1000ms" : "0ms" }}
              >
                Now{"\u2014"}choose how long you want me there.
              </p>

              {/* Step 10: Ghost CTA into ThreePaths */}
              <a
                href="#three-paths"
                className={cn(
                  "witness-ghost-cta inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.18em] font-display",
                  "text-muted-foreground hover:text-foreground relative z-10",
                  "transition-[opacity,transform,color] duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: isVisible ? "1100ms" : "0ms" }}
              >
                See my three paths
                <span className="inline-block w-4 h-[1px] bg-current opacity-40" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into ThreePaths dark */}
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
