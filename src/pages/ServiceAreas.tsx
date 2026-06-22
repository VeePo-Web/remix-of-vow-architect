import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";
import { SERVICE_AREAS, getServiceArea } from "@/config/serviceAreas";

function Shell({ children }: { children: React.ReactNode }) {
  usePageTheme();
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <MinimalHeader />
      <div className="grain opacity-[0.04] pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }}
        aria-hidden="true"
      />
      <main id="main-content" className="flex-1 relative z-[2]">
        <div className="container mx-auto px-4 py-8 md:py-12 pt-24">{children}</div>
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

function Hub() {
  useEffect(() => {
    document.title = "Service Areas — Wedding Pianist Across Southern Alberta | Parker Gawryletz";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Live wedding ceremony piano and vow audio across Cochrane, Calgary, Canmore and Banff National Park. Choose your area for local venues and details.",
      );
  }, []);

  return (
    <Shell>
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Service Areas", path: "/service-areas" }]} />
      <article className="max-w-3xl mx-auto mt-8">
        <header className="mb-12">
          <h1 className="h1 mb-4">Where I Play</h1>
          <p className="text-lg text-muted-foreground">
            Live ceremony piano and clear, balanced vow audio across Southern Alberta and the Bow Valley — from my home
            base in Cochrane to acoustic-only ceremonies in Banff National Park.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              to={`/service-areas/${area.slug}`}
              className="group block rounded-lg border border-border bg-card/60 p-6 transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <h2 className="font-display text-xl mb-1">{area.city}</h2>
              <p className="text-sm text-muted-foreground mb-3">{area.region}</p>
              <p className="text-sm text-muted-foreground/90 leading-relaxed">{area.lede}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] uppercase tracking-[0.14em] text-primary">
                {area.city} details
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </article>
    </Shell>
  );
}

function CityPage({ slug }: { slug: string }) {
  const area = getServiceArea(slug);

  useEffect(() => {
    if (!area) return;
    document.title = `Wedding Pianist in ${area.city}, ${area.region} | Parker Gawryletz`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", area.metaDescription);
  }, [area]);

  if (!area) return <Navigate to="/service-areas" replace />;

  return (
    <Shell>
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Service Areas", path: "/service-areas" },
          { label: area.city, path: `/service-areas/${area.slug}` },
        ]}
      />
      <article className="max-w-3xl mx-auto mt-8">
        <header className="mb-10">
          <h1 className="h1 mb-4">Wedding Ceremony Pianist in {area.city}</h1>
          <p className="text-lg text-muted-foreground">{area.lede}</p>
        </header>

        <div className="prose dark:prose-invert prose-lg max-w-none">
          {area.context.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>Venues I serve in {area.city}</h2>
          <ul>
            {area.venues.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>

          <p className="not-prose rounded-lg border-l-2 border-primary/50 bg-card/50 py-4 pl-5 pr-4 text-[15px] leading-relaxed text-muted-foreground">
            {area.localNote}
          </p>

          <h2>{area.city} ceremony questions</h2>
          {area.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="not-prose mt-12 rounded-xl border border-border bg-card/60 p-8 text-center">
          <h2 className="font-display text-2xl mb-3">Planning a ceremony near {area.city}?</h2>
          <p className="text-muted-foreground mb-6">
            Tell me about your day and you'll have a personalized ceremony plan within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-display text-[15px] font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            Reserve My Date
          </Link>
        </div>

        {/* Nearby areas — internal linking */}
        <footer className="mt-12 pt-8 border-t border-border">
          <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground mb-3">Nearby areas</p>
          <div className="flex flex-wrap gap-3">
            {area.nearby.map((slug) => {
              const n = getServiceArea(slug);
              if (!n) return null;
              return (
                <Link
                  key={slug}
                  to={`/service-areas/${slug}`}
                  className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                >
                  Pianist in {n.city}
                </Link>
              );
            })}
          </div>
        </footer>
      </article>
    </Shell>
  );
}

export default function ServiceAreas() {
  const { city } = useParams();
  return city ? <CityPage slug={city} /> : <Hub />;
}
