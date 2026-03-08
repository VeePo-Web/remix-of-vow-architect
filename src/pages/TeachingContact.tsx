import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { usePageTheme } from "@/hooks/usePageTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import teachingBenchImg from "@/assets/teaching-bench.jpg";

const teachingContactSchema = z.object({
  name: z.string().min(2, "Please share your name so I know who I am speaking with"),
  email: z.string().email("Please add your email so I can write back"),
  reason: z.string().optional(),
});

type TeachingContactData = z.infer<typeof teachingContactSchema>;

export default function TeachingContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  usePageTheme();

  useEffect(() => {
    document.title = "Begin the Conversation — Piano Mentorship";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "The first question I ask is never about music. Begin a conversation about piano mentorship — no obligation, no audition."
      );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeachingContactData>({
    resolver: zodResolver(teachingContactSchema),
  });

  const onSubmit = (data: TeachingContactData) => {
    console.log("Teaching inquiry:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <main>
        <section
          className="relative section-padding bg-background overflow-hidden"
          aria-label="Begin the conversation"
        >
          {/* Atmospheric layers */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url(${teachingBenchImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 50%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 50%)",
                animation: "ken-burns 30s ease-in-out infinite alternate",
              }}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.01) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 grain opacity-[0.05] pointer-events-none"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl mx-auto animate-fade-in">
              <Breadcrumbs
                items={[
                  { label: "Teaching", path: "/teaching" },
                  { label: "Begin the Conversation" },
                ]}
              />

              <div className="text-center mb-10">
                <div className="overline mb-2">The First Note</div>
                <h1 className="h1 mx-auto">
                  The first question I ask is never about music.
                </h1>
                <div className="chapter-rule mx-auto" />
                <p className="p-lead mx-auto text-muted-foreground mt-6">
                  A name, an email, and whatever brought you here — that is
                  enough to begin.
                </p>
              </div>

              {isSubmitted ? (
                <Card className="p-8 bg-card border-border card-keyline animate-fade-in">
                  <div className="text-center space-y-4">
                    <CheckCircle2
                      className="mx-auto text-accent"
                      size={48}
                    />
                    <h2 className="font-display text-[clamp(20px,2.5vw,28px)] font-light">
                      I received your note.
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                      I will write back within 24 hours — not with a sales
                      pitch, but with a question or two of my own. This is how
                      every good lesson begins.
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 bg-card/80 backdrop-blur-[8px] border-border/50 card-keyline">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="name">Your name</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-2"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="reason">
                        What brought you to the piano?
                      </Label>
                      <Textarea
                        id="reason"
                        {...register("reason")}
                        placeholder="A memory, a person, a song, a feeling..."
                        rows={3}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        There is no wrong answer.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="primary-dark"
                      className="w-full"
                    >
                      Begin the conversation
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      I only use your information to write back. Nothing else.
                    </p>
                  </form>
                </Card>
              )}

              {/* Reassurance — text only, not cards */}
              {!isSubmitted && (
                <div className="mt-10 space-y-3 max-w-md mx-auto">
                  {[
                    {
                      icon: MessageCircle,
                      text: "This is a conversation, not a commitment.",
                    },
                    {
                      icon: Clock,
                      text: "Response within 24 hours.",
                    },
                    {
                      icon: Users,
                      text: "Currently accepting new students.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <item.icon size={14} className="text-primary/60 shrink-0" />
                      <span className="text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyBar />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .grain { animation: none !important; }
          [style*="ken-burns"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
