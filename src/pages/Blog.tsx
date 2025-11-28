import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogSearch } from "@/components/BlogSearch";
import { BlogFeaturedTrio } from "@/components/BlogFeaturedTrio";
import { BlogTopicGrid } from "@/components/BlogTopicGrid";
import { BlogArticleStructure } from "@/components/BlogArticleStructure";
import { BlogSidebarOffer } from "@/components/BlogSidebarOffer";
import { BlogTrustFooter } from "@/components/BlogTrustFooter";

export default function Blog() {
  usePageTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding grain">
        {/* Section 1: Page Header */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs 
              items={[
                { label: "Home", path: "/" },
                { label: "Blog / Planning Guides" },
              ]} 
            />

            <div className="mb-12 animate-fade-in text-center">
              <div className="overline mb-2">Blog / Planning Guides</div>
              <h1 className="mx-auto mb-6">
                Wedding Planning Clarity — From the Ceremony Sound Authority
              </h1>
              <p className="lead mx-auto text-muted-foreground max-w-3xl">
                I share field-tested guides on mic'ing outdoor vows, Banff venue rules, SPL-by-law compliance, and fail-safe setups—so your ceremony sounds as beautiful as it feels.
              </p>
            </div>

            <BlogSearch />
          </div>
        </div>

        {/* Section 2: Featured Content Cards (Hero Trio) */}
        <div className="bg-muted/30 py-16 mt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <BlogFeaturedTrio />
            </div>
          </div>
        </div>

        {/* Section 3: Topic Grid + Sidebar Offer */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content: Topic Grid */}
              <div className="lg:col-span-2">
                <BlogTopicGrid />
              </div>

              {/* Sidebar: Lead Capture */}
              <div className="hidden lg:block">
                <BlogSidebarOffer variant="sticky" />
              </div>
            </div>

            {/* Mobile Inline Offer */}
            <div className="lg:hidden mt-12">
              <BlogSidebarOffer variant="inline" />
            </div>
          </div>
        </div>

        {/* Section 4: Article Structure */}
        <div className="bg-muted/30">
          <BlogArticleStructure />
        </div>

        {/* Section 6: Trust Footer */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <BlogTrustFooter />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
