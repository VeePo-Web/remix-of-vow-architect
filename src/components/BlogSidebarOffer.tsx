import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Download, CheckCircle2 } from "lucide-react";

interface BlogSidebarOfferProps {
  variant?: "sticky" | "inline";
}

const kitIncludes = [
  "Cue sheet template",
  "Sample SPL report",
  "Outdoor gear list",
  "3 curated song lists",
];

export function BlogSidebarOffer({ variant = "sticky" }: BlogSidebarOfferProps) {
  return (
    <Card 
      className={`card-keyline ${variant === "sticky" ? "lg:sticky lg:top-24" : ""}`}
    >
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Download className="text-primary" size={20} />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            Free Planning Kit
          </span>
        </div>
        <CardTitle className="text-xl">
          Not ready to book?
        </CardTitle>
        <CardDescription>
          Get my Ceremony-Audio Planning Kit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {kitIncludes.map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>

        <Button className="w-full" size="lg">
          Download Free Kit
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          No email required. Instant download.
        </p>
      </CardContent>
    </Card>
  );
}
