import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * THE ORIGIN — The Single Moment
 * Asymmetric two-column layout: narrow text column + wide empty "memory" space
 * The emptiness represents the vows that were lost
 */
export function WitnessOrigin() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[120px] px-4 bg-background"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto items-start">
          {/* LEFT: Text Column (40%) */}
          <div className="md:col-span-2 space-y-8">
            {/* Label */}
            <p 
              className={cn(
                "text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              THE ORIGIN
            </p>

            {/* The Story */}
            <div className="space-y-6">
              <p 
                className={cn(
                  "font-display text-[clamp(20px,2.5vw,28px)] font-light leading-[1.5] text-foreground transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                I sat in the second row at a wedding and couldn't hear a single word of the vows.
              </p>
              
              <p 
                className={cn(
                  "text-lg text-muted-foreground leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "400ms" }}
              >
                The wind blew. The DJ shrugged. The moment was lost.
              </p>
              
              <p 
                className={cn(
                  "text-lg text-muted-foreground leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "600ms" }}
              >
                I left the reception that night and started building the Ceremony-Audio Plan—a way to make audibility inevitable.
              </p>
            </div>

            {/* The Vow */}
            <div 
              className={cn(
                "pt-8 border-t border-border/30 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: "800ms" }}
            >
              <p className="font-display text-xl italic text-primary">
                "No couple should ever wonder if their guests heard their vows."
              </p>
            </div>
          </div>

          {/* RIGHT: Empty Memory Space (60%) */}
          <div 
            className={cn(
              "md:col-span-3 hidden md:flex items-center justify-center min-h-[400px] transition-all duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1000ms" }}
          >
            {/* The Void - representing lost words */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Faint echo lines - words that were never heard */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-[0.03]">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-px bg-foreground"
                    style={{ 
                      width: `${60 - i * 10}%`,
                      opacity: 1 - (i * 0.15)
                    }}
                  />
                ))}
              </div>
              
              {/* Center glow - the memory that remains */}
              <div 
                className="w-2 h-2 rounded-full bg-primary/30"
                style={{ 
                  boxShadow: "0 0 60px 30px hsl(var(--vow-yellow) / 0.05)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
