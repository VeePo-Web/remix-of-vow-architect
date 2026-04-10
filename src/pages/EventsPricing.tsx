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

import ballroomGrand from "@/assets/events-ballroom-grand.jpg";
import handsKeys from "@/assets/hands-keys-closeup.jpg";

const sections = [
  { id: "ep-hero",       label: "The Offering",    isBlackKey: false },
  { id: "ep-included",   label: "What You Get",    isBlackKey: true  },
  { id: "ep-presences",  label: "Presences",       isBlackKey: false },
  { id: "ep-compare",    label: "Why Live Piano",  isBlackKey: true  },
  { id: "ep-questions",  label: "Questions",       isBlackKey: false },
  { id: "ep-cta",        label: "Message Me",      isBlackKey: true  },
];

const inclusions = [
  { label: "Pre-event consultation", desc: "I learn the occasion, the venue, and the atmosphere you envision — before I play a single note." },
  { label: "Repertoire curation", desc: "A custom setlist shaped by your preferences, your guests, and the energy of the room. Never generic. Never repeated." },
  { label: "Silent arrival and setup", desc: "I arrive before your first guest and disappear into the space. Zero footprint. Zero direction needed." },
  { label: "Real-time room-reading", desc: "Volume, tempo, and repertoire shift with the energy of the room — never against it. This is what separates live piano from a playlist." },
  { label: "My own instrument", desc: "Full 88-key piano, battery-powered. If you need me invisible, I have a black curtain for exactly that." },
  { label: "$4M insurance coverage", desc: "Comprehensive liability and equipment coverage. Documentation provided to your venue coordinator in advance." },
];

const presences = [
  {
    name: "The Moment",
    duration: "1 hour",
    headline: "The part that matters most.",
    description: "Focused, intentional piano for a toast, a dinner course, a quiet hour of arrival. One hour of presence that changes the feel of the entire evening. Sometimes that is all you need.",
    featured: false,
    align: "left" as const,
  },
  {
    name: "The Evening",
    duration: "2–3 hours",
    headline: "Most chosen by hosts.",
    description: "Full coverage from arrival through dinner. Repertoire shifts with the energy of the room — never the same song twice in the same way. The host stops worrying about the music and starts being a guest at their own event.",
    featured: true,
    align: "right" as const,
  },
  {
    name: "The Full Occasion",
    duration: "4+ hours",
    headline: "Complete musical direction.",
    description: "For galas, receptions, and multi-space gatherings. I stay as long as the music matters. Volume, tempo, and repertoire adapt to every phase of your evening — from arrival through the last glass raised.",
    featured: false,
    align: "left" as const,
  },
];

const comparison = [
  { feature: "Room-reading",          parker: true,  playlist: false,     dj: "partial", band: "partial" },
  { feature: "Volume sensitivity",    parker: true,  playlist: false,     dj: "partial", band: false     },
  { feature: "Setup footprint",       parker: true,  playlist: true,      dj: "partial", band: false     },
  { feature: "Conversation-friendly", parker: true,  playlist: "partial", dj: false,     band: false     },
  { feature: "Repertoire depth",      parker: true,  playlist: true,      dj: true,      band: "partial" },
  { feature: "Live presence",         parker: true,  playlist: false,     dj: false,     band: true      },
  { feature: "Adaptive energy",       parker: true,  playlist: false,     dj: "partial", band: "partial" },
];

const faqs = [
  {
    q: "Do you bring your own piano?",
    a: "I perform on acoustic pianos when available at your venue. If one is not available, I bring a premium digital instrument that fits any space — quiet enough for intimate dinners, rich enough for grand rooms.",
  },
  {
    q: "Can you learn a specific song?",
    a: "Yes. If it can be played on piano, I will learn it. I ask for requests at least two weeks before the event to ensure the arrangement meets the standard you deserve.",
  },
  {
    q: "What if the event runs longer than planned?",
    a: "I stay. Extended time is billed at a clear hourly rate, agreed in advance. No surprises, no awkward negotiations on the night.",
  },
  {
    q: "Do you take breaks?",
    a: "For presences over two hours, I take a brief pause — timed to coincide with a natural transition in your event. The music fades out and returns without disruption.",
  },
  {
    q: "Are you insured?",
    a: "Yes — comprehensive commercial general liability insurance. Documentation is available upon request and included with every proposal.",
  },
];

function CompIcon({ value }: { value: boolean | string }) {
  if (value === true) return (
    <span className="inline-block w-[7px] h-[7px] rounded-full bg-[hsl(var(--rich-black))]" />
  );
  if (value === "partial") return <span className="text-sm" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>·</span>;
  return <span className="text-sm" style={{ color: "hsl(var(--pricing-fg-tertiary))", opacity: 0.3 }}>—</span>;
}

