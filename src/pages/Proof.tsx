import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SPLTriptych } from "@/components/SPLTriptych";
import { SetupPhotoGallery } from "@/components/SetupPhotoGallery";
import { InsuranceDocuments } from "@/components/InsuranceDocuments";
import { RedundancyStack } from "@/components/RedundancyStack";
import { DownloadablePlans } from "@/components/DownloadablePlans";
import { MobileTrustBar } from "@/components/MobileTrustBar";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Shield, Zap, Layers, Clock } from "lucide-react";
import galleryHeroImg from "@/assets/gallery-hero.jpg";

export default function Proof() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Section 1 - Hero with atmospheric background */}
      <section className="relative section-padding bg-background overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `url(${galleryHeroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 90%)"
          }}
          aria-hidden="true"
        />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="overline">Assured Ceremony Audio™</div>
            <h1 className="mx-auto">Sound You Can See.</h1>
            <div className="chapter-rule mx-auto" />
            <p className="lead text-muted-foreground max-w-2xl mx-auto">
              Backed by SPL logs, certified plans, and insured execution—this is wedding clarity you can measure.
            </p>
            
            <Button size="lg" className="hover-scale mt-8">
              Download a Sample Plan & SPL Log
            </Button>

            {/* Trust stack */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
              {[
                { icon: Shield, label: "$4M Insurance" },
                { icon: Zap, label: "$25k Gear" },
                { icon: Layers, label: "Triple Backups" },
                { icon: Clock, label: "24-Hour Plan" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-primary/10 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70">
                  <Icon className="text-primary" size={24} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fade: hero → SPL */}
      <div className="section-fade-bottom" style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)', height: '80px', marginTop: '-80px', position: 'relative', zIndex: 5 }} aria-hidden="true" />

      {/* Section 2 - SPL Log Triptych */}
      <SPLTriptych />

      {/* Fade: SPL → Setup */}
      <div className="h-[80px] -mt-[1px]" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }} aria-hidden="true" />

      {/* Section 3 - Setup Photos */}
      <SetupPhotoGallery />

      {/* Fade: Setup → Insurance */}
      <div className="h-[80px] -mt-[1px]" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }} aria-hidden="true" />

      {/* Section 4 - Insurance */}
      <InsuranceDocuments />

      {/* Section 5 - Redundancy */}
      <RedundancyStack />

      {/* Section 6 - Downloadable Plans */}
      <DownloadablePlans />

      {/* Section 8 - Final CTA */}
      <section className="section--dark section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-ink-inverse">
              I don't just say it—I log it, show it, and guarantee it.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary-dark" className="hover-scale">
                Hold my date & receive my ceremony-audio plan
              </Button>
              <Button variant="ghost-dark" size="lg" className="hover-scale">
                Download a full SPL report & timeline sample →
              </Button>
            </div>
            <p className="text-sm text-ink-inverse/70">
              Response in 24 hours. Your trust starts with proof.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Microcopy */}
      <section className="section--surface py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto text-center">
            I design within typical venue policies and Parks Canada guidelines. Where no amplification is permitted, 
            your plan prioritizes proximity seating and acoustic projection. Insurance certificates and safety 
            documentation are available on request.
          </p>
        </div>
      </section>

      <MobileTrustBar />
      <Footer />
    </div>
  );
}
