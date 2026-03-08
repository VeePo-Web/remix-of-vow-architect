import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactFormSuccess } from "@/components/ContactFormSuccess";
import { ContactSLATimeline } from "@/components/ContactSLATimeline";
import { ContactTestimonials } from "@/components/ContactTestimonials";
import { BentoSelector } from "@/components/BentoSelector";
import { ValuePromiseBadge } from "@/components/ValuePromiseBadge";
import { Upload, ChevronRight, ChevronLeft, DollarSign, RefreshCw, Clock, Shield } from "lucide-react";
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
              <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Hold Your Date" }]} />

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
                <Card className="p-8 bg-card border-border card-keyline">
                  <ContactFormSuccess />
                </Card>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  <Card className="lg:col-span-2 p-8 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-keyline">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((s, i) => (
                          <div key={s} className="flex items-center gap-1.5">
                            <div
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-[180ms] ${
                                step === s ? "bg-primary scale-110" : step > s ? "bg-primary/40" : "bg-muted-foreground/30"
                              }`}
                            />
                            {i < 2 && (
                              <div className={`w-4 h-px transition-colors duration-[180ms] ${step > s ? "bg-primary/30" : "bg-muted-foreground/20"}`} />
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground transition-opacity duration-[260ms]">
                        {step === 1 ? "Your day" : step === 2 ? "The sound" : "Final details"}
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
                            <ChevronRight size={16} className="ml-1" />
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
                              <ChevronLeft size={16} className="mr-1" />
                              Back
                            </Button>
                            <Button type="button" size="lg" variant="primary-dark" className="flex-1" onClick={handleStep2Next}>
                              Continue
                              <ChevronRight size={16} className="ml-1" />
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
                            <div className="space-y-3">
                              <button
                                type="button"
                                onClick={() => setShowStep3(true)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[180ms] underline underline-offset-2"
                              >
                                Add ceremony time, planner details, or song requests
                              </button>
                            </div>
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

                              <div>
                                <Label htmlFor="fileUpload">Cue sheet or upload</Label>
                                <div className="mt-2 border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/40 transition-colors duration-[180ms] cursor-pointer">
                                  <Upload className="mx-auto mb-1 text-muted-foreground" size={20} />
                                  <input id="fileUpload" type="file" accept=".pdf,.docx,.jpg,.jpeg,.png,.mp3" onChange={handleFileChange} className="hidden" />
                                  <label htmlFor="fileUpload" className="cursor-pointer">
                                    {fileName ? (
                                      <p className="text-sm font-medium">{fileName}</p>
                                    ) : (
                                      <p className="text-xs text-muted-foreground">PDF, DOCX, JPG, MP3</p>
                                    )}
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                                <ChevronLeft size={16} className="mr-1" />
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
                  </Card>

                  {/* Sidebar */}
                  <div className="lg:col-span-1 space-y-4">
                    {[
                      { icon: DollarSign, text: "No cost to hold your date — take the time you need." },
                      { icon: RefreshCw, text: "Full refund within 14 days — commitment without pressure." },
                      { icon: Clock, text: "Response within 24 hours — your personalized plan, always." },
                      { icon: Shield, text: "Insurance, redundancy, and documentation — included." },
                    ].map((item, i) => (
                      <Card key={i} className="bg-card/50 border-border p-4 flex items-start gap-3">
                        <item.icon className="text-primary shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                      </Card>
                    ))}

                    {/* Micro testimonial */}
                    <div className="pt-4 border-t border-border/50 mt-2">
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        "I sent my details and received a full plan the next morning — clearer than anything our previous musician offered in three weeks."
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Sandra & Leo · Cochrane</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {!isSubmitted && (
          <section className="section--surface section-padding">
            <div className="container mx-auto px-4">
              <ContactSLATimeline />
            </div>
          </section>
        )}

        {!isSubmitted && (
          <section className="section-padding">
            <div className="container mx-auto px-4">
              <ContactTestimonials />
            </div>
          </section>
        )}
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
