import { NavLink } from "@/components/NavLink";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="section--dark border-t border-lines">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-ink-inverse">Parker Allard</h3>
            <p className="text-ink-inverse/70 mb-6 max-w-md">
              I carry your vows so they can carry your guests.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:ParJorFraGaw@gmail.com"
                className="text-ink-inverse/70 hover:text-ink-inverse transition-colors p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+14038308930"
                className="text-ink-inverse/70 hover:text-ink-inverse transition-colors p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-ink-inverse/70 hover:text-ink-inverse transition-colors p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-ink-inverse/70 hover:text-ink-inverse transition-colors p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-ink-inverse">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/pricing"
                  className="text-ink-inverse/70 hover:text-ink-inverse transition-colors"
                >
                  Pricing & Packages
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/banff-mode"
                  className="text-ink-inverse/70 hover:text-ink-inverse transition-colors"
                >
                  Banff Mode™
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/proof"
                  className="text-ink-inverse/70 hover:text-ink-inverse transition-colors"
                >
                  Proof & Trust
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className="text-ink-inverse/70 hover:text-ink-inverse transition-colors"
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="text-ink-inverse/70 hover:text-ink-inverse transition-colors"
                >
                  Blog / Guides
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/resources"
                  className="text-ink-inverse/70 hover:text-ink-inverse transition-colors"
                >
                  Resources / Downloads
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-ink-inverse">Contact</h4>
            <ul className="space-y-2 text-ink-inverse/70">
              <li>Banff, Alberta</li>
              <li>Calgary Region</li>
              <li>
                <a
                  href="mailto:ParJorFraGaw@gmail.com"
                  className="hover:text-ink-inverse transition-colors"
                >
                  ParJorFraGaw@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14038308930"
                  className="hover:text-ink-inverse transition-colors"
                >
                  +1-403-830-8930
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-lines flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink-inverse/70">
            © {new Date().getFullYear()} Parker Allard. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <NavLink to="/privacy-policy" className="text-ink-inverse/70 hover:text-ink-inverse transition-colors">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="text-ink-inverse/70 hover:text-ink-inverse transition-colors">
              Terms
            </NavLink>
            <NavLink to="/cookie-policy" className="text-ink-inverse/70 hover:text-ink-inverse transition-colors">
              Cookies
            </NavLink>
            <NavLink to="/accessibility" className="text-ink-inverse/70 hover:text-ink-inverse transition-colors">
              Accessibility
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
