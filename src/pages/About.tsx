import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import aboutHeroImg     from "@/assets/wedding-brendan-ceremony.png";
import aboutOriginImg   from "@/assets/about-origin.jpg";
import aboutPresenceImg from "@/assets/about-presence.jpg";
import handsKeys        from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "ab-hero",     label: "The Witness",    isBlackKey: false },
  { id: "ab-origin",   label: "My Story",       isBlackKey: true  },
  { id: "ab-beliefs",  label: "What I Believe", isBlackKey: false },
  { id: "ab-presence", label: "Experience",     isBlackKey: true  },
  { id: "ab-words",    label: "Kind Words",     isBlackKey: false },
  { id: "ab-promise",  label: "My Promise",     isBlackKey: true  },
  { id: "ab-cta",      label: "Get in Touch",   isBlackKey: false },
];

const beliefs = [
  { label: "Words",   desc: "I carry every syllable so it lands where it belongs. Your guests will hear your vows — not the wind, not the traffic, not the nerves." },
  { label: "Silence", desc: "I guard the pause between what is spoken. The silence after your first kiss is sacred. I protect it." },
  { label: "Memory",  desc: "I remember what was said when memory fades. Years from now, the music will bring you back to the exact moment you said yes." },
];

const credentials = [
  { value: "500+", label: "Events" },
  { value: "17",   label: "Years"  },
  { value: "$4M",  label: "Insured" },
  { value: "3×",   label: "Redundancy" },
];

const witnessedMoments = [
  { moment: "The bride who forgot her vows — and spoke from the heart instead", location: "Canmore"  },
  { moment: "The groom who cried before he could say 'I do'",                   location: "Cochrane" },
  { moment: "The grandmother who heard every word from the last row",            location: "Priddis"  },
  { moment: "The silence after the first kiss that no one wanted to break",      location: "Okotoks"  },
];

const testimonials = [
  { quote: "He played the song I walked down the aisle to — and I forgot there were a hundred people watching.", author: "Sarah & James",  location: "Priddis"                  },
  { quote: "Our guests still talk about the music. Not the food. Not the flowers. The music.",                   author: "Emily & David", location: "The Lake House, Calgary"  },
];

const promises = [
  "I will arrive an hour before you need me.",
  "I will prepare as though your ceremony were my own.",
  "I will guard the silence between your words.",
  "I will carry your vows so they land where they belong.",
  "I will remember what was spoken when memory fades.",
];

