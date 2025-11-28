import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const leadMagnetSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name helps me tailor your pack." }),
  email: z.string().trim().email({ message: "Please add your email so I can send your files." }),
  ceremonyDate: z.string().optional(),
  venueName: z.string().optional(),
});

type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;

export function ResourcesLeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
  });

  const onSubmit = async (data: LeadMagnetFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Lead magnet form submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-surface border border-lines rounded-lg p-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Your ceremony-audio toolkit is ready 🎹</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Check your inbox for the SPL log sample, Banff Mode™ checklist, and Cue Sheet Template. 
          Want me to tailor these to your venue? Reply with your date and location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Hold my date → get a custom SPL plan</Button>
          <Button size="lg" variant="outline">Share with my planner</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <div className="bg-surface border border-lines rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-3">Discover if your venue is audio-compliant</h2>
          <p className="text-muted-foreground mb-6">
            I'll send a sample SPL log and a one-page checklist you can use immediately.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Parker"
                {...register("firstName")}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              <p className="text-xs text-muted-foreground">so I can personalize your pack.</p>
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              <p className="text-xs text-muted-foreground">where I'll send your files.</p>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ceremonyDate">Ceremony date (optional)</Label>
              <Input
                id="ceremonyDate"
                type="date"
                {...register("ceremonyDate")}
              />
              <p className="text-xs text-muted-foreground">helps me tailor timing.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venueName">Venue name (optional)</Label>
              <Input
                id="venueName"
                placeholder="Fairmont Banff Springs"
                {...register("venueName")}
              />
              <p className="text-xs text-muted-foreground">I'll include venue-specific notes if I have them.</p>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send me the SPL log sample + checklist"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              I'll also include my Banff Mode™ Checklist and Cue Sheet Template.
            </p>
          </form>

          <p className="text-xs text-muted-foreground mt-6 text-center border-t border-border pt-4">
            No spam. Just precision tools built for real weddings.
          </p>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
          <h3 className="font-semibold mb-4">What you'll receive:</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Sample SPL log with distance-to-audibility chart</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Banff Mode™ compliance checklist</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Time-based ceremony cue sheet template</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Venue-specific notes (if available)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
