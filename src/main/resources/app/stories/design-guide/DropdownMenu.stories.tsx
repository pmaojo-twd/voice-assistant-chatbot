import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import MoreHorizontalIcon from "lucide-react/dist/esm/icons/more-horizontal";
import PencilIcon from "lucide-react/dist/esm/icons/pencil";
import TrashIcon from "lucide-react/dist/esm/icons/trash-2";
import CopyIcon from "lucide-react/dist/esm/icons/copy";
import UserIcon from "lucide-react/dist/esm/icons/user-round";

/**
 * `DropdownMenu` shows a contextual list of actions anchored to a trigger.
 * Based on `.baseComponents/Dropdown*` from the UI kit (Figma 91:3729).
 *
 * ### When to use
 * - Three-dot overflow menus on cards or table rows.
 * - Secondary navigation menus such as account actions or filter options.
 */
const meta: Meta<typeof DropdownMenu> = {
  title: "Guia de Diseno/Patrones/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const AccionesDePropuesta: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Acciones">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Propuesta</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PencilIcon />
            Editar propuesta
            <DropdownMenuShortcut>E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            Duplicar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon />
          Eliminar
          <DropdownMenuShortcut>Del</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const MenuUsuario: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserIcon />
          Mi cuenta
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Pelayo Casanova</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal text-muted-foreground -mt-1">
          pelayo@tripilots.com
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuracion</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Cerrar sesion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const FiltrosCheckbox: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filtrar por estado</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Estado</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>Completo</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Progresando</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Bloqueado</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
