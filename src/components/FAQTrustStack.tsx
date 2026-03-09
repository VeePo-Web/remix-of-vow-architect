import { TestimonialAvatar } from "@/components/TestimonialAvatar";

const testimonials = [
  {
    quote: "I had a nightmare about our DJ bailing. Parker showed up with triple redundancy and a smile.",
    name: "Kaitlyn",
    location: "Cochrane",
    initials: "K"
  },
  {
    quote: "I changed venues two weeks out. Parker revised the plan in 24 hours.",
    name: "Louis",
    location: "Canmore",
    initials: "L"
  },
  {
    quote: "We got rained out; he was playing inside within 15 minutes.",
    name: "Chantal",
    location: "Cochrane",
    initials: "C"
  }
];

const journeySteps = [
  { numeral: "01", label: "Fear" },
  { numeral: "02", label: "Uncertainty" },
  { numeral: "03", label: "Plan" },
  { numeral: "04", label: "Relief" },
];

export function FAQTrustStack() {
  return (
    <section className="section--accent-soft section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="overline text-center mb-2">The Covenant Kept</div>
          <h2 className="text-center mb-3">Why couples trust this process.</h2>
          <div className="chapter-rule mx-auto mb-12" />

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-[8px] border border-border/50 rounded-lg p-6 card-sacred card-sacred-hover transition-all duration-[180ms]"
              >
                <blockquote className="border-l-2 border-primary/40 pl-4 mb-4">
                  <p className="font-display text-[15px] text-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
                <div className="flex items-center gap-3">
                  <TestimonialAvatar
                    alt={testimonial.name}
                    fallback={testimonial.initials}
                  />
                  <div>
                    <div className="font-display text-sm font-medium">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Psychological Journey — Gold Editorial Numerals */}
          <div className="bg-card/60 backdrop-blur-[6px] border border-border/40 rounded-lg p-8">
            <div className="flex items-center justify-center gap-0 max-w-2xl mx-auto">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="flex flex-col items-center gap-2 px-4 sm:px-6">
                    {/* Gold numeral with breathing glow */}
                    <span 
                      className="font-display text-2xl font-light"
                      style={{
                        color: index === 3 ? 'hsl(var(--vow-yellow))' : 'hsl(var(--muted-foreground))',
                        textShadow: index === 3 ? '0 0 16px hsl(var(--vow-yellow) / 0.4)' : 'none',
                      }}
                    >
                      {step.numeral}
                    </span>
                    <span 
                      className="text-xs font-display uppercase tracking-wider"
                      style={{
                        color: index === 3 ? 'hsl(var(--vow-yellow))' : 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Golden thread connector */}
                  {index < journeySteps.length - 1 && (
                    <div
                      className="w-8 sm:w-12 h-px hidden sm:block"
                      style={{ 
                        background: index >= 2 
                          ? "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), hsl(var(--vow-yellow) / 0.5))" 
                          : "linear-gradient(90deg, hsl(var(--border)), hsl(var(--vow-yellow) / 0.2))" 
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
