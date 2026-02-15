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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md p-3 animate-fade-in motion-reduce:animate-none"
      style={{
        background: "hsl(var(--rich-black) / 0.95)",
        borderTop: "1px solid hsl(var(--vow-yellow) / 0.15)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-display text-muted-foreground">
          Dates fill quickly—check yours
        </span>
        <Link to="/contact">
          <Button size="sm" className="hover-scale">
            Check Availability
          </Button>
        </Link>
      </div>
    </div>
  );
}
