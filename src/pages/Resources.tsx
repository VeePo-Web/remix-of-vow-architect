import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckSquare, FileCheck, ClipboardList, Music } from "lucide-react";

const resources = [
  {
    title: "Song Selection Guide",
    description: "Comprehensive PDF guide to choosing ceremony music that reflects your story.",
    icon: Music,
    fileType: "PDF",
    fileSize: "2.4 MB",
  },
  {
    title: "Ceremony Timeline Template",
    description: "Editable template to plan every musical moment from prelude to exit.",
    icon: ClipboardList,
    fileType: "PDF",
    fileSize: "1.8 MB",
  },
  {
    title: "Music Questionnaire",
    description: "Fillable form to help us understand your vision and preferences.",
    icon: FileCheck,
    fileType: "PDF",
    fileSize: "850 KB",
  },
  {
    title: "Venue Audio Checklist",
    description: "Technical requirements and considerations for your ceremony location.",
    icon: CheckSquare,
    fileType: "PDF",
    fileSize: "1.2 MB",
  },
  {
    title: "Emergency Contact Sheet",
    description: "Day-of coordination template for seamless communication.",
    icon: FileText,
    fileType: "PDF",
    fileSize: "650 KB",
  },
  {
    title: "Banff Venue Guide",
    description: "Acoustic profiles and logistics for mountain wedding locations.",
    icon: FileText,
    fileType: "PDF",
    fileSize: "3.1 MB",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding grain">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 animate-fade-in text-center">
              <div className="overline mb-2">Resources</div>
              <h1 className="mx-auto">Planning Downloads</h1>
              <div className="chapter-rule mx-auto" />
              <p className="lead mx-auto text-muted-foreground mt-6">
                Free resources to help you plan the perfect ceremony music. Download guides, templates, and checklists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card 
                    key={index} 
                    className="card-keyline animate-fade-in"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                          {resource.fileType}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {resource.fileSize}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full hover-scale">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="card-keyline bg-card/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Get All Resources</CardTitle>
                <CardDescription className="text-base">
                  Enter your email to receive instant access to all planning resources and future updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Button type="submit" size="lg" className="hover-scale">
                    Access Resources
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4">
                  No spam. Unsubscribe anytime. Your email is safe with us.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
