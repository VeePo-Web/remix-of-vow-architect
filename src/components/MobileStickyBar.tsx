import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const pageConfig: Record<string, string> = {
  "/": "I would be honored to be there",
  "/weddings": "I would be honored to be there",
  "/services": "Find the right presence",
  "/about": "The witness behind the keys",
  "/gallery": "500+ events performed",
  "/faq": "Every question, answered",
  "/listen": "Hear what your ceremony could sound like",
};

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Hide entirely on contact page
  const isContact = location.pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(window.scrollY / docHeight, 1));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isContact) return null;

  const leftText = pageConfig[location.pathname] || "I would be honored to be there";

  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md overflow-hidden transition-transform duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background: "hsl(var(--rich-black) / 0.95)",
        borderTop: "1px solid hsl(var(--vow-yellow) / 0.15)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Golden scroll progress thread */}
      <div
        className="absolute top-0 left-0 h-[2px] pointer-events-none"
        style={{
          width: `${scrollProgress * 100}%`,
          background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow)))",
          transition: "width 100ms linear",
        }}
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-3 p-3">
        <span className="text-sm font-display text-muted-foreground">
          {leftText}
        </span>
        <div className="relative">
          <div
            className="absolute inset-0 -inset-x-6 -inset-y-3 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <Link to="/contact" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
            <Button size="sm" variant="primary-dark" className="relative hover-scale cta-breathe-glow">
              Hold my date
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
