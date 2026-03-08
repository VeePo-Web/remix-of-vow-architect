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
    <section className="section--accent-soft py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 card-keyline">
              <div className="flex items-start gap-4 mb-4">
                <TestimonialAvatar
                  alt={testimonial.author}
                  fallback={testimonial.initials}
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.venue}</p>
                </div>
              </div>
              
              <p className="text-base text-foreground italic mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs font-semibold text-primary">
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
