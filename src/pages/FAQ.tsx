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

import faqHeroImg    from "@/assets/wedding-brendan-ceremony.png";
import venueEmptyImg from "@/assets/venue-empty-golden.jpg";
import handsKeysImg  from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "faq-hero",     label: "Overview",        isBlackKey: false },
  { id: "faq-quick",   label: "At a Glance",     isBlackKey: true  },
  { id: "faq-concerns",label: "Common Concerns",  isBlackKey: false },
  { id: "faq-policies",label: "Policies",         isBlackKey: true  },
  { id: "faq-words",   label: "Kind Words",       isBlackKey: false },
  { id: "faq-cta",     label: "Reserve My Date",  isBlackKey: true  },
];

const trustStats = [
  { value: "24hr",  label: "Response" },
  { value: "500+",  label: "Events" },
  { value: "$4M",   label: "Insured" },
];

const atAGlance = [
  { label: "Every word heard",         desc: "Dedicated wireless system, balanced in real time. Even outdoors, even in the last row." },
  { label: "No power needed",          desc: "Silent battery system with independent backups. No generators, no cords, no noise." },
  { label: "Upgrade anytime",          desc: "Change your arrangement up to two weeks before your date — no penalty, no questions." },
  { label: "Full refund window",       desc: "Cancel within 14 days for a full refund. After that, your deposit becomes transferable credit." },
  { label: "A plan, not a promise",    desc: "Personalized ceremony plan within 24 hours — venue, timeline, and arrangements." },
];

const concerns = [
  { q: "What happens if equipment fails mid-ceremony?",      a: "I bring four independent systems. A second wireless unit, a second instrument, and a pre-loaded speaker for critical cues. The fourth tier has never been needed. It exists anyway." },
  { q: "Will people in the back hear our vows?",             a: "Yes. I measure and verify volume levels at multiple distances during setup to ensure clarity reaches every seat. Timestamped readings are included in your documentation." },
  { q: "How do I know my officiant will be coordinated?",    a: "I co-author your cue sheet with your officiant and planner — every entrance, every vow, every exit is timed and agreed upon in advance." },
  { q: "What if it rains or snows?",                         a: "All equipment is weather-protected. We agree on a Plan B location in advance, and I can relocate within minutes. This is documented before your ceremony day." },
  { q: "Can I cancel or change my mind after booking?",      a: "Yes. Full refund within 14 days. After that, your deposit converts to transferable credit. Clear timelines are documented in your agreement." },
  { q: "Can I see an example plan before I commit?",         a: "Yes. I share a real sample ceremony plan so you can see exactly what you will receive — volume documentation, cue sheet, and venue-specific notes." },
  { q: "How quickly do I hear back after reaching out?",     a: "Within 24 hours, you receive a personalized ceremony plan — venue considerations, suggested arrangements, and a timeline for your day." },
  { q: "How does a ceremony pianist compare to a DJ or band?", a: "The simplest question to ask any alternative: how do they ensure your outdoor vows are heard clearly and quietly? A detailed comparison is available on the pricing page." },
];

const policyItems = [
  { label: "Refund structure",      desc: "Full refund within 14 days. After that, your deposit becomes transferable credit with clear timelines." },
  { label: "Weather relocation",    desc: "Pre-approved backup positions and timing, agreed in advance. All equipment is weather-protected." },
  { label: "Redundancy",            desc: "Four independent failover tiers across wireless, sound system, and instrument." },
  { label: "Flexibility",           desc: "Upgrade your arrangement up to two weeks before your ceremony — no penalty, no questions." },
  { label: "Response commitment",   desc: "Written confirmation and personalized plan within 24 hours. Every time." },
];

