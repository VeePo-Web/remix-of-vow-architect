import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useEffect } from "react";
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
  useEffect(() => {
    document.title = "Parker Gawryletz — Ceremony Pianist";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Wedding pianist, private event performer, and piano mentor. Choose the path that fits your moment.");
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center py-8 md:py-0 md:justify-center relative" style={{ background: "hsl(var(--rich-black))" }} aria-label="Choose your path" data-theme="death">
      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.10] pointer-events-none" aria-hidden="true" />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black) / 0.6) 80%, hsl(var(--rich-black)) 100%)" }}
        aria-hidden="true"
      />

      {/* Warm center fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      {/* Wordmark */}
      <header className="text-center mb-6 md:mb-14 shrink-0 opacity-0 animate-fade-in relative z-10" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <h1 className="font-display text-[28px] font-light tracking-tight" style={{ color: "hsl(0 0% 100% / 0.9)" }}>
          Parker Gawryletz
        </h1>
        <p
          className="font-sans text-[11px] uppercase tracking-[0.22em] mt-1.5 opacity-0 animate-fade-in"
          style={{ color: "hsl(0 0% 100% / 0.45)", animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          Ceremony Pianist
        </p>
        {/* Golden thread separator */}
        <div
          className="mx-auto mt-5 opacity-0 animate-fade-in"
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
            boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.08)",
            animationDelay: "800ms",
            animationFillMode: "forwards",
          }}
          aria-hidden="true"
        />
      </header>

      {/* Bento Cards */}
      <div className="relative flex flex-col md:flex-row gap-3 md:gap-6 px-6 max-w-5xl w-full flex-1 md:flex-initial min-h-0 z-10">
        {services.map((s) => {
          const inner = (
            <>
              <CardImage image={s.image} available={s.available} />
              {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: s.available
                      ? 'linear-gradient(to top, hsl(var(--rich-black) / 0.7) 0%, hsl(var(--rich-black) / 0.3) 40%, hsl(var(--rich-black) / 0.1) 100%)'
                      : 'linear-gradient(to top, hsl(var(--rich-black) / 0.85) 0%, hsl(var(--rich-black) / 0.5) 40%, hsl(var(--rich-black) / 0.3) 100%)',
                  }}
                  aria-hidden="true"
              />
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                <h2
                  className="font-display tracking-tight"
                  style={{
                    fontSize: s.available ? "30px" : "28px",
                    fontWeight: s.available ? 400 : 300,
                    color: s.available ? "hsl(0 0% 100% / 0.9)" : "hsl(0 0% 100% / 0.5)",
                  }}
                >
                  {s.title}
                </h2>
                <p className="font-sans text-[14px] mt-2 leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
                  {s.description}
                </p>
                <span
                  className="mt-3 font-sans text-[12px] uppercase tracking-[0.18em] inline-flex items-center gap-1.5"
                  style={{ color: s.available ? "hsl(var(--vow-yellow))" : "hsl(0 0% 100% / 0.25)" }}
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
            "transition-all duration-300 opacity-0 animate-fade-in",
            s.available
              ? "cursor-pointer hover:-translate-y-2 hover:scale-[1.015]"
              : "cursor-default"
          );

          const cardBorder = s.available
            ? "1px solid hsl(var(--vow-yellow) / 0.08)"
            : "1px solid hsl(0 0% 100% / 0.06)";

          const style = {
            animationDelay: `${s.delay}ms`,
            animationFillMode: "forwards" as const,
            border: cardBorder,
          };

          return s.available ? (
            <Link
              key={s.title}
              to={s.href}
              className={cn(cardClasses, "md:flex-1 gateway-card")}
              style={style}
            >
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
        .gateway-card:hover {
          border-color: hsl(var(--vow-yellow) / 0.18) !important;
          box-shadow: 0 8px 40px hsl(var(--vow-yellow) / 0.06), 0 0 60px hsl(var(--vow-yellow) / 0.03);
        }
        @media (prefers-reduced-motion: reduce) {
          .semicolon-breathe,
          [style*="gateway-vignette-breathe"] { animation: none !important; }
          .animate-fade-in { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Footer tagline */}
      <footer
        className="mt-6 md:mt-14 shrink-0 text-center opacity-0 animate-fade-in"
        style={{ animationDelay: "1600ms", animationFillMode: "forwards" }}
      >
        <p className="font-display text-[16px] font-light tracking-tight" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
          'Til Death
          <span className="relative inline-block">
            {/* Breathing halo behind semicolon */}
            <span
              className="absolute inset-0 -inset-x-3 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.25) 0%, transparent 70%)",
                animation: "semicolon-breathe 4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <span
              className="relative semicolon-breathe"
              style={{ color: "hsl(var(--vow-yellow))", animation: "semicolon-breathe 4s ease-in-out infinite" }}
            >
              {" ; "}
            </span>
          </span>
          Unto Life<span style={{ color: "hsl(var(--vow-yellow))" }}>.</span>
        </p>
      </footer>

    </main>
  );
}
