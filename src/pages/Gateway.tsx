import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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

export default function Gateway() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[hsl(var(--rich-black))] flex flex-col items-center justify-center relative">
      {/* Film grain */}
      <div className="absolute inset-0 grain opacity-[0.10] pointer-events-none" aria-hidden="true" />

      {/* Wordmark */}
      <header className="text-center mb-10 md:mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
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
      <div className="flex flex-col md:flex-row gap-5 md:gap-6 px-6 max-w-5xl w-full">
        {services.map((s) => {
          const inner = (
            <>
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-[0.30] group-hover:opacity-[0.40]"
                style={{ backgroundImage: `url(${s.image})` }}
                aria-hidden="true"
              />
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
                    "mt-4 font-sans text-[12px] uppercase tracking-[0.18em]",
                    s.available
                      ? "text-[hsl(var(--vow-yellow))]"
                      : "text-muted-foreground/50"
                  )}
                >
                  {s.available ? "Enter" : "Coming Soon"}
                </span>
              </div>
            </>
          );

          const cardClasses = cn(
            "group relative overflow-hidden rounded-2xl border border-white/10 aspect-[3/4] md:aspect-[3/4]",
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
            <Link key={s.title} to={s.href} className={cn(cardClasses, "flex-1")} style={style}>
              {inner}
            </Link>
          ) : (
            <div key={s.title} className={cn(cardClasses, "flex-1")} style={style}>
              {inner}
            </div>
          );
        })}
      </div>

      {/* Footer tagline */}
      <footer
        className="mt-10 md:mt-14 text-center opacity-0 animate-fade-in"
        style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
      >
        <p className="font-display text-[16px] font-light text-muted-foreground tracking-tight">
          'Til Death
          <span className="text-[hsl(var(--vow-yellow))]" style={{ textShadow: "0 0 20px hsl(var(--vow-yellow) / 0.4)" }}>;</span>
          {" "}Unto Life
          <span className="text-[hsl(var(--vow-yellow))]">.</span>
        </p>
      </footer>
    </div>
  );
}
