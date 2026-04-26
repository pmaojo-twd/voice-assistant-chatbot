import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/shared/components/ui/avatar";

/**
 * `Avatar` visually represents a user, agent, or entity.
 *
 * ### Composition
 * - `AvatarImage` - the real image source.
 * - `AvatarFallback` - initials or an icon when the image fails.
 * - `AvatarBadge` - status indicator such as online or notification.
 * - `AvatarGroup` + `AvatarGroupCount` - stacked avatars with overflow count.
 *
 * ### Sizes
 * - `sm` (24px) - dense lists and breadcrumbs.
 * - `default` (32px) - chat and headers.
 * - `lg` (40px) - featured profile surfaces.
 */
const meta: Meta<typeof Avatar> = {
  title: "Guia de Diseno/Componentes/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ConImagen: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Usuario" />
      <AvatarFallback>PV</AvatarFallback>
    </Avatar>
  ),
  args: { size: "default" },
};

export const SoloIniciales: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PV</AvatarFallback>
    </Avatar>
  ),
  args: { size: "default" },
};

export const Tamanos: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const ConBadgeOnline: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="Online" />
      <AvatarFallback>ON</AvatarFallback>
      <AvatarBadge className="bg-emerald-500" />
    </Avatar>
  ),
};

export const Grupo: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?img=1" alt="A" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?img=2" alt="B" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?img=3" alt="C" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
};
