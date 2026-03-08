import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContactFormSuccess } from "@/components/ContactFormSuccess";
import { ContactSLATimeline } from "@/components/ContactSLATimeline";
import { BentoSelector } from "@/components/BentoSelector";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import contactHeroImg from "@/assets/contact-hero.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Please add your name"),
  email: z.string().email("Please add your email so I can send your plan"),
  eventDate: z.string().min(1, "An approximate date helps me begin planning"),
  venue: z.string().min(2, "Knowing the venue helps me shape the sound to fit the space"),
  vibe: z.string().min(1, "Please select a ceremony vibe"),
  guestCount: z.string().min(1, "Guest count helps me ensure every word carries"),
  ceremonyTime: z.string().optional(),
  phone: z.string().optional(),
  plannerEmail: z.union([z.string().email(), z.literal("")]).optional(),
  additionalNotes: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const vibeItems = [
  { id: "elegant", label: "Elegant Classical", description: "Timeless ceremony compositions" },
  { id: "modern", label: "Modern Love Songs", description: "Contemporary acoustic arrangements" },
  { id: "indie", label: "Indie Minimal", description: "Understated, curated selections" },
  { id: "surprise", label: "I Trust Your Ear", description: "Shape the sound to the venue and moment" },
];

const guestItems = [
  { id: "under-50", label: "Under 50", description: "Intimate gathering" },
  { id: "50-150", label: "50–150", description: "Standard ceremony" },
  { id: "150+", label: "150+", description: "Grand celebration" },
];

const reassuranceLines = [
  "No cost to hold your date — take the time you need.",
  "Full refund within 14 days — commitment without pressure.",
  "Response within 24 hours — your personalized plan, always.",
  "Insurance, redundancy, and documentation — included.",
];

