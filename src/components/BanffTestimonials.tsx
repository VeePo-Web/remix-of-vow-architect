import { Card } from "@/components/ui/card";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";

const testimonials = [
  {
    quote: "We were nervous about the no-mic rule, but everyone heard us.",
    author: "Alex & Priya",
    venue: "Lake Minnewanka",
    initials: "AP",
  },
  {
    quote: "Zero tech, zero stress. The seating arc made all the difference.",
    author: "Grace & Daniel",
    venue: "Tunnel Mountain",
    initials: "GD",
  },
  {
    quote: "It felt intimate and perfectly timed—Banff-legal without the headache.",
    author: "Mira & Shaun",
    venue: "Cascade Gardens",
    initials: "MS",
  },
];

export function BanffTestimonials() {
  return (
    <section className="section--accent-soft section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real ceremonies. Real compliance. Real clarity.
            </h2>
            <div className="chapter-rule mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger-fade">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-card border-border card-keyline hover-scale">
                <div className="flex items-center gap-4 mb-4">
                  <TestimonialAvatar
                    alt={testimonial.author}
                    fallback={testimonial.initials}
                  />
                  <div>
                    <p className="font-bold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.venue}</p>
                  </div>
                </div>
                
                <blockquote className="text-base font-medium italic">
                  "{testimonial.quote}"
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
