import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

const lifeThemeRoutes = ["/pricing", "/gallery"];
const deathThemeRoutes = ["/", "/weddings", "/teaching", "/events", "/about", "/proof", "/faq", "/contact", "/listen", "/privacy-policy", "/terms", "/cookie-policy", "/accessibility", "/legal"];

export function usePageTheme() {
  const location = useLocation();
  const themeContext = useTheme();
  
  // Guard against undefined context
  if (!themeContext || !themeContext.setTheme) {
    return;
  }
  
  const { theme, setTheme } = themeContext;

  useEffect(() => {
    const userOverride = localStorage.getItem("parker-gawryletz-theme-override");
    
    if (userOverride) {
      return;
    }

    const currentPath = location.pathname;

    if (lifeThemeRoutes.includes(currentPath)) {
      if (theme !== "life") {
        setTheme("life");
      }
    } else if (deathThemeRoutes.includes(currentPath)) {
      if (theme !== "death") {
        setTheme("death");
      }
    }
  }, [location.pathname, theme, setTheme]);
}
