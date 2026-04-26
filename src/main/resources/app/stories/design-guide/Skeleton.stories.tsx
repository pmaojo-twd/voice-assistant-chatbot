import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/shared/components/ui/skeleton";

/**
 * `Skeleton` shows an animated placeholder while real content is loading.
 *
 * ### When to use
 * - Initial loads longer than 300ms when you want to preserve the final layout.
 * - Tables, lists, or cards in a loading state.
 *
 * ### When not to use
 * - Instant loads under 300ms. Show the real content directly.
 * - Specific operations such as a button saving state. Use a spinner.
 */
const meta: Meta<typeof Skeleton> = {
  title: "Guia de Diseno/Componentes/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const TarjetaCargando: Story = {
  render: () => (
    <div className="flex items-center gap-4 w-[320px]">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
};

export const ListaCargando: Story = {
  render: () => (
    <div className="space-y-3 w-[320px]">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  ),
};
