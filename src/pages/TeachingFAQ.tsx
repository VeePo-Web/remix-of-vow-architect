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

import eventsNordOverhead from "@/assets/events-nord-overhead.webp";
import teachingKeysImg from "@/assets/teaching-keys.jpg";
import studentLearningImg from "@/assets/teaching-keys.jpg";

const sections = [
  { id: "faq-hero",      label: "Overview",         isBlackKey: false },
  { id: "faq-quick",     label: "At a Glance",      isBlackKey: true  },
  { id: "faq-concerns",  label: "Common Questions", isBlackKey: false },
  { id: "faq-structure", label: "Session Structure", isBlackKey: true  },
  { id: "faq-words",     label: "Kind Words",       isBlackKey: false },
  { id: "faq-cta",       label: "Begin",            isBlackKey: true  },
];

const trustStats = [
  { value: "17+",      label: "Years Playing" },
  { value: "15",       label: "Students Max" },
  { value: "All Ages", label: "Welcome" },
];

const atAGlance = [
  { label: "All levels welcome",        desc: "Whether you have never touched a piano or you have played for years and want to go deeper — I meet you where you are and build from there." },
  { label: "Tailored curriculum",       desc: "No cookie-cutter method books. Your plan is built around your goals, your musical taste, and your pace." },
  { label: "Flexible scheduling",       desc: "Weekly lessons with rescheduling flexibility. Life happens — I work with you, not against your calendar." },
  { label: "Performance opportunities", desc: "Recitals and informal performances throughout the year. Playing for others is how confidence is built." },
  { label: "Clear communication",       desc: "After every lesson, you know exactly what to practice, how to practice it, and why it matters for your progress." },
];

const concerns = [
  { q: "What age do you start teaching?",             a: "I accept students from age six and up. For younger children, I focus on ear training, rhythm games, and keyboard exploration before introducing notation. Adults are always welcome — it is never too late to start." },
  { q: "Do I need a piano at home?",                  a: "Yes. Consistent practice requires daily access to a keyboard. A weighted 88-key digital piano is sufficient for anyone starting out. I can recommend specific models during our first conversation." },
  { q: "How long are the sessions?",                  a: "Sessions are 60 minutes. The full hour is yours — there is no rushing through material to hit a milestone. We decide together what to focus on, and we follow it." },
  { q: "Do you teach music theory?",                  a: "Theory is woven into every session — not as a separate subject, but as context for what you are playing. You will understand why the music works, not just how to play the notes." },
  { q: "Can I learn a specific song I love?",         a: "That is exactly where I start. Tell me the song, and I will build a path to it — breaking it into pieces that are achievable at your current level, then reassembling it so it sounds like you intended it all along." },
  { q: "What if my child wants to quit?",             a: "I have a candid conversation with both the student and the parent. Often the issue is not the instrument — it is the repertoire or the pace. A small adjustment can reignite the spark. If it is truly time to stop, I respect that decision." },
  { q: "Do you teach online?",                        a: "Yes. Online sessions are available via Zoom with the same structure and attention as in-person. Many students prefer the convenience, and the quality is excellent with a proper camera angle on the keys." },
  { q: "How often should my child practice?",         a: "Daily practice is ideal — even 15 minutes is valuable when you are starting out. Quality matters more than quantity. I provide specific, actionable practice instructions after every session so the student knows exactly what to work on." },
];

const structureItems = [
  { label: "First session",          desc: "An assessment of your current level, a conversation about your goals, and your first piece of music to take home. No pressure, no tests." },
  { label: "Weekly rhythm",          desc: "Sessions follow a consistent structure: warm-up, technique, repertoire, and a creative challenge. Predictability builds momentum." },
  { label: "Practice notes",         desc: "After every session, I send a clear summary of what to practice, how to practice it, and what we are building toward next." },
  { label: "Progress milestones",    desc: "Every eight to ten weeks, we check in on progress and adjust the plan. You always know where you stand and where you are headed." },
  { label: "Recital preparation",    desc: "Performance opportunities twice a year. Students choose their own repertoire and I prepare them to feel confident, not just competent." },
];

