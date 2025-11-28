import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Mountain } from "lucide-react";

export default function BanffMode() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-background grain">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16 animate-fade-in">
            <div className="text-center">
              <div className="overline mb-2">Technology</div>
              <h1 className="mx-auto">Banff Mode™</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                A stress-proof audio architecture designed for the unpredictability of mountain ceremonies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-card border-border card-keyline">
                <Shield className="mx-auto mb-4 text-primary" size={32} />
                <h4 className="font-bold mb-2">Redundant Systems</h4>
                <p className="text-sm text-muted-foreground">
                  Backup keyboard, amplification, and power. Triple-layer protection against failure.
                </p>
              </Card>

              <Card className="p-6 text-center bg-card border-border card-keyline">
                <Zap className="mx-auto mb-4 text-primary" size={32} />
                <h4 className="font-bold mb-2">Weather-Protected</h4>
                <p className="text-sm text-muted-foreground">
                  All equipment rated for outdoor conditions. Covers and contingencies for sudden weather.
                </p>
              </Card>

              <Card className="p-6 text-center bg-card border-border card-keyline">
                <Mountain className="mx-auto mb-4 text-primary" size={32} />
                <h4 className="font-bold mb-2">Altitude-Tested</h4>
                <p className="text-sm text-muted-foreground">
                  Systems optimized for mountain venues. Reliable performance at any elevation.
                </p>
              </Card>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold">The Problem</h3>
              <p className="text-muted-foreground">
                Mountain ceremonies face unique challenges: unpredictable weather, remote locations,
                power constraints, and acoustic complexities. A single equipment failure can derail
                the most important moment of your day.
              </p>

              <h3 className="text-2xl font-bold mt-8">The Solution</h3>
              <p className="text-muted-foreground">
                Banff Mode™ is a comprehensive backup protocol. Every component has a redundant counterpart.
                Primary keyboard fails? Switch to backup. Power issues? Battery backup engages. Amplification
                problem? Secondary system takes over. All transitions are seamless and invisible to your guests.
              </p>

              <Card className="p-6 my-8 bg-card border-border card-keyline">
                <h4 className="font-bold mb-3">What's Included:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Primary digital piano + backup keyboard</li>
                  <li>• Dual amplification systems</li>
                  <li>• Battery backup power supply (4+ hours)</li>
                  <li>• Weather-resistant equipment covers</li>
                  <li>• Pre-ceremony system check (1 hour before)</li>
                  <li>• Real-time monitoring during ceremony</li>
                </ul>
              </Card>

              <p className="text-muted-foreground">
                In 200+ ceremonies, this protocol has maintained a 100% uptime record. Your ceremony
                receives the same level of preparation as a professional concert performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
