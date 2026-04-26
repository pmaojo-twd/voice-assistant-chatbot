import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Button } from "@/shared/components/ui/button";
import InfoIcon from "lucide-react/dist/esm/icons/info";

/**
 * `Tooltip` shows a short contextual hint on hover or focus.
 *
 * ### When to use
 * - Explain an icon without a visible label.
 * - Add lightweight extra context to something that is already mostly clear.
 *
 * ### When not to use
 * - For essential information. That content should always stay visible.
 * - For interactive actions. Use `Popover`.
 */
const meta: Meta<typeof Tooltip> = {
  title: "Guia de Diseno/Componentes/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const SobreBoton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Pasa el raton aqui</Button>
      </TooltipTrigger>
      <TooltipContent>Este boton guarda tus cambios</TooltipContent>
    </Tooltip>
  ),
};

export const SobreIcono: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Mas informacion">
          <InfoIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>El precio incluye tasas e IVA.</TooltipContent>
    </Tooltip>
  ),
};
