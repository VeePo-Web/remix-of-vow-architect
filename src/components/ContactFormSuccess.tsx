import { CheckCircle2, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ContactFormSuccess() {
  const [plannerEmail, setPlannerEmail] = useState("");

  const handleAddPlanner = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle planner email submission
    console.log("Adding planner:", plannerEmail);
  };

  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="mb-6">
        <CheckCircle2 className="mx-auto text-accent mb-4" size={64} />
        <h2 className="text-3xl font-bold mb-2">Clarity secured.</h2>
        <p className="text-lg text-muted-foreground">
          You will receive your personalized ceremony plan within 24 hours.
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
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-left">
            I speak planner. I send SPL data, power/setup notes, and cue formats they
            already use.
          </p>
        </form>

        <div className="pt-6 border-t border-border">
          <Button variant="outline" size="lg" className="w-full" asChild>
            <a href="/sample-plan.pdf" download>
              <FileDown className="mr-2" size={16} />
              Download Sample Plan + SPL PDF
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
