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

import witnessCeremony from "@/assets/witness-ceremony.jpg";
import handsKeys       from "@/assets/hands-keys-closeup.jpg";
import vowAltar        from "@/assets/vow-moment-altar.jpg";
import gallerySetup    from "@/assets/gallery-setup.jpg";

const sections = [
  { id: "p-hero",      label: "The Offering",     isBlackKey: false },
  { id: "p-included",  label: "What You Get",     isBlackKey: true  },
  { id: "p-tiers",     label: "Choose Your Path", isBlackKey: false },
  { id: "p-addons",    label: "Enhancements",     isBlackKey: true  },
  { id: "p-compare",   label: "Why Piano",        isBlackKey: false },
  { id: "p-words",     label: "Kind Words",       isBlackKey: true  },
  { id: "p-questions", label: "Questions",        isBlackKey: false },
  { id: "p-cta",       label: "Reserve My Date",  isBlackKey: true  },
];

const inclusions = [
  { label: "Full 88-key piano",          desc: "Concert-grade instrument, battery-powered — or your venue's acoustic if it meets the standard. No generators. No cords. No noise." },
  { label: "Vow clarity system",         desc: "Wireless audio balanced to your space. Every word your officiant speaks, every vow you whisper — heard naturally, without a single microphone visible." },
  { label: "Triple redundancy",          desc: "Backup instrument, backup power, backup audio. Three independent systems so nothing is left to chance on the most important day of your life." },
  { label: "60-minute early arrival",    desc: "I arrive before your first guest. Setup, sound check, walk-through with your planner — finished invisibly, before anyone knows I am there." },
  { label: "$4M insurance",              desc: "$2M professional liability, $2M general liability, $25k equipment coverage. Documentation provided to your venue coordinator in advance." },
  { label: "Collaborative cue sheet",   desc: "Co-authored with your planner and officiant. Every processional, every pause, every crescendo — choreographed to the second." },
];

const tiers = [
  {
    name: "The Vow",
    price: "$650",
    duration: "30–45 minutes",
    headline: "The ceremony itself.",
    description: "Devoted presence at the most sacred hour of your life. Every note prepared for months. Every cue rehearsed until it becomes instinct. This is the moment your guests hold their breath.",
    features: [
      "Full ceremony sound — every word heard clearly",
      "Custom processional and recessional arrangements",
      "Vow clarity, naturally balanced to your space",
      "Silent battery power — zero interruptions",
      "Post-ceremony volume documentation",
    ],
    note: "50% deposit secures your date. Balance due 14 days before.",
    featured: false,
  },
  {
    name: "The Hour",
    price: "$750",
    duration: "Prelude through cocktails",
    headline: "Most chosen by couples.",
    description: "From the quiet anticipation of guest arrival through the ceremony and into the first exhale of cocktails. The full emotional arc of your afternoon — guided by a single musician who reads the room as naturally as you read each other.",
    features: [
      "Everything in The Vow",
      "Guest arrival ambiance — the tone is set before anyone sits down",
      "Cocktail hour piano — seamless transition, no gaps",
      "Repertoire shaped to your story and your guests",
      "Extended presence through the golden hour",
    ],
    note: "Upgrade to The Story until 2 weeks prior — no penalty, no questions.",
    featured: true,
  },
  {
    name: "The Story",
    price: "$1,200",
    duration: "Full day",
    headline: "Your complete musical witness.",
    description: "From the first guest arriving to the last glass raised. I stay as long as the music matters. Volume shifts with the energy. Repertoire breathes with the room. Your day, not mine.",
    features: [
      "Everything in The Hour",
      "Dinner ambiance — music that lets conversation breathe",
      "Volume shaped to every phase of your evening",
      "Multi-space venue coordination",
      "One-hour transition buffer between locations",
    ],
    note: "Designed for all-in-one venues. Includes transition and relocation time.",
    featured: false,
  },
];

