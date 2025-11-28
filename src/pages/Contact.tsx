import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FormStepper } from "@/components/FormStepper";
import { ValuePromiseBadge } from "@/components/ValuePromiseBadge";
import { DirectionalLink } from "@/components/DirectionalLink";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { useState } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function Contact() {
  usePageTheme();
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-16">
              <div className="overline mb-2">Contact</div>
              <h1 className="mx-auto">Hold Your Date</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                Share your vision and we'll bring it to life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 text-center bg-card border-border">
                <Mail className="mx-auto mb-3 text-primary" size={24} />
                <h4 className="font-semibold mb-2">Email</h4>
                <a
                  href="mailto:hello@parkerallard.com"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  hello@parkerallard.com
                </a>
              </Card>
              
              <Card className="p-6 text-center bg-card border-border">
                <Phone className="mx-auto mb-3 text-primary" size={24} />
                <h4 className="font-semibold mb-2">Phone</h4>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  (123) 456-7890
                </a>
              </Card>
              
              <Card className="p-6 text-center bg-card border-border">
                <MapPin className="mx-auto mb-3 text-primary" size={24} />
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">
                  Banff & Calgary Region
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-card border-border card-keyline">
              <FormStepper currentStep={step} />

              <form className="space-y-6">
                {step === 1 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Wedding Date</label>
                        <Input type="date" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Venue</label>
                        <Input placeholder="Venue Name or TBD" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">City/Town</label>
                        <Input placeholder="Banff, Canmore, etc." required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Guest Count</label>
                        <Input type="number" placeholder="Approx. number" />
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full hover-scale"
                      onClick={() => setStep(2)}
                    >
                      Continue to Step 2
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <Input placeholder="First and Last Name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                      <Input type="tel" placeholder="(123) 456-7890" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tell me about your ceremony vision
                      </label>
                      <Textarea
                        placeholder="Song requests, tone preferences, special moments..."
                        rows={6}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button size="lg" className="flex-1 hover-scale">
                        Submit Request
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <ValuePromiseBadge />
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <FileText size={14} />
                        We respond within one business day. No spam.
                      </p>
                    </div>

                    <DirectionalLink to="/faq" className="text-xs block text-center mt-2">
                      View refund policy & FAQs
                    </DirectionalLink>
                  </>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
