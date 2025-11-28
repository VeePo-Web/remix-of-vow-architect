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

export default function Proof() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Section 1 - Hero */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
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
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border">
                <Shield className="text-primary" size={24} />
                <span className="text-sm font-medium">$4M Insurance</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border">
                <Zap className="text-primary" size={24} />
                <span className="text-sm font-medium">$25k Gear</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border">
                <Layers className="text-primary" size={24} />
                <span className="text-sm font-medium">Triple Backups</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border">
                <Clock className="text-primary" size={24} />
                <span className="text-sm font-medium">24-Hour Plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - SPL Log Triptych */}
      <SPLTriptych />

      {/* Section 3 - Setup Photos */}
      <SetupPhotoGallery />

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
