import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AboutOriginStory() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-foreground leading-relaxed">
          Years ago, I sat in the second row at a wedding and couldn't hear a single word of the vows.
        </p>
        <p className="text-lg text-foreground leading-relaxed">
          The wind blew. The DJ shrugged. The moment was lost.
        </p>
        <p className="text-lg text-foreground leading-relaxed">
          I left the reception that night and started building the Ceremony-Audio Plan—a way to make audibility inevitable.
        </p>
      </div>

      <Card className="p-8 bg-card/50 border-l-4 border-l-primary">
        <div className="flex gap-4 items-start">
          <Quote className="text-primary shrink-0" size={32} />
          <p className="text-xl font-medium italic text-foreground">
            No couple should ever wonder if their guests heard their vows.
          </p>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground italic text-center">
        Visual: A sketch of my first cue sheet beside an early SPL chart prototype
      </div>
    </div>
  );
}
