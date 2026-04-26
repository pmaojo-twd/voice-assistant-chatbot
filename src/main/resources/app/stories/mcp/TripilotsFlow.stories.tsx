import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/shared/components/ui/slider";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Compass from "lucide-react/dist/esm/icons/compass";
import Download from "lucide-react/dist/esm/icons/download";
import FingerprintPattern from "lucide-react/dist/esm/icons/fingerprint-pattern";
import Hotel from "lucide-react/dist/esm/icons/hotel";
import Lock from "lucide-react/dist/esm/icons/lock";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Plane from "lucide-react/dist/esm/icons/plane";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Star from "lucide-react/dist/esm/icons/star";
import Timer from "lucide-react/dist/esm/icons/timer";
import TrendingDown from "lucide-react/dist/esm/icons/trending-down";
import UtensilsCrossed from "lucide-react/dist/esm/icons/utensils-crossed";
import Waves from "lucide-react/dist/esm/icons/waves";
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
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { cn } from "@/lib/utils";

const meta: Meta = {
  title: "Tripilots Flow / Elaborated UX Architecture",
  parameters: {
    layout: "centered",
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* PHASE 1: Professional Discovery Card                                       */
/* -------------------------------------------------------------------------- */

const ElaboratedDiscoveryCard = () => {
  const [energy, setEnergy] = useState(65);
  const [tags, setTags] = useState<string[]>(["Cultura", "Gastronomía"]);
  const [pulse, setPulse] = useState(false);
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerPulse = () => {
    setPulse(true);
    if (pulseTimerRef.current) {
      clearTimeout(pulseTimerRef.current);
    }
    pulseTimerRef.current = setTimeout(() => {
      setPulse(false);
      pulseTimerRef.current = null;
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) {
        clearTimeout(pulseTimerRef.current);
      }
    };
  }, []);

  return (
    <Card className="w-[450px] border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white dark:bg-zinc-950 rounded-[32px] overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-zinc-100 dark:bg-zinc-900">
        <div
          className={cn(
            "h-full bg-primary transition-all duration-500",
            pulse ? "w-full" : "w-[65%]"
          )}
        />
      </div>

      <CardHeader className="pt-10 pb-4 px-8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FingerprintPattern className="size-4 text-primary" />
            <CardTitle className="text-sm font-black uppercase tracking-widest italic">
              Lead Discovery Profile
            </CardTitle>
          </div>
          <p className="text-[10px] text-muted-foreground font-medium">
            mcp_discovery.get_profiling_ui()
          </p>
        </div>
        {pulse && (
          <Badge className="animate-pulse bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-bold tracking-tighter">
            Syncing with Alex
          </Badge>
        )}
      </CardHeader>

      <CardContent className="px-8 space-y-10 pb-8">
        {/* Energy Gauge */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-muted-foreground">
                Energy Balance
              </p>
              <p className="text-xl font-black italic tracking-tighter">
                {energy < 30
                  ? "Zen & Reflective"
                  : energy > 70
                    ? "Intense Explorer"
                    : "Balanced Rhythm"}
              </p>
            </div>
            <div className="text-2xl font-black tabular-nums text-primary/30">
              {energy}%
            </div>
          </div>

          <div className="relative pt-2">
            <div className="absolute flex justify-between w-full -top-4 px-1">
              <TrendingDown className="size-3 text-muted-foreground opacity-40" />
              <Zap className="size-3 text-muted-foreground opacity-40" />
            </div>
            <Slider
              value={[energy]}
              onValueChange={([v]) => {
                setEnergy(v);
                triggerPulse();
              }}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>

        {/* Interests Tiles */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
            Interests Board (Click to Toggle)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Cultura", icon: Compass },
              { label: "Cocina", icon: UtensilsCrossed },
              { label: "Lujo", icon: Star },
              { label: "Fotos", icon: MapPin },
              { label: "Relax", icon: Waves },
              { label: "Quick", icon: Zap },
            ].map((i) => (
              <button
                key={i.label}
                onClick={() => {
                  setTags((prev) =>
                    prev.includes(i.label)
                      ? prev.filter((t) => t !== i.label)
                      : [...prev, i.label]
                  );
                  triggerPulse();
                }}
                className={cn(
                  "p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 group",
                  tags.includes(i.label)
                    ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-[1.02]"
                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:border-primary/40"
                )}
              >
                <i.icon
                  className={cn(
                    "size-4",
                    tags.includes(i.label)
                      ? "text-white"
                      : "text-muted-foreground group-hover:text-primary"
                  )}
                />
                <span className="text-[9px] font-black uppercase">
                  {i.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
      <div className="h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
    </Card>
  );
};

export const Phase1_Discovery: StoryObj = {
  render: () => <ElaboratedDiscoveryCard />,
};

/* -------------------------------------------------------------------------- */
/* PHASE 2: Immersive Itinerary Board                                        */
/* -------------------------------------------------------------------------- */

const ElaboratedDesignBoard = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const items = [
    {
      id: "v1",
      type: "Vuelo",
      title: "Emirates QR-80",
      day: "Lun 1",
      img: "/tokyo.png",
      badge: "Direct",
      icon: Plane,
    },
    {
      id: "h1",
      type: "Stay",
      title: "Ubuya Hakone",
      day: "Mar 2",
      img: "/ryokan.png",
      badge: "Luxury",
      icon: Hotel,
    },
    {
      id: "a1",
      type: "Tour",
      title: "Zen Garden Master",
      day: "Mie 3",
      img: "/kyoto.png",
      badge: "Exclusive",
      icon: Compass,
    },
  ];

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="w-[1000px] space-y-8 bg-zinc-50 dark:bg-black p-12 rounded-[48px] border relative overflow-hidden">
      {/* Sync Mask */}
      {isSyncing && (
        <div className="absolute inset-0 z-50 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-500">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] shadow-3xl border-none flex flex-col items-center gap-4">
            <Zap className="size-8 text-primary animate-pulse" />
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-primary">
                Alex is refining your logic
              </p>
              <p className="text-[10px] text-muted-foreground font-mono mt-1 italic">
                mcp_itinerary.generate_draft()
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Narrative Header */}
      <header className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-3xl font-black tracking-tighter">
              "Aquí está tu viaje, Elena."
            </h2>
          </div>
          <p className="text-sm text-muted-foreground ml-6 italic opacity-80">
            Un itinerario vivo que puedes tocar y ajustar en tiempo real.
          </p>
        </div>
        <Button className="rounded-full h-12 px-8 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black font-black uppercase text-xs tracking-widest">
          Optimize All
        </Button>
      </header>

      {/* Visual Timeline Cards */}
      <div className="grid grid-cols-3 gap-8 relative">
        {items.map((item, idx) => (
          <Card
            key={item.id}
            onClick={simulateSync}
            className="group relative border-none shadow-2xl bg-white dark:bg-zinc-900 rounded-[36px] overflow-hidden cursor-pointer hover:ring-4 ring-primary/20 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="aspect-[4/3] w-full relative overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-white/90 text-black border-none font-black text-[9px] px-3 h-6 uppercase">
                {item.day}
              </Badge>
              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1 opacity-70 flex items-center gap-2">
                  <item.icon className="size-3" />
                  {item.type}
                </p>
                <h4 className="text-white text-lg font-black leading-tight truncate">
                  {item.title}
                </h4>
              </div>
            </div>
            {idx < items.length - 1 && (
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <ArrowRight className="size-6 text-zinc-300 dark:text-zinc-700" />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Real-time Collaboration Blob */}
      <div className="mt-16 p-8 bg-zinc-900 dark:bg-zinc-800 text-white rounded-[40px] shadow-3xl flex items-start gap-6 relative overflow-hidden ring-1 ring-white/10 group">
        <div className="size-16 rounded-3xl bg-primary flex items-center justify-center shrink-0 shadow-xl shadow-primary/30">
          <MessageCircle className="size-8" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500 text-[8px] h-4">
              ALEX INSIGHT
            </Badge>
            <span className="text-[10px] opacity-40 font-mono">
              Syncing via MCP Itinerary
            </span>
          </div>
          <p className="text-lg font-bold italic leading-snug max-w-2xl">
            "He movido la noche de Onsen al jueves para que coincida con el
            pronóstico del Momiji. Elena, mira cómo se actualiza el board
            mientras hablamos."
          </p>
        </div>
        <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-all duration-700" />
      </div>
    </div>
  );
};

export const Phase2_Design: StoryObj = {
  render: () => <ElaboratedDesignBoard />,
};

/* -------------------------------------------------------------------------- */
/* PHASE 3: Dashboard of Certainty                                           */
/* -------------------------------------------------------------------------- */

export const Phase3_Logistics: StoryObj = {
  render: () => (
    <Card className="w-[450px] border-none shadow-[0_48px_96px_-24px_rgba(0,0,0,0.3)] bg-zinc-950 text-white rounded-[40px] overflow-hidden p-2">
      <CardHeader className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-8 pt-12 rounded-[36px] relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="size-5 text-emerald-400" />
          <CardTitle className="text-sm font-black uppercase tracking-widest italic">
            mcp_logistics.get_security_bundle()
          </CardTitle>
        </div>
        <CardDescription className="text-zinc-400 text-xs mt-1 font-bold">
          Resilience & Insurance Coverage Check
        </CardDescription>

        <div className="mt-8 flex items-center gap-6">
          <div className="size-16 rounded-full border-4 border-emerald-500 flex items-center justify-center relative">
            <span className="text-xl font-black">95%</span>
            <div className="absolute inset-0 rounded-full border-4 border-white/5 animate-ping opacity-20" />
          </div>
          <div>
            <p className="text-xs font-black uppercase">Service Readiness</p>
            <p className="text-[10px] opacity-60">
              Verified Logistics & Trust Bundle
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-4">
        {[
          {
            label: "Japan Rail Pass Digital",
            desc: "Digital & Printed v2.0",
            icon: Plane,
          },
          {
            label: "Suica Cards Prepared",
            desc: "Ready for Tokyo Metro",
            icon: Zap,
          },
          {
            label: "Premium Health Shield",
            desc: "Coverage up to $500k",
            icon: ShieldCheck,
          },
        ].map((log) => (
          <div
            key={log.label}
            className="group flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-white/5 hover:border-white/20 transition-all cursor-help hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                <log.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs font-black">{log.label}</p>
                <p className="text-[10px] opacity-40">{log.desc}</p>
              </div>
            </div>
            <CheckCircle2 className="size-4 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}

        <Alert className="bg-primary text-white border-none rounded-3xl p-6 mt-6 shadow-xl shadow-primary/20">
          <MessageCircle className="size-5 text-white" />
          <AlertTitle className="text-sm font-black leading-none">
            Emergencias 24/7
          </AlertTitle>
          <AlertDescription className="text-xs opacity-70 mt-1 leading-relaxed">
            Botón de asistencia directa con Alex activo "from door to door".
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  ),
};

/* -------------------------------------------------------------------------- */
/* PHASE 4: The Elegant Dossier                                              */
/* -------------------------------------------------------------------------- */

export const Phase4_Checkout: StoryObj = {
  render: () => (
    <div className="w-[600px] border-none shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)] bg-white dark:bg-zinc-900 rounded-[56px] overflow-hidden relative">
      <div className="p-12 space-y-12">
        {/* Brand Seal */}
        <header className="flex justify-between items-start">
          <div className="space-y-2">
            <Badge className="bg-zinc-100 text-zinc-900 border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 h-5 mb-4">
              Official Proposal
            </Badge>
            <h2 className="text-4xl font-black tracking-tighter leading-none italic">
              Japón: <br />
              <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">
                Tradición & Futuro
              </span>
            </h2>
          </div>
          <div className="size-16 rounded-[28px] border-4 border-zinc-50 dark:border-zinc-800 flex items-center justify-center relative bg-white dark:bg-zinc-950 shadow-xl">
            <Lock className="size-6 text-primary" />
            <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary flex items-center justify-center border-4 border-white dark:border-zinc-900">
              <CheckCircle2 className="size-3 text-white" />
            </div>
          </div>
        </header>

        {/* Value Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 border-none bg-zinc-50 dark:bg-zinc-800/50 rounded-[32px] space-y-3 shadow-none">
            <Timer className="size-5 text-primary" />
            <div>
              <p className="text-[9px] font-black uppercase text-muted-foreground">
                Stay Duration
              </p>
              <p className="text-sm font-black italic">14 Days High-Rhythm</p>
            </div>
          </Card>
          <Card className="p-5 border-none bg-zinc-50 dark:bg-zinc-800/50 rounded-[32px] space-y-3 shadow-none">
            <UtensilsCrossed className="size-5 text-primary" />
            <div>
              <p className="text-[9px] font-black uppercase text-muted-foreground">
                Curation
              </p>
              <p className="text-sm font-black italic">Gastronomy Focused</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[40px] bg-zinc-950 text-white relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.25em]">
                Cost Breakdown Summary
              </p>
              <div className="text-3xl font-black tabular-nums tracking-tighter italic animate-pulse">
                $12,450.00
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Vuelos Premium", val: "Incluido" },
                { label: "Hospedaje de Lujo", val: "Incluido" },
                { label: "Expert Guiding Fees", val: "Incluido" },
                { label: "Logistics Bundle", val: "Incluido" },
              ].map((line) => (
                <div
                  key={line.label}
                  className="flex justify-between items-center border-b border-white/5 pb-2"
                >
                  <span className="text-xs font-bold opacity-60 italic">
                    {line.label}
                  </span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    {line.val}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 size-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button className="h-16 rounded-full gap-3 font-black text-sm uppercase tracking-widest bg-primary shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-white group">
            RESERVAR CON DEPÓSITO
            <Zap className="size-4 animate-pulse group-hover:scale-125 transition-transform" />
          </Button>
          <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 pt-2">
            <Download className="size-3" /> Descargar Dossier Completo (PDF)
          </button>
        </div>
      </div>

      <div className="bg-zinc-100 dark:bg-black p-4 text-center">
        <p className="text-[10px] text-muted-foreground font-bold">
          The agent stays present in the thread during the booking process.
        </p>
      </div>
    </div>
  ),
};
