import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import benchImg from "@/assets/teaching-bench.jpg";

export function TeachingHero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="teaching-hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "hsl(40 30% 95%)" }}
      aria-label="The Empty Bench"
    >
      {/* Background bench image — Ken Burns drift */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${benchImg})`,
          opacity: 0.13,
          animation: "teaching-ken-burns 35s linear infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 grain opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      />

      {/* Warm fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, hsl(40 40% 90% / 0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(40 20% 88% / 0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-fitz-4 md:px-fitz-6">
        {/* Role label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-5 transition-all duration-[1800ms]",
            isRevealed
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-2"
          )}
          style={{
            color: "hsl(30 10% 35%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "400ms",
          }}
        >
          Piano Mentor
        </p>

        {/* Tagline */}
        <h1 className="font-display tracking-tight">
          <span
            className={cn(
              "block text-[40px] md:text-[64px] font-light transition-all duration-[1800ms]",
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
            style={{
              color: "hsl(30 10% 20%)",
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: "800ms",
            }}
          >
            From Silence
            <span
              className="text-[hsl(var(--vow-yellow))]"
              style={{
                animation: isRevealed
                  ? "semicolon-breathe 3s ease-in-out infinite"
                  : undefined,
              }}
              aria-hidden="true"
            >
              ;
            </span>
          </span>
          <span
            className={cn(
              "block text-[40px] md:text-[64px] font-light transition-all duration-[1800ms]",
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
            style={{
              color: "hsl(30 10% 20%)",
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: "1100ms",
            }}
          >
            Unto Sound
            <span className="text-[hsl(var(--vow-yellow))]">.</span>
          </span>
        </h1>
      </div>

      {/* Breathing scroll cue — golden dot */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500",
          isRevealed && !hasScrolled ? "opacity-100" : "opacity-0",
          hasScrolled && "pointer-events-none"
        )}
      >
        <span
          className="text-[10px] uppercase tracking-[0.22em] font-sans"
          style={{ color: "hsl(30 10% 45%)" }}
        >
          Scroll to begin
        </span>
        <span
          className="block w-2 h-2 rounded-full bg-[hsl(var(--vow-yellow))]"
          style={{
            animation: "teaching-dot-breathe 3s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes teaching-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.03) translate(-1%, 0.5%); }
        }
        @keyframes teaching-dot-breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
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
