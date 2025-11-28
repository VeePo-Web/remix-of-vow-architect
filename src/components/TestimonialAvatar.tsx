import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialAvatarProps {
  src?: string;
  alt: string;
  fallback: string;
}

export function TestimonialAvatar({ src, alt, fallback }: TestimonialAvatarProps) {
  return (
    <Avatar className="w-12 h-12 ring-1 ring-[#9BE15D]">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-card text-foreground">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}
