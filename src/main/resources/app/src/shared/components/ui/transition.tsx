import * as React from "react";
import { cn } from "@/lib/utils";

export interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
}

export function Transition({
  show = true,
  className,
  children,
  ...props
}: TransitionProps) {
  if (!show) return null;
  return (
    <div
      className={cn("animate-in fade-in duration-300", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TransitionGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
