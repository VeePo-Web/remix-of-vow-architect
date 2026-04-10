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

import studioWarm from "@/assets/teaching-studio-warm.jpg";
import studentLearning from "@/assets/student-learning-moment.jpg";

const sections = [
  { id: "tp-hero",       label: "The Offering",   isBlackKey: false },
  { id: "tp-price",      label: "Your Investment", isBlackKey: true  },
  { id: "tp-included",   label: "What You Get",   isBlackKey: false },
  { id: "tp-fears",      label: "The Truth",      isBlackKey: true  },
  { id: "tp-cta",        label: "Begin",          isBlackKey: false },
];

const inclusions = [
  { label: "One-on-one, always", desc: "Never group lessons. The entire hour is yours — your pace, your goals, your music." },
  { label: "Expression over technique", desc: "You will play music that moves you from the very first session. Not scales. Not exercises. Music." },
  { label: "You choose the repertoire", desc: "Hymns, film scores, pop songs, classical — whatever makes you feel something. From the very first week." },
  { label: "In-person or online", desc: "Calgary studio or video call. Same depth, same attention, same quality either way." },
  { label: "24-hour response", desc: "Every question answered within a day. Between sessions, between lessons — I am available. No exceptions." },
  { label: "No contracts, ever", desc: "Stop whenever you want. Come back whenever you are ready. No guilt. No fine print." },
];

const fears = [
  {
    q: '"Is this really worth sixty dollars an hour?"',
    a: "You get a full hour of undivided attention from someone who has spent their life at the piano. No curriculum to sell. No recital to prepare for. The focus is entirely on you and the music you want to play. Most of my students tell me it is the most centering hour of their week.",
  },
  {
    q: '"What if I start and quit again?"',
    a: "You did not quit last time. The method quit on you. There is no contract, no package to finish, no obligation to continue. If you stop, you stop. If you come back in six months, I will be here. No questions asked.",
  },
  {
    q: '"What if I am too old to start?"',
    a: "Most of my students are adults. I have taught people who began at 30, 50, and 70. Age has never been a barrier — it is depth. The piano does not care when you begin, and neither do I.",
  },
];

export default function TeachingPricing() {
  usePageTheme();
  useEffect(() => {
    document.title = "Pricing — Piano Mentorship | Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Piano mentorship for $60 per hour. No packages, no contracts. Pay as you go.");
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="tp-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Piano Mentorship</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "14ch" }}>
              One rate. No fine print.
            </h1>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              A flat hourly rate with no packages, no contracts, and no upselling. You pay for the hour. The preparation, the patience, and the plan — those are included.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={studioWarm} alt="Sunlit piano studio with golden light" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ THE PRICE ═══ */}
        <section id="tp-price" className="pricing-section piano-section-target">
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <div className="pricing-amount pricing-amount--hero">$60</div>
                <p className="font-sans text-[clamp(17px,2vw,21px)] mt-3" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                  per hour
                </p>
              </div>
              <div className="md:pt-6">
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Full 60-minute sessions. No commitments. Pay as you go. Your first session is a conversation — no preparation needed.
                </p>
                <p className="font-sans text-[13px] mt-5" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                  If it does not feel right, you owe nothing.
                </p>
                <div className="mt-8">
                  <div className="pricing-pill" style={{ width: 'fit-content' }}>
                    <span className="pricing-pill__dot" />
                    I only take 15 students at a time
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ WHAT EVERY SESSION INCLUDES ═══ */}
        <section id="tp-included" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-12" style={{ maxWidth: "20ch" }}>
              What every session includes.
            </h2>
          </RevealOnScroll>

          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {inclusions.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-10 py-6">
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ THE TRUTH — FEARS ═══ */}
        <section id="tp-fears" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <div className="max-w-[680px]">
            <RevealOnScroll variant="up">
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
                The questions you have not asked yet.
              </h2>
              <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                I hear them from almost every new student. Here is the truth.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <Accordion type="single" collapsible className="w-full">
                {fears.map((fear, i) => (
                  <AccordionItem key={i} value={`fear-${i}`} style={{ borderColor: "hsl(36 16% 90%)" }}>
                    <AccordionTrigger className="text-left font-sans text-[15px] font-semibold italic hover:no-underline py-5">
                      {fear.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-[14px] leading-[1.75] pb-5" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {fear.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ EDITORIAL IMAGE — Student moment ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--wide">
              <img src={studentLearning} alt="A student learning piano in warm light" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ FINAL CTA — The permission close ═══ */}
        <section id="tp-cta" className="pricing-section piano-section-target pb-36">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <div className="mb-10 space-y-1">
                  <p className="font-sans text-[clamp(17px,2vw,21px)] leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                    You do not need to be talented.
                  </p>
                  <p className="font-sans text-[clamp(17px,2vw,21px)] leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                    You do not need to be young.
                  </p>
                  <p className="font-sans text-[clamp(17px,2vw,21px)] leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                    You do not need to be ready.
                  </p>
                </div>
                <h2 className="font-display text-[clamp(36px,6vw,64px)] font-semibold tracking-[-0.035em] leading-[1.05]">
                  You just need to begin.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Your first session is just a conversation. Tell me what you want to play — I will build a path to get you there. No preparation needed. No pressure.
                </p>
                <div className="mt-10">
                  <Link to="/teaching/contact" className="pricing-cta">
                    Book a Conversation
                  </Link>
                </div>
                <p className="text-[13px] mt-5" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                  Response within 24 hours. Always.
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
