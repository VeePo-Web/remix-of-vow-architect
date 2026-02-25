import { Navigation } from "@/components/Navigation";
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
import { useState, useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import contactHeroImg from "@/assets/contact-hero.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Please add your name"),
  email: z.string().email("Please add your email so I can send your plan"),
  phone: z.string().optional(),
  eventDate: z.string().min(1, "Pick a date—even an estimate helps me map power and timing"),
  venue: z.string().min(2, "Venue name or city helps me tailor SPL and seating notes"),
  ceremonyTime: z.string().min(1, "Ceremony time helps align music and mics"),
  guestCount: z.string().min(1, "Guest count helps tune audibility"),
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
  
  // Call usePageTheme in useEffect to ensure context is ready
  useEffect(() => {
    // This will trigger the theme change after mount
  }, []);
  
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
      <Navigation />

      {/* Section 1: Hero with atmospheric background */}
      <section className="relative section-padding bg-background overflow-hidden">
        {/* Background image */}
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
          aria-hidden="true"
        />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-20 pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Breadcrumbs
              items={[{ label: "Home", path: "/" }, { label: "Hold Your Date" }]}
            />

            <div className="text-center mb-12">
              <div className="overline mb-2">Clear, Fast, Certain</div>
              <h1 className="h1 mx-auto">
                Hold your wedding date & get your ceremony-audio plan in 24h
              </h1>
              <div className="chapter-rule mx-auto" />
              <p className="p-lead mx-auto text-muted-foreground mt-6">
                Fill out this short form and I'll send your personalized SPL overview,
                setup plan, and cue-integration sheet within one business day.
              </p>
              <p className="caption mt-4">No sales call. No pressure. Just clarity.</p>
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
                  <Card className="lg:col-span-2 p-8 bg-card border-border card-keyline">
                    <h2 className="h4 mb-6">
                      Let's secure your date
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
                            I align music + mics to this.
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
                            Helps tune audibility and seating arc.
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
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                            <RadioGroupItem value="elegant" id="elegant" />
                            <Label htmlFor="elegant" className="cursor-pointer flex-1">
                              <span className="font-semibold block">
                                🎹 Elegant / Classical
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Timeless ceremony favorites
                              </span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                            <RadioGroupItem value="modern" id="modern" />
                            <Label htmlFor="modern" className="cursor-pointer flex-1">
                              <span className="font-semibold block">
                                💕 Modern Love Songs
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Contemporary acoustic arrangements
                              </span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                            <RadioGroupItem value="indie" id="indie" />
                            <Label htmlFor="indie" className="cursor-pointer flex-1">
                              <span className="font-semibold block">
                                🎸 Indie / Minimal
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Understated, curated selections
                              </span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                            <RadioGroupItem value="surprise" id="surprise" />
                            <Label htmlFor="surprise" className="cursor-pointer flex-1">
                              <span className="font-semibold block">
                                ✨ Surprise Me
                              </span>
                              <span className="text-xs text-muted-foreground">
                                I'll craft the perfect vibe for your venue
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
                          I'll CC them on the plan.
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
                            className="flex-1 hover-scale"
                          >
                            Get my ceremony-audio plan
                          </Button>
                          <ValuePromiseBadge />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          You'll receive a custom SPL map, timeline support, and a
                          clarity checklist. I only use your info to build your plan.
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
    </div>
  );
}
