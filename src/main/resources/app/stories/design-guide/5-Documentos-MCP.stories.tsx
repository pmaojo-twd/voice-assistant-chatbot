import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { InlineCard } from "@/shared/components/ui/inline-card";
import { InlineCarousel } from "@/shared/components/ui/inline-carousel";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

const meta: Meta = {
  title: "Guia de Diseno/06 Documentos MCP",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Patrones visuales para gestion, descarga, subida, edicion y consulta de documentos dentro de experiencias MCP en chat.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const GestionDocumental: Story = {
  render: () => (
    <div className="grid w-[780px] grid-cols-2 gap-4">
      {[
        {
          name: "Contrato_Cliente_A.pdf",
          size: "2.1 MB",
          status: "Listo",
          statusClass: "bg-emerald-500/10 text-emerald-700",
        },
        {
          name: "Acta_Comite_Q2.docx",
          size: "845 KB",
          status: "Pendiente firma",
          statusClass: "bg-amber-500/10 text-amber-700",
        },
        {
          name: "Informe_Riesgos_2026.pdf",
          size: "4.9 MB",
          status: "Bloqueado",
          statusClass: "bg-rose-500/10 text-rose-700",
        },
        {
          name: "Anexo_Tecnico_v3.md",
          size: "112 KB",
          status: "Borrador",
          statusClass: "bg-slate-500/10 text-slate-700",
        },
      ].map((doc) => (
        <Card key={doc.name} className="border border-border/80">
          <CardHeader className="gap-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm leading-tight">
                {doc.name}
              </CardTitle>
              <Badge className={doc.statusClass}>{doc.status}</Badge>
            </div>
            <CardDescription>{doc.size}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end gap-2">
            <Button size="sm" variant="outline">
              Ver
            </Button>
            <Button size="sm">Abrir</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};

export const DescargaConPrioridad: Story = {
  render: () => (
    <InlineCarousel
      items={[
        {
          id: "d1",
          title: "Paquete legal completo",
          badge: "Urgente",
          metadata: ["7 archivos", "12.4 MB", "Incluye anexos firmados"],
          actionLabel: "Descargar ZIP",
        },
        {
          id: "d2",
          title: "Resumen ejecutivo",
          badge: "Rapido",
          metadata: ["1 archivo", "620 KB", "Version final aprobada"],
          actionLabel: "Descargar PDF",
        },
        {
          id: "d3",
          title: "Dataset auditoria",
          badge: "Tecnico",
          metadata: ["3 archivos", "84 MB", "CSV + diccionario de datos"],
          actionLabel: "Descargar bundle",
        },
      ]}
    />
  ),
};

export const SubidaGuiada: Story = {
  render: () => (
    <InlineCard
      className="max-w-[520px]"
      title="Subir documentos para revision"
      primaryActions={
        <>
          <Button size="sm" variant="outline">
            Adjuntar
          </Button>
          <Button size="sm">Enviar</Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Sube contrato, anexo tecnico y soporte de identidad. Formatos
          permitidos: PDF, DOCX, PNG.
        </p>
        <div className="rounded-xl border border-dashed border-border p-4 text-sm">
          Arrastra archivos aqui o usa el boton Adjuntar
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Contrato.pdf</Badge>
          <Badge variant="secondary">DNI_frontal.png</Badge>
        </div>
      </div>
    </InlineCard>
  ),
};

export const EdicionRapidaMetadata: Story = {
  render: () => (
    <Card className="w-[560px] border border-border/80">
      <CardHeader>
        <CardTitle>Editar metadata de documento</CardTitle>
        <CardDescription>
          Ajusta campos clave antes de reenviar a validacion.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input defaultValue="Contrato_Cliente_A.pdf" aria-label="Nombre" />
        <Input defaultValue="Cliente A - Renovacion 2026" aria-label="Titulo" />
        <Input defaultValue="legal, renovacion, firmado" aria-label="Tags" />
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Descartar</Button>
        <Button>Guardar cambios</Button>
      </CardFooter>
    </Card>
  ),
};

export const ConsultaSemantica: Story = {
  render: () => (
    <Card className="w-[640px] border border-border/80">
      <CardHeader>
        <CardTitle>Consulta documental asistida</CardTitle>
        <CardDescription>
          Pregunta en lenguaje natural y obtén respuesta con evidencia.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          defaultValue="Que clausulas tienen penalizacion por cancelacion anticipada?"
          aria-label="Consulta semantica"
        />
        <div className="space-y-2 rounded-xl border bg-muted/30 p-3 text-sm">
          <p className="font-medium">Respuesta resumida</p>
          <p className="text-muted-foreground">
            Se encontraron 2 clausulas con penalizacion: clausula 7.2 y anexo B,
            con recargo del 12%.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Contrato_Cliente_A.pdf - p.12</Badge>
            <Badge variant="outline">Anexo_B.pdf - p.3</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Ver fuentes</Button>
        <Button>Continuar analisis</Button>
      </CardFooter>
    </Card>
  ),
};
