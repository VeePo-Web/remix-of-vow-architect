import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import keysIntimateImg from "@/assets/sound-keys-intimate-ai.jpg";

/**
 * Scroll-linked word-by-word reveal for the tagline.
 * The semicolon ignites last with a golden glow.
 */
function ScrollTagline({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    // Only compute when element is near viewport
    if (rect.bottom < -100 || rect.top > vh + 100) return;
    const raw = 1 - (rect.top - vh * 0.3) / (vh * 0.35);
    setProgress(Math.max(0, Math.min(1, raw)));
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
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial calc
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, updateProgress]);

  // Words with special tokens for semicolon and period
  const segments = [
    { text: "From", type: "word" as const },
    { text: "Silence", type: "word" as const },
    { text: ";", type: "semicolon" as const },
    { text: " ", type: "space" as const },
    { text: "Unto", type: "word" as const },
    { text: "Sound", type: "word" as const },
    { text: ".", type: "period" as const },
  ];

  const wordCount = segments.filter((s) => s.type === "word").length;
  let wordIndex = 0;

  return (
    <span ref={containerRef} className="inline">
      {segments.map((seg, i) => {
        if (seg.type === "space") {
          return <span key={i}> </span>;
        }

        if (seg.type === "semicolon") {
          // Semicolon ignites at 80% progress
          const semicolonOpacity = isInView
            ? Math.max(0.05, Math.min(1, (progress - 0.6) / 0.2))
            : 0.05;
          return (
            <span
              key={i}
              className="inline-block text-primary transition-opacity duration-[80ms]"
              style={{
                opacity: semicolonOpacity,
                textShadow:
                  progress > 0.8
                    ? `0 0 ${20 + (progress - 0.8) * 100}px hsl(var(--vow-yellow) / ${0.3 + (progress - 0.8) * 2})`
                    : "none",
                animation:
                  progress > 0.95
                    ? "semicolon-breathe 3s ease-in-out infinite"
                    : undefined,
              }}
              aria-hidden="true"
            >
              {seg.text}
            </span>
          );
        }

        if (seg.type === "period") {
          const periodOpacity = isInView
            ? Math.max(0.05, Math.min(1, (progress - 0.75) / 0.2))
            : 0.05;
          return (
            <span
              key={i}
              className="inline-block text-primary transition-opacity duration-[80ms]"
              style={{ opacity: periodOpacity }}
            >
              {seg.text}
            </span>
          );
        }

        // Regular words
        const threshold = wordIndex / wordCount;
        wordIndex++;
        const wordOpacity = isInView
          ? Math.max(0.06, Math.min(1, (progress - threshold * 0.55) / 0.25))
          : 0.06;

        return (
          <span key={i}>
            <span
              className="inline-block transition-opacity duration-[60ms]"
              style={{ opacity: wordOpacity }}
            >
              {seg.text}
            </span>
            {seg.text !== "Silence" && seg.text !== "Sound" ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

export function TeachingCrossing() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCtaVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="teaching-crossing"
      ref={ref}
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--teaching-bg-alt))" }}
      role="region"
      aria-label="The Invitation"
    >
      {/* Bench photograph — occupied feeling */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${keysIntimateImg})`,
          opacity: 0.04,
          animation: "crossing-ken-burns 30s linear infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Warm atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Dual-origin fog */}
      <div
        className="absolute inset-0 pointer-events-none motion-reduce:hidden"
        style={{
          background: "radial-gradient(ellipse 65% 50% at 20% 75%, hsl(var(--vow-yellow) / 0.025), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none motion-reduce:hidden"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 80% 25%, hsl(var(--vow-yellow) / 0.02), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(var(--teaching-vignette-alt) / 0.5) 100%)",
          animation: "crossing-vignette 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Golden thread from above */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-px h-[100px] transition-transform duration-[700ms] origin-top",
          isVisible ? "scale-y-100" : "scale-y-0"
        )}
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.06))",
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[700ms]",
            isVisible
              ? "opacity-40 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(var(--teaching-text-label))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "100ms",
          }}
        >
          Get started
        </p>

        {/* Golden dot — arrival marker */}
        <span
          className={cn(
            "block w-2 h-2 rounded-full mx-auto mb-fitz-7 transition-all duration-[900ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{
            background: "hsl(var(--vow-yellow))",
            boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.15)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "150ms",
          }}
          aria-hidden="true"
        />

        {/* Heading — simple direct question */}
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight mb-fitz-7 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[12px]"
          )}
          style={{
            color: "hsl(var(--teaching-text-heading))",
            textShadow: "0 1px 2px hsl(var(--teaching-vignette) / 0.25)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
          }}
        >
          Ready to start?
        </h2>

        {/* CTA zone — independently observed */}
        <div ref={ctaRef}>
          {/* CTA — warm glow halo behind button */}
          <div
            className={cn(
              "relative mb-fitz-6 transition-all duration-[700ms]",
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[10px]"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "200ms",
            }}
          >
            {/* Ambient halo behind CTA */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[70px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, hsl(var(--vow-yellow) / 0.14), transparent 70%)",
                animation: ctaVisible
                  ? "cta-halo-breathe 4s ease-in-out infinite"
                  : undefined,
              }}
              aria-hidden="true"
            />
            <Button
              asChild
              variant="default"
              size="lg"
              className="relative"
            >
              <Link to="/teaching/contact">Get in touch</Link>
            </Button>
          </div>

          {/* Anti-anxiety with vow-yellow underline on "Always" */}
          <p
            className={cn(
              "font-sans text-[14px] leading-relaxed mb-fitz-2 transition-all duration-[700ms]",
              ctaVisible
                ? "opacity-60 translate-y-0"
                : "opacity-0 translate-y-[6px]"
            )}
            style={{
              color: "hsl(var(--teaching-text-body) / 0.85)",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "400ms",
            }}
          >
            A reply within 24 hours.{" "}
            <span className="relative inline-block">
              Always
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                  ctaVisible ? "scale-x-100" : "scale-x-0"
                )}
                style={{
                  transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                  transitionDelay: "700ms",
                }}
                aria-hidden="true"
              />
            </span>
            .
          </p>
          <p
            className={cn(
              "font-sans text-[13px] transition-all duration-[700ms]",
              ctaVisible
                ? "opacity-45 translate-y-0"
                : "opacity-0 translate-y-[4px]"
            )}
            style={{
              color: "hsl(var(--teaching-text-body))",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: "500ms",
            }}
          >
            This is a beginning, not a binding.
          </p>
        </div>

        {/* Closing golden thread — page terminus */}
        <div
          className={cn(
            "w-px h-[60px] mx-auto mt-fitz-9 origin-top transition-transform duration-[700ms]",
            ctaVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.20), hsl(var(--vow-yellow) / 0.04))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "800ms",
          }}
          aria-hidden="true"
        />

        {/* Pencil annotation — page closing */}
        <span
          className={cn(
            "inline-block font-display italic text-[13px] mt-fitz-4 transition-all duration-[700ms]",
            ctaVisible ? "opacity-35" : "opacity-0"
          )}
          style={{
            color: "hsl(var(--teaching-text-cite))",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "1000ms",
          }}
          aria-label="Closing annotation"
        >
          — no commitment required
        </span>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes crossing-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.03) translate(0.3%, -0.3%); }
        }
        @keyframes crossing-vignette {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.68; }
        }
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
        }
        @keyframes cta-halo-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-crossing * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
