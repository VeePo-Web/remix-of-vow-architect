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

  // Vertical-aware labels + routing
  const servicesLabel = isEvents ? 'Packages' : isTeaching ? 'Lesson Plans' : 'Services';

  const faqHref = isEvents ? '/events/faq'
    : isTeaching ? '/teaching/faq'
    : '/faq';

  const items = [
    { label: servicesLabel, href: pricingHref },
    { label: "About", href: aboutHref },
  ];

  // Proof is weddings-exclusive
  if (!isEvents && !isTeaching) {
    items.push({ label: "Proof", href: "/proof" });
  }

  // FAQ and Listen are available on all verticals
  items.push(
    { label: "FAQ", href: faqHref },
    { label: "Listen", href: "/listen" },
  );

  return items;
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
      data-theme="death"
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
            "flex items-center gap-2 group transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] rounded-sm",
            isOpen ? "opacity-100 delay-300" : "opacity-0"
          )}
          aria-label="Close menu"
        >
          <span
            className="text-xs font-sans uppercase tracking-[0.22em] transition-colors duration-[180ms]"
            style={{ color: "hsl(0 0% 100% / 0.45)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(0 0% 100% / 0.85)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(0 0% 100% / 0.45)"; }}
          >
            Close
          </span>
          <X
            size={20}
            strokeWidth={1.5}
            className="transition-all duration-[180ms] group-hover:rotate-90"
            style={{ color: "hsl(0 0% 100% / 0.45)" }}
          />
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          MENU CONTENT — Centered Symphony Layout
          ═══════════════════════════════════════════ */}
      <div className="flex flex-col justify-center items-center text-center min-h-screen px-8 md:px-16 lg:px-24">

        {/* ═══════════════════════════════════════════
            BRAND MARK — Parker Gawryletz
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mb-6 md:mb-8 transition-all duration-[400ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[100ms]" : "opacity-0 translate-y-4"
          )}
        >
          <Link
            to="/"
            onClick={(e) => { e.preventDefault(); onClose(); navigateWithTransition('/'); }}
            className="relative overflow-hidden inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] rounded-sm"
          >
            <img src="/logos/nav-dark.png" alt="Parker Gawryletz — Home" className="h-[28px] w-auto" />
            {/* Gold shimmer sweep — one-time on open */}
            <span
              className="absolute inset-0 pointer-events-none opacity-0"
              style={{
                animation: isOpen ? 'shimmer-sweep 2s ease-in-out 0.8s 1 forwards' : undefined,
                background: 'linear-gradient(110deg, transparent 30%, hsl(var(--vow-yellow) / 0.2) 45%, hsl(var(--vow-yellow) / 0.3) 50%, hsl(var(--vow-yellow) / 0.2) 55%, transparent 70%)',
              }}
              aria-hidden="true"
            />
          </Link>
          {/* Golden divider line */}
          <div
            className={cn(
              "mt-4 mx-auto transition-all duration-[500ms] origin-center",
              isOpen ? "opacity-100 scale-x-100 delay-[200ms]" : "opacity-0 scale-x-0"
            )}
            style={{ width: '80px' }}
          >
            <div
              className="h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)',
                animation: isOpen ? 'menu-dot-breathe 4s ease-in-out infinite 1s' : undefined,
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ZONE 1: The Three Paths — Vertical Selection
            ═══════════════════════════════════════════ */}
        <p
          className={cn(
            "font-sans text-[10px] font-medium uppercase tracking-[0.25em] mb-5 transition-all duration-[300ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[250ms]" : "opacity-0 translate-y-2"
          )}
          style={{ color: "hsl(var(--vow-yellow) / 0.4)" }}
        >
          Choose a path
        </p>
        <div
          className={cn(
            "flex flex-col md:flex-row gap-4 md:gap-8 mb-10 md:mb-12 justify-center transition-all duration-[300ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[300ms]" : "opacity-0 translate-y-4"
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
                className="relative font-display text-2xl md:text-3xl lg:text-4xl transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] rounded-sm"
                style={{
                  color: isActive
                    ? "hsl(0 0% 100% / 0.95)"
                    : isDimmed
                    ? "hsl(0 0% 100% / 0.2)"
                    : "hsl(0 0% 100% / 0.5)",
                  transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                  textShadow: isActive ? "0 0 30px hsl(var(--vow-yellow) / 0.06)" : "none",
                }}
              >
                {vertical.label}
                {/* Golden underline for active vertical */}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px origin-left transition-all duration-[350ms]",
                    isActive ? "w-full" : isHovered ? "w-full" : "w-0"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.6), hsl(var(--vow-yellow) / 0.15))"
                      : "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), transparent)",
                    boxShadow: isActive ? "0 0 10px hsl(var(--vow-yellow) / 0.12)" : "none",
                    transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                  }}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Golden thread separator — centered */}
        <div
          className={cn(
            "w-24 md:w-32 mb-8 md:mb-10 mx-auto transition-all duration-[600ms] origin-center",
            isOpen ? "opacity-100 scale-x-100 delay-[400ms]" : "opacity-0 scale-x-0"
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)' }}
        >
          <div
            className="h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.35), hsl(var(--vow-yellow) / 0.12), transparent)",
              animation: isOpen ? 'menu-dot-breathe 5s ease-in-out infinite 1.5s' : undefined,
            }}
            aria-hidden="true"
          />
        </div>

        {/* ═══════════════════════════════════════════
            ZONE 2: Within This Path — Page Navigation
            ═══════════════════════════════════════════ */}
        <p
          className={cn(
            "font-sans text-[10px] font-medium uppercase tracking-[0.25em] mb-4 transition-all duration-[300ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[420ms]" : "opacity-0 translate-y-2"
          )}
          style={{ color: "hsl(0 0% 100% / 0.25)" }}
        >
          Explore
        </p>
        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4 relative z-[2]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pageItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            const isHovered = hoveredIndex === index;
            const isPressed = pressedIndex === index;

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "relative font-display text-lg md:text-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] rounded-sm",
                  isOpen ? "translate-y-0" : "translate-y-4",
                  isOpen
                    ? isDimmed
                      ? "opacity-[0.25]"
                      : "opacity-100"
                    : "opacity-0"
                )}
                style={{
                  color: isActive ? "hsl(0 0% 100% / 0.9)" : "hsl(0 0% 100% / 0.55)",
                  transitionDuration: "220ms",
                  transitionDelay: isOpen ? `${450 + index * 50}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                  transform: isPressed
                    ? "translateY(1px)"
                    : "translateY(0)",
                }}
                onClick={(e) => handlePageClick(e, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseDown={() => setPressedIndex(index)}
                onMouseUp={() => setPressedIndex(null)}
              >
                {item.label}
                {/* Underline */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px origin-left transition-all",
                    isActive || isHovered ? "w-full" : "w-0"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.4), transparent)"
                      : "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.25), transparent)",
                    transitionDuration: "350ms",
                    transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                    boxShadow: isActive ? "0 0 6px hsl(var(--vow-yellow) / 0.1)" : "none",
                  }}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* ═══════════════════════════════════════════
            VERTICAL-AWARE CTA BUTTON
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "mt-8 md:mt-10 transition-all duration-[400ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[800ms]" : "opacity-0 translate-y-4"
          )}
        >
          <Link
            to={(() => {
              if (location.pathname.startsWith('/events')) return '/events/contact';
              if (location.pathname.startsWith('/teaching')) return '/teaching/contact';
              return '/contact';
            })()}
            onClick={onClose}
            className="menu-cta-pill relative inline-flex items-center overflow-hidden group/cta"
            style={{
              height: "44px",
              padding: "0 28px",
              borderRadius: "100px",
              border: "1px solid hsl(var(--vow-yellow) / 0.25)",
              background: "hsl(var(--vow-yellow) / 0.08)",
              color: "hsl(0 0% 100% / 0.85)",
              fontSize: "13px",
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color 260ms cubic-bezier(0.22,0.61,0.36,1), background 260ms ease, box-shadow 260ms ease, transform 180ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "hsl(var(--vow-yellow) / 0.45)";
              el.style.background = "hsl(var(--vow-yellow) / 0.14)";
              el.style.boxShadow = "0 0 24px hsl(var(--vow-yellow) / 0.12), 0 4px 16px hsl(0 0% 0% / 0.3)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "hsl(var(--vow-yellow) / 0.25)";
              el.style.background = "hsl(var(--vow-yellow) / 0.08)";
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            {(() => {
              if (location.pathname.startsWith('/events')) return 'Discuss Your Event';
              if (location.pathname.startsWith('/teaching')) return 'Begin the Conversation';
              return 'Reserve My Date!';
            })()}
            {/* Diagonal shimmer sweep on hover */}
            <span
              className="absolute inset-0 pointer-events-none opacity-0 group-hover/cta:opacity-100 transition-opacity duration-[450ms]"
              style={{
                background: 'linear-gradient(110deg, transparent 30%, hsl(var(--vow-yellow) / 0.15) 45%, hsl(var(--vow-yellow) / 0.25) 50%, hsl(var(--vow-yellow) / 0.15) 55%, transparent 70%)',
                animation: 'shimmer-sweep 1.5s ease-in-out infinite',
              }}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* ═══════════════════════════════════════════
            CONTACT INFO FOOTER — Repositioned to bottom
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "absolute bottom-8 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm transition-all duration-[400ms]",
            isOpen ? "opacity-100 translate-y-0 delay-[900ms]" : "opacity-0 translate-y-4"
          )}
        >
          <span style={{ color: "hsl(0 0% 100% / 0.35)" }}>
            Calgary, Cochrane, Canmore & Banff
          </span>
          <span className="hidden md:block" style={{ color: "hsl(0 0% 100% / 0.35)" }}>—</span>
          <a
            href="mailto:parker@parkergawryletz.com"
            className="transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] rounded-sm"
            style={{ color: "hsl(0 0% 100% / 0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(0 0% 100% / 0.75)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(0 0% 100% / 0.35)"; }}
          >
            parker@parkergawryletz.com
          </a>
          <span className="hidden md:block" style={{ color: "hsl(0 0% 100% / 0.35)" }}>—</span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'hsl(var(--vow-yellow) / 0.35)',
              boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.1)',
              animation: isOpen ? 'menu-dot-breathe 4s ease-in-out infinite 2s' : undefined,
            }}
            aria-hidden="true"
          />
          <span className="text-xs italic" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
            Response within 24 hours
          </span>
        </div>

        {/* Spacer to prevent content from overlapping contact bar */}
        <div className="h-16" aria-hidden="true" />
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
        @keyframes menu-diamond-breathe {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.12; }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(400%) skewX(-20deg); }
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
