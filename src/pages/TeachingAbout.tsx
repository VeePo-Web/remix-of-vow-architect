import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import eventsPerformerBw from "@/assets/events-performer-bw.png";
import eventsStageMotion from "@/assets/events-stage-motion.png";
import teachingStudioImg from "@/assets/teaching-studio-warm.jpg";
import studentMomentImg from "@/assets/teaching-keys.jpg";

const sections = [
  { id: "tab-hero",       label: "The Mentor",     isBlackKey: false },
  { id: "tab-origin",     label: "How It Started", isBlackKey: true  },
  { id: "tab-beliefs",    label: "What Guides Me", isBlackKey: false },
  { id: "tab-experience", label: "Experience",     isBlackKey: true  },
  { id: "tab-words",      label: "Kind Words",     isBlackKey: false },
  { id: "tab-promise",    label: "My Promise",     isBlackKey: true  },
  { id: "tab-cta",        label: "Get in Touch",   isBlackKey: false },
];

const beliefs = [
  { label: "Patience",    desc: "I will never rush you. We move at your speed, not mine. The fastest path to the piano is the one where you never feel behind." },
  { label: "Listening",   desc: "I ask about your goals before I assign a single piece. What you want to play matters more than what I think you should play." },
  { label: "Expression",  desc: "Technique serves the music. The music serves you. I teach the mechanics so you can forget them — and play what you feel." },
];

const credentials = [
  { value: "17",   label: "Years Playing" },
  { value: "All",  label: "Ages Welcome" },
  { value: "1:1",  label: "Always" },
  { value: "No",   label: "Audition" },
];

const studentMoments = [
  { moment: "The adult student who started at 48 and played at her own wedding a year later",           context: "Adult Student" },
  { moment: "The teenager who learned one piece to play for his grandmother in hospice",                context: "Teen" },
  { moment: "The returning student who quit at 12 and came back at 35 — and wondered why she ever stopped", context: "Returning" },
  { moment: "The father who learned one song to dance with his daughter at her wedding",                context: "Adult Student" },
];

const testimonials = [
  { quote: "I told him I had no talent. He told me that was not his concern. A year later I played at my own wedding.", author: "Maria Vasquez", context: "Adult Student, Calgary" },
  { quote: "My son hated piano lessons. Then he started with Parker. Now he plays for fun. I don't understand it, but I'm grateful.", author: "Janet Liu", context: "Parent of student, age 14" },
];

const promises = [
  "I will never rush you.",
  "I will ask what you want before I decide what you need.",
  "I will stay patient, even when you are not.",
  "I will be honest about where you are — and where you can go.",
  "I will remind you why you started when it gets hard.",
];

