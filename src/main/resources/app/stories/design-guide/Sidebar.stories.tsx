import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarBody,
  SidebarSection,
  SidebarLabel,
  SidebarItem,
  SidebarFooter,
} from "@/shared/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import HomeIcon from "lucide-react/dist/esm/icons/home";
import PlaneTakeoffIcon from "lucide-react/dist/esm/icons/plane-takeoff";
import UsersIcon from "lucide-react/dist/esm/icons/users-round";
import SettingsIcon from "lucide-react/dist/esm/icons/cog";
import FileTextIcon from "lucide-react/dist/esm/icons/file-text";

/**
 * `Sidebar` is the Tripilots lateral navigation pattern.
 * Based on `.baseComponents/Sidebar*` from the UI kit (Figma 91:3648).
 *
 * ### Composition
 * - `SidebarBody` - `<aside>` container with border and `bg-card`.
 * - `SidebarSection` - grouped items with internal padding.
 * - `SidebarLabel` - section label in small uppercase text.
 * - `SidebarItem` - navigation button with icon, label, and `active` state.
 * - `SidebarFooter` - lower area for profile or settings.
 */
const meta: Meta<typeof SidebarBody> = {
  title: "Guia de Diseno/Patrones/Sidebar",
  component: SidebarBody,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SidebarBody>;

export const NavigacionPrincipal: Story = {
  render: () => (
    <div className="h-[520px] w-64">
      <SidebarBody>
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
            T
          </div>
          <span className="font-semibold text-sm">Tripilots</span>
        </div>

        {/* Main navigation */}
        <SidebarSection>
          <SidebarItem active icon={<HomeIcon />}>
            Inicio
          </SidebarItem>
          <SidebarItem icon={<PlaneTakeoffIcon />}>Propuestas</SidebarItem>
          <SidebarItem icon={<FileTextIcon />}>Documentos</SidebarItem>
        </SidebarSection>

        {/* Admin area */}
        <SidebarSection>
          <SidebarLabel>Administracion</SidebarLabel>
          <SidebarItem icon={<UsersIcon />}>Usuarios</SidebarItem>
          <SidebarItem icon={<SettingsIcon />}>Configuracion</SidebarItem>
        </SidebarSection>

        {/* Footer */}
        <SidebarFooter>
          <SidebarItem
            icon={
              <Avatar size="sm">
                <AvatarFallback>PC</AvatarFallback>
              </Avatar>
            }
          >
            Pelayo Casanova
          </SidebarItem>
        </SidebarFooter>
      </SidebarBody>
    </div>
  ),
};
