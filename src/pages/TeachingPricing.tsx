import { MinimalHeader } from "@/components/MinimalHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { PianoKeyNav } from "@/components/PianoKeyNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/animation";
import { useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { Link } from "react-router-dom";
import teachingBenchImg from "@/assets/teaching-bench.jpg";

const sections = [
  { id: "tp-hero",       label: "Overview",      isBlackKey: false },
  { id: "tp-price",      label: "Pricing",       isBlackKey: true  },
  { id: "tp-inclusions", label: "Included",      isBlackKey: false },
  { id: "tp-fears",      label: "Questions",     isBlackKey: true  },
  { id: "tp-cta",        label: "Get Started",   isBlackKey: false },
];

const inclusions = [
  "One-on-one, never group lessons",
  "Focus on expression, not just technique",
  "You choose the music we work on",
  "In-person (Calgary) or online",
  "I reply within 24 hours",
];

const fears = [
  {
    question: "Is this worth the investment?",
    answer: "You get a full hour of one-on-one time with no curriculum to sell and no recital to prepare for. The focus is entirely on you.",
  },
  {
    question: "What if I start and quit again?",
    answer: "There is no contract and no package to finish. If you stop, you stop. If you come back, I will be here. No questions asked.",
  },
  {
    question: "What if I am too old to start?",
    answer: "Most of my students are adults. I have taught people who started at 30, 50, and 70. Age has never been a barrier.",
  },
];

function GoldenThread() {
  return (
    <div className="relative py-2 my-16" aria-hidden="true">
      <div className="h-px max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.3), transparent)" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full" style={{ background: "hsl(var(--vow-yellow) / 0.6)", boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.3)", animation: "tp-dot-breathe 3s ease-in-out infinite" }} />
    </div>
  );
}

export default function TeachingPricing() {
  usePageTheme();
  useEffect(() => {
    document.title = "Pricing — Piano Mentorship | Parker Gawryletz";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Piano mentorship for $60 per hour. No packages, no contracts. Pay as you go.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <PianoKeyNav sections={sections} />

      <main>
        <section className="relative section-padding bg-background overflow-hidden" aria-label="Teaching pricing">
          {/* Atmospheric layers */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${teachingBenchImg})`, backgroundSize: "cover", backgroundPosition: "center", maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)", animation: "ken-burns 25s ease-in-out infinite alternate" }} />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 50%)" }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)", animation: "tp-vignette-breathe 6s ease-in-out infinite" }} aria-hidden="true" />
          <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)" }} aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            {/* ── Hero ── */}
            <div id="tp-hero" className="text-center mb-12 animate-fade-in pt-24 piano-section-target">
              <div className="overline mb-2">Pricing</div>
              <h1 className="h1 mx-auto mb-4">One rate. No surprises.</h1>
              <div className="chapter-rule mx-auto" />
              <p className="p-lead mx-auto text-muted-foreground mt-6 max-w-2xl">
                Piano mentorship for a flat hourly rate. No packages, no contracts, no upselling.
              </p>
            </div>

            <GoldenThread />

            {/* ── The Price ── */}
            <div id="tp-price" className="piano-section-target">
              <RevealOnScroll variant="up">
                <div className="max-w-2xl mx-auto text-center mb-16 scroll-mt-24">
                  <div className="font-display text-[clamp(56px,8vw,96px)] font-light text-primary leading-none mb-4">
                    $60
                  </div>
                  <p className="font-display text-[clamp(18px,2vw,24px)] font-light text-muted-foreground mb-6">per hour</p>
                  <p className="p-body text-muted-foreground max-w-md mx-auto">
                    No packages. No commitments. One conversation at a time.
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-4 italic">
                    The first session begins with a question, not a scale.
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            <GoldenThread />

            {/* ── What Every Hour Includes ── */}
            <div id="tp-inclusions" className="piano-section-target">
              <RevealOnScroll variant="up">
                <div className="max-w-2xl mx-auto mb-16 scroll-mt-24">
                  <h2 className="h2 text-center mb-8 mx-auto">What every hour includes.</h2>
                  <ul className="space-y-4">
                    {inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="inline-block w-2 h-2 rotate-45 mt-2 flex-shrink-0" style={{ background: "hsl(var(--vow-yellow) / 0.7)", boxShadow: "0 0 5px hsl(var(--vow-yellow) / 0.2)" }} aria-hidden="true" />
                        <span className="p-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>

            <GoldenThread />

            {/* ── Mind-Reading / Fears ── */}
            <div id="tp-fears" className="piano-section-target">
              <RevealOnScroll variant="up">
                <div className="max-w-3xl mx-auto mb-16 scroll-mt-24">
                  <h2 className="h2 text-center mb-3 mx-auto">You might be wondering.</h2>
                  <p className="p-body text-muted-foreground text-center mb-8">The questions you carry but rarely ask.</p>
                  <div className="space-y-6">
                    {fears.map((fear, i) => (
                      <Card key={i} className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred">
                        <p className="font-display text-[18px] font-medium italic text-muted-foreground/80 mb-3">
                          "{fear.question}"
                        </p>
                        <p className="p-body text-foreground/90">{fear.answer}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <GoldenThread />

            {/* ── Crossing CTA ── */}
            <div id="tp-cta" className="piano-section-target">
              <RevealOnScroll variant="up">
                <div className="relative max-w-2xl mx-auto text-center mb-8 space-y-6">
                  <div className="absolute inset-0 -inset-x-20 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)" }} aria-hidden="true" />
                  <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light mx-auto relative z-10">The first question I ask is never about music.</h2>
                  <p className="p-body text-muted-foreground relative z-10">Tell me what brought you to the piano — a memory, a person, a feeling you want to find again. This is a conversation, not a commitment.</p>
                  <Button size="lg" variant="primary-dark" className="hover-scale relative z-10" asChild>
                    <Link to="/teaching/contact">Begin the conversation</Link>
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
        @keyframes tp-vignette-breathe { 0%, 100% { opacity: 0.8; } 50% { opacity: 0.65; } }
        @keyframes tp-dot-breathe { 0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.5); } }
        @media (prefers-reduced-motion: reduce) {
          .grain, [style*="ken-burns"] { animation: none !important; }
          [style*="tp-vignette-breathe"] { animation: none !important; opacity: 0.7; }
          [style*="tp-dot-breathe"] { animation: none !important; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
