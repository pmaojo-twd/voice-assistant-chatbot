import * as React from "react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn(
          "relative rounded-lg bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-50 overflow-x-auto dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <code className={language ? `language-${language}` : ""}>{code}</code>
      </pre>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
