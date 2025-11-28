import { Card } from "./ui/card";
import { TestimonialAvatar } from "./TestimonialAvatar";

const testimonials = [
  {
    quote: "Every guest heard us—even the back row. Setup was early and calm.",
    author: "Sarah & James",
    venue: "Spruce Meadows",
    metric: "SPL vow reading: 62 dBA at aisle mid",
    initials: "SJ",
  },
  {
    quote: "We were Banff-legal with zero stress.",
    author: "Emily & David",
    venue: "Cascade Gardens",
    metric: "Unamplified; proximity arc applied",
    initials: "ED",
  },
  {
    quote: "Our plan arrived in 24 hours, cue sheet co-signed.",
    author: "Michelle Chen",
    venue: "Cochrane Ranch",
    metric: "Mic/Power/SPL notes attached",
    initials: "MC",
  },
];

export function TestimonialsWithMetrics() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 stagger-fade">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <TestimonialAvatar
                  alt={testimonial.author}
                  fallback={testimonial.initials}
                />
                <div>
                  <p className="font-bold font-sans">{testimonial.author}</p>
                  <p className="p-small text-muted-foreground">{testimonial.venue}</p>
                </div>
              </div>
              
              <blockquote className="testimonial-quote mb-4">
                "{testimonial.quote}"
              </blockquote>
              
              <p className="p-small text-muted-foreground italic">
                {testimonial.metric}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
