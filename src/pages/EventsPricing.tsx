import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Button } from "@/components/ui/button";
import { MostSelectedPill } from "@/components/MostSelectedPill";
import { RevealOnScroll, StaggerChildren } from "@/components/animation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";

import heroPianoImg from "@/assets/hero-piano.jpg";

const sections = [
  { id: "ep-hero",        label: "Overview",       isBlackKey: false },
  { id: "ep-inclusions",  label: "Included",       isBlackKey: true  },
  { id: "ep-presences",   label: "Presences",      isBlackKey: false },
  { id: "ep-compare",     label: "Comparison",     isBlackKey: true  },
  { id: "ep-faq",         label: "Questions",      isBlackKey: false },
  { id: "ep-cta",         label: "Get in Touch",   isBlackKey: true  },
];

const inclusions = [
  { label: "Pre-event consultation", description: "I learn the occasion, the venue, and the atmosphere you envision." },
  { label: "Repertoire curation", description: "A playlist shaped by your preferences, your guests, and the energy of the room." },
  { label: "Early arrival and self-sufficient setup", description: "I arrive before your first guest and set up without direction." },
  { label: "Real-time room-reading", description: "Volume, tempo, and repertoire shift with the energy — never against it." },
  { label: "Insured and professional presence", description: "Comprehensive liability coverage and professional conduct, always." },
  { label: "Zero-footprint teardown", description: "I leave no trace but the memory of how the room felt." },
];

const presences = [
  {
    name: "The Moment",
    duration: "1 hour",
    description: "Focused, intentional piano for the part of your event that matters most — a toast, a dinner, a quiet hour of arrival.",
    isSelected: false,
  },
  {
    name: "The Evening",
    duration: "2–3 hours",
    description: "Full coverage from arrival through dinner. Repertoire shifts with the energy of the room — never the same song twice in the same way.",
    isSelected: true,
  },
  {
    name: "The Full Occasion",
    duration: "4+ hours",
    description: "Complete musical direction for extended events — galas, receptions, multi-space gatherings. I stay as long as the music matters.",
    isSelected: false,
  },
];

const comparisonData: { feature: string; me: boolean | "warning"; playlist: boolean | "warning"; dj: boolean | "warning"; band: boolean | "warning" }[] = [
  { feature: "Room-reading",          me: true,  playlist: false,     dj: "warning", band: "warning" },
  { feature: "Volume sensitivity",    me: true,  playlist: false,     dj: "warning", band: false     },
  { feature: "Setup footprint",       me: true,  playlist: true,      dj: "warning", band: false     },
  { feature: "Conversation-friendly", me: true,  playlist: "warning", dj: false,     band: false     },
  { feature: "Repertoire depth",      me: true,  playlist: true,      dj: true,      band: "warning" },
  { feature: "Live presence",         me: true,  playlist: false,     dj: false,     band: true      },
  { feature: "Adaptive energy",       me: true,  playlist: false,     dj: "warning", band: "warning" },
];

const faqs = [
  { question: "Do you bring your own piano?", answer: "I perform on acoustic pianos when available at your venue. If one is not available, I bring a premium digital instrument that fits any space — quiet enough for intimate dinners, rich enough for grand rooms." },
  { question: "Can you learn a specific song?", answer: "Yes. If it can be played on piano, I will learn it. I ask for requests at least two weeks before the event to ensure the arrangement meets the standard you deserve." },
  { question: "What if the event runs longer than planned?", answer: "I stay. Extended time is billed at a clear hourly rate, agreed in advance. No surprises, no awkward negotiations on the night." },
  { question: "Do you take breaks?", answer: "For presences over two hours, I take a brief pause — timed to coincide with a natural transition in your event. The music fades out and returns without disruption." },
  { question: "Are you insured?", answer: "Yes — comprehensive commercial general liability insurance. Documentation is available upon request and included with every proposal." },
];

function ComparisonIcon({ value }: { value: boolean | "warning" }) {
  if (value === true) return (
    <span className="inline-block w-2.5 h-2.5 rotate-45" style={{ background: "hsl(var(--vow-yellow) / 0.8)", boxShadow: "0 0 6px hsl(var(--vow-yellow) / 0.3)" }} aria-label="Included" />
  );
  if (value === "warning") return <span className="text-muted-foreground/70 text-sm" aria-label="Partial">·</span>;
  return <span className="text-muted-foreground/60 text-sm" aria-label="Not included">—</span>;
}

