import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const pageConfig: Record<string, { text: string; cta: string }> = {
  "/": { text: "Three paths, one pianist", cta: "Start a conversation" },
  "/weddings": { text: "I would be honored to be there", cta: "Hold my date" },
  "/teaching": { text: "Begin the conversation", cta: "Begin the conversation" },
  "/events": { text: "Discuss your event", cta: "Discuss your event" },
  "/services": { text: "Find the right presence", cta: "Hold my date" },
  "/about": { text: "The witness behind the keys", cta: "Hold my date" },
  "/gallery": { text: "500+ ceremonies performed", cta: "Hold my date" },
  "/faq": { text: "Every question, answered", cta: "Hold my date" },
  "/listen": { text: "Hear what your ceremony could sound like", cta: "Hold my date" },
};

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFooterCtaVisible, setIsFooterCtaVisible] = useState(false);
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

  // Fade out when footer CTA becomes visible — avoid duplicate CTAs
  useEffect(() => {
    const bookend = document.querySelector('[data-footer-bookend]');
    if (!bookend) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterCtaVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(bookend);
    return () => observer.disconnect();
  }, []);

  if (isContact) return null;

  const leftText = pageConfig[location.pathname] || "I would be honored to be there";

  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md overflow-hidden transition-all duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        isVisible && !isFooterCtaVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
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
