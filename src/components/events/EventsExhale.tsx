import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import gatewayEventsImg from "@/assets/gateway-events.jpg";

const lines = [
  "You are planning something that matters.",
  "A dinner where conversation deepens. A gathering where presence is felt.",
  "A moment that asks for more than a playlist.",
  "I understand what live music does to a room.",
];

export function EventsExhale() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      id="events-exhale"
      ref={ref}
      className="relative py-[120px] md:py-[160px] px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      role="region"
      aria-label="Recognition"
    >
      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "font-display italic text-[20px] md:text-[28px] leading-[1.5] tracking-tight text-foreground transition-all duration-[600ms]",
              i < lines.length - 1 ? "mb-fitz-5" : "mb-0",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${200 + i * 400}ms`,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Editorial image bleed — right-aligned on desktop */}
      <div
        className={cn(
          "relative z-10 mt-[80px] md:mt-[120px] transition-all duration-[900ms]",
          "md:w-[55%] md:ml-auto md:-mr-[4%]",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
          transitionDelay: "1600ms",
        }}
      >
        <GoldCornerImage
          src={gatewayEventsImg}
          alt="Grand piano set for a private evening event"
          aspectRatio="3/2"
          maxHeight="420px"
        />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #events-exhale * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
