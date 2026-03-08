import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { DirectionalLink } from "@/components/DirectionalLink";
import { usePageTheme } from "@/hooks/usePageTheme";

const NotFound = () => {
  const location = useLocation();
  usePageTheme();

  useEffect(() => {
    document.title = "Page Not Found — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "This page could not be found. Return home or explore my offerings as a wedding pianist, private event pianist, and piano mentor.");
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <MinimalHeader />

      {/* Grain overlay */}
      <div className="grain opacity-[0.04] pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />

      {/* Warm fog */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }}
        aria-hidden="true"
      />
      
      <main className="flex-1 flex items-center justify-center relative z-[2]">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          {/* Brand-aligned 404 */}
          <p className="text-sm font-sans uppercase tracking-[0.22em] text-muted-foreground mb-6">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-light mb-6 leading-snug">
            This page has wandered beyond the threshold.
          </h1>
          <p className="text-base text-muted-foreground mb-12 leading-relaxed">
            The page you are looking for no longer exists—or perhaps it never did. Let me guide you back.
          </p>

          {/* Navigation links */}
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <DirectionalLink to="/">Return home</DirectionalLink>
            <DirectionalLink to="/weddings">Explore my offerings</DirectionalLink>
            <DirectionalLink to="/contact">Start a conversation</DirectionalLink>
          </nav>

          {/* Golden thread separator */}
          <div
            className="mx-auto h-[1px] w-24 mb-8"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }}
            aria-hidden="true"
          />

          {/* Covenant whisper */}
          <p className="text-xs text-muted-foreground font-display italic opacity-50">
            'Til Death; Unto Life.
          </p>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default NotFound;
