import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

export default function UnsubscribeConfirmed() {
  usePageTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Legal", path: "/legal" },
              { label: "Unsubscribe", path: "/unsubscribe-confirmed" },
            ]}
          />
          
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">You've been unsubscribed</h1>
            <p className="text-lg text-muted-foreground mb-12">
              You won't receive planning emails from me, but you can still access free resources anytime.
            </p>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Still need ceremony-audio resources?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link to="/blog">Blog / Guides</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources">Resources / Downloads</Link>
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Changed your mind?{" "}
              <Link to="/email-preferences" className="text-primary hover:text-primary/80 underline">
                Resubscribe
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
