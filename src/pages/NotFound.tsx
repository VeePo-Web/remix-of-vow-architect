import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Home, DollarSign, Phone, Shield } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";

const NotFound = () => {
  const location = useLocation();
  usePageTheme();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            This page can't be found — but your ceremony-audio plan can.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. Try one of these popular pages instead.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/">
                <Home className="w-6 h-6" />
                <span>Home</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/pricing">
                <DollarSign className="w-6 h-6" />
                <span>Pricing</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/contact">
                <Phone className="w-6 h-6" />
                <span>Contact</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/banff-mode">
                <Shield className="w-6 h-6" />
                <span>Banff Mode™</span>
              </Link>
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">What makes ceremony audio reliable?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ Officiant mic included</li>
              <li>✓ Silent battery power</li>
              <li>✓ Banff Mode compliant</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
