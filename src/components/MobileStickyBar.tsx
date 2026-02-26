import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md p-3 animate-fade-in motion-reduce:animate-none overflow-hidden"
      style={{
        background: "hsl(var(--rich-black) / 0.95)",
        borderTop: "1px solid hsl(var(--vow-yellow) / 0.15)",
      }}
    >
      {/* Grain overlay */}
      <div className="grain opacity-[0.04] pointer-events-none" style={{ willChange: "opacity" }} aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-3">
        <span className="text-sm font-display text-muted-foreground">
          I would be honored to be there
        </span>
        <Link to="/contact" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
          <Button size="sm" className="hover-scale">
            Hold my date
          </Button>
        </Link>
      </div>
    </div>
  );
}
