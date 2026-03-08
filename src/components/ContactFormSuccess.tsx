import { CheckCircle2, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ContactFormSuccess() {
  const [showPlanner, setShowPlanner] = useState(false);
  const [plannerEmail, setPlannerEmail] = useState("");

  const handleAddPlanner = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding planner:", plannerEmail);
  };

  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="mb-6">
        <CheckCircle2 className="mx-auto text-accent mb-4" size={48} />
        <h2 className="font-display text-[clamp(24px,3vw,32px)] font-light mb-2">
          Your details have been received.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          I will send your personalized ceremony plan within 24 hours — venue considerations, suggested arrangements, and a timeline for your day.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-8">
        {!showPlanner ? (
          <button
            type="button"
            onClick={() => setShowPlanner(true)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-[180ms]"
          >
            <Mail size={14} />
            Add my planner to the correspondence
            <ChevronDown size={12} />
          </button>
        ) : (
          <form onSubmit={handleAddPlanner} className="space-y-3 animate-fade-in">
            <label className="block text-sm font-medium text-left">
              Planner email
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="planner@email.com"
                value={plannerEmail}
                onChange={(e) => setPlannerEmail(e.target.value)}
              />
              <Button type="submit" aria-label="Add planner to correspondence">
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-left">
              I will CC them on venue notes, timeline details, and cue formats they already use.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
