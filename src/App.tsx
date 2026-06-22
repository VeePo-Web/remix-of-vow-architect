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
import AmbientAudioPill from "./components/AmbientAudioPill";
import { RouteSeo } from "./components/RouteSeo";

// Gateway is the entry-point — eager import so first paint has zero suspense delay
import Gateway from "./pages/Gateway";

// All other pages lazy-loaded: each route gets its own JS chunk, loaded on demand
const Index          = lazy(() => import("./pages/Index"));
const Events         = lazy(() => import("./pages/Events"));
const Teaching       = lazy(() => import("./pages/Teaching"));
const Pricing        = lazy(() => import("./pages/Pricing"));
const Proof          = lazy(() => import("./pages/Proof"));
const About          = lazy(() => import("./pages/About"));
const FAQ            = lazy(() => import("./pages/FAQ"));
const Contact        = lazy(() => import("./pages/Contact"));
const Listen         = lazy(() => import("./pages/Listen"));
const ServiceAreas   = lazy(() => import("./pages/ServiceAreas"));
const EventsAbout    = lazy(() => import("./pages/EventsAbout"));
const EventsPricing  = lazy(() => import("./pages/EventsPricing"));
const EventsContact  = lazy(() => import("./pages/EventsContact"));
const EventsFAQ      = lazy(() => import("./pages/EventsFAQ"));
const TeachingAbout  = lazy(() => import("./pages/TeachingAbout"));
const TeachingPricing = lazy(() => import("./pages/TeachingPricing"));
const TeachingContact = lazy(() => import("./pages/TeachingContact"));
const TeachingFAQ    = lazy(() => import("./pages/TeachingFAQ"));
const PrivacyPolicy  = lazy(() => import("./pages/PrivacyPolicy"));
const Terms          = lazy(() => import("./pages/Terms"));
const CookiePolicy   = lazy(() => import("./pages/CookiePolicy"));
const Accessibility  = lazy(() => import("./pages/Accessibility"));
const Legal          = lazy(() => import("./pages/Legal"));
const NotFound       = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AppRoutes() {
  const { displayLocation } = usePageTransition();

  return (
    // null fallback: prerendered HTML is already visible; Suspense just
    // defers hydration until the lazy chunk arrives — no flash.
    <Suspense fallback={null}>
      <Routes location={displayLocation}>
        <Route path="/"                    element={<Gateway />} />
        <Route path="/weddings"            element={<Index />} />
        <Route path="/teaching"            element={<Teaching />} />
        <Route path="/teaching/about"      element={<TeachingAbout />} />
        <Route path="/teaching/pricing"    element={<TeachingPricing />} />
        <Route path="/teaching/contact"    element={<TeachingContact />} />
        <Route path="/teaching/faq"        element={<TeachingFAQ />} />
        <Route path="/events"              element={<Events />} />
        <Route path="/events/about"        element={<EventsAbout />} />
        <Route path="/events/pricing"      element={<EventsPricing />} />
        <Route path="/events/contact"      element={<EventsContact />} />
        <Route path="/events/faq"          element={<EventsFAQ />} />
        <Route path="/pricing"             element={<Pricing />} />
        <Route path="/services"            element={<Navigate to="/pricing" replace />} />
        <Route path="/proof"               element={<Proof />} />
        <Route path="/gallery"             element={<Navigate to="/proof" replace />} />
        <Route path="/about"               element={<About />} />
        <Route path="/service-areas"       element={<ServiceAreas />} />
        <Route path="/service-areas/:city" element={<ServiceAreas />} />
        <Route path="/listen"              element={<Listen />} />
        <Route path="/faq"                 element={<FAQ />} />
        <Route path="/contact"             element={<Contact />} />
        <Route path="/privacy-policy"      element={<PrivacyPolicy />} />
        <Route path="/terms"               element={<Terms />} />
        <Route path="/cookie-policy"       element={<CookiePolicy />} />
        <Route path="/accessibility"       element={<Accessibility />} />
        <Route path="/legal"               element={<Legal />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*"                    element={<NotFound />} />
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
        <AmbientAudioPill />
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
