import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-16">
              <div className="overline mb-2">Contact</div>
              <h1 className="mx-auto">Let's Create Something Beautiful</h1>
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <Input placeholder="First and Last Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Wedding Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Venue</label>
                    <Input placeholder="Venue Name or TBD" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder="Tell me about your ceremony vision..."
                    rows={6}
                  />
                </div>

                <Button size="lg" className="w-full hover-scale">
                  Send Message
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your information is confidential and will never be shared. I typically respond within 24 hours.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
