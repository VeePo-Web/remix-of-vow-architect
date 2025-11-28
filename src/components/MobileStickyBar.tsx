import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 animate-fade-in motion-reduce:animate-none">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
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
