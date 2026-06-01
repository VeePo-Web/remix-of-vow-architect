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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ContactConversation } from "@/components/contact/ContactConversation";

import eventsStageWarmlight from "@/assets/events-stage-warmlight.png";

const schema = z.object({
  name:    z.string().min(2, "Please share your name"),
  email:   z.string().email("A valid email so I can write back"),
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
      "Tell me what you want to play. No audition, no obligation — just a conversation about where you want to begin."
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: { ...data, vertical: "teaching" },
    });
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or email parker@veepo.ca directly.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ContactCelebration vertical="teaching" />;
  }

  return (
    <div className="min-h-screen pricing-page">
      <div className="hidden md:block">
        <PricingNav />
      </div>

      <div className="md:hidden">
        <ContactConversation vertical="teaching" onSubmitted={() => setIsSubmitted(true)} />
      </div>

      <main className="hidden md:block">

        {/* ═══ HERO ═══ */}
        <section className="sub-pad sub-section pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Piano Mentorship</p>
            <h1
              className="font-display font-semibold leading-[1.08] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(40px,6vw,72px)", maxWidth: "16ch" }}
            >
              Tell me what you want to play.
            </h1>
            <p className="contact-lede">
              A song, a feeling, a lifelong curiosity — whatever brought you here is enough.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={eventsStageWarmlight} alt="Parker performing under warm amber stage lighting" loading="eager" style={{ objectPosition: "center 30%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ FORM — dark band ═══ */}
        <section className="sub-dark">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="contact-section-label" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
                Begin the Conversation
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <div
                className="grid items-start mt-12"
                style={{ gridTemplateColumns: "1fr 1.15fr", gap: "clamp(40px,8vw,100px)" }}
              >

                {/* Left — editorial context */}
                <div>
                  <p
                    className="font-sans text-[15px] leading-[1.75]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "34ch" }}
                  >
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

                  {/* Testimonial */}
                  <div className="contact-testimonial">
                    <span className="contact-testimonial__ornament" aria-hidden="true">&ldquo;</span>
                    <p className="contact-testimonial__quote" style={{ paddingTop: "20px" }}>
                      I told him I had no talent. He told me that was not his concern. A year later I played at my own wedding.
                    </p>
                    <p className="contact-testimonial__attribution">
                      Maria &middot; Calgary
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
                        className="pricing-cta pricing-cta--inverted disabled:opacity-50"
                      >
                        Begin the Conversation
                      </button>
                      <p className="contact-submit-reassurance">
                        I respond to every message within 24 hours.
                      </p>
                    </div>
                  </form>

                  {/* What happens next */}
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

          </div>
        </section>

      </main>

      <div className="hidden md:block">
        <Footer />
        <MobileStickyBar />
      </div>
    </div>
  );
}
