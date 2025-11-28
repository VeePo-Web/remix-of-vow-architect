import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { usePageTheme } from "@/hooks/usePageTheme";

const blogPosts = [
  {
    title: "The Ultimate Ceremony Music Timeline",
    excerpt: "Master the perfect timing for every moment from prelude to recessional.",
    category: "Planning Tips",
    date: "2024-03-15",
    readTime: "8 min read",
  },
  {
    title: "10 Non-Traditional Processional Songs",
    excerpt: "Break from tradition with these beautiful, unexpected ceremony entrance pieces.",
    category: "Song Selection",
    date: "2024-03-10",
    readTime: "6 min read",
  },
  {
    title: "How to Coordinate Music with Your Officiant",
    excerpt: "Essential communication strategies to ensure seamless ceremony flow.",
    category: "Planning Tips",
    date: "2024-03-05",
    readTime: "5 min read",
  },
  {
    title: "Weather Contingency: Protecting Outdoor Ceremony Sound",
    excerpt: "Rain, wind, and unexpected conditions won't compromise your audio with proper planning.",
    category: "Venue Guides",
    date: "2024-02-28",
    readTime: "7 min read",
  },
  {
    title: "Custom Arrangements: When and Why",
    excerpt: "Understanding when a custom piano arrangement elevates your ceremony experience.",
    category: "Song Selection",
    date: "2024-02-20",
    readTime: "6 min read",
  },
  {
    title: "Banff Venue Sound Considerations",
    excerpt: "Acoustic challenges and solutions for mountain wedding venues.",
    category: "Venue Guides",
    date: "2024-02-15",
    readTime: "9 min read",
  },
];

export default function Blog() {
  usePageTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding grain">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 animate-fade-in text-center">
              <div className="overline mb-2">Blog & Guides</div>
              <h1 className="mx-auto">Ceremony Music Insights</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                Expert guidance on ceremony music planning, song selection, and creating unforgettable moments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card 
                  key={index} 
                  className="card-keyline hover-scale cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="aspect-video bg-card-foreground/5 rounded-t-lg mb-4"></div>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <a 
                      href="#" 
                      className="inline-block mt-4 text-sm text-primary hover:underline story-link"
                    >
                      Read More →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
