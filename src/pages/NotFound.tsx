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
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <MinimalHeader />

      {/* Grain overlay */}
      <div className="grain opacity-[0.04] pointer-events-none fixed inset-0 z-[1]" style={{ willChange: "opacity" }} aria-hidden="true" />

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
            <DirectionalLink to="/services">View services</DirectionalLink>
            <DirectionalLink to="/contact">Hold my date</DirectionalLink>
          </nav>

          {/* Golden thread separator */}
          <div
            className="mx-auto h-[1px] w-24 mb-8"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }}
            aria-hidden="true"
          />

          {/* Covenant whisper */}
          <p className="text-xs text-muted-foreground/50 font-display italic">
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