const addons = [
  { title: "Custom Song Request", price: "$75–$150", desc: "A song outside my standard repertoire, learned and rehearsed. Request at least 8 weeks prior." },
  { title: "Short-Notice Booking", price: "+$250",   desc: "For ceremonies booked within 8 weeks. Covers accelerated preparation and plan coordination." },
  { title: "Travel Fee",           price: "Quoted per km", desc: "Applies to venues outside the Calgary–Cochrane–Canmore corridor. No fee within 50 km of Cochrane." },
];

const comparison = [
  { feature: "Vow clarity",              parker: true,  dj: "partial", band: false     },
  { feature: "Silent power",             parker: true,  dj: false,     band: "partial" },
  { feature: "Volume verification",      parker: true,  dj: false,     band: false     },
  { feature: "Refund policy",            parker: true,  dj: false,     band: false     },
  { feature: "Cue sheet collaboration",  parker: true,  dj: false,     band: false     },
  { feature: "Backup systems",           parker: true,  dj: "partial", band: "partial" },
];

const testimonials = [
  { quote: "He played the song I walked down the aisle to — and I forgot there were a hundred people watching.", author: "Sarah & James",  location: "Priddis",                 tier: "The Vow"  },
  { quote: "Our guests still talk about the music. Not the food. Not the flowers. The music.",                   author: "Emily & David", location: "The Lake House, Calgary", tier: "The Hour" },
];

const faqs = [
  { q: "Can I start with The Vow and upgrade later?",                  a: "Yes — upgrade up to 2 weeks before your event. I will adjust your plan and invoice seamlessly. No penalty." },
  { q: "Is my deposit refundable?",                                    a: "Fully refundable for 14 days. After that, it converts to transferable credit. Full policy and timelines documented on your agreement." },
  { q: "What if I need to cancel?",                                    a: "Your credit can be transferred to a new date or used toward a referred musician. Clear percentages by notice window are in the contract." },
  { q: "How does a ceremony pianist compare to a DJ?",                 a: "The simplest question to ask any alternative: how do they ensure your outdoor vows are heard clearly and quietly? That is where the difference begins." },
  { q: "Do you bring your own piano?",                                 a: "Yes — a full 88-key instrument, battery-powered, with backup. If your venue has an acoustic piano that meets the standard, I will use that instead." },
];

function CompIcon({ value }: { value: boolean | string }) {
  if (value === true)      return <span className="inline-block w-[7px] h-[7px] rounded-full bg-[hsl(var(--rich-black))]" />;
  if (value === "partial") return <span className="text-[hsl(var(--pricing-fg-tertiary))] text-sm">·</span>;
  return <span className="text-sm" style={{ color: "hsl(var(--pricing-fg-tertiary))", opacity: 0.3 }}>—</span>;
}

