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

import teachingStudioImg from "@/assets/teaching-studio-warm.jpg";
import teachingKeysImg from "@/assets/teaching-keys.jpg";
import studentLearningImg from "@/assets/student-learning-moment.jpg";

const sections = [
  { id: "faq-hero",      label: "Overview",          isBlackKey: false },
  { id: "faq-quick",     label: "At a Glance",       isBlackKey: true  },
  { id: "faq-concerns",  label: "Common Questions",   isBlackKey: false },
  { id: "faq-structure", label: "Lesson Structure",   isBlackKey: true  },
  { id: "faq-words",     label: "Kind Words",         isBlackKey: false },
  { id: "faq-cta",       label: "Begin Lessons",      isBlackKey: true  },
];

const trustStats = [
  { value: "10+", label: "Years Teaching" },
  { value: "All Ages", label: "Welcome" },
  { value: "RCM", label: "Certified" },
];

const atAGlance = [
  { label: "All levels welcome", desc: "Whether you have never touched a piano or you are preparing for an RCM exam — I meet you where you are and build from there." },
  { label: "Tailored curriculum", desc: "No cookie-cutter method books. Your lesson plan is built around your goals, your musical taste, and your pace." },
  { label: "Flexible scheduling", desc: "Weekly lessons with rescheduling flexibility. Life happens — I work with you, not against your calendar." },
  { label: "Performance opportunities", desc: "Recitals and informal performances throughout the year. Playing for others is how confidence is built." },
  { label: "Clear communication", desc: "After every lesson, you know exactly what to practice, how to practice it, and why it matters for your progress." },
];

const concerns = [
  { q: "What age do you start teaching?", a: "I accept students from age six and up. For younger children, I focus on ear training, rhythm games, and keyboard exploration before introducing notation. Adults are always welcome — it is never too late to start." },
  { q: "Do I need a piano at home?", a: "Yes. Consistent practice requires daily access to a keyboard. A weighted 88-key digital piano is sufficient for beginners. I can recommend specific models during our first conversation." },
  { q: "How long are the lessons?", a: "Standard lessons are 30 minutes for beginners and 45 to 60 minutes for intermediate and advanced students. We decide the right length based on your goals and attention span." },
  { q: "Do you teach music theory?", a: "Theory is woven into every lesson — not as a separate subject, but as context for what you are playing. You will understand why the music works, not just how to play the notes." },
  { q: "Can you prepare students for RCM exams?", a: "Yes. I have prepared students through all RCM practical and theory levels. Exam preparation is structured with clear milestones and mock assessments so there are no surprises on exam day." },
  { q: "What if my child wants to quit?", a: "I have a candid conversation with both the student and the parent. Often the issue is not the instrument — it is the repertoire or the pace. A small adjustment can reignite the spark. If it is truly time to stop, I respect that decision." },
  { q: "Do you teach online?", a: "Yes. Online lessons are available via Zoom with the same structure and attention as in-person sessions. Many students prefer the convenience, and the quality is excellent with a proper camera angle on the keys." },
  { q: "How often should my child practice?", a: "Daily practice is ideal — even 15 minutes is valuable for beginners. Quality matters more than quantity. I provide specific, actionable practice instructions after every lesson so the student knows exactly what to work on." },
];

const structureItems = [
  { label: "First lesson", desc: "An assessment of your current level, a conversation about your goals, and your first piece of music to take home. No pressure, no tests." },
  { label: "Weekly rhythm", desc: "Lessons follow a consistent structure: warm-up, technique, repertoire, and a creative challenge. Predictability builds momentum." },
  { label: "Practice notes", desc: "After every lesson, I send a clear summary of what to practice, how to practice it, and what we are building toward next." },
  { label: "Progress milestones", desc: "Every eight to ten weeks, we check in on progress and adjust the plan. You always know where you stand and where you are headed." },
  { label: "Recital preparation", desc: "Performance opportunities twice a year. Students choose their own repertoire and I prepare them to feel confident, not just competent." },
];

const testimonials = [
  {
    quote: "My daughter went from dreading practice to asking for extra time at the piano. Parker figured out what clicked for her in two lessons.",
    author: "Rachel",
    location: "Parent, Calgary",
  },
  {
    quote: "I started at 42 with zero experience. A year later I played Clair de Lune at my daughter's wedding. Parker made that possible.",
    author: "David",
    location: "Adult Student, Cochrane",
  },
  {
    quote: "He prepared my son for his RCM Level 8 exam with a calm, structured approach. First class honours. No stress.",
    author: "Angela",
    location: "Parent, Calgary",
  },
];

export default function TeachingFAQ() {
  usePageTheme();
  useEffect(() => {
    document.title = "Lesson FAQ — Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Everything you need to know about piano lessons — ages, scheduling, practice expectations, RCM preparation, and more."
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
            <p className="pricing-eyebrow">Lesson FAQ</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              The questions every student asks.
            </h1>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              Whether you are a parent exploring options or an adult picking up the instrument for the first time — here is everything you need to know.
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
            <img src={teachingStudioImg} alt="Warm teaching studio with piano and natural light" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ AT A GLANCE ═══ */}
        <section id="faq-quick" className="pricing-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">At a Glance</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Five things to know before your first lesson.
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
                The students who ask the most questions are the ones who grow the fastest. I welcome every one.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why Curiosity Matters
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
          </div>
        </section>

        {/* ═══ EDITORIAL IMAGE — Teaching keys ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={teachingKeysImg} alt="Close-up of piano keys in a teaching studio" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ LESSON STRUCTURE ═══ */}
        <section id="faq-structure" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Lesson Structure</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
              How each lesson is built.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Consistency creates confidence. Here is the framework.
            </p>
          </RevealOnScroll>

          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {structureItems.map((item, i) => (
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
              <Link to="/teaching/pricing" className="pricing-cta--link">
                View lesson plans and pricing
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </RevealOnScroll>

          {/* Pull quote */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                Every student deserves a teacher who listens as carefully as they play. That is the standard I hold myself to.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why Teaching Matters to Me
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ KIND WORDS ═══ */}
        <section id="faq-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What families say</p>
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

        {/* ═══ EDITORIAL IMAGE — Student learning ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={studentLearningImg} alt="Student and teacher sharing a moment at the piano" loading="lazy" />
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
                  Every journey starts with a conversation.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Tell me about your goals — or your child's. I will respond within 24 hours with a plan for getting started.
                </p>
                <div className="mt-10">
                  <Link to="/teaching/contact" className="pricing-cta">
                    Begin the Conversation
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
