import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import benchImg from "@/assets/teaching-bench.jpg";

/* ─────────────────────────────────────────────
 * Character-by-character staggered reveal
 * ───────────────────────────────────────────── */

interface CharRevealProps {
  text: string;
  isRevealed: boolean;
  baseDelay: number;
  charInterval: number;
  className?: string;
  style?: React.CSSProperties;
  specialChar?: {
    char: string;
    delay: number;
    className?: string;
    style?: React.CSSProperties;
    breatheAnimation?: string;
  };
}

function CharReveal({
  text,
  isRevealed,
  baseDelay,
  charInterval,
  className,
  style,
  specialChar,
}: CharRevealProps) {
  const chars = useMemo(() => text.split(""), [text]);
  const totalCharDelay = baseDelay + chars.length * charInterval;

  return (
    <span className={className} style={style}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all",
            isRevealed
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-[6px] blur-[2px]"
          )}
          style={{
            transitionDuration: "700ms",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${baseDelay + i * charInterval}ms`,
            transitionProperty: "opacity, transform, filter",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      {specialChar && (
        <span
          className={cn(
            "inline-block transition-all",
            specialChar.className,
            isRevealed
              ? "opacity-100 translate-y-0 blur-0 scale-100"
              : "opacity-0 translate-y-[8px] blur-[4px] scale-75"
          )}
          style={{
            transitionDuration: "900ms",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${totalCharDelay + specialChar.delay}ms`,
            transitionProperty: "opacity, transform, filter",
            animation:
              isRevealed && specialChar.breatheAnimation
                ? specialChar.breatheAnimation
                : undefined,
            ...specialChar.style,
          }}
          aria-hidden="true"
        >
          {specialChar.char}
        </span>
      )}
    </span>
  );
}

/* ─────────────────────────────────────────────
 * Main Hero
 * ───────────────────────────────────────────── */

