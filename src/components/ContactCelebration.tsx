import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PricingNav } from "@/components/PricingNav";
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
    <div className="min-h-screen pricing-page flex flex-col">
      <PricingNav />

      <main className="flex-1 flex items-center justify-center py-24 md:py-32 px-6">
        <div className="text-center max-w-xl mx-auto">

          {/* Gold diamond — confirmation symbol */}
          <div className="mb-12" aria-hidden="true">
            <span
              className="inline-block w-3 h-3 rotate-45"
              style={{
                background: "hsl(var(--pricing-gold-accent))",
                boxShadow: "0 0 16px hsl(var(--pricing-gold-accent) / 0.3)",
              }}
            />
          </div>

          {/* Heading */}
          <h1
            className="font-display font-semibold tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.12 }}
          >
            {copy.heading}
          </h1>

          {/* Body */}
          <p
            className="font-sans leading-[1.7] mb-20 max-w-md mx-auto"
            style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "hsl(var(--pricing-fg-secondary))" }}
          >
            {copy.body}
          </p>

          {/* Golden thread separator */}
          <div
            className="h-[1px] w-16 mx-auto mb-12"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--pricing-gold-accent) / 0.4), transparent)",
            }}
            aria-hidden="true"
          />

          {/* What happens next */}
          <div className="text-left max-w-sm mx-auto">
            <p
              className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-center mb-12 flex items-center justify-center gap-10"
              style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
            >
              <span
                className="h-[1px] w-10"
                style={{ background: "hsl(36 16% 90%)" }}
                aria-hidden="true"
              />
              What happens next
              <span
                className="h-[1px] w-10"
                style={{ background: "hsl(36 16% 90%)" }}
                aria-hidden="true"
              />
            </p>

            <div className="space-y-10">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-6">
                  <span
                    className="font-display text-[17px] font-light shrink-0 mt-0.5"
                    style={{ color: "hsl(var(--pricing-gold-accent) / 0.5)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-medium leading-snug mb-1">
                      {step.time}
                    </p>
                    <p
                      className="font-sans text-[14px] leading-[1.6]"
                      style={{ color: "hsl(var(--pricing-fg-secondary))" }}
                    >
                      {step.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return link */}
          <div className="mt-20">
            <Link
              to={homeLink}
              className="inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-200 hover:opacity-70"
              style={{ color: "hsl(var(--pricing-fg-tertiary))" }}
            >
              <ArrowLeft size={13} />
              Return
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
