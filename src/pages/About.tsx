import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import aboutHeroImg from "@/assets/about-hero.jpg";
import aboutOriginImg from "@/assets/about-origin.jpg";
import aboutPresenceImg from "@/assets/about-presence.jpg";
import handsKeys from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "ab-hero",       label: "The Witness",    isBlackKey: false },
  { id: "ab-origin",     label: "My Story",       isBlackKey: true  },
  { id: "ab-beliefs",    label: "What I Believe", isBlackKey: false },
  { id: "ab-presence",   label: "Experience",     isBlackKey: true  },
  { id: "ab-words",      label: "Kind Words",     isBlackKey: false },
  { id: "ab-promise",    label: "My Promise",     isBlackKey: true  },
  { id: "ab-cta",        label: "Get in Touch",   isBlackKey: false },
];

const beliefs = [
  { label: "Words", desc: "I carry every syllable so it lands where it belongs. Your guests will hear your vows — not the wind, not the traffic, not the nerves." },
  { label: "Silence", desc: "I guard the pause between what is spoken. The silence after your first kiss is sacred. I protect it." },
  { label: "Memory", desc: "I remember what was said when memory fades. Years from now, the music will bring you back to the exact moment you said yes." },
];

const credentials = [
  { value: "500+", label: "Ceremonies" },
  { value: "12", label: "Years" },
  { value: "$4M", label: "Insured" },
  { value: "3x", label: "Redundancy" },
];

const witnessedMoments = [
  { moment: "The bride who forgot her vows — and spoke from the heart instead", location: "Canmore" },
  { moment: "The groom who cried before he could say 'I do'", location: "Banff Springs" },
  { moment: "The grandmother who heard every word from the last row", location: "Priddis" },
  { moment: "The silence after the first kiss that no one wanted to break", location: "Lake Louise" },
];

const testimonials = [
  {
    quote: "He played the song I walked down the aisle to — and I forgot there were a hundred people watching.",
    author: "Sarah & James",
    location: "Priddis",
  },
  {
    quote: "Our guests still talk about the music. Not the food. Not the flowers. The music.",
    author: "Emily & David",
    location: "Fairmont Macdonald",
  },
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
    document.querySelector('meta[name="description"]')?.setAttribute("content", "The origin, credentials, and philosophy behind every note. I exist to let my music sound like what your hearts feel like.");
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="ab-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Ceremony Pianist</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              I don't perform at weddings.
            </h1>
            <p className="font-display text-[clamp(28px,4vw,48px)] font-light leading-[1.2] mt-3" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              I witness them.
            </p>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              Live music that holds the room still — so every word spoken between two people lands exactly where it belongs.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={aboutHeroImg} alt="Parker at the piano during a ceremony" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ THE ORIGIN ═══ */}
        <section id="ab-origin" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">The Origin</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              It started with a promise I made to no one.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-start mt-16">
            <RevealOnScroll variant="left">
              <div className="space-y-6">
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  I sat in the second row at a wedding and couldn't hear a single word of the vows. The wind blew. The musician shrugged. The moment was lost.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  I left the reception that night with a single promise: no couple would ever lose their words to the wind.
                </p>
                <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                  That promise became a method. The method became a system. The system became a vocation. Twelve years and five hundred ceremonies later, it is still the same promise.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="right">
              <div className="pricing-image pricing-image--cinematic pricing-image--contained">
                <img src={aboutOriginImg} alt="Empty ceremony chairs at twilight with scattered petals" loading="lazy" />
              </div>
            </RevealOnScroll>
          </div>

          {/* Pull quote — full width, asymmetric */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                No couple should ever wonder if their guests heard their vows.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                The Origin Moment
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ WHAT I BELIEVE ═══ */}
        <section id="ab-beliefs" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Like a sustain pedal holds a note, I hold your ceremony.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Three things I carry for every couple.
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

        {/* ═══ EDITORIAL IMAGE — Hands on keys ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={handsKeys} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="ab-presence" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">The Presence</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "18ch" }}>
              500+ ceremonies witnessed.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Every one of them heard clearly.
            </p>
          </RevealOnScroll>

          {/* Credential stats — large display */}
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

          {/* Witnessed moments — staggered */}
          <div className="mt-24 space-y-0 divide-y divide-[hsl(36_16%_90%)]">
            {witnessedMoments.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 80}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-1 md:gap-8 py-7 items-baseline">
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.moment}</p>
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{item.location}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ EDITORIAL IMAGE — Presence ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={aboutPresenceImg} alt="Ceremony moment captured through the piano" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ KIND WORDS ═══ */}
        <section id="ab-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What couples say</p>
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
        <section id="ab-promise" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em] mb-3" style={{ maxWidth: "18ch" }}>
              My promise to you.
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
                Ceremony Pianist
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section id="ab-cta" className="pricing-section piano-section-target pb-36">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1]" style={{ maxWidth: "14ch" }}>
                  Your ceremony deserves a witness.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Tell me your date, your venue, and the feeling you want to capture. I will show you exactly how I carry your vows.
                </p>
                <div className="mt-10">
                  <Link to="/contact" className="pricing-cta">
                    Reserve My Date!
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