const testimonials = [
  { quote: "My daughter went from dreading practice to asking for extra time at the piano. Parker figured out what clicked for her in two lessons.", author: "Rachel", location: "Parent, Calgary" },
  { quote: "I started at 42 with zero experience. A year later I played Clair de Lune at my daughter's wedding. Parker made that possible.",         author: "David",  location: "Adult Student, Cochrane" },
  { quote: "My son hated piano his whole childhood. Two months with Parker and he plays every day. I do not know what changed, but I am grateful.",   author: "Angela", location: "Parent, Calgary" },
];

export default function TeachingFAQ() {
  usePageTheme();
  useEffect(() => {
    document.title = "Lesson FAQ — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Everything you need to know about piano mentorship — ages, scheduling, practice expectations, and more."
    );
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main>

        {/* ═══ HERO ═══ */}
        <section id="faq-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Lesson FAQ</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "16ch" }}
            >
              The questions every student asks.
            </h1>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              Whether you are a parent exploring options or an adult picking up the instrument for the first time — here is everything you need to know.
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
          <img src={eventsNordOverhead} alt="Parker at a red Nord piano, overhead view — the musician's perspective" loading="eager" style={{ objectPosition: "center 40%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ AT A GLANCE — dark band ═══ */}
        <section id="faq-quick" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">At a Glance</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch", color: "hsl(0 0% 100% / 0.94)" }}
              >
                Five things to know before your first lesson.
              </h2>
            </RevealOnScroll>

            <div className="mt-14 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {atAGlance.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 50}>
                  <div
                    className="grid py-7 mobile-stack"
                    style={{ gridTemplateColumns: "clamp(160px,18vw,220px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                  >
                    <p className="font-sans text-[15px] font-semibold leading-[1.5]" style={{ color: "hsl(0 0% 100% / 0.88)" }}>{item.label}</p>
                    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.50)" }}>{item.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "28ch" }}
              >
                The students who ask the most questions are the ones who grow the fastest. I welcome every one.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(0 0% 100% / 0.28)" }}
              >
                Why curiosity matters
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ TEACHING KEYS IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={teachingKeysImg} alt="Close-up of piano keys in a teaching studio" loading="lazy" />
        </div>

        {/* ═══ COMMON QUESTIONS ═══ */}
        <section id="faq-concerns" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Common Questions</p>
            <h2
              className="font-display font-semibold tracking-[-0.025em] mb-3 mt-4"
              style={{ fontSize: "clamp(28px,3.5vw,40px)", maxWidth: "20ch" }}
            >
              What parents and students want to know.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              From first touch to recital stage — here is how it works.
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
        </section>

        {/* ═══ SESSION STRUCTURE — warm band ═══ */}
        <section id="faq-structure" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Session Structure</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mb-3 mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,40px)" }}
              >
                How each session is built.
              </h2>
              <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                Consistency creates confidence. Here is the framework.
              </p>
            </RevealOnScroll>

            <div className="divide-y divide-[hsl(36_16%_88%)]">
              {structureItems.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 50}>
                  <div className="py-6 flex items-start gap-5">
                    <span className="pricing-diamond" style={{ marginTop: "6px", flexShrink: 0 }} />
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
                <Link to="/teaching/pricing" className="pricing-cta--link">
                  View mentorship plans and pricing <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(var(--pricing-fg))", maxWidth: "30ch" }}
              >
                Every person deserves a mentor who listens as carefully as they play.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
              >
                Why teaching matters to me
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ KIND WORDS — dark band ═══ */}
        <section id="faq-words" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">What families say</p>
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
                      {t.author} &middot; {t.location}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ STUDENT LEARNING IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={studentLearningImg} alt="Student and teacher sharing a moment at the piano" loading="lazy" />
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
                    Every journey starts with a conversation.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    Tell me about your goals — or your child's. I will respond within 24 hours with a plan for getting started.
                  </p>
                  <div className="mt-10">
                    <Link to="/teaching/contact" className="pricing-cta pricing-cta--inverted">
                      Begin the Conversation
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
