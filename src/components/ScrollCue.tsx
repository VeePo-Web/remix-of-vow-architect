import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ScrollCueProps {
  isVisible?: boolean;
}

/**
 * Scroll Cue — Breathing Scroll Indicator
 * - Subtle chevron + "scroll to begin" text
 * - Breathe animation (4s loop)
 * - Fades out after first scroll
 */
export function ScrollCue({ isVisible = false }: ScrollCueProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 text-muted-foreground transition-opacity duration-500",
        isVisible && !hasScrolled ? "opacity-100" : "opacity-0",
        hasScrolled && "pointer-events-none"
      )}
      style={{
        animation: isVisible && !hasScrolled ? "breathe-scroll 4s ease-in-out infinite" : undefined,
      }}
    >
      <span className="text-xs uppercase tracking-[0.22em] font-sans">Scroll to begin</span>
      <ChevronDown size={20} strokeWidth={1.5} />
    </div>
  );
}
