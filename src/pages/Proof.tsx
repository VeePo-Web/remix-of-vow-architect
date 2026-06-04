import { PricingNav } from "@/components/PricingNav";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import galleryHeroImg from "@/assets/wedding-brendan-ceremony.png";
import gallerySetupImg from "@/assets/gallery-setup.jpg";
import vowAltarImg    from "@/assets/vow-moment-altar.jpg";
import handsKeysImg   from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "pf-hero",        label: "The Proof",      isBlackKey: false },
  { id: "pf-clarity",    label: "Sound Levels",    isBlackKey: true  },
  { id: "pf-preparation",label: "Preparation",     isBlackKey: false },
  { id: "pf-insurance",  label: "Insurance",       isBlackKey: true  },
  { id: "pf-redundancy", label: "Backup Systems",  isBlackKey: false },
  { id: "pf-downloads",  label: "Downloads",       isBlackKey: true  },
  { id: "pf-words",      label: "Kind Words",      isBlackKey: false },
  { id: "pf-cta",        label: "Reserve My Date", isBlackKey: true  },
];

const splPhases = [
  { label: "Prelude",     desc: "Quiet enough for conversation, present enough to set the tone. Ambient volume verified at 60–65 dBA at aisle midpoint." },
  { label: "Vows",        desc: "Every word heard — even in the last row. Volume balanced to your space so vows land with crystal clarity, verified with timestamped readings." },
  { label: "Recessional", desc: "The exhale — music that matches the moment. Dynamic peak logged so the celebration breathes without overwhelming." },
];

const preparationSteps = [
  { label: "Cue Sheet",          desc: "Co-authored with your planner and officiant — every entrance, vow, and exit is timed to the second. Nothing improvised. Nothing left to chance." },
  { label: "Silent Power",       desc: "Battery-powered sound — placement optimized for distance and wind. No generators. No cords. No noise. Compliant with every venue requirement." },
  { label: "Natural Projection", desc: "Seating arranged so words and music carry naturally — without excessive volume. Verified before your first guest arrives." },
];

const insuranceStats = [
  { value: "$4M",  label: "Total Coverage" },
  { value: "$25k", label: "Equipment" },
  { value: "24hr", label: "Certificate Delivery" },
];

const insuranceItems = [
  { label: "$2M Professional Liability", desc: "Covers performance or plan execution failures. Documentation provided to your venue coordinator in advance." },
  { label: "$2M General Liability",      desc: "Protects venue, guests, and property. Comprehensive commercial coverage that satisfies every venue requirement." },
  { label: "$25k Equipment Coverage",    desc: "Full replacement value on every instrument, cable, and battery. If anything breaks, it is covered." },
];

const redundancyTiers = [
  { label: "Primary System",     desc: "Wireless sound, live balance, battery power, and piano. The full concert-grade setup that carries your ceremony." },
  { label: "Second System",      desc: "Independent backup wireless unit and sound system on a separate channel. If primary fails, second activates in seconds." },
  { label: "Acoustic Fallback",  desc: "Second keyboard ready — positioned and powered independently. Music never stops." },
  { label: "Emergency Playback", desc: "Portable speaker with your processional and recessional pre-loaded. The final safety net that has never been needed." },
];

const samplePlans = [
  { label: "Volume Documentation & Cue Sheet",  venue: "Cascade Gardens",  desc: "Verified readings with timestamps and ceremony timeline." },
  { label: "Ceremony Timeline with Seating Plan",venue: "Cochrane Ranch",   desc: "Visual layout and minute-by-minute timing." },
  { label: "Planner-Coordinated Cue Map",        venue: "Canmore Hall",     desc: "Co-authored entrance, vow, and exit timing." },
];

