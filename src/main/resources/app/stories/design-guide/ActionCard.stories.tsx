import type { Meta, StoryObj } from "@storybook/react";
import { ActionCard } from "@/shared/components/ui/action-card";

/**
 * `ActionCard` combines `Card` and `Button` into a single-action surface.
 * Use it for MCP tools where each available action deserves its own card.
 *
 * ### When to use
 * - Grids of available actions such as "View proposal" or "Export PDF".
 * - Lists of MCP tools in a side panel.
 */
const meta: Meta<typeof ActionCard> = {
  title: "Guia de Diseno/Componentes/ActionCard",
  component: ActionCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    buttonText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

export const Default: Story = {
  args: {
    title: "Buscar destinos",
    description: "Explora destinos disponibles segun preferencias del cliente.",
    buttonText: "Ejecutar",
    onAction: () => alert("Accion ejecutada"),
  },
};

export const GridDeAcciones: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-xl">
      <ActionCard
        title="Crear propuesta"
        description="Genera un nuevo borrador de itinerario."
        buttonText="Crear"
        onAction={() => {}}
      />
      <ActionCard
        title="Calcular precios"
        description="Recalcula margenes con tarifas actualizadas."
        buttonText="Calcular"
        onAction={() => {}}
      />
      <ActionCard
        title="Exportar PDF"
        description="Descarga el dossier en formato PDF."
        buttonText="Exportar"
        onAction={() => {}}
      />
      <ActionCard
        title="Enviar al cliente"
        description="Comparte el link del itinerario por email."
        buttonText="Enviar"
        onAction={() => {}}
      />
    </div>
  ),
};
