import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Button } from "@/components/ui/button";
import { FAQChips } from "@/components/FAQChips";
import { FAQTopTen } from "@/components/FAQTopTen";
import { FAQPolicyDownload } from "@/components/FAQPolicyDownload";
import { FAQTrustStack } from "@/components/FAQTrustStack";

export default function FAQ() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Section 1 — Hero */}
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Breadcrumbs items={[
              { label: "Home", path: "/" },
              { label: "FAQ / Risk Elimination" }
            ]} />

            <div className="text-center mb-16">
              <div className="overline mb-2">Risk Elimination</div>
              <h1 className="mx-auto">Clear Answers, Zero Guesswork</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                I architect ceremony audio the way engineers ship aircraft: documented, redundant, and verified. 
                Here's how your risks disappear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Micro Q&A Chips */}
      <FAQChips />

      {/* Section 3 — Top 10 Ceremony Fears */}
      <FAQTopTen />

      {/* Section 4 — Policy Download */}
      <FAQPolicyDownload />

      {/* Section 5 — Psychological Trust Stack */}
      <FAQTrustStack />

      {/* Section 6 — Final CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Every objection becomes a planning advantage.</h2>
            <p className="lead text-muted-foreground mb-8">
              Where others cross fingers, I print plans. Get clarity now—before the stress hits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <DirectionalLink to="/contact">
                  Hold my date & get my ceremony-audio plan
                </DirectionalLink>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <DirectionalLink to="/proof">
                  Download a sample plan (SPL + cue sheet)
                </DirectionalLink>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Buttons use clear, first-person labels. Download links include file type and size. 
              All images include alt text describing function (not decoration).
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
