import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root as React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
  }
>;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger as React.FC<
  React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent as React.FC<
  React.HTMLAttributes<HTMLDivElement> & { forceMount?: true }
>;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
