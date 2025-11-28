interface MicroTestimonialProps {
  quote: string;
  author: string;
  venue: string;
}

export function MicroTestimonial({ quote, author, venue }: MicroTestimonialProps) {
  return (
    <div className="pt-6 border-t border-border/50">
      <p className="testimonial-quote mb-2">"{quote}"</p>
      <p className="meta">
        {author} • {venue}
      </p>
    </div>
  );
}
