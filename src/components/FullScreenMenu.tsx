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

// Zone 1: The Three Paths — vertical selection
const verticals = [
  { label: "Weddings", href: "/weddings", base: "/weddings" },
  { label: "Private Events", href: "/events", base: "/events" },
  { label: "Piano Lessons", href: "/teaching", base: "/teaching" },
];

// Zone 2: Contextual page navigation (returns vertical-aware hrefs)
function getPageItems(pathname: string) {
  const isEvents = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');

  const pricingHref = isEvents ? '/events/pricing'
    : isTeaching ? '/teaching/pricing'
    : '/pricing';

  const aboutHref = isEvents ? '/events/about'
    : isTeaching ? '/teaching/about'
    : '/about';

  const contactHref = isEvents ? '/events/contact'
    : isTeaching ? '/teaching/contact'
    : '/contact';

  return [
    { label: "Offerings", href: pricingHref },
    { label: "About", href: aboutHref },
    { label: "Proof", href: "/proof" },
    { label: "FAQ", href: "/faq" },
    { label: "Listen", href: "/listen" },
    { label: "Get in Touch", href: contactHref },
  ];
}

function getActiveVertical(pathname: string): string {
  if (pathname.startsWith('/events')) return '/events';
  if (pathname.startsWith('/teaching')) return '/teaching';
  return '/weddings';
}

/**
 * FullScreenMenu — "The Score"
 * 
 * A bespoke piano-themed navigation overlay structured as two zones:
 * 1. The Three Paths — vertical selection (Weddings, Events, Teaching)
 * 2. Within This Path — contextual page links
 * 
 * The overlay is the vigil space — dark, sacred, reverent.
 */
