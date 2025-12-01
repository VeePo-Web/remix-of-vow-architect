import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * THE SUSTAIN — Piano Keyboard Silhouette
 * Three illuminated keys for: Words, Silence, Memory
 * The sustain pedal metaphor - notes that linger beyond their strike
 */

const threeKeys = [
  {
    key: "C",
    label: "Words",
    description: "I carry every syllable so it lands where it belongs."
  },
  {
    key: "E", 
    label: "Silence",
    description: "I guard the pause between what is spoken."
  },
  {
    key: "G",
    label: "Memory",
    description: "I remember what was said when memory fades."
  }
];

export function WitnessSustain() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[120px] px-4"
      style={{
        background: "linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)"
      }}
    >
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <p 
            className={cn(
              "text-xs uppercase tracking-[0.3em] text-center mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0 text-muted-foreground" : "opacity-0 translate-y-4"
            )}
          >
            THE SUSTAIN
          </p>

          {/* Headline */}
          <h2 
            className={cn(
              "font-display text-[clamp(28px,4vw,48px)] font-light text-center leading-tight mb-16 text-foreground transition-all duration-700 max-w-3xl mx-auto",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Like a sustain pedal holds a note,<br />
            I hold your ceremony.
          </h2>

          {/* Piano Keyboard Visualization */}
          <div className="relative mb-16">
            {/* Simplified Piano Keys - Abstract */}
            <div 
              className={cn(
                "flex justify-center gap-1 mb-8 transition-all duration-1000",
                isVisible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              {/* 7 white keys representing an octave */}
              {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note, i) => {
                const isIlluminated = note === 'C' || note === 'E' || note === 'G';
                return (
                  <div
                    key={note}
                    className={cn(
                      "relative w-12 md:w-16 h-32 md:h-40 rounded-b-md border border-border/20 transition-all duration-500",
                      isIlluminated 
                        ? "bg-primary/20 border-primary/40" 
                        : "bg-card/50"
                    )}
                    style={{ 
                      transitionDelay: `${600 + i * 100}ms`,
                      boxShadow: isIlluminated 
                        ? "0 0 30px hsl(var(--vow-yellow) / 0.3), inset 0 -20px 40px hsl(var(--vow-yellow) / 0.1)" 
                        : "none"
                    }}
                  >
                    {/* Key label */}
                    <span className={cn(
                      "absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-mono",
                      isIlluminated ? "text-primary" : "text-muted-foreground/30"
                    )}>
                      {note}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Three Keys Content */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {threeKeys.map((item, index) => (
              <div 
                key={item.key}
                className={cn(
                  "text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                {/* Glowing dot */}
                <div 
                  className="w-3 h-3 rounded-full bg-primary mx-auto mb-4"
                  style={{ boxShadow: "0 0 20px hsl(var(--vow-yellow) / 0.5)" }}
                />
                
                {/* Label */}
                <h3 className="font-display text-2xl font-light text-foreground mb-3">
                  {item.label}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
