import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FullScreenMenu } from "./FullScreenMenu";

const navLinks = [
  { to: "/services", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Proof" },
];

export function MinimalHeader() {
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';
  const headerDelay = hasPlayed ? '0ms' : '6200ms';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [wasScrolled, setWasScrolled] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight;
      setIsScrolled(scrolled);
      if (scrolled) setWasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset wasScrolled when transitioning back to not scrolled
  useEffect(() => {
    if (!isScrolled) {
      const timer = setTimeout(() => setWasScrolled(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isScrolled]);

  // Footer proximity detection via IntersectionObserver
  useEffect(() => {
    const bookend = document.querySelector('[data-footer-bookend]');
    if (!bookend) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsAtFooter(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(bookend);
    return () => observer.disconnect();
  }, []);

  const isArrival = isAtFooter && isScrolled;

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
        {/* Golden gradient thread at bottom — fades in over 450ms */}
        {isScrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none animate-fade-in"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.25' : '0.12'}), transparent)`,
              animationDuration: '450ms',
              animationFillMode: 'forwards',
            }}
            aria-hidden="true"
          />
        )}

        <div className={cn(
          "flex items-center h-full px-[var(--hero-space-edge,24px)] md:px-[var(--hero-space-edge,48px)] py-6 relative",
          isArrival ? "justify-center" : "justify-between"
        )}>
          {/* Logo — centers during arrival */}
          <NavLink 
            to="/"
            className={cn(
              "relative font-display text-base tracking-wide text-foreground opacity-0 animate-fade-in hover:text-primary transition-all duration-[260ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
            )}
            style={{ 
              animationDelay: headerDelay,
              animationFillMode: "forwards"
            }}
          >
            Parker Gawryletz
            {/* Vow-yellow underline draw — only during arrival */}
            <span
              className={cn(
                "absolute -bottom-1 left-0 w-full h-[1px] origin-center transition-transform duration-[450ms]",
                isArrival ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
              aria-hidden="true"
            />
          </NavLink>

          {/* Navigation Links — fade out during arrival */}
          {isScrolled && (
            <nav
              className={cn(
                "hidden md:flex items-center gap-8 transition-all duration-[260ms]",
                isArrival && "opacity-0 w-0 overflow-hidden pointer-events-none"
              )}
            >
              {navLinks.map((link, i) => {
                // Reverse stagger on fade-out
                const reverseI = navLinks.length - 1 - i;
                const delay = wasScrolled && !isScrolled
                  ? `${reverseI * 80}ms`
                  : `${i * 80}ms`;

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => cn(
                      "relative nav-link opacity-0 animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                      isActive && "text-foreground"
                    )}
                    style={{
                      animationDelay: delay,
                      animationFillMode: "forwards",
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {/* Vow-yellow underline — draws from center when active */}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 w-full h-[1px] origin-center transition-transform duration-[450ms]",
                            isActive ? "scale-x-100" : "scale-x-0"
                          )}
                          style={{
                            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                            transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                          }}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
              <span
                className="relative opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${navLinks.length * 80}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <span
                  className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-full pointer-events-none"
                  style={{
                    background: isContactPage
                      ? 'none'
                      : 'radial-gradient(ellipse at center, hsl(45 100% 76% / 0.06) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <NavLink
                  to="/contact"
                  className={cn(
                    "relative nav-link transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                    isContactPage
                      ? "text-foreground/50 cursor-default"
                      : "nav-link--cta hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)]"
                  )}
                >
                  {isContactPage ? "You're here" : "Hold My Date"}
                </NavLink>
              </span>
            </nav>
          )}

          {/* Menu Button — always visible, absolute-positioned during arrival */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              "flex items-center gap-2 opacity-0 animate-fade-in group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm transition-all duration-[260ms]",
              isArrival && "absolute right-[var(--hero-space-edge,24px)] md:right-[var(--hero-space-edge,48px)] top-1/2 -translate-y-1/2"
            )}
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
