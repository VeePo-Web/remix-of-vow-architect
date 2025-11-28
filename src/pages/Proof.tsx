import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Star, Award, TrendingUp } from "lucide-react";

export default function Proof() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16 animate-fade-in">
            <div className="text-center">
              <div className="overline mb-2">Credentials</div>
              <h1 className="mx-auto">Proof & Trust</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                Verified expertise. Documented results. Peace of mind.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center bg-card border-border card-keyline">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <p className="text-muted-foreground">Ceremonies Performed</p>
              </Card>

              <Card className="p-8 text-center bg-card border-border card-keyline">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">System Uptime Record</p>
              </Card>

              <Card className="p-8 text-center bg-card border-border card-keyline">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Certifications & Insurance</h3>
              <div className="space-y-4">
                <Card className="p-6 bg-card border-border flex items-start gap-4">
                  <Award className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">SOCAN Licensed</h4>
                    <p className="text-sm text-muted-foreground">
                      Fully licensed for public performance of copyrighted music. All royalties properly managed.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border flex items-start gap-4">
                  <Award className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Comprehensive Liability Insurance</h4>
                    <p className="text-sm text-muted-foreground">
                      $2M coverage protects you and your venue. Certificate of insurance provided upon request.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border flex items-start gap-4">
                  <Award className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Royal Conservatory - ARCT Diploma</h4>
                    <p className="text-sm text-muted-foreground">
                      Highest level of piano performance certification. Years of formal training and examination.
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Testimonial Highlights</h3>
              <div className="space-y-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic mb-3">
                    "Parker's professionalism and skill exceeded all expectations. The backup equipment
                    gave us complete peace of mind, and the music was absolutely perfect."
                  </p>
                  <p className="text-sm text-muted-foreground">— Sarah M., Fairmont Banff Springs</p>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic mb-3">
                    "We had a last-minute song request and Parker learned it perfectly in just two weeks.
                    The attention to detail and commitment to excellence were evident throughout."
                  </p>
                  <p className="text-sm text-muted-foreground">— Jennifer & David K., Lake Louise</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
