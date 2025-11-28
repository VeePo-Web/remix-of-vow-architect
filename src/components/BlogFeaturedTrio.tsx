import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { DirectionalLink } from "@/components/DirectionalLink";

const featuredPosts = [
  {
    title: "How to Mic an Outdoor Wedding Ceremony—Without Power or Feedback",
    excerpt: "A step-by-step on mic types, placement, wind control, and SPL targets.",
    category: "Tech Setup Guides",
    readTime: "8 min",
    ctaText: "See the Proof & Trust approach",
    ctaLink: "/proof",
  },
  {
    title: "Wedding Audio Rules for Banff, Canmore & Parks Canada",
    excerpt: "What bylaws allow, what they don't, and how Banff Mode™ keeps you compliant.",
    category: "Parks Canada Venues",
    readTime: "7 min",
    ctaText: "Explore Banff Mode™",
    ctaLink: "/banff-mode",
  },
  {
    title: "The Best Ceremony Songs for Banff Venues—Curated by Parker",
    excerpt: "Pieces that project naturally outdoors, tuned for proximity seating and mountain acoustics.",
    category: "Ceremony Song Ideas",
    readTime: "6 min",
    ctaText: "See Packages & Add-ons",
    ctaLink: "/pricing",
  },
];

export function BlogFeaturedTrio() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {featuredPosts.map((post, index) => (
        <Card 
          key={index}
          className="card-keyline hover-scale cursor-pointer animate-fade-in flex flex-col"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="aspect-[16/9] bg-gradient-to-br from-card-foreground/5 to-card-foreground/10 rounded-t-lg" />
          <CardHeader className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <CardTitle className="text-xl mb-3 leading-tight">{post.title}</CardTitle>
            <CardDescription className="text-sm">{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <DirectionalLink to={post.ctaLink} className="text-sm">
              {post.ctaText}
            </DirectionalLink>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
