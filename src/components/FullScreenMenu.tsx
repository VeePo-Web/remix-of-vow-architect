import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "Home", href: "/weddings" },
  { number: "02", label: "Pricing", href: "/services" },
  { number: "03", label: "About", href: "/about" },
  { number: "04", label: "Proof", href: "/gallery" },
  { number: "05", label: "FAQ", href: "/faq" },
  { number: "06", label: "Listen", href: "/listen" },
  { number: "07", label: "Contact", href: "/contact" },
];

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset hover on close
  useEffect(() => {
    if (!isOpen) setHoveredIndex(null);
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", trap);
    first.focus();
    return () => window.removeEventListener("keydown", trap);
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed inset-0 z-[100] transition-opacity duration-[260ms]",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      style={{ background: "hsl(var(--vigil-void))" }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
    >
      {/* Atmospheric layers */}
      <div className="grain opacity-[0.06] pointer-events-none" style={{ willChange: "opacity" }} aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 2%) 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 40%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      {/* Close Button — aligned with header menu button */}
      <div className="fixed top-0 right-0 z-10 px-[var(--hero-space-edge,24px)] md:px-[var(--hero-space-edge,48px)] py-6">
        <button
          onClick={onClose}
          className={cn(
            "flex items-center gap-2 group transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
            isOpen ? "opacity-100 delay-300" : "opacity-0"
          )}
          aria-label="Close menu"
        >
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground group-hover:text-primary transition-colors duration-[180ms]">
            Close
          </span>
          <X size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-[180ms]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Menu Content */}
      <div className="flex flex-col justify-center items-start min-h-screen px-8 md:px-16 lg:px-24">
        <nav
          className="space-y-6 md:space-y-8"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <Link
                key={item.number}
                to={item.href}
                className={cn(
                  "flex items-baseline gap-6 group transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm",
                  isOpen ? "translate-y-0" : "translate-y-4",
                  isOpen ? (isDimmed ? "opacity-[0.3]" : "opacity-100") : "opacity-0"
                )}
                style={{
                  transitionDelay: isOpen ? `${300 + index * 50}ms` : "0ms",
                }}
                onClick={onClose}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Golden dash for active page */}
                <span
                  className={cn(
                    "w-4 h-[1px] transition-all duration-[260ms] self-center",
                    isActive ? "opacity-100" : "opacity-0 w-0"
                  )}
                  style={{ background: "hsl(var(--vow-yellow) / 0.5)" }}
                  aria-hidden="true"
                />
                <span className={cn(
                  "text-xs font-sans min-w-[2ch] transition-colors duration-[180ms]",
                  isActive
                    ? "text-primary/60"
                    : "text-muted-foreground/50 group-hover:text-primary/30"
                )}>
                  {item.number}
                </span>
                <span className={cn(
                  "font-display text-4xl md:text-5xl lg:text-6xl transition-colors duration-[180ms]",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/80 group-hover:text-primary"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Golden thread separator */}
        <div
          className={cn(
            "mt-12 h-[1px] w-12 transition-all duration-300",
            isOpen ? "opacity-100 delay-700" : "opacity-0"
          )}
          style={{
            background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), transparent)",
            boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.08)",
          }}
          aria-hidden="true"
        />

        {/* Contact Info */}
        <div
          className={cn(
            "mt-6 space-y-2 text-sm text-muted-foreground transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-4"
          )}
        >
          <p>Calgary, Cochrane, Canmore &amp; Okotoks</p>
          <p>
            <a href="mailto:parker@parkergawryletz.com" className="hover:text-primary transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
              parker@parkergawryletz.com
            </a>
          </p>
        </div>

        {/* Brand Covenant Bookend */}
        <div
          className={cn(
            "mt-10 transition-all duration-300",
            isOpen ? "opacity-100 delay-[800ms]" : "opacity-0"
          )}
        >
          {/* Golden anchor dot */}
          <div
            className="w-1 h-1 rounded-full mx-auto mb-4"
            style={{ background: "hsl(var(--vow-yellow) / 0.3)" }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-foreground/20">
            'Til Death<span className="text-primary/40"> ; </span>Unto Life.
          </p>
        </div>
      </div>
    </div>
  );
}
