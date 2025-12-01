import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TaglineCovenant } from "@/components/TaglineCovenant";

export function CrossOver() {
  return (
    <section 
      className="section--dark py-24 px-4 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, hsl(240 12% 5%) 0%, hsl(240 9% 2%) 100%)"
      }}
    >
      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 9% 2% / 0.6) 100%)"
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Tagline Returns (Bookend) — CARVED STONE TREATMENT */}
        <div className="mb-16">
          <h2 
            className="text-[clamp(16px,2vw,20px)] uppercase tracking-[0.4em] font-display font-light text-ink-inverse/80"
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 2px rgba(255,224,138,0.15)"
            }}
          >
            'TIL DEATH <span className="text-primary">;</span> UNTO LIFE
          </h2>
        </div>

        {/* Sacred Quote */}
        <h2 className="text-[clamp(32px,5vw,56px)] font-[300] font-display leading-tight mb-12 text-ink-inverse max-w-2xl mx-auto">
          "Your vows deserve<br />to be heard."
        </h2>

        {/* CTA Stack */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            variant="primary-dark" 
            className="text-base px-8 py-6 h-auto cta-commitment shadow-[0_0_40px_rgba(255,224,138,0.25)] hover:shadow-[0_0_60px_rgba(255,224,138,0.35)]"
            asChild
          >
            <a href="/contact">Hold my date & get my plan →</a>
          </Button>
          <Button 
            variant="ghost-dark" 
            size="lg" 
            className="gap-2 h-auto py-6" 
            asChild
          >
            <a href="/resources">
              <Download size={20} />
              Download a sample plan
            </a>
          </Button>
        </div>

        {/* Trust Anchor */}
        <p className="text-sm text-ink-inverse/70 mb-12">
          Includes SPL log, mic setup, and run-of-show.
        </p>

        {/* Sacred Separator */}
        <div 
          className="h-[1px] w-24 mx-auto mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)"
          }}
          aria-hidden="true"
        />

        {/* Commitment Statement */}
        <p className="text-base font-display font-light text-ink-inverse/90 italic">
          Response within <span className="text-primary font-normal not-italic">24 hours</span>. Always.
        </p>
      </div>
    </section>
  );
}
