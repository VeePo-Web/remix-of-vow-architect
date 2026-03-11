import { useEffect } from "react";
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

import { Link } from "react-router-dom";
import galleryHeroImg from "@/assets/gallery-hero.jpg";
import { GoldCornerImage } from "@/components/ui/gold-corner-image";
import gallerySetupImg from "@/assets/gallery-setup.jpg";

const proofSections = [
  { id: "proof-hero",        label: "Overview",         isBlackKey: false },
  { id: "proof-spl",         label: "Sound Levels",     isBlackKey: true  },
  { id: "proof-setup",       label: "Setup Photos",     isBlackKey: false },
  { id: "proof-insurance",   label: "Insurance",        isBlackKey: true  },
  { id: "proof-redundancy",  label: "Backup Systems",   isBlackKey: false },
  { id: "proof-downloads",   label: "Downloads",        isBlackKey: false },
  { id: "proof-cta",         label: "Get in Touch",     isBlackKey: true  },
];

export default function Proof() {
  usePageTheme();
  useEffect(() => {
    document.title = "Proof of Craft — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Documentation, $4M insurance, triple redundancy, and downloadable ceremony-audio plans. This is what devotion looks like in practice.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={proofSections} />
      <main>
      
      {/* Section 1 - Hero */}
      <section id="proof-hero" className="relative section-padding bg-background overflow-hidden piano-section-target">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div 
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: `url(${galleryHeroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
              animation: "ken-burns 30s ease-in-out infinite alternate",
            }}
          />
        </div>
        {/* Warm fog */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="overline">Covenants Kept</div>
            <h1 className="h1 mx-auto">I do not just say it — I show it.</h1>
            <div className="chapter-rule mx-auto" />
            <p className="p-lead text-muted-foreground max-w-2xl mx-auto">
              Documentation, insurance, redundancy, and the quiet certainty that comes from preparation. This is what devotion looks like in practice.
            </p>
            
            <Button size="lg" variant="primary-dark" className="hover-scale mt-8" asChild>
              <Link to="/contact">Request a sample plan</Link>
            </Button>

            {/* Trust stack */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-3xl mx-auto">
              {[
                { num: "01", label: "$4M Insurance" },
                { num: "02", label: "$25k Gear" },
                { num: "03", label: "Triple Backups" },
                { num: "04", label: "24-Hour Plan" },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span
                    className="font-display text-[28px] font-light"
                    style={{
                      background: "linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {num}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - SPL Log Triptych */}
      <div id="proof-spl" className="piano-section-target mt-24">
        <RevealOnScroll variant="up">
          <SPLTriptych />
        </RevealOnScroll>
      </div>

      {/* Section 3 - Setup Photos */}
      <div id="proof-setup" className="piano-section-target mt-24">
        <RevealOnScroll variant="up">
          <SetupPhotoGallery />
        </RevealOnScroll>
      </div>

      {/* Editorial image bleed */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <GoldCornerImage
          src={gallerySetupImg}
          alt="Professional piano setup at a ceremony venue"
          aspectRatio="16/9"
          maxHeight="400px"
          className="w-full"
        />
      </div>

      {/* Section 4 - Insurance */}
      <div id="proof-insurance" className="piano-section-target mt-24">
        <RevealOnScroll variant="up">
          <InsuranceDocuments />
        </RevealOnScroll>
      </div>

      {/* Section 5 - Redundancy */}
      <div id="proof-redundancy" className="piano-section-target mt-24">
        <RevealOnScroll variant="up">
          <RedundancyStack />
        </RevealOnScroll>
      </div>

      {/* Section 6 - Downloadable Plans */}
      <div id="proof-downloads" className="piano-section-target mt-24">
        <RevealOnScroll variant="up">
          <DownloadablePlans />
        </RevealOnScroll>
      </div>

      {/* Final CTA */}
      <div id="proof-cta" className="piano-section-target mt-24">
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

      </main>
      <Footer />
      <MobileStickyBar />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .grain, [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
