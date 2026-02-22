import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FullScreenMenu } from "./FullScreenMenu";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export function MinimalHeader() {
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled && "bg-[rgba(10,10,12,0.92)] backdrop-blur-md border-b border-border/20"
        )}
        style={{ height: isScrolled ? "56px" : "auto" }}
      >
        <div className="flex items-center justify-between h-full px-[var(--hero-space-edge,24px)] md:px-[var(--hero-space-edge,48px)] py-6">
          {/* Logo - Top Left */}
          <Link 
            to="/"
            className="font-display text-base tracking-wide text-foreground opacity-0 animate-fade-in hover:text-accent transition-colors duration-300"
            style={{ 
              animationDelay: "6200ms",
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
                  className="nav-link opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="nav-link nav-link--cta opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${navLinks.length * 60}ms`,
                  animationFillMode: "forwards",
                }}
              >
                Hold My Date
              </Link>
            </nav>
          )}

          {/* Menu Button - Top Right */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 opacity-0 animate-fade-in group"
            style={{ 
              animationDelay: "6200ms",
              animationFillMode: "forwards"
            }}
            aria-label="Open menu"
          >
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground group-hover:text-accent transition-colors duration-300">
              Menu
            </span>
            <Menu size={20} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
