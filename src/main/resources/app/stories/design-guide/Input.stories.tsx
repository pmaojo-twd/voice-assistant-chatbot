import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/shared/components/ui/input";

/**
 * `Input` lets users enter text or structured values in forms.
 *
 * ### For designers
 * - Make sure every `Input` has a clear `Label`.
 * - Use placeholder text only for short examples, not as a label replacement.
 *
 * ### For developers
 * - Wrap this component with form tooling such as react-hook-form when state validation is needed.
 * - It supports native HTML types such as `text`, `password`, and `email`.
 */
const meta: Meta<typeof Input> = {
  title: "Guia de Diseno/Componentes/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "The HTML input type.",
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    placeholder: {
      description: "Temporary helper text shown while the field is empty.",
      control: "text",
    },
    disabled: {
      description: "Disables the field and blocks text entry.",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * **Standard usage:** The base text field for names, titles, and similar values.
 */
export const Estandar: Story = {
  args: {
    type: "text",
    placeholder: "Introduce tu nombre...",
  },
};

/**
 * **Passwords:** Use the `password` type to hide typed characters automatically.
 */
export const Contrasena: Story = {
  args: {
    type: "password",
    placeholder: "********",
  },
};

/**
 * **Disabled:** Shows the field in a muted state to communicate that editing is not currently allowed.
 */
export const Deshabilitado: Story = {
  args: {
    type: "text",
    placeholder: "No puedes editar esto",
    disabled: true,
    value: "Valor de solo lectura",
  },
};
