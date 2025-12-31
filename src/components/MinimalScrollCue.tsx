import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MinimalScrollCue() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after covenant complete (extended timing)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 9000);

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
        "absolute bottom-[var(--hero-space-bottom,48px)] right-[var(--hero-space-edge,24px)] md:right-[var(--hero-space-edge,48px)] z-20 flex flex-col items-center gap-2 transition-opacity duration-500",
        isVisible && !hasScrolled ? "opacity-100" : "opacity-0",
        hasScrolled && "pointer-events-none"
      )}
      style={{
        animation: isVisible && !hasScrolled ? "breathe-scroll 4s ease-in-out infinite" : undefined,
      }}
    >
      {/* Vertical Line */}
      <div 
        className="w-[1px] h-5"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(var(--vow-yellow) / 0.5))"
        }}
      />
      
      {/* Chevron Only - Maximum Restraint */}
      <ChevronDown 
        size={14} 
        className="text-[hsl(var(--vow-yellow))]" 
        strokeWidth={1.5}
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}
