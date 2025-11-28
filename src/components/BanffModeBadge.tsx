import { Mountain } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BanffModeBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-xs font-medium cursor-help border border-accent/20">
            <Mountain size={12} />
            <span>Banff Mode™</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">
            Compliant with Parks Canada regulations for acoustic ceremonies in national parks
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
