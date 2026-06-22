import { X } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { usePageTransition } from "@/hooks/usePageTransition";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const verticals = [
  { label: "Weddings",       href: "/weddings",  base: "/weddings"  },
  { label: "Private Events", href: "/events",    base: "/events"    },
  { label: "Piano Lessons",  href: "/teaching",  base: "/teaching"  },
];

function getNavLinks(pathname: string) {
  const isEvents   = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');
  const links = [
    {
      label: isEvents ? 'Packages' : isTeaching ? 'Lessons' : 'Pricing',
      href:  isEvents ? '/events/pricing' : isTeaching ? '/teaching/pricing' : '/pricing',
    },
    { label: 'About',  href: isEvents ? '/events/about'  : isTeaching ? '/teaching/about'  : '/about'  },
  ];
  if (!isEvents && !isTeaching) links.push({ label: 'Reviews', href: '/proof' });
  links.push(
    { label: 'FAQ',    href: isEvents ? '/events/faq'    : isTeaching ? '/teaching/faq'    : '/faq'    },
    { label: 'Music Samples', href: '/listen' },
  );
  return links;
}

function getActiveVertical(pathname: string) {
  if (pathname.startsWith('/events'))   return '/events';
  if (pathname.startsWith('/teaching')) return '/teaching';
  return '/weddings';
}

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuRef  = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const lenis    = useSmoothScroll();
  const { navigateWithTransition } = usePageTransition();

  const navLinks   = getNavLinks(location.pathname);
  const activeBase = getActiveVertical(location.pathname);

  useEffect(() => {
    if (!lenis) return;
    isOpen ? lenis.stop() : lenis.start();
  }, [isOpen, lenis]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const els = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
    };
    window.addEventListener('keydown', trap);
    first.focus();
    return () => window.removeEventListener('keydown', trap);
  }, [isOpen]);

  const handleNav = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    if (href !== location.pathname) navigateWithTransition(href);
  }, [onClose, location.pathname, navigateWithTransition]);

  const handleVertical = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    navigateWithTransition(href);
  }, [onClose, navigateWithTransition]);

  const contactHref =
    location.pathname.startsWith('/events')   ? '/events/contact'   :
    location.pathname.startsWith('/teaching') ? '/teaching/contact' :
    '/contact';
  const contactLabel =
    location.pathname.startsWith('/events')   ? 'Discuss Your Event'     :
    location.pathname.startsWith('/teaching') ? 'Begin the Conversation' :
    'Reserve My Date';

  return (
    <>
      <style>{`
        .fsmenu-link {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(32px, 4.6vw, 52px);
          font-weight: 400;
          letter-spacing: -0.023em;
          line-height: 1.2;
          text-decoration: none;
          color: hsl(0 0% 100% / 0.52);
          transition: color 80ms ease;
          outline: none;
        }
        .fsmenu-link:hover,
        .fsmenu-link:focus-visible { color: hsl(0 0% 100% / 0.94); }
        .fsmenu-link.is-active      { color: hsl(0 0% 100% / 0.88); }

        .fsmenu-contact {
          display: inline-block;
          font-family: var(--font-display);
          font-size: clamp(15px, 2vw, 22px);
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.3;
          text-decoration: none;
          color: hsl(var(--vow-yellow) / 0.50);
          transition: color 80ms ease;
          outline: none;
        }
        .fsmenu-contact:hover,
        .fsmenu-contact:focus-visible { color: hsl(var(--vow-yellow) / 0.88); }

        .fsmenu-vertical {
          font-family: var(--font-sans);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          outline: none;
        }
        .fsmenu-vertical.is-current { color: hsl(0 0% 100% / 0.26); cursor: default; }
        .fsmenu-vertical:not(.is-current) {
          color: hsl(0 0% 100% / 0.14);
          transition: color 100ms ease;
        }
        .fsmenu-vertical:not(.is-current):hover,
        .fsmenu-vertical:not(.is-current):focus-visible { color: hsl(0 0% 100% / 0.40); outline: none; }

        .fsmenu-close {
          position: absolute;
          top: 22px; right: 22px;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          background: transparent; border: none;
          color: hsl(0 0% 100% / 0.22);
          cursor: pointer; outline: none;
          transition: color 100ms ease;
        }
        .fsmenu-close:hover,
        .fsmenu-close:focus-visible { color: hsl(0 0% 100% / 0.62); }

        @media (prefers-reduced-motion: reduce) {
          .fsmenu-link, .fsmenu-contact, .fsmenu-vertical, .fsmenu-close {
            transition-duration: 0ms !important;
          }
        }
      `}</style>

      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        data-theme="death"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        100,
          background:    'hsl(var(--vigil-void))',
          opacity:       isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition:    `opacity ${isOpen ? 220 : 160}ms ease`,
        }}
      >
        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none" style={{ opacity: 0.05 }} aria-hidden="true" />

        {/* Close */}
        <button onClick={onClose} aria-label="Close menu" className="fsmenu-close">
          <X size={17} strokeWidth={1.2} />
        </button>

        {/* Content */}
        <div
          style={{
            position:    'absolute',
            inset:       0,
            display:     'flex',
            alignItems:  'center',
            paddingLeft: 'clamp(40px, 9vw, 120px)',
          }}
        >
          <div>

            {/* Primary links */}
            <nav aria-label="Site navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                  (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <div key={link.label} style={{ lineHeight: 1 }}>
                    <Link
                      to={link.href}
                      onClick={e => handleNav(e, link.href)}
                      className={`fsmenu-link${isActive ? ' is-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Contact */}
            <div style={{ marginTop: 'clamp(22px, 3vw, 36px)' }}>
              <Link
                to={contactHref}
                onClick={e => handleNav(e, contactHref)}
                className="fsmenu-contact"
              >
                {contactLabel}
              </Link>
            </div>

            {/* Vertical switcher */}
            <div
              style={{
                marginTop:  'clamp(32px, 5vw, 52px)',
                display:    'flex',
                alignItems: 'center',
                gap:        '18px',
              }}
            >
              {verticals.map((v, i) => {
                const isCurrent = v.base === activeBase;
                return (
                  <span key={v.base} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        style={{ width: '1px', height: '8px', background: 'hsl(0 0% 100% / 0.10)', flexShrink: 0 }}
                      />
                    )}
                    {isCurrent ? (
                      <span className="fsmenu-vertical is-current" aria-current="true">{v.label}</span>
                    ) : (
                      <Link
                        to={v.href}
                        onClick={e => handleVertical(e, v.href)}
                        className="fsmenu-vertical"
                      >
                        {v.label}
                      </Link>
                    )}
                  </span>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
