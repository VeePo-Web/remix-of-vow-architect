import { PricingNav } from "@/components/PricingNav";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { RevealOnScroll } from "@/components/animation";
import { ContactCelebration } from "@/components/ContactCelebration";
import { useState, useEffect, useRef } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("A valid email so I can write back"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function TeachingContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  usePageTheme();

  useEffect(() => {
    document.title = "Start a Conversation — Piano Mentorship | Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Interested in piano lessons? Send a message. No audition, no obligation."
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

  if (isSubmitted) {
    return <ContactCelebration vertical="teaching" />;
  }

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section className="pt-36 md:pt-48 pb-28 md:pb-36">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Piano Mentorship</p>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              Tell me what you want to play.
            </h1>
            <p className="contact-lede">
              A song, a feeling, a lifelong curiosity — whatever brought you here is enough.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ FORM ═══ */}
        <section className="pb-36 md:pb-44">
          <div className="pricing-section__divider" />

          {/* Section eyebrow */}
          <RevealOnScroll variant="up">
            <p className="contact-section-label">Begin the Conversation</p>
          </RevealOnScroll>

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-16 md:gap-20 items-start">

              {/* Left — editorial context */}
              <div>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "34ch" }}>
                  A name, an email, and whatever brought you to the piano. That is all I need. No audition, no preparation, no obligation.
                </p>

                {/* Trust stats */}
                <div className="mt-14 pricing-trust-grid" style={{ maxWidth: "320px" }}>
                  <div className="pricing-trust-stat">
                    <p className="pricing-trust-stat__value">24hr</p>
                    <p className="pricing-trust-stat__label">Response</p>
                  </div>
                  <div className="pricing-trust-stat">
                    <p className="pricing-trust-stat__value">No</p>
                    <p className="pricing-trust-stat__label">Audition</p>
                  </div>
                  <div className="pricing-trust-stat">
                    <p className="pricing-trust-stat__value">Free</p>
                    <p className="pricing-trust-stat__label">First Chat</p>
                  </div>
                </div>

                {/* Golden diamond separator */}
                <div className="contact-diamond-sep" aria-hidden="true">
                  <span className="contact-diamond-sep__dot" />
                  <span className="contact-diamond-sep__line" />
                </div>

                {/* Testimonial — elevated */}
                <div className="contact-testimonial">
                  <span className="contact-testimonial__ornament" aria-hidden="true">&ldquo;</span>
                  <p className="contact-testimonial__quote" style={{ paddingTop: "20px" }}>
                    I told him I had no talent. He told me that was not his concern. A year later I played at my own wedding.
                  </p>
                  <p className="contact-testimonial__attribution">
                    Maria &middot; Adult Beginner
                  </p>
                </div>

                {/* Disclaimer */}
                <p className="contact-disclaimer">
                  This is not a sign-up form. It is just the beginning of a conversation about what you want to play.
                </p>
              </div>

              {/* Right — form */}
              <div className="contact-form-surface">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="space-y-10">
                    <div className="pricing-input-group">
                      <label htmlFor="name">Your name</label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className={`pricing-input ${errors.name ? 'pricing-input--error' : ''}`}
                        placeholder="First and last"
                        {...register("name")}
                      />
                      {errors.name && <p className="pricing-input-error">{errors.name.message}</p>}
                    </div>

                    <div className="pricing-input-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={`pricing-input ${errors.email ? 'pricing-input--error' : ''}`}
                        placeholder="you@email.com"
                        {...register("email")}
                      />
                      {errors.email && <p className="pricing-input-error">{errors.email.message}</p>}
                    </div>

                    <div className="pricing-input-group">
                      <label htmlFor="message">What brought you to the piano?</label>
                      <textarea
                        id="message"
                        className="pricing-textarea"
                        rows={5}
                        placeholder="A song you love, a goal you have, or just curiosity."
                        {...register("message")}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="contact-submit-area">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="pricing-cta disabled:opacity-50"
                    >
                      Begin the Conversation
                    </button>
                    <p className="contact-submit-reassurance">
                      I respond to every message within 24 hours.
                    </p>
                  </div>
                </form>

                {/* What happens next — preview */}
                <div className="contact-next-steps">
                  <p className="contact-next-steps__title">What happens next</p>
                  <div className="contact-next-step">
                    <span className="contact-next-step__number">01</span>
                    <span className="contact-next-step__text">I write back with a question or two of my own</span>
                  </div>
                  <div className="contact-next-step">
                    <span className="contact-next-step__number">02</span>
                    <span className="contact-next-step__text">We schedule a short, informal first conversation</span>
                  </div>
                  <div className="contact-next-step">
                    <span className="contact-next-step__number">03</span>
                    <span className="contact-next-step__text">We begin — no audition, no expectations</span>
                  </div>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </section>

      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
