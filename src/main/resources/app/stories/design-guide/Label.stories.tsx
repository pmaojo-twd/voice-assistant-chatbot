import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";

/**
 * `Label` provides the semantic label for a form control.
 *
 * ### When to use
 * - Whenever an `Input`, `Checkbox`, `Switch`, `Select`, or `Slider` needs a description.
 * - To associate text with a control through `htmlFor` and improve accessibility.
 *
 * ### Best practices
 * - Always use `htmlFor` to point at the control `id`.
 * - Keep the text short and direct.
 */
const meta: Meta<typeof Label> = {
  title: "Guia de Diseno/Componentes/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const ConInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="email">Correo electronico</Label>
      <Input id="email" type="email" placeholder="tu@correo.com" />
    </div>
  ),
};

export const ConCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Acepto los terminos y condiciones</Label>
    </div>
  ),
};
