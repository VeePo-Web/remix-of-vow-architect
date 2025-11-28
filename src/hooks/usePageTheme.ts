import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

const lifeThemeRoutes = ["/pricing", "/gallery", "/contact"];
const deathThemeRoutes = ["/", "/about", "/blog", "/proof", "/faq", "/banff-mode", "/resources"];

export function usePageTheme() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const userOverride = localStorage.getItem("parker-allard-theme-override");
    
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
