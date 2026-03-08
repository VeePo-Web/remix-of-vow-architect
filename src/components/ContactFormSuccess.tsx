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
        {/* Glowing semicolon — brand threshold symbol */}
        <span
          className="inline-block font-display text-[40px] font-light text-primary mb-4"
          style={{
            textShadow: "0 0 20px hsl(var(--vow-yellow) / 0.4), 0 0 40px hsl(var(--vow-yellow) / 0.15)",
            animation: "semicolon-success-glow 4s ease-in-out infinite",
          }}
          aria-hidden="true"
        >
          ;
        </span>
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
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[180ms] underline underline-offset-2"
          >
            Add my planner to the correspondence
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

      <style>{`
        @keyframes semicolon-success-glow {
          0%, 100% { text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.4), 0 0 40px hsl(var(--vow-yellow) / 0.15); }
          50% { text-shadow: 0 0 28px hsl(var(--vow-yellow) / 0.55), 0 0 56px hsl(var(--vow-yellow) / 0.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="semicolon-success-glow"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
