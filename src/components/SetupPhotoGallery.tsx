import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { Mic, Zap, Users } from "lucide-react";
import { StaggerChildren } from "@/components/animation";

const setupImages = [
  {
    icon: Mic,
    title: "Live Mic Mix, Cue Sheet Visible",
    tooltip: "Cue Sheet—co-signed with planner & officiant; time-coded entrances, vows, exits.",
    alt: "Wedding ceremony cue sheet with microphone mixing setup Calgary",
  },
  {
    icon: Zap,
    title: "Covered, Battery-Powered Amp",
    tooltip: "Generator-free; SPL-aware placement for distance and wind.",
    alt: "Battery powered ceremony amplifier outdoor wedding Alberta",
  },
  {
    icon: Users,
    title: "Proximity Seating Arc",
    tooltip: "Natural projection layout so words and music carry—no shouty levels.",
    alt: "Wedding ceremony seating arc acoustic projection layout",
  },
];

export function SetupPhotoGallery() {
  return (
    <section className="section--default section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="h2 mb-12 text-center">Engineered Elegance in Action</h2>
          
          <TooltipProvider>
            <StaggerChildren staggerDelay={80} className="grid md:grid-cols-3 gap-6 mb-8">
              {setupImages.map((item, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(255,224,138,0.06)] transition-all duration-[180ms] cursor-help">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/[0.06] border border-primary/10 flex items-center justify-center mb-5">
                          <item.icon className="text-primary" size={40} />
                        </div>
                        <h3 className="font-display text-sm font-medium">{item.title}</h3>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </StaggerChildren>
          </TooltipProvider>

          <Card className="p-6 bg-card/80 backdrop-blur-[8px] border-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.12)]">
            <p className="italic text-foreground mb-3">
              "Our planner called Parker the most prepared musician she's worked with."
            </p>
            <div className="flex items-center gap-3">
              <TestimonialAvatar
                alt="Miguel"
                fallback="M"
              />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Miguel</p>
                <p className="text-muted-foreground">Deane House</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
