import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { AlertTriangle, HelpCircle, FileText, Heart } from "lucide-react";

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
  { icon: AlertTriangle, label: "Fear", color: "text-muted-foreground" },
  { icon: HelpCircle, label: "Uncertainty", color: "text-muted-foreground" },
  { icon: FileText, label: "Plan", color: "text-primary opacity-70" },
  { icon: Heart, label: "Relief", color: "text-accent" }
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

          {/* Psychological Journey */}
          <div className="bg-card/60 backdrop-blur-[6px] border border-border/40 rounded-lg p-8">
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${step.color} transition-colors`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <span className={`text-sm font-display font-medium ${step.color}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div
                      className="absolute top-4 left-[60%] w-[80%] h-px hidden sm:block"
                      style={{ background: "linear-gradient(90deg, hsl(var(--border)), hsl(var(--vow-yellow) / 0.2))" }}
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
