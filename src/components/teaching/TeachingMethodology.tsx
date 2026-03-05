import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import keysImg from "@/assets/teaching-keys.jpg";

export function TeachingMethodology() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="teaching-methodology"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(30 8% 14%)" }}
      role="region"
      aria-label="The First Question"
    >
      {/* Background keys */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: `url(${keysImg})` }}
        aria-hidden="true"
      />

      {/* Grain */}
      <div
        className="absolute inset-0 grain opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[720px] mx-auto text-center">
        {/* The First Question */}
        <h2
          className={cn(
            "font-display text-[32px] md:text-[48px] font-light tracking-tight leading-[1.15] mb-fitz-8 transition-all duration-[900ms]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{
            color: "hsl(40 30% 90%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          }}
        >
          "What do you want to say through this instrument?"
        </h2>

        {/* Narrative */}
        <p
          className={cn(
            "font-sans text-[16px] md:text-[18px] leading-[1.7] max-w-[600px] mx-auto mb-fitz-7 transition-all duration-[900ms]",
            isVisible
              ? "opacity-80 translate-y-0"
              : "opacity-0 translate-y-3"
          )}
          style={{
            color: "hsl(40 20% 75%)",
            transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
            transitionDelay: "300ms",
          }}
        >
          The first question I ask is never about music. It is about you. What brought you here.
          What you hear when no one is listening. The mentorship begins not with a scale or an
          exercise — but with a conversation about the sound you carry inside.
        </p>

        {/* Pencil annotation */}
        <span
          className={cn(
            "inline-block font-display italic text-[14px] transition-all duration-[600ms]",
            isVisible ? "opacity-60" : "opacity-0"
          )}
          style={{
            color: "hsl(40 20% 70%)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
            transitionDelay: "800ms",
            fontStyle: "italic",
          }}
          aria-label="Annotation: listen"
        >
          — listen
        </span>
      </div>
    </section>
  );
}