const testimonials = [
  { quote: "I had a nightmare about our DJ bailing. Parker showed up with triple redundancy and a smile.", author: "Kaitlyn", location: "Cochrane" },
  { quote: "I changed venues two weeks out. Parker revised the plan in 24 hours.", author: "Louis", location: "Canmore" },
  { quote: "We got rained out. He was playing inside within 15 minutes.", author: "Chantal", location: "Cochrane" },
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

      <main id="main-content">

        {/* ═══ HERO ═══ */}
        <section id="faq-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Questions Answered</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "16ch" }}
            >
              Every question deserves a clear answer.
            </h1>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              I understand the weight of the decisions you are making. Here is everything I would want to know if I were in your place.
            </p>
          </RevealOnScroll>

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
        <div className="pricing-image pricing-image--hero">
          <img src={faqHeroImg} alt="Parker playing piano at an outdoor wedding ceremony" loading="eager" style={{ objectPosition: "center 47%" }} />
        </div>

        {/* ═══ AT A GLANCE — dark band ═══ */}
        <section id="faq-quick" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">At a Glance</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
              >
                Five things to know before we talk.
              </h2>
            </RevealOnScroll>

            <div className="mt-14 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {atAGlance.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 50}>
                  <div
                    className="grid gap-1 py-7 mobile-stack"
                    style={{ gridTemplateColumns: "clamp(160px,18vw,220px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                  >
                    <p className="font-sans text-[15px] font-semibold leading-[1.5]" style={{ color: "hsl(0 0% 100% / 0.88)" }}>
                      {item.label}
                    </p>
                    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.50)" }}>
                      {item.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "28ch" }}
              >
                The couples who ask the most questions feel the most prepared on the day.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(0 0% 100% / 0.28)" }}
              >
                Why I answer everything
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ VENUE IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={venueEmptyImg} alt="Empty venue chairs in golden hour light" loading="lazy" />
        </div>

        {/* ═══ COMMON CONCERNS ═══ */}
        <section id="faq-concerns" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Common Concerns</p>
            <h2
              className="font-display font-semibold tracking-[-0.025em] mt-4 mb-3"
              style={{ fontSize: "clamp(28px,3.5vw,40px)", maxWidth: "20ch" }}
            >
              Your concerns, addressed before you ask.
            </h2>
            <p
              className="font-sans text-[15px] mb-14"
              style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "44ch" }}
            >
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
                  <AccordionContent
                    className="font-sans text-[14px] leading-[1.75] pb-5"
                    style={{ color: "hsl(var(--pricing-fg-secondary))" }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </section>

        {/* ═══ POLICIES — warm band ═══ */}
        <section id="faq-policies" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Booking Policies</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4 mb-3"
                style={{ fontSize: "clamp(28px,3.5vw,40px)" }}
              >
                Total transparency.
              </h2>
              <p
                className="font-sans text-[15px] mb-14"
                style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "44ch" }}
              >
                Every policy is documented before you sign anything.
              </p>
            </RevealOnScroll>

            <div className="divide-y divide-[hsl(36_16%_88%)]">
              {policyItems.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 50}>
                  <div className="py-6 flex items-start gap-5">
                    <span className="pricing-diamond" style={{ marginTop: "6px", flexShrink: 0 }} />
                    <div>
                      <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                      <p className="font-sans text-[14px] leading-[1.7] mt-1" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <div className="mt-10">
                <Link to="/terms" className="pricing-cta--link">
                  Read my full booking terms <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(var(--pricing-fg))", maxWidth: "28ch" }}
              >
                Transparency is not a policy. It is how I treat every couple who trusts me.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
              >
                Why I document everything
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ KIND WORDS — dark band ═══ */}
        <section id="faq-words" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">What couples say</p>
            </RevealOnScroll>

            <div className="mt-16 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {testimonials.map((t, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 100}>
                  <div className="py-12">
                    <p
                      className="sub-pull"
                      style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "34ch" }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p
                      className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] mt-6"
                      style={{ color: "hsl(0 0% 100% / 0.30)" }}
                    >
                      {t.author} &middot; {t.location}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HANDS IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={handsKeysImg} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
        </div>

        {/* ═══ CTA — dark band ═══ */}
        <section id="faq-cta" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <div
                className="grid items-start mobile-col-stack"
                style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,8vw,100px)" }}
              >
                <div>
                  <h2
                    className="font-display font-semibold tracking-[-0.03em] leading-[1.1]"
                    style={{ fontSize: "clamp(32px,5vw,56px)", maxWidth: "14ch", color: "hsl(0 0% 100% / 0.94)" }}
                  >
                    Your ceremony deserves clarity.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    Tell me about your ceremony — the venue, the feeling, the moments that matter most. I will respond within 24 hours with a personalized plan.
                  </p>
                  <div className="mt-10">
                    <Link to="/contact" className="pricing-cta pricing-cta--inverted">
                      Reserve My Date
                    </Link>
                  </div>
                  <p className="font-sans text-[13px] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                    No commitment. No obligation. Just a conversation.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
