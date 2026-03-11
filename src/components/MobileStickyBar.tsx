import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

// Vertical-aware page config with correct contact routing
function getPageConfig(pathname: string) {
  const isEvents = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');
  
  const contactHref = isEvents ? '/events/contact'
    : isTeaching ? '/teaching/contact'
    : '/contact';

  // Default config for weddings vertical
  let config = { text: "I would be honored to be there", cta: "Hold my date", contactHref };

  // Gateway
  if (pathname === '/') {
    config = { text: "Three paths, one pianist", cta: "Start a conversation", contactHref: '/contact' };
  }
  // Teaching vertical
  else if (isTeaching) {
    config = { text: "Begin the conversation", cta: "Begin the conversation", contactHref };
  }
  // Events vertical
  else if (isEvents) {
    config = { text: "Discuss your event", cta: "Discuss your event", contactHref };
  }
  // Weddings-specific pages
  else if (pathname === '/pricing') {
    config = { ...config, text: "Find the right presence" };
  }
  else if (pathname === '/about') {
    config = { ...config, text: "The witness behind the keys" };
  }
  else if (pathname === '/proof') {
    config = { ...config, text: "500+ ceremonies performed" };
  }
  else if (pathname === '/faq') {
    config = { ...config, text: "Every question, answered" };
  }
  else if (pathname === '/listen') {
    config = { ...config, text: "Hear what your ceremony could sound like" };
  }

  return config;
}

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFooterCtaVisible, setIsFooterCtaVisible] = useState(false);
  const location = useLocation();

  // Hide entirely on contact pages
  const isContact = location.pathname.includes('/contact');

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

  // Fade out when footer CTA becomes visible
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

  const config = getPageConfig(location.pathname);

  return (
    <nav
      aria-label="Quick contact"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md overflow-hidden transition-all duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        isVisible && !isFooterCtaVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      data-theme="death"
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
          {config.text}
        </span>
        <div className="relative">
          <div
            className="absolute inset-0 -inset-x-6 -inset-y-3 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <Button size="sm" variant="primary-dark" className="relative hover-scale cta-breathe-glow" asChild>
            <Link to={config.contactHref}>
              {config.cta}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
