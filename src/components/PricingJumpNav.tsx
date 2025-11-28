import { useEffect, useState } from "react";

const navItems = [
  { id: "packages", label: "Packages" },
  { id: "compare", label: "Compare Vendors" },
  { id: "addons", label: "Add-ons" },
  { id: "faqs", label: "FAQs" },
  { id: "download", label: "Download Sample Plan" },
];

export function PricingJumpNav() {
  const [activeId, setActiveId] = useState("packages");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border mb-12">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3 snap-x snap-mandatory">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap snap-start transition-all ${
                activeId === item.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
