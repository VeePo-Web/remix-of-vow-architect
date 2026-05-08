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
import eventsBallroomImg from "@/assets/events-ballroom-grand.jpg";

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
  { label: "Atmosphere",    desc: "I shape the feeling of being together. The right music at the right volume makes strangers feel like friends and conversation flow like wine." },
  { label: "Adaptability",  desc: "Your event, your sound. Repertoire, energy, and volume shift in real-time with the room — never against it. This is what separates live piano from a playlist." },
  { label: "Presence",      desc: "Present without performing. I arrive before your first guest, read the room before I play a note, and disappear when the evening is done. Zero footprint." },
];

const credentials = [
  { value: "500+", label: "Songs" },
  { value: "12",   label: "Years" },
  { value: "4",    label: "Venue Types" },
  { value: "$4M",  label: "Insured" },
];

const witnessedMoments = [
  { moment: "The CEO who teared up during a retirement toast — and the room that held still for him", occasion: "Corporate Gala" },
  { moment: "Two strangers at a fundraiser who became friends over a song they both recognized",       occasion: "Charity Event" },
  { moment: "The four-hour reception where no one checked their phone",                               occasion: "Private Dinner" },
  { moment: "The farewell gathering where the last song said what no one could",                      occasion: "Retirement" },
];

const testimonials = [
  { quote: "We hired a DJ for the last three years. This year we hired Parker. Our team is still talking about it.", author: "Rebecca Cho",  location: "Telus Spark, Calgary" },
  { quote: "I didn't notice the music. I noticed the feeling. That's exactly what I wanted.",                       author: "Mark Andersen", location: "Hotel Arts" },
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

      <main>

        {/* ═══ HERO ═══ */}
        <section id="eab-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Private Event Pianist</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "16ch" }}
            >
              I don't play at events.
            </h1>
            <p
              className="font-display font-light leading-[1.2] mt-3"
              style={{ fontSize: "clamp(28px,4vw,48px)", color: "hsl(var(--pricing-fg-secondary))" }}
            >
              I listen to them.
            </p>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              Live music that shapes the feeling of being together — so the host stops worrying about the music and starts being a guest at their own event.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={eventsPerformerBw} alt="Parker seated at a keyboard on stage, dramatic black and white" loading="eager" style={{ objectPosition: "center 30%" }} />
        </div>

        {/* ═══ THE ROOM — dark band ═══ */}
        <section id="eab-origin" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">The Room</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch", color: "hsl(0 0% 100% / 0.94)" }}
              >
                The music no one notices — only the feeling it leaves behind.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <div className="mt-14 space-y-5" style={{ maxWidth: "52ch" }}>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                  I played a corporate dinner once where the previous entertainment had been a jazz trio at full volume. The host told me later that half the room left early because they couldn't hear each other talk.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                  That night changed everything I believed about event music. The best music at an event is the kind no one notices — only the feeling it leaves behind.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                  Now I read the room before I play a single note. Volume, tempo, and repertoire shift with the energy of the conversation — never against it.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "28ch" }}
              >
                If you have to ask someone to turn the music down, the musician has already failed.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(0 0% 100% / 0.28)" }}
              >
                The lesson that changed everything
              </p>
            </RevealOnScroll>

          </div>
        </section>

        {/* ═══ CINEMATIC BREAK ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={eventsStageMotion} alt="Parker performing on stage with dynamic motion and blue stage lighting" loading="lazy" style={{ objectPosition: "center 40%" }} />
        </div>

        {/* ═══ THREE PRINCIPLES ═══ */}
        <section id="eab-principles" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em]"
              style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
            >
              Three principles that guide every performance.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not rules. Instincts refined over twelve years.
            </p>
          </RevealOnScroll>

          <div className="mt-16 divide-y" style={{ borderColor: "hsl(36 16% 90%)" }}>
            {principles.map((item, i) => (
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

        {/* ═══ BALLROOM IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={eventsBallroomImg} alt="Grand piano in a candlelit ballroom" loading="lazy" />
        </div>

        {/* ═══ EXPERIENCE — warm band ═══ */}
        <section id="eab-presence" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">The Presence</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "18ch" }}
              >
                Moments I carry with me.
              </h2>
              <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                The rooms that remind me why I do this.
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
              {witnessedMoments.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 80}>
                  <div
                    className="grid items-baseline py-7"
                    style={{ gridTemplateColumns: "1fr clamp(100px,14vw,160px)", gap: "clamp(12px,3vw,32px)" }}
                  >
                    <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.moment}</p>
                    <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{item.occasion}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(var(--pricing-fg))", maxWidth: "30ch" }}
              >
                The host who stops worrying about the music has already become a guest at their own event.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
              >
                What I work toward
              </p>
            </RevealOnScroll>

          </div>
        </section>

        {/* ═══ KIND WORDS — dark band ═══ */}
        <section id="eab-words" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">What hosts say</p>
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

        {/* ═══ MY PROMISE ═══ */}
        <section id="eab-promise" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em] mb-3"
              style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "18ch" }}
            >
              My promise to every host.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Not a contract. A covenant.
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
                Private Event Pianist
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ CTA — dark band ═══ */}
        <section id="eab-cta" className="sub-dark piano-section-target">
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
                    Your event deserves presence.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    Tell me about your gathering — the venue, the guests, the feeling you want in the room. I will show you how live piano transforms it.
                  </p>
                  <div className="mt-10">
                    <Link to="/events/contact" className="pricing-cta pricing-cta--inverted">
                      Message Me
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
