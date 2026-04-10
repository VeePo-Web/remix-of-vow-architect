import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import eventsHeroImg from "@/assets/events-hero.jpg";
import eventsBallroomImg from "@/assets/events-ballroom-grand.jpg";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "faq-hero",      label: "Overview",        isBlackKey: false },
  { id: "faq-quick",     label: "At a Glance",     isBlackKey: true  },
  { id: "faq-concerns",  label: "Common Questions", isBlackKey: false },
  { id: "faq-logistics", label: "Logistics",       isBlackKey: true  },
  { id: "faq-words",     label: "Kind Words",      isBlackKey: false },
  { id: "faq-cta",       label: "Get in Touch",    isBlackKey: true  },
];

const trustStats = [
  { value: "24hr", label: "Response" },
  { value: "200+", label: "Events" },
  { value: "$4M", label: "Insured" },
];

const atAGlance = [
  { label: "Any venue, any size", desc: "From intimate dinner parties to 500-guest galas — I adapt the sound, the setup, and the repertoire to fit the room and the moment." },
  { label: "Self-contained setup", desc: "I arrive with everything: instrument, sound system, power. No venue infrastructure required. No cords across your floor." },
  { label: "Flexible repertoire", desc: "Classical, jazz, pop, film scores — curated to your event's mood and audience. You choose the atmosphere, I build the playlist." },
  { label: "Seamless coordination", desc: "I work directly with your event planner, AV team, or venue coordinator. Cue sheets and timelines are agreed upon in advance." },
  { label: "No surprises", desc: "Transparent pricing, clear timelines, documented agreements. Every detail confirmed before your event day." },
];

const concerns = [
  { q: "What kind of events do you play?", a: "Corporate galas, charity fundraisers, private dinner parties, cocktail receptions, holiday events, product launches, and any gathering that benefits from live piano. If it involves people and a moment, I can elevate it." },
  { q: "Can you play specific songs or genres?", a: "Yes. I work from a repertoire spanning classical, jazz standards, contemporary pop, film scores, and holiday music. You can request specific songs or describe the atmosphere you want and I will build a curated setlist." },
  { q: "How much space do you need?", a: "Approximately 6 feet by 4 feet for the instrument and bench. I can work with tight spaces — corners, stages, alcoves. During the planning call, we confirm placement based on your floor plan." },
  { q: "Do you bring your own instrument?", a: "Yes. I arrive with a professional digital piano, weighted keys, and a dedicated sound system calibrated to your venue's acoustics. If your venue has a grand piano in good condition, I am happy to use it instead." },
  { q: "How far in advance should I book?", a: "For peak season events (November through January, June through August), I recommend booking at least six weeks ahead. For other dates, two to three weeks is usually sufficient. Check my availability anytime — I respond within 24 hours." },
  { q: "Can you adjust volume for speeches or announcements?", a: "Absolutely. I coordinate with your MC or event manager in advance. Volume adjustments happen in real time — fade down for speeches, fade up for ambience. It is seamless." },
  { q: "What happens if there is a power outage or equipment issue?", a: "I carry backup power and redundant audio systems. In my entire career, no event has lost music due to a technical failure. I plan for the worst so you never have to think about it." },
  { q: "Do you play during the entire event?", a: "I offer packages from one hour to full-day coverage. Most events book two to four hours with breaks built in. We agree on the schedule in advance so there are no gaps in your experience." },
];

const logisticsItems = [
  { label: "Setup time", desc: "I arrive 45 to 60 minutes before your event to set up, sound check, and confirm placement with your coordinator." },
  { label: "Load-in requirements", desc: "I need one standard electrical outlet and elevator or ground-level access for equipment. Everything fits through a standard doorway." },
  { label: "Sound check", desc: "Volume levels are calibrated to your room size and guest count. I verify from multiple positions in the venue during setup." },
  { label: "Attire", desc: "I match your event's dress code — black tie, business formal, or smart casual. Just let me know and I will dress accordingly." },
  { label: "Insurance", desc: "Full commercial liability coverage up to $4 million. Certificate of insurance available for your venue upon request." },
];

