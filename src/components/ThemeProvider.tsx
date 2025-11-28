import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="death"
      themes={["death", "life"]}
      storageKey="parker-allard-theme"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
