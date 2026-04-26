import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/shared/components/ui/switch";
import { Label } from "@/shared/components/ui/label";

/**
 * `Switch` turns a setting on or off with immediate effect.
 *
 * ### When to use
 * - User preferences such as dark mode or notifications.
 * - Any binary action that applies without a separate save step.
 *
 * ### When not to use
 * - When the choice needs later confirmation with a Save button. Use `Checkbox`.
 */
const meta: Meta<typeof Switch> = {
  title: "Guia de Diseno/Componentes/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { size: "default" },
};

export const Pequeno: Story = {
  args: { size: "sm" },
};

export const ConLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Activar notificaciones push</Label>
    </div>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="beta" disabled defaultChecked />
      <Label htmlFor="beta">Funciones beta (bloqueado)</Label>
    </div>
  ),
};
