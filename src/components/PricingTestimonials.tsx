import { Card } from "./ui/card";
import { TestimonialAvatar } from "./TestimonialAvatar";

const testimonials = [
  {
    quote: "Worth more than any DJ. Every cue was seamless — no feedback, no delays, just music.",
    author: "Jessica M.",
    venue: "Lake Louise",
    package: "The Vow — $650",
    initials: "JM",
  },
  {
    quote: "The pricing seemed too good to be true — the experience proved it was real.",
    author: "Mike & Aria",
    venue: "Canmore",
    package: "The Hour — $750",
    initials: "MA",
  },
];

export function PricingTestimonials() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light text-center mb-8">
          What couples say about the investment.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 transition-all duration-[180ms]"
            >
              <div className="flex items-start gap-4 mb-4">
                <TestimonialAvatar
                  alt={testimonial.author}
                  fallback={testimonial.initials}
                />
                <div>
                  <p className="font-display text-base font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.venue}</p>
                </div>
              </div>
              
              <blockquote className="border-l-2 border-primary/40 pl-4 mb-4">
                <p className="font-display text-base text-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              
              <div className="pt-3 border-t border-border/30">
                <p className="text-xs font-sans tracking-[0.1em] text-primary opacity-80 uppercase">
                  {testimonial.package}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
