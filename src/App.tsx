import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { usePageTransition } from "@/hooks/usePageTransition";
import Gateway from "./pages/Gateway";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Teaching from "./pages/Teaching";
import Pricing from "./pages/Pricing";
import Proof from "./pages/Proof";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";
import Legal from "./pages/Legal";
import Listen from "./pages/Listen";
import EventsAbout from "./pages/EventsAbout";
import EventsPricing from "./pages/EventsPricing";
import EventsContact from "./pages/EventsContact";
import TeachingAbout from "./pages/TeachingAbout";
import TeachingPricing from "./pages/TeachingPricing";
import TeachingContact from "./pages/TeachingContact";
import EventsFAQ from "./pages/EventsFAQ";
import TeachingFAQ from "./pages/TeachingFAQ";
import NotFound from "./pages/NotFound";
import AmbientAudioPill from "./components/AmbientAudioPill";

const queryClient = new QueryClient();

function AppRoutes() {
  const { displayLocation } = usePageTransition();

  return (
    <Routes location={displayLocation}>
      <Route path="/" element={<Gateway />} />
      <Route path="/weddings" element={<Index />} />
      <Route path="/teaching" element={<Teaching />} />
      <Route path="/teaching/about" element={<TeachingAbout />} />
      <Route path="/teaching/pricing" element={<TeachingPricing />} />
      <Route path="/teaching/contact" element={<TeachingContact />} />
      <Route path="/teaching/faq" element={<TeachingFAQ />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/about" element={<EventsAbout />} />
      <Route path="/events/pricing" element={<EventsPricing />} />
      <Route path="/events/contact" element={<EventsContact />} />
      <Route path="/events/faq" element={<EventsFAQ />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/services" element={<Navigate to="/pricing" replace />} />
      <Route path="/proof" element={<Proof />} />
      <Route path="/gallery" element={<Navigate to="/proof" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/listen" element={<Listen />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/legal" element={<Legal />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
