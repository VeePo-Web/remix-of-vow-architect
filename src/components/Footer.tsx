import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Footer() {
  const { ref: footerRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [isArrival, setIsArrival] = useState(false);

  // Detect arrival state — when the covenant bookend is visible
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      const bookend = document.querySelector('[data-footer-bookend]');
      if (!bookend) return;
      observer = new IntersectionObserver(
        ([entry]) => setIsArrival(entry.isIntersecting),
        { threshold: 0.5 }
      );
      observer.observe(bookend);
    }, 100);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="section--dark relative overflow-hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Site footer"
    >
      {/* === Color bridge from CrossOver === */}
      <div className="footer-fade-bridge" aria-hidden="true" />

      {/* === Organic Vine Thread — Top Edge (mirrors header's bottom vine) === */}
      <svg
        className={cn(
          "absolute top-0 left-0 w-full pointer-events-none z-[3]",
          isArrival && "footer-vine-breathe"
        )}
        style={{ height: "6px" }}
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="footer-vine-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.3 : 0.1})`} />
            <stop offset="50%" stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.35 : 0.12})`} />
            <stop offset="80%" stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.3 : 0.1})`} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M0,3 Q50,4.5 100,3 T200,3 Q250,1.5 300,3 T400,3 Q450,4.5 500,3 T600,3 Q650,1.5 700,3 T800,3 Q850,4.5 900,3 T1000,3 Q1050,1.5 1100,3 T1200,3"
          fill="none"
          stroke="url(#footer-vine-gradient)"
          strokeWidth="1"
          className="transition-all duration-[450ms]"
          style={{
            filter: `drop-shadow(0 0 ${isArrival ? 6 : 3}px hsl(var(--vow-yellow) / ${isArrival ? 0.1 : 0.03}))`,
          }}
        />
      </svg>

      {/* === Screen reader narrative === */}
      <span className="sr-only">Site footer with navigation, contact information, and social links</span>

      {/* === Atmospheric Layer 1: Grain — intensifies during arrival === */}
      <div
        className="grain pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{ opacity: isArrival ? 0.08 : 0.06 }}
        aria-hidden="true"
      />

      {/* === Atmospheric Layer 2: Edge vignette === */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--rich-black)) 100%)",
        }}
        aria-hidden="true"
      />

      {/* === Atmospheric Layer 3: Top-center warm fog === */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background:
            `radial-gradient(ellipse at 50% 20%, hsl(var(--vow-yellow) / ${isArrival ? '0.035' : '0.015'}) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* === Atmospheric Layer 4: Bottom-center warm fog (dual-origin) === */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background:
            `radial-gradient(ellipse at 50% 85%, hsl(var(--vow-yellow) / ${isArrival ? '0.03' : '0.012'}) 0%, transparent 45%)`,
        }}
        aria-hidden="true"
      />

      {/* === Atmospheric Layer 5: Breathing vignette — pulses during arrival === */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1]",
          isArrival && "footer-vignette-breathe"
        )}
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black) / 0.7) 100%)",
          opacity: isArrival ? undefined : 0.7,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto py-fitz-9 md:py-fitz-10 px-fitz-4 md:px-fitz-5 lg:px-fitz-6 relative z-[2]">
        {/* Golden thread above content — widened to 80px, breathes during arrival */}
        <div
          className={cn(
            "h-[1px] w-20 mx-auto mb-fitz-9 transition-opacity duration-700",
            isArrival ? "footer-breathe" : ""
          )}
          style={{
            background:
              `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.3' : '0.25'}), transparent)`,
            boxShadow: `0 0 ${isArrival ? '8px' : '8px'} hsl(var(--vow-yellow) / ${isArrival ? '0.15' : '0.1'})`,
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-fitz-9">
          {/* Name/Tagline — delay 0ms */}
          <div
            className={cn(
              "col-span-1 md:col-span-2 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <h3
              className="font-display font-light tracking-[0.04em] text-foreground"
              style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
            >
              Parker Gawryletz
            </h3>
            <p className="font-display italic text-sm text-muted-foreground mt-1 mb-4">
              Ceremony Pianist
            </p>
            <p className="text-foreground mb-8 max-w-md leading-relaxed opacity-70">
              I carry your vows so they can carry your guests.
            </p>
            {/* Social icons with spotlight hover */}
            <div className="group/icons flex items-center gap-4">
              <a
                href="mailto:parker@parkergawryletz.com"
                className="text-muted-foreground hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Send me an email"
              >
                <Mail size={18} />
              </a>
              <span className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="tel:+14038308930"
                className="text-muted-foreground hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Call me by phone"
              >
                <Phone size={18} />
              </a>
              <span className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="https://instagram.com"
                className="text-muted-foreground hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Follow me on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <span className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="https://youtube.com"
                className="text-muted-foreground hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Watch me on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Navigate — delay 150ms, key depression hover + spotlight dimming */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            <nav aria-label="Footer navigation">
              <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6 text-foreground opacity-80">
                Navigate
              </h4>
              <ul className="group/nav space-y-3">
                {[
                  { to: "/weddings", label: "Weddings" },
                  { to: "/teaching", label: "Teaching" },
                  { to: "/events", label: "Events" },
                  { to: "/pricing", label: "Services" },
                  { to: "/about", label: "About" },
                  { to: "/proof", label: "Proof" },
                  { to: "/faq", label: "FAQ" },
                  { to: "/listen", label: "Listen" },
                  { to: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="text-muted-foreground hover:text-primary hover:translate-y-[1px] active:translate-y-[2px] group-hover/nav:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] story-link inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Reach Me — delay 300ms */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6 text-foreground opacity-80">
              Reach Me
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Calgary, Cochrane, Canmore and Banff</li>
              <li>
                <a href="mailto:parker@parkergawryletz.com" className="hover:text-primary transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="Email me at parker@parkergawryletz.com">
                  parker@parkergawryletz.com
                </a>
              </li>
              <li>
                <a href="tel:+14038308930" className="hover:text-primary transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="Call me at +1-403-830-8930">
                  +1-403-830-8930
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Golden thread separator — glow intensifies during arrival */}
        <div
          className="h-[1px] w-full mt-fitz-10 mb-fitz-7 transition-all duration-700"
          style={{
            background:
              `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.22' : '0.15'}), transparent)`,
            boxShadow: `0 0 ${isArrival ? '12px' : '8px'} hsl(var(--vow-yellow) / ${isArrival ? '0.15' : '0.1'})`,
          }}
          aria-hidden="true"
        />

        {/* === Subtle CTA — delay 400ms, arrival-aware glow === */}
        <div
          className={cn(
            "flex flex-col items-center gap-4 mb-10 transition-all duration-700 relative",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <div
            className={cn(
              "pointer-events-none absolute w-[200px] h-[200px] rounded-full transition-opacity duration-700",
              isArrival && "footer-cta-arrival-glow"
            )}
            style={{
              background: `radial-gradient(circle, hsl(var(--vow-yellow) / ${isArrival ? '0.06' : '0.04'}) 0%, transparent 70%)`,
              opacity: isArrival ? undefined : 1,
            }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-muted-foreground">
            Ready to begin?
          </p>
          <Button variant="ghost-dark" size="sm" asChild>
            <Link to="/contact">Hold my date</Link>
          </Button>
        </div>

        {/* Bottom bar — delay 450ms */}
        <div
          className={cn(
            "flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
        >
          <p className="text-sm text-muted-foreground opacity-60">
            © {new Date().getFullYear()} Parker Gawryletz. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <NavLink to="/privacy-policy" className="text-muted-foreground opacity-60 hover:text-primary hover:opacity-100 transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="text-muted-foreground opacity-60 hover:text-primary hover:opacity-100 transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Terms
            </NavLink>
            <NavLink to="/cookie-policy" className="text-muted-foreground opacity-60 hover:text-primary hover:opacity-100 transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Cookies
            </NavLink>
            <NavLink to="/accessibility" className="text-muted-foreground opacity-60 hover:text-primary hover:opacity-100 transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Accessibility
            </NavLink>
          </div>
        </div>

        {/* === VeePo Attribution === */}
        <div
          className={cn(
            "text-center mt-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "550ms" : "0ms" }}
        >
          <a
            href="https://veepo.ca/case-studies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            This website locally powered by{" "}
            <span className="hover:text-primary transition-colors duration-[180ms]">
              veepo.ca
            </span>
          </a>
        </div>

        {/* === Closing Covenant Bookend — delay 600ms === */}
        <div
          data-footer-bookend
          className={cn(
            "mt-fitz-7 flex flex-col items-center gap-3 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "650ms" : "0ms" }}
        >
          {/* Mini golden thread echo — intensifies during arrival */}
          <div
            className={cn(
              "h-[1px] w-8",
              isArrival ? "footer-breathe" : ""
            )}
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.3' : '0.2'}), transparent)`,
              boxShadow: isArrival ? '0 0 6px hsl(var(--vow-yellow) / 0.12)' : 'none',
            }}
            aria-hidden="true"
          />
          {/* Three Tempos golden dot — 3s polyrhythm cycle, intensifies during arrival */}
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-700",
              isArrival ? "golden-dot-breathe-arrival" : "golden-dot-breathe"
            )}
            style={{
              background: `hsl(var(--vow-yellow) / ${isArrival ? '0.75' : '0.5'})`,
            }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-muted-foreground opacity-60 tracking-wide">
            'Til Death
            <span
              className="text-primary opacity-60"
              style={{
                animation: "semicolon-heartbeat 2s ease-in-out infinite",
              }}
            >
              {" ; "}
            </span>
            Unto Life.
          </p>
        </div>
      </div>

      {/* Mobile sticky bar spacer */}
      <div className="h-16 md:h-0" aria-hidden="true" />
    </footer>
  );
}
