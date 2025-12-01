import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const fears = [
  "Guests in the back can't hear our vows",
  "Generators hum through the ceremony",
  "No SPL proof for permit compliance",
  "DJ arrives with no ceremony mic plan",
];

const resolutions = [
  "Every guest hears—mic coverage documented",
  "Silent battery power; zero ambient noise",
  "3 SPL readings logged with timestamps",
  "Ceremony audio plan delivered in 24 hours",
];

export function TheTransformation() {
  return (
    <section className="relative overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        <h2 className="text-sm uppercase tracking-[0.22em] text-muted-foreground mb-2">
          The night before... vs. the morning of.
        </h2>
      </div>

      {/* Full-Width Split Screen */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* LEFT PANEL — DEATH (Fears) */}
        <div 
          className="relative px-8 py-16 md:py-24 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(220 15% 8%) 0%, hsl(240 12% 3%) 100%)",
          }}
        >
          {/* Cold overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 30% 40%, hsl(220 80% 20% / 0.15) 0%, transparent 60%)"
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-md mx-auto space-y-6">
            {fears.map((fear, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300 group"
              >
                <X 
                  size={20} 
                  className="text-error shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" 
                  strokeWidth={2}
                />
                <p className="text-base leading-relaxed text-foreground/80">
                  {fear}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER DIVIDER — THE THRESHOLD */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none hidden md:block z-20"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(var(--vow-yellow) / 0.3) 50%, transparent 100%)",
            boxShadow: "0 0 40px 8px hsl(var(--vow-yellow) / 0.2)"
          }}
          aria-hidden="true"
        />

        {/* RIGHT PANEL — LIFE (Resolutions) */}
        <div 
          className="relative px-8 py-16 md:py-24 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(45 35% 94%) 0%, hsl(45 30% 90%) 100%)",
          }}
        >
          {/* Warm overlay */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 70% 40%, hsl(var(--vow-yellow) / 0.15) 0%, transparent 60%)"
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-md mx-auto space-y-6">
            {resolutions.map((resolution, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity duration-300 group"
              >
                <Check 
                  size={20} 
                  className="text-success shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" 
                  strokeWidth={2.5}
                />
                <p className="text-base leading-relaxed text-rich-black font-medium">
                  {resolution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