export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [hoveredVertical, setHoveredVertical] = useState<number | null>(null);
  const lenis = useSmoothScroll();
  const { navigateWithTransition } = usePageTransition();
  
  const pageItems = getPageItems(location.pathname);
  const activeVertical = getActiveVertical(location.pathname);

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
      setHoveredVertical(null);
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

  const handleVerticalClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    if (href !== location.pathname && !location.pathname.startsWith(href)) {
      navigateWithTransition(href);
    }
  }, [onClose, location.pathname, navigateWithTransition]);

  const handlePageClick = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setPressedIndex(index);
    const targetPath = pageItems[index].href;
    setTimeout(() => {
      setPressedIndex(null);
      onClose();
      if (targetPath !== location.pathname) {
        navigateWithTransition(targetPath);
      }
    }, 120);
  }, [onClose, location.pathname, navigateWithTransition, pageItems]);

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

      {/* Gold corner accent — top-left */}
      <div
        className={cn(
          "absolute top-8 left-8 md:top-12 md:left-12 pointer-events-none transition-all duration-[400ms]",
          isOpen ? "opacity-100 delay-[400ms]" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <div className="w-6 h-[1px]" style={{ background: 'linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), transparent)' }} />
        <div className="w-[1px] h-6" style={{ background: 'linear-gradient(180deg, hsl(var(--vow-yellow) / 0.3), transparent)' }} />
      </div>

      {/* Gold corner accent — bottom-right */}
      <div
        className={cn(
          "absolute bottom-8 right-8 md:bottom-12 md:right-12 pointer-events-none transition-all duration-[400ms]",
          isOpen ? "opacity-100 delay-[500ms]" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <div className="flex flex-col items-end">
          <div className="w-6 h-[1px]" style={{ background: 'linear-gradient(270deg, hsl(var(--vow-yellow) / 0.3), transparent)' }} />
          <div className="w-[1px] h-6 self-end" style={{ background: 'linear-gradient(0deg, hsl(var(--vow-yellow) / 0.3), transparent)' }} />
        </div>
      </div>

      {/* Center breathing diamond */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--vow-yellow) / 0.08) 0%, transparent 70%)',
          animation: isOpen ? 'menu-diamond-breathe 5s ease-in-out infinite' : undefined,
        }}
        aria-hidden="true"
      />

      {/* Layer 1: Film grain */}
      <div
        className="grain pointer-events-none"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      />

      {/* Layer 2: Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, hsl(var(--rich-black) / 0.6) 70%, hsl(var(--rich-black)) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Primary candlelight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 25% 45%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Secondary candle warmth */}
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

      {/* Layer 5: Deep charcoal fog */}
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
          CLOSE BUTTON
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
          MENU CONTENT — Two Zones
          ═══════════════════════════════════════════ */}
      <div className="flex flex-col justify-center items-start min-h-screen px-8 md:px-16 lg:px-24">

        {/* ═══════════════════════════════════════════
            ZONE 1: The Three Paths — Vertical Selection
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "flex flex-col md:flex-row gap-3 md:gap-8 mb-8 md:mb-10 transition-all duration-[300ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[200ms]" : "opacity-0 translate-y-4"
          )}
          onMouseLeave={() => setHoveredVertical(null)}
        >
          {verticals.map((vertical, idx) => {
            const isActive = activeVertical === vertical.base;
            const isHovered = hoveredVertical === idx;
            const isDimmed = hoveredVertical !== null && hoveredVertical !== idx;
            
            return (
              <Link
                key={vertical.base}
                to={vertical.href}
                onClick={(e) => handleVerticalClick(e, vertical.href)}
                onMouseEnter={() => setHoveredVertical(idx)}
                className={cn(
                  "relative font-display text-lg md:text-xl transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm",
                  isActive
                    ? "text-foreground"
                    : isDimmed
                    ? "text-foreground/30"
                    : "text-foreground/50 hover:text-foreground/80"
                )}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                }}
              >
                {vertical.label}
                {/* Golden underline for active vertical */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px origin-left transition-all duration-[350ms]",
                    isActive ? "w-full" : isHovered ? "w-full" : "w-0"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--vow-yellow) / 0.15))"
                      : "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.25), transparent)",
                    boxShadow: isActive ? "0 0 8px hsl(var(--vow-yellow) / 0.1)" : "none",
                    transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                  }}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Golden thread separator — animated scale-x reveal */}
        <div
          className={cn(
            "w-24 md:w-32 mb-8 md:mb-10 transition-all duration-[600ms] origin-left",
            isOpen ? "opacity-100 scale-x-100 delay-[200ms]" : "opacity-0 scale-x-0"
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)' }}
        >
          <div
            className="h-px"
            style={{
              background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.35), hsl(var(--vow-yellow) / 0.12), transparent)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ═══════════════════════════════════════════
            ZONE 2: Within This Path — Page Navigation
            ═══════════════════════════════════════════ */}
        <nav
          className="space-y-3 md:space-y-4 relative z-[2]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pageItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            const isHovered = hoveredIndex === index;
            const isPressed = pressedIndex === index;

            // Alternating key pattern
            const isBlackKey = index % 2 === 1;

            return (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className={cn(
                    "relative flex items-center gap-3 md:gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm",
                    isOpen ? "translate-y-0" : "translate-y-6",
                    isOpen
                      ? isDimmed
                        ? "opacity-[0.2]"
                        : "opacity-100"
                      : "opacity-0"
                  )}
                  style={{
                    transitionDuration: "260ms",
                    transitionDelay: isOpen ? `${400 + index * 60}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                  }}
                  onClick={(e) => handlePageClick(e, index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseDown={() => setPressedIndex(index)}
                  onMouseUp={() => setPressedIndex(null)}
                >
                  {/* Active indicator — golden dash */}
                  <span
                    className={cn(
                      "w-3 h-px transition-all duration-[260ms] flex-shrink-0",
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

                  {/* Label */}
                  <span
                   className={cn(
                      "relative font-display transition-all flex items-baseline gap-3",
                      "text-2xl md:text-3xl lg:text-4xl",
                      isBlackKey && "md:pl-4 lg:pl-6",
                      isActive
                        ? "text-foreground"
                        : "text-foreground opacity-75 group-hover:opacity-100"
                    )}
                    style={{
                      transform: isPressed
                        ? "translateY(2px)"
                        : isHovered
                        ? "translateY(1px)"
                        : "translateY(0)",
                      transitionDuration: isPressed ? "60ms" : "180ms",
                      transitionTimingFunction: isPressed
                        ? "cubic-bezier(0.4, 0, 1, 1)"
                        : "cubic-bezier(0.22,0.61,0.36,1)",
                      textShadow: isHovered
                        ? "0 0 30px hsl(var(--vow-yellow) / 0.08)"
                        : isActive
                        ? "0 0 20px hsl(var(--vow-yellow) / 0.05)"
                        : "none",
                    }}
                  >
                    <span className="text-[0.5rem] tracking-[0.15em] text-foreground/20 tabular-nums font-sans" style={{ fontFeatureSettings: '"tnum"' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>

                    {/* Underline */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px origin-left transition-transform",
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

                    {/* Black key shadow */}
                    {isBlackKey && (
                      <span
                        className="absolute -left-2 lg:-left-3 top-1/2 -translate-y-1/2 w-[2px] h-[60%] rounded-full pointer-events-none"
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
            VINE THREAD SEPARATOR
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-10 md:mt-12 w-32 transition-all duration-[400ms] overflow-visible",
            isOpen ? "opacity-100 delay-[800ms]" : "opacity-0"
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
            CONTACT INFO
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-6 space-y-2 text-sm transition-all duration-[300ms]",
            isOpen
              ? "opacity-100 translate-y-0 delay-[850ms]"
              : "opacity-0 translate-y-4"
          )}
        >
          <p className="text-muted-foreground opacity-60">
            Calgary, Cochrane, Canmore &amp; Banff
          </p>
          <p>
            <a
              href="mailto:parker@parkergawryletz.com"
              className="text-muted-foreground opacity-60 hover:text-primary hover:opacity-100 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm"
            >
              parker@parkergawryletz.com
            </a>
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            COVENANT BOOKEND
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-10 md:mt-12 transition-all duration-[400ms]",
            isOpen ? "opacity-100 delay-[900ms]" : "opacity-0"
          )}
        >
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
          <p className="font-display text-sm text-foreground opacity-25 tracking-wide">
            'Til Death
            <span
              className="text-primary opacity-40"
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
