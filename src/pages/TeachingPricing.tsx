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

import studioWarm from "@/assets/teaching-jerome-ensemble.png";
import eventsStageWarmlight from "@/assets/events-stage-warmlight.png";
import studentLearning from "@/assets/teaching-keys.jpg";

const sections = [
  { id: "tp-hero",     label: "The Offering",    isBlackKey: false },
  { id: "tp-price",    label: "Your Investment", isBlackKey: true  },
  { id: "tp-included", label: "What You Get",    isBlackKey: false },
  { id: "tp-fears",    label: "The Truth",       isBlackKey: true  },
  { id: "tp-cta",      label: "Begin",           isBlackKey: false },
];

const inclusions = [
  { label: "One-on-one, always",       desc: "Never group lessons. The entire hour is yours — your pace, your goals, your music." },
  { label: "Expression over technique",desc: "You will play music that moves you from the very first session. Not scales. Not exercises. Music." },
  { label: "You choose the repertoire",desc: "Hymns, film scores, pop songs, classical — whatever makes you feel something. From the very first week." },
  { label: "In-person or online",      desc: "Calgary studio or video call. Same depth, same attention, same quality either way." },
  { label: "24-hour response",         desc: "Every question answered within a day. Between sessions, between lessons — I am available. No exceptions." },
  { label: "No contracts, ever",       desc: "Stop whenever you want. Come back whenever you are ready. No guilt. No fine print." },
];

const fears = [
  { q: '"Is this really worth sixty dollars an hour?"',  a: "You get a full hour of undivided attention from someone who has spent their life at the piano. No curriculum to sell. No recital to prepare for. The focus is entirely on you and the music you want to play. Most of my students tell me it is the most centering hour of their week." },
  { q: '"What if I start and quit again?"',              a: "You did not quit last time. The method quit on you. There is no contract, no package to finish, no obligation to continue. If you stop, you stop. If you come back in six months, I will be here. No questions asked." },
  { q: '"What if I am too old to start?"',               a: "Most of my students are adults. I have taught people who began at 30, 50, and 70. Age has never been a barrier — it is depth. The piano does not care when you begin, and neither do I." },
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

      <main>

        {/* ═══ HERO ═══ */}
        <section id="tp-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Piano Mentorship</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "14ch" }}
            >
              One rate. No fine print.
            </h1>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              A flat hourly rate with no packages, no contracts, and no upselling. You pay for the hour. The preparation, the patience, and the plan — those are included.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={studioWarm} alt="Parker performing with Jerome and Lucas" loading="eager" style={{ objectPosition: "center 50%" }} />
        </div>

        {/* ═══ THE PRICE — dark band ═══ */}
        <section id="tp-price" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <div
                className="grid items-start"
                style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,8vw,100px)" }}
              >
                <div>
                  <div className="pricing-amount pricing-amount--hero" style={{ color: "hsl(var(--vow-yellow))" }}>$60</div>
                  <p
                    className="font-sans mt-3"
                    style={{ fontSize: "clamp(17px,2vw,21px)", color: "hsl(0 0% 100% / 0.35)" }}
                  >
                    per hour
                  </p>
                </div>
                <div className="md:pt-6">
                  <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}>
                    Full 60-minute sessions. No commitments. Pay as you go. Your first session is a conversation — no preparation needed.
                  </p>
                  <p className="font-sans text-[13px] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                    If it does not feel right, you owe nothing.
                  </p>
                  <div className="mt-8">
                    <div
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "4px 14px", border: "1px solid hsl(0 0% 100% / 0.15)",
                        borderRadius: "100px",
                      }}
                    >
                      <span style={{ width: "5px", height: "5px", background: "hsl(var(--vow-yellow))", borderRadius: "50%", flexShrink: 0 }} />
                      <span className="font-sans text-[12px] font-medium" style={{ letterSpacing: "0.04em", color: "hsl(0 0% 100% / 0.65)" }}>I only take 15 students at a time</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ CINEMATIC BREAK ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={eventsStageWarmlight} alt="Parker performing under warm amber stage lighting" loading="lazy" style={{ objectPosition: "center 30%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ WHAT EVERY SESSION INCLUDES ═══ */}
        <section id="tp-included" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em] mb-12"
              style={{ fontSize: "clamp(28px,3.5vw,40px)", maxWidth: "20ch" }}
            >
              What every session includes.
            </h2>
          </RevealOnScroll>

          <div className="divide-y" style={{ borderColor: "hsl(36 16% 90%)" }}>
            {inclusions.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div
                  className="grid py-6"
                  style={{ gridTemplateColumns: "clamp(160px,18vw,220px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                >
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ THE TRUTH — fears — warm band ═══ */}
        <section id="tp-fears" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <h2
                className="font-display font-semibold tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(28px,3.5vw,40px)" }}
              >
                The questions you have not asked yet.
              </h2>
              <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                I hear them from almost every new student. Here is the truth.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <Accordion type="single" collapsible className="w-full">
                {fears.map((fear, i) => (
                  <AccordionItem key={i} value={`fear-${i}`} style={{ borderColor: "hsl(36 16% 88%)" }}>
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

        {/* ═══ STUDENT IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={studentLearning} alt="A student learning piano in warm light" loading="lazy" />
        </div>

        {/* ═══ CTA — dark band ═══ */}
        <section id="tp-cta" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <div
                className="grid items-start"
                style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,8vw,100px)" }}
              >
                <div>
                  <div className="mb-10 space-y-1">
                    <p className="font-sans leading-[1.6]" style={{ fontSize: "clamp(17px,2vw,21px)", color: "hsl(0 0% 100% / 0.35)" }}>
                      You do not need to be talented.
                    </p>
                    <p className="font-sans leading-[1.6]" style={{ fontSize: "clamp(17px,2vw,21px)", color: "hsl(0 0% 100% / 0.35)" }}>
                      You do not need to be young.
                    </p>
                    <p className="font-sans leading-[1.6]" style={{ fontSize: "clamp(17px,2vw,21px)", color: "hsl(0 0% 100% / 0.35)" }}>
                      You do not need to be ready.
                    </p>
                  </div>
                  <h2
                    className="font-display font-semibold tracking-[-0.035em] leading-[1.05]"
                    style={{ fontSize: "clamp(36px,6vw,64px)", color: "hsl(0 0% 100% / 0.94)" }}
                  >
                    You just need to begin.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    Your first session is just a conversation. Tell me what you want to play — I will build a path to get you there. No preparation needed. No pressure.
                  </p>
                  <div className="mt-10">
                    <Link to="/teaching/contact" className="pricing-cta pricing-cta--inverted">
                      Begin the Conversation
                    </Link>
                  </div>
                  <p className="font-sans text-[13px] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                    Response within 24 hours. Always.
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
