import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Button } from "@/components/ui/button";
import { SPLTriptych } from "@/components/SPLTriptych";
import { SetupPhotoGallery } from "@/components/SetupPhotoGallery";
import { InsuranceDocuments } from "@/components/InsuranceDocuments";
import { RedundancyStack } from "@/components/RedundancyStack";
import { DownloadablePlans } from "@/components/DownloadablePlans";
import { RevealOnScroll } from "@/components/animation";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Shield, Zap, Layers, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import galleryHeroImg from "@/assets/gallery-hero.jpg";

const proofSections = [
  { id: "proof-hero",        label: "Overview",         isBlackKey: false },
  { id: "proof-spl",         label: "Documentation",    isBlackKey: true  },
  { id: "proof-setup",       label: "Setup Gallery",    isBlackKey: false },
  { id: "proof-insurance",   label: "Insurance",        isBlackKey: true  },
  { id: "proof-redundancy",  label: "Redundancy",       isBlackKey: false },
  { id: "proof-downloads",   label: "Downloads",        isBlackKey: false },
  { id: "proof-cta",         label: "Begin",            isBlackKey: true  },
];

/** Golden thread separator between sections */
function GoldenThread() {
  return (
    <div className="relative py-2" aria-hidden="true">
      <div
        className="h-px max-w-xs mx-auto"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)",
        }}
      />
      {/* Breathing dot at center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        style={{
          background: "hsl(var(--vow-yellow) / 0.6)",
          boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.3)",
          animation: "golden-dot-breathe 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export default function Proof() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />
      <PianoKeyNav sections={proofSections} />
      
      {/* Section 1 - Hero */}
      <section id="proof-hero" className="relative section-padding bg-background overflow-hidden piano-section-target">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div 
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: `url(${galleryHeroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "ken-burns 30s ease-in-out infinite alternate",
            }}
          />
        </div>
        {/* Warm fog */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
        {/* Cinematic vignette with breathing */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 90%)",
            animation: "vignette-breathe 6s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="overline">Covenants Kept</div>
            <h1 className="h1 mx-auto">I do not just say it — I show it.</h1>
            <div className="chapter-rule mx-auto" />
            <p className="lead text-muted-foreground max-w-2xl mx-auto">
              Documentation, insurance, redundancy, and the quiet certainty that comes from preparation. This is what devotion looks like in practice.
            </p>
            
            <Button size="lg" variant="primary-dark" className="hover-scale mt-8" asChild>
              <Link to="/contact">Request a sample plan</Link>
            </Button>

            {/* Trust stack */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
              {[
                { icon: Shield, label: "$4M Insurance" },
                { icon: Zap, label: "$25k Gear" },
                { icon: Layers, label: "Triple Backups" },
                { icon: Clock, label: "24-Hour Plan" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-[8px] border border-primary/10 card-sacred-sm transition-all duration-[180ms] hover:border-primary/20 hover:shadow-[0_0_24px_hsl(var(--vow-yellow)/0.06)]">
                  <Icon className="text-primary" size={24} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoldenThread />

      {/* Section 2 - SPL Log Triptych */}
      <div id="proof-spl" className="piano-section-target">
        <RevealOnScroll variant="up">
          <SPLTriptych />
        </RevealOnScroll>
      </div>

      <GoldenThread />

      {/* Section 3 - Setup Photos */}
      <div id="proof-setup" className="piano-section-target">
        <RevealOnScroll variant="up">
          <SetupPhotoGallery />
        </RevealOnScroll>
      </div>

      <GoldenThread />

      {/* Section 4 - Insurance */}
      <div id="proof-insurance" className="piano-section-target">
        <RevealOnScroll variant="up">
          <InsuranceDocuments />
        </RevealOnScroll>
      </div>

      <GoldenThread />

      {/* Section 5 - Redundancy */}
      <div id="proof-redundancy" className="piano-section-target">
        <RevealOnScroll variant="up">
          <RedundancyStack />
        </RevealOnScroll>
      </div>

      <GoldenThread />

      {/* Section 6 - Downloadable Plans */}
      <div id="proof-downloads" className="piano-section-target">
        <RevealOnScroll variant="up">
          <DownloadablePlans />
        </RevealOnScroll>
      </div>

      <GoldenThread />

      {/* Final CTA */}
      <div id="proof-cta" className="piano-section-target">
        <RevealOnScroll variant="up">
          <section className="relative section--dark section-padding overflow-hidden">
            {/* Warm glow behind CTA */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-foreground">
                  Every arrangement begins with a conversation.
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="primary-dark" className="hover-scale" asChild>
                    <Link to="/contact">Hold my date</Link>
                  </Button>
                  <Button variant="ghost-dark" size="lg" className="hover-scale" asChild>
                    <Link to="/contact">Request a sample plan</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Response within 24 hours. Always.
                </p>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </div>

      {/* Footer Microcopy */}
      <section className="section--surface py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto text-center">
            I design within typical venue policies and Parks Canada guidelines. Where sound restrictions apply, 
            your plan prioritizes proximity seating and acoustic projection. Insurance certificates and safety 
            documentation are available on request.
          </p>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @keyframes vignette-breathe {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0.65; }
        }
        @keyframes golden-dot-breathe {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain, [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
