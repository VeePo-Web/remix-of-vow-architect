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
    // Small delay to let DOM render
    const timer = setTimeout(() => {
      const bookend = document.querySelector('[data-footer-bookend]');
      if (!bookend) return;
      const observer = new IntersectionObserver(
        ([entry]) => setIsArrival(entry.isIntersecting),
        { threshold: 0.5 }
      );
      observer.observe(bookend);
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="section--dark relative overflow-hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Site footer"
    >
      {/* === Color bridge from CrossOver === */}
      <div className="footer-fade-bridge" aria-hidden="true" />

      {/* === Screen reader narrative === */}
      <span className="sr-only">Site footer with navigation, contact information, and social links</span>

      {/* === Atmospheric layers — warmth increases during arrival === */}
      <div
        className="grain pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{ opacity: isArrival ? 0.08 : 0.06 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(240 9% 2%) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background:
            `radial-gradient(ellipse at 50% 20%, hsl(var(--vow-yellow) / ${isArrival ? '0.03' : '0.015'}) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto py-20 px-4 relative z-[2]">
        {/* Golden thread above content — widened to 48px, brightens during arrival */}
        <div
          className="h-[1px] w-12 mx-auto mb-12 footer-breathe transition-opacity duration-700"
          style={{
            background:
              `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.35' : '0.25'}), transparent)`,
            boxShadow: `0 0 8px hsl(var(--vow-yellow) / ${isArrival ? '0.15' : '0.1'})`,
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
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
            <p className="font-display italic text-sm text-foreground/40 mt-1 mb-4">
              Wedding Pianist
            </p>
            <p className="text-foreground/70 mb-8 max-w-md leading-relaxed">
              I carry your vows so they can carry your guests.
            </p>
            {/* Social icons with spotlight hover */}
            <div className="group/icons flex items-center gap-4">
              <a
                href="mailto:parker@parkergawryletz.com"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Send me an email"
              >
                <Mail size={18} />
              </a>
              <span className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="tel:+14038308930"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Call me by phone"
              >
                <Phone size={18} />
              </a>
              <span className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="https://instagram.com"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Follow me on Instagram"
              >
                <Instagram size={18} />
              </a>
              <span className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="https://youtube.com"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Watch me on YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Navigate — delay 150ms */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            <nav aria-label="Footer navigation">
              <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6 text-foreground/80">
                Navigate
              </h4>
              <ul className="space-y-3">
                <li>
                  <NavLink to="/services" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                    Pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                    Proof
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                    FAQ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/listen" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                    Listen
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                    Contact
                  </NavLink>
                </li>
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
            <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6 text-foreground/80">
              Reach Me
            </h4>
            <ul className="space-y-3 text-foreground/50">
              <li>Calgary, Cochrane, Canmore and Okotoks</li>
              <li>
                <a href="mailto:parker@parkergawryletz.com" className="hover:text-primary transition-all duration-[180ms]" aria-label="Email me at parker@parkergawryletz.com">
                  parker@parkergawryletz.com
                </a>
              </li>
              <li>
                <a href="tel:+14038308930" className="hover:text-primary transition-all duration-[180ms]" aria-label="Call me at +1-403-830-8930">
                  +1-403-830-8930
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Golden thread separator */}
        <div
          className="h-[1px] w-full mt-16 mb-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15), transparent)",
            boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.1)",
          }}
          aria-hidden="true"
        />

        {/* === Subtle CTA — delay 400ms === */}
        <div
          className={cn(
            "flex flex-col items-center gap-4 mb-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <div
            className="pointer-events-none absolute w-[200px] h-[200px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-foreground/50">
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
          <p className="text-sm text-foreground/40">
            © {new Date().getFullYear()} Parker Gawryletz. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <NavLink to="/privacy-policy" className="text-foreground/40 hover:text-primary transition-all duration-[180ms]">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="text-foreground/40 hover:text-primary transition-all duration-[180ms]">
              Terms
            </NavLink>
            <NavLink to="/cookie-policy" className="text-foreground/40 hover:text-primary transition-all duration-[180ms]">
              Cookies
            </NavLink>
            <NavLink to="/accessibility" className="text-foreground/40 hover:text-primary transition-all duration-[180ms]">
              Accessibility
            </NavLink>
          </div>
        </div>

        {/* === Closing Covenant Bookend — delay 600ms === */}
        <div
          data-footer-bookend
          className={cn(
            "mt-10 flex flex-col items-center gap-3 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "650ms" : "0ms" }}
        >
          {/* Mini golden thread echo */}
          <div
            className="h-[1px] w-8 footer-breathe"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)",
            }}
            aria-hidden="true"
          />
          {/* Triple-glow dot — intensifies during arrival */}
          <div
            className="w-1.5 h-1.5 rounded-full transition-all duration-700"
            style={{
              background: `hsl(var(--vow-yellow) / ${isArrival ? '0.7' : '0.5'})`,
              boxShadow: isArrival
                ? "0 0 8px hsl(var(--vow-yellow) / 0.6), 0 0 18px hsl(var(--vow-yellow) / 0.35), 0 0 32px hsl(var(--vow-yellow) / 0.15)"
                : "0 0 6px hsl(var(--vow-yellow) / 0.5), 0 0 14px hsl(var(--vow-yellow) / 0.25), 0 0 24px hsl(var(--vow-yellow) / 0.1)",
            }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-foreground/40 tracking-wide">
            'Til Death
            <span
              className="text-[hsl(var(--vow-yellow)/0.6)]"
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
