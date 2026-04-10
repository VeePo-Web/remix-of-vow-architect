import { useEffect, useRef, useState, useCallback } from "react";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { TeachingCinematicNav } from "@/components/TeachingCinematicNav";
import { TeachingCinematicScroll } from "@/components/TeachingCinematicScroll";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function Teaching() {
  usePageTheme();
  const footerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [footerOpen, setFooterOpen] = useState(false);

  useEffect(() => {
    document.title = "Piano Mentorship — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Piano mentorship rooted in patience and musicality. From first notes to confident performance — learn at your own pace.");
  }, []);

  // Track scroll progress to show/hide footer toggle
  useEffect(() => {
    const onScroll = () => {
      const container = document.getElementById('teaching-cinema');
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
      const cinema = document.getElementById('teaching-cinema');
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
      <TeachingCinematicNav />

      <main>
        <TeachingCinematicScroll />
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
        className="relative"
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
