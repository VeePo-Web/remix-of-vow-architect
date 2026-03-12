import { MinimalHeader } from "@/components/MinimalHeader";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { LuxuryInput, LuxuryTextarea } from "@/components/ui/luxury-input";
import { ContactCelebration } from "@/components/ContactCelebration";
import { useState, useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import witnessCeremonyImg from "@/assets/witness-ceremony.jpg";

/* ─── Schema ──────────────────────────────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, "Please share your name so I know who I am speaking with"),
  email: z.string().email("Please add your email so I can write back"),
  reason: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const trustStats = [
  { value: "24hr", label: "Response Time" },
  { value: "No", label: "Audition" },
  { value: "Free", label: "First Chat" },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function TeachingContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  usePageTheme();

  useEffect(() => {
    document.title = "Get in Touch — Piano Mentorship | Parker Gawryletz";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Reach out about piano mentorship. No audition, no obligation — just a conversation."
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

  /* ── Success state ──────────────────────────────────────────────────────── */
  if (isSubmitted) {
    return <ContactCelebration vertical="teaching" />;
  }

  /* ── Form ───────────────────────────────────────────────────────────────── */
  const tcSections = [
    { id: "tc-hero", label: "Get in Touch", isBlackKey: false },
    { id: "tc-form", label: "Your Details", isBlackKey: true },
    { id: "tc-trust", label: "What to Expect", isBlackKey: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={tcSections} />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          id="tc-hero"
          className="relative h-[38vh] min-h-[260px] overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={witnessCeremonyImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            style={{ animation: "ken-burns 30s ease-in-out infinite alternate" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background) / 0.25) 0%, hsl(var(--background) / 0.9) 100%)",
            }}
          />
          <div className="absolute inset-0 grain opacity-[0.05] pointer-events-none" />
        </section>

        {/* ── Form section ──────────────────────────────────────────────────── */}
        <section id="tc-form" className="py-16 md:py-24 px-4 relative">
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
            <div className="text-center mb-14">
              <p className="overline text-muted-foreground mb-3">Get in Touch</p>
              <h1
                className="font-display font-light text-foreground"
                style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15 }}
              >
                Interested in lessons?<br className="hidden sm:block" /> Let's talk.
              </h1>
              <div className="chapter-rule mx-auto mt-6 mb-6" />
              <p className="text-muted-foreground font-light max-w-md mx-auto leading-relaxed" style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}>
                A name, an email, and whatever brought you here. That is all I need.
              </p>
            </div>

            {/* Form card */}
            <div
              className="max-w-xl mx-auto rounded-lg p-8 md:p-12"
              style={{
                background: "hsl(var(--card) / 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid hsl(var(--border) / 0.35)",
                boxShadow:
                  "0 1px 60px hsl(var(--background) / 0.4), inset 0 1px 0 hsl(var(--vow-yellow) / 0.04)",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
                {/* Fields */}
                <div className="space-y-7">
                  <LuxuryInput
                    label="Your name"
                    id="name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <LuxuryInput
                    label="Email address"
                    id="email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <div>
                    <LuxuryTextarea
                      label="What brought you to the piano?"
                      id="reason"
                      rows={3}
                      placeholder="A song you love, a goal you have, or just curiosity..."
                      {...register("reason")}
                    />
                    <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mt-2 font-light">
                      There is no wrong answer.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }} className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-4 overflow-hidden group transition-all duration-300 disabled:opacity-50"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--vow-yellow) / 0.18), transparent 60%)",
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-xs tracking-[0.22em] uppercase font-light">
                      Send Message
                    </span>
                  </button>
                  <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mt-4 text-center font-light">
                    I only use your information to write back. Nothing else.
                  </p>
                </div>
              </form>
            </div>

            {/* ── Trust signals ─────────────────────────────────────────────── */}
            <div id="tc-trust" className="mt-16 max-w-xs mx-auto grid grid-cols-3 gap-4 text-center">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display font-light text-foreground"
                    style={{ fontSize: "clamp(17px, 2vw, 21px)" }}
                  >
                    {stat.value}
                  </p>
                  <div
                    className="w-5 h-px mx-auto my-2"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)",
                    }}
                    aria-hidden="true"
                  />
                  <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-light">
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