export default function EventsPricing() {
  usePageTheme();
  useEffect(() => {
    document.title = "The Offering — Events Piano | Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Three presences — not packages. Duration-based live piano for corporate events, private dinners, and celebrations.");
  }, []);

  return (
    <div className="min-h-screen pricing-page">
      <PricingNav />
      <PianoKeyNav sections={sections} />

      <main className="max-w-[980px] mx-auto px-6 md:px-8">

        {/* ═══ HERO ═══ */}
        <section id="ep-hero" className="piano-section-target pt-36 md:pt-48 pb-20">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Live Events Piano</p>
            <h1 className="font-display text-[clamp(48px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.035em] mt-4" style={{ maxWidth: "16ch" }}>
              How long do you need the music?
            </h1>
            <p className="font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] mt-8" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}>
              Three presences — not packages. The only difference is how long I stay. Every event is quoted individually after we talk.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <RevealOnScroll variant="up">
          <div className="pricing-image pricing-image--hero mb-0">
            <img src={ballroomGrand} alt="Grand piano in a candlelit ballroom" loading="eager" />
          </div>
        </RevealOnScroll>

        {/* ═══ WHAT EVERY PRESENCE INCLUDES ═══ */}
        <section id="ep-included" className="pricing-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">The baseline</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "20ch" }}>
              What every presence includes.
            </h2>
          </RevealOnScroll>

          <div className="mt-14 divide-y divide-[hsl(36_16%_90%)]">
            {inclusions.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-10 py-6">
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ THREE PRESENCES ═══ */}
        <section id="ep-presences" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="mb-20">
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.025em]" style={{ maxWidth: "18ch" }}>
                Three ways to be present.
              </h2>
              <p className="font-sans text-[15px] mt-4" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                The only difference is how long I stay.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-32">
            {presences.map((p, i) => (
              <RevealOnScroll key={i} variant={p.align === 'right' ? 'right' : 'left'}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start ${p.align === 'right' ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>
                  <div>
                    {p.featured && (
                      <div className="pricing-pill mb-5">
                        <span className="pricing-pill__dot" />
                        Most chosen
                      </div>
                    )}
                    <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{p.duration}</p>
                    <h3 className="font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.03em] mt-1">{p.name}</h3>
                    <p className="font-sans text-[15px] mt-2" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>{p.headline}</p>
                    <div className="mt-7">
                      <Link to="/events/contact" className="pricing-cta">
                        Message Me
                      </Link>
                    </div>
                  </div>

                  <div className={`pt-1 ${p.featured ? 'md:border-l md:pl-10' : ''}`} style={p.featured ? { borderColor: "hsl(var(--pricing-border))" } : undefined}>
                    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-24 py-8" style={{ borderTop: "1px solid hsl(36 16% 90%)" }}>
            <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "48ch" }}>
              Private dinners start at <span className="font-semibold" style={{ color: "hsl(var(--rich-black))" }}>$300</span>. Everything else depends on the evening you are building.
            </p>
            <p className="text-[13px] mt-3" style={{ color: "hsl(var(--pricing-fg-tertiary))" }}>
              After our conversation, I provide a clear quote — no surprises.
            </p>
          </div>
        </section>

        {/* ═══ COMPARISON ═══ */}
        <section id="ep-compare" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-12">
              Why live piano.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll variant="up">
            <div className="overflow-x-auto -mx-2">
              <table className="pricing-comparison w-full">
                <thead>
                  <tr>
                    <th className="text-left">Feature</th>
                    <th className="text-center">Playlist</th>
                    <th className="text-center">DJ</th>
                    <th className="text-center">Band</th>
                    <th className="text-center">Parker</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i}>
                      <td className="font-sans font-medium text-[14px]">{row.feature}</td>
                      <td className="text-center"><CompIcon value={row.playlist} /></td>
                      <td className="text-center"><CompIcon value={row.dj} /></td>
                      <td className="text-center"><CompIcon value={row.band} /></td>
                      <td className="text-center"><CompIcon value={row.parker} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══ EDITORIAL IMAGE ═══ */}
        <div className="py-20">
          <RevealOnScroll variant="up">
            <div className="pricing-image pricing-image--cinematic">
              <img src={handsKeys} alt="Hands on piano keys" loading="lazy" />
            </div>
          </RevealOnScroll>
        </div>

        {/* ═══ FAQ ═══ */}
        <section id="ep-questions" className="pricing-section piano-section-target">
          <div className="pricing-section__divider" />

          <div className="max-w-[680px]">
            <RevealOnScroll variant="up">
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.025em] mb-3">
                Questions.
              </h2>
              <p className="font-sans text-[15px] mb-12" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>
                Clarity before commitment.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
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

        {/* ═══ FINAL CTA ═══ */}
        <section id="ep-cta" className="pricing-section piano-section-target pb-36">
          <div className="pricing-section__divider" />

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1]" style={{ maxWidth: "14ch" }}>
                  Tell me about your evening.
                </h2>
              </div>
              <div className="md:pt-3">
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))", maxWidth: "38ch" }}>
                  The venue, the guests, the feeling you want in the room. I will respond within 24 hours with a clear quote and a custom setlist direction — tailored entirely to your event.
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
