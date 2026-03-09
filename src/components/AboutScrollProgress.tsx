import { useEffect, useState } from "react";

/**
 * Vertical golden thread scroll progress indicator
 * Grows from top to bottom as user scrolls through About pages
 * Hidden on mobile to avoid clutter
 */
export function AboutScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(100, (scrolled / height) * 100);
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed left-8 top-1/4 bottom-1/4 w-px bg-primary/10 z-50 hidden md:block"
      aria-hidden="true"
    >
      <div 
        className="w-px bg-primary transition-all duration-150 ease-out"
        style={{ 
          height: `${progress}%`,
          boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.5)'
        }}
      />
    </div>
  );
}
