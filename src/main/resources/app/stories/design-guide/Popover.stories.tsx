import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";

/**
 * `Popover` shows actionable contextual content without taking the user out of the flow.
 *
 * ### When to use
 * - Quick filters, small settings, and shortcuts.
 * - Low-complexity interactive content.
 *
 * ### When not to use
 * - Critical confirmations or long forms. Use `Dialog`.
 */
const meta: Meta<typeof Popover> = {
  title: "Guia de Diseno/Componentes/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basico: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Configuracion rapida</PopoverTitle>
          <PopoverDescription>
            Ajusta estas preferencias sin salir de la vista actual.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const Acciones: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Acciones</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2">
          <Button variant="secondary" className="justify-start">
            Duplicar elemento
          </Button>
          <Button variant="secondary" className="justify-start">
            Mover a carpeta
          </Button>
          <Button variant="destructive" className="justify-start">
            Eliminar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
