import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactReassuranceCards } from "@/components/ContactReassuranceCards";
import { ContactSLATimeline } from "@/components/ContactSLATimeline";
import { ContactTestimonials } from "@/components/ContactTestimonials";
import { ContactFormSuccess } from "@/components/ContactFormSuccess";
import { ValuePromiseBadge } from "@/components/ValuePromiseBadge";
import { Upload } from "lucide-react";
import { useState } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import contactHeroImg from "@/assets/contact-hero.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Please add your name"),
  email: z.string().email("Please add your email so I can send your plan"),
  phone: z.string().optional(),
  eventDate: z.string().min(1, "An approximate date helps me begin planning"),
  venue: z.string().min(2, "Knowing the venue helps me shape the sound to fit the space"),
  ceremonyTime: z.string().min(1, "This helps me align the music to your timeline"),
  guestCount: z.string().min(1, "Guest count helps me ensure every word carries"),
  vibe: z.enum(["elegant", "modern", "indie", "surprise"], {
    required_error: "Please select a ceremony vibe",
  }),
  plannerEmail: z.union([z.string().email(), z.literal("")]).optional(),
  additionalNotes: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  usePageTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const vibeValue = watch("vibe");

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen">
      <MinimalHeader />

      {/* Section 1: Hero with atmospheric background */}
      <section className="relative section-padding bg-background overflow-hidden" aria-label="Hold your date">
        {/* Background image with overflow-hidden wrapper */}
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
              willChange: "transform",
            }}
          />
          <img src={contactHeroImg} alt="" className="hidden" loading="eager" decoding="async" />
        </div>
        {/* Warm fog */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
        {/* Breathing vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
            animation: "contact-vignette-breathe 6s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" style={{ willChange: "opacity" }} aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Breadcrumbs
              items={[{ label: "Home", path: "/" }, { label: "Hold Your Date" }]}
            />

            <div className="text-center mb-12">
              <div className="overline mb-2">The Crossing</div>
              <h1 className="h1 mx-auto">
                Every arrangement begins with a conversation.
              </h1>
              <div className="chapter-rule mx-auto" />
              <p className="p-lead mx-auto text-muted-foreground mt-6">
                Tell me about your day — the venue, the feeling, the songs that matter.
                I will respond within 24 hours with a personalized plan.
              </p>
              <p className="caption mt-4 text-center">No obligation. Two-minute form.</p>
            </div>

            {isSubmitted ? (
              <Card className="p-8 bg-card border-border card-keyline">
                <ContactFormSuccess />
              </Card>
            ) : (
              <>
                {/* Section 2: Form + Reassurance Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                  {/* Form - 2/3 width */}
                  <Card className="lg:col-span-2 p-8 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] card-keyline">
                    <h2 className="h4 mb-6">
                      I will secure your date
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name & Email */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">First & last name</Label>
                          <Input
                            id="name"
                            {...register("name")}
                            className="mt-2"
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="email">Email address</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            I send your plan here.
                          </p>
                          {errors.email && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          For quick clarifications only.
                        </p>
                      </div>

                      {/* Event Date & Venue */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="eventDate">Event date</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            {...register("eventDate")}
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Use your best estimate if TBD.
                          </p>
                          {errors.eventDate && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.eventDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="venue">Venue name + location</Label>
                          <Input
                            id="venue"
                            {...register("venue")}
                            placeholder="Silvertip Resort, Canmore"
                            className="mt-2"
                          />
                          {errors.venue && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.venue.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Ceremony Time & Guest Count */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="ceremonyTime">Ceremony start time</Label>
                          <Input
                            id="ceremonyTime"
                            type="time"
                            {...register("ceremonyTime")}
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            I align music to your timeline.
                          </p>
                          {errors.ceremonyTime && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.ceremonyTime.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="guestCount">Guest count (approx.)</Label>
                          <Input
                            id="guestCount"
                            type="number"
                            {...register("guestCount")}
                            placeholder="100"
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Helps me ensure every word carries to every seat.
                          </p>
                          {errors.guestCount && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.guestCount.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Vibe Selector */}
                      <div>
                        <Label>Ceremony vibe</Label>
                        <RadioGroup
                          value={vibeValue}
                          onValueChange={(value) =>
                            setValue("vibe", value as any, { shouldValidate: true })
                          }
                          className="grid sm:grid-cols-2 gap-3 mt-3"
                        >
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary/30 transition-all duration-[180ms] cursor-pointer group">
                            <RadioGroupItem value="elegant" id="elegant" />
                            <Label htmlFor="elegant" className="cursor-pointer flex-1">
                              <span className="font-medium block group-hover:translate-y-[-1px] transition-transform duration-[180ms]">
                                Elegant — Classical
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Timeless ceremony compositions
                              </span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary/30 transition-all duration-[180ms] cursor-pointer group">
                            <RadioGroupItem value="modern" id="modern" />
                            <Label htmlFor="modern" className="cursor-pointer flex-1">
                              <span className="font-medium block group-hover:translate-y-[-1px] transition-transform duration-[180ms]">
                                Modern — Love Songs
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Contemporary acoustic arrangements
                              </span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary/30 transition-all duration-[180ms] cursor-pointer group">
                            <RadioGroupItem value="indie" id="indie" />
                            <Label htmlFor="indie" className="cursor-pointer flex-1">
                              <span className="font-medium block group-hover:translate-y-[-1px] transition-transform duration-[180ms]">
                                Indie — Minimal
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Understated, curated selections
                              </span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary/30 transition-all duration-[180ms] cursor-pointer group">
                            <RadioGroupItem value="surprise" id="surprise" />
                            <Label htmlFor="surprise" className="cursor-pointer flex-1">
                              <span className="font-medium block group-hover:translate-y-[-1px] transition-transform duration-[180ms]">
                                I trust your ear
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Shape the sound to suit the venue and the moment
                              </span>
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.vibe && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.vibe.message}
                          </p>
                        )}
                      </div>

                      {/* Planner Email */}
                      <div>
                        <Label htmlFor="plannerEmail">
                          Add your planner (Optional)
                        </Label>
                        <Input
                          id="plannerEmail"
                          type="email"
                          {...register("plannerEmail")}
                          placeholder="planner@email.com"
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          I will CC them on the plan.
                        </p>
                      </div>

                      {/* File Upload */}
                      <div>
                        <Label htmlFor="fileUpload">
                          Cue sheet or song request upload
                        </Label>
                        <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                          <input
                            id="fileUpload"
                            type="file"
                            accept=".pdf,.docx,.jpg,.jpeg,.png,.mp3"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="fileUpload" className="cursor-pointer">
                            {fileName ? (
                              <p className="text-sm font-medium">{fileName}</p>
                            ) : (
                              <>
                                <p className="text-sm font-medium">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  PDF, DOCX, JPG, MP3
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <Label htmlFor="additionalNotes">
                          Tell me about your ceremony vision (Optional)
                        </Label>
                        <Textarea
                          id="additionalNotes"
                          {...register("additionalNotes")}
                          placeholder="Song requests, tone preferences, special moments..."
                          rows={4}
                          className="mt-2"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <Button
                            type="submit"
                            size="lg"
                            variant="primary-dark"
                            className="flex-1 hover-scale"
                          >
                            Hold my date
                          </Button>
                          <ValuePromiseBadge />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          You will receive a personalized ceremony plan within 24 hours.
                          I only use your information to prepare your arrangement.
                        </p>
                      </div>
                    </form>
                  </Card>

                  {/* Reassurance Cards - 1/3 width */}
                  <div className="lg:col-span-1">
                    <ContactReassuranceCards />
                  </div>
                </div>

                {/* Section 4: Testimonials */}
                <div className="mb-12">
                  <ContactTestimonials />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: SLA Timeline */}
      {!isSubmitted && (
        <section className="section--surface section-padding">
          <div className="container mx-auto px-4">
            <ContactSLATimeline />
          </div>
        </section>
      )}

      <Footer />
      <MobileStickyBar />

      <style>{`
        @keyframes contact-vignette-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.65; }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
