import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

const meta: Meta = {
  title: "Guia de Diseno/05 Composiciones MCP",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const ToolGrid: StoryObj = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
      <div className="group cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/50">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            TL
          </div>
          <div>
            <h4 className="text-sm font-bold">Tool lookup</h4>
            <p className="text-xs text-muted-foreground">
              Busca herramientas disponibles y muestra capacidad principal.
            </p>
          </div>
        </div>
      </div>
      <div className="group cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/50">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-secondary p-2 text-lg text-secondary-foreground transition-colors group-hover:bg-accent">
            CF
          </div>
          <div>
            <h4 className="text-sm font-bold">Config flow</h4>
            <p className="text-xs text-muted-foreground">
              Ajustes guiados con pasos breves y confirmacion final.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InChatResultCard: StoryObj = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <Card className="rounded-2xl rounded-tl-none border-primary/20 bg-primary/5 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary">
            Tool execution
          </CardTitle>
          <Badge className="border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-600">
            Success
          </Badge>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-sm">
            Se encontraron 12 archivos y 3 puntos de mejora listos para accion.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
