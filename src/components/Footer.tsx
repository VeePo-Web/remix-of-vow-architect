import { NavLink } from "@/components/NavLink";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function Footer() {
  const { ref: footerRef, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <footer
      ref={footerRef}
      className="section--dark relative overflow-hidden pb-16 md:pb-0"
      aria-label="Site footer"
    >
      {/* === Atmospheric layers === */}
      <div
        className="grain pointer-events-none absolute inset-0 z-[1] opacity-[0.06]"
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
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto py-20 px-4 relative z-[2]">
        {/* Golden thread above content */}
        <div
          className="h-[1px] w-24 mx-auto mb-12 footer-breathe"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)",
            boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.1)",
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
            <div className="flex items-center gap-2">
              <a
                href="mailto:ParJorFraGaw@gmail.com"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] transition-all duration-[180ms] p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <span className="witness-kit-diamond inline-block w-[3px] h-[3px] rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="tel:+14038308930"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] transition-all duration-[180ms] p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
              <span className="witness-kit-diamond inline-block w-[3px] h-[3px] rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="https://instagram.com"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] transition-all duration-[180ms] p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <span className="witness-kit-diamond inline-block w-[3px] h-[3px] rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />
              <a
                href="https://youtube.com"
                className="text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] transition-all duration-[180ms] p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="YouTube"
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
            <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6 text-foreground/80">
              Navigate
            </h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/services" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                  Case Studies
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-foreground/50 hover:text-primary transition-all duration-[180ms] story-link">
                  Contact
                </NavLink>
              </li>
            </ul>
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
              <li>Banff, Alberta</li>
              <li>Calgary Region</li>
              <li>
                <a href="mailto:ParJorFraGaw@gmail.com" className="hover:text-primary transition-all duration-[180ms]">
                  ParJorFraGaw@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14038308930" className="hover:text-primary transition-all duration-[180ms]">
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

        {/* Bottom bar — delay 450ms */}
        <div
          className={cn(
            "flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
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
          className={cn(
            "mt-10 flex flex-col items-center gap-3 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "hsl(var(--vow-yellow) / 0.4)" }}
            aria-hidden="true"
          />
          <p className="font-display text-sm text-foreground/30 tracking-wide">
            'Til Death
            <span className="text-[hsl(var(--vow-yellow)/0.5)]">{" ; "}</span>
            Unto Life.
          </p>
        </div>
      </div>
    </footer>
  );
}