const testimonials = [
  {
    quote: "Parker read the room better than anyone on our planning team. He knew exactly when to be background and when to be the moment.",
    author: "Sarah",
    location: "Corporate Gala, Calgary",
  },
  {
    quote: "Our guests kept asking who the pianist was. Three of them booked him for their own events before the night was over.",
    author: "James",
    location: "Charity Fundraiser, Canmore",
  },
  {
    quote: "He handled a last-minute venue change without blinking. Setup was done before the first guest arrived.",
    author: "Michelle",
    location: "Private Dinner, Cochrane",
  },
];

export default function EventsFAQ() {
  usePageTheme();
  useEffect(() => {
    document.title = "Event FAQ — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Everything you need to know about booking live piano for your private event — logistics, repertoire, pricing, and more."
    );
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="faq-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Event FAQ</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              Every detail, addressed before you ask.
            </h1>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              Your event deserves precision. Here is everything I would want to know if I were planning it.
            </p>
          </RevealOnScroll>

          {/* Trust stats */}
          <RevealOnScroll variant="up">
            <div className="pricing-trust-grid mt-16" style={{ maxWidth: "380px" }}>
              {trustStats.map((stat, i) => (
                <div key={i} className="pricing-trust-stat">
                  <p className="pricing-trust-stat__value">{stat.value}</p>
                  <p className="pricing-trust-stat__label">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={eventsHeroImg} alt="Elegant event venue with grand piano and ambient lighting" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ AT A GLANCE ═══ */}
        <section id="faq-quick" className="pricing-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">At a Glance</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Five things to know before we talk.
            </h2>
          </RevealOnScroll>

          <div className="mt-14 divide-y divide-[hsl(36_16%_90%)]">
            {atAGlance.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-10 py-6">
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Pull quote */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                The best events feel effortless. That only happens when every detail has been addressed in advance.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Plan Everything
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ COMMON QUESTIONS ═══ */}
        <section id="faq-concerns" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <div className="max-w-[680px]">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Common Questions</p>
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
                What event planners want to know.
              </h2>
              <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                From repertoire to redundancy — here is how I handle every detail.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <Accordion type="single" collapsible className="w-full">
                {concerns.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} style={{ borderColor: "hsl(36 16% 90%)" }}>
                    <AccordionTrigger className="text-left font-sans text-[15px] font-semibold hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-[14px] leading-[1.75] pb-5" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ EDITORIAL IMAGE — Ballroom ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={eventsBallroomImg} alt="Grand ballroom with piano and ambient event lighting" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ LOGISTICS ═══ */}
        <section id="faq-logistics" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Logistics</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
              Setup, sound, and coordination.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Every logistical detail is handled before your event day.
            </p>
          </RevealOnScroll>

          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {logisticsItems.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div className="py-5 flex items-start gap-4">
                  <span className="pricing-diamond" style={{ marginTop: "6px" }} />
                  <div>
                    <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                    <p className="font-sans text-[14px] leading-[1.7] mt-1" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="up">
            <div className="mt-10">
              <Link to="/events/pricing" className="pricing-cta--link">
                View event packages
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </RevealOnScroll>

          {/* Pull quote */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                I treat every event like it is the only one on my calendar. Because on your day, it is.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Overdeliver
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ KIND WORDS ═══ */}
        <section id="faq-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What clients say</p>
          </RevealOnScroll>

          <div className="space-y-20 max-w-[680px]">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 120}>
                <div className="pricing-testimonial">
                  <p className="pricing-testimonial__quote">&ldquo;{t.quote}&rdquo;</p>
                  <p className="pricing-testimonial__author">{t.author} &middot; {t.location}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ EDITORIAL IMAGE — Hands on keys ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={handsKeysImg} alt="Pianist's hands on keys during a live performance" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ FINAL CTA ═══ */}
        <section id="faq-cta" className="pricing-section piano-section-target pb-36">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1]" style={{ maxWidth: "14ch" }}>
                  Your event deserves presence.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Tell me about your event — the venue, the guest count, the atmosphere you want. I will respond within 24 hours with a plan tailored to your evening.
                </p>
                <div className="mt-10">
                  <Link to="/events/contact" className="pricing-cta">
                    Discuss Your Event
                  </Link>
                </div>
                <p className="text-[13px] mt-5" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                  No commitment. No obligation. Just a conversation.
                </p>
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
