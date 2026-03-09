import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";
import { LetterPressQuote } from "@/components/ui/letterpress-quote";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import aboutOriginImg from "@/assets/about-origin.jpg";

export function WitnessOrigin() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const parallaxRef = useScrollParallax({ intensity: 60 });

  return (
    <section 
      id="witness-origin"
      aria-label="The Origin"
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="relative py-[120px] px-4 bg-background overflow-hidden piano-section-target"
    >
      {/* Parallax watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.02]"
        style={{ color: "hsl(var(--foreground))" }}
        aria-hidden="true"
      >
        Origin
      </span>

      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
          animation: "witness-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 40%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto items-center">
          {/* LEFT: Text Column (40%) */}
          <div className="md:col-span-2 space-y-8">
            {/* Section numeral + label */}
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <span
                className="block font-display text-[40px] font-light leading-none mb-3"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                02
              </span>
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                  THE ORIGIN
                </p>
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
              </div>
            </div>

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

          {/* RIGHT: GoldCornerImage (60%) */}
          <div 
            className={cn(
              "md:col-span-3 relative transition-all duration-1000 rounded-sm",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <GoldCornerImage
              src={aboutOriginImg}
              alt="Empty wedding ceremony chairs at twilight with scattered petals"
              frameIndex="FR01"
              parallaxStyle={{
                transform: 'translateY(var(--parallax-y, 0))',
                transition: 'transform 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />
    </section>
  );
}
