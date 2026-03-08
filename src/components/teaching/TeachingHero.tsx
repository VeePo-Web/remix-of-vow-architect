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
      contentRef.current.style.transform = `translate3d(${dx * 6}px, ${dy * 4}px, 0)`;
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
  const LINE2_BASE = LINE1_BASE + "From Silence".length * LINE1_INTERVAL + SEMICOLON_EXTRA + 200;
  const LINE2_INTERVAL = 45;
  const THREAD_DELAY = LINE2_BASE + "Unto Sound".length * LINE2_INTERVAL + 400;
  const SUBTITLE_DELAY = THREAD_DELAY + 300;

  return (
    <section
      id="teaching-hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "hsl(var(--background))" }}
      aria-label="The Waiting Bench"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Layer 0: Dark base fill ── */}
      <div
        className="absolute inset-0"
        style={{ background: "hsl(20 8% 8%)" }}
        aria-hidden="true"
      />

       {/* ── Layer 1: Background bench image — 30s Ken Burns drift ── */}
      <div
        className="absolute inset-0 bg-cover bg-[center_40%]"
        style={{
          backgroundImage: `url(${benchImg})`,
          opacity: 0.16,
          animation: "teaching-ken-burns 30s linear infinite alternate",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Dark gradient overlay — strong center focus ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(20 8% 5% / 0.7) 0%, hsl(20 8% 8% / 0.2) 35%, hsl(20 8% 8% / 0.15) 50%, hsl(20 8% 6% / 0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Grain overlay ── */}
      <div
        className="absolute inset-0 grain opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Layer 4: Dual-origin warm fog — very subtle ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 35% 65%, hsl(var(--vow-yellow) / 0.03), transparent 55%), radial-gradient(ellipse at 65% 35%, hsl(var(--vow-yellow) / 0.025), transparent 50%)",
          animation: isRevealed
            ? "teaching-fog-drift 20s ease-in-out infinite alternate"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 5: Warm light bloom — top-center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, hsl(var(--vow-yellow) / 0.04), transparent 50%)",
          animation: isRevealed
            ? "hero-light-bloom 8s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 6: Breathing vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, hsl(20 8% 6%) 100%)",
          animation: isRevealed
            ? "teaching-hero-vignette 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ── Content — parallax container ── */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-fitz-4 md:px-fitz-6"
        style={{ willChange: "transform" }}
      >
        {/* Role label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[1800ms]",
            isRevealed
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(40 15% 65%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${ROLE_DELAY}ms`,
          }}
        >
          Piano Mentorship
        </p>

        {/* ── Tagline — character-by-character reveal ── */}
        <h1 className="font-display tracking-tight">
          {/* Line 1: "From Silence" + semicolon ignition */}
          <CharReveal
            text="From Silence"
            isRevealed={isRevealed}
            baseDelay={LINE1_BASE}
            charInterval={LINE1_INTERVAL}
            className="block text-[40px] md:text-[64px] font-light leading-[1.05]"
            style={{
              color: "hsl(40 20% 90%)",
              textShadow:
                "0 1px 3px hsl(20 8% 6% / 0.5), 0 4px 24px hsl(20 8% 6% / 0.3)",
            }}
            specialChar={{
              char: ";",
              delay: SEMICOLON_EXTRA,
              className: "text-[hsl(var(--vow-yellow))]",
              style: {
                textShadow: "0 0 20px hsl(var(--vow-yellow) / 0.4)",
              },
              breatheAnimation:
                "semicolon-breathe 3s ease-in-out 1s infinite",
            }}
          />

          {/* Line 2: "Unto Sound." */}
          <CharReveal
            text="Unto Sound"
            isRevealed={isRevealed}
            baseDelay={LINE2_BASE}
            charInterval={LINE2_INTERVAL}
            className="block text-[40px] md:text-[64px] font-light leading-[1.05] -mt-1"
            style={{
              color: "hsl(40 20% 90%)",
              textShadow:
                "0 1px 3px hsl(20 8% 6% / 0.5), 0 4px 24px hsl(20 8% 6% / 0.3)",
            }}
            specialChar={{
              char: ".",
              delay: 200,
              className: "text-[hsl(var(--vow-yellow))]",
            }}
          />
        </h1>

        {/* ── Golden thread — tagline to subtitle ── */}
        <div
          className={cn(
            "mx-auto mt-8 mb-6 transition-all",
            isRevealed ? "opacity-100" : "opacity-0"
          )}
          style={{
            transitionDuration: "700ms",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${THREAD_DELAY}ms`,
          }}
        >
          <div
            className={cn(
              "h-[1px] w-16 mx-auto origin-center transition-transform",
              isRevealed ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)",
              transitionDuration: "700ms",
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              transitionDelay: `${THREAD_DELAY}ms`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Positioning subtitle ── */}
        <p
          className={cn(
            "font-sans text-[clamp(13px,1.6vw,16px)] leading-relaxed max-w-[340px] mx-auto transition-all duration-[1800ms]",
            isRevealed
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(40 12% 60%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: `${SUBTITLE_DELAY}ms`,
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
          className="text-[10px] uppercase tracking-[0.22em] font-sans"
          style={{ color: "hsl(40 12% 50%)" }}
        >
          Scroll to sit down
        </span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className="opacity-40"
          style={{
            animation: "scroll-chevron-bounce 2.4s ease-in-out infinite",
          }}
          aria-hidden="true"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="hsl(40 12% 50%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="block w-2 h-2 rounded-full bg-[hsl(var(--vow-yellow))]"
          style={{
            animation: "teaching-dot-breathe 4s ease-in-out infinite",
            boxShadow: "0 0 6px 2px hsl(var(--vow-yellow) / 0.15)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes teaching-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.04) translate(-0.5%, 0.3%); }
        }
        @keyframes teaching-dot-breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
        }
        @keyframes teaching-hero-vignette {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.65; }
        }
        @keyframes hero-light-bloom {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes scroll-chevron-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(4px); opacity: 0.6; }
        }
        @keyframes teaching-fog-drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(2%, -1%) scale(1.03); }
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
