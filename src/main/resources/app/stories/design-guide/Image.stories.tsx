import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "@/shared/components/ui/image";

/**
 * `Image` wraps `<img>` with a container that applies radius, border, and aspect ratio.
 *
 * ### When to use
 * - Images inside cards, headers, or editorial content.
 * - Any image that must preserve a fixed aspect ratio.
 *
 * ### Best practices
 * - Always define `alt`.
 * - Use `aspectRatio="video"` for travel hero images and cards.
 * - Use `aspectRatio="square"` for large avatars or thumbnails.
 */
const meta: Meta<typeof Image> = {
  title: "Guia de Diseno/Componentes/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: { control: "select", options: ["auto", "square", "video"] },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const SAMPLE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600";

export const Auto: Story = {
  args: {
    src: SAMPLE,
    alt: "Vista de Paris",
    aspectRatio: "auto",
    className: "w-[320px]",
  },
};

export const Cuadrada: Story = {
  args: {
    src: SAMPLE,
    alt: "Vista cuadrada",
    aspectRatio: "square",
    className: "w-[240px]",
  },
};

export const Video: Story = {
  args: {
    src: SAMPLE,
    alt: "Hero 16:9",
    aspectRatio: "video",
    className: "w-[420px]",
  },
};
