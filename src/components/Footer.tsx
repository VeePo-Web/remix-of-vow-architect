import { NavLink } from "@/components/NavLink";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Parker Allard</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Ceremony piano, engineered for vows. Impeccable sound. Immaculate timing.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:hello@parkerallard.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+1234567890"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing & Packages
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/banff-mode"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Banff Mode™
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/proof"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Proof & Trust
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog / Guides
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Resources / Downloads
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Banff, Alberta</li>
              <li>Calgary Region</li>
              <li>
                <a
                  href="mailto:hello@parkerallard.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@parkerallard.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary transition-colors"
                >
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Parker Allard. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
