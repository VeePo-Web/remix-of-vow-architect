import { Mic, Battery, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface VowProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const vows: VowProps[] = [
  {
    number: "01",
    title: "HEARD",
    description: "Officiant and vow microphones capture every word—projected clearly to every guest, back row included.",
    icon: Mic,
  },
  {
    number: "02",
    title: "POWERED",
    description: "Silent battery system (no generator hum)—respecting Parks Canada bylaws and natural venue acoustics.",
    icon: Battery,
  },
  {
    number: "03",
    title: "MEASURED",
    description: "SPL readings at 3 ceremony moments—documented proof your vows met legal and venue requirements.",
    icon: Activity,
  },
];

export function ThreeVows() {
  return (
    <section className="section--surface section-padding-cinematic">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Sacred Intro */}
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">
              THE VOW
            </p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight mb-8">
              "Every word will reach every heart."
            </h2>
            
            {/* Golden Thread */}
            <div 
              className="h-[2px] w-48 mx-auto rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)"
              }}
              aria-hidden="true"
            />
          </div>

          {/* Three Vows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {vows.map((vow, index) => {
              const Icon = vow.icon;
              return (
                <div 
                  key={index}
                  className="text-center relative group"
                >
                  {/* Large Numeral Background */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-[120px] font-display font-light opacity-[0.05] pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-[0.08]"
                    aria-hidden="true"
                  >
                    {vow.number}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full border border-border/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5">
                      <Icon size={28} className="text-muted-foreground transition-colors duration-300 group-hover:text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm uppercase tracking-[0.22em] font-semibold mb-4 text-foreground">
                    {vow.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">
                    {vow.description}
                  </p>
                </div>
              );
            })}

            {/* Golden Thread Connector (desktop only) */}
            <div 
              className="hidden md:block absolute top-8 left-0 right-0 h-[1px] opacity-20 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, hsl(var(--vow-yellow)) 20%, hsl(var(--vow-yellow)) 80%, transparent 100%)"
              }}
              aria-hidden="true"
            />
          </div>

          {/* Subtle Footer */}
          <p className="text-center text-xs text-muted-foreground/60 mt-16">
            Documented, insured, remedy-backed
          </p>
        </div>
      </div>
    </section>
  );
}
