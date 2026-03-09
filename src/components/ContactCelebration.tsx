import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";

const COPY: Record<"weddings" | "events" | "teaching", { heading: string; body: string }> = {
  weddings: {
    heading: "Your details have been received.",
    body: "I will send a personalized ceremony plan within 24 hours — repertoire suggestions, a timeline, and clarity for your day.",
  },
  events: {
    heading: "Your inquiry has been received.",
    body: "I will send a tailored proposal within 24 hours — venue considerations, repertoire, and logistics for your gathering.",
  },
  teaching: {
    heading: "I received your note.",
    body: "I will write back within 24 hours — not with a sales pitch, but with a question or two of my own. This is how every good lesson begins.",
  },
};

const TIMELINE: Record<"weddings" | "events" | "teaching", { time: string; action: string }[]> = {
  weddings: [
    { time: "Within 24 hours", action: "I send your personalized ceremony plan" },
    { time: "24–48 hours", action: "An optional follow-up to discuss song selections and planner coordination" },
    { time: "By 72 hours", action: "Your date is held — no pressure, no obligation" },
  ],
  events: [
    { time: "Within 24 hours", action: "I send a tailored proposal for your gathering" },
    { time: "24–48 hours", action: "A brief call to confirm details and answer questions" },
    { time: "By 72 hours", action: "Logistics confirmed — your event is on my calendar" },
  ],
  teaching: [
    { time: "Within 24 hours", action: "I write back with a question or two of my own" },
    { time: "Day 2–3", action: "We schedule a short, informal first conversation" },
    { time: "First lesson", action: "We begin — no audition, no expectations" },
  ],
};

const HOME_LINKS: Record<"weddings" | "events" | "teaching", string> = {
  weddings: "/",
  events: "/events",
  teaching: "/teaching",
};

interface ContactCelebrationProps {
  vertical?: "weddings" | "events" | "teaching";
}

export function ContactCelebration({ vertical = "weddings" }: ContactCelebrationProps) {
  const copy = COPY[vertical];
  const timeline = TIMELINE[vertical];
  const homeLink = HOME_LINKS[vertical];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MinimalHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-6 relative overflow-hidden">
        {/* Ambient golden glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 65%)",
          }}
        />
        {/* Subtle grain */}
        <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 text-center max-w-xl mx-auto animate-fade-in">
          {/* Breathing semicolon — brand threshold symbol */}
          <div className="mb-10" aria-hidden="true">
            <span
              className="inline-block font-display font-light text-primary"
              style={{
                fontSize: "clamp(60px, 8vw, 88px)",
                lineHeight: 1,
                textShadow:
                  "0 0 30px hsl(var(--vow-yellow) / 0.45), 0 0 60px hsl(var(--vow-yellow) / 0.18)",
                animation: "celebration-semicolon 6s ease-in-out infinite",
              }}
            >
              ;
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-light text-foreground mb-5"
            style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: 1.2 }}
          >
            {copy.heading}
          </h1>

          {/* Body */}
          <p
            className="text-muted-foreground font-light leading-relaxed mb-14 max-w-md mx-auto"
            style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}
          >
            {copy.body}
          </p>

          {/* What happens next */}
          <div
            className="text-left max-w-sm mx-auto border-t pt-10"
            style={{ borderColor: "hsl(var(--border) / 0.2)" }}
          >
            <p className="overline text-center mb-8" style={{ color: "hsl(var(--primary) / 0.5)" }}>
              What happens next
            </p>

            <div className="space-y-7">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  {/* Step numeral with gold gradient */}
                  <span
                    className="font-display font-light shrink-0 mt-0.5"
                    style={{
                      fontSize: "1.125rem",
                      background:
                        "linear-gradient(135deg, hsl(var(--vow-yellow) / 0.7), hsl(var(--primary) / 0.45))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-light text-foreground/80 leading-snug mb-0.5">
                      {step.time}
                    </p>
                    <p className="text-xs font-light text-muted-foreground/55 leading-relaxed">
                      {step.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return link */}
          <div className="mt-14">
            <Link
              to={homeLink}
              className="inline-flex items-center gap-2.5 text-[0.625rem] tracking-[0.16em] uppercase font-light text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft size={12} />
              Return
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes celebration-semicolon {
          0%, 100% {
            text-shadow: 0 0 30px hsl(var(--vow-yellow) / 0.45), 0 0 60px hsl(var(--vow-yellow) / 0.18);
          }
          50% {
            text-shadow: 0 0 40px hsl(var(--vow-yellow) / 0.6), 0 0 80px hsl(var(--vow-yellow) / 0.25);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="celebration-semicolon"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
