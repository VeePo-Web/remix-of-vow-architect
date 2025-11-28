import { Card } from "@/components/ui/card";
import { DirectionalLink } from "@/components/DirectionalLink";

const venues = [
  {
    name: "Cascade Gardens",
    soundPolicy: "No PA allowed",
    powerAccess: "No",
    notes: "Ideal for proximity seating; curated acoustic set excels.",
  },
  {
    name: "Lake Minnewanka",
    soundPolicy: "No PA",
    powerAccess: "No",
    notes: "Wind-aware seating arc recommended; arrive early.",
  },
  {
    name: "Tunnel Mountain",
    soundPolicy: "No PA",
    powerAccess: "No",
    notes: "Earlier arrival for guest flow and aisle timing.",
  },
  {
    name: "Two Jack Lake",
    soundPolicy: "No PA",
    powerAccess: "No",
    notes: "Shorter processional recommended for pace control.",
  },
  {
    name: "Cave & Basin Historic Site",
    soundPolicy: "Often restrictive",
    powerAccess: "Limited",
    notes: "Confirm ceremony spot and pathing with site staff.",
  },
];

interface BanffVenueTableProps {
  id?: string;
}

export function BanffVenueTable({ id }: BanffVenueTableProps) {
  return (
    <section id={id} className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Banff Mode works perfectly
            </h2>
            <div className="chapter-rule mx-auto" />
          </div>

          <Card className="overflow-hidden border-border card-keyline">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-bold">Venue</th>
                    <th className="text-left p-4 font-bold">Sound Policy</th>
                    <th className="text-left p-4 font-bold">Power Access</th>
                    <th className="text-left p-4 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {venues.map((venue, index) => (
                    <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{venue.name}</td>
                      <td className="p-4 text-muted-foreground">{venue.soundPolicy}</td>
                      <td className="p-4 text-muted-foreground">{venue.powerAccess}</td>
                      <td className="p-4 text-sm text-muted-foreground">{venue.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Need clarity on your venue?
            </p>
            <DirectionalLink to="/contact">
              Contact me for a compliance review
            </DirectionalLink>
            <p className="text-sm text-muted-foreground mt-2">
              (I'll confirm feasibility and send a mini seating sketch with timing notes.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
