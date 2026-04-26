import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

/**
 * `Select` lets the user choose one value from a fixed set of options.
 *
 * ### When to use
 * - Five or more options. With fewer, prefer `RadioGroup` or `Tabs`.
 * - Filters and settings with predefined values.
 *
 * ### Structure
 * - `Select` - controlled container.
 * - `SelectTrigger` + `SelectValue` - visible control.
 * - `SelectContent` - portal that renders the items.
 * - `SelectGroup` + `SelectLabel` - grouped options.
 */
const meta: Meta<typeof Select> = {
  title: "Guia de Diseno/Componentes/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basico: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Elige un destino" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="madrid">Madrid</SelectItem>
        <SelectItem value="paris">Paris</SelectItem>
        <SelectItem value="tokyo">Tokio</SelectItem>
        <SelectItem value="ny">Nueva York</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const ConGrupos: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Elige una zona horaria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europa</SelectLabel>
          <SelectItem value="cet">CET (Madrid, Paris)</SelectItem>
          <SelectItem value="gmt">GMT (Londres)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>America</SelectLabel>
          <SelectItem value="est">EST (Nueva York)</SelectItem>
          <SelectItem value="pst">PST (Los Angeles)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Pequeno: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-[180px]">
        <SelectValue placeholder="Pequeno" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Opcion A</SelectItem>
        <SelectItem value="b">Opcion B</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="No editable" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">A</SelectItem>
      </SelectContent>
    </Select>
  ),
};
