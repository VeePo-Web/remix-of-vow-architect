import { cn } from "@/lib/utils";

interface SectionIntroProps {
  label?: string;
  title: string;
  lead?: string;
  body?: string;
  centered?: boolean;
  className?: string;
}

export function SectionIntro({ 
  label, 
  title, 
  lead, 
  body, 
  centered = true,
  className 
}: SectionIntroProps) {
  return (
    <div className={cn(
      "section-intro space-y-fitz-3",
      centered && "text-center mx-auto",
      className
    )}>
      {label && (
        <p className="label text-muted-foreground">{label}</p>
      )}
      <h2 className="h2">{title}</h2>
      {lead && (
        <p className="p-lead text-muted-foreground">{lead}</p>
      )}
      {body && (
        <p className="p-body text-muted-foreground">{body}</p>
      )}
    </div>
  );
}
