import { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

interface PolicyHighlightBoxProps {
  variant?: "info" | "warning" | "success";
  children: ReactNode;
}

export function PolicyHighlightBox({ variant = "info", children }: PolicyHighlightBoxProps) {
  const styles = {
    info: {
      bg: "bg-primary/10",
      border: "border-primary/30",
      icon: <Info className="w-5 h-5 text-primary shrink-0" />,
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />,
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />,
    },
  };

  const style = styles[variant];

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 my-6`}>
      <div className="flex gap-3">
        {style.icon}
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
