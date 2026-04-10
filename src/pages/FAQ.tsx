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

import faqHeroImg from "@/assets/faq-hero.jpg";
import venueEmptyImg from "@/assets/venue-empty-golden.jpg";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "faq-hero",      label: "Overview",        isBlackKey: false },
  { id: "faq-quick",     label: "At a Glance",     isBlackKey: true  },
  { id: "faq-concerns",  label: "Common Concerns", isBlackKey: false },
  { id: "faq-policies",  label: "Policies",        isBlackKey: true  },
  { id: "faq-words",     label: "Kind Words",      isBlackKey: false },
  { id: "faq-cta",       label: "Reserve My Date!", isBlackKey: true  },
];

const trustStats = [
  { value: "24hr", label: "Response" },
  { value: "500+", label: "Ceremonies" },
  { value: "$4M", label: "Insured" },
];

const atAGlance = [
  { label: "Every word heard", desc: "Dedicated wireless system, balanced in real time. Even outdoors, even in the last row." },
  { label: "No power needed", desc: "Silent battery system with independent backups. No generators, no cords, no noise." },
  { label: "Upgrade anytime", desc: "Change your arrangement up to two weeks before your date — no penalty, no questions." },
  { label: "Full refund window", desc: "Cancel within 14 days for a full refund. After that, your deposit becomes transferable credit." },
  { label: "A plan, not just a performance", desc: "Personalized ceremony plan within 24 hours — venue, timeline, and arrangements." },
];

const concerns = [
  { q: "What happens if equipment fails mid-ceremony?", a: "I bring four independent systems. A second wireless unit, a second instrument, and a pre-loaded speaker for critical cues. The fourth tier has never been needed. It exists anyway." },
  { q: "Will people in the back hear our vows?", a: "Yes. I measure and verify volume levels at multiple distances during setup to ensure clarity reaches every seat. Timestamped readings are included in your documentation." },
  { q: "How do I know my officiant will be coordinated?", a: "I co-author your cue sheet with your officiant and planner — every entrance, every vow, every exit is timed and agreed upon in advance." },
  { q: "What if it rains or snows?", a: "All equipment is weather-protected. We agree on a Plan B location in advance, and I can relocate within minutes. This is documented before your ceremony day." },
  { q: "Can I cancel or change my mind after booking?", a: "Yes. Full refund within 14 days. After that, your deposit converts to transferable credit. Clear timelines are documented in your agreement." },
  { q: "Can I see an example plan before I commit?", a: "Yes. I share a real sample ceremony plan so you can see exactly what you will receive — volume documentation, cue sheet, and venue-specific notes." },
  { q: "How quickly do I hear back after reaching out?", a: "Within 24 hours, you receive a personalized ceremony plan — venue considerations, suggested arrangements, and a timeline for your day." },
  { q: "How does a ceremony pianist compare to a DJ or band?", a: "The simplest question to ask any alternative: how do they ensure your outdoor vows are heard clearly and quietly? A detailed comparison is available on the pricing page." },
];

const policyItems = [
  { label: "Refund structure", desc: "Full refund within 14 days. After that, your deposit becomes transferable credit with clear timelines." },
  { label: "Weather relocation", desc: "Pre-approved backup positions and timing, agreed in advance. All equipment is weather-protected." },
  { label: "Redundancy", desc: "Four independent failover tiers across wireless, sound system, and instrument." },
  { label: "Flexibility", desc: "Upgrade your arrangement up to two weeks before your ceremony — no penalty, no questions." },
  { label: "Response commitment", desc: "Written confirmation and personalized plan within 24 hours. Every time." },
];

const testimonials = [
  {
    quote: "I had a nightmare about our DJ bailing. Parker showed up with triple redundancy and a smile.",
    author: "Kaitlyn",
    location: "Cochrane",
  },
  {
    quote: "I changed venues two weeks out. Parker revised the plan in 24 hours.",
    author: "Louis",
    location: "Canmore",
  },
  {
    quote: "We got rained out. He was playing inside within 15 minutes.",
    author: "Chantal",
    location: "Cochrane",
  },
];

export default function FAQ() {
  usePageTheme();
  useEffect(() => {
    document.title = "Questions Answered — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Transparent answers to every question about ceremony piano — logistics, pricing, weather contingencies, and more."
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
            <p className="pricing-eyebrow">Questions Answered</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              Every question deserves a clear answer.
            </h1>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              I understand the weight of the decisions you are making. Here is everything I would want to know if I were in your place.
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
            <img src={faqHeroImg} alt="Elegant venue with golden hour light streaming through tall windows" loading="eager" />
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
                The couples who ask the most questions are the ones who feel the most prepared on the day. I welcome every one.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Answer Everything
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ COMMON CONCERNS ═══ */}
        <section id="faq-concerns" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <div className="max-w-[680px]">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Common Concerns</p>
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
                Your concerns, addressed before you ask.
              </h2>
              <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                I have heard every fear. Here is how I resolve each one — with documentation, not promises.
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

        {/* ═══ EDITORIAL IMAGE — Venue ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={venueEmptyImg} alt="Empty venue chairs bathed in golden hour light" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ POLICIES ═══ */}
        <section id="faq-policies" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Booking Policies</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
              Total transparency.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Every policy is documented before you sign anything.
            </p>
          </RevealOnScroll>

          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {policyItems.map((item, i) => (
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
              <Link to="/terms" className="pricing-cta--link">
                Read my full booking terms
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </RevealOnScroll>

          {/* Pull quote */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                Transparency is not a policy. It is how I treat every couple who trusts me with the most important day of their life.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Document Everything
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ KIND WORDS ═══ */}
        <section id="faq-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What couples say</p>
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
              <img src={handsKeysImg} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
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
                  Your ceremony deserves clarity.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Tell me about your ceremony — the venue, the feeling, the moments that matter most. I will respond within 24 hours with a personalized plan.
                </p>
                <div className="mt-10">
                  <Link to="/contact" className="pricing-cta">
                    Reserve My Date!
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
