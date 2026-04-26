import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

/**
 * `Checkbox` lets users select one or many independent options.
 *
 * ### When to use
 * - Option lists where the user can choose multiple values.
 * - Binary confirmations such as accepting terms or remembering a session.
 *
 * ### When not to use
 * - When only one mutually exclusive option is allowed. Use `RadioGroup`.
 * - When the action has immediate effect. Use `Switch`.
 */
const meta: Meta<typeof Checkbox> = {
  title: "Guia de Diseno/Componentes/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Marcado: Story = {
  args: { defaultChecked: true },
};

export const Deshabilitado: Story = {
  args: { disabled: true },
};

export const ConLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="newsletter" />
      <Label htmlFor="newsletter">Suscribeme al boletin mensual</Label>
    </div>
  ),
};

export const ListaDeOpciones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {["Vuelos", "Hoteles", "Actividades", "Transporte"].map((option) => (
        <div key={option} className="flex items-center gap-2">
          <Checkbox id={option} defaultChecked={option === "Vuelos"} />
          <Label htmlFor={option}>{option}</Label>
        </div>
      ))}
    </div>
  ),
};
