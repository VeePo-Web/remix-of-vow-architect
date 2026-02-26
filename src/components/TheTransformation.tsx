import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import transformationFear from "@/assets/transformation-fear-ai.jpg";
import transformationLife from "@/assets/transformation-life-ai.jpg";

const fears = [
  "The pianist plays the same songs as every other wedding",
  "The music feels like background noise — not your story",
  "No one asked what songs actually mean something to you",
  "The musician shows up, plays, and leaves — no connection",
];

const resolutions = [
  "Every arrangement is built from a conversation — yours",
  "Your walk-down song, composed note by note for you",
  "A full ceremony plan — sent before you ever have to ask",
  "A pianist who stays until the last guest leaves the room",
];

export function TheTransformation() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="section-grain relative min-h-[500px] overflow-hidden" style={{ minHeight: '500px' }}>
      {/* Section Label — standard positioning above split */}
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-6 relative z-30">
        <p
          className={cn(
            "text-xs uppercase tracking-[0.22em] text-foreground/50 text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          THE TRANSFORMATION
        </p>
      </div>

      {/* Full-Width Split Screen */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* LEFT PANEL — DEATH (Fears) */}
        <div
          className="relative px-8 py-16 md:py-24 flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(220 15% 8%) 0%, hsl(240 12% 3%) 100%)" }}
        >
          <img
            src={transformationFear}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none"
            loading="lazy"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle at 30% 40%, hsl(220 80% 20% / 0.15) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-md mx-auto space-y-6 mt-8">
            {fears.map((fear, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-700 group",
                  isVisible ? "opacity-70 hover:opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: isVisible ? `${150 + index * 150}ms` : "0ms" }}
              >
                <X size={20} className="text-error shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                <p className="text-base leading-relaxed text-foreground/80">{fear}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — LIFE (Resolutions) */}
        <div
          className="relative px-8 py-16 md:py-24 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(45 30% 95%) 0%, hsl(42 28% 91%) 100%)" }}
        >
          <img
            src={transformationLife}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none"
            loading="lazy"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle at 70% 40%, hsl(var(--vow-yellow) / 0.15) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-md mx-auto space-y-6">
            {resolutions.map((resolution, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-700 group",
                  isVisible ? "opacity-80 hover:opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                )}
                style={{ transitionDelay: isVisible ? `${150 + index * 150}ms` : "0ms" }}
              >
                <Check size={20} className="text-success shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                <p className="text-base leading-relaxed text-rich-black font-medium">{resolution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER DIVIDER — breathing glow (outside grid for proper overlay) */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none hidden md:block z-30"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(var(--vow-yellow) / 0.85) 50%, transparent 100%)",
          boxShadow: "0 0 50px 12px hsl(var(--vow-yellow) / 0.25), 0 0 100px 24px hsl(var(--vow-yellow) / 0.12)",
          animation: "divider-breathe 4s ease-in-out infinite",
        }}
      aria-hidden="true"
      />

      {/* Bottom fade into TheWitness warm */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 25% 96%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