export default function EventsPricing() {
  usePageTheme();
  useEffect(() => {
    document.title = "The Offering — Events Piano | Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Three presences — not packages. Duration-based live piano for corporate events, private dinners, and celebrations.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={sections} />

      <main>
        {/* ── Hero ── */}
        <section id="ep-hero" className="relative section-padding bg-background piano-section-target overflow-hidden" aria-label="Events pricing overview">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${heroPianoImg})`, backgroundSize: "cover", backgroundPosition: "center", maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)", animation: "ken-burns 25s ease-in-out infinite alternate" }} />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)" }} aria-hidden="true" />
          <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)" }} aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-fade-in pt-24">
              <div className="overline mb-2">The Offering</div>
              <h1 className="h1 mx-auto mb-4">How long do you need me there?</h1>
              <div className="chapter-rule mx-auto" />
              <p className="p-lead mx-auto text-muted-foreground mt-6 max-w-3xl">
                Three presences — not packages. The question is not what you get, but how long you need me there.
              </p>
            </div>

            {/* ── Inclusions ── */}
            <div id="ep-inclusions" className="piano-section-target mt-24">
              <RevealOnScroll variant="up">
                <div className="max-w-4xl mx-auto mb-16 scroll-mt-24">
                  <div className="text-center mb-8">
                    <h2 className="h2 mb-3 mx-auto">What every presence includes.</h2>
                    <p className="p-body text-muted-foreground">The baseline — before duration is even discussed.</p>
                  </div>
                  <StaggerChildren staggerDelay={80} className="grid sm:grid-cols-2 gap-6">
                    {inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true">·</span>
                        <div>
                          <p className="font-display text-[15px] font-medium leading-snug">{item.label}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </StaggerChildren>
                </div>
              </RevealOnScroll>
            </div>

            {/* ── Three Presences ── */}
            <RevealOnScroll variant="up">
              <div id="ep-presences" className="max-w-6xl mx-auto mb-16 scroll-mt-24 piano-section-target mt-24">
                <div className="text-center mb-8">
                  <h2 className="h2 mb-3 mx-auto">Three ways to be present.</h2>
                  <p className="p-body text-muted-foreground">The only difference is how long I stay.</p>
                </div>

                <StaggerChildren staggerDelay={120} className="grid md:grid-cols-3 gap-6">
                  {presences.map((p, i) => (
                    <div
                      key={i}
                      className={cn(
                        "relative p-6 transition-all duration-[180ms]",
                        p.isSelected ? "border-l-2 border-primary/30" : "border-l border-border/30"
                      )}
                    >
                      {p.isSelected && <MostSelectedPill />}
                      <h3 className="font-display text-[22px] font-medium leading-tight mb-1">{p.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{p.duration}</p>
                      <p className="p-body text-muted-foreground mb-6">{p.description}</p>
                      <Button variant="primary-dark" className="w-full hover-scale" asChild>
                        <Link to="/contact">Request a proposal</Link>
                      </Button>
                    </div>
                  ))}
                </StaggerChildren>

                <p className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto">
                  After our conversation, I provide a clear quote reflecting duration, occasion, and any specific requirements. No surprises.
                </p>
              </div>
            </RevealOnScroll>

            {/* ── Comparison ── */}
            <RevealOnScroll variant="up">
              <div id="ep-compare" className="max-w-5xl mx-auto mb-16 scroll-mt-24 piano-section-target mt-24">
                <div className="text-center mb-8">
                  <h2 className="h2 mb-3 mx-auto">What sets live piano apart.</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left py-3 pr-4 font-display font-medium text-foreground">Feature</th>
                        <th className="text-center py-3 px-3 font-display font-medium text-primary">Parker</th>
                        <th className="text-center py-3 px-3 font-display font-medium text-muted-foreground">Playlist</th>
                        <th className="text-center py-3 px-3 font-display font-medium text-muted-foreground">DJ</th>
                        <th className="text-center py-3 px-3 font-display font-medium text-muted-foreground">Band</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, i) => (
                        <tr key={i} className="border-b border-border/20 last:border-0">
                          <td className="py-3 pr-4 text-foreground">{row.feature}</td>
                          <td className="py-3 px-3 text-center"><ComparisonIcon value={row.me} /></td>
                          <td className="py-3 px-3 text-center"><ComparisonIcon value={row.playlist} /></td>
                          <td className="py-3 px-3 text-center"><ComparisonIcon value={row.dj} /></td>
                          <td className="py-3 px-3 text-center"><ComparisonIcon value={row.band} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </RevealOnScroll>

            {/* ── FAQ ── */}
            <div id="ep-faq" className="piano-section-target mt-24">
              <RevealOnScroll variant="up">
                <div className="max-w-3xl mx-auto mb-16 scroll-mt-24">
                  <h2 className="h2 text-center mb-3 mx-auto">Questions about the offering.</h2>
                  <p className="p-body text-muted-foreground text-center mb-8">Clarity before commitment — that is the standard I hold.</p>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
                        <AccordionTrigger className="text-left font-display text-[18px] font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent className="font-sans text-[15px] text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </RevealOnScroll>
            </div>

            {/* ── Crossing CTA ── */}
            <div id="ep-cta" className="piano-section-target mt-24">
              <RevealOnScroll variant="up">
                <div className="relative max-w-2xl mx-auto text-center mb-8 space-y-6">
                  <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light mx-auto relative z-10">Every event begins with a conversation.</h2>
                  <p className="p-body text-muted-foreground relative z-10">Tell me about your gathering — the venue, the guests, the feeling you want in the room. I will respond within 24 hours.</p>
                  <Button size="lg" variant="primary-dark" className="hover-scale relative z-10" asChild>
                    <Link to="/events/contact">Discuss your event</Link>
                  </Button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyBar />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .grain, [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
