import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NavLink } from "@/components/NavLink";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function Sitemap() {
  usePageTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Sitemap", path: "/sitemap" },
            ]}
          />
          
          <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Complete navigation for all pages and resources.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                  Ceremony Clarity
                </h2>
                <ul className="space-y-2">
                  <li>
                    <NavLink to="/" className="text-muted-foreground hover:text-primary">
                      Home / Assured Ceremony Audio
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/pricing" className="text-muted-foreground hover:text-primary">
                      Pricing & Packages
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/banff-mode" className="text-muted-foreground hover:text-primary">
                      Banff Mode™ Explained
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/proof" className="text-muted-foreground hover:text-primary">
                      Proof & Trust
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/faq" className="text-muted-foreground hover:text-primary">
                      FAQ / Risk Elimination
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/resources" className="text-muted-foreground hover:text-primary">
                      Resources / Downloads
                    </NavLink>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                  About & Booking
                </h2>
                <ul className="space-y-2">
                  <li>
                    <NavLink to="/about" className="text-muted-foreground hover:text-primary">
                      About Parker
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className="text-muted-foreground hover:text-primary">
                      Contact / Hold Your Date
                    </NavLink>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                  Planning Guides
                </h2>
                <ul className="space-y-2">
                  <li>
                    <NavLink to="/blog" className="text-muted-foreground hover:text-primary">
                      Blog / Guides
                    </NavLink>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                  Legal & Policies
                </h2>
                <ul className="space-y-2">
                  <li>
                    <NavLink to="/privacy-policy" className="text-muted-foreground hover:text-primary">
                      Privacy Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/terms" className="text-muted-foreground hover:text-primary">
                      Terms & Conditions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cookie-policy" className="text-muted-foreground hover:text-primary">
                      Cookie Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/accessibility" className="text-muted-foreground hover:text-primary">
                      Accessibility
                    </NavLink>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
