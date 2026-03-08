import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MinimalScrollCue() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('vigil-complete') === 'true';
    const delay = hasPlayed ? 800 : 7500;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute bottom-[var(--hero-space-bottom,64px)] z-20",
        // Mobile: centered. Desktop: bottom-right
        "left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[var(--hero-space-edge,48px)]",
        "flex flex-col items-center gap-2 transition-opacity duration-500",
        isVisible && !hasScrolled ? "opacity-100" : "opacity-0",
        hasScrolled && "pointer-events-none"
      )}
      style={{
        animation: isVisible && !hasScrolled ? "breathe-scroll 4s ease-in-out infinite" : undefined,
      }}
      aria-label="Scroll to explore"
      role="presentation"
    >
      {/* Vertical Line */}
      <div 
        className="w-[1px] h-5"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(var(--vow-yellow) / 0.5))"
        }}
      />
      
      {/* Chevron Only */}
      <ChevronDown 
        size={14} 
        className="text-primary" 
        strokeWidth={1.5}
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}
