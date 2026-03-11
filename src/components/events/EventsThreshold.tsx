import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import eventsBallroomImg from "@/assets/events-ballroom-grand.jpg";

const concerns = [
  {
    question: "Will it be too loud — or too quiet?",
    answer:
      "I calibrate volume to your room and guest count. Whether it is a living room for twelve or a hall for two hundred, the piano sits at exactly the right level — present but never intrusive.",
  },
  {
    question: "Can you play what we like?",
    answer:
      "My event repertoire spans 500+ pieces across classical, film scores, pop arrangements, hymns, and jazz standards. If there is something specific you want, I will learn it.",
  },
  {
    question: "What if the space is unusual?",
    answer:
      "I have played living rooms, churches, rooftops, gardens, and hotel suites. I bring what I need and adapt to what the room gives me.",
  },
  {
    question: "Is this within our budget?",
    answer:
      "Transparent pricing with no hidden fees. I will give you a clear quote after our first conversation — no surprises, no pressure.",
  },
];

export function EventsThreshold() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="events-threshold"
      ref={ref}
      className="relative py-fitz-10 px-fitz-4 md:px-fitz-6 overflow-hidden"
      style={{ background: "hsl(var(--card))" }}
      role="region"
      aria-label="Common Questions"
    >
      {/* Background texture with Ken Burns */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${eventsBallroomImg})`,
          opacity: 0.04,
          animation: "events-threshold-kb 30s linear infinite alternate",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2
          className={cn(
            "font-display text-[28px] md:text-[40px] font-light tracking-tight text-foreground text-center mb-fitz-8 transition-all duration-[700ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
        >
          You might be wondering
        </h2>

        <div className="space-y-8">
          {concerns.map((c, i) => (
            <div
              key={i}
              className={cn(
                "border-l-2 border-primary/20 pl-6 transition-all duration-[600ms]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: `${300 + i * 180}ms`,
              }}
            >
              <p className="font-display italic text-[18px] md:text-[22px] text-foreground mb-2">
                "{c.question}"
              </p>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                {c.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes events-threshold-kb {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.03) translate(-0.2%, 0.2%); }
        }
        @media (prefers-reduced-motion: reduce) {
          #events-threshold * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
