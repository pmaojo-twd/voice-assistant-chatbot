import type { Meta, StoryObj } from "@storybook/react";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Clock from "lucide-react/dist/esm/icons/clock";
import Compass from "lucide-react/dist/esm/icons/compass";
import Hotel from "lucide-react/dist/esm/icons/hotel";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Plane from "lucide-react/dist/esm/icons/plane";
import Plus from "lucide-react/dist/esm/icons/plus";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Train from "lucide-react/dist/esm/icons/train";
import UtensilsCrossed from "lucide-react/dist/esm/icons/utensils-crossed";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { cn } from "@/lib/utils";

const meta: Meta = {
  title: "MCP / Travel Narrative Journey",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

/**
 * # Narrative Walkthrough: Alex & Elena
 *
 * This simulation map a specific business narrative to UI components.
 * It shows how an agent (Alex) uses the toolkit to build a trip for a client (Elena).
 */
export const NarrativeJourney: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-24 pb-32">
        {/* Header Section */}
        <header className="space-y-4 text-center">
          <Badge
            variant="outline"
            className="px-3 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-widest font-bold text-[10px]"
          >
            Case Study
          </Badge>
          <h1 className="text-4xl font-black tracking-tight underline decoration-primary/20 decoration-4 underline-offset-8">
            Alex & Elena: La Agencia "Horizontes Abiertos"
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Mapeo del flujo narrativo de venta y asesoría a componentes de UI
            interactivos.
          </p>
        </header>

        {/* Phase 1: First Contact & Discovery */}
        <section className="grid md:grid-cols-2 gap-12 items-start relative">
          <div className="absolute -left-6 top-0 bottom-0 w-px bg-zinc-200 hidden md:block" />
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                1
              </div>
              <h2 className="font-bold text-lg">
                Primer Contacto y Descubrimiento
              </h2>
            </div>
            <p className="text-sm italic text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-xl border-l-2 border-primary">
              —Hola, Alex. Soy Elena. Quiero hacer un gran viaje, algo completo,
              pero sinceramente no tengo tiempo para organizarlo... Mi sueño era
              visitar Japón durante dos semanas en otoño.
            </p>
          </div>

          {/* UI Blob: Discovery Card */}
          <Card className="shadow-xl bg-white dark:bg-zinc-900 border-primary/20 scale-105 transition-transform hover:scale-110">
            <CardHeader className="pb-3 border-b bg-primary/5">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Compass className="size-4 text-primary" />
                New Lead: Discovery Phase
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic">
                  Target Destination
                </p>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg border">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-sm font-bold">Japan (Grand Tour)</span>
                  <Badge className="ml-auto bg-amber-500/10 text-amber-600 border-amber-500/20 text-[9px]">
                    AUTUMN '25
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <p className="text-[9px] text-muted-foreground uppercase font-bold">
                    Duration
                  </p>
                  <p className="text-xs font-bold font-mono">14 Full Days</p>
                </div>
                <div className="p-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800">
                  <p className="text-[9px] text-muted-foreground uppercase font-bold">
                    Client
                  </p>
                  <p className="text-xs font-bold">Elena R.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Phase 2: Style & Preferences */}
        <section className="grid md:grid-cols-2 gap-12 items-start relative translate-y-4">
          {/* Reverse order on mobile? No, let's keep it consistent */}
          <div className="md:order-2 space-y-4 pt-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                2
              </div>
              <h2 className="font-bold text-lg">Estilo y Preferencias</h2>
            </div>
            <p className="text-sm italic text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-xl border-l-2 border-primary">
              —¿Prefiere un ritmo pausado o quiere exprimir cada día? <br />
              Tras acordar un ritmo equilibrado, definir intolerancias
              alimentarias y establecer un presupuesto claro...
            </p>
          </div>

          {/* UI Blob: Preferences Board */}
          <Card className="md:order-1 shadow-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-none ring-4 ring-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                Profiling & Stylization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2 pb-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary hover:bg-primary shadow-none h-6 px-3">
                    Balanced Pace
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 dark:border-zinc-200 h-6 px-3"
                  >
                    Traditional Culture
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 dark:border-zinc-200 h-6 px-3 flex items-center gap-1"
                  >
                    <UtensilsCrossed className="size-2.5" />
                    Gourmet Focus
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Budget Meter</span>
                  <span className="text-primary">$12k - $15k</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 dark:bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[70%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Phase 3: The Pillars */}
        <section className="space-y-12">
          <div className="space-y-4 max-w-2xl text-center mx-auto">
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                3
              </div>
              <h2 className="font-bold text-xl tracking-tight">
                Los Pilares del Itinerario
              </h2>
            </div>
            <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
              —Perfecto. Aquí tiene un esquema inicial de cómo estructuraremos
              su itinerario completo...
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Plane,
                title: "Transport",
                desc: "Escalas mínimas + Chofer Narita",
                status: "READY",
                color: "sky",
              },
              {
                icon: Hotel,
                title: "Stay",
                desc: "Boutique Kyoto + Kaiseki Ryokan",
                status: "READY",
                color: "emerald",
              },
              {
                icon: Train,
                title: "Logistics",
                desc: "JR Pass + IC Cards Prep",
                status: "PLANNED",
                color: "rose",
              },
              {
                icon: Compass,
                title: "Curation",
                desc: "Guías habla hispana + Libres",
                status: "READY",
                color: "amber",
              },
            ].map((p) => (
              <Card
                key={p.title}
                className="bg-white dark:bg-zinc-900 group hover:border-primary transition-all"
              >
                <CardHeader className="p-4 space-y-3">
                  <div
                    className={cn(
                      "size-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                      `bg-${p.color}-100 text-${p.color}-600 dark:bg-${p.color}-500/10 dark:text-${p.color}-400`
                    )}
                  >
                    <p.icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">
                      {p.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[8px] h-4 mt-1 font-mono tracking-tighter border-none px-0 opacity-60 font-bold",
                        p.status === "READY"
                          ? "text-emerald-500"
                          : "text-amber-500"
                      )}
                    >
                      {p.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Phase 4: Refinement & Cierre */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                4
              </div>
              <h2 className="font-bold text-lg">Refinamiento y Soporte</h2>
            </div>
            <p className="text-sm italic text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-xl border-l-2 border-primary">
              —Me parece excelente, Alex. Muchísimas gracias, siento que estoy
              en buenas manos.
            </p>
          </div>

          <div className="space-y-4">
            <Alert className="bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20 shadow-lg">
              <ShieldCheck className="size-4 text-emerald-600" />
              <AlertTitle className="text-emerald-800 dark:text-emerald-400 font-bold text-sm">
                Escudo de Viajeros Premium
              </AlertTitle>
              <AlertDescription className="text-emerald-700/80 dark:text-emerald-400/70 text-[11px]">
                Incluye Seguro Médico Completo, Anulación y Asistencia 24h.
              </AlertDescription>
            </Alert>

            <Card className="border-none bg-primary text-primary-foreground shadow-2xl relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
                  <Clock className="size-3" />
                  Final Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="space-y-2">
                  {[
                    "Verificar disponibilidad real de Ryokanes",
                    "Bloquear mejores opciones de vuelo",
                    "Generar Itinerario Interactivo Day-by-Day",
                  ].map((item, id) => (
                    <div key={id} className="flex items-start gap-2">
                      <Plus className="size-3 shrink-0 mt-1 opacity-60" />
                      <span className="text-[11px] font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/10 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <MessageCircle className="size-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase">
                      WhatsApp Concierge
                    </p>
                    <p className="text-[9px] opacity-80">
                      +34 (600) 000-000 • Priority 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 size-32 bg-white/5 rounded-full blur-3xl -z-10" />
            </Card>
          </div>
        </section>

        {/* Closing Beat */}
        <footer className="pt-12 border-t text-center space-y-6">
          <CheckCircle2 className="size-12 text-emerald-500 mx-auto animate-in zoom-in-0 duration-500" />
          <div className="space-y-2">
            <h3 className="text-2xl font-black italic">
              "Estoy en buenas manos."
            </h3>
            <p className="text-sm text-muted-foreground">
              La confianza se construye con acompañamiento visual en cada paso.
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full px-8 h-12 shadow-xl shadow-primary/20 font-bold transition-all hover:scale-105 active:scale-95"
          >
            REPLICAR ESTE FLUJO
          </Button>
        </footer>
      </div>
    </div>
  ),
};
