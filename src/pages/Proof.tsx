import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import galleryHeroImg from "@/assets/gallery-hero.jpg";
import gallerySetupImg from "@/assets/gallery-setup.jpg";
import vowAltarImg from "@/assets/vow-moment-altar.jpg";
import handsKeysImg from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "pf-hero",        label: "The Proof",      isBlackKey: false },
  { id: "pf-clarity",     label: "Sound Levels",   isBlackKey: true  },
  { id: "pf-preparation", label: "Preparation",    isBlackKey: false },
  { id: "pf-insurance",   label: "Insurance",      isBlackKey: true  },
  { id: "pf-redundancy",  label: "Backup Systems", isBlackKey: false },
  { id: "pf-downloads",   label: "Downloads",      isBlackKey: true  },
  { id: "pf-words",       label: "Kind Words",     isBlackKey: false },
  { id: "pf-cta",         label: "Reserve My Date!",   isBlackKey: true  },
];

const splPhases = [
  { label: "Prelude", desc: "Quiet enough for conversation, present enough to set the tone. Ambient volume verified at 60–65 dBA at aisle midpoint." },
  { label: "Vows", desc: "Every word heard — even in the last row. Volume balanced to your space so vows land with crystal clarity, verified with timestamped readings." },
  { label: "Recessional", desc: "The exhale — music that matches the moment. Dynamic peak logged so the celebration breathes without overwhelming." },
];

const preparationSteps = [
  { label: "Cue Sheet", desc: "Co-authored with your planner and officiant — every entrance, vow, and exit is timed to the second. Nothing improvised. Nothing left to chance." },
  { label: "Silent Power", desc: "Battery-powered sound — placement optimized for distance and wind. No generators. No cords. No noise. Compliant with every venue and Parks Canada." },
  { label: "Natural Projection", desc: "Seating arranged so words and music carry naturally — without excessive volume. Verified before your first guest arrives." },
];

const insuranceStats = [
  { value: "$4M", label: "Total Coverage" },
  { value: "$25k", label: "Equipment" },
  { value: "24hr", label: "Certificate Delivery" },
];

const insuranceItems = [
  { label: "$2M Professional Liability", desc: "Covers performance or plan execution failures. Documentation provided to your venue coordinator in advance." },
  { label: "$2M General Liability", desc: "Protects venue, guests, and property. Comprehensive commercial coverage that satisfies every venue requirement." },
  { label: "$25k Equipment Coverage", desc: "Full replacement value on every instrument, cable, and battery. If anything breaks, it is covered." },
];

const redundancyTiers = [
  { label: "Primary System", desc: "Wireless sound, live balance, battery power, and piano. The full concert-grade setup that carries your ceremony." },
  { label: "Second System", desc: "Independent backup wireless unit and sound system on a separate channel. If primary fails, second activates in seconds." },
  { label: "Acoustic Fallback", desc: "Second keyboard ready — positioned and powered independently. Music never stops." },
  { label: "Emergency Playback", desc: "Portable speaker with your processional and recessional pre-loaded. The final safety net that has never been needed." },
];

const samplePlans = [
  { label: "Volume Documentation & Cue Sheet", venue: "Cascade Gardens", desc: "Verified readings with timestamps and ceremony timeline." },
  { label: "Ceremony Timeline with Seating Plan", venue: "Cochrane Ranch", desc: "Visual layout and minute-by-minute timing." },
  { label: "Planner-Coordinated Cue Map", venue: "Canmore Hall", desc: "Co-authored entrance, vow, and exit timing." },
];

const testimonials = [
  {
    quote: "We included the volume documentation in our permit application — approved instantly.",
    author: "Elise",
    location: "Tunnel Mountain",
  },
  {
    quote: "Our planner called Parker the most prepared musician she has ever worked with.",
    author: "Miguel",
    location: "Deane House",
  },
  {
    quote: "The venue waived their deposit — the policy covered everything.",
    author: "Jasmine & Colin",
    location: "Calgary",
  },
];

