import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
  breadcrumbs: Array<{ label: string; path: string }>;
}

export function PolicyLayout({ children, title, lastUpdated, breadcrumbs }: PolicyLayoutProps) {
  usePageTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Breadcrumbs items={breadcrumbs} />
          
          <article className="max-w-3xl mx-auto mt-8">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
              {children}
            </div>

            <footer className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Questions about this policy? Contact{" "}
                <a
                  href="mailto:ParJorFraGaw@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  ParJorFraGaw@gmail.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+14038308930"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  +1-403-830-8930
                </a>
              </p>
            </footer>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
