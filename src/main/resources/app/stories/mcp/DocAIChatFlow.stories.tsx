import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Download from "lucide-react/dist/esm/icons/download";
import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import Eye from "lucide-react/dist/esm/icons/eye";
import FileCode from "lucide-react/dist/esm/icons/file-code";
import FileImage from "lucide-react/dist/esm/icons/file-image";
import FileText from "lucide-react/dist/esm/icons/file-text";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import Quote from "lucide-react/dist/esm/icons/quote";
import Search from "lucide-react/dist/esm/icons/search";
import UploadCloud from "lucide-react/dist/esm/icons/upload-cloud";
import Zap from "lucide-react/dist/esm/icons/zap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { cn } from "@/lib/utils";

const meta: Meta = {
  title: "MCP / Doc AI In-Chat Flow",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* 1. DocumentUploadZone                                                      */
/* -------------------------------------------------------------------------- */

const UploadZoneSimulation = () => {
  const [status, setStatus] = useState<"idle" | "uploading" | "completed">(
    "idle"
  );
  const [progress, setProgress] = useState(0);

  const startUpload = () => {
    setStatus("uploading");
    setProgress(0);
  };

  useEffect(() => {
    if (status !== "uploading" || progress >= 100) return;

    const timer = setTimeout(() => {
      setProgress((prev) => {
        const nextProgress = Math.min(prev + 10, 100);
        if (nextProgress === 100) {
          setStatus("completed");
        }
        return nextProgress;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [status, progress]);

  return (
    <div className="max-w-md w-full p-4 space-y-4">
      {status === "idle" && (
        <button
          onClick={startUpload}
          className="w-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[24px] p-8 flex flex-col items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/20 hover:border-primary/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all cursor-pointer group"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <UploadCloud className="size-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">mcp_docs.upload()</p>
            <p className="text-[11px] text-muted-foreground mt-1 tracking-tight italic">
              Drag & drop or click to upload
            </p>
          </div>
        </button>
      )}

      {status === "uploading" && (
        <div className="p-6 bg-white dark:bg-zinc-950 border rounded-[24px] shadow-xl space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Loader2 className="size-3 animate-spin text-primary" />
              Encrypting & Slicing
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] font-bold truncate opacity-60 italic">
            Legal_Contract_v4_Final.pdf
          </p>
        </div>
      )}

      {status === "completed" && (
        <Card className="border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-[24px] shadow-lg overflow-hidden animate-in zoom-in-95 duration-500">
          <CardHeader className="p-4 pb-0 flex flex-row items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold truncate max-w-[200px]">
                Legal_Contract_v4_Final.pdf
              </CardTitle>
              <CardDescription className="text-[10px] font-bold">
                1.2MB • PDF Document
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto opacity-40"
              onClick={() => setStatus("idle")}
            >
              <ChevronDown className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-4 flex gap-2">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 h-8 text-[10px] font-bold px-4"
            >
              ANALIZAR
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-[10px] font-bold border-emerald-500/20 hover:bg-emerald-500/10"
            >
              RESUMIR
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const Step1_UploadZone: StoryObj = {
  render: () => <UploadZoneSimulation />,
};

/* -------------------------------------------------------------------------- */
/* 2. DocumentListView                                                        */
/* -------------------------------------------------------------------------- */

export const Step2_ListView: StoryObj = {
  render: () => (
    <div className="max-w-2xl w-full p-6 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-black text-2xl tracking-tighter italic">
            "Lista mis docs"
          </h3>
          <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mt-1">
            mcp_docs.list()
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            className="h-9 w-48 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full pl-9 pr-4 text-[11px] focus:ring-1 ring-primary/20"
            placeholder="Filter documents..."
          />
        </div>
      </div>

      <div className="space-y-4">
        {[
          {
            name: "Seguro_Premium.pdf",
            weight: "2.4MB",
            type: "PDF",
            date: "Hace 2h",
            icon: FileText,
            color: "text-rose-500 bg-rose-500/10",
          },
          {
            name: "Itinerario_Kyoto.docx",
            weight: "840KB",
            type: "DOCX",
            date: "Ayer",
            icon: FileCode,
            color: "text-blue-500 bg-blue-500/10",
          },
          {
            name: "Factura_Vuelo.img",
            weight: "4.1MB",
            type: "IMAGE",
            date: "15 Oct",
            icon: FileImage,
            color: "text-emerald-500 bg-emerald-500/10",
          },
        ].map((doc) => (
          <div
            key={doc.name}
            className="group flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border rounded-[24px] shadow-sm hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer"
          >
            <div
              className={cn(
                "size-12 rounded-2xl flex items-center justify-center shrink-0",
                doc.color
              )}
            >
              <doc.icon className="size-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate">{doc.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold italic mt-0.5">
                <span>{doc.weight}</span>
                <span className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span>{doc.date}</span>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" title="Leer">
                <Eye className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Preguntar">
                <MessageSquare className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Descargar">
                <Download className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* 3. DocumentReaderPanel                                                     */
/* -------------------------------------------------------------------------- */

const ReaderPanelSimulation = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="max-w-2xl w-full p-6">
      <Card
        className={cn(
          "border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white dark:bg-zinc-950 overflow-hidden transition-all duration-500",
          isExpanded ? "rounded-[32px]" : "rounded-full h-12"
        )}
      >
        {isExpanded ? (
          <>
            <CardHeader className="bg-zinc-900 text-white flex flex-row items-center justify-between p-6">
              <div className="space-y-1">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  mcp_docs.read("doc_771")
                </CardTitle>
                <CardDescription className="text-zinc-500 text-[10px] font-bold">
                  Seguro_Premium_v2.pdf • 14 páginas
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <ExternalLink className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsExpanded(false)}
                >
                  <ChevronDown className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="doc" className="w-full">
                <TabsList className="w-full h-10 rounded-none bg-zinc-50 dark:bg-zinc-900 border-b">
                  <TabsTrigger
                    value="doc"
                    className="flex-1 text-[10px] font-black uppercase tracking-widest"
                  >
                    Documento
                  </TabsTrigger>
                  <TabsTrigger
                    value="insights"
                    className="flex-1 text-[10px] font-black uppercase tracking-widest"
                  >
                    AI Insights
                  </TabsTrigger>
                  <TabsTrigger
                    value="meta"
                    className="flex-1 text-[10px] font-black uppercase tracking-widest"
                  >
                    Metadatos
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="doc"
                  className="p-8 h-[400px] overflow-y-auto font-serif text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                >
                  <h1 className="text-2xl font-black italic mb-6">
                    Póliza de Seguro Premium
                  </h1>
                  <p className="mb-4">
                    Este documento establece los términos y condiciones de la
                    cobertura premium "World Shield 2025".
                  </p>
                  <h2 className="text-lg font-black mt-8 mb-4 border-b pb-2 tracking-tighter">
                    Cláusula 1.1: Cobertura Médica
                  </h2>
                  <p className="mb-4 text-primary/80 font-bold bg-primary/5 p-4 rounded-xl border-l-4 border-primary">
                    La cobertura médica integral incluye hospitalización,
                    cirugía y traslados de emergencia hasta un límite de
                    $500,000 USD por asegurado en territorio nipón.
                  </p>
                  <p className="opacity-60 italic">
                    Se excluyen enfermedades preexistentes no declaradas
                    explícitamente en el anexo de salud...
                  </p>
                </TabsContent>
                <TabsContent value="insights" className="p-8 space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-black tracking-widest text-primary">
                      Resumen del Agente
                    </p>
                    <p className="text-sm leading-relaxed">
                      El documento confirma cobertura total de anulación
                      ($2,500) y asistencia 24h. No hay cobertura para deportes
                      de alto riesgo (Snowboarding Extreme).
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                      <p className="text-[9px] font-bold text-emerald-600 uppercase">
                        Puntos Clave
                      </p>
                      <ul className="text-[10px] font-bold mt-2 space-y-1 italic">
                        <li>✓ Repatriación incluida</li>
                        <li>✓ Dental de urgencia</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                      <p className="text-[9px] font-bold text-rose-600 uppercase">
                        Exclusiones
                      </p>
                      <ul className="text-[10px] font-bold mt-2 space-y-1 italic">
                        <li>✗ Robos sin denuncia</li>
                        <li>✗ Deportes extremos</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </>
        ) : (
          <button
            className="w-full h-full flex items-center justify-between px-6 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <span className="text-xs font-black uppercase italic tracking-widest">
                DocumentReader: Seguro_Premium.pdf
              </span>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] h-5">
              Expandir Panel
            </Badge>
          </button>
        )}
      </Card>
    </div>
  );
};

export const Step3_ReaderPanel: StoryObj = {
  render: () => <ReaderPanelSimulation />,
};

/* -------------------------------------------------------------------------- */
/* 4. DocumentDownloadChip                                                    */
/* -------------------------------------------------------------------------- */

export const Step4_DownloadChip: StoryObj = {
  render: () => (
    <div className="p-12">
      <button className="group flex items-center gap-3 pl-3 pr-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full shadow-xl hover:scale-105 transition-all">
        <div className="size-8 rounded-full bg-white/10 dark:bg-zinc-900/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
          <Download className="size-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-widest leading-none">
            Descargar PDF
          </p>
          <p className="text-[9px] opacity-60 font-medium">
            Itinerario_Final_Elena.pdf (420KB)
          </p>
        </div>
      </button>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* 5. DocumentQAThread                                                        */
/* -------------------------------------------------------------------------- */

export const Step5_QAThread: StoryObj = {
  render: () => (
    <div className="max-w-xl w-full p-8 bg-zinc-50 dark:bg-black rounded-[40px] border">
      <div className="space-y-8">
        {/* User Question */}
        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground p-5 rounded-[28px] rounded-tr-none max-w-[80%] shadow-xl">
            <p className="text-sm font-medium italic">
              "¿Qué cubre exactamente el seguro en Japón si tengo una urgencia
              médica?"
            </p>
          </div>
        </div>

        {/* AI Response with Citations */}
        <div className="flex justify-start items-start gap-4">
          <div className="size-10 rounded-2xl bg-zinc-900 flex items-center justify-center shrink-0 shadow-lg">
            <Zap className="size-5 text-primary" />
          </div>
          <div className="space-y-4 flex-1">
            <p className="text-sm leading-relaxed">
              Según el documento analizado, el seguro World Shield ofrece una
              cobertura integral muy potente para Japón:
            </p>

            <div className="relative group">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary rounded-full group-hover:w-1.5 transition-all" />
              <div className="pl-6 py-2 space-y-2">
                <Quote className="size-4 text-primary mb-2 opacity-40 italic" />
                <blockquote className="text-sm italic font-serif leading-relaxed opacity-80">
                  "La cobertura médica integral incluye hospitalización, cirugía
                  y traslados de emergencia hasta un límite de $500,000 USD por
                  asegurado en territorio nipón."
                </blockquote>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[8px] h-4 bg-zinc-100 dark:bg-zinc-800 border-primary/20 font-mono"
                  >
                    Página 4
                  </Badge>
                  <button className="text-[9px] font-bold text-primary flex items-center gap-1 hover:underline">
                    <ArrowRight className="size-3" /> Ver fuente original
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Deberás tener en cuenta que las enfermedades preexistentes están
              fuera de esta cobertura inicial. ¿Quieres que revise la sección de
              exclusiones?
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};