export default function Proof() {
  usePageTheme();
  useEffect(() => {
    document.title = "Proof of Craft — Parker Gawryletz, Ceremony Piano";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Documentation, $4M insurance, triple redundancy, and downloadable ceremony-audio plans. This is what devotion looks like in practice."
    );
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="pf-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Proof of Craft</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              I do not just say it.
            </h1>
            <p className="font-display text-[clamp(28px,4vw,48px)] font-light leading-[1.2] mt-3" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              I document it.
            </p>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              Documentation, insurance, redundancy, and the quiet certainty that comes from preparation. This is what devotion looks like in practice.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={galleryHeroImg} alt="Grand piano positioned beside ceremony documentation binders at a mountain venue" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ SOUND LEVELS ═══ */}
        <section id="pf-clarity" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Documentation</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Clarity. Documented.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Volume measured at three critical moments. Timestamped. Verified.
            </p>
          </RevealOnScroll>

          <div className="mt-14 divide-y divide-[hsl(36_16%_90%)]">
            {splPhases.map((phase, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-10 py-6">
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{phase.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{phase.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Pull quote */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                If you cannot prove it was heard, you cannot promise it will be.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Document
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ PREPARATION ═══ */}
        <section id="pf-preparation" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Preparation</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              The work you never see.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Three things that are finished before your first guest arrives.
            </p>
          </RevealOnScroll>

          <div className="space-y-32 mt-20">
            {preparationSteps.map((step, i) => (
              <RevealOnScroll key={i} variant={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start ${i % 2 !== 0 ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.03em] mt-1">{step.label}</h3>
                  </div>
                  <div className="pt-1">
                    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Pull quote — resolution */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                The best preparation is invisible. By the time your guests sit down, everything that could go wrong already cannot.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Prepare
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ EDITORIAL IMAGE — Setup ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={gallerySetupImg} alt="Battery-powered piano and wireless sound system arranged on a stone patio before guests arrive" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ INSURANCE ═══ */}
        <section id="pf-insurance" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Insurance</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              Fully insured. Fully transparent.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Comprehensive coverage sent to your venue coordinator before you need to ask.
            </p>
          </RevealOnScroll>

          {/* Insurance stats */}
          <RevealOnScroll variant="up">
            <div className="pricing-trust-grid mt-16" style={{ maxWidth: "420px" }}>
              {insuranceStats.map((stat, i) => (
                <div key={i} className="pricing-trust-stat">
                  <p className="pricing-trust-stat__value">{stat.value}</p>
                  <p className="pricing-trust-stat__label">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Insurance details */}
          <div className="mt-16 divide-y divide-[hsl(36_16%_90%)]">
            {insuranceItems.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-1 md:gap-10 py-6">
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <p className="text-[13px] mt-8" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
            Certificates sent to your venue and planner in advance. You will never need to ask.
          </p>
        </section>

        {/* ═══ REDUNDANCY ═══ */}
        <section id="pf-redundancy" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Redundancy</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "18ch" }}>
              Backup on backup on backup.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Four independent systems. I do not hope — I duplicate.
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant="up">
            <div className="pricing-trust-grid mt-16" style={{ maxWidth: "420px" }}>
              <div className="pricing-trust-stat">
                <p className="pricing-trust-stat__value">500+</p>
                <p className="pricing-trust-stat__label">Ceremonies</p>
              </div>
              <div className="pricing-trust-stat">
                <p className="pricing-trust-stat__value">0</p>
                <p className="pricing-trust-stat__label">Failures</p>
              </div>
              <div className="pricing-trust-stat">
                <p className="pricing-trust-stat__value">4</p>
                <p className="pricing-trust-stat__label">Independent Systems</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="mt-16 divide-y divide-[hsl(36_16%_90%)]">
            {redundancyTiers.map((tier, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-10 py-7">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{String(i + 1).padStart(2, "0")}</p>
                    <p className="font-sans text-[15px] font-semibold leading-[1.5] mt-1">{tier.label}</p>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{tier.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Pull quote */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                Every tier includes physical, electrical, and musical redundancy. The fourth tier has never been needed. It exists anyway.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Overbuild
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ EDITORIAL IMAGE — Ceremony ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={vowAltarImg} alt="Candlelit ceremony aisle" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ DOWNLOADS ═══ */}
        <section id="pf-downloads" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Your Plan</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
              You do not get a musician — you get a plan.
            </h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Delivered within 24 hours of booking. Every document built for your venue, your ceremony, and your peace of mind.
            </p>
          </RevealOnScroll>

          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {samplePlans.map((plan, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_1.5fr] gap-1 md:gap-8 py-7 items-baseline">
                  <div>
                    <h3 className="font-sans text-[15px] font-semibold">{plan.label}</h3>
                    <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-1 md:hidden" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{plan.venue}</p>
                  </div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em] hidden md:block" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{plan.venue}</p>
                  <p className="font-sans text-[14px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{plan.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <p className="text-[13px] mt-8" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
            Sample plans available on request. Every plan is custom to your venue, your ceremony, and your day.
          </p>

          {/* Pull quote — resolution */}
          <RevealOnScroll variant="up">
            <div className="mt-24 py-6" style={{ borderLeft: "2px solid hsl(36 30% 78%)", paddingLeft: "24px" }}>
              <p className="font-display text-[clamp(18px,2vw,22px)] font-medium italic leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
                Other musicians bring talent. I bring a system. Talent fails on a bad day. Systems do not.
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mt-4" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                Why I Systematize
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ KIND WORDS ═══ */}
        <section id="pf-words" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow mb-16">What they say</p>
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

        {/* ═══ EDITORIAL IMAGE — Hands on keys ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={handsKeysImg} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ FINAL CTA ═══ */}
        <section id="pf-cta" className="pricing-section piano-section-target pb-36">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1]" style={{ maxWidth: "14ch" }}>
                  Your ceremony deserves certainty.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  Tell me about your ceremony — the venue, the feeling, the moments that matter most. I will respond within 24 hours with a personalized plan and a sample of the documentation you will receive.
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

          <p className="text-[12px] leading-[1.7] mt-16" style={{ color: "hsl(var(--pricing-fg-tertiary))", maxWidth: "64ch" }}>
            I design within typical venue policies and Parks Canada guidelines. Where sound restrictions apply, your plan prioritizes proximity seating and acoustic projection. Insurance certificates and safety documentation are available on request.
          </p>
        </section>

      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
