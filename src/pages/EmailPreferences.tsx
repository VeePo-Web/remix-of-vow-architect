import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { usePageTheme } from "@/hooks/usePageTheme";
import { CheckCircle } from "lucide-react";

export default function EmailPreferences() {
  usePageTheme();
  
  const [preferences, setPreferences] = useState({
    guides: false,
    caseStudies: false,
    offers: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Legal", path: "/legal" },
              { label: "Email Preferences", path: "/email-preferences" },
            ]}
          />
          
          <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Email Preferences</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Choose what you want to hear about.
            </p>

            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="guides"
                  checked={preferences.guides}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, guides: checked as boolean })
                  }
                />
                <label
                  htmlFor="guides"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  Ceremony-audio guides & checklists
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="caseStudies"
                  checked={preferences.caseStudies}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, caseStudies: checked as boolean })
                  }
                />
                <label
                  htmlFor="caseStudies"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  Venue-specific case studies (Banff, Canmore, Cochrane)
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="offers"
                  checked={preferences.offers}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, offers: checked as boolean })
                  }
                />
                <label
                  htmlFor="offers"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  Occasional offers & updates
                </label>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
                  Save preferences
                </Button>
              </div>

              {saved && (
                <div className="flex items-center gap-2 text-green-500 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Preferences saved successfully</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-6 text-center">
              You'll only receive what you select. You can change this anytime.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
