import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Scroll-linked price reveal — each character of "$60 per hour"
 * materializes individually with staggered thresholds for gravitas.
 */
function ScrollPrice({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - (rect.top - vh * 0.35) / (vh * 0.3);
    setProgress(Math.max(0, Math.min(1, raw)));
    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }
    rafRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, updateProgress]);

  const chars = "$60 per hour".split("");

  return (
    <span ref={containerRef} className="inline-block">
      {chars.map((char, i) => {
        if (char === " ") {
          return <span key={i}>&nbsp;</span>;
        }
        const threshold = i / chars.length;
        const charOpacity = isInView
          ? Math.max(0.06, Math.min(1, (progress - threshold * 0.6) / 0.25))
          : 0.06;
        // Subtle Y drift — settles as opacity reaches 1
        const charY = isInView
          ? Math.max(0, (1 - charOpacity) * 4)
          : 6;

        return (
          <span
            key={i}
            className="inline-block transition-[opacity,transform] duration-[80ms]"
            style={{
              opacity: charOpacity,
              transform: `translateY(${charY}px)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Scroll-linked word reveal for anti-anxiety copy.
 */
function ScrollAntiAnxiety({
  text,
  underlineWord,
  isInView,
}: {
  text: string;
  underlineWord?: string;
  isInView: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = 1 - (rect.top - vh * 0.3) / (vh * 0.35);
    setProgress(Math.max(0, Math.min(1, raw)));
    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }
    rafRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, updateProgress]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className="inline">
      {words.map((word, i) => {
        const threshold = i / words.length;
        const wordOpacity = isInView
          ? Math.max(0.08, Math.min(1, (progress - threshold * 0.65) / 0.3))
          : 0.08;

        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        const isUnderline =
          underlineWord && cleanWord === underlineWord.toLowerCase();

        return (
          <span
            key={i}
            className="inline-block transition-opacity duration-[60ms]"
            style={{ opacity: wordOpacity }}
          >
            {isUnderline ? (
              <span className="relative inline-block">
                {word}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                    progress > 0.88 ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{
                    transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                  }}
                  aria-hidden="true"
                />
              </span>
            ) : (
              word
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

export function TeachingOffering() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const priceRef = useRef<HTMLDivElement>(null);
  const [priceVisible, setPriceVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (headerRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
        { threshold: 0.3 }
      );
      obs.observe(headerRef.current);
      observers.push(obs);
    }
    if (priceRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setPriceVisible(true); },
        { threshold: 0.3 }
      );
      obs.observe(priceRef.current);
      observers.push(obs);
    }
    if (ctaRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setCtaVisible(true); },
        { threshold: 0.3 }
      );
      obs.observe(ctaRef.current);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="teaching-offering"
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(38 35% 93%)" }}
      role="region"
      aria-label="The Offering"
    >
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(38 25% 85% / 0.45) 100%)",
          animation: "offering-vignette 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[560px] mx-auto text-center">
        {/* Header zone */}
        <div ref={headerRef}>
          {/* Whispered section label */}
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[1800ms]",
              headerVisible
                ? "opacity-50 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              color: "hsl(30 10% 45%)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            }}
          >
            The offering
          </p>

          {/* Golden dot anchor */}
          <span
            className={cn(
              "block w-2 h-2 rounded-full mx-auto mb-fitz-5 transition-all duration-[900ms]",
              headerVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )}
            style={{
              background: "hsl(var(--vow-yellow))",
              boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
              animation: headerVisible
                ? "offering-dot-breathe 4s ease-in-out infinite"
                : undefined,
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "100ms",
            }}
            aria-hidden="true"
          />

          {/* Vertical golden thread — dot to content */}
          <div
            className={cn(
              "w-px h-[60px] mx-auto mb-fitz-9 origin-top transition-transform duration-[700ms]",
              headerVisible ? "scale-y-100" : "scale-y-0"
            )}
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.06))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "200ms",
            }}
            aria-hidden="true"
          />

          {/* Framing question */}
          <h2
            className={cn(
              "font-display text-[28px] md:text-[40px] font-light tracking-tight leading-[1.15] mb-fitz-8 transition-all duration-[900ms]",
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[12px]"
            )}
            style={{
              color: "hsl(30 15% 20%)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "300ms",
              textShadow: "0 1px 2px hsl(40 20% 80% / 0.25)",
            }}
          >
            Would you like to sit down?
          </h2>
        </div>

        {/* Price zone — independently observed, scroll-linked character reveal */}
        <div ref={priceRef} className="mb-fitz-3">
          <p
            className="font-sans text-[18px] md:text-[20px] font-normal tracking-[0.01em]"
            style={{ color: "hsl(30 12% 30%)" }}
          >
            <ScrollPrice isInView={priceVisible} />
          </p>
        </div>

        {/* Anti-anxiety — scroll-linked word reveal */}
        <div className="mb-fitz-8">
          <p
            className="font-sans text-[13px] tracking-[0.02em]"
            style={{ color: "hsl(30 10% 40%)" }}
          >
            <ScrollAntiAnxiety
              text="No packages. No commitments. One hour, one question, one bench."
              isInView={priceVisible}
            />
          </p>
        </div>

        {/* CTA zone — independently observed */}
        <div ref={ctaRef}>
          {/* CTA with halo */}
          <div
            className={cn(
              "relative mb-fitz-6 transition-all duration-[700ms]",
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[10px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "150ms",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[60px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.12), transparent 70%)",
                animation: ctaVisible
                  ? "offering-halo-breathe 4s ease-in-out infinite"
                  : undefined,
              }}
              aria-hidden="true"
            />
            <Button
              asChild
              size="lg"
              className="relative font-sans text-[14px] uppercase tracking-[0.14em] bg-[hsl(var(--vow-yellow))] text-[hsl(30_10%_12%)] hover:bg-[hsl(var(--vow-yellow)/0.85)] transition-all duration-[260ms] border-2 border-[hsl(var(--vow-yellow))] rounded-md px-10 py-3.5 hover:shadow-[0_4px_20px_hsl(var(--vow-yellow)/0.25)] hover:-translate-y-[1px]"
            >
              <Link to="/contact">Begin the conversation</Link>
            </Button>
          </div>

          {/* Anti-anxiety secondary — scroll-linked */}
          <p
            className="font-sans text-[12px] mb-fitz-2"
            style={{ color: "hsl(30 10% 45%)" }}
          >
            <ScrollAntiAnxiety
              text="The first session opens with a question, not a scale."
              underlineWord="question"
              isInView={ctaVisible}
            />
          </p>

          {/* Pencil annotation */}
          <span
            className={cn(
              "inline-block font-display italic text-[13px] mt-fitz-4 mb-fitz-7 transition-all duration-[700ms]",
              ctaVisible ? "opacity-30" : "opacity-0"
            )}
            style={{
              color: "hsl(30 12% 50%)",
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: "600ms",
            }}
            aria-label="Annotation"
          >
            — what do you want to say?
          </span>

          {/* Vertical golden thread — content to bottom */}
          <div
            className={cn(
              "w-px h-[60px] mx-auto origin-top transition-transform duration-[700ms]",
              ctaVisible ? "scale-y-100" : "scale-y-0"
            )}
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.06), hsl(var(--vow-yellow) / 0.20))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "700ms",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes offering-dot-breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes offering-vignette {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.6; }
        }
        @keyframes offering-halo-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-offering * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
