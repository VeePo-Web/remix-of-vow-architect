import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/events-stage-purple.webp";

export function EventsHero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="events-hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "hsl(var(--rich-black))" }}
      data-theme="death"
      aria-label="Events hero"
    >
      {/* Background image with Ken Burns */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.22,
          animation: "events-ken-burns 25s ease-in-out infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none" aria-hidden="true" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--rich-black)) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-fitz-4">
        {/* Role label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-fitz-4 transition-all duration-[900ms]",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
        >
          Private Event Pianist
        </p>

        {/* Tagline */}
        <h1
          className={cn(
            "font-display text-[36px] md:text-[56px] font-light tracking-tight text-foreground leading-[1.1] max-w-[16ch] mx-auto transition-all duration-[900ms]",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
          }}
        >
          Every room has a sound it's waiting for
          <span className="text-primary">.</span>
        </h1>
      </div>

      {/* CTA button — centered, visible before scroll */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none",
          isRevealed && !hasScrolled ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "800ms" }}
      >
        <Link
          to="/events/contact"
          className={cn(
            "cn-cta-btn pointer-events-auto",
            isRevealed && !hasScrolled ? "" : "pointer-events-none"
          )}
          style={{ marginTop: '8vh' }}
          tabIndex={isRevealed && !hasScrolled ? 0 : -1}
        >
          Discuss Your Event
        </Link>
      </div>

      {/* Scroll cue */}
      <div
        className={cn(
          "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500",
          isRevealed && !hasScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{
          transitionDelay: "1200ms",
        }}
      >
        <span className="text-xs uppercase tracking-[0.3em] font-sans" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
          Scroll
        </span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"
          className="opacity-40"
          style={{ animation: "events-chevron-bounce 2.8s ease-in-out infinite" }}>
          <path d="M1 1.5L6 6.5L11 1.5" stroke="hsl(0 0% 100% / 0.7)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes events-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.06) translate(-1%, 1%); }
        }
        @keyframes events-dot-breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes events-chevron-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .events-ken-burns { animation: none !important; }
          .events-dot-breathe { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
