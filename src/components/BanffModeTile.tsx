import { Mountain } from "lucide-react";
import { DirectionalLink } from "./DirectionalLink";
import { Card } from "./ui/card";

export function BanffModeTile() {
  return (
    <section className="section--default py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-12 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <div className="flex items-start gap-4 mb-6">
            <Mountain size={32} className="text-accent shrink-0" />
            <h2 className="h2">
              Compliant by design: Banff Mode™.
            </h2>
          </div>
          
          <p className="p-lead mb-8 max-w-3xl text-muted-foreground">
            No PA? No generators? I perform a curated <strong>unamplified</strong> set that still commands presence. I'll recommend a <strong>proximity seating arc</strong>, include a snapshot <strong>SPL chart</strong>, and attach the relevant <strong>Parks Canada</strong> bylaw excerpt in your plan.
          </p>

          <DirectionalLink to="/banff-mode">Understand Banff Mode</DirectionalLink>
        </Card>
      </div>
    </section>
  );
}
