import { useState, useEffect, useRef, useCallback } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FullScreenMenu } from "./FullScreenMenu";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Proof" },
];

/**
 * MinimalHeader — "The Ceremony Arch"
 * 
 * A bespoke navigation header that transforms through three states:
 * 
 * 1. VIGIL (top of page): Transparent, logo + menu only. The held breath.
 * 2. SCROLLED (past 1vh): Glass-morphic bar with nav links, atmospheric
 *    candlelight warmth, film grain, and organic vine-thread bottom edge.
 * 3. ARRIVAL (footer visible): The Ceremony Arch. Nav links dissolve
 *    in reverse-staggered recessional (80ms intervals). Logo glides to
 *    center. Vine thread synchronizes its breathing with the footer's
 *    golden thread (4s cycle). The header becomes the top frame of a
 *    unified ceremonial bookend with the footer.
 * 
 * The transition from Vigil → Scrolled → Arrival mirrors the wedding
 * journey: preparation → ceremony → covenant.
 */
export function MinimalHeader() {
  const hasPlayed = typeof window !== 'undefined' && sessionStorage.getItem('vigil-complete') === 'true';
  const headerDelay = hasPlayed ? '0ms' : '6200ms';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [wasScrolled, setWasScrolled] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [arrivalPhase, setArrivalPhase] = useState<'none' | 'dissolving' | 'arrived'>('none');
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  
  // Vertical-aware CTA label — adapts to the emotional temperature of each vertical
  const ctaLabel = (() => {
    if (isContactPage) return "You're here";
    const path = location.pathname;
    if (path.startsWith('/teaching')) return 'Begin the Conversation';
    if (path.startsWith('/events')) return 'Discuss Your Event';
    return 'Hold My Date';
  })();
  const navRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  // Scroll tracking with rAF for smooth progress
  const updateScroll = useCallback(() => {
    const scrolled = window.scrollY > window.innerHeight;
    setIsScrolled(scrolled);
    if (scrolled) setWasScrolled(true);

    // Scroll progress for golden thread
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setScrollProgress(Math.min(window.scrollY / docHeight, 1));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateScroll]);

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

  // Orchestrate arrival phases: dissolve nav → glide logo → reveal tagline
  const arrivalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (isArrival) {
      if (arrivalPhase === 'none') {
        setArrivalPhase('dissolving');
        const dissolveTime = navLinks.length * 80 + 300;
        arrivalTimerRef.current = setTimeout(() => setArrivalPhase('arrived'), dissolveTime);
      }
    } else {
      if (arrivalTimerRef.current) {
        clearTimeout(arrivalTimerRef.current);
        arrivalTimerRef.current = null;
      }
      if (arrivalPhase !== 'none') setArrivalPhase('none');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArrival]);

  return (
    <>
      {/* Fixed Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all",
          isScrolled && "backdrop-blur-md"
        )}
        style={{
          height: isScrolled ? "56px" : "auto",
          background: isScrolled ? "hsl(var(--rich-black) / 0.94)" : undefined,
          transitionDuration: "260ms",
          transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
        }}
      >
        {/* ═══════════════════════════════════════════
            ATMOSPHERIC LAYERS (only when scrolled)
            ═══════════════════════════════════════════ */}
        {isScrolled && (
          <>
            {/* Layer 1: Candlelight warmth — radial glow from center-bottom */}
            <div
              className={cn(
                "absolute inset-0 pointer-events-none transition-opacity duration-[900ms]",
                isArrival ? "header-candle header-candle--arrival" : "header-candle"
              )}
              style={{
                background: `radial-gradient(ellipse 80% 120% at 50% 100%, hsl(var(--vow-yellow) / ${
                  isArrival ? 0.04 : 0.025
                }) 0%, transparent 60%)`,
              }}
              aria-hidden="true"
            />

            {/* Layer 2: Secondary warmth pool — centered, breathing */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 100% at 50% 50%, hsl(var(--vow-yellow) / ${
                  isArrival ? 0.018 : 0.008
                }) 0%, transparent 50%)`,
                animation: isArrival
                  ? "header-warmth-bloom 6s ease-in-out infinite"
                  : undefined,
                transition: "opacity 700ms ease",
              }}
              aria-hidden="true"
            />

            {/* Layer 3: Vignette — darkened edges for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, hsl(var(--rich-black) / 0.18) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Layer 4: Film grain — sacred texture */}
            <div
              className="grain pointer-events-none"
              style={{
                opacity: isArrival ? 0.05 : 0.03,
                transition: "opacity 700ms ease",
                willChange: "opacity",
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* ═══════════════════════════════════════════
            SCROLL PROGRESS THREAD — Top Edge
            Golden thread that fills left-to-right with scroll
            ═══════════════════════════════════════════ */}
        {isScrolled && (
          <div
            className="absolute top-0 left-0 h-[1px] pointer-events-none"
            style={{
              width: `${scrollProgress * 100}%`,
              background: `linear-gradient(90deg, hsl(var(--vow-yellow) / ${
                isArrival ? 0.5 : 0.3
              }), hsl(var(--vow-yellow) / ${isArrival ? 0.7 : 0.45}))`,
              boxShadow: `0 0 ${isArrival ? 8 : 4}px hsl(var(--vow-yellow) / ${
                isArrival ? 0.15 : 0.08
              })`,
              transition: "width 100ms linear, box-shadow 700ms ease",
            }}
            aria-hidden="true"
          />
        )}

        {/* ═══════════════════════════════════════════
            ORGANIC VINE THREAD — Bottom Edge
            Replaces flat golden border with undulating SVG path.
            During arrival, synchronized 4s breathing with footer.
            ═══════════════════════════════════════════ */}
        {isScrolled && (
          <svg
            className={cn(
              "absolute bottom-0 left-0 w-full pointer-events-none animate-fade-in",
              isArrival && "header-vine-breathe"
            )}
            style={{
              animationDuration: "450ms",
              animationFillMode: "forwards",
              height: "6px",
            }}
            viewBox="0 0 1200 6"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="vine-thread-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop
                  offset="20%"
                  stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.3 : 0.12})`}
                />
                <stop
                  offset="50%"
                  stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.35 : 0.15})`}
                />
                <stop
                  offset="80%"
                  stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.3 : 0.12})`}
                />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Organic vine path — gentle undulating wave */}
            <path
              d="M0,3 Q50,1.5 100,3 T200,3 Q250,4.5 300,3 T400,3 Q450,1.5 500,3 T600,3 Q650,4.5 700,3 T800,3 Q850,1.5 900,3 T1000,3 Q1050,4.5 1100,3 T1200,3"
              fill="none"
              stroke="url(#vine-thread-gradient)"
              strokeWidth="1"
              className="transition-all duration-[450ms]"
              style={{
                filter: `drop-shadow(0 0 ${isArrival ? 6 : 4}px hsl(var(--vow-yellow) / ${
                  isArrival ? 0.1 : 0.04
                }))`,
              }}
            />
          </svg>
        )}

        {/* ═══════════════════════════════════════════
            CONTENT — Logo, Nav, Menu
            ═══════════════════════════════════════════ */}
        <div
          className={cn(
            "flex items-center h-full px-[var(--hero-space-edge,24px)] md:px-[var(--hero-space-edge,48px)] py-6 relative",
            "justify-between"
          )}
        >
          {/* Logo with candle warmth glow — glides to center during arrival */}
          <div
            className="relative transition-all"
            style={{
              // Transform-based centering: logo glides from left to center
              transform: arrivalPhase === 'arrived'
                ? 'translateX(calc(50vw - 50% - var(--hero-space-edge, 48px)))'
                : 'translateX(0)',
              transitionDuration: '450ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
              transitionDelay: arrivalPhase === 'arrived' ? '0ms' : '0ms',
            }}
          >
            {/* Candle warmth pool behind logo */}
            <div
              className={cn(
                "absolute inset-0 -inset-x-8 -inset-y-4 pointer-events-none transition-all duration-[900ms]",
                isArrival ? "header-candle" : ""
              )}
              style={{
                background: `radial-gradient(circle 60px at center, hsl(var(--vow-yellow) / ${
                  arrivalPhase === 'arrived' ? 0.08 : isArrival ? 0.06 : 0.03
                }) 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            <NavLink
              to="/"
              className={cn(
                "relative font-display text-base text-foreground opacity-0 animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                isArrival
                  ? "hover:text-foreground"
                  : "hover:text-primary"
              )}
              style={{
                animationDelay: headerDelay,
                animationFillMode: "forwards",
                letterSpacing: '0.08em',
                textShadow: arrivalPhase === 'arrived'
                  ? "0 0 24px hsl(var(--vow-yellow) / 0.1), 0 0 60px hsl(var(--vow-yellow) / 0.04)"
                  : "none",
                transition: 'letter-spacing 260ms cubic-bezier(0.22,0.61,0.36,1), text-shadow 700ms ease, color 260ms ease',
              }}
              onMouseEnter={(e) => { if (arrivalPhase !== 'arrived') (e.currentTarget as HTMLElement).style.letterSpacing = '0.12em'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.letterSpacing = '0.08em'; }}
            >
              Parker Gawryletz
              {/* Vow-yellow underline draw — only during full arrival */}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-full h-[1px] origin-center transition-transform",
                  arrivalPhase === 'arrived' ? "scale-x-100" : "scale-x-0"
                )}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                  transitionDuration: "450ms",
                  transitionDelay: arrivalPhase === 'arrived' ? "200ms" : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                  boxShadow: arrivalPhase === 'arrived'
                    ? "0 0 8px hsl(var(--vow-yellow) / 0.12)"
                    : "none",
                }}
                aria-hidden="true"
              />
            </NavLink>
          </div>

          {/* ═══════════════════════════════════════════
              NAVIGATION LINKS — Piano Key Depression + Spotlight
              ═══════════════════════════════════════════ */}
          {isScrolled && (
            <nav
              ref={navRef}
              className={cn(
                "hidden md:flex items-center gap-8 transition-all duration-[260ms]",
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                // During arrival dissolve, shrink and hide after animation completes
                ...(arrivalPhase === 'arrived' && {
                  width: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none' as const,
                }),
              }}
              onMouseLeave={() => setHoveredNavIndex(null)}
            >
              {navLinks.map((link, i) => {
                // Reverse stagger on fade-out (recessional dissolve)
                const reverseI = navLinks.length - 1 - i;
                const delay =
                  wasScrolled && !isScrolled
                    ? `${reverseI * 80}ms`
                    : `${i * 80}ms`;

                const isDimmed =
                  hoveredNavIndex !== null && hoveredNavIndex !== i;

                // Arrival dissolve: reverse stagger, each link fades out
                const isDissolving = arrivalPhase === 'dissolving' || arrivalPhase === 'arrived';
                const dissolveDelay = reverseI * 80;

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "relative nav-link opacity-0 animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm transition-all",
                        isActive && "text-foreground",
                        isDimmed && "!opacity-[0.35]"
                      )
                    }
                    style={{
                      // When dissolving, kill the fill-forward animation so inline styles take effect
                      animation: isDissolving ? 'none' : undefined,
                      animationDelay: isDissolving ? undefined : delay,
                      animationFillMode: isDissolving ? undefined : "forwards",
                      // Staggered dissolve during arrival
                      opacity: isDissolving ? 0 : undefined,
                      transform: isDissolving ? 'translateY(-4px)' : undefined,
                      transitionDuration: '260ms',
                      transitionDelay: isDissolving ? `${dissolveDelay}ms` : undefined,
                      transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)',
                      pointerEvents: isDissolving ? 'none' as const : undefined,
                    }}
                    onMouseEnter={() => setHoveredNavIndex(i)}
                  >
                    {({ isActive }) => (
                      <span
                        className="inline-block transition-transform"
                        style={{
                          // Piano key depression: 1px hover, 2px press
                          transitionDuration: "180ms",
                          transitionTimingFunction:
                            "cubic-bezier(0.22,0.61,0.36,1)",
                        }}
                        onMouseDown={(e) =>
                          ((e.currentTarget as HTMLElement).style.transform =
                            "translateY(2px)")
                        }
                        onMouseUp={(e) =>
                          ((e.currentTarget as HTMLElement).style.transform =
                            "translateY(1px)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.transform =
                            "translateY(0)")
                        }
                      >
                        <span
                          className={cn(
                            "inline-block transition-transform duration-[180ms]",
                            hoveredNavIndex === i && "translate-y-[1px]"
                          )}
                        >
                          {link.label}
                        </span>
                        {/* Vow-yellow underline — draws from center */}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 w-full h-[1px] origin-center transition-transform duration-[450ms]",
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          )}
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
                            transitionTimingFunction:
                              "cubic-bezier(0.22, 0.61, 0.36, 1)",
                            boxShadow: isActive
                              ? "0 0 6px hsl(var(--vow-yellow) / 0.1)"
                              : "none",
                          }}
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </NavLink>
                );
              })}

              {/* CTA — "Hold My Date" with warm glow — dissolves first during arrival */}
              <span
                className={cn(
                  "relative transition-all",
                  !(arrivalPhase === 'dissolving' || arrivalPhase === 'arrived') && "opacity-0 animate-fade-in"
                )}
                style={{
                  ...(!(arrivalPhase === 'dissolving' || arrivalPhase === 'arrived') && {
                    animationDelay: `${navLinks.length * 80}ms`,
                    animationFillMode: "forwards",
                  }),
                  ...((arrivalPhase === 'dissolving' || arrivalPhase === 'arrived') && {
                    opacity: 0,
                    transform: 'translateY(-4px)',
                    transitionDuration: '260ms',
                    transitionDelay: '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)',
                    pointerEvents: 'none' as const,
                  }),
                }}
                onMouseEnter={() => setHoveredNavIndex(navLinks.length)}
              >
                <span
                  className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-full pointer-events-none"
                  style={{
                    background: isContactPage
                      ? "none"
                      : "radial-gradient(ellipse at center, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <NavLink
                  to="/contact"
                  className={cn(
                    "relative nav-link transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                    isContactPage
                      ? "text-foreground/50 cursor-default"
                      : "nav-link--cta hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)]",
                    hoveredNavIndex !== null &&
                      hoveredNavIndex !== navLinks.length &&
                      "!opacity-[0.35]"
                  )}
                >
                  <span
                    className="inline-block transition-transform duration-[180ms]"
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.22,0.61,0.36,1)",
                    }}
                    onMouseDown={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform =
                        "translateY(2px)")
                    }
                    onMouseUp={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform =
                        "translateY(1px)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform =
                        "translateY(0)")
                    }
                  >
                    {ctaLabel}
                  </span>
                </NavLink>
              </span>
            </nav>
          )}

          {/* Menu Button — stays right, softens during arrival */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              "flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm transition-all duration-[260ms]",
              arrivalPhase !== 'arrived' && "opacity-0 animate-fade-in"
            )}
            style={{
              ...(arrivalPhase !== 'arrived' && {
                animationDelay: headerDelay,
                animationFillMode: "forwards",
              }),
              // Soften opacity during arrival — menu is still accessible but whispers
              ...(arrivalPhase === 'arrived' && {
                opacity: 0.4,
                transitionDelay: '200ms',
              }),
            }}
            aria-label="Open menu"
          >
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground group-hover:text-primary transition-colors duration-[180ms]">
              Menu
            </span>
            {/* Bespoke Piano-String Hamburger — three lines of descending width */}
            <div className="flex flex-col items-end gap-[5px] group-hover:[&>span]:w-[20px]" aria-hidden="true">
              <span
                className="block h-[1px] bg-muted-foreground group-hover:bg-primary transition-all duration-[180ms]"
                style={{ width: 20, transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)' }}
              />
              <span
                className="block h-[1px] bg-muted-foreground group-hover:bg-primary transition-all duration-[180ms]"
                style={{ width: 16, transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)' }}
              />
              <span
                className="block h-[1px] bg-muted-foreground group-hover:bg-primary transition-all duration-[180ms]"
                style={{ width: 12, transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)' }}
              />
            </div>
          </button>
        </div>

        {/* ═══════════════════════════════════════════
            ARRIVAL TAGLINE — appears only during full arrival
            Delayed entrance: rises 8px with opacity, 
            creating the ceremonial "recessional" close
            ═══════════════════════════════════════════ */}
        {arrivalPhase === 'arrived' && (
          <div
            className="absolute bottom-[8px] left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              opacity: 0,
              transform: 'translateY(8px) translateX(-50%)',
              animation: 'arrival-tagline-rise 700ms cubic-bezier(0.22, 0.61, 0.36, 1) 300ms forwards',
            }}
            aria-hidden="true"
          >
            <p className="font-display text-[10px] text-foreground/15 tracking-[0.18em] whitespace-nowrap">
              'Til Death
              <span
                className="text-primary/25"
                style={{
                  animation: "semicolon-heartbeat 2s ease-in-out infinite 1s",
                }}
              >
                {" ; "}
              </span>
              Unto Life.
            </p>
          </div>
        )}
      </header>

      {/* Full Screen Menu Overlay */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* ═══════════════════════════════════════════
          KEYFRAME ANIMATIONS
          ═══════════════════════════════════════════ */}
      <style>{`
        @keyframes header-warmth-bloom {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes arrival-tagline-rise {
          from {
            opacity: 0;
            transform: translateY(8px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          header * {
            transition-duration: 120ms !important;
          }
          @keyframes arrival-tagline-rise {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>
    </>
  );
}
