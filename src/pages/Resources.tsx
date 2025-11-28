import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResourcesLeadMagnet } from "@/components/ResourcesLeadMagnet";
import { ResourcesFeaturedDownloads } from "@/components/ResourcesFeaturedDownloads";
import { ResourcesPlannerModule } from "@/components/ResourcesPlannerModule";
import { ResourcesFinalCTA } from "@/components/ResourcesFinalCTA";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function Resources() {
  usePageTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="grain">
        {/* Section 1: Page Introduction */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Breadcrumbs 
                items={[
                  { label: "Home", path: "/" },
                  { label: "Resources / Downloads" }
                ]} 
              />
              
              <div className="mb-16 animate-fade-in text-center">
                <div className="overline mb-2">Resources / Downloads</div>
                <h1 className="mx-auto mb-6">
                  Download tools that make ceremony planning safer, easier & compliant
                </h1>
                <div className="chapter-rule mx-auto mb-6" />
                <p className="lead mx-auto text-muted-foreground max-w-3xl">
                  I share the exact SPL logs, cue sheets, and checklists I use at real weddings—so you can plan with confidence, not guesswork.
                </p>
                <p className="text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
                  <strong>Planners:</strong> share with clients. <strong>Couples:</strong> use to build clarity. <strong>Venues:</strong> keep on file for pre-approvals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Lead Magnet (Soft Conversion) */}
        <section className="section-padding bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ResourcesLeadMagnet />
            </div>
          </div>
        </section>

        {/* Section 3: Featured Downloads */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Ceremony Planning Tools That Remove Risk</h2>
                <div className="chapter-rule mx-auto mb-6" />
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Used by top planners and trusted by venues across Alberta. These are the real tools I use to eliminate audio uncertainty—before the day even starts.
                </p>
              </div>
              <ResourcesFeaturedDownloads />
            </div>
          </div>
        </section>

        {/* Section 4: Planner Sharing Module */}
        <ResourcesPlannerModule />

        {/* Section 5: Final CTA (Clarity Loop) */}
        <ResourcesFinalCTA />
      </main>

      <Footer />
    </div>
  );
}
