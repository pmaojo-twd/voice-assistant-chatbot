import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* FilterHeader                                                               */
/* Composite pattern: breadcrumb + heading + leading/trailing + filters       */
/* Based on the "relaxed filters header" design (Figma 94:1515)               */
/* -------------------------------------------------------------------------- */

interface FilterHeaderProps extends React.ComponentProps<"header"> {
  heading: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  filters?: React.ReactNode;
}

const FilterHeader = ({
  className,
  heading,
  description,
  leading,
  trailing,
  breadcrumb,
  filters,
  ...props
}: FilterHeaderProps) => (
  <header
    data-slot="filter-header"
    className={cn("flex flex-col gap-3 border-b bg-card px-4 py-4", className)}
    {...props}
  >
    {breadcrumb && (
      <div data-slot="filter-header-breadcrumb" className="text-sm">
        {breadcrumb}
      </div>
    )}

    <div className="flex items-start gap-3">
      {leading && (
        <div data-slot="filter-header-leading" className="shrink-0 pt-0.5">
          {leading}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h1
          data-slot="filter-header-heading"
          className="text-base font-semibold leading-snug truncate"
        >
          {heading}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {trailing && (
        <div
          data-slot="filter-header-trailing"
          className="shrink-0 flex items-center gap-2"
        >
          {trailing}
        </div>
      )}
    </div>

    {filters && (
      <div
        data-slot="filter-header-filters"
        className="flex flex-wrap items-center gap-2"
      >
        {filters}
      </div>
    )}
  </header>
);

export { FilterHeader };
