import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import teachingBenchImg from "@/assets/teaching-bench.jpg";
import studentMomentImg from "@/assets/student-learning-moment.jpg";
import teachingStudioImg from "@/assets/teaching-studio-warm.jpg";

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
  { label: "Patience", desc: "I will never rush you. We move at your speed, not mine. The fastest path to the piano is the one where you never feel behind." },
  { label: "Listening", desc: "I ask about your goals before I assign a single piece. What you want to play matters more than what I think you should play." },
  { label: "Expression", desc: "Technique serves the music. The music serves you. I teach the mechanics so you can forget them — and play what you feel." },
];

const credentials = [
  { value: "17", label: "Years Teaching" },
  { value: "All", label: "Ages Welcome" },
  { value: "1:1", label: "Always" },
  { value: "No", label: "Audition" },
];

const studentMoments = [
  { moment: "The adult student who started at 48 and played at her own wedding a year later", context: "Beginner" },
  { moment: "The teenager who learned one piece to play for his grandmother in hospice", context: "Intermediate" },
  { moment: "The returning student who quit at 12 and came back at 35 — and wondered why she ever stopped", context: "Returning" },
  { moment: "The father who learned one song to dance with his daughter at her wedding", context: "Beginner" },
];

const testimonials = [
  {
    quote: "I told him I had no talent. He told me that was not his concern. A year later I played at my own wedding.",
    author: "Maria Vasquez",
    context: "Adult beginner, age 48",
  },
  {
    quote: "My son hated piano lessons. Then he started with Parker. Now he plays for fun. I don't understand it, but I'm grateful.",
    author: "Janet Liu",
    context: "Parent of student, age 14",
  },
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

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="tab-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Piano Mentor</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              I teach piano differently.
            </h1>
            <p className="font-display text-[clamp(28px,4vw,48px)] font-light leading-[1.2] mt-3" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              I start by listening to you.
            </p>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              One-on-one mentorship built around your goals, your pace, and the music you love. Not a method. A philosophy.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={teachingBenchImg} alt="Piano bench in a warm teaching studio" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ HOW IT STARTED ═══ */}
        <section id="tab-origin" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">How It Started</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              I watched a student play their first chord after six months.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-start mt-16">
            <RevealOnScroll variant="left">
              <div className="space-y-6">
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  She was 52. She had never played an instrument. And when those three notes rang out together for the first time, she cried.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  Not because it was beautiful. Because she didn't think she could. That moment taught me more about teaching than any degree ever did.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  Seventeen years later, that is still how I measure a lesson — not by what a student plays, but by what they believe about themselves when they leave.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="right">
              <div className="pricing-image pricing-image--cinematic pricing-image--contained">
                <img src={teachingStudioImg} alt="Warm teaching studio with natural light" loading="lazy" />
              </div>
            </RevealOnScroll>
          </div>

          {/* Pull quote — full width, asymmetric */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                The best lessons do not feel like lessons. They feel like conversations.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                What I Believe
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ WHAT GUIDES ME ═══ */}
        <section id="tab-beliefs" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Three things that guide every lesson.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not a curriculum. A philosophy.
            </p>
          </RevealOnScroll>

          <div className="space-y-32 mt-20">
            {beliefs.map((item, i) => (
              <RevealOnScroll key={i} variant={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start ${i % 2 !== 0 ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.03em] mt-1">{item.label}</h3>
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

        {/* ═══ EDITORIAL IMAGE — Student moment ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={studentMomentImg} alt="Student learning moment at the piano" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="tab-experience" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Experience</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "18ch" }}>
              Students who remind me why I teach.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Every student arrives with a different reason. Every reason is the right one.
            </p>
          </RevealOnScroll>

          {/* Credential stats */}
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

          {/* Student moments — structured list */}
          <div className="mt-24 space-y-0 divide-y divide-[hsl(36_16%_90%)]">
            {studentMoments.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 80}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-1 md:gap-8 py-7 items-baseline">
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.moment}</p>
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{item.context}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ BREATHING QUOTE ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                The student who believes they can play before they actually can — that is the student who learns the fastest. My job is to build that belief.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                What I Teach First
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ KIND WORDS ═══ */}
        <section id="tab-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What students say</p>
          </RevealOnScroll>

          <div className="space-y-20 max-w-[680px]">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 120}>
                <div className="pricing-testimonial">
                  <p className="pricing-testimonial__quote">&ldquo;{t.quote}&rdquo;</p>
                  <p className="pricing-testimonial__author">{t.author} &middot; {t.context}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ MY PROMISE ═══ */}
        <section id="tab-promise" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em] mb-3" style={{ maxWidth: "18ch" }}>
              My promise to every student.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not a curriculum. A commitment.
            </p>
          </RevealOnScroll>

          <div className="space-y-0 divide-y divide-[hsl(36_16%_90%)]">
            {promises.map((promise, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div className="py-5 flex items-start gap-4">
                  <span className="pricing-diamond" style={{ marginTop: "6px" }} />
                  <p className="font-display text-[clamp(17px,1.8vw,21px)] leading-[1.5]">
                    {promise}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="up">
            <div className="mt-14 pt-8" style={{ borderTop: "1px solid hsl(36 16% 90%)" }}>
              <p className="font-display text-[19px]">Parker Gawryletz</p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-1" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Piano Mentor
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section id="tab-cta" className="pricing-section piano-section-target pb-36">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1]" style={{ maxWidth: "14ch" }}>
                  The piano has been waiting for you.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  The first session is just a conversation. Tell me what brought you to the piano — a song you love, a goal you have, or just curiosity.
                </p>
                <div className="mt-10">
                  <Link to="/teaching/contact" className="pricing-cta">
                    Send a Message
                  </Link>
                </div>
                <p className="text-[13px] mt-5" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                  You do not need to be talented to begin. You just need to be willing.
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
