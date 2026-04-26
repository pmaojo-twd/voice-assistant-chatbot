import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

/**
 * `Card` groups related information inside a visually contained surface.
 *
 * ### Tripilots UI kit rules (Figma: card section)
 * - Use shadow only when the card is clickable.
 * - Keep footer actions aligned to the right.
 * - The internal spacing target is 16px and the component already ships with that baseline.
 * - If you need perfect adherence to an 8px radius spec, switch to `rounded-lg`.
 *
 * ### Structure
 * - `CardHeader` - title and description, plus optional `CardAction`.
 * - `CardContent` - body content.
 * - `CardFooter` - actions, typically right-aligned.
 */
const meta: Meta<typeof Card> = {
  title: "Guia de Diseno/Componentes/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["default", "sm"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * **Static card:** no direct interaction and no shadow.
 */
export const TarjetaEstatica: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Itinerario Ibiza</CardTitle>
        <CardDescription>
          4 dias · Boutique · Gastronomia y cultura
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Propuesta personalizada para Pelayo Casanova. Incluye vuelos, hoteles
          y actividades VIP.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar propuesta</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * **Clickable card:** hoverable and intentionally elevated with shadow.
 */
export const TarjetaClicable: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer shadow-md hover:shadow-lg transition-shadow hover:ring-primary/20">
      <CardHeader>
        <CardTitle>Ver propuesta completa</CardTitle>
        <CardDescription>Tokio · Tradicion y futuro · 14 dias</CardDescription>
        <CardAction>
          <Badge variant="secondary">Draft</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Toca para abrir el dossier completo y editar los detalles del
          itinerario.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * **Compact card (`sm`):** reduced density for lists or side panels.
 */
export const TarjetaCompacta: Story = {
  render: () => (
    <Card size="sm" className="w-[320px]">
      <CardHeader>
        <CardTitle>Vuelo MAD-TYO</CardTitle>
        <CardDescription>Emirates QR-80 · Directo · 13h 20min</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Salida 08:45 · Llegada 21:05 (+1)
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" variant="outline">
          Cambiar vuelo
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * **Metric card:** centered content without header or footer and no shadow.
 */
export const TarjetaMetrica: Story = {
  render: () => (
    <Card className="w-[200px] items-center p-6 text-center">
      <p className="text-sm text-muted-foreground">Tasa de reserva</p>
      <p className="text-4xl font-bold text-primary mt-2">84%</p>
    </Card>
  ),
};
