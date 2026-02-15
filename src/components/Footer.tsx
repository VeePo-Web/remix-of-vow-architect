import { NavLink } from "@/components/NavLink";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="section--dark border-t border-lines">
      <div className="container mx-auto py-20 px-4">
        {/* Golden thread above content */}
        <div 
          className="h-[1px] w-24 mx-auto mb-16"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.25), transparent)"
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-light mb-4 text-foreground">Parker Allard</h3>
            <p className="text-foreground/70 mb-8 max-w-md leading-relaxed">
              I carry your vows so they can carry your guests.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:ParJorFraGaw@gmail.com"
                className="text-foreground/50 hover:text-primary transition-colors duration-300 p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+14038308930"
                className="text-foreground/50 hover:text-primary transition-colors duration-300 p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-foreground/50 hover:text-primary transition-colors duration-300 p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-foreground/50 hover:text-primary transition-colors duration-300 p-3 -m-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.22em] mb-6 text-foreground/80">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/pricing" className="text-foreground/50 hover:text-primary transition-colors duration-300 story-link">
                  Pricing & Packages
                </NavLink>
              </li>
              <li>
                <NavLink to="/banff-mode" className="text-foreground/50 hover:text-primary transition-colors duration-300 story-link">
                  Banff Mode™
                </NavLink>
              </li>
              <li>
                <NavLink to="/proof" className="text-foreground/50 hover:text-primary transition-colors duration-300 story-link">
                  Proof & Trust
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="text-foreground/50 hover:text-primary transition-colors duration-300 story-link">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="text-foreground/50 hover:text-primary transition-colors duration-300 story-link">
                  Blog / Guides
                </NavLink>
              </li>
              <li>
                <NavLink to="/resources" className="text-foreground/50 hover:text-primary transition-colors duration-300 story-link">
                  Resources / Downloads
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.22em] mb-6 text-foreground/80">Contact</h4>
            <ul className="space-y-3 text-foreground/50">
              <li>Banff, Alberta</li>
              <li>Calgary Region</li>
              <li>
                <a href="mailto:ParJorFraGaw@gmail.com" className="hover:text-primary transition-colors duration-300">
                  ParJorFraGaw@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14038308930" className="hover:text-primary transition-colors duration-300">
                  +1-403-830-8930
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Golden thread separator */}
        <div 
          className="h-[1px] w-full mt-16 mb-10"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15), transparent)"
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            © {new Date().getFullYear()} Parker Allard. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <NavLink to="/privacy-policy" className="text-foreground/40 hover:text-primary transition-colors duration-300">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="text-foreground/40 hover:text-primary transition-colors duration-300">
              Terms
            </NavLink>
            <NavLink to="/cookie-policy" className="text-foreground/40 hover:text-primary transition-colors duration-300">
              Cookies
            </NavLink>
            <NavLink to="/accessibility" className="text-foreground/40 hover:text-primary transition-colors duration-300">
              Accessibility
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
