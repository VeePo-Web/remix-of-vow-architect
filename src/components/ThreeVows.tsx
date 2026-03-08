import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface VowProps {
  number: string;
  title: string;
  description: string;
}

const vows: VowProps[] = [
  {
    number: "01",
    title: "HEARD",
    description: "Every word reaches every guest.",
  },
  {
    number: "02",
    title: "POWERED",
    description: "Silent batteries. Zero noise.",
  },
  {
    number: "03",
    title: "MEASURED",
    description: "SPL proof at three ceremony moments.",
  },
];

export function ThreeVows() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="three-vows"
      ref={sectionRef}
      role="region"
      aria-labelledby="three-vows-heading"
      className="section--surface section-padding-cinematic"
    >
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

          {/* Three Vows Grid — PURE ESSENCE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
            {vows.map((vow, index) => (
              <div 
                key={index}
                className="text-center relative group"
              >
                {/* Large Numeral Background — 120px at 5% */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[120px] font-display font-light opacity-[0.05] pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-[0.1]"
                  aria-hidden="true"
                >
                  {vow.number}
                </div>

                {/* Title — Single Word */}
                <h3 className="relative z-10 text-base uppercase tracking-[0.28em] font-semibold mb-6 text-foreground pt-12">
                  {vow.title}
                </h3>

                {/* Description — One Sentence */}
                <p className="text-base leading-relaxed text-muted-foreground">
                  {vow.description}
                </p>
              </div>
            ))}

            {/* Golden Thread Connector — 40% Visible */}
            <div 
              className="hidden md:block absolute top-16 left-0 right-0 h-[1px] opacity-40 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, hsl(var(--vow-yellow)) 20%, hsl(var(--vow-yellow)) 80%, transparent 100%)"
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
