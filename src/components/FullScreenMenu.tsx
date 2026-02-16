import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "Services", href: "/services" },
  { number: "03", label: "About", href: "/about" },
  { number: "04", label: "Gallery", href: "/gallery" },
  { number: "05", label: "FAQ", href: "/faq" },
  { number: "06", label: "Contact", href: "/contact" },
];

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-[hsl(var(--vigil-void))] transition-opacity duration-500",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className={cn(
          "fixed top-8 right-8 flex items-center gap-2 group transition-all duration-300",
          isOpen ? "opacity-100 delay-300" : "opacity-0"
        )}
        aria-label="Close menu"
      >
        <span className="text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground group-hover:text-accent transition-colors duration-300">
          Close
        </span>
        <X size={20} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
      </button>

      {/* Menu Content */}
      <div className="flex flex-col justify-center items-start min-h-screen px-8 md:px-16 lg:px-24">
        <nav className="space-y-6 md:space-y-8">
          {menuItems.map((item, index) => (
            <a
              key={item.number}
              href={item.href}
              className={cn(
                "flex items-baseline gap-6 group transition-all duration-300",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isOpen ? `${300 + index * 50}ms` : "0ms",
              }}
              onClick={onClose}
            >
              <span className="text-xs font-sans text-muted-foreground/50 min-w-[2ch]">
                {item.number}
              </span>
              <span className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground group-hover:text-accent transition-colors duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Contact Info */}
        <div
          className={cn(
            "mt-16 space-y-2 text-sm text-muted-foreground transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-4"
          )}
        >
          <p>Calgary, Cochrane, Canmore & Banff</p>
          <p>
            <a href="mailto:parker@parkerallard.com" className="hover:text-accent transition-colors">
              parker@parkerallard.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
