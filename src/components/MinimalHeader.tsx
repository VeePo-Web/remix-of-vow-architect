import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FullScreenMenu } from "./FullScreenMenu";

export function MinimalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show full nav after scrolling past hero (100vh)
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
        style={{ height: isScrolled ? "64px" : "auto" }}
      >
        <div className="flex items-center justify-between h-full px-8 py-8">
          {/* Logo - Top Left */}
          <a 
            href="/"
            className="font-display text-lg tracking-wide text-foreground opacity-0 animate-fade-in hover:text-accent transition-colors duration-300"
            style={{ 
              animationDelay: "5500ms",
              animationFillMode: "forwards"
            }}
          >
            Parker Allard
          </a>

          {/* Navigation Links - Reveal on Scroll */}
          {isScrolled && (
            <nav className="hidden md:flex items-center gap-8 opacity-0 animate-fade-in">
              <a href="/pricing" className="nav-link">Pricing</a>
              <a href="/banff-mode" className="nav-link">Banff Mode™</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/proof" className="nav-link">Proof</a>
              <a href="/faq" className="nav-link">FAQ</a>
              <a href="/contact" className="nav-link nav-link--cta">Hold My Date</a>
            </nav>
          )}

          {/* Menu Button - Top Right */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 opacity-0 animate-fade-in group"
            style={{ 
              animationDelay: "5700ms",
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
