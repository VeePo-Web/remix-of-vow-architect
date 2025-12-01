import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MinimalScrollCue() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after tagline animation completes
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute bottom-12 md:bottom-16 right-8 md:right-12 z-20 flex flex-col items-center gap-3 transition-opacity duration-500",
        isVisible && !hasScrolled ? "opacity-100" : "opacity-0",
        hasScrolled && "pointer-events-none"
      )}
      style={{
        animation: isVisible && !hasScrolled ? "breathe-scroll 4s ease-in-out infinite" : undefined,
      }}
    >
      {/* Vertical Line */}
      <div 
        className="w-[1px] h-6"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(var(--vow-yellow) / 0.6))"
        }}
      />
      
      {/* Chevron */}
      <ChevronDown 
        size={16} 
        className="text-[hsl(var(--vow-yellow))]" 
        strokeWidth={1.5}
        style={{ opacity: 0.6 }}
      />
      
      {/* Text */}
      <span 
        className="text-[10px] font-sans uppercase tracking-[0.26em] text-muted-foreground"
        style={{ opacity: 0.5 }}
      >
        scroll
      </span>
    </div>
  );
}