export default function About() {
  usePageTheme();
  useEffect(() => {
    document.title = "About — Parker Gawryletz, Ceremony Pianist";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "The origin, credentials, and philosophy behind every note.");
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main>

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <section
          id="ab-hero"
          className="piano-section-target sub-pad"
          style={{ paddingTop: "clamp(96px, 13vw, 160px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}
        >
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Ceremony Pianist</p>
            <h1
              className="font-display font-semibold leading-[1.02] tracking-[-0.038em] mt-4"
              style={{ fontSize: "clamp(52px, 8vw, 96px)", maxWidth: "13ch" }}
            >
              I don't perform at weddings.
            </h1>
            <p
              className="font-display font-light italic leading-[1.2] mt-4"
              style={{ fontSize: "clamp(26px, 3.8vw, 50px)", color: "hsl(var(--pricing-fg-secondary))" }}
            >
              I witness them.
            </p>
            <p
              className="font-sans leading-[1.7] mt-8"
              style={{ fontSize: "clamp(16px, 1.5vw, 19px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "46ch" }}
            >
              Live music that holds the room still — so every word spoken between two people lands exactly where it belongs.
            </p>
          </RevealOnScroll>
        </section>

        {/* ══ HERO IMAGE ════════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--hero">
          <img src={aboutHeroImg} alt="Parker playing piano at an outdoor wedding ceremony" loading="eager" style={{ objectPosition: "center 47%" }} />
        </div>

        {/* ══ ORIGIN — text left / image right flush to edge ════════ */}
        <section id="ab-origin" className="piano-section-target sub-split">
          <RevealOnScroll variant="left">
            <div className="sub-pad sub-section space-y-5">
              <p className="pricing-eyebrow">The Origin</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em]"
                style={{ fontSize: "clamp(26px, 3vw, 40px)", maxWidth: "22ch" }}
              >
                It started with a promise I made to no one.
              </h2>
              <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                I sat in the second row at a wedding and couldn't hear a single word of the vows. The wind blew. The musician shrugged. The moment was lost.
              </p>
              <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                I left the reception that night with a single promise: no couple would ever lose their words to the wind.
              </p>
              <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                That promise became a method. The method became a system. Five hundred ceremonies later, it is still the same promise.
              </p>
              <div style={{ borderTop: "1px solid hsl(36 16% 90%)", paddingTop: "24px" }}>
                <p
                  className="font-display italic leading-[1.5]"
                  style={{ fontSize: "clamp(17px, 2vw, 23px)", color: "hsl(var(--pricing-fg-secondary))" }}
                >
                  "No couple should ever wonder if their guests heard their vows."
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <div className="sub-split__img">
            <img src={aboutOriginImg} alt="Empty ceremony chairs at twilight with scattered petals" loading="lazy" />
          </div>
        </section>

        {/* ══ BELIEFS — dark full-bleed band ════════════════════════ */}
        <section id="ab-beliefs" className="piano-section-target sub-dark">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">What I carry</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-3"
                style={{ fontSize: "clamp(26px, 3.2vw, 42px)", color: "hsl(40 20% 96%)", maxWidth: "26ch" }}
              >
                Like a sustain pedal holds a note, I hold your ceremony.
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mt-14">
              {beliefs.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 80}>
                  <div style={{ borderTop: "1px solid hsl(0 0% 100% / 0.10)", paddingTop: "24px" }}>
                    <p
                      className="font-sans font-medium uppercase tracking-[0.15em]"
                      style={{ fontSize: "10px", color: "hsl(0 0% 100% / 0.28)", marginBottom: "12px" }}
                    >
                      0{i + 1}
                    </p>
                    <h3
                      className="font-display font-semibold tracking-[-0.02em]"
                      style={{ fontSize: "clamp(24px, 2.6vw, 34px)", color: "hsl(40 20% 96%)" }}
                    >
                      {item.label}
                    </h3>
                    <p className="font-sans text-[14px] leading-[1.75] mt-4" style={{ color: "hsl(0 0% 100% / 0.50)" }}>
                      {item.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EDITORIAL IMAGE ════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={handsKeys} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
        </div>

        {/* ══ EXPERIENCE ════════════════════════════════════════════ */}
        <section id="ab-presence" className="piano-section-target sub-pad sub-section">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 items-start">
            <RevealOnScroll variant="up">
              <div>
                <p className="pricing-eyebrow">The Presence</p>
                <h2
                  className="font-display font-semibold tracking-[-0.04em] leading-[1.0] mt-3"
                  style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
                >
                  500+<br />events<br />witnessed.
                </h2>
                <p className="font-sans text-[15px] mt-5" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  Every one of them heard clearly.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-10">
                  {credentials.map((stat, i) => (
                    <div key={i}>
                      <p
                        className="font-display font-semibold tracking-[-0.04em] leading-[1]"
                        style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
                      >
                        {stat.value}
                      </p>
                      <p
                        className="font-sans uppercase tracking-[0.12em] mt-1"
                        style={{ fontSize: "10px", color: "hsl(var(--pricing-fg-tertiary))" }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <div className="divide-y divide-[hsl(36_16%_90%)]">
              <h3
                className="font-display font-semibold tracking-[-0.02em] pb-5"
                style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
              >
                Moments I've held.
              </h3>
              {witnessedMoments.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 60}>
                  <div className="grid grid-cols-[1fr_90px] gap-4 py-5 items-baseline">
                    <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {item.moment}
                    </p>
                    <p
                      className="font-sans font-medium uppercase tracking-[0.07em] text-right"
                      style={{ fontSize: "10px", color: "hsl(var(--pricing-fg-tertiary))" }}
                    >
                      {item.location}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRESENCE IMAGE ════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={aboutPresenceImg} alt="Ceremony moment captured through the piano" loading="lazy" />
        </div>

        {/* ══ KIND WORDS — warm full-bleed band ═════════════════════ */}
        <section id="ab-words" className="piano-section-target sub-warm">
          <div className="sub-pad sub-section">
            <p className="pricing-eyebrow mb-12">What couples say</p>
            <div className="space-y-0">
              {testimonials.map((t, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 100}>
                  <div className="py-10" style={{ borderTop: "1px solid hsl(36 16% 88%)" }}>
                    <p className="sub-pull">&ldquo;{t.quote}&rdquo;</p>
                    <p
                      className="font-sans font-medium uppercase tracking-[0.12em] mt-6"
                      style={{ fontSize: "11px", color: "hsl(36 20% 55%)" }}
                    >
                      — {t.author} · {t.location}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROMISE ════════════════════════════════════════════════ */}
        <section id="ab-promise" className="piano-section-target sub-pad sub-section">
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20 items-start">
              <div>
                <h2
                  className="font-display font-semibold tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
                >
                  My promise to you.
                </h2>
                <p className="font-sans text-[14px] mt-3" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  Not a contract. A covenant.
                </p>
              </div>
              <div className="divide-y divide-[hsl(36_16%_90%)]">
                {promises.map((promise, i) => (
                  <RevealOnScroll key={i} variant="up" delay={i * 50}>
                    <div className="py-4 flex items-baseline gap-4">
                      <span className="pricing-diamond" style={{ flexShrink: 0, marginTop: "9px" }} />
                      <p className="font-display leading-[1.5]" style={{ fontSize: "clamp(16px, 1.8vw, 20px)" }}>
                        {promise}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
                <div className="pt-7 pb-1">
                  <p className="font-display" style={{ fontSize: "17px" }}>Parker Gawryletz</p>
                  <p
                    className="font-sans font-medium uppercase tracking-[0.08em] mt-1"
                    style={{ fontSize: "10px", color: "hsl(var(--pricing-fg-tertiary))" }}
                  >
                    Ceremony Pianist
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* ══ CTA — dark full-bleed band ════════════════════════════ */}
        <section id="ab-cta" className="piano-section-target sub-dark">
          <div className="sub-pad" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)" }}>
            <RevealOnScroll variant="up">
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-20 items-start">
                <h2
                  className="font-display font-semibold tracking-[-0.03em] leading-[1.07]"
                  style={{ fontSize: "clamp(34px, 5vw, 64px)", color: "hsl(40 20% 96%)", maxWidth: "14ch" }}
                >
                  Your ceremony deserves a witness.
                </h2>
                <div className="md:pt-2">
                  <p
                    className="font-sans leading-[1.7]"
                    style={{ fontSize: "15px", color: "hsl(0 0% 100% / 0.50)", maxWidth: "40ch" }}
                  >
                    Tell me your date, your venue, and the feeling you want to capture. I will show you exactly how I carry your vows.
                  </p>
                  <div className="mt-8">
                    <Link to="/contact" className="pricing-cta pricing-cta--inverted">Reserve My Date</Link>
                  </div>
                  <p className="font-sans text-[13px] mt-4" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
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