const stepLabels = ["Your day", "The sound", "Final details"];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showStep3, setShowStep3] = useState(false);
  
  usePageTheme();
  useEffect(() => {
    document.title = "Hold My Date — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Every arrangement begins with a conversation. Hold your date and receive a personalized ceremony plan within 24 hours.");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const vibeValue = watch("vibe");
  const guestValue = watch("guestCount");

  const handleStep1Next = async () => {
    const valid = await trigger(["name", "email", "eventDate", "venue"]);
    if (valid) setStep(2);
  };

  const handleStep2Next = async () => {
    const valid = await trigger(["vibe", "guestCount"]);
    if (valid) setStep(3);
  };

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <main>
        <section className="relative section-padding bg-background overflow-hidden" aria-label="Hold your date">
          {/* Background layers */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: `url(${contactHeroImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
                animation: "ken-burns 25s ease-in-out infinite alternate",
              }}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
              animation: "contact-vignette-breathe 6s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="text-center mb-12">
                <div className="overline mb-2">The Crossing</div>
                <h1 className="h1 mx-auto">Every arrangement begins with a conversation.</h1>
                <div className="chapter-rule mx-auto" />
                <p className="p-lead mx-auto text-muted-foreground mt-6">
                  Tell me about your day — the venue, the feeling, the songs that matter.
                  I will respond within 24 hours with a personalized plan.
                </p>
                <p className="text-xs text-muted-foreground mt-3">No obligation — two minutes is all it takes.</p>
              </div>

              {isSubmitted ? (
                <div className="p-8 bg-card/40 backdrop-blur-[8px] rounded-lg">
                  <ContactFormSuccess />
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 p-8 bg-card/40 backdrop-blur-[8px] rounded-lg">
                    {/* Step indicator — typographic fraction */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="font-display italic text-sm text-foreground/80">
                        {stepLabels[step - 1]}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground/40">
                        {step} / 3
                      </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Step 1: Essentials */}
                      {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                          <h2 className="h4">Tell me about your day</h2>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="name">First & last name</Label>
                              <Input id="name" {...register("name")} className="mt-2" />
                              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                              <Label htmlFor="email">Email address</Label>
                              <Input id="email" type="email" {...register("email")} className="mt-2" />
                              <p className="text-xs text-muted-foreground mt-1">I send your plan here.</p>
                              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="eventDate">Event date</Label>
                              <Input id="eventDate" type="date" {...register("eventDate")} className="mt-2" />
                              <p className="text-xs text-muted-foreground mt-1">Your best estimate if TBD.</p>
                              {errors.eventDate && <p className="text-xs text-destructive mt-1">{errors.eventDate.message}</p>}
                            </div>
                            <div>
                              <Label htmlFor="venue">Venue name + location</Label>
                              <Input id="venue" {...register("venue")} placeholder="Silvertip Resort, Canmore" className="mt-2" />
                              {errors.venue && <p className="text-xs text-destructive mt-1">{errors.venue.message}</p>}
                            </div>
                          </div>
                          <Button type="button" size="lg" variant="primary-dark" className="w-full" onClick={handleStep1Next}>
                            Continue
                          </Button>
                        </div>
                      )}

                      {/* Step 2: Bento selections */}
                      {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                          <h2 className="h4">Shape the sound</h2>

                          <div>
                            <Label className="mb-3 block">Ceremony vibe</Label>
                            <BentoSelector
                              items={vibeItems}
                              value={vibeValue}
                              onChange={(v) => setValue("vibe", v, { shouldValidate: true })}
                              columns={2}
                              label="Ceremony vibe"
                            />
                            {errors.vibe && <p className="text-xs text-destructive mt-1">{errors.vibe.message}</p>}
                          </div>

                          <div>
                            <Label className="mb-3 block">Guest count</Label>
                            <BentoSelector
                              items={guestItems}
                              value={guestValue}
                              onChange={(v) => setValue("guestCount", v, { shouldValidate: true })}
                              columns={3}
                              label="Guest count"
                            />
                            {errors.guestCount && <p className="text-xs text-destructive mt-1">{errors.guestCount.message}</p>}
                          </div>

                          <div className="flex gap-3">
                            <Button type="button" variant="outline" onClick={() => setStep(1)}>
                              Back
                            </Button>
                            <Button type="button" size="lg" variant="primary-dark" className="flex-1" onClick={handleStep2Next}>
                              Continue
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Optional extras + submit */}
                      {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
                          <h2 className="h4">Anything else</h2>
                          <p className="text-sm text-muted-foreground -mt-2">Everything below is optional — you can send now or add details.</p>

                          {!showStep3 ? (
                            <button
                              type="button"
                              onClick={() => setShowStep3(true)}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[180ms] underline underline-offset-2"
                            >
                              Add ceremony time, planner details, or song requests
                            </button>
                          ) : (
                            <div className="space-y-5 animate-fade-in">
                              <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                  <Label htmlFor="ceremonyTime">Ceremony start time</Label>
                                  <Input id="ceremonyTime" type="time" {...register("ceremonyTime")} className="mt-2" />
                                </div>
                                <div>
                                  <Label htmlFor="phone">Phone</Label>
                                  <Input id="phone" type="tel" {...register("phone")} className="mt-2" />
                                  <p className="text-xs text-muted-foreground mt-1">For quick clarifications only.</p>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="plannerEmail">Planner email</Label>
                                <Input id="plannerEmail" type="email" {...register("plannerEmail")} placeholder="planner@email.com" className="mt-2" />
                                <p className="text-xs text-muted-foreground mt-1">I will CC them on the plan.</p>
                              </div>

                              <div>
                                <Label htmlFor="additionalNotes">Song requests or ceremony vision</Label>
                                <Textarea id="additionalNotes" {...register("additionalNotes")} placeholder="Song requests, tone preferences, meaningful moments..." rows={3} className="mt-2" />
                              </div>

                              {/* Inline file attach */}
                              <div>
                                <input id="fileUpload" type="file" accept=".pdf,.docx,.jpg,.jpeg,.png,.mp3" onChange={handleFileChange} className="hidden" />
                                {fileName ? (
                                  <div className="flex items-center gap-2 text-sm text-foreground">
                                    <span>{fileName}</span>
                                    <button
                                      type="button"
                                      onClick={() => setFileName(null)}
                                      className="text-muted-foreground hover:text-foreground transition-colors duration-[180ms]"
                                      aria-label="Remove file"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="fileUpload"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[180ms] underline underline-offset-2 cursor-pointer"
                                  >
                                    Attach a file (PDF, DOCX, JPG, MP3)
                                  </label>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                                Back
                              </Button>
                              <Button type="submit" size="lg" variant="primary-dark" className="flex-1 hover-scale">
                                Hold my date
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground text-center">
                              You will receive a personalized ceremony plan within 24 hours.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Sidebar — floating reassurance + SLA */}
                  <div className="lg:col-span-1 space-y-0">
                    <div className="space-y-0">
                      {reassuranceLines.map((line, i) => (
                        <div key={i}>
                          <div className="flex items-start gap-2.5 py-3">
                            <span className="text-primary/50 shrink-0 text-sm leading-relaxed" aria-hidden="true">—</span>
                            <p className="text-sm text-foreground/80 leading-relaxed">{line}</p>
                          </div>
                          {i < reassuranceLines.length - 1 && (
                            <div className="h-px bg-border/20" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Micro testimonial */}
                    <div className="mt-6 pt-4">
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        "I sent my details and received a full plan the next morning — clearer than anything our previous musician offered in three weeks."
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Sandra & Leo · Cochrane</p>
                    </div>

                    {/* SLA Timeline — inline in sidebar */}
                    <div className="mt-8 pt-6 border-t border-border/20">
                      <ContactSLATimeline />
                    </div>
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
        @keyframes contact-vignette-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.65; }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain { animation: none !important; }
          [style*="contact-vignette-breathe"] { animation: none !important; opacity: 0.7 !important; }
          [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
