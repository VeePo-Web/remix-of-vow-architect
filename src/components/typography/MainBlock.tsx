import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainBlockProps {
  intro?: ReactNode;
  body?: ReactNode;
  twoColumn?: boolean;
  className?: string;
}

export function MainBlock({ 
  intro, 
  body, 
  twoColumn = false,
  className 
}: MainBlockProps) {
  return (
    <div className={cn(
      "main-block",
      twoColumn && "main-block--two-column",
      className
    )}>
      {intro && (
        <div className="main-block__intro space-y-fitz-3">
          {intro}
        </div>
      )}
      {body && (
        <div className="main-block__body space-y-fitz-3">
          {body}
        </div>
      )}
    </div>
  );
}
