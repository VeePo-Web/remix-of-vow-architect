import { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";
import { cn } from "@/lib/utils";
import soundKeys from "@/assets/sound-keys.jpg";

interface TrackCardProps {
  title: string;
  context: string;
}

const tracks: TrackCardProps[] = [
  { title: "Canon in D (reimagined)", context: "Processional" },
  { title: "A Thousand Years", context: "Bride's Entrance" },
  { title: "Married Life", context: "Signing" },
  { title: "At Last", context: "Recession" },
];

export function TheSound() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section--dark section-grain relative min-h-[400px] py-24 md:py-32 overflow-hidden"
      style={{ minHeight: '400px' }}
      aria-labelledby="sound-heading"
    >
      {/* Top fade from TheInvitation warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
        aria-hidden="true"
      />

      {/* Background image layer */}
      <img
        src={soundKeys}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none"
        loading="lazy"
        aria-hidden="true"
      />
      {/* Subtle radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <span
            className={cn(
              "inline-block text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            The Sound
          </span>

          {/* Headline — text-balance prevents orphans */}
          <h2
            id="sound-heading"
            className={cn(
              "text-[clamp(28px,4vw,42px)] font-display font-light leading-tight text-foreground mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any }}
          >
            Music that holds the room still.
          </h2>

          {/* Subhead */}
          <p
            className={cn(
              "text-lg font-display font-light italic text-muted-foreground mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            These are real ceremony moments—prelude, processional, vows, recession.
          </p>

          {/* Minimal coming-soon note */}
          <p
            className={cn(
              "text-xs uppercase tracking-[0.2em] text-muted-foreground/50 mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
          >
            Samples arriving soon
          </p>

          {/* Track Cards */}
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            role="list"
            aria-label="Sample ceremony tracks"
          >
            {tracks.map((track, index) => (
              <div
                key={track.title}
                className="sound-track-card relative bg-card/20 border border-border/20 rounded-lg p-4 text-left transition-all duration-300"
                role="listitem"
                style={{ transitionDelay: isVisible ? `${600 + index * 50}ms` : "0ms" }}
              >
                {/* Golden bullet */}
                <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-vow-yellow/60" aria-hidden="true" />
                
              <div className="pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Music className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider text-vow-yellow/80">
                      {track.context}
                    </span>
                  </div>
                  <p className="text-sm font-display text-foreground/90">
                    {track.title}
                  </p>
                </div>

                {/* Left accent border */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-opacity duration-300"
                  style={{ background: 'hsl(var(--vow-yellow) / 0.25)' }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Closing Caption */}
          <p
            className={cn(
              "text-sm text-muted-foreground max-w-lg mx-auto transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
          >
            Every arrangement crafted specifically for the couple. 
            No two ceremonies sound alike.
          </p>
        </div>
      </div>
    </section>
  );
}
