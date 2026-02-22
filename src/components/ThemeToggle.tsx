import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-lg border border-hairline bg-background flex items-center justify-center"
        aria-label="Toggle theme"
        disabled
      >
        <Moon size={18} className="text-muted-foreground" />
      </button>
    );
  }

  const isDeath = theme === "death";

  const handleToggle = () => {
    const newTheme = isDeath ? "life" : "death";
    setTheme(newTheme);
    localStorage.setItem("parker-gawryletz-theme-override", "true");
  };

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 rounded-lg border border-hairline bg-card hover:bg-accent/10 flex items-center justify-center transition-all duration-180 hover-scale focus-visible:ring-[3px] focus-visible:ring-primary/70 focus-visible:outline-none"
      aria-label={`Switch to ${isDeath ? "Life" : "Death"} theme`}
    >
      <div className="relative w-5 h-5">
        <Moon
          size={18}
          className={`absolute inset-0 transition-all duration-180 ${
            isDeath
              ? "opacity-100 rotate-0 text-muted-foreground"
              : "opacity-0 rotate-90 text-transparent"
          }`}
        />
        <Sun
          size={18}
          className={`absolute inset-0 transition-all duration-180 ${
            !isDeath
              ? "opacity-100 rotate-0 text-primary"
              : "opacity-0 -rotate-90 text-transparent"
          }`}
        />
      </div>
    </button>
  );
}
