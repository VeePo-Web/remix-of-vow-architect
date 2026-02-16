import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * THE SUSTAIN — Abstract Piano Visualization
 * Three illuminated golden nodes connected by lines
 * Words, Silence, Memory — the sustain pedal metaphor
 */

const threeKeys = [
  {
    label: "Words",
    description: "I carry every syllable so it lands where it belongs."
  },
  {
    label: "Silence",
    description: "I guard the pause between what is spoken."
  },
  {
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

          {/* Abstract Visualization — Three connected golden nodes */}
          <div 
            className={cn(
              "relative flex justify-center items-center mb-16 h-20 transition-all duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <svg viewBox="0 0 400 40" className="w-full max-w-md h-auto" aria-hidden="true">
              {/* Connecting line */}
              <line 
                x1="60" y1="20" x2="340" y2="20" 
                stroke="hsl(45 80% 75%)" 
                strokeWidth="1" 
                opacity="0.3"
              />
              {/* Three nodes with glow */}
              {[60, 200, 340].map((cx, i) => (
                <g key={i}>
                  <circle cx={cx} cy="20" r="12" fill="hsl(45 80% 75%)" opacity="0.08" />
                  <circle cx={cx} cy="20" r="6" fill="hsl(45 80% 75%)" opacity="0.15" />
                  <circle cx={cx} cy="20" r="3" fill="hsl(45 80% 75%)" opacity="0.8" />
                </g>
              ))}
            </svg>
          </div>

          {/* Three Keys Content */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {threeKeys.map((item, index) => (
              <div 
                key={item.label}
                className={cn(
                  "text-center transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
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
