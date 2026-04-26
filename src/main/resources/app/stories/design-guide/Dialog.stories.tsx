import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

/**
 * `Dialog` interrupts the current flow for a critical action or confirmation.
 *
 * ### When to use
 * - Destructive confirmations such as deleting a proposal or canceling a booking.
 * - Short forms with 1 to 3 fields that do not justify their own page.
 * - Alerts that require explicit user action.
 *
 * ### When not to use
 * - Informational content that does not require action. Use `Alert` or `Popover`.
 * - Large forms with more than five fields. Use a page or a `Sheet`.
 */
const meta: Meta<typeof Dialog> = {
  title: "Guia de Diseno/Componentes/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Confirmacion: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar propuesta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar propuesta?</DialogTitle>
          <DialogDescription>
            Esta accion no se puede deshacer. La propuesta "Itinerario Ibiza
            Luxury v1" se eliminara permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Si, eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConFormulario: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear propuesta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva propuesta</DialogTitle>
          <DialogDescription>
            Introduce los datos basicos para crear el borrador.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre del cliente</Label>
            <Input id="nombre" placeholder="Pelayo Casanova" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="destino">Destino</Label>
            <Input id="destino" placeholder="Tokio, Japon" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Crear borrador</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
