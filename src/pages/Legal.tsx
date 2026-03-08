import { useEffect } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, FileText, Cookie, Eye } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

export default function Legal() {
  usePageTheme();
  useEffect(() => {
    document.title = "Legal & Policies — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Privacy, terms, cookies, and accessibility — every policy in plain language. Clarity before commitment.");
  }, []);

  const policies = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Privacy Policy",
      description: "How I collect, use, and protect your information.",
      link: "/privacy-policy",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Terms & Conditions",
      description: "How bookings and website use work, in plain English.",
      link: "/terms",
    },
    {
      icon: <Cookie className="w-8 h-8 text-primary" />,
      title: "Cookie Policy",
      description: "What cookies I use and how to manage them.",
      link: "/cookie-policy",
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: "Accessibility Statement",
      description: "How I make this site usable for everyone.",
      link: "/accessibility",
    },
  ];

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
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Legal", path: "/legal" },
            ]}
          />
          
          <div className="max-w-4xl mx-auto mt-8">
            <h1 className="h1">Legal & Policies</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Clarity before commitment — every policy, in plain language.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {policies.map((policy, index) => (
                <Link key={index} to={policy.link} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
                  <Card className="h-full hover:border-primary/20 transition-all duration-[180ms] cursor-pointer">
                    <CardHeader>
                      <div className="mb-4">{policy.icon}</div>
                      <CardTitle>{policy.title}</CardTitle>
                      <CardDescription>{policy.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Need something else?</CardTitle>
                <CardDescription>
                  Like a certificate of insurance for your venue or planner?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Email{" "}
                  <a
                    href="mailto:parker@parkergawryletz.com"
                    className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm"
                  >
                    parker@parkergawryletz.com
                  </a>
                  —I'll send what your venue or planner needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
