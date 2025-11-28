import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  accent?: boolean;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, accent = false, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn("divider", accent && "divider--accent", className)}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
