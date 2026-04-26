import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Transition } from "@/shared/components/ui/transition";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

/**
 * `Transition` applies `animate-in fade-in` when an element appears in the DOM.
 * Use it to reveal MCP-generated content in a softer way.
 *
 * ### Props
 * - `show` - when `false`, the component renders nothing.
 *
 * ### When to use
 * - Tool results that appear progressively.
 * - Status messages that appear after an action.
 */
const meta: Meta<typeof Transition> = {
  title: "Guia de Diseno/Componentes/Transition",
  component: Transition,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Transition>;

function TransitionToggleExample() {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setShow((value) => !value)}>
        {show ? "Ocultar" : "Mostrar resultado"}
      </Button>
      <Transition show={show}>
        <Card className="w-72">
          <CardContent className="pt-4 text-sm">
            Resultado de la herramienta MCP. Aparece con transicion suave al ser
            generado.
          </CardContent>
        </Card>
      </Transition>
    </div>
  );
}

export const Basico: Story = {
  args: {
    show: true,
    children: (
      <Card className="w-64">
        <CardContent className="pt-4 text-sm text-muted-foreground">
          Contenido revelado con fade-in.
        </CardContent>
      </Card>
    ),
  },
};

export const ConToggle: Story = {
  render: () => <TransitionToggleExample />,
};
