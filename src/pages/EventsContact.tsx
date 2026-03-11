import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { LuxuryInput, LuxuryTextarea } from "@/components/ui/luxury-input";
import { PillSelector } from "@/components/ui/pill-selector";
import { ContactCelebration } from "@/components/ContactCelebration";
import { useState, useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import eventsBallroomImg from "@/assets/events-ballroom-grand.jpg";

/* ─── Schema ──────────────────────────────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please add your email so I can respond"),
  eventDate: z.string().optional(),
  venue: z.string().optional(),
  occasion: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

/* ─── Options ─────────────────────────────────────────────────────────────── */
const occasionOptions = [
  { id: "dinner", label: "Private Dinner" },
  { id: "church", label: "Church Service" },
  { id: "cocktail", label: "Cocktail" },
  { id: "gala", label: "Gala" },
  { id: "corporate", label: "Corporate" },
  { id: "other", label: "Other" },
];

const durationOptions = [
  { id: "1hr", label: "1 Hour" },
  { id: "2-3hr", label: "2–3 Hours" },
  { id: "4hr+", label: "4+ Hours" },
];

const trustStats = [
  { value: "24hr", label: "Response Time" },
  { value: "100%", label: "Response Rate" },
  { value: "Free", label: "Initial Plan" },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function EventsContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [occasion, setOccasion] = useState<string | undefined>();
  const [duration, setDuration] = useState<string | undefined>();
  usePageTheme();

  useEffect(() => {
    document.title = "Discuss Your Event — Parker Allard";
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
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (_data: FormData) => {
    setIsSubmitted(true);
  };

  /* ── Success ────────────────────────────────────────────────────────────── */
  if (isSubmitted) {
    return <ContactCelebration vertical="events" />;
  }

  /* ── Form ───────────────────────────────────────────────────────────────── */
  const ecSections = [
    { id: "ec-hero", label: "Get in Touch", isBlackKey: false },
    { id: "ec-form", label: "Event Details", isBlackKey: true },
    { id: "ec-trust", label: "What to Expect", isBlackKey: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={ecSections} />

      <main>
        {/* ── Cinematic hero strip ─────────────────────────────────────────── */}
        <div id="ec-hero" className="relative h-[36vh] min-h-[240px] overflow-hidden" aria-hidden="true">
          <img
            src={eventsBallroomImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            style={{ animation: "ken-burns 28s ease-in-out infinite alternate" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background) / 0.25) 0%, hsl(var(--background) / 0.92) 100%)",
            }}
          />
          <div className="absolute inset-0 grain opacity-[0.05] pointer-events-none" />
        </div>

        {/* ── Form section ──────────────────────────────────────────────────── */}
        <section id="ec-form" className="py-16 md:py-24 px-4 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="container max-w-4xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-14 animate-fade-in">
              <p className="overline text-muted-foreground mb-3">The Conversation</p>
              <h1
                className="font-display font-light text-foreground"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.12 }}
              >
                Tell me about your gathering.
              </h1>
              <div className="chapter-rule mx-auto mt-6 mb-6" />
              <p
                className="text-muted-foreground font-light max-w-md mx-auto leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}
              >
                I will respond within 24 hours with a tailored proposal — repertoire, logistics, and a plan for your event.
              </p>
            </div>

            {/* Form card */}
            <div
              className="max-w-2xl mx-auto rounded-lg p-8 md:p-12 animate-fade-in"
              style={{
                background: "hsl(var(--card) / 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid hsl(var(--border) / 0.35)",
                boxShadow:
                  "0 4px 60px hsl(var(--background) / 0.5), inset 0 1px 0 hsl(var(--vow-yellow) / 0.05)",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>

                {/* ── § 1 — About Your Event ───────────────────────────────── */}
                <div>
                  <p className="overline text-primary/40 mb-7">About Your Event</p>
                  <div className="space-y-7">
                    <LuxuryInput
                      label="Your name"
                      id="name"
                      autoComplete="name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <LuxuryInput
                      label="Email address"
                      id="email"
                      type="email"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <div className="grid sm:grid-cols-2 gap-7">
                      <LuxuryInput
                        label="Event date"
                        id="eventDate"
                        type="date"
                        {...register("eventDate")}
                      />
                      <LuxuryInput
                        label="Venue + location"
                        id="venue"
                        placeholder="The Fairmont, Calgary"
                        {...register("venue")}
                      />
                    </div>
                  </div>
                </div>

                {/* ── § 2 — Shape the Sound ────────────────────────────────── */}
                <div
                  className="pt-8"
                  style={{ borderTop: "1px solid hsl(var(--border) / 0.14)" }}
                >
                  <p className="overline text-primary/40 mb-7">Shape the Sound</p>
                  <div className="space-y-7">
                    <div>
                      <p className="text-[0.625rem] tracking-[0.15em] uppercase font-light text-muted-foreground/55 mb-3">
                        Occasion type
                      </p>
                      <PillSelector
                        options={occasionOptions}
                        value={occasion}
                        onChange={setOccasion}
                        label="Occasion type"
                      />
                    </div>
                    <div>
                      <p className="text-[0.625rem] tracking-[0.15em] uppercase font-light text-muted-foreground/55 mb-3">
                        Duration needed
                      </p>
                      <PillSelector
                        options={durationOptions}
                        value={duration}
                        onChange={setDuration}
                        label="Duration"
                      />
                    </div>
                  </div>
                </div>

                {/* ── § 3 — Optional notes ─────────────────────────────────── */}
                <div style={{ borderTop: "1px solid hsl(var(--border) / 0.14)" }} className="pt-6">
                  {!showNotes ? (
                    <button
                      type="button"
                      onClick={() => setShowNotes(true)}
                      className="text-[0.625rem] tracking-[0.14em] uppercase font-light text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-200 underline underline-offset-4"
                    >
                      Add music preferences or event details
                    </button>
                  ) : (
                    <div className="animate-fade-in">
                      <LuxuryTextarea
                        label="Event vision or music preferences"
                        id="notes"
                        rows={3}
                        placeholder="Atmosphere, specific pieces, dress code, guest profile..."
                        {...register("notes")}
                      />
                    </div>
                  )}
                </div>

                {/* ── Submit ────────────────────────────────────────────────── */}
                <div style={{ borderTop: "1px solid hsl(var(--border) / 0.14)" }} className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-[1.125rem] overflow-hidden group transition-all duration-300 disabled:opacity-50 rounded-none"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--vow-yellow) / 0.2), transparent 55%)",
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-[0.625rem] tracking-[0.24em] uppercase font-light">
                      Send My Inquiry
                    </span>
                  </button>
                  <p className="text-[0.5rem] tracking-[0.12em] uppercase text-muted-foreground/25 mt-4 text-center font-light">
                    A tailored proposal arrives within 24 hours
                  </p>
                </div>

              </form>
            </div>

            {/* ── Trust signals ─────────────────────────────────────────────── */}
            <div id="ec-trust" className="mt-16 max-w-xs mx-auto grid grid-cols-3 gap-6 text-center">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display font-light"
                    style={{
                      fontSize: "clamp(17px, 2vw, 21px)",
                      background: "linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </p>
                  <div
                    className="w-5 h-px mx-auto my-2"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.22), transparent)",
                    }}
                    aria-hidden="true"
                  />
                  <p className="text-[0.5rem] tracking-[0.15em] uppercase text-muted-foreground/28 font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
