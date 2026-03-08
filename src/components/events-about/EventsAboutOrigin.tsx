import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import eventsHeroImg from "@/assets/events-hero.jpg";

export function EventsAboutOrigin() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="events-about-origin"
      aria-label="The Room"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 bg-background overflow-hidden piano-section-target"
    >
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
          animation: "witness-vignette-breathe 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto items-center">
          {/* LEFT: Text Column (40%) */}
          <div className="md:col-span-2 space-y-8">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.3em] ml-[0.15em] transition-all duration-700",
                isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              THE ROOM
            </p>

            <div className="space-y-6">
              <p
                className={cn(
                  "font-display text-[clamp(20px,2.5vw,28px)] font-light leading-[1.5] text-foreground transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                I played a corporate dinner where the playlist was so loud no one could hear themselves think.
              </p>

              <p
                className={cn(
                  "text-lg text-muted-foreground leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "400ms" }}
              >
                The host kept glancing at the speaker. Guests leaned in to hear each other. The music was winning a fight no one had started.
              </p>

              <p
                className={cn(
                  "text-lg text-muted-foreground leading-relaxed transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: "600ms" }}
              >
                That night I understood — live music should listen to the room, not fill it.
              </p>
            </div>

            <div
              className={cn(
                "pt-8 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: "800ms" }}
            >
              <div
                className="h-[1px] w-full mb-8"
                style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), transparent)" }}
              />
              <p className="font-display text-xl italic text-primary">
                "The best music at an event is the kind no one notices — only the feeling it leaves behind."
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3 opacity-50">
                — Parker
              </p>
            </div>
          </div>

          {/* RIGHT: Atmospheric Image (60%) */}
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
                src={eventsHeroImg}
                alt="An intimate event venue with warm ambient lighting"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  animation: "ken-burns 30s ease-in-out infinite alternate",
                  filter: "saturate(0.85) contrast(1.05)",
                  willChange: "transform",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.6) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
            </div>
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
