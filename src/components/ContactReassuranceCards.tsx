import { DollarSign, RefreshCw, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const reassuranceItems = [
  {
    icon: DollarSign,
    text: "$0 to hold your date — lock the window, think clearly.",
  },
  {
    icon: RefreshCw,
    text: "Full refund within 14 days — low-risk commitment.",
  },
  {
    icon: Clock,
    text: "Response within 24h, guaranteed — your plan arrives fast.",
  },
  {
    icon: Shield,
    text: "Backups, insurance, SPL logs included — standard, not add-ons.",
  },
];

export function ContactReassuranceCards() {
  return (
    <div className="space-y-4">
      {reassuranceItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            className="bg-card/50 border-border p-4 flex items-start gap-3"
          >
            <Icon className="text-primary shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
          </Card>
        );
      })}
    </div>
  );
}
