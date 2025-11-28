import { cn } from "@/lib/utils";

interface TestimonialQuoteProps {
  quote: string;
  author: string;
  location?: string;
  className?: string;
}

export function TestimonialQuote({ 
  quote, 
  author, 
  location,
  className 
}: TestimonialQuoteProps) {
  return (
    <figure className={cn("testimonial space-y-fitz-4", className)}>
      <blockquote className="testimonial-quote font-display text-lg leading-relaxed">
        "{quote}"
      </blockquote>
      <figcaption className="space-y-1">
        <p className="meta">{author}</p>
        {location && (
          <p className="p-small text-muted-foreground">{location}</p>
        )}
      </figcaption>
    </figure>
  );
}
