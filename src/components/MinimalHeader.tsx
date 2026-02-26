import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FullScreenMenu } from "./FullScreenMenu";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Case Studies" },
];

export function MinimalHeader() {
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';
  const headerDelay = hasPlayed ? '0ms' : '6200ms';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-[260ms]",
          isScrolled && "backdrop-blur-md"
        )}
        style={{ 
          height: isScrolled ? "56px" : "auto",
          background: isScrolled ? "rgba(10,10,12,0.92)" : undefined,
        }}
      >
        {/* Golden gradient thread at bottom (replaces hard border) */}
        {isScrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.12), transparent)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="flex items-center justify-between h-full px-[var(--hero-space-edge,24px)] md:px-[var(--hero-space-edge,48px)] py-6">
          {/* Logo - Top Left */}
          <Link 
            to="/"
            className="font-display text-base tracking-wide text-foreground opacity-0 animate-fade-in hover:text-primary transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            style={{ 
              animationDelay: headerDelay,
              animationFillMode: "forwards"
            }}
          >
            Parker Gawryletz
          </Link>

          {/* Navigation Links - Staggered Reveal on Scroll */}
          {isScrolled && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link opacity-0 animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <span className="relative opacity-0 animate-fade-in" style={{ animationDelay: `${navLinks.length * 60}ms`, animationFillMode: "forwards" }}>
                {/* Subtle ambient glow behind CTA */}
                <span
                  className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.06) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <Link
                  to="/contact"
                  className="relative nav-link nav-link--cta transition-all duration-[180ms] hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  Hold My Date
                </Link>
              </span>
            </nav>
          )}

          {/* Menu Button - Top Right */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 opacity-0 animate-fade-in group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            style={{ 
              animationDelay: headerDelay,
              animationFillMode: "forwards"
            }}
            aria-label="Open menu"
          >
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground group-hover:text-primary transition-colors duration-[180ms]">
              Menu
            </span>
            <Menu size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-[180ms]" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
