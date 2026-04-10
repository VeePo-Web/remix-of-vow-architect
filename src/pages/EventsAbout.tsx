import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import eventsBallroomImg from "@/assets/events-ballroom-grand.jpg";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";
import eventsHeroImg from "@/assets/events-hero.jpg";

const sections = [
  { id: "eab-hero",       label: "The Listener",   isBlackKey: false },
  { id: "eab-origin",     label: "The Room",       isBlackKey: true  },
  { id: "eab-principles", label: "Principles",     isBlackKey: false },
  { id: "eab-presence",   label: "Experience",     isBlackKey: true  },
  { id: "eab-words",      label: "Kind Words",     isBlackKey: false },
  { id: "eab-promise",    label: "My Promise",     isBlackKey: true  },
  { id: "eab-cta",        label: "Get in Touch",   isBlackKey: false },
];

const principles = [
  { label: "Atmosphere", desc: "I shape the feeling of being together. The right music at the right volume makes strangers feel like friends and conversation flow like wine." },
  { label: "Adaptability", desc: "Your event, your sound. Repertoire, energy, and volume shift in real-time with the room — never against it. This is what separates live piano from a playlist." },
  { label: "Presence", desc: "Present without performing. I arrive before your first guest, read the room before I play a note, and disappear when the evening is done. Zero footprint." },
];

const credentials = [
  { value: "500+", label: "Songs" },
  { value: "12", label: "Years" },
  { value: "4", label: "Venue Types" },
  { value: "$4M", label: "Insured" },
];

const witnessedMoments = [
  { moment: "The CEO who teared up during a retirement toast — and the room that held still for him", occasion: "Corporate Gala" },
  { moment: "Two strangers at a fundraiser who became friends over a song they both recognized", occasion: "Charity Event" },
  { moment: "The four-hour reception where no one checked their phone", occasion: "Private Dinner" },
  { moment: "The farewell gathering where the last song said what no one could", occasion: "Retirement" },
];

const testimonials = [
  {
    quote: "We hired a DJ for the last three years. This year we hired Parker. Our team is still talking about it.",
    author: "Rebecca Cho",
    location: "Telus Spark, Calgary",
  },
  {
    quote: "I didn't notice the music. I noticed the feeling. That's exactly what I wanted.",
    author: "Mark Andersen",
    location: "Hotel Arts",
  },
];

const promises = [
  "I will arrive before your first guest.",
  "I will read the room before I play a note.",
  "I will adapt to the energy, not impose my own.",
  "I will be present without performing.",
  "I will leave no trace but the memory of how the room felt.",
];

export default function EventsAbout() {
  usePageTheme();
  useEffect(() => {
    document.title = "About — Parker Gawryletz, Private Event Pianist";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "The philosophy, experience, and promise behind every note I play at your gathering."
    );
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="eab-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Private Event Pianist</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              I don't play at events.
            </h1>
            <p className="font-display text-[clamp(28px,4vw,48px)] font-light leading-[1.2] mt-3" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              I listen to them.
            </p>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              Live music that shapes the feeling of being together — so the host stops worrying about the music and starts being a guest at their own event.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={eventsBallroomImg} alt="Grand piano in a candlelit ballroom" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ THE ROOM ═══ */}
        <section id="eab-origin" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">The Room</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              The music no one notices — only the feeling it leaves behind.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-start mt-16">
            <RevealOnScroll variant="left">
              <div className="space-y-6">
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  I played a corporate dinner once where the previous entertainment had been a jazz trio at full volume. The host told me later that half the room left early because they couldn't hear each other talk.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  That night changed everything I believed about event music. The best music at an event is the kind no one notices — only the feeling it leaves behind.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  Now I read the room before I play a single note. Volume, tempo, and repertoire shift with the energy of the conversation — never against it.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="right">
              <div className="pricing-image pricing-image--cinematic pricing-image--contained">
                <img src={eventsHeroImg} alt="Grand piano in an elegant event venue" loading="lazy" />
              </div>
            </RevealOnScroll>
          </div>

          {/* Pull quote — full width, asymmetric */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                If you have to ask someone to turn the music down, the musician has already failed.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                The Lesson That Changed Everything
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ THREE PRINCIPLES ═══ */}
        <section id="eab-principles" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Three principles that guide every performance.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not rules. Instincts refined over twelve years.
            </p>
          </RevealOnScroll>

          <div className="space-y-32 mt-20">
            {principles.map((item, i) => (
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

        {/* ═══ EDITORIAL IMAGE — Hands on keys ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={handsKeysImg} alt="Hands on piano keys" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="eab-presence" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">The Presence</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "18ch" }}>
              Moments I carry with me.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              The rooms that remind me why I do this.
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

          {/* Witnessed moments — structured list */}
          <div className="mt-24 space-y-0 divide-y divide-[hsl(36_16%_90%)]">
            {witnessedMoments.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 80}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-1 md:gap-8 py-7 items-baseline">
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.moment}</p>
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{item.occasion}</p>
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
                The host who stops worrying about the music has already become a guest at their own event. That is when the evening begins.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                What I Work Toward
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ KIND WORDS ═══ */}
        <section id="eab-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What hosts say</p>
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

        {/* ═══ MY PROMISE ═══ */}
        <section id="eab-promise" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em] mb-3" style={{ maxWidth: "18ch" }}>
              My promise to every host.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not a contract. A covenant.
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
                Private Event Pianist
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section id="eab-cta" className="pricing-section piano-section-target pb-36">
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
                  Tell me about your gathering — the venue, the guests, the feeling you want in the room. I will show you how live piano transforms it.
                </p>
                <div className="mt-10">
                  <Link to="/events/contact" className="pricing-cta">
                    Message Me
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
