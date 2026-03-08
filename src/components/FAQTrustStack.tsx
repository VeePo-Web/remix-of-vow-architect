import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { AlertTriangle, HelpCircle, FileText, Heart } from "lucide-react";

const testimonials = [
  {
    quote: "I had a nightmare about our DJ bailing. Parker showed up with three amps.",
    name: "Kaitlyn",
    location: "Okotoks",
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
  { icon: FileText, label: "Plan", color: "text-primary/70" },
  { icon: Heart, label: "Relief", color: "text-[#9BE15D]" }
];

export function FAQTrustStack() {
  return (
    <section className="section--accent-soft section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Why couples trust this process.</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <p className="text-sm text-muted-foreground italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <TestimonialAvatar
                    alt={testimonial.name}
                    fallback={testimonial.initials}
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Psychological Journey */}
          <div className="bg-muted/20 rounded-lg p-8">
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${step.color} transition-colors`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <span className={`text-sm font-medium ${step.color}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-4 left-[60%] w-[80%] h-[2px] bg-border hidden sm:block" />
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
