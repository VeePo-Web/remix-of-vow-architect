import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import aboutOriginImg from "@/assets/about-origin.jpg";

/**
 * THE ORIGIN — The Single Moment
 * Asymmetric two-column layout: narrow text column + atmospheric image
 */
export function WitnessOrigin() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[120px] px-4 bg-background"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto items-center">
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

          {/* RIGHT: Atmospheric Image (60%) */}
          <div 
            className={cn(
              "md:col-span-3 relative transition-all duration-1000 overflow-hidden rounded-sm",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative aspect-[3/4] max-h-[560px]">
              <img 
                src={aboutOriginImg} 
                alt="Empty wedding ceremony chairs at twilight with scattered petals"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ animation: "ken-burns 30s ease-in-out infinite alternate" }}
              />
              {/* Cinematic vignette overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.6) 100%)"
                }}
                aria-hidden="true"
              />
              {/* Film grain */}
              <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
