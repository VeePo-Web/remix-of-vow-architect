import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";
import weddingsImg from "@/assets/gateway-weddings.jpg";
import teachingImg from "@/assets/gateway-teaching.jpg";
import eventsImg from "@/assets/gateway-events.jpg";

const services = [
  {
    title: "Weddings",
    description: "Sacred ceremony audio",
    image: weddingsImg,
    href: "/weddings",
    available: true,
    delay: 800,
  },
  {
    title: "Teaching",
    description: "Private lessons & studio sessions",
    image: teachingImg,
    href: "/teaching",
    available: false,
    delay: 1000,
  },
  {
    title: "Events",
    description: "Live music for your occasion",
    image: eventsImg,
    href: "/events",
    available: false,
    delay: 1200,
  },
];

function CardImage({ image }: { image: string }) {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // max ±4px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    imgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    imgRef.current.style.transition = "transform 100ms ease-out";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = "translate(0, 0)";
    imgRef.current.style.transition = "transform 500ms ease-out";
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <div
        ref={imgRef}
        className="absolute -inset-2 bg-cover bg-center transition-opacity duration-500 opacity-[0.30] group-hover:opacity-[0.40]"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}

export default function Gateway() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[hsl(var(--rich-black))] flex flex-col items-center py-8 md:py-0 md:justify-center relative">
      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.10] pointer-events-none" aria-hidden="true" />

      {/* Wordmark */}
      <header className="text-center mb-6 md:mb-14 shrink-0 opacity-0 animate-fade-in" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <h1 className="font-display text-[28px] font-light tracking-tight text-foreground">
          Parker Gawryletz
        </h1>
        <p
          className="font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-1.5 opacity-0 animate-fade-in"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          Sound Director
        </p>
      </header>

      {/* Bento Cards */}
      <div className="relative flex flex-col md:flex-row gap-3 md:gap-6 px-6 max-w-5xl w-full flex-1 md:flex-initial min-h-0">
        {/* Golden Thread */}
        <div
          className="absolute pointer-events-none opacity-0 animate-fade-in left-1/2 top-6 bottom-6 w-px md:left-6 md:right-6 md:top-1/2 md:w-auto md:h-px bg-[hsl(var(--vow-yellow)/0.15)]"
          style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
          aria-hidden="true"
        />
        {services.map((s) => {
          const inner = (
            <>
              <CardImage image={s.image} />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                aria-hidden="true"
              />
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                <h2 className="font-display text-[28px] font-light text-foreground tracking-tight">
                  {s.title}
                </h2>
                <p className="font-sans text-[14px] text-muted-foreground mt-1 leading-relaxed">
                  {s.description}
                </p>
                <span
                  className={cn(
                    "mt-4 font-sans text-[12px] uppercase tracking-[0.18em] inline-flex items-center gap-1.5",
                    s.available
                      ? "text-[hsl(var(--vow-yellow))]"
                      : "text-muted-foreground/50"
                  )}
                >
                  {s.available ? "Enter" : "Coming Soon"}
                  {s.available && (
                    <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[180ms] ease-out">
                      →
                    </span>
                  )}
                </span>
              </div>
            </>
          );

          const cardClasses = cn(
            "group relative overflow-hidden rounded-2xl border border-white/10 flex-1 min-h-0 md:flex-none md:aspect-[3/4]",
            "transition-all duration-300 opacity-0 animate-fade-in",
            s.available
              ? "cursor-pointer hover:-translate-y-2 hover:border-[hsl(var(--vow-yellow)/0.25)] hover:shadow-[0_16px_48px_rgba(255,224,138,0.08)]"
              : "cursor-default"
          );

          const style = {
            animationDelay: `${s.delay}ms`,
            animationFillMode: "forwards" as const,
          };

          return s.available ? (
            <Link key={s.title} to={s.href} className={cn(cardClasses, "md:flex-1")} style={style}>
              {inner}
            </Link>
          ) : (
            <div key={s.title} className={cn(cardClasses, "md:flex-1")} style={style}>
              {inner}
            </div>
          );
        })}
      </div>

      {/* Semicolon breathing keyframe */}
      <style>{`
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
        }
        @media (prefers-reduced-motion: reduce) {
          .semicolon-breathe { animation: none !important; }
        }
      `}</style>

      {/* Footer tagline */}
      <footer
        className="mt-6 md:mt-14 shrink-0 text-center opacity-0 animate-fade-in"
        style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
      >
        <p className="font-display text-[16px] font-light text-muted-foreground tracking-tight">
          'Til Death
          <span
            className="semicolon-breathe text-[hsl(var(--vow-yellow))]"
            style={{ animation: "semicolon-breathe 4s ease-in-out infinite" }}
          >;</span>
          {" "}Unto Life
          <span className="text-[hsl(var(--vow-yellow))]">.</span>
        </p>
      </footer>
    </div>
  );
}
