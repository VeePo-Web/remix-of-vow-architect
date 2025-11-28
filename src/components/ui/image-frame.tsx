import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const imageFrameVariants = cva(
  "image-frame",
  {
    variants: {
      aspectRatio: {
        default: "",
        square: "image-frame--square",
        landscape: "image-frame--landscape",
        portrait: "image-frame--portrait",
      },
      overlay: {
        true: "image-frame--overlay",
      },
    },
    defaultVariants: {
      aspectRatio: "default",
    },
  }
);

export interface ImageFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageFrameVariants> {
  src: string;
  alt: string;
}

const ImageFrame = React.forwardRef<HTMLDivElement, ImageFrameProps>(
  ({ className, aspectRatio, overlay, src, alt, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(imageFrameVariants({ aspectRatio, overlay }), className)}
        {...props}
      >
        <img src={src} alt={alt} />
      </div>
    );
  }
);
ImageFrame.displayName = "ImageFrame";

export { ImageFrame, imageFrameVariants };
