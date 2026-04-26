import type { Meta, StoryObj } from "@storybook/react";
import { FilterHeader } from "@/shared/components/ui/filter-header";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import PlusIcon from "lucide-react/dist/esm/icons/plus";
import SearchIcon from "lucide-react/dist/esm/icons/search";

/**
 * `FilterHeader` is the Tripilots section-header pattern with built-in filters.
 * Based on the "relaxed filters header" screen (Figma symbol 91:3813 / frame 94:1515).
 *
 * ### Composition
 * - `breadcrumb` - contextual navigation, optional.
 * - `heading` - required section title.
 * - `description` - optional subtitle.
 * - `leading` - optional icon or avatar.
 * - `trailing` - actions such as CTA, menu, or view toggle.
 * - `filters` - search input plus filter selects.
 */
const meta: Meta<typeof FilterHeader> = {
  title: "Guia de Diseno/Patrones/FilterHeader",
  component: FilterHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FilterHeader>;

export const GestionDeUsuarios: Story = {
  render: () => (
    <div className="max-w-3xl">
      <FilterHeader
        heading="Gestion de usuarios"
        description="Administra roles, accesos y permisos del equipo."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Usuarios</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        trailing={
          <Button size="sm" className="gap-1.5">
            <PlusIcon />
            Nuevo usuario
          </Button>
        }
        filters={
          <>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email"
                className="pl-8 h-8 text-sm w-56"
              />
            </div>
            <Select>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="agent">Agente</SelectItem>
                <SelectItem value="viewer">Consulta</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="blocked">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
      />
    </div>
  ),
};

export const PropuestasSimple: Story = {
  render: () => (
    <div className="max-w-2xl">
      <FilterHeader
        heading="Propuestas"
        trailing={
          <Button size="sm" className="gap-1.5">
            <PlusIcon />
            Nueva propuesta
          </Button>
        }
        filters={
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar propuesta..."
              className="pl-8 h-8 text-sm w-64"
            />
          </div>
        }
      />
    </div>
  ),
};
