import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/shared/components/ui/button";

/**
 * `Button` is the primary call-to-action component in the interface.
 *
 * ### When to use
 * - Submit a form.
 * - Start an important action such as save, delete, or confirm.
 * - Navigate to an important destination when using the `link` variant.
 *
 * ### When not to use
 * - Inline text navigation inside a paragraph. Use an `<a>` element instead.
 */
const meta: Meta<typeof Button> = {
  title: "Guia de Diseno/Componentes/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "The visual style of the button, used to communicate intent.",
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      description: "The size of the button.",
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      description: "Disables the button and prevents user interaction.",
      control: "boolean",
    },
    children: {
      description: "The button content, such as text or icons.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * **Primary (Default):** Use for the most important action on the screen.
 * Ideally there should be only one primary button per view to reduce ambiguity.
 */
export const Primario: Story = {
  args: {
    variant: "default",
    children: "Guardar Cambios",
  },
};

/**
 * **Secondary:** Use for lower-priority actions that complement the primary one.
 * It commonly appears next to a primary action such as Cancel vs Save.
 */
export const Secundario: Story = {
  args: {
    variant: "secondary",
    children: "Cancelar",
  },
};

/**
 * **Destructive:** Warns that the action is risky and cannot be undone.
 * Use this tone for deletion or strong rejection actions.
 */
export const Destructivo: Story = {
  args: {
    variant: "destructive",
    children: "Eliminar Cuenta",
  },
};

/**
 * **Outline:** Useful for secondary actions when a filled secondary button feels too heavy.
 */
export const Contorno: Story = {
  args: {
    variant: "outline",
    children: "Exportar CSV",
  },
};

/**
 * **Ghost:** Best for tertiary actions. It stays visually quiet until hover, which works well in toolbars.
 */
export const Fantasma: Story = {
  args: {
    variant: "ghost",
    children: "Copiar enlace",
  },
};
