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

import eventsStageWarmlight from "@/assets/events-stage-warmlight.png";
import eventsStageMotion from "@/assets/events-stage-motion.png";
import eventsNordOverhead from "@/assets/events-nord-overhead.png";
import martinAnitaRoom from "@/assets/martin-anita-room.png";
import martinAnitaPerformance from "@/assets/martin-anita-performance.png";
import martinAnitaCouple from "@/assets/martin-anita-couple.png";
import martinAnitaGroup from "@/assets/martin-anita-group.png";

const sections = [
  { id: "ep-hero",      label: "The Offering",   isBlackKey: false },
  { id: "ep-included",  label: "What You Get",   isBlackKey: true  },
  { id: "ep-presences", label: "Presences",      isBlackKey: false },
  { id: "ep-casestudy", label: "An Evening",     isBlackKey: true  },
  { id: "ep-compare",   label: "Why Live Piano", isBlackKey: false },
  { id: "ep-questions", label: "Questions",      isBlackKey: true  },
  { id: "ep-cta",       label: "Message Me",     isBlackKey: false },
];

const inclusions = [
  { label: "Pre-event consultation",  desc: "I learn the occasion, the venue, and the atmosphere you envision — before I play a single note." },
  { label: "Repertoire curation",     desc: "A custom setlist shaped by your preferences, your guests, and the energy of the room. Never generic. Never repeated." },
  { label: "Silent arrival & setup",  desc: "I arrive before your first guest and disappear into the space. Zero footprint. Zero direction needed." },
  { label: "Real-time room-reading",  desc: "Volume, tempo, and repertoire shift with the energy of the room — never against it. This is what separates live piano from a playlist." },
  { label: "My own instrument",       desc: "Full 88-key piano, battery-powered. If you need me invisible, I have a black curtain for exactly that." },
  { label: "$4M insurance coverage",  desc: "Comprehensive liability and equipment coverage. Documentation provided to your venue coordinator in advance." },
];

const presences = [
  { name: "The Moment",       duration: "1 hour",    headline: "The part that matters most.",  description: "Focused, intentional piano for a toast, a dinner course, a quiet hour of arrival. One hour of presence that changes the feel of the entire evening. Sometimes that is all you need.", featured: false },
  { name: "The Evening",      duration: "2–3 hours", headline: "Most chosen by hosts.",         description: "Full coverage from arrival through dinner. Repertoire shifts with the energy of the room — never the same song twice in the same way. The host stops worrying about the music and starts being a guest at their own event.", featured: true  },
  { name: "The Full Occasion",duration: "4+ hours",  headline: "Complete musical direction.",   description: "For galas, receptions, and multi-space gatherings. I stay as long as the music matters. Volume, tempo, and repertoire adapt to every phase of your evening — from arrival through the last glass raised.", featured: false },
];

const comparison = [
  { feature: "Room-reading",           parker: true, playlist: false,     dj: "partial", band: "partial" },
  { feature: "Volume sensitivity",     parker: true, playlist: false,     dj: "partial", band: false     },
  { feature: "Setup footprint",        parker: true, playlist: true,      dj: "partial", band: false     },
  { feature: "Conversation-friendly",  parker: true, playlist: "partial", dj: false,     band: false     },
  { feature: "Repertoire depth",       parker: true, playlist: true,      dj: true,      band: "partial" },
  { feature: "Live presence",          parker: true, playlist: false,     dj: false,     band: true      },
  { feature: "Adaptive energy",        parker: true, playlist: false,     dj: "partial", band: "partial" },
];

