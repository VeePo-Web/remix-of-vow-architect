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

import eventsPerformerBw from "@/assets/events-performer-bw.webp";

const schema = z.object({
  name:    z.string().min(2, "Please share your name"),
  email:   z.string().email("A valid email so I can write back"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function EventsContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  usePageTheme();

  useEffect(() => {
    document.title = "Start a Conversation — Events Piano | Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Tell me about your event. I will respond within 24 hours with a clear quote."
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: { ...data, vertical: "events" },
    });
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or email parker@veepo.ca directly.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ContactCelebration vertical="events" />;
  }

  return (
    <div className="min-h-screen pricing-page">
      <div className="hidden md:block">
        <PricingNav />
      </div>

      <main id="main-content">
      <div className="md:hidden">
        <ContactConversation vertical="events" onSubmitted={() => setIsSubmitted(true)} />
      </div>

      <div className="hidden md:block">

        {/* ═══ HERO ═══ */}
        <section className="sub-pad sub-section pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Events Piano</p>
            <h1
              className="font-display font-semibold leading-[1.08] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(40px,6vw,72px)", maxWidth: "16ch" }}
            >
              Tell me about your evening.
            </h1>
            <p className="contact-lede">
              The venue, the occasion, the energy you want your guests to feel.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={eventsPerformerBw} alt="Parker seated at his keyboard on stage, dramatic black and white" loading="eager" style={{ objectPosition: "center 30%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ FORM — dark band ═══ */}
        <section className="sub-dark">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="contact-section-label" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
                Discuss Your Event
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
                    The venue, the guests, the atmosphere you envision. I will respond within 24 hours with a clear quote and a custom setlist direction tailored to your event.
                  </p>

                  {/* Trust stats */}
                  <div className="mt-14 pricing-trust-grid" style={{ maxWidth: "320px" }}>
                    <div className="pricing-trust-stat">
                      <p className="pricing-trust-stat__value">24hr</p>
                      <p className="pricing-trust-stat__label">Response</p>
                    </div>
                    <div className="pricing-trust-stat">
                      <p className="pricing-trust-stat__value">100%</p>
                      <p className="pricing-trust-stat__label">Reply Rate</p>
                    </div>
                    <div className="pricing-trust-stat">
                      <p className="pricing-trust-stat__value">Free</p>
                      <p className="pricing-trust-stat__label">Initial Quote</p>
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
                      He responded in four hours with a full proposal. We booked the same day.
                    </p>
                    <p className="contact-testimonial__attribution">
                      Rebecca &middot; Telus Spark
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <p className="contact-disclaimer">
                    This is not a booking form. It is just the beginning of a conversation. No commitment, no obligation.
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
                        <label htmlFor="message">Tell me about your event</label>
                        <textarea
                          id="message"
                          className="pricing-textarea"
                          rows={5}
                          placeholder="The occasion, the venue, how many guests, the energy you want in the room."
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
                        Discuss Your Event
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
                      <span className="contact-next-step__text">I send a tailored proposal for your gathering</span>
                    </div>
                    <div className="contact-next-step">
                      <span className="contact-next-step__number">02</span>
                      <span className="contact-next-step__text">A brief call to confirm details and answer questions</span>
                    </div>
                    <div className="contact-next-step">
                      <span className="contact-next-step__number">03</span>
                      <span className="contact-next-step__text">Logistics confirmed — your event is on my calendar</span>
                    </div>
                  </div>
                </div>

              </div>
            </RevealOnScroll>

          </div>
        </section>

      </div>
      </main>

      <div className="hidden md:block">
        <Footer />
        <MobileStickyBar />
      </div>
    </div>
  );
}
