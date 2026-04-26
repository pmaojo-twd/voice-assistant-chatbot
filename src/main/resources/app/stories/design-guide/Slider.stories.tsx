import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/shared/components/ui/slider";
import { Label } from "@/shared/components/ui/label";

/**
 * `Slider` lets the user choose a value or range inside a continuous interval.
 *
 * ### When to use
 * - Price, distance, or intensity selection.
 * - Numeric values where relative magnitude matters more than exact input.
 *
 * ### Best practices
 * - Pair it with a `Label` and show the current value near the control.
 * - Use sensible `step` values to avoid irrelevant precision.
 */
const meta: Meta<typeof Slider> = {
  title: "Guia de Diseno/Componentes/Slider",
  component: Slider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const ValorUnico: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={[40]} max={100} step={1} />
    </div>
  ),
};

export const Rango: Story = {
  render: () => (
    <div className="w-[320px] flex flex-col gap-3">
      <Label>Rango de precio (EUR)</Label>
      <Slider defaultValue={[200, 800]} min={0} max={1500} step={50} />
    </div>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={[50]} max={100} disabled />
    </div>
  ),
};
