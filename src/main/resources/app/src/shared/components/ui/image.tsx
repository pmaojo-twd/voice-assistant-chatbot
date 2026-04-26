import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "video" | "auto";
  alt: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, aspectRatio = "auto", alt, ...props }, ref) => {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border bg-muted shadow-sm",
          aspectRatio === "square" && "aspect-square",
          aspectRatio === "video" && "aspect-video",
          className
        )}
      >
        <img
          ref={ref}
          alt={alt}
          className="h-full w-full object-cover transition-all hover:scale-105"
          {...props}
        />
      </div>
    );
  }
);
Image.displayName = "Image";
