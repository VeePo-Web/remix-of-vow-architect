import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ContactFormSuccess() {
  const [plannerEmail, setPlannerEmail] = useState("");

  const handleAddPlanner = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding planner:", plannerEmail);
  };

  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="mb-6">
        <CheckCircle2 className="mx-auto text-accent mb-4" size={64} />
        <h2 className="font-display text-[clamp(24px,3vw,32px)] font-light mb-2">
          Your details have been received.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          I will send your personalized ceremony plan within 24 hours — venue considerations, suggested arrangements, and a timeline for your day.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6 mt-8">
        <form onSubmit={handleAddPlanner} className="space-y-3">
          <label className="block text-sm font-medium text-left">
            Add my planner now
          </label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="planner@email.com"
              value={plannerEmail}
              onChange={(e) => setPlannerEmail(e.target.value)}
            />
            <Button type="submit">
              <Mail className="mr-2" size={16} />
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-left">
            I work with planners regularly — I will send venue notes, timeline details, and cue formats they already use.
          </p>
        </form>
      </div>
    </div>
  );
}
