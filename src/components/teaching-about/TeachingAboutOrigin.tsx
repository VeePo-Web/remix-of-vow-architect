import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import teachingKeysImg from "@/assets/teaching-keys.jpg";

export function TeachingAboutOrigin() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="teaching-about-origin"
      aria-label="The First Note"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-[120px] px-4 bg-background overflow-hidden piano-section-target"
    >
      {/* Parallax watermark */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] font-light pointer-events-none select-none opacity-[0.02]" style={{ color: "hsl(var(--foreground))" }} aria-hidden="true">
        Origin
      </span>

      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)", animation: "witness-vignette-breathe 6s ease-in-out infinite" }} aria-hidden="true" />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto items-center">
          <div className="md:col-span-2 space-y-8">
            {/* Section numeral + label */}
            <div className={cn("transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
              <span className="block font-display text-[40px] font-light leading-none mb-3" style={{ background: "linear-gradient(180deg, hsl(var(--vow-yellow) / 0.25), hsl(var(--vow-yellow) / 0.08))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>02</span>
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>HOW IT STARTED</p>
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5))" }} />
              </div>
            </div>

            <div className="space-y-6">
              <p className={cn("font-display text-[clamp(20px,2.5vw,28px)] font-light leading-[1.5] text-foreground transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: "200ms" }}>
                I watched a student play their first chord after six months. Not because they were slow — because they needed to be ready.
              </p>
              <p className={cn("text-lg text-muted-foreground leading-relaxed transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: "400ms" }}>
                That moment changed how I think about teaching. It is not about covering material. It is about paying attention.
              </p>
              <p className={cn("text-lg text-muted-foreground leading-relaxed transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: "600ms" }}>
                Every student arrives with a different story. I have learned to start there — not with a syllabus.
              </p>
            </div>

            <div className={cn("pt-8 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: "800ms" }}>
              <div className="h-[1px] w-full mb-8" style={{ background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
              <p className="font-display text-xl italic text-primary">
                "The best lessons do not feel like lessons. They feel like conversations."
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3 opacity-50">— Parker</p>
            </div>
          </div>

          <div className={cn("md:col-span-3 relative transition-all duration-1000 rounded-sm", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: "400ms" }}>
            <GoldCornerImage
              src={teachingKeysImg}
              alt="Piano keys in warm light, ready for a lesson"
              frameIndex="FR01"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} aria-hidden="true" />
    </section>
  );
}
