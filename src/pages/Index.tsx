import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CinematicNav } from "@/components/CinematicNav";
import { CinematicScroll } from "@/components/VideoAct";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Index() {
  usePageTheme();
  const footerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [footerOpen, setFooterOpen] = useState(false);

  useEffect(() => {
    document.title = "Parker Gawryletz — Wedding Pianist, Calgary to Banff";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "I carry your vows so they can carry your guests. Custom ceremony piano from Calgary to Banff — every note crafted to honour your moment."
      );
  }, []);

  // Track scroll progress to show/hide footer toggle
  useEffect(() => {
    const onScroll = () => {
      const container = document.getElementById('weddings-cinema');
      const btn = toggleRef.current;
      if (!container || !btn) return;

      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      // Fade in from 0.95 to 1.0 — maps to opacity 0→1
      const fadeIn = Math.max(0, Math.min(1, (progress - 0.95) / 0.05));
      btn.style.opacity = String(fadeIn);
      btn.style.pointerEvents = fadeIn > 0.1 ? 'auto' : 'none';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFooter = useCallback(() => {
    if (footerOpen) {
      const cinema = document.getElementById('weddings-cinema');
      if (cinema) {
        const target = cinema.offsetTop + cinema.offsetHeight - window.innerHeight;
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      setTimeout(() => setFooterOpen(false), 600);
    } else {
      setFooterOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          footerRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  }, [footerOpen]);

  return (
    <div className="min-h-screen">
      <CinematicNav />

      <main>
        <CinematicScroll />
      </main>

      {/* Footer reveal button — fades in at 95%, full at 100% */}
      <button
        ref={toggleRef}
        onClick={toggleFooter}
        className="cinema-footer-toggle"
        aria-label={footerOpen ? 'Hide footer' : 'Show footer'}
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
          style={{ transform: footerOpen ? 'rotate(180deg)' : 'none', transition: 'transform 300ms ease' }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Footer — collapsed by default, expanded via button */}
      <div
        ref={footerRef}
        className="relative weddings-footer-wrapper"
        style={{
          maxHeight: footerOpen ? '1000px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 500ms ease',
          zIndex: 1,
        }}
      >
        <Footer />
      </div>
      <MobileStickyBar />
    </div>
  );
}
