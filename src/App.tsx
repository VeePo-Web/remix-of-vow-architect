import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { usePageTransition } from "@/hooks/usePageTransition";
import { RouteSeo } from "./components/RouteSeo";
import { PUBLIC_ROUTES } from "@/lib/publicRoutes";

import PublicLanding from "./pages/PublicLanding";
const PublicGallery = lazy(() => import("./pages/PublicGallery"));

const queryClient = new QueryClient();

function AppRoutes() {
  const { displayLocation } = usePageTransition();

  return (
    // null fallback: prerendered HTML is already visible; Suspense just
    // defers hydration until the lazy chunk arrives — no flash.
    <Suspense fallback={null}>
      <Routes location={displayLocation}>
        <Route path={PUBLIC_ROUTES[0]} element={<PublicLanding />} />
        <Route path={PUBLIC_ROUTES[1]} element={<PublicGallery />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <a
          href="#main-content"
          className="skip-to-main"
          onClick={(e) => {
            const main = document.querySelector('main');
            if (main) {
              e.preventDefault();
              if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
              main.focus({ preventScroll: false });
              setTimeout(() => main.removeAttribute('tabindex'), 1000);
            }
          }}
        >
          Skip to main content
        </a>
        <RouteSeo />
        <SmoothScrollProvider>
        <PageTransition>
          <AppRoutes />
        </PageTransition>
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
