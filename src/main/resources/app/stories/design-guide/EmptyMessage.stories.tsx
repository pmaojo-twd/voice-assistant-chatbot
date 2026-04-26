import type { Meta, StoryObj } from "@storybook/react";
import { EmptyMessage } from "@/shared/components/ui/empty-message";
import { Button } from "@/shared/components/ui/button";
import SearchIcon from "lucide-react/dist/esm/icons/search";
import PlaneIcon from "lucide-react/dist/esm/icons/plane";

/**
 * `EmptyMessage` appears when a list, result, or section has no content.
 * It gives the user context and can optionally include an action to recover from the empty state.
 *
 * ### Best practices
 * - The `title` should explain what is empty.
 * - The `description` should suggest what to do next.
 * - Include an action (`children`) when there is an obvious next step.
 */
const meta: Meta<typeof EmptyMessage> = {
  title: "Guia de Diseno/Componentes/EmptyMessage",
  component: EmptyMessage,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyMessage>;

export const Default: Story = {
  args: {
    title: "Sin resultados",
    description: "No hay elementos que coincidan con tu busqueda.",
  },
};

export const ConIconoYAccion: Story = {
  render: () => (
    <EmptyMessage
      icon={<PlaneIcon className="size-6" />}
      title="No hay propuestas todavia"
      description="Crea la primera propuesta para este cliente."
    >
      <Button>Nueva propuesta</Button>
    </EmptyMessage>
  ),
};

export const BusquedaSinResultados: Story = {
  render: () => (
    <EmptyMessage
      icon={<SearchIcon className="size-6" />}
      title="Sin coincidencias"
      description="Prueba con otros terminos o amplia el rango de fechas."
    />
  ),
};
