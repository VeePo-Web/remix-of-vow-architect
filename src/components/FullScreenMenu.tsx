import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { usePageTransition } from "@/hooks/usePageTransition";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "Weddings", href: "/weddings" },
  { number: "02", label: "Teaching", href: "/teaching" },
  { number: "03", label: "Events", href: "/events" },
  { number: "04", label: "Services", href: "/pricing" },
  { number: "05", label: "About", href: "/about" },
  { number: "06", label: "Proof", href: "/proof" },
  { number: "07", label: "FAQ", href: "/faq" },
  { number: "08", label: "Listen", href: "/listen" },
  { number: "09", label: "Contact", href: "/contact" },
];

/**
 * FullScreenMenu — "The Score"
 * 
 * A bespoke piano-themed navigation overlay that feels like opening
 * a musical score. Each menu item is a "key" — white and black keys
 * alternate, with tactile hover depression and golden thread connections.
 * 
 * The overlay is the vigil space — dark, sacred, reverent — mirroring
 * the Death side of the brand dichotomy. Opening it is an inhale;
 * closing it is an exhale.
 */
export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const lenis = useSmoothScroll();
  const { navigateWithTransition } = usePageTransition();

  // Stop/start Lenis when menu opens/closes
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isOpen, lenis]);

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

  // Reset hover/press on close
  useEffect(() => {
    if (!isOpen) {
      setHoveredIndex(null);
      setPressedIndex(null);
    }
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

  const handleItemClick = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setPressedIndex(index);
    const targetPath = menuItems[index].href;
    // Tactile delay — feel the key depress, then transition gracefully
    setTimeout(() => {
      setPressedIndex(null);
      onClose();
      if (targetPath !== location.pathname) {
        navigateWithTransition(targetPath);
      }
    }, 120);
  }, [onClose, location.pathname, navigateWithTransition]);

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
      {/* ═══════════════════════════════════════════
          ATMOSPHERIC LAYERS — The Vigil Space
          ═══════════════════════════════════════════ */}

      {/* Layer 1: Film grain — sacred texture */}
      <div
        className="grain pointer-events-none"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      />

      {/* Layer 2: Edge vignette — concentrates focus inward */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, hsl(var(--rich-black) / 0.6) 70%, hsl(var(--rich-black)) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Primary candlelight — warm pool from left where items sit */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 25% 45%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Secondary candle warmth — center glow, breathing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 35%)",
          animation: isOpen
            ? "menu-candle-breathe 6s ease-in-out infinite"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Deep charcoal fog — drifts slowly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 80%, hsl(var(--ebon-charcoal) / 0.4) 0%, transparent 45%)",
          animation: isOpen
            ? "menu-fog-drift 18s ease-in-out infinite alternate"
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════
          CLOSE BUTTON — aligned with header menu
          ═══════════════════════════════════════════ */}
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
          <X
            size={20}
            className="text-muted-foreground group-hover:text-primary transition-all duration-[180ms] group-hover:rotate-90"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          THE SCORE — Menu Items as Piano Keys
          ═══════════════════════════════════════════ */}
      <div className="flex flex-col justify-center items-start min-h-screen px-8 md:px-16 lg:px-24">

        {/* Musical staff lines — faint horizontal rules behind menu items */}
        <div
          className={cn(
            "absolute left-0 right-0 pointer-events-none transition-opacity duration-[700ms]",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          style={{ top: "50%", transform: "translateY(-50%)" }}
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="w-full h-px"
              style={{
                background: `linear-gradient(90deg, transparent 5%, hsl(var(--foreground) / ${
                  line === 2 ? 0.04 : 0.025
                }) 20%, hsl(var(--foreground) / ${
                  line === 2 ? 0.04 : 0.025
                }) 80%, transparent 95%)`,
                marginBottom: line < 4 ? "48px" : "0",
                transitionDelay: `${600 + line * 60}ms`,
              }}
            />
          ))}
        </div>

        <nav
          className="space-y-4 md:space-y-5 relative z-[2]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            const isHovered = hoveredIndex === index;
            const isPressed = pressedIndex === index;

            // Alternating "key" pattern: even = white key, odd = black key
            const isBlackKey = index % 2 === 1;

            return (
              <div key={item.number} className="relative group">
                {/* Golden connecting thread between items */}
                {index > 0 && (
                  <div
                    className={cn(
                      "absolute -top-[10px] md:-top-[10px] left-[52px] md:left-[68px] w-px h-[10px] transition-all duration-[400ms]",
                      isOpen ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      background: `linear-gradient(to bottom, hsl(var(--vow-yellow) / ${
                        isHovered || (hoveredIndex === index - 1) ? 0.25 : 0.06
                      }), hsl(var(--vow-yellow) / ${
                        isHovered || (hoveredIndex === index - 1) ? 0.25 : 0.06
                      }))`,
                      transitionDelay: `${350 + index * 50}ms`,
                      transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                    }}
                    aria-hidden="true"
                  />
                )}

                <Link
                  to={item.href}
                  className={cn(
                    "relative flex items-baseline gap-4 md:gap-6 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm",
                    isOpen ? "translate-y-0" : "translate-y-6",
                    isOpen
                      ? isDimmed
                        ? "opacity-[0.2]"
                        : "opacity-100"
                      : "opacity-0"
                  )}
                  style={{
                    transitionDuration: "260ms",
                    transitionDelay: isOpen ? `${300 + index * 60}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                  }}
                  onClick={(e) => handleItemClick(e, index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseDown={() => setPressedIndex(index)}
                  onMouseUp={() => setPressedIndex(null)}
                >
                  {/* Active indicator — golden dash */}
                  <span
                    className={cn(
                      "w-4 h-[1px] transition-all duration-[260ms] self-center flex-shrink-0",
                      isActive ? "opacity-100" : "opacity-0 w-0"
                    )}
                    style={{
                      background: "hsl(var(--vow-yellow) / 0.5)",
                      boxShadow: isActive
                        ? "0 0 6px hsl(var(--vow-yellow) / 0.15)"
                        : "none",
                    }}
                    aria-hidden="true"
                  />

                  {/* Number — muted, shifts color on hover */}
                  <span
                    className={cn(
                      "text-xs font-sans min-w-[2.5ch] tabular-nums transition-all duration-[180ms]",
                      isActive
                        ? "text-primary opacity-50"
                        : "text-muted-foreground opacity-40 group-hover:text-primary group-hover:opacity-25"
                    )}
                    style={{
                      transform: isPressed ? "translateY(1px)" : "translateY(0)",
                      transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                    }}
                  >
                    {item.number}
                  </span>

                  {/* Label — the "key" */}
                  <span
                    className={cn(
                      "relative font-display transition-all",
                      // Size hierarchy
                      "text-3xl md:text-4xl lg:text-5xl",
                      // Black keys are slightly recessed
                      isBlackKey && "md:pl-3 lg:pl-4",
                      // Color states
                      isActive
                        ? "text-foreground"
                        : "text-foreground opacity-75 group-hover:opacity-100"
                    )}
                    style={{
                      // Piano key depression physics: 1px hover, 2px press
                      transform: isPressed
                        ? "translateY(2px)"
                        : isHovered
                        ? "translateY(1px)"
                        : "translateY(0)",
                      transitionDuration: isPressed ? "60ms" : "180ms",
                      transitionTimingFunction: isPressed
                        ? "cubic-bezier(0.4, 0, 1, 1)"
                        : "cubic-bezier(0.22,0.61,0.36,1)",
                      // Text shadow — golden warmth on hover
                      textShadow: isHovered
                        ? "0 0 30px hsl(var(--vow-yellow) / 0.08)"
                        : isActive
                        ? "0 0 20px hsl(var(--vow-yellow) / 0.05)"
                        : "none",
                    }}
                  >
                    {item.label}

                    {/* Underline — draws from left on hover, persists on active */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-[1px] origin-left transition-transform",
                        isActive || isHovered ? "scale-x-100" : "scale-x-0"
                      )}
                      style={{
                        width: "100%",
                        background: isActive
                          ? "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.35), transparent)"
                          : "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.25), transparent 80%)",
                        transitionDuration: "450ms",
                        transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                        boxShadow: isActive
                          ? "0 0 8px hsl(var(--vow-yellow) / 0.12)"
                          : isHovered
                          ? "0 0 6px hsl(var(--vow-yellow) / 0.08)"
                          : "none",
                      }}
                      aria-hidden="true"
                    />

                    {/* Black key shadow — subtle depth on odd items */}
                    {isBlackKey && (
                      <span
                        className="absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-full pointer-events-none"
                        style={{
                          background: `linear-gradient(to bottom, transparent, hsl(var(--foreground) / ${
                            isHovered ? 0.08 : 0.03
                          }), transparent)`,
                          transition: "background 180ms ease",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* ═══════════════════════════════════════════
            ORGANIC VINE THREAD — "Bar Line" separator
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-12 md:mt-14 w-32 transition-all duration-[400ms] overflow-visible",
            isOpen ? "opacity-100 delay-[700ms]" : "opacity-0"
          )}
        >
          <svg
            width="100%"
            height="6"
            viewBox="0 0 128 6"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="menu-vine-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="hsl(var(--vow-yellow) / 0.3)" />
                <stop offset="50%" stopColor="hsl(var(--vow-yellow) / 0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M0,3 Q16,1.2 32,3 T64,3 Q80,4.8 96,3 T128,3"
              fill="none"
              stroke="url(#menu-vine-gradient)"
              strokeWidth="1"
              style={{
                filter: "drop-shadow(0 0 3px hsl(var(--vow-yellow) / 0.06))",
              }}
            />
          </svg>
        </div>

        {/* ═══════════════════════════════════════════
            CONTACT — Location & Email
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-6 space-y-2 text-sm transition-all duration-[300ms]",
            isOpen
              ? "opacity-100 translate-y-0 delay-[750ms]"
              : "opacity-0 translate-y-4"
          )}
        >
          <p className="text-muted-foreground/60">
            Calgary, Cochrane, Canmore &amp; Banff
          </p>
          <p>
            <a
              href="mailto:parker@parkergawryletz.com"
              className="text-muted-foreground/60 hover:text-primary transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm"
            >
              parker@parkergawryletz.com
            </a>
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            COVENANT BOOKEND — "Coda" of the Score
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-10 md:mt-12 transition-all duration-[400ms]",
            isOpen ? "opacity-100 delay-[850ms]" : "opacity-0"
          )}
        >
          {/* Breathing golden dot — 4s cycle */}
          <div
            className="w-1.5 h-1.5 rounded-full mb-4"
            style={{
              background: "hsl(var(--vow-yellow) / 0.35)",
              boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.1)",
              animation: isOpen
                ? "menu-dot-breathe 4s ease-in-out infinite"
                : undefined,
            }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-foreground/25 tracking-wide">
            'Til Death
            <span
              className="text-primary/40"
              style={{
                animation: isOpen
                  ? "semicolon-heartbeat 2s ease-in-out infinite"
                  : undefined,
              }}
            >
              {" ; "}
            </span>
            Unto Life.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          KEYFRAME ANIMATIONS
          ═══════════════════════════════════════════ */}
      <style>{`
        @keyframes menu-candle-breathe {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes menu-fog-drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-1.5%, 0.8%) scale(1.03); }
        }
        @keyframes menu-dot-breathe {
          0%, 100% {
            opacity: 0.4;
            box-shadow: 0 0 4px hsl(var(--vow-yellow) / 0.08);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 10px hsl(var(--vow-yellow) / 0.18);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] * {
            animation-duration: 0.01ms !important;
            transition-duration: 120ms !important;
          }
        }
      `}</style>
    </div>
  );
}
