import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
  breadcrumbs: Array<{ label: string; path: string }>;
  metaDescription?: string;
}

export function PolicyLayout({ children, title, lastUpdated, breadcrumbs, metaDescription }: PolicyLayoutProps) {
  usePageTheme();
  useEffect(() => {
    document.title = `${title} — Parker Gawryletz`;
    if (metaDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", metaDescription);
    }
  }, [title, metaDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <MinimalHeader />

      {/* Grain overlay */}
      <div className="grain opacity-[0.04] pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />

      {/* Warm fog */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }}
        aria-hidden="true"
      />
      
      <main className="flex-1 relative z-[2]">
        <div className="container mx-auto px-4 py-8 md:py-12 pt-24">
          <Breadcrumbs items={breadcrumbs} />
          
          <article className="max-w-3xl mx-auto mt-8">
            <header className="mb-12">
              <h1 className="h1 mb-4">{title}</h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </header>

            <div className="prose dark:prose-invert prose-lg max-w-none">
              {children}
            </div>

            <footer className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Questions about this policy? Contact{" "}
                <a
                  href="mailto:parker@parkergawryletz.com"
                  className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm"
                >
                  parker@parkergawryletz.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+14038308930"
                  className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm"
                >
                  +1-403-830-8930
                </a>
              </p>
            </footer>
          </article>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
