import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/shared/components/ui/separator";

/**
 * `Separator` visually divides related sections of content.
 *
 * ### When to use
 * - Create visual rhythm between blocks without adding card chrome.
 * - Separate items in a menu or toolbar.
 *
 * ### When not to use
 * - Separate unrelated content. Use a stronger structural component such as `Card`.
 */
const meta: Meta<typeof Separator> = {
  title: "Guia de Diseno/Componentes/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[320px]">
      <div className="text-sm font-medium">Seccion A</div>
      <Separator className="my-3" />
      <div className="text-sm font-medium">Seccion B</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3 text-sm">
      <span>Inicio</span>
      <Separator orientation="vertical" />
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Sobre nosotros</span>
    </div>
  ),
};