export default function Pricing() {
  usePageTheme();
  useEffect(() => {
    document.title = "The Offering — Parker Gawryletz, Ceremony Piano";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Three presences — ceremony, extended, or full-day. Transparent pricing with triple redundancy and months of devoted preparation.");
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main id="main-content">

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <section
          id="p-hero"
          className="piano-section-target sub-pad"
          style={{ paddingTop: "clamp(96px, 13vw, 160px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}
        >
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Wedding Ceremony Piano</p>
            <h1
              className="font-display font-semibold leading-[1.02] tracking-[-0.038em] mt-4"
              style={{ fontSize: "clamp(52px, 8vw, 96px)", maxWidth: "13ch" }}
            >
              You already know.
            </h1>
            <p
              className="font-sans leading-[1.7] mt-8"
              style={{ fontSize: "clamp(16px, 1.5vw, 19px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}
            >
              The only question left is how long you want me there. Every path below includes the same months of devoted preparation — only the hours change.
            </p>
          </RevealOnScroll>
        </section>

        {/* ══ HERO IMAGE ════════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--hero">
          <img src={witnessCeremony} alt="Grand piano at an outdoor mountain ceremony" loading="eager" />
        </div>

        {/* ══ INCLUSIONS — dark full-bleed band ═════════════════════ */}
        <section id="p-included" className="piano-section-target sub-dark">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Included in every path</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-3"
                style={{ fontSize: "clamp(26px, 3.2vw, 42px)", color: "hsl(40 20% 96%)", maxWidth: "24ch" }}
              >
                The same devoted preparation.
              </h2>
            </RevealOnScroll>
            <div className="mt-14 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {inclusions.map((item, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 40}>
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-6">
                    <p className="font-sans text-[15px] font-semibold" style={{ color: "hsl(40 20% 96%)" }}>{item.label}</p>
                    <p className="font-sans text-[14px] leading-[1.7]" style={{ color: "hsl(0 0% 100% / 0.50)" }}>{item.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ══ THREE PATHS ════════════════════════════════════════════ */}
        <section id="p-tiers" className="piano-section-target sub-pad sub-section">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)", maxWidth: "18ch" }}
            >
              Three ways to be present.
            </h2>
            <p className="font-sans text-[15px] mt-3" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              The only difference is how long I stay.
            </p>
          </RevealOnScroll>

          <div className="space-y-0 divide-y divide-[hsl(36_16%_90%)] mt-14">
            {tiers.map((tier, i) => (
              <RevealOnScroll key={i} variant="up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 py-12 items-start">
                  <div>
                    {tier.featured && (
                      <div className="pricing-pill mb-4">
                        <span className="pricing-pill__dot" />
                        Most chosen
                      </div>
                    )}
                    <p
                      className="font-sans font-medium uppercase tracking-[0.08em]"
                      style={{ fontSize: "11px", color: "hsl(var(--pricing-fg-tertiary))" }}
                    >
                      {tier.duration}
                    </p>
                    <h3
                      className="font-display font-semibold tracking-[-0.03em] mt-1"
                      style={{ fontSize: "clamp(32px, 4vw, 50px)" }}
                    >
                      {tier.name}
                    </h3>
                    <div className="pricing-amount mt-2">{tier.price}</div>
                    <p className="font-sans text-[14px] mt-2" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{tier.headline}</p>
                    <div className="mt-7">
                      <Link to="/contact" className="pricing-cta">Reserve My Date</Link>
                    </div>
                    <p className="font-sans text-[12px] mt-4 leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
                      {tier.note}
                    </p>
                  </div>
                  <div className={tier.featured ? "md:border-l md:pl-10" : ""} style={tier.featured ? { borderColor: "hsl(var(--pricing-border))" } : undefined}>
                    <p className="font-sans text-[15px] leading-[1.75] mb-7" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {tier.description}
                    </p>
                    <ul className="space-y-3">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="pricing-diamond" />
                          <span className="font-sans text-[14px] leading-[1.6]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <p className="font-sans text-[12px] mt-8" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
            Amounts shown before GST. Written payment acknowledgements within two business days.
          </p>
        </section>

        {/* ══ EDITORIAL IMAGE ════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={handsKeys} alt="Pianist's hands on keys during a ceremony" loading="lazy" />
        </div>

        {/* ══ ENHANCEMENTS ══════════════════════════════════════════ */}
        <section id="p-addons" className="piano-section-target sub-pad sub-section">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em]"
              style={{ fontSize: "clamp(26px, 3.2vw, 40px)" }}
            >
              Enhancements.
            </h2>
            <p className="font-sans text-[15px] mt-3 mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
              Optional — each quoted transparently before you commit.
            </p>
          </RevealOnScroll>
          <div className="divide-y divide-[hsl(36_16%_90%)]">
            {addons.map((addon, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 60}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_1.5fr] gap-1 md:gap-8 py-7 items-baseline">
                  <h3 className="font-sans text-[15px] font-semibold">{addon.title}</h3>
                  <p className="font-sans text-[15px] font-semibold">{addon.price}</p>
                  <p className="font-sans text-[14px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{addon.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <p className="font-sans text-[13px] mt-8" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
            You will never see a surprise fee.
          </p>
        </section>

        {/* ══ GALLERY IMAGE ══════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={gallerySetup} alt="Setup before guests arrive" loading="lazy" />
        </div>

        {/* ══ COMPARISON — warm band ════════════════════════════════ */}
        <section id="p-compare" className="piano-section-target sub-warm">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <h2
                className="font-display font-semibold tracking-[-0.025em] mb-12"
                style={{ fontSize: "clamp(26px, 3.2vw, 40px)" }}
              >
                Why a ceremony pianist.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll variant="up">
              <div className="overflow-x-auto">
                <table className="pricing-comparison w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Feature</th>
                      <th className="text-center">DJ<br /><span className="font-normal text-[10px]">$1,500–$2,000</span></th>
                      <th className="text-center">Band<br /><span className="font-normal text-[10px]">$3,500–$6,000</span></th>
                      <th className="text-center">Parker<br /><span className="font-normal text-[10px]">$650–$1,200</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i}>
                        <td className="font-sans font-medium text-[14px]">{row.feature}</td>
                        <td className="text-center"><CompIcon value={row.dj}     /></td>
                        <td className="text-center"><CompIcon value={row.band}   /></td>
                        <td className="text-center"><CompIcon value={row.parker} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-12 pt-8" style={{ borderTop: "1px solid hsl(36 16% 90%)" }}>
                <p
                  className="font-display italic leading-[1.5]"
                  style={{ fontSize: "clamp(18px, 2.2vw, 26px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "52ch" }}
                >
                  I am not entertainment. I am the person who ensures every word of your vows is heard — clearly, naturally, and without a single visible microphone.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ══ KIND WORDS ════════════════════════════════════════════ */}
        <section id="p-words" className="piano-section-target sub-pad sub-section">
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
                    — {t.author} · {t.location} · {t.tier}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ══ FAQ ════════════════════════════════════════════════════ */}
        <section id="p-questions" className="piano-section-target sub-dark">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <h2
                className="font-display font-semibold tracking-[-0.025em]"
                style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: "hsl(40 20% 96%)" }}
              >
                Questions.
              </h2>
              <p className="font-sans text-[15px] mt-3 mb-12" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
                Clarity before commitment.
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="up">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    style={{ borderColor: "hsl(0 0% 100% / 0.10)" }}
                  >
                    <AccordionTrigger
                      className="text-left font-sans text-[15px] font-semibold hover:no-underline py-5"
                      style={{ color: "hsl(40 20% 96%)" }}
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="font-sans text-[14px] leading-[1.75] pb-5"
                      style={{ color: "hsl(0 0% 100% / 0.50)" }}
                    >
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </RevealOnScroll>
          </div>
        </section>

        {/* ══ CEREMONY IMAGE ════════════════════════════════════════ */}
        <div className="pricing-image pricing-image--wide">
          <img src={vowAltar} alt="Candlelit ceremony aisle" loading="lazy" />
        </div>

        {/* ══ CTA — dark band ════════════════════════════════════════ */}
        <section id="p-cta" className="piano-section-target sub-dark">
          <div className="sub-pad" style={{ paddingTop: "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)" }}>
            <RevealOnScroll variant="up">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
                <h2
                  className="font-display font-semibold tracking-[-0.03em] leading-[1.07]"
                  style={{ fontSize: "clamp(34px, 5vw, 64px)", color: "hsl(40 20% 96%)", maxWidth: "14ch" }}
                >
                  Your date is not held until it is held.
                </h2>
                <div className="md:pt-2">
                  <p
                    className="font-sans leading-[1.7]"
                    style={{ fontSize: "15px", color: "hsl(0 0% 100% / 0.50)", maxWidth: "40ch" }}
                  >
                    Tell me about your ceremony — the venue, the feeling, the moments that matter most. I will respond within 24 hours with a personalized plan built around your day.
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