export function TeachingHero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse-reactive parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!contentRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      contentRef.current.style.transform = `translate3d(${dx * 5}px, ${dy * 3}px, 0)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!contentRef.current) return;
    contentRef.current.style.transition =
      "transform 600ms cubic-bezier(.22,.61,.36,1)";
    contentRef.current.style.transform = "translate3d(0,0,0)";
    setTimeout(() => {
      if (contentRef.current) contentRef.current.style.transition = "";
    }, 600);
  }, []);

  /* Timing constants */
  const ROLE_DELAY = 400;
  const LINE1_BASE = 900;
  const LINE1_INTERVAL = 45;
  const SEMICOLON_EXTRA = 300;
  const LINE2_BASE =
    LINE1_BASE + "From Silence".length * LINE1_INTERVAL + SEMICOLON_EXTRA + 200;
  const LINE2_INTERVAL = 45;
  const THREAD_DELAY =
    LINE2_BASE + "Unto Sound".length * LINE2_INTERVAL + 400;
  const SUBTITLE_DELAY = THREAD_DELAY + 300;

  return (
    <section
      id="teaching-hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      aria-label="The Waiting Bench"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Layer 0: True black base ── */}
      <div className="absolute inset-0" style={{ background: "hsl(var(--rich-black))" }} aria-hidden="true" />

      {/* ── Layer 1: Background bench — only warm wood grain texture ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${benchImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 90%",
          opacity: 0.035,
          filter: "saturate(0.5) contrast(1.05) brightness(0.8)",
          animation: "teaching-ken-burns 30s linear infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Radial spotlight — tight center clearing ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 38% at 50% 46%, transparent 0%, hsl(var(--rich-black) / 0.92) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Edge crush — top and bottom ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--rich-black) / 0.97) 0%, hsl(var(--rich-black) / 0.6) 18%, transparent 38%, transparent 62%, hsl(var(--rich-black) / 0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3b: Warm halo — candlelight presence behind text ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 50% 46%, hsl(var(--vow-yellow) / 0.05), transparent 100%)",
          animation: isRevealed
            ? "teaching-halo-breathe 8s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4: Grain texture ── */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* ── Layer 5: Asymmetric candlelight fog ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 38% 52%, hsl(var(--vow-yellow) / 0.02), transparent 70%), radial-gradient(ellipse 45% 35% at 64% 40%, hsl(var(--vow-yellow) / 0.015), transparent 60%)",
          animation: isRevealed
            ? "teaching-fog-drift 24s ease-in-out infinite alternate"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 6: Breathing vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 28%, hsl(var(--rich-black)) 100%)",
          animation: isRevealed
            ? "teaching-hero-vignette 7s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Content — parallax container ── */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 md:px-12"
        style={{ willChange: "transform", marginTop: "-1vh" }}
      >
        {/* Role label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.28em] mb-8 transition-all duration-[1800ms]",
            isRevealed
              ? "opacity-50 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(var(--teaching-text-label))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${ROLE_DELAY}ms`,
          }}
        >
          Piano Mentorship
        </p>

        {/* ── Tagline — character-by-character reveal ── */}
        <h1 className="font-display tracking-tight leading-none flex flex-col items-center gap-0">
          {/* Line 1: "From Silence" + semicolon ignition */}
          <CharReveal
            text="From Silence"
            isRevealed={isRevealed}
            baseDelay={LINE1_BASE}
            charInterval={LINE1_INTERVAL}
            className="block text-[clamp(34px,8vw,68px)] font-light"
            style={{
              color: "hsl(var(--teaching-text-heading-light))",
              lineHeight: "1",
              textShadow:
                "0 1px 3px hsl(0 0% 0% / 0.7), 0 4px 20px hsl(0 0% 0% / 0.5), 0 12px 48px hsl(0 0% 0% / 0.3)",
            }}
            specialChar={{
              char: ";",
              delay: SEMICOLON_EXTRA,
              className: "text-primary",
              style: {
                textShadow: "0 0 28px hsl(var(--vow-yellow) / 0.4), 0 0 8px hsl(var(--vow-yellow) / 0.15)",
              },
              breatheAnimation:
                "semicolon-breathe 3.5s ease-in-out 1s infinite",
            }}
          />

          {/* Line 2: "Unto Sound." — tightly coupled */}
          <CharReveal
            text="Unto Sound"
            isRevealed={isRevealed}
            baseDelay={LINE2_BASE}
            charInterval={LINE2_INTERVAL}
            className="block text-[clamp(34px,8vw,68px)] font-light"
            style={{
              color: "hsl(var(--teaching-text-heading-light))",
              lineHeight: "1",
              marginTop: "-8px",
              textShadow:
                "0 1px 3px hsl(0 0% 0% / 0.7), 0 4px 20px hsl(0 0% 0% / 0.5), 0 12px 48px hsl(0 0% 0% / 0.3)",
            }}
            specialChar={{
              char: ".",
              delay: 200,
              className: "text-primary",
              style: {
                textShadow: "0 0 14px hsl(var(--vow-yellow) / 0.25)",
              },
            }}
          />
        </h1>

        {/* ── Golden thread with breathing center dot ── */}
        <div
          className={cn(
            "mx-auto mt-7 mb-6 transition-all",
            isRevealed ? "opacity-100" : "opacity-0"
          )}
          style={{
            transitionDuration: "700ms",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${THREAD_DELAY}ms`,
          }}
        >
          <div className="relative">
            <div
              className={cn(
                "h-[1px] w-16 mx-auto origin-center transition-transform",
                isRevealed ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)",
                transitionDuration: "800ms",
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${THREAD_DELAY}ms`,
              }}
              aria-hidden="true"
            />
            {/* Breathing golden dot at thread center */}
            <div
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full transition-opacity",
                isRevealed ? "opacity-100" : "opacity-0"
              )}
              style={{
                background: "hsl(var(--vow-yellow))",
                boxShadow: "0 0 10px 2px hsl(var(--vow-yellow) / 0.25)",
                animation: isRevealed
                  ? "teaching-thread-dot 4s ease-in-out infinite"
                  : undefined,
                transitionDelay: `${THREAD_DELAY + 400}ms`,
                transitionDuration: "600ms",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── Positioning subtitle ── */}
        <p
          className={cn(
            "font-sans text-[clamp(13px,1.4vw,15px)] leading-[1.75] max-w-[300px] mx-auto transition-all duration-[1800ms]",
            isRevealed
              ? "opacity-55 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(var(--teaching-text-cite))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${SUBTITLE_DELAY}ms`,
            letterSpacing: "0.015em",
          }}
        >
          I sit beside you until what you hear finds its way through your hands.
        </p>
      </div>

      {/* ── Breathing scroll cue ── */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-[700ms]",
          isRevealed && !hasScrolled ? "opacity-100" : "opacity-0",
          hasScrolled && "pointer-events-none"
        )}
      >
        <span
          className="text-[10px] uppercase tracking-[0.28em] font-sans"
          style={{ color: "hsl(var(--teaching-scroll-cue))" }}
        >
          Scroll to sit down
        </span>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          className="opacity-25"
          style={{
            animation: "scroll-chevron-bounce 2.4s ease-in-out infinite",
          }}
          aria-hidden="true"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="hsl(var(--teaching-scroll-cue))"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="block w-[5px] h-[5px] rounded-full"
          style={{
            background: "hsl(var(--vow-yellow))",
            animation: "teaching-dot-breathe 4s ease-in-out infinite",
            boxShadow: "0 0 8px 2px hsl(var(--vow-yellow) / 0.1)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Bottom edge fade for seamless section transition ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(0 0% 2%))",
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes teaching-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.06) translate(-0.5%, 0.3%); }
        }
        @keyframes teaching-dot-breathe {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        @keyframes teaching-thread-dot {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 8px 1px hsl(var(--vow-yellow) / 0.15); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.3); box-shadow: 0 0 14px 3px hsl(var(--vow-yellow) / 0.25); }
        }
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 28px hsl(var(--vow-yellow) / 0.4), 0 0 8px hsl(var(--vow-yellow) / 0.15); }
          50% { text-shadow: 0 0 44px hsl(var(--vow-yellow) / 0.6), 0 0 14px hsl(var(--vow-yellow) / 0.25); }
        }
        @keyframes teaching-hero-vignette {
          0%, 100% { opacity: 0.88; }
          50% { opacity: 0.72; }
        }
        @keyframes teaching-halo-breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        @keyframes scroll-chevron-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(3px); opacity: 0.45; }
        }
        @keyframes teaching-fog-drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(1.2%, -0.6%) scale(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-hero * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
