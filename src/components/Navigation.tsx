import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getScrolledBackground = () => {
    if (!isScrolled) return "bg-transparent";
    if (theme === "life") {
      return "bg-[rgba(242,243,245,0.92)] backdrop-blur-md shadow-lg";
    }
    return "bg-[rgba(10,10,12,0.82)] backdrop-blur-md shadow-lg";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-240 ${getScrolledBackground()}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold">
            Parker Allard
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative"
                activeClassName="text-foreground after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
            <Button size="sm" className="hover-scale">
              Check Availability
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-2 py-1"
                  activeClassName="text-foreground font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <ThemeToggle />
                <Button className="flex-1">Check Availability</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
