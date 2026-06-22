import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CinematicNav } from "@/components/CinematicNav";
import { CinematicScroll } from "@/components/VideoAct";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useEffect } from "react";

export default function Index() {
  usePageTheme();

  useEffect(() => {
    document.title = "Parker Gawryletz — Wedding Pianist, Southern Alberta";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "I carry your vows so they can carry your guests. Custom ceremony piano across Southern Alberta — every note crafted to honour your moment."
      );
  }, []);

  return (
    <div className="min-h-screen">
      <CinematicNav />

      <main id="main-content">
        <CinematicScroll />
      </main>

      {/* Footer — visible by default so contact, hours, social links are reachable */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Footer />
      </div>
      <MobileStickyBar />
    </div>
  );
}
