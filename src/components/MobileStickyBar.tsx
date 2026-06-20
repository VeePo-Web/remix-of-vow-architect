import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { useBottomObstacle } from "@/hooks/useBottomObstacle";
import { scheduleRecompute } from "@/lib/mobileBottomObstacles";

// Vertical-aware page config with correct contact routing
function getPageConfig(pathname: string) {
  const isEvents = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');

  const contactHref = isEvents ? '/events/contact'
    : isTeaching ? '/teaching/contact'
    : '/contact';

  // Page-specific configs (checked before vertical defaults)
  // — Weddings vertical
  if (pathname === '/') {
    return { text: "Three paths, one pianist", cta: "Start a Conversation", contactHref: '/contact' };
  }
  if (pathname === '/weddings') {
    return { text: "I would be honored to be there", cta: "Reserve My Date", contactHref };
  }
  if (pathname === '/pricing') {
    return { text: "Find the right presence", cta: "Reserve My Date", contactHref };
  }
  if (pathname === '/about') {
    return { text: "The witness behind the keys", cta: "Reserve My Date", contactHref };
  }
  if (pathname === '/proof') {
    return { text: "500+ events performed", cta: "Reserve My Date", contactHref };
  }
  if (pathname === '/faq') {
    return { text: "Every question, answered", cta: "Reserve My Date", contactHref };
  }
  if (pathname === '/listen') {
    return { text: "Hear what your ceremony could sound like", cta: "Reserve My Date", contactHref };
  }

  // — Events vertical
  if (pathname === '/events/faq') {
    return { text: "Every detail, addressed", cta: "Discuss Your Event", contactHref };
  }
  if (pathname === '/events/pricing') {
    return { text: "Find the right package", cta: "Discuss Your Event", contactHref };
  }
  if (pathname === '/events/about') {
    return { text: "The listener behind the keys", cta: "Discuss Your Event", contactHref };
  }
  if (isEvents) {
    return { text: "Live piano for your gathering", cta: "Discuss Your Event", contactHref };
  }

  // — Teaching vertical
  if (pathname === '/teaching/faq') {
    return { text: "Questions every student asks", cta: "Begin the Conversation", contactHref };
  }
  if (pathname === '/teaching/pricing') {
    return { text: "Find the right lesson plan", cta: "Begin the Conversation", contactHref };
  }
  if (pathname === '/teaching/about') {
    return { text: "The mentor behind the keys", cta: "Begin the Conversation", contactHref };
  }
  if (isTeaching) {
    return { text: "Piano mentorship, your pace", cta: "Begin the Conversation", contactHref };
  }

  // Fallback
  return { text: "I would be honored to be there", cta: "Reserve My Date", contactHref };
}

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterCtaVisible, setIsFooterCtaVisible] = useState(false);
  const location = useLocation();
  const barRef = useRef<HTMLElement>(null);
  const progressThreadRef = useRef<HTMLDivElement>(null);

  // Hide entirely on contact pages
  const isContact = location.pathname.includes('/contact');
  // Hide on the cinematic scroll pages — their own CinematicNav owns the bottom CTA,
  // so the sticky bar would stack a second competing bottom bar. (D4)
  const isCinematic = location.pathname === '/weddings'
    || location.pathname === '/events'
    || location.pathname === '/teaching';

  // Scroll progress is driven by direct DOM mutation (no React re-render per frame),
  // and the whole handler is rAF-coalesced. Only the rare visibility flip uses state. (D6)
  useEffect(() => {
    let rafId = 0;
    let scheduled = false;
    let lastVisible = false;
    const compute = () => {
      scheduled = false;
      const y = window.scrollY;
      const visible = y > 220;
      if (visible !== lastVisible) {
        lastVisible = visible;
        setIsVisible(visible);
      }
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(y / docHeight, 1) : 0;
      const el = progressThreadRef.current;
      if (el) {
        el.style.width = `${p * 100}%`;
        el.style.boxShadow = p > 0.8 ? "0 0 8px hsl(36 60% 60% / 0.3)" : "none";
      }
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => { window.removeEventListener("scroll", schedule); cancelAnimationFrame(rafId); };
  }, []);

  // Broadcast visibility to body dataset so other floating elements (audio pill, etc.)
  // can fade out when the sticky bar takes over the bottom of the frame.
  useEffect(() => {
    const shown = isVisible && !isFooterCtaVisible && !isContact && !isCinematic;
    document.body.dataset.stickyVisible = shown ? '1' : '0';
    return () => { document.body.dataset.stickyVisible = '0'; };
  }, [isVisible, isFooterCtaVisible, isContact, isCinematic]);

  // Broadcast a separate flag for the final footer CTA, so floating elements
  // can fully hide (not just collapse) when the booking bookend takes over.
  useEffect(() => {
    document.body.dataset.footerCtaVisible = isFooterCtaVisible ? '1' : '0';
    return () => { document.body.dataset.footerCtaVisible = '0'; };
  }, [isFooterCtaVisible]);

  // Register as a bottom obstacle so floating UI lifts above us.
  const obstacleVisible = isVisible && !isFooterCtaVisible && !isContact && !isCinematic;
  useBottomObstacle(barRef as React.RefObject<HTMLElement>, obstacleVisible);
  // Recompute whenever the visibility transition begins/ends.
  useEffect(() => { scheduleRecompute(); }, [obstacleVisible]);

  // Fade out when footer CTA becomes visible
  useEffect(() => {
    const bookend = document.querySelector('[data-footer-bookend]');
    if (!bookend) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterCtaVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(bookend);
    return () => observer.disconnect();
  }, []);

  if (isContact || isCinematic) return null;

  const config = getPageConfig(location.pathname);

  return (
    <nav
      ref={barRef as React.RefObject<HTMLElement>}
      aria-label="Quick contact"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 overflow-hidden"
      style={{
        background: "hsl(var(--pricing-ivory-tint, 30 25% 97%) / 0.92)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderTop: "1px solid hsl(36 60% 60% / 0.28)",
        boxShadow: "none",
        paddingBottom: "env(safe-area-inset-bottom)",
        transform: isVisible && !isFooterCtaVisible ? 'translateY(0)' : 'translateY(100%)',
        opacity: isVisible && !isFooterCtaVisible ? 1 : 0,
        transition: "transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 260ms cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
    >
      {/* Golden scroll progress thread — width driven by direct DOM mutation (D6) */}
      <div
        ref={progressThreadRef}
        className="absolute top-0 left-0 h-[2px] pointer-events-none"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, hsl(36 60% 60% / 0.35), hsl(36 60% 60% / 0.7))",
          boxShadow: "none",
          transition: "width 100ms linear, box-shadow 400ms ease",
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-3 px-4 py-3">
        {/* Context text with golden diamond separator */}
        <div className="hidden min-[400px]:flex items-center gap-2.5 min-w-0 flex-1">
          <span
            className="inline-block w-1 h-1 rotate-45 flex-shrink-0"
            style={{
              background: 'hsl(36 60% 60% / 0.4)',
              boxShadow: '0 0 4px hsl(36 60% 60% / 0.15)',
            }}
            aria-hidden="true"
          />
          <span
            className="font-display text-[13px] leading-snug truncate"
            style={{ color: "hsl(var(--pricing-fg-secondary, 30 8% 45%))" }}
          >
            ★ 5.0 · Cochrane / Calgary
          </span>
        </div>
        <a
          href="tel:+14038308930"
          aria-label="Call +1-403-830-8930"
          className="mobile-sticky-phone flex-shrink-0 flex items-center justify-center"
          style={{
            width: 48, height: 48, borderRadius: 100,
            border: "1px solid hsl(30 10% 12% / 0.22)",
            color: "hsl(var(--pricing-fg-primary, 30 10% 12%))",
            transition: "transform 120ms ease",
          }}
        >
          <Phone size={16} strokeWidth={1.6} aria-hidden="true" />
        </a>
        <Link
          to={config.contactHref}
          className="mobile-sticky-cta flex-1 min-[400px]:flex-initial min-[400px]:flex-shrink-0 relative overflow-hidden group/cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            padding: "0 24px",
            borderRadius: "100px",
            background: "hsl(var(--pricing-fg-primary, 30 10% 12%))",
            color: "hsl(0 0% 100% / 0.95)",
            fontSize: "13px",
            fontFamily: "var(--font-sans, Inter, sans-serif)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap" as const,
            boxShadow: "0 0 0 1px hsl(36 60% 60% / 0.35)",
            transition: "transform 120ms ease, box-shadow 200ms ease",
          }}
        >
          {config.cta}
          {/* Shimmer sweep on the CTA */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 30%, hsl(0 0% 100% / 0.08) 45%, hsl(0 0% 100% / 0.12) 50%, hsl(0 0% 100% / 0.08) 55%, transparent 70%)',
              animation: 'mobile-cta-shimmer 4s ease-in-out infinite 2s',
            }}
            aria-hidden="true"
          />
        </Link>
      </div>

      <style>{`
        @keyframes mobile-cta-shimmer {
          0%, 85%, 100% { transform: translateX(-100%) skewX(-20deg); }
          90% { transform: translateX(400%) skewX(-20deg); }
        }
        .mobile-sticky-cta:active { transform: scale(0.97); box-shadow: 0 0 0 1px hsl(36 60% 60% / 0.7); }
        .mobile-sticky-phone:active { transform: scale(0.94); }
      `}</style>
    </nav>
  );
}
