import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FullScreenMenu } from "./FullScreenMenu";

function getNavLinks(pathname: string) {
  const isEvents = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');

  const pricingTo = isEvents ? '/events/pricing'
    : isTeaching ? '/teaching/pricing'
    : '/pricing';
  const aboutTo = isEvents ? '/events/about'
    : isTeaching ? '/teaching/about'
    : '/about';
  const faqTo = isEvents ? '/events/faq'
    : isTeaching ? '/teaching/faq'
    : '/faq';

  const servicesLabel = isEvents ? 'Packages' : isTeaching ? 'Lessons' : 'Services';

  const links = [
    { to: pricingTo, label: servicesLabel },
    { to: aboutTo, label: "About" },
  ];

  // Proof is weddings-exclusive
  if (!isEvents && !isTeaching) {
    links.push({ to: "/proof", label: "Proof" });
  }

  links.push({ to: faqTo, label: "FAQ" });

  return links;
}

/**
 * PricingNav — Apple-style clean navigation for pricing pages.
 * No atmospheric layers, no film grain, no vine threads.
 * Frosted glass on scroll, clean typography, premium restraint.
 */
export function PricingNav() {
  const { pathname } = useLocation();
  const navLinks = getNavLinks(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const rafRef = useRef(0);

  const ctaLabel = (() => {
    if (pathname.includes('/contact')) return "You're here";
    if (pathname.startsWith('/teaching')) return 'Begin the Conversation';
    if (pathname.startsWith('/events')) return 'Discuss Your Event';
    return 'Reserve My Date!';
  })();

  const ctaTo = (() => {
    if (pathname.startsWith('/teaching')) return '/teaching/contact';
    if (pathname.startsWith('/events')) return '/events/contact';
    return '/contact';
  })();

  const updateScroll = useCallback(() => {
    const y = window.scrollY;
    setIsScrolled(y > 20);

    if (y > 300) {
      if (y > lastScrollY.current + 5 && !isHidden) setIsHidden(true);
      else if (y < lastScrollY.current - 5 && isHidden) setIsHidden(false);
    } else {
      if (isHidden) setIsHidden(false);
    }
    lastScrollY.current = y;
  }, [isHidden]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateScroll]);

  return (
    <>
      <header
        className={cn("pricing-nav", isScrolled && "pricing-nav--scrolled")}
        style={{
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="pricing-nav__inner">
          {/* Logo */}
          <NavLink to="/" className="pricing-nav__logo">
            <img
              src="/logos/nav-dark.png"
              alt="Parker Gawryletz"
              className="h-[18px] w-auto"
            />
          </NavLink>

          {/* Center nav links — desktop */}
          <nav className="pricing-nav__links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn("pricing-nav__link", isActive && "pricing-nav__link--active")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: CTA + Menu */}
          <div className="pricing-nav__right">
            <NavLink to={ctaTo} className="pricing-nav__cta">
              {ctaLabel}
            </NavLink>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="pricing-nav__menu"
              aria-label="Open menu"
            >
              <span className="pricing-nav__menu-label">Menu</span>
              <div className="pricing-nav__hamburger" aria-hidden="true">
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>
      </header>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