export default function TeachingAbout() {
  usePageTheme();
  useEffect(() => {
    document.title = "About — Parker Gawryletz, Piano Mentor";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "How I teach, what guides me, and what I promise every student. Piano mentorship by Parker Gawryletz."
    );
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main>

        {/* ═══ HERO ═══ */}
        <section id="tab-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Piano Mentor</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "16ch" }}
            >
              I teach piano differently.
            </h1>
            <p
              className="font-display font-light leading-[1.2] mt-3"
              style={{ fontSize: "clamp(28px,4vw,48px)", color: "hsl(var(--pricing-fg-secondary))" }}
            >
              I start by listening to you.
            </p>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              One-on-one mentorship built around your goals, your pace, and the music you love. Not a method. A philosophy.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={eventsPerformerBw} alt="Parker seated at a keyboard, focused and present — dramatic black and white" loading="eager" style={{ objectPosition: "center 30%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ HOW IT STARTED — dark band ═══ */}
        <section id="tab-origin" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">How It Started</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch", color: "hsl(0 0% 100% / 0.94)" }}
              >
                I watched a student play their first chord after six months.
              </h2>
            </RevealOnScroll>

            <div
              className="grid items-start mt-16"
              style={{ gridTemplateColumns: "1fr 1.1fr", gap: "clamp(40px,8vw,100px)" }}
            >
              <RevealOnScroll variant="left">
                <div className="space-y-5">
                  <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                    She was 52. She had never played an instrument. And when those three notes rang out together for the first time, she cried.
                  </p>
                  <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                    Not because it was beautiful. Because she didn't think she could. That moment taught me more about teaching than any degree ever did.
                  </p>
                  <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                    Seventeen years later, that is still how I measure a session — not by what a student plays, but by what they believe about themselves when they leave.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="right">
                <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
                  <img src={teachingStudioImg} alt="Warm teaching studio with natural light" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "28ch" }}
              >
                The best sessions do not feel like work. They feel like conversations.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(0 0% 100% / 0.28)" }}
              >
                What I believe
              </p>
            </RevealOnScroll>

          </div>
        </section>

        {/* ═══ CINEMATIC BREAK ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={eventsStageMotion} alt="Parker performing on stage with dynamic motion and stage lighting" loading="lazy" style={{ objectPosition: "center 40%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ WHAT GUIDES ME ═══ */}
        <section id="tab-beliefs" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em]"
              style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
            >
              Three things that guide every session.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not a curriculum. A philosophy.
            </p>
          </RevealOnScroll>

          <div className="mt-16 divide-y" style={{ borderColor: "hsl(36 16% 90%)" }}>
            {beliefs.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div
                  className="grid py-10 items-start"
                  style={{ gridTemplateColumns: "clamp(120px,16vw,200px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                >
                  <div>
                    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{String(i + 1).padStart(2, "0")}</p>
                    <h3
                      className="font-display font-semibold tracking-[-0.03em] mt-1"
                      style={{ fontSize: "clamp(28px,3vw,40px)" }}
                    >
                      {item.label}
                    </h3>
                  </div>
                  <div className="pt-1">
                    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ STUDENT IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={studentMomentImg} alt="Student learning moment at the piano" loading="lazy" />
        </div>

        {/* ═══ EXPERIENCE — warm band ═══ */}
        <section id="tab-experience" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Experience</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "18ch" }}
              >
                Students who remind me why I teach.
              </h2>
              <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                Every student arrives with a different reason. Every reason is the right one.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <div className="pricing-trust-grid mt-16" style={{ maxWidth: "560px", gridTemplateColumns: "repeat(4, 1fr)" }}>
                {credentials.map((stat, i) => (
                  <div key={i} className="pricing-trust-stat">
                    <p className="pricing-trust-stat__value">{stat.value}</p>
                    <p className="pricing-trust-stat__label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <div className="mt-16 divide-y divide-[hsl(36_16%_88%)]">
              {studentMoments.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 80}>
                  <div
                    className="grid items-baseline py-7"
                    style={{ gridTemplateColumns: "1fr clamp(100px,14vw,160px)", gap: "clamp(12px,3vw,32px)" }}
                  >
                    <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.moment}</p>
                    <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{item.context}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(var(--pricing-fg))", maxWidth: "30ch" }}
              >
                The student who believes they can play before they actually can — that is the student who learns the fastest.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
              >
                What I teach first
              </p>
            </RevealOnScroll>

          </div>
        </section>

        {/* ═══ KIND WORDS — dark band ═══ */}
        <section id="tab-words" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">What students say</p>
            </RevealOnScroll>

            <div className="mt-16 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {testimonials.map((t, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 100}>
                  <div className="py-12">
                    <p
                      className="sub-pull"
                      style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "36ch" }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p
                      className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] mt-6"
                      style={{ color: "hsl(0 0% 100% / 0.30)" }}
                    >
                      {t.author} &middot; {t.context}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MY PROMISE ═══ */}
        <section id="tab-promise" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em] mb-3"
              style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "18ch" }}
            >
              My promise to every student.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not a curriculum. A commitment.
            </p>
          </RevealOnScroll>

          <div className="divide-y" style={{ borderColor: "hsl(36 16% 90%)" }}>
            {promises.map((promise, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div className="py-5 flex items-start gap-4">
                  <span className="pricing-diamond" style={{ marginTop: "6px" }} />
                  <p
                    className="font-display leading-[1.5]"
                    style={{ fontSize: "clamp(17px,1.8vw,21px)" }}
                  >
                    {promise}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="up">
            <div className="mt-14 pt-8" style={{ borderTop: "1px solid hsl(36 16% 90%)" }}>
              <p className="font-display text-[19px]">Parker Gawryletz</p>
              <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] mt-1" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Piano Mentor
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ CTA — dark band ═══ */}
        <section id="tab-cta" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <div
                className="grid items-start"
                style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,8vw,100px)" }}
              >
                <div>
                  <h2
                    className="font-display font-semibold tracking-[-0.03em] leading-[1.1]"
                    style={{ fontSize: "clamp(32px,5vw,56px)", maxWidth: "14ch", color: "hsl(0 0% 100% / 0.94)" }}
                  >
                    The piano has been waiting for you.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    The first session is just a conversation. Tell me what brought you to the piano — a song you love, a goal you have, or just curiosity.
                  </p>
                  <div className="mt-10">
                    <Link to="/teaching/contact" className="pricing-cta pricing-cta--inverted">
                      Send a Message
                    </Link>
                  </div>
                  <p className="font-sans text-[13px] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                    You do not need to be talented to begin. You just need to be willing.
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