const testimonials = [
  { quote: "We included the volume documentation in our permit application — approved instantly.", author: "Elise",          location: "Canmore"     },
  { quote: "Our planner called Parker the most prepared musician she has ever worked with.",       author: "Miguel",         location: "Deane House" },
  { quote: "The venue waived their deposit — the policy covered everything.",                      author: "Jasmine & Colin",location: "Calgary"     },
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

      <main>

        {/* ═══ HERO ═══ */}
        <section id="pf-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Proof of Craft</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "14ch" }}
            >
              I do not just say it.
            </h1>
            <p
              className="font-display font-light leading-[1.2] mt-3"
              style={{ fontSize: "clamp(28px,4vw,48px)", color: "hsl(var(--pricing-fg-secondary))" }}
            >
              I document it.
            </p>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              Documentation, insurance, redundancy, and the quiet certainty that comes from preparation. This is what devotion looks like in practice.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={galleryHeroImg} alt="Parker playing piano at an outdoor wedding ceremony" loading="eager" style={{ objectPosition: "center 47%" }} />
        </div>

        {/* ═══ SOUND LEVELS — dark band ═══ */}
        <section id="pf-clarity" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Documentation</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
              >
                Clarity. Documented.
              </h2>
              <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(0 0% 100% / 0.50)" }}>
                Volume measured at three critical moments. Timestamped. Verified.
              </p>
            </RevealOnScroll>

            <div className="mt-14 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {splPhases.map((phase, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 50}>
                  <div
                    className="grid gap-1 py-7 mobile-stack"
                    style={{ gridTemplateColumns: "clamp(120px,16vw,200px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                  >
                    <p className="font-sans text-[15px] font-semibold leading-[1.5]" style={{ color: "hsl(0 0% 100% / 0.88)" }}>
                      {phase.label}
                    </p>
                    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.50)" }}>
                      {phase.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "28ch" }}
              >
                If you cannot prove it was heard, you cannot promise it will be.
              </p>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                Why I document
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ SETUP IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={gallerySetupImg} alt="Battery-powered piano and wireless system arranged before guests arrive" loading="lazy" />
        </div>

        {/* ═══ PREPARATION — white ═══ */}
        <section id="pf-preparation" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Preparation</p>
            <h2
              className="font-display font-semibold tracking-[-0.025em] mt-4"
              style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
            >
              The work you never see.
            </h2>
            <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Three things that are finished before your first guest arrives.
            </p>
          </RevealOnScroll>

          <div className="mt-14 divide-y divide-[hsl(36_16%_90%)]">
            {preparationSteps.map((step, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div
                  className="grid py-8 mobile-stack-3"
                  style={{ gridTemplateColumns: "clamp(32px,5vw,64px) 1fr 1fr", gap: "clamp(16px,4vw,48px)", alignItems: "start" }}
                >
                  <p className="font-sans text-[13px] font-medium" style={{ color: "hsl(var(--pricing-fg-tertiary))", paddingTop: "3px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="font-display font-semibold tracking-[-0.03em]"
                    style={{ fontSize: "clamp(22px,3vw,36px)" }}
                  >
                    {step.label}
                  </h3>
                  <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                    {step.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="up">
            <p
              className="sub-pull mt-20"
              style={{ color: "hsl(var(--pricing-fg))", maxWidth: "28ch" }}
            >
              The best preparation is invisible. By the time your guests sit down, everything that could go wrong already cannot.
            </p>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
              Why I prepare
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ INSURANCE — warm band ═══ */}
        <section id="pf-insurance" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Insurance</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
              >
                Fully insured. Fully transparent.
              </h2>
              <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                Comprehensive coverage sent to your venue coordinator before you need to ask.
              </p>
            </RevealOnScroll>

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

            <div className="mt-16 divide-y divide-[hsl(36_16%_88%)]">
              {insuranceItems.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 50}>
                  <div
                    className="grid py-6 mobile-stack"
                    style={{ gridTemplateColumns: "clamp(180px,22vw,280px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                  >
                    <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                    <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <p className="font-sans text-[13px] mt-8" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
              Certificates sent to your venue and planner in advance. You will never need to ask.
            </p>
          </div>
        </section>

        {/* ═══ REDUNDANCY — dark band ═══ */}
        <section id="pf-redundancy" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Redundancy</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "18ch" }}
              >
                Backup on backup on backup.
              </h2>
              <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(0 0% 100% / 0.50)" }}>
                Four independent systems. I do not hope — I duplicate.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <div className="pricing-trust-grid mt-16" style={{ maxWidth: "420px" }}>
                <div className="pricing-trust-stat">
                  <p className="pricing-trust-stat__value">500+</p>
                  <p className="pricing-trust-stat__label">Events</p>
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

            <div className="mt-16 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {redundancyTiers.map((tier, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 60}>
                  <div
                    className="grid py-7 mobile-stack-3"
                    style={{ gridTemplateColumns: "clamp(32px,5vw,64px) clamp(140px,18vw,200px) 1fr", gap: "clamp(16px,4vw,40px)" }}
                  >
                    <p className="font-sans text-[13px] font-medium" style={{ color: "hsl(0 0% 100% / 0.28)", paddingTop: "3px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-sans text-[15px] font-semibold leading-[1.5]" style={{ color: "hsl(0 0% 100% / 0.88)" }}>
                      {tier.label}
                    </p>
                    <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(0 0% 100% / 0.50)" }}>
                      {tier.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(0 0% 100% / 0.88)", maxWidth: "30ch" }}
              >
                The fourth tier has never been needed. It exists anyway.
              </p>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                Why I overbuild
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ ALTAR IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={vowAltarImg} alt="Candlelit ceremony aisle at golden hour" loading="lazy" />
        </div>

        {/* ═══ DOWNLOADS — white ═══ */}
        <section id="pf-downloads" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Your Plan</p>
            <h2
              className="font-display font-semibold tracking-[-0.025em] mt-4 mb-3"
              style={{ fontSize: "clamp(28px,3.5vw,40px)", maxWidth: "22ch" }}
            >
              You do not get a musician. You get a plan.
            </h2>
            <p
              className="font-sans text-[15px] mb-14"
              style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "44ch" }}
            >
              Delivered within 24 hours of booking. Every document built for your venue, your ceremony, and your peace of mind.
            </p>
          </RevealOnScroll>

          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {samplePlans.map((plan, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div
                  className="grid py-7 mobile-stack-3"
                  style={{ gridTemplateColumns: "1fr clamp(100px,12vw,160px) 1.4fr", gap: "clamp(16px,4vw,48px)", alignItems: "baseline" }}
                >
                  <h3 className="font-sans text-[15px] font-semibold">{plan.label}</h3>
                  <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                    {plan.venue}
                  </p>
                  <p className="font-sans text-[14px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                    {plan.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <p className="font-sans text-[13px] mt-8" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
            Sample plans available on request. Every plan is custom to your venue, your ceremony, and your day.
          </p>

          <RevealOnScroll variant="up">
            <p
              className="sub-pull mt-20"
              style={{ color: "hsl(var(--pricing-fg))", maxWidth: "28ch" }}
            >
              Other musicians bring talent. I bring a system. Talent fails on a bad day. Systems do not.
            </p>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
              Why I systematize
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ KIND WORDS — dark band ═══ */}
        <section id="pf-words" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">What they say</p>
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

        {/* ═══ HANDS IMAGE ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={handsKeysImg} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
        </div>

        {/* ═══ CTA — dark band ═══ */}
        <section id="pf-cta" className="sub-dark piano-section-target">
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
                    Your ceremony deserves certainty.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    Tell me about your ceremony — the venue, the feeling, the moments that matter most. I will respond within 24 hours with a personalized plan and a sample of the documentation you will receive.
                  </p>
                  <div className="mt-10">
                    <Link to="/contact" className="pricing-cta pricing-cta--inverted">
                      Reserve My Date
                    </Link>
                  </div>
                  <p className="font-sans text-[13px] mt-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                    No commitment. No obligation. Just a conversation.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <p
              className="font-sans text-[12px] leading-[1.7] mt-16"
              style={{ color: "hsl(0 0% 100% / 0.22)", maxWidth: "64ch" }}
            >
              I design within typical venue policies and restrictions. Where sound limits apply, your plan prioritizes proximity seating and acoustic projection. Insurance certificates and safety documentation are available on request.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
