import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { usePageTheme } from "@/hooks/usePageTheme";

const NotFound = () => {
  const location = useLocation();
  usePageTheme();

  useEffect(() => {
    document.title = "Page Not Found — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "This page could not be found. Return home or explore my offerings as a wedding pianist, private event pianist, and piano mentor.");
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col pricing-page">
      <PricingNav />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p
            className="text-[12px] font-medium uppercase tracking-[0.12em] mb-6"
            style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
          >
            404
          </p>
          <h1
            className="font-display font-semibold tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15 }}
          >
            This page could not be found.
          </h1>
          <p
            className="font-sans text-[15px] leading-[1.7] mb-14 max-w-sm mx-auto"
            style={{ color: "hsl(var(--pricing-fg-secondary))" }}
          >
            The page you are looking for no longer exists — or perhaps it never did. Let me guide you back.
          </p>

          <nav className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/"
              className="font-sans text-[14px] font-medium underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
              style={{ textDecorationColor: "hsl(36 16% 82%)" }}
            >
              Return home
            </Link>
            <Link
              to="/pricing"
              className="font-sans text-[14px] font-medium underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
              style={{ textDecorationColor: "hsl(36 16% 82%)" }}
            >
              Explore my offerings
            </Link>
            <Link
              to="/contact"
              className="font-sans text-[14px] font-medium underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
              style={{ textDecorationColor: "hsl(36 16% 82%)" }}
            >
              Start a conversation
            </Link>
          </nav>

          <div className="pricing-section__divider max-w-[80px] mx-auto" />

          <p
            className="font-display text-[14px] italic mt-8"
            style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
          >
            Every wrong turn still leads somewhere.
          </p>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default NotFound;
