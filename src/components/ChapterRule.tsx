import { cn } from "@/lib/utils";

interface ChapterRuleProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * Chapter Rule — 48px Golden Divider
 * - Grows from center
 * - Soft gradient edges (transparent → gold → transparent)
 * - Separates sacred sections
 */
export function ChapterRule({ isVisible = false, className }: ChapterRuleProps) {
  return (
    <div
      className={cn(
        "h-[2px] w-12 mx-auto my-6 rounded-full origin-center scale-x-0 transition-transform duration-[600ms]",
        isVisible && "scale-x-100",
        className
      )}
      style={{
        background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow)), transparent)",
        transitionDelay: "1550ms",
        transitionTimingFunction: "cubic-bezier(0.22, 0.68, 0.35, 1)",
      }}
      aria-hidden="true"
    />
  );
}
