import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BentoSelector } from "@/components/BentoSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Shield, Clock, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import eventsHeroImg from "@/assets/events-hero.jpg";

const eventsContactSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please add your email so I can respond"),
  eventDate: z.string().min(1, "An approximate date helps me check availability"),
  venue: z.string().min(2, "Knowing the location helps me plan logistics"),
  occasion: z.string().min(1, "Please select an occasion type"),
  duration: z.string().min(1, "Please select a duration"),
  notes: z.string().optional(),
});

type EventsContactData = z.infer<typeof eventsContactSchema>;

const occasionItems = [
  { id: "dinner", label: "Private Dinner", description: "Intimate table, curated atmosphere" },
  { id: "church", label: "Church Service", description: "Hymns, worship, and reverent piano" },
  { id: "cocktail", label: "Cocktail Reception", description: "Conversation-friendly, elegant" },
  { id: "other", label: "Something Else", description: "Tell me about it in the notes" },
];

const durationItems = [
  { id: "1hr", label: "1 hour", description: "Focused, single set" },
  { id: "2-3hr", label: "2–3 hours", description: "Extended atmosphere" },
  { id: "4hr+", label: "4+ hours", description: "Full-day presence" },
];

export default function EventsContact() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  usePageTheme();

  useEffect(() => {
    document.title = "Discuss Your Event — Parker Gawryletz";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Every event begins with a conversation. Share your details and receive a tailored proposal within 24 hours."
      );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<EventsContactData>({
    resolver: zodResolver(eventsContactSchema),
  });

  const occasionValue = watch("occasion");
  const durationValue = watch("duration");

  const handleStep1Next = async () => {
    const valid = await trigger(["name", "email", "eventDate", "venue"]);
    if (valid) setStep(2);
  };

  const onSubmit = (data: EventsContactData) => {
    console.log("Events inquiry:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <main>
        <section
          className="relative section-padding bg-background overflow-hidden"
          aria-label="Discuss your event"
        >
          {/* Atmospheric layers */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: `url(${eventsHeroImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
                animation: "ken-burns 28s ease-in-out infinite alternate",
              }}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.012) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <Breadcrumbs
                items={[
                  { label: "Events", path: "/events" },
                  { label: "Discuss Your Event" },
                ]}
              />

              <div className="text-center mb-10">
                <div className="overline mb-2">The Conversation</div>
                <h1 className="h1 mx-auto">
                  Every event begins with a conversation.
                </h1>
                <div className="chapter-rule mx-auto" />
                <p className="p-lead mx-auto text-muted-foreground mt-6">
                  Share the details — I will respond within 24 hours with a tailored proposal.
                </p>
                <p className="text-xs text-muted-foreground mt-3">No obligation — one-minute form.</p>
              </div>

              {isSubmitted ? (
                <Card className="p-8 bg-card border-border card-keyline animate-fade-in">
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="mx-auto text-accent" size={48} />
                    <h2 className="font-display text-[clamp(20px,2.5vw,28px)] font-light">
                      Your details have been received.
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                      I will send a tailored proposal within 24 hours — venue considerations,
                      repertoire suggestions, and a timeline for your event.
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  <Card className="lg:col-span-2 p-8 bg-card/80 backdrop-blur-[8px] border-border/50 card-keyline">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-[180ms] ${step === 1 ? "bg-primary" : "bg-primary/40"}`} />
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-[180ms] ${step === 2 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Step {step} of 2
                      </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                          <h2 className="h4">Tell me about your gathering</h2>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="name">Your name</Label>
                              <Input id="name" {...register("name")} className="mt-2" />
                              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" {...register("email")} className="mt-2" />
                              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="eventDate">Event date</Label>
                              <Input id="eventDate" type="date" {...register("eventDate")} className="mt-2" />
                              <p className="text-xs text-muted-foreground mt-1">Estimate is fine.</p>
                              {errors.eventDate && <p className="text-xs text-destructive mt-1">{errors.eventDate.message}</p>}
                            </div>
                            <div>
                              <Label htmlFor="venue">Venue or location</Label>
                              <Input id="venue" {...register("venue")} placeholder="Venue name, city" className="mt-2" />
                              {errors.venue && <p className="text-xs text-destructive mt-1">{errors.venue.message}</p>}
                            </div>
                          </div>

                          <Button
                            type="button"
                            size="lg"
                            variant="primary-dark"
                            className="w-full"
                            onClick={handleStep1Next}
                          >
                            Continue
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                          <h2 className="h4">The occasion</h2>

                          <div>
                            <Label className="mb-3 block">What type of event?</Label>
                            <BentoSelector
                              items={occasionItems}
                              value={occasionValue}
                              onChange={(v) => setValue("occasion", v, { shouldValidate: true })}
                              columns={2}
                              label="Occasion type"
                            />
                            {errors.occasion && <p className="text-xs text-destructive mt-1">{errors.occasion.message}</p>}
                          </div>

                          <div>
                            <Label className="mb-3 block">How long do you need me?</Label>
                            <BentoSelector
                              items={durationItems}
                              value={durationValue}
                              onChange={(v) => setValue("duration", v, { shouldValidate: true })}
                              columns={3}
                              label="Duration"
                            />
                            {errors.duration && <p className="text-xs text-destructive mt-1">{errors.duration.message}</p>}
                          </div>

                          {/* Expandable notes */}
                          {!showNotes ? (
                            <button
                              type="button"
                              onClick={() => setShowNotes(true)}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[180ms] underline underline-offset-2"
                            >
                              Add notes or song requests
                            </button>
                          ) : (
                            <div className="animate-fade-in">
                              <Label htmlFor="notes">Notes (optional)</Label>
                              <Textarea
                                id="notes"
                                {...register("notes")}
                                placeholder="Song requests, timing details, anything I should know..."
                                rows={3}
                                className="mt-2"
                              />
                            </div>
                          )}

                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep(1)}
                            >
                              Back
                            </Button>
                            <Button
                              type="submit"
                              size="lg"
                              variant="primary-dark"
                              className="flex-1"
                            >
                              Discuss your event
                            </Button>
                          </div>

                          <p className="text-xs text-muted-foreground text-center">
                            No obligation. Response within 24 hours.
                          </p>
                        </div>
                      )}
                    </form>
                  </Card>

                  {/* Sidebar reassurance */}
                  <div className="lg:col-span-1 space-y-4">
                    {[
                      { icon: DollarSign, text: "No cost to inquire — take the time you need." },
                      { icon: Clock, text: "Response within 24 hours, always." },
                      { icon: Shield, text: "Insured, self-sufficient, and fully prepared." },
                    ].map((item, i) => (
                      <Card key={i} className="bg-card/50 border-border p-4 flex items-start gap-3">
                        <item.icon className="text-primary shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyBar />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .grain { animation: none !important; }
          [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