const faqs = [
  { q: "Do you bring your own piano?",                   a: "I perform on acoustic pianos when available at your venue. If one is not available, I bring a premium digital instrument that fits any space — quiet enough for intimate dinners, rich enough for grand rooms." },
  { q: "Can you learn a specific song?",                 a: "Yes. If it can be played on piano, I will learn it. I ask for requests at least two weeks before the event to ensure the arrangement meets the standard you deserve." },
  { q: "What if the event runs longer than planned?",    a: "I stay. Extended time is billed at a clear hourly rate, agreed in advance. No surprises, no awkward negotiations on the night." },
  { q: "Do you take breaks?",                            a: "For presences over two hours, I take a brief pause — timed to coincide with a natural transition in your event. The music fades out and returns without disruption." },
  { q: "Are you insured?",                               a: "Yes — comprehensive commercial general liability insurance. Documentation is available upon request and included with every proposal." },
];

function CompIcon({ value }: { value: boolean | string }) {
  if (value === true) return <span className="inline-block w-[7px] h-[7px] rounded-full bg-[hsl(var(--rich-black))]" />;
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

      <main>

        {/* ═══ HERO ═══ */}
        <section id="ep-hero" className="sub-pad sub-section piano-section-target pt-20 md:pt-28">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">Live Events Piano</p>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] mt-4"
              style={{ fontSize: "clamp(48px,7vw,80px)", maxWidth: "16ch" }}
            >
              How long do you need the music?
            </h1>
            <p
              className="font-sans leading-[1.6] mt-8"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "hsl(var(--pricing-fg-secondary))", maxWidth: "42ch" }}
            >
              Three presences — not packages. The only difference is how long I stay. Every event is quoted individually after we talk.
            </p>
          </RevealOnScroll>
        </section>

        {/* ═══ HERO IMAGE ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img src={eventsStageWarmlight} alt="Parker performing at a live event under warm amber stage lighting" loading="eager" style={{ objectPosition: "center 30%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ WHAT EVERY PRESENCE INCLUDES ═══ */}
        <section id="ep-included" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <p className="pricing-eyebrow">The baseline</p>
            <h2
              className="font-display font-semibold tracking-[-0.025em] mt-4"
              style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "20ch" }}
            >
              What every presence includes.
            </h2>
          </RevealOnScroll>

          <div className="mt-14 divide-y" style={{ borderColor: "hsl(36 16% 90%)" }}>
            {inclusions.map((item, i) => (
              <RevealOnScroll key={i} variant="up" delay={i * 50}>
                <div
                  className="grid py-6 mobile-stack"
                  style={{ gridTemplateColumns: "clamp(160px,18vw,220px) 1fr", gap: "clamp(16px,4vw,48px)" }}
                >
                  <p className="font-sans text-[15px] font-semibold leading-[1.5]">{item.label}</p>
                  <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(var(--pricing-fg-secondary))" }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══ CINEMATIC BREAK ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={eventsStageMotion} alt="Parker performing on stage with dynamic motion and blue stage lighting" loading="lazy" style={{ objectPosition: "center 40%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ THREE PRESENCES — dark band ═══ */}
        <section id="ep-presences" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow">Three ways to be present.</p>
              <h2
                className="font-display font-semibold tracking-[-0.025em] mt-4"
                style={{ fontSize: "clamp(28px,3.5vw,44px)", maxWidth: "18ch", color: "hsl(0 0% 100% / 0.94)" }}
              >
                The only difference is how long I stay.
              </h2>
            </RevealOnScroll>

            <div className="mt-16 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
              {presences.map((p, i) => (
                <RevealOnScroll key={i} variant="up" delay={i * 80}>
                  <div className="py-12">
                    {p.featured && (
                      <div
                        className="mb-5"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "4px 14px", border: "1px solid hsl(0 0% 100% / 0.15)",
                          borderRadius: "100px",
                        }}
                      >
                        <span style={{ width: "5px", height: "5px", background: "hsl(var(--vow-yellow))", borderRadius: "50%", flexShrink: 0 }} />
                        <span className="font-sans text-[12px] font-medium" style={{ letterSpacing: "0.04em", color: "hsl(0 0% 100% / 0.65)" }}>Most chosen</span>
                      </div>
                    )}
                    <div
                      className="grid items-start mobile-stack"
                      style={{ gridTemplateColumns: "clamp(160px,22vw,280px) 1fr", gap: "clamp(20px,5vw,60px)" }}
                    >
                      <div>
                        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: "hsl(0 0% 100% / 0.30)" }}>{p.duration}</p>
                        <h3
                          className="font-display font-semibold tracking-[-0.03em] mt-2 leading-[1.1]"
                          style={{ fontSize: "clamp(28px,3.5vw,44px)", color: "hsl(0 0% 100% / 0.94)" }}
                        >
                          {p.name}
                        </h3>
                        <p className="font-sans text-[13px] mt-2" style={{ color: "hsl(0 0% 100% / 0.35)" }}>{p.headline}</p>
                      </div>
                      <div className="pt-1">
                        <p className="font-sans text-[15px] leading-[1.75]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="up">
              <div className="mt-14 pt-10" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.08)" }}>
                <p className="font-sans text-[15px] leading-[1.7]" style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "48ch" }}>
                  Private dinners start at <span className="font-semibold" style={{ color: "hsl(0 0% 100% / 0.88)" }}>$300</span>. Everything else depends on the evening you are building.
                </p>
                <p className="font-sans text-[13px] mt-3" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                  After our conversation, I provide a clear quote — no surprises.
                </p>
              </div>
            </RevealOnScroll>

          </div>
        </section>

        {/* ═══ MARTIN & ANITA ROOM — full-bleed ═══ */}
        <div className="pricing-image pricing-image--hero">
          <img
            src={martinAnitaRoom}
            alt="The living room set for the evening — piano positioned before floor-to-ceiling windows, white roses beside the keys, candles burning"
            loading="lazy"
            style={{ objectPosition: "center 50%" }}
          />
        </div>

        {/* ═══ CASE STUDY: MARTIN & ANITA — dark band ═══ */}
        <section id="ep-casestudy" className="sub-dark piano-section-target">
          <div className="sub-pad sub-section">

            <RevealOnScroll variant="up">
              <p className="pricing-eyebrow" style={{ color: "hsl(var(--vow-yellow) / 0.55)" }}>
                Private residence &nbsp;·&nbsp; Calgary &nbsp;·&nbsp; A January evening
              </p>
              <h2
                className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mt-5"
                style={{ fontSize: "clamp(34px,5vw,60px)", maxWidth: "13ch", color: "hsl(0 0% 100% / 0.94)" }}
              >
                She planned it for months.
              </h2>
              <p
                className="font-display italic font-light mt-3"
                style={{ fontSize: "clamp(22px,3.2vw,40px)", color: "hsl(0 0% 100% / 0.45)", letterSpacing: "-0.015em" }}
              >
                He had no idea.
              </p>
            </RevealOnScroll>

            {/* Act I — prose + performance image */}
            <div
              className="grid items-start mt-20 mobile-col-stack"
              style={{ gridTemplateColumns: "1.15fr 1fr", gap: "clamp(40px,8vw,100px)" }}
            >
              <RevealOnScroll variant="left">
                <div>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] mb-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                    The arrangement
                  </p>
                  <div className="space-y-5">
                    <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                      Anita had been planning it for months. The personal chef. The flowers — white roses, arranged beside the piano. The candles, already burning before Martin came home. And the pianist, already seated, already playing.
                    </p>
                    <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                      That last detail was the one he didn't know about.
                    </p>
                    <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                      Parker arrived early, set up without direction, and disappeared into the space — the way a good presence always does. By the time the first guest arrived, the music was simply part of the room.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="right">
                <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "3/4" }}>
                  <img
                    src={martinAnitaPerformance}
                    alt="Parker at the piano — floor-to-ceiling windows behind him, winter evening outside, candles flanking the keys"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
                  />
                </div>
              </RevealOnScroll>
            </div>

            {/* Act II — The Evening */}
            <RevealOnScroll variant="up">
              <div
                className="mt-20"
                style={{ borderLeft: "2px solid hsl(var(--vow-yellow) / 0.18)", paddingLeft: "28px", maxWidth: "52ch" }}
              >
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] mb-5" style={{ color: "hsl(0 0% 100% / 0.28)" }}>
                  The evening
                </p>
                <div className="space-y-5">
                  <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                    Outside: a January night. Deep winter. The kind of cold that makes a lit room feel like shelter. Through the floor-to-ceiling windows, the snow was still.
                  </p>
                  <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                    Inside, the dinner moved through its courses. And the music moved with it — softening when the conversation deepened, lifting quietly when the room called for it. Not filling the silence. Holding it.
                  </p>
                  <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "hsl(0 0% 100% / 0.52)" }}>
                    That is the difference between a playlist and a presence. A playlist continues regardless of what happens in the room. A live musician hears when the conversation pauses, and plays more quietly. He reads the room the way a good host reads his guests — anticipating what is needed before it is asked.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Act III — staccato poem */}
            <RevealOnScroll variant="up">
              <div className="mt-24" style={{ maxWidth: "36ch", margin: "96px auto 0", textAlign: "center" }}>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.17em] mb-10" style={{ color: "hsl(var(--vow-yellow) / 0.40)" }}>
                  The moment
                </p>

                {["The dinner had ended.", "The chef had gone.", "The candles had burned low."].map((line, i) => (
                  <p key={i} className="font-display italic mb-2" style={{ fontSize: "clamp(17px,1.9vw,21px)", lineHeight: 1.3, color: "hsl(40 12% 78% / 0.52)" }}>
                    {line}
                  </p>
                ))}

                <div style={{ height: "32px" }} />
                <p className="font-display italic" style={{ fontSize: "clamp(20px,2.4vw,26px)", lineHeight: 1.3, color: "hsl(40 15% 84%)" }}>
                  Anita asked for one more song.
                </p>
                <div style={{ height: "36px" }} />
                <p className="font-display italic" style={{ fontSize: "clamp(26px,3.5vw,44px)", lineHeight: 1.2, color: "hsl(var(--vow-yellow))", letterSpacing: "-0.01em" }}>
                  Their wedding song.
                </p>
                <div style={{ height: "36px" }} />
                <p className="font-display italic" style={{ fontSize: "clamp(18px,2.1vw,24px)", lineHeight: 1.45, color: "hsl(40 12% 72%)" }}>
                  In their own living room, on an ordinary January night,<br />
                  Martin and Anita danced.
                </p>
              </div>
            </RevealOnScroll>

            {/* Testimonial letter */}
            <RevealOnScroll variant="up">
              <div className="mt-24">
                <div aria-hidden="true" className="flex items-center gap-4 mb-16" style={{ maxWidth: "280px" }}>
                  <div style={{ flex: 1, height: "1px", background: "hsl(var(--vow-yellow) / 0.14)" }} />
                  <div style={{ width: "5px", height: "5px", background: "hsl(var(--vow-yellow) / 0.45)", transform: "rotate(45deg)", flexShrink: 0 }} />
                  <div style={{ flex: 1, height: "1px", background: "hsl(var(--vow-yellow) / 0.14)" }} />
                </div>

                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.10em] mb-8" style={{ color: "hsl(40 10% 44%)" }}>
                  Anita wrote to us the following week
                </p>

                <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "120px", lineHeight: 0.75, color: "hsl(var(--vow-yellow) / 0.14)", userSelect: "none", marginBottom: "24px", marginLeft: "-8px" }}>
                  &ldquo;
                </div>

                <div className="space-y-7" style={{ maxWidth: "58ch" }}>
                  <p className="font-display italic leading-[1.75]" style={{ fontSize: "clamp(17px,1.9vw,21px)", color: "hsl(40 12% 72%)" }}>
                    I was incredibly fortunate to have Gawryletz Piano Service perform for a very special evening at my home. I arranged a private session as part of a surprise romantic dinner for my husband, complete with a personal chef and live piano music from Gawryletz. His gentle, expressive playing created the perfect atmosphere and truly elevated the entire experience.
                  </p>
                  <p className="font-display italic leading-[1.75]" style={{ fontSize: "clamp(18px,2.1vw,23px)", color: "hsl(40 14% 82%)" }}>
                    He performed beautifully throughout the dinner, and with a last&#8209;minute request, he even played our wedding song so we could share a dance at the end of the night. It was a picture&#8209;perfect moment — one we'll never forget.
                  </p>
                  <p className="font-display italic leading-[1.75]" style={{ fontSize: "clamp(17px,1.9vw,21px)", color: "hsl(40 12% 72%)" }}>
                    I'm deeply grateful for the kindness, professionalism, and remarkable talent of Gawryletz Piano Service. This unforgettable evening simply wouldn't have been the same without him.
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-12 pt-9" style={{ borderTop: "1px solid hsl(var(--vow-yellow) / 0.10)" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1.5px solid hsl(var(--vow-yellow) / 0.28)", boxShadow: "0 0 0 4px hsl(var(--vow-yellow) / 0.06)" }}>
                    <img
                      src={martinAnitaCouple}
                      alt="Martin and Anita"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% 22%" }}
                    />
                  </div>
                  <div>
                    <p className="font-display font-medium leading-[1.2]" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: "hsl(40 16% 86%)", letterSpacing: "-0.01em" }}>
                      Martin &amp; Anita
                    </p>
                    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.11em] mt-2" style={{ color: "hsl(40 8% 42%)" }}>
                      Private dinner &middot; Calgary
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </section>

        {/* ═══ GROUP PHOTO ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img
            src={martinAnitaGroup}
            alt="Parker with Martin, Anita, and family at the end of the evening — everyone smiling"
            loading="lazy"
            style={{ objectPosition: "center 28%" }}
          />
        </div>

        {/* ═══ COMPARISON — warm band ═══ */}
        <section id="ep-compare" className="sub-warm piano-section-target">
          <div className="sub-pad sub-section">
            <RevealOnScroll variant="up">
              <h2
                className="font-display font-semibold tracking-[-0.025em] mb-12"
                style={{ fontSize: "clamp(28px,3.5vw,40px)" }}
              >
                Why live piano.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll variant="up">
              <div className="overflow-x-auto">
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

            <RevealOnScroll variant="up">
              <p
                className="sub-pull mt-20"
                style={{ color: "hsl(var(--pricing-fg))", maxWidth: "28ch" }}
              >
                The room you remember is the one where the music knew when to be silent.
              </p>
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] mt-5"
                style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
              >
                Why live piano wins
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══ CINEMATIC BREAK ═══ */}
        <div className="pricing-image pricing-image--cinematic">
          <img src={eventsNordOverhead} alt="Parker at a red Nord piano, overhead view, warm stage lighting" loading="lazy" style={{ objectPosition: "center 40%" }} />
          <span className="parker-credit">Photo: IG @tc.photovideo</span>
        </div>

        {/* ═══ FAQ ═══ */}
        <section id="ep-questions" className="sub-pad sub-section piano-section-target">
          <RevealOnScroll variant="up">
            <h2
              className="font-display font-semibold tracking-[-0.025em] mb-3"
              style={{ fontSize: "clamp(28px,3.5vw,40px)" }}
            >
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
        </section>

        {/* ═══ CTA — dark band ═══ */}
        <section id="ep-cta" className="sub-dark piano-section-target">
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
                    Tell me about your evening.
                  </h2>
                </div>
                <div className="md:pt-3">
                  <p
                    className="font-sans text-[15px] leading-[1.7]"
                    style={{ color: "hsl(0 0% 100% / 0.52)", maxWidth: "38ch" }}
                  >
                    The venue, the guests, the feeling you want in the room. I will respond within 24 hours with a clear quote and a custom setlist direction — tailored entirely to your event.
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
