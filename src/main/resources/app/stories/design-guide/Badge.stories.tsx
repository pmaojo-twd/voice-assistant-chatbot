import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/shared/components/ui/badge";

/**
 * `Badge` communicates semantic state in a compact form.
 *
 * ### Base variants (shadcn)
 * - `default` - primary or active state.
 * - `secondary` - secondary information.
 * - `outline` - neutral label.
 * - `destructive` - error or danger.
 *
 * ### Tripilots UI kit states (Figma)
 * The design system defines three entity states:
 * - **Complete** - finished work.
 * - **In progress** - active ongoing work.
 * - **Blocked** - inactive while waiting for an external action.
 */
const meta: Meta<typeof Badge> = {
  title: "Guia de Diseno/Componentes/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Base badge variant.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Activo", variant: "default" },
};

export const Secundario: Story = {
  args: { children: "Secundario", variant: "secondary" },
};

export const Contorno: Story = {
  args: { children: "Etiqueta", variant: "outline" },
};

export const Destructivo: Story = {
  args: { children: "Error", variant: "destructive" },
};

/**
 * ## Semantic UI kit states (Figma: Badge section)
 *
 * These three states represent the lifecycle of an entity in Tripilots
 * such as a proposal, booking, or task. Use them consistently across the app.
 */
export const EstadosTripilotsKit: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {/* Complete */}
      <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400">
        Completo
      </Badge>
      {/* In progress */}
      <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400">
        Progresando
      </Badge>
      {/* Blocked */}
      <Badge className="bg-muted text-muted-foreground border-border">
        Bloqueado
      </Badge>
    </div>
  ),
};

/**
 * **Complete** - confirms that the entity finished successfully.
 * Emerald tones reinforce success without overwhelming the surrounding UI.
 */
export const Completo: Story = {
  render: () => (
    <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400">
      Completo
    </Badge>
  ),
};

/**
 * **In progress** - indicates that the entity is actively moving forward.
 * Amber tones separate this state from success.
 */
export const Progresando: Story = {
  render: () => (
    <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400">
      Progresando
    </Badge>
  ),
};

/**
 * **Blocked** - the entity cannot move forward yet and is waiting for an external action.
 * Use muted tokens to communicate inactivity without sounding alarmist.
 */
export const Bloqueado: Story = {
  render: () => (
    <Badge className="bg-muted text-muted-foreground border-border">
      Bloqueado
    </Badge>
  ),
};
