import { Shield, Activity, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
          <Shield size={16} className="text-primary" />
          <span className="text-xs font-medium">Insured</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-primary" />
          <span className="text-xs font-medium">Logged</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-primary" />
          <span className="text-xs font-medium">Backups</span>
        </div>
      </div>
    </div>
  );
}
