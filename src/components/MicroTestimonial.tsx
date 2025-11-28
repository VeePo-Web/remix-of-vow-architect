interface MicroTestimonialProps {
  quote: string;
  author: string;
  venue: string;
}

export function MicroTestimonial({ quote, author, venue }: MicroTestimonialProps) {
  return (
    <div className="pt-6 border-t border-border/50">
      <p className="text-sm text-foreground italic mb-2">"{quote}"</p>
      <p className="text-xs text-muted-foreground">
        {author} • {venue}
      </p>
    </div>
  );
}
