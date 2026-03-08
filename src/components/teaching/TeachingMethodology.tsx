import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import keysImg from "@/assets/teaching-keys.jpg";

export function TeachingMethodology() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="teaching-methodology"
      ref={ref}
      className="relative py-[140px] md:py-[180px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(30 8% 14%)" }}
      role="region"
      aria-label="The First Question"
    >
      {/* Background keys — Ken Burns drift */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${keysImg})`,
          opacity: 0.08,
          animation: "methodology-ken-burns 30s linear infinite alternate",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Grain */}
      <div
        className="absolute inset-0 grain opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Dual-origin fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, hsl(30 15% 20% / 0.3), transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(30 10% 18% / 0.25), transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, hsl(30 8% 8% / 0.6) 100%)",
          animation: isVisible
            ? "methodology-vignette 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[720px] mx-auto text-center">
        {/* Whispered section label */}
        <p
          className={cn(
            "font-sans text-[11px] uppercase tracking-[0.22em] mb-fitz-7 transition-all duration-[700ms]",
            isVisible
              ? "opacity-35 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(40 15% 55%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          The First Conversation
        </p>

        {/* Vertical golden thread — above quote */}
        <div
          className={cn(
            "w-px h-[48px] mx-auto mb-fitz-7 origin-top transition-transform duration-[700ms]",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.06), hsl(var(--vow-yellow) / 0.25))",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "150ms",
          }}
          aria-hidden="true"
        />

        {/* The First Question */}
        <h2
          className={cn(
            "font-display text-[32px] md:text-[48px] font-light tracking-tight leading-[1.15] mb-fitz-8 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[12px]"
          )}
          style={{
            color: "hsl(40 30% 90%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "200ms",
            textShadow:
              "0 1px 2px hsl(0 0% 0% / 0.3), 0 4px 16px hsl(0 0% 0% / 0.15)",
          }}
        >
          "What do you want to{" "}
          <span className="relative inline-block">
            say
            <span
              className={cn(
                "absolute -bottom-1 left-0 w-full h-[2px] bg-[hsl(var(--vow-yellow))] origin-left transition-transform duration-[450ms]",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                transitionDelay: "800ms",
              }}
              aria-hidden="true"
            />
          </span>{" "}
          through this instrument?"
        </h2>

        {/* Narrative */}
        <p
          className={cn(
            "font-sans text-[16px] md:text-[18px] leading-[1.7] max-w-[600px] mx-auto mb-fitz-7 transition-all duration-[900ms]",
            isVisible
              ? "opacity-80 translate-y-0"
              : "opacity-0 translate-y-[8px]"
          )}
          style={{
            color: "hsl(40 20% 75%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "400ms",
          }}
        >
          The first question I ask is never about music. It is about you. What
          brought you here. What you hear when no one is listening. The
          mentorship begins not with a scale or an exercise — but with a
          conversation about the sound you carry inside.
        </p>

        {/* Seed metaphor */}
        <p
          className={cn(
            "font-display italic text-[16px] md:text-[18px] leading-[1.6] max-w-[520px] mx-auto mb-fitz-7 transition-all duration-[900ms]",
            isVisible
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-[6px]"
          )}
          style={{
            color: "hsl(40 25% 70%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "700ms",
          }}
        >
          Every gift arrives as a seed. Your hands are the soil.
        </p>

        {/* Pencil annotation */}
        <span
          className={cn(
            "inline-block font-display italic text-[14px] transition-all duration-[700ms]",
            isVisible ? "opacity-50" : "opacity-0"
          )}
          style={{
            color: "hsl(40 20% 65%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "1000ms",
          }}
          aria-label="Annotation: listen"
        >
          — listen
        </span>

        {/* Closing golden thread */}
        <div
          className={cn(
            "mx-auto h-px max-w-[80px] mt-fitz-8 transition-transform duration-[700ms] origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "1200ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes methodology-ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.04) translate(-0.5%, 0.3%); }
        }
        @keyframes methodology-vignette {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          #teaching-methodology * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </section>
  );
}
