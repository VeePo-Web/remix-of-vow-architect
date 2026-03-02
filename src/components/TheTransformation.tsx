import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import transformationFearImg from "@/assets/transformation-fear-ai.jpg";
import transformationLifeImg from "@/assets/transformation-life-ai.jpg";

const fears = [
  "What if the music sounds like every other ceremony your guests have sat through",
  "What if the back row never hears the song you chose for your walk down",
  "What if no one asks what was playing when you knew",
  "What if the person behind the piano treats your ceremony like another Saturday",
];

const resolutions = [
  "I ask what was playing when you knew — and I build your ceremony from there",
  "Your walk-down arrangement is written note by note — for the two of you, and no one else",
  "A printed ceremony plan lands in your inbox before you think to ask for one",
  "I stay until the last guest has gone and the final note has found its silence",
];

export function TheTransformation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionElRef = useRef<HTMLElement | null>(null);
  const fearImgRef = useRef<HTMLImageElement>(null);
  const lifeImgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Differential parallax — death image drifts up, life image drifts down */
  const handleScroll = useCallback(() => {
    const el = sectionElRef.current;
    if (!el || reducedMotion) return;

    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    const progress = 1 - (rect.bottom / (viewH + rect.height));
    const clamped = Math.max(0, Math.min(1, progress));

    if (fearImgRef.current) {
      fearImgRef.current.style.transform = `scale(${1 + 0.05 * (1 - clamped)}) translateY(${clamped * -12}px)`;
    }
    if (lifeImgRef.current) {
      lifeImgRef.current.style.transform = `scale(${1 + 0.03 * clamped}) translateY(${(1 - clamped) * 12}px)`;
    }
  }, [reducedMotion]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  /* Merge refs */
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionElRef.current = node;
      if (typeof sectionRef === "function") {
        (sectionRef as (node: HTMLElement | null) => void)(node);
      } else if (sectionRef && typeof sectionRef === "object") {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [sectionRef]
  );

  return (
    <section
      id="the-transformation"
      ref={setRefs}
      className="section-grain piano-section-target relative overflow-hidden min-h-[80vh]"
      role="region"
      aria-label="The Transformation — fears honoured, promises made"
      style={{
        background:
          "linear-gradient(180deg, hsl(220 15% 8%) 0%, hsl(220 15% 8%) 30%, hsl(230 12% 18%) 48%, hsl(40 20% 80%) 68%, hsl(45 30% 92%) 100%)",
      }}
    >
      {/* sr-only narrative */}
      <span className="sr-only">
        This section mirrors the fears you may carry about your ceremony music,
        then answers each one with a first-person promise from Parker.
      </span>

      {/* Top fade — seamless from The Sound */}
      <div
        className="section-fade-top"
        style={{ background: "linear-gradient(to top, transparent, hsl(220 15% 8%))" }}
        aria-hidden="true"
      />

      {/* Layer 1a: Death-space Ken Burns image (upper half) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          ref={fearImgRef}
          src={transformationFearImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform"
          style={{
            opacity: 0.1,
            filter: "brightness(0.75) contrast(1.08) saturate(0.6)",
            maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 65%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 65%)",
            animation: !reducedMotion ? "transform-fear-kb 30s ease-in-out infinite alternate" : "none",
          }}
          loading="lazy"
        />
      </div>

      {/* Layer 1b: Life-space Ken Burns image (lower half) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
          ref={lifeImgRef}
          src={transformationLifeImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform"
          style={{
            opacity: 0.12,
            filter: "brightness(1.1) contrast(0.95) saturate(0.4)",
            maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 55%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 55%)",
            animation: !reducedMotion ? "transform-life-kb 35s ease-in-out infinite alternate" : "none",
          }}
          loading="lazy"
        />
      </div>

      {/* Layer 2: Film grain */}
      <div className="absolute inset-0 grain opacity-[0.10] pointer-events-none" aria-hidden="true" />

      {/* Layer 2b: Cool vignette — death space depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, hsl(220 20% 6% / 0.4) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2c: Warm amber glow pool — life space candlelight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 65%, hsl(var(--vow-yellow) / 0.045) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2d: Warm fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* Layer 2e: Life-space warm depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 80%, hsl(35 30% 75% / 0.15) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      {/* Layer 3: Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(220 15% 8% / 0.5) 100%)" }}
        aria-hidden="true"
      />

      {/* Content — single column narrative */}
      <div className="relative z-10 mx-auto px-6 md:px-8 py-32 md:py-40">

        {/* === DEATH SPACE — Fears === */}
        <div className="max-w-[640px] mx-auto mb-16 md:mb-24">
          {/* Overline */}
          <p
            className={cn(
              "text-xs uppercase tracking-[0.22em] text-foreground/50 mb-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)" }}
          >
            The Transformation
          </p>

          {/* Heading */}
          <h2
            className={cn(
              "font-display text-2xl md:text-3xl font-light tracking-tight text-foreground/90 mb-8 md:mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isVisible ? "120ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            The questions no one else thinks to ask
          </h2>

          {/* Fears — whispered italic Cormorant with separators */}
          <div className="space-y-8 md:space-y-10">
            {fears.map((fear, i) => (
              <p
                key={i}
                className={cn(
                  "font-display text-lg md:text-xl font-light italic leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-[0.6] translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  color: "hsl(var(--foreground))",
                  transitionDelay: isVisible ? `${280 + i * 120}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                {fear}
              </p>
            ))}
          </div>
        </div>

        {/* === GOLDEN THREAD THRESHOLD === */}
        <div className="relative flex flex-col items-center my-12 md:my-16" aria-hidden="true">
          {/* Vertical thread — above */}
          <div
            className={cn(
              "w-[1px] h-[40px] mb-2 transition-all duration-700",
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            )}
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--vow-yellow) / 0.25))",
              transformOrigin: "top",
              animation: !reducedMotion ? "golden-thread-breathe 4s ease-in-out infinite" : "none",
              transitionDelay: isVisible ? "750ms" : "0ms",
            }}
          />

          {/* Horizontal line + diamond row */}
          <div className="flex items-center justify-center w-full">
            {/* Left line */}
            <div
              className={cn(
                "h-[1px] flex-1 max-w-[160px] origin-right transition-transform duration-700",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))",
                transitionDelay: isVisible ? "800ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
            />

            {/* Diamond with glow pool */}
            <div className="relative mx-4">
              {/* Glow pool behind diamond */}
              <div
                className="absolute inset-0 -inset-x-8 -inset-y-8"
                style={{
                  background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)",
                }}
              />
              <div
                className={cn(
                  "w-[7px] h-[7px] rotate-45 transition-all duration-700 relative z-10",
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
                style={{
                  background: "hsl(var(--vow-yellow))",
                  boxShadow: "0 0 12px 4px hsl(var(--vow-yellow) / 0.4), 0 0 30px 8px hsl(var(--vow-yellow) / 0.15)",
                  animation: !reducedMotion ? "divider-diamond-breathe 4s ease-in-out infinite" : "none",
                  transitionDelay: isVisible ? "900ms" : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              />
            </div>

            {/* Right line */}
            <div
              className={cn(
                "h-[1px] flex-1 max-w-[160px] origin-left transition-transform duration-700",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)",
                transitionDelay: isVisible ? "800ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
            />
          </div>

          {/* Vertical thread — below */}
          <div
            className={cn(
              "w-[1px] h-[40px] mt-2 transition-all duration-700",
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            )}
            style={{
              background: "linear-gradient(to top, transparent, hsl(var(--vow-yellow) / 0.25))",
              transformOrigin: "bottom",
              animation: !reducedMotion ? "golden-thread-breathe 4s ease-in-out infinite 2s" : "none",
              transitionDelay: isVisible ? "750ms" : "0ms",
            }}
          />
        </div>

        {/* === LIFE SPACE — Resolutions === */}
        <div className="max-w-[600px] mx-auto mt-16 md:mt-24">
          {/* Heading */}
          <h3
            className={cn(
              "font-display text-2xl md:text-3xl font-light tracking-tight mb-8 md:mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              color: "hsl(var(--rich-black))",
              transitionDelay: isVisible ? "1000ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            So here is what I do about it
          </h3>

          {/* Resolutions — Inter body, left border accent, vow-yellow en-dash */}
          <div className="space-y-6 md:space-y-8">
            {resolutions.map((resolution, i) => (
              <div
                key={i}
                className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  borderLeft: "2px solid hsl(var(--vow-yellow) / 0.25)",
                  padding: "0 0 0 24px",
                  transitionDelay: isVisible ? `${1100 + i * 120}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                <p
                  className="font-sans text-base md:text-lg leading-relaxed"
                  style={{ color: "hsl(var(--rich-black))" }}
                >
                  <span
                    className="inline-block mr-2 font-medium"
                    style={{ color: "hsl(var(--vow-yellow) / 0.7)" }}
                    aria-hidden="true"
                  >
                    —
                  </span>
                  {resolution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into TheWitness */}
      <div
        className="section-fade-bottom"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(45 25% 96%))" }}
        aria-hidden="true"
      />
    </section>
  );
}
