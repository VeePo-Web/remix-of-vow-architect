import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Scroll-linked price reveal — each character of "$60 per hour"
 * materializes individually with staggered thresholds.
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
            className="inline-block mr-[0.25em] transition-opacity duration-[60ms]"
            style={{ opacity: wordOpacity }}
          >
            {isUnderline ? (
              <span className="relative inline-block">
                {word}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-primary origin-left transition-transform duration-[450ms]",
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
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="The Offering"
    >
      <div className="relative z-10 max-w-[560px] mx-auto text-center">
        {/* Header zone */}
        <div ref={headerRef}>
          <p
            className={cn(
              "font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-fitz-7 transition-all duration-[1800ms]",
              headerVisible
                ? "opacity-50 translate-y-0"
                : "opacity-0 translate-y-[8px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            }}
          >
            Lesson details
          </p>

          <h2
            className={cn(
              "font-display text-[28px] md:text-[40px] font-light tracking-tight leading-[1.15] text-foreground mb-fitz-8 transition-all duration-[900ms]",
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[12px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "200ms",
            }}
          >
            Simple pricing
          </h2>
        </div>

        {/* Price zone */}
        <div ref={priceRef} className="mb-fitz-3">
          <p
            className="font-sans text-[18px] md:text-[20px] font-normal tracking-[0.01em] text-foreground"
          >
            <ScrollPrice isInView={priceVisible} />
          </p>
        </div>

        {/* Anti-anxiety */}
        <div className="mb-fitz-8">
          <p className="font-sans text-[13px] tracking-[0.02em] text-muted-foreground">
            <ScrollAntiAnxiety
              text="60-minute sessions. No packages, no contracts. Pay as you go."
              isInView={priceVisible}
            />
          </p>
        </div>

        {/* CTA zone */}
        <div ref={ctaRef}>
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
            <Button
              asChild
              variant="default"
              size="lg"
              className="relative"
            >
              <Link to="/teaching/contact">Book a conversation</Link>
            </Button>
          </div>

          <p className="font-sans text-[12px] text-muted-foreground">
            <ScrollAntiAnxiety
              text="Your first session is a conversation — no preparation needed."
              underlineWord="conversation"
              isInView={ctaVisible}
            />
          </p>
        </div>
      </div>

      <style>{`
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
