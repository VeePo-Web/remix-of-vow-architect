import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useEffect } from "react";
import AmbientAudioPill from "@/components/AmbientAudioPill";
import { usePageTheme } from "@/hooks/usePageTheme";
import weddingsImg from "@/assets/gateway-weddings.jpg";
import teachingImg from "@/assets/gateway-teaching.jpg";
import eventsImg from "@/assets/gateway-events.jpg";

const services = [
  {
    title: "Weddings",
    description: "I carry every vow so it lands where it belongs",
    image: weddingsImg,
    href: "/weddings",
    available: true,
    delay: 1000,
  },
  {
    title: "Teaching",
    description: "Learn the instrument that speaks when words fall short",
    image: teachingImg,
    href: "/teaching",
    available: true,
    delay: 1200,
  },
  {
    title: "Events",
    description: "Live piano for moments that demand presence",
    image: eventsImg,
    href: "/events",
    available: true,
    delay: 1400,
  },
];

function CardImage({ image, available }: { image: string; available: boolean }) {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
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
        className={cn(
          "absolute -inset-2 bg-cover bg-center transition-opacity duration-500",
          available
            ? "opacity-[0.35] group-hover:opacity-[0.45]"
            : "opacity-[0.20]"
        )}
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}

export default function Gateway() {
  usePageTheme();
  useEffect(() => { document.title = "Parker Gawryletz — Sound Director"; }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[hsl(var(--rich-black))] flex flex-col items-center py-8 md:py-0 md:justify-center relative" role="main" aria-label="Choose your path">
      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.10] pointer-events-none" aria-hidden="true" />
      {/* Breathing warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 70%)",
          animation: "gateway-vignette-breathe 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

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
          style={{ animationDelay: "1600ms", animationFillMode: "forwards" }}
          aria-hidden="true"
        />
        {services.map((s) => {
          const inner = (
            <>
              <CardImage image={s.image} available={s.available} />
              {/* Gradient overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t transition-all duration-500",
                  s.available
                    ? "from-black/70 via-black/30 to-black/10 group-hover:from-black/60"
                    : "from-black/85 via-black/50 to-black/30"
                )}
                aria-hidden="true"
              />
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                <h2 className={cn(
                  "font-display tracking-tight",
                  s.available
                    ? "text-[30px] font-normal text-foreground"
                    : "text-[28px] font-light text-foreground/70"
                )}>
                  {s.title}
                </h2>
                <p className="font-sans text-[14px] text-muted-foreground mt-2 leading-relaxed">
                  {s.description}
                </p>
                <span
                  className={cn(
                    "mt-3 font-sans text-[12px] uppercase tracking-[0.18em] inline-flex items-center gap-1.5",
                    s.available
                      ? "text-[hsl(var(--vow-yellow))]"
                      : "text-muted-foreground/50"
                  )}
                >
                  {s.available ? "Step Inside" : "Coming Soon"}
                  {s.available && (
                    <span className="inline-block opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[180ms] ease-out">
                      →
                    </span>
                  )}
                </span>
              </div>
            </>
          );

          const cardClasses = cn(
            "group relative overflow-hidden rounded-2xl flex-1 min-h-0 md:flex-none md:aspect-[6/7]",
            s.available ? "border border-[hsl(var(--vow-yellow)/0.08)]" : "border border-white/[0.06]",
            "transition-all duration-300 opacity-0 animate-fade-in",
            s.available
              ? "cursor-pointer hover:-translate-y-2 hover:scale-[1.015] hover:border-[hsl(var(--vow-yellow)/0.25)] hover:shadow-[0_16px_48px_hsl(var(--vow-yellow)/0.08)]"
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

      {/* Keyframes */}
      <style>{`
        @keyframes semicolon-breathe {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4); }
          50% { text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.7); }
        }
        @keyframes gateway-vignette-breathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .semicolon-breathe { animation: none !important; }
        }
      `}</style>

      {/* Footer tagline */}
      <footer
        className="mt-6 md:mt-14 shrink-0 text-center opacity-0 animate-fade-in"
        style={{ animationDelay: "1600ms", animationFillMode: "forwards" }}
      >
        <p className="font-display text-[16px] font-light text-muted-foreground tracking-tight">
          'Til Death
          <span
            className="semicolon-breathe text-[hsl(var(--vow-yellow))]"
            style={{ animation: "semicolon-breathe 4s ease-in-out infinite" }}
          >
            {" ; "}
          </span>
          Unto Life<span className="text-[hsl(var(--vow-yellow))]">.</span>
        </p>
      </footer>

      <AmbientAudioPill />
    </div>
  );
}
