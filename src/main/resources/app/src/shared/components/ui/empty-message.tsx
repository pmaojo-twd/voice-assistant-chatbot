import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly title?: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
}

export const EmptyMessage = ({
  className,
  title = "No results found",
  description,
  icon,
  children,
  ...props
}: EmptyMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in zoom-in-95 duration-500",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 rounded-full bg-muted p-3 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-[250px]">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
