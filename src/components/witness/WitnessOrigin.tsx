import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";
import { LetterPressQuote } from "@/components/ui/letterpress-quote";
import aboutOriginImg from "@/assets/about-origin.jpg";

/**
 * THE ORIGIN — The Single Moment
 * Asymmetric two-column layout: narrow text column + atmospheric image with frame
 */
export function WitnessOrigin() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const parallaxRef = useScrollParallax({ intensity: 60 });

  return (
    <section 
      id="witness-origin"
      aria-label="The Origin"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 bg-background overflow-hidden piano-section-target"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Breathing vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
          animation: "witness-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Warm fog */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 40%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto items-center">
          {/* LEFT: Text Column (40%) */}
          <div className="md:col-span-2 space-y-8">
            {/* Label */}
            <p 
              className={cn(
                "text-xs uppercase tracking-[0.3em] transition-all duration-700",
                isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ color: "hsl(var(--muted-foreground))" }}
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
                The wind blew. The musician shrugged. The moment was lost.
              </p>
              
              <p 
                className={cn(
                  "text-lg text-muted-foreground leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "600ms" }}
              >
                I left the reception that night with a single promise: no couple would ever lose their words to the wind.
              </p>
            </div>

            {/* LetterPress Quote - replaces generic quote pattern */}
            <div 
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: "800ms" }}
            >
              <LetterPressQuote 
                quote="No couple should ever wonder if their guests heard their vows."
                attribution="The Origin Moment"
              />
            </div>
          </div>

          {/* RIGHT: Atmospheric Image (60%) with frame treatment */}
          <div 
            className={cn(
              "md:col-span-3 relative transition-all duration-1000 rounded-sm",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <div 
              className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-sm"
              style={{
                boxShadow: "0 20px 60px hsl(var(--rich-black) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.08)",
              }}
            >
              <img 
                src={aboutOriginImg} 
                alt="Empty wedding ceremony chairs at twilight with scattered petals"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ 
                  animation: "ken-burns 30s ease-in-out infinite alternate",
                  filter: "saturate(0.85) contrast(1.05)",
                  willChange: "transform",
                }}
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
              <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Section fade bottom → Sustain */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
