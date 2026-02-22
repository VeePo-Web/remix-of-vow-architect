import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import soundKeys from "@/assets/sound-keys.jpg";
import { AudioPlayer } from "./AudioPlayer";

const tracks = [
  { title: "Canon in D (reimagined)", context: "Processional", src: "/audio/canon-in-d.mp3" },
  { title: "A Thousand Years", context: "Bride's Entrance", src: "/audio/a-thousand-years.mp3" },
  { title: "Married Life", context: "Signing", src: "/audio/married-life.mp3" },
  { title: "At Last", context: "Recession", src: "/audio/at-last.mp3" },
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

          {/* Headline */}
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
            The prelude. The procession. The vows. The walk into forever.
          </p>

          {/* Interactive Audio Player */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
          >
            <AudioPlayer tracks={tracks} />
          </div>

          {/* Closing Caption */}
          <p
            className={cn(
              "text-sm text-muted-foreground max-w-lg mx-auto transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
          >
            Every arrangement begins with a conversation—and ends with a sound that belongs only to you.
          </p>
        </div>
      </div>
    </section>
  );
}
