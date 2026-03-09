import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function GoldDiamond() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rotate-45"
      style={{
        background: "hsl(var(--vow-yellow) / 0.7)",
        boxShadow: "0 0 4px hsl(var(--vow-yellow) / 0.2)",
      }}
      aria-hidden="true"
    />
  );
}

export function MobileTrustBar() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40 animate-slide-up-fade">
      <div className="flex items-center justify-center gap-6 py-3 px-4">
        <div className="flex items-center gap-2">
          <GoldDiamond />
          <span className="text-xs font-medium">Insured</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <GoldDiamond />
          <span className="text-xs font-medium">Logged</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <GoldDiamond />
          <span className="text-xs font-medium">Backups</span>
        </div>
      </div>
    </div>
  );
}
